import { gql, NetworkStatus, useQuery } from "@apollo/client";
import { DateTime, Duration } from "luxon";
import classNames from "classnames";
import { useEffect, useState, useCallback } from "react";
import DqTournaments from "./dqTournaments/DqTournaments";
import ReadyToPlay from "./ReadyToPlay/ReadyToPlay";
import OngoingTournamentsError from "./error/OngoingTournamentsError";
import OngoingTournamentsLoading from "./loading/OngoingTournamentsLoading";
import styles from "./styles.module.scss";
import WaitingQueue from "./WaitingQueue/WaitingQueue";
const cn = classNames.bind(styles);

const ONGOING_TOURNAMENTS = gql`
  query UserOngoingMatches(
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

const OngoingTournaments = () => {
  const [page, setPage] = useState(1);
  const { data, error, loading, networkStatus, fetchMore, refetch } = useQuery(
    ONGOING_TOURNAMENTS,
    {
      variables: {
        page: page,
        limit: 10,
        search: "",
        status: ["IN-PROGRESS", "RECONFIGURE"],
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  const {
    data: userData,
    loading: userDataLoading,
    error: userError,
  } = useQuery(USER);
  const [ready, setReady] = useState<Array<any>>([]);
  const [Waiting, setWaiting] = useState<Array<any>>([]);
  const [dq, setDq] = useState<Array<any>>([]);

  const refetchOngoingTournaments = useCallback(refetch, [refetch]);

  const matchTime = useCallback(
    (arm: string, id: string) => {
      // arm stands for arena rounds and match number
      let time: number = 0;
      const armArray = arm.split(":");
      data.joinedMatches.docs.forEach((m: any) => {
        if (m.id == id) {
          m.configuration.timmers.match_time.forEach((ma: any) => {
            if (armArray[0] !== ma.arenaNumber) return;
            ma.rounds.forEach((ra: any) => {
              if (armArray[1] !== ra.roundNumber) return;
              ra.matches.forEach((mt: any) => {
                if (mt.matchNumber !== armArray[2]) return;
                time = mt.time;
              });
            });
          });
        }
      });
      return time;
    },
    [data]
  );

  const onLoadMore = () => {
    if (
      networkStatus === NetworkStatus.fetchMore ||
      networkStatus === NetworkStatus.loading ||
      !data.joinedMatches.hasNextPage
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
    if (data?.joinedMatches && userData?.user) {
      // Set the ready, waiting and dq tournaments
      const readyT: Array<any> = [];
      const waitingT: Array<any> = [];
      const dqT: Array<any> = [];
      // If the users matchTime is current, Then set match to ready
      data.joinedMatches.docs.forEach((m: any) => {
        m.configuration.configure.forEach((a: any) => {
          a.rounds.forEach((r: any) => {
            r.matches.forEach((s: any) => {
              let user: any = null;
              if (s.slot_one && s.slot_one.user) {
                if (userData.user.id === s.slot_one.user.id) {
                  // Get the time
                  user = s.slot_one;
                }
              }
              if (s.slot_two && s.slot_two.user) {
                if (userData.user.id === s.slot_two.user.id) {
                  // Get the time
                  user = s.slot_two;
                }
              }
              if (s.bye && s.bye.user) {
                if (userData.user.id === s.bye.user.id) {
                  // Get the time
                  user = s.bye;
                }
              }
              if (user && !s.done) {
                const time = matchTime(
                  `${a.arenaNumber}:${r.roundNumber}:${s.matchNumber}`,
                  m.id
                );
                if (DateTime.now() > DateTime.fromISO(time)) {
                  readyT.push(m);
                }
                if (DateTime.now() <= DateTime.fromISO(time)) {
                  waitingT.push({ ...m, timeToMatch: time });
                }
              } else if (user && s.done) {
                if (!user.winner) {
                  dqT.push(m);
                }
              }
            });
          });
        });
      });
      setReady(readyT);
      setWaiting(waitingT);
      setDq(dqT);
      setPage(data.joinedMatches.page);
    }
  }, [data, matchTime, userData?.user]);

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
