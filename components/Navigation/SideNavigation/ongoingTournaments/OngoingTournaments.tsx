import { gql, NetworkStatus, useQuery, useLazyQuery } from "@apollo/client";
import { DateTime, Duration } from "luxon";
import classNames from "classnames";
import { useEffect, useState, useCallback } from "react";
import DqTournaments from "./dqTournaments/DqTournaments";
import ReadyToPlay from "./ReadyToPlay/ReadyToPlay";
import OngoingTournamentsError from "./error/OngoingTournamentsError";
import OngoingTournamentsLoading from "./loading/OngoingTournamentsLoading";
import styles from "./styles.module.scss";
import WaitingQueue from "./WaitingQueue/WaitingQueue";
import { MatchType } from "../../../../types/match";
import { TournamentType } from "../../../../types/tournament";
const cn = classNames.bind(styles);

const ONGOING_TOURNAMENTS = gql`
  query UserOngoingTournaments(
    $page: Int!
    $limit: Int!
    $search: String
    $status: [String]
  ) {
    joinedTournaments(
      page: $page
      limit: $limit
      search: $search
      status: $status
    ) {
      page
      hasNextPage
      docs {
        id
        information {
          name
          thumbnail {
            image
            blurhash
          }
        }
        config {
          round_offset
          match_length
          before_dq
          after_dq
        }
      }
    }
  }
`;

const USER = gql`
  query GetUser {
    user {
      id
    }
  }
`;

const MATCH = gql`
  query GetPlayerMatch($input: GetPlayerMatchInput!) {
    playerMatch(input: $input) {
      time
      match_number
      status
      slot_two {
        joined
        winner
        user {
          id
          identity {
            brullah_name
            avatar {
              image
              blurhash
            }
          }
        }
      }
      slot_one {
        winner
        joined
        user {
          id
          identity {
            brullah_name
            avatar {
              image
              blurhash
            }
          }
        }
      }
      bye_slot {
        user {
          id
          identity {
            brullah_name
            avatar {
              image
              blurhash
            }
          }
        }
      }
    }
  }
`;

const OngoingTournaments = () => {
  const [page, setPage] = useState(1);
  const { data, error, loading, networkStatus, fetchMore, refetch } = useQuery<{
    joinedTournaments: {
      hasNextPage: boolean;
      page: number;
      docs: Array<TournamentType>;
    };
  }>(ONGOING_TOURNAMENTS, {
    variables: {
      page: page,
      limit: 10,
      search: "",
      status: ["IN-PROGRESS", "RECONFIGURE"],
    },
    notifyOnNetworkStatusChange: true,
  });
  const [getMatch] = useLazyQuery<{
    playerMatch: MatchType;
  }>(MATCH);

  const {
    data: userData,
    loading: userDataLoading,
    error: userError,
  } = useQuery(USER);
  const [ready, setReady] = useState<Array<TournamentType>>([]);
  const [Waiting, setWaiting] = useState<
    Array<TournamentType & { matchTime: string }>
  >([]);
  const [dq, setDq] = useState<Array<TournamentType>>([]);

  const refetchOngoingTournaments = useCallback(refetch, [refetch]);

  const onLoadMore = () => {
    if (!data || loading) return;
    if (
      networkStatus === NetworkStatus.fetchMore ||
      networkStatus === NetworkStatus.loading ||
      !data.joinedTournaments.hasNextPage
    )
      return;
    fetchMore({
      variables: {
        page: page + 1,
      },
    });
  };

  const handleScroll = (e: any) => {
    if (
      e.currentTarget!.scrollTop + e.currentTarget!.clientHeight >=
      e.currentTarget!.scrollHeight
    ) {
      onLoadMore();
    }
  };

  useEffect(() => {
    (async () => {
      if (data?.joinedTournaments && userData?.user) {
        // Set the ready, waiting and dq tournaments
        const readyT: Array<TournamentType> = [];
        const waitingT: Array<TournamentType & { matchTime: string }> = [];
        const dqT: Array<TournamentType> = [];
        for (let i = 0; i < data.joinedTournaments.docs.length; i++) {
          const res = await getMatch({
            variables: {
              input: {
                tournament: data.joinedTournaments.docs[i].id,
                user: userData?.user.id,
              },
            },
          });
          // Check if the user has been desqualified from tournament and push to dq tournaments
          if (
            res.data?.playerMatch.slot_one?.user.id === userData?.user.id &&
            !res.data?.playerMatch.slot_one?.winner &&
            res.data?.playerMatch.status === "DONE"
          ) {
            dqT.push(data.joinedTournaments.docs[i]);
          }
          if (
            res.data?.playerMatch.slot_two?.user.id === userData?.user.id &&
            !res.data?.playerMatch.slot_two?.winner &&
            res.data?.playerMatch.status === "DONE"
          ) {
            dqT.push(data.joinedTournaments.docs[i]);
          }

          // Check if tournament is not ready yet
          if (res.data?.playerMatch.status === "NOT-STARTED") {
            waitingT.push({
              ...data.joinedTournaments.docs[i],
              matchTime: res.data?.playerMatch.time as string,
            });
          }

          // Check if tournament is ready to play
          if (res.data?.playerMatch.status === "IN-ZONE") {
            readyT.push(data.joinedTournaments.docs[i]);
          }
        }
        // If the users matchTime is current, Then set match to ready
        setReady(readyT);
        setWaiting(waitingT);
        setDq(dqT);
        setPage(data.joinedTournaments.page);
      }
    })();
  }, [data, userData?.user, getMatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchOngoingTournaments({ page: 1 });
      setPage(1);
    }, Duration.fromObject({ minutes: 10 }).as("milliseconds"));
    return () => clearInterval(interval);
  }, [refetchOngoingTournaments]);

  if (loading || (userDataLoading && NetworkStatus.loading === networkStatus))
    return <OngoingTournamentsLoading></OngoingTournamentsLoading>;
  if (userError && (userError?.networkError as any).statusCode === 401) {
    return (
      <OngoingTournamentsError
        error={userError}
        code={401}
      ></OngoingTournamentsError>
    );
  }
  if (error && (error?.networkError as any).statusCode === 401) {
    return (
      <OngoingTournamentsError
        error={error}
        code={401}
      ></OngoingTournamentsError>
    );
  }
  if (error || userError)
    return (
      <OngoingTournamentsError
        error={error || userError!}
        code={200}
      ></OngoingTournamentsError>
    );
  return (
    <div className={cn(styles.container)}>
      <div>
        <div>
          <h4>OnGoing</h4>
        </div>
      </div>
      {ready.length === 0 && Waiting.length === 0 && dq.length === 0 ? (
        <div className={cn(styles.warnContainer)}>
          <p>Nothing here (x_x)</p>
        </div>
      ) : (
        <ul className={cn(styles.tournamentList)} onScroll={handleScroll}>
          {ready.map((m) => {
            return <ReadyToPlay key={m.id} {...m}></ReadyToPlay>;
          })}
          {Waiting.map((m) => {
            return <WaitingQueue key={m.id} {...m}></WaitingQueue>;
          })}
          {dq.map((m) => {
            return <DqTournaments key={m.id} {...m}></DqTournaments>;
          })}
        </ul>
      )}
    </div>
  );
};

export default OngoingTournaments;
