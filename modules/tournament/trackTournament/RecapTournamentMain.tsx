import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./styles.module.scss";
import TrackTournamentError from "./error/TrackTournamentError";
import TrackTournamentLoading from "./loading/TrackingTournamentLoading";
import TrackTournamentNav from "./nav/TrackTournamentNav";
import TrackTournamentArenaBrackets from "./brackets/arena/TrackTournamentArenaBrackets";
import { useEffect, useState } from "react";
import { Duration } from "luxon";
import dinero from "dinero.js";
import RecapTournamentList from "./recapCard/RecapTournamentList";
import { TournamentType } from "../../../types/tournament";
import { MatchType } from "../../../types/match";
import { numOfArenas } from "../../../functions/helpers";

const TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
      id
      status
      start_date
      game {
        number
      }
      winner {
        id
        identity {
          brullah_name
          avatar {
            image
            blurhash
          }
        }
      }
      information {
        name
        thumbnail {
          image
        }
      }
      config {
        round_offset
        match_length
        before_dq
        after_dq
      }
      configured {
        id
        identity {
          brullah_name
          avatar {
            image
            blurhash
          }
        }
      }
      joined {
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

const RecapTournamentMain = () => {
  const router = useRouter();
  const { loading, error, data, networkStatus, refetch } = useQuery<{
    tournament: TournamentType;
  }>(TOURNAMENT, {
    errorPolicy: "all",
    variables: {
      id: router.query.id,
    },
  });
  const [getMatch] = useLazyQuery<{
    playerMatch: MatchType;
  }>(MATCH);

  const {
    data: userData,
    loading: userDataLoading,
    error: userError,
  } = useQuery(USER, { errorPolicy: "all" });

  const [activeArena, setActiveArena] = useState(1);
  const [ready, setReady] = useState(false);
  const [waiting, setWaiting] = useState<string | undefined>(undefined);
  const [dq, setDq] = useState(false);
  const [notIn, setNotIn] = useState(false);

  const [rewardAmount, setRewardAmount] = useState<string>("NONE");
  const [reward, setReward] = useState("NONE");
  const [perUser, setPerUser] = useState("NONE");
  const [recapNumber, setRecapNumber] = useState(0);
  const [recaps, setRecaps] = useState(0);

  useEffect(() => {
    (async () => {
      if (data?.tournament && data.tournament.status === "IN-PROGRESS") {
        const res = await getMatch({
          variables: {
            input: {
              tournament: data?.tournament.id,
              user: userData?.user.id,
            },
          },
        });
        if (res.data?.playerMatch.status === "IN-ZONE") {
          setReady(true);
        }
        if (res.data?.playerMatch.status === "NOT-STARTED") {
          setWaiting(res.data?.playerMatch.time);
        }

        if (
          res.data?.playerMatch.slot_one?.user.id === userData?.user.id &&
          !res.data?.playerMatch.slot_one?.winner &&
          res.data?.playerMatch.status === "DONE"
        ) {
          setDq(true);
        }
        if (
          res.data?.playerMatch.slot_two?.user.id === userData?.user.id &&
          !res.data?.playerMatch.slot_two?.winner &&
          res.data?.playerMatch.status === "DONE"
        ) {
          setDq(true);
        }
        if (!res.data) {
          setNotIn(true);
        }
        // Set the rewards
        if (data.tournament.reward === "SPONSORED") {
          setRewardAmount(
            dinero({
              currency: data.tournament.sponsor.balance.currency,
              amount: data.tournament.sponsor.balance.value,
            }).toFormat()
          );
        }

        if (data.tournament.reward === "CONTRIBUTED") {
          setRewardAmount(
            dinero({
              currency: data.tournament.contribution.balance.currency,
              amount: data.tournament.contribution.balance.value,
            }).toFormat()
          );
          setPerUser(
            dinero({
              currency: data.tournament.contribution.per_user.currency,
              amount: data.tournament.contribution.per_user.value,
            }).toFormat()
          );
        }

        setReward(data.tournament.reward);
      }
    })();
  }, [data, userData?.user?.id, getMatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, Duration.fromObject({ minutes: 10 }).as("milliseconds"));
    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (!data) return;
    if (data?.tournament.status !== "DONE") {
      if (data?.tournament.game.number > 1) {
        setRecaps(data?.tournament.game.number - 1);
      }
    } else {
      setRecaps(data?.tournament.game.number);
    }
  }, [data]);

  console.log(recapNumber, recaps, "This is the recap bitch ass pussy");

  if (loading || userDataLoading)
    return <TrackTournamentLoading></TrackTournamentLoading>;
  if (userError && (userError?.networkError as any).statusCode === 401) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <TrackTournamentError
            error={userError}
            errorNum={401}
          ></TrackTournamentError>
        </div>
      </div>
    );
  }
  if (error && (error?.networkError as any).statusCode === 401) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <TrackTournamentError
            error={userError}
            errorNum={401}
          ></TrackTournamentError>
        </div>
      </div>
    );
  }
  if (error || userError)
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <TrackTournamentError
            error={error || userError!}
            errorNum={200}
          ></TrackTournamentError>
        </div>
      </div>
    );
  if (
    (data?.tournament.game.number === 1 &&
      data?.tournament.status !== "DONE") ||
    !data
  )
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <TrackTournamentError
            message={`There is currently no recap for ${data?.tournament.information.name}`}
          ></TrackTournamentError>
        </div>
      </div>
    );
  if (recapNumber === 0) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <TrackTournamentNav
            recapNumber={recapNumber}
            status={data.tournament.status}
            setRecapNumber={(num: number) => setRecapNumber(num)}
            userId={userData.user.id}
            winner={data.tournament.winner}
            id={data.tournament.id}
            perUser={perUser}
            reward={reward}
            rewardAmount={rewardAmount}
            dq={dq}
            ready={ready}
            waiting={waiting}
            notIn={notIn}
            networkStatus={networkStatus}
            recap={true}
          ></TrackTournamentNav>
          <RecapTournamentList
            recaps={recaps}
            setRecapNumber={(num: number) => setRecapNumber(num)}
          ></RecapTournamentList>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <TrackTournamentNav
          recapNumber={recapNumber}
          status={data.tournament.status}
          setRecapNumber={(num: number) => setRecapNumber(num)}
          userId={userData.user.id}
          winner={data.tournament.winner}
          id={data.tournament.id}
          perUser={perUser}
          reward={reward}
          rewardAmount={rewardAmount}
          dq={dq}
          ready={ready}
          waiting={waiting}
          notIn={notIn}
          networkStatus={networkStatus}
          recap={true}
        ></TrackTournamentNav>
        <div className={cn(styles.tournamentContainer)}>
          {[...Array(numOfArenas(data.tournament.configured.length))].map(
            (a, i) => {
              return (
                <TrackTournamentArenaBrackets
                  gameNumber={recapNumber > 0 ? recapNumber : 1}
                  numOfJoined={data.tournament.configured.length}
                  arenaNumber={activeArena}
                  tournamentId={data.tournament.id}
                  userId={userData.user.id}
                  handleActiveArena={(val: number) => {
                    setActiveArena(val);
                  }}
                  activeArena={activeArena === i + 1 ? true : false}
                  key={`${data.tournament.id}:${i}`}
                ></TrackTournamentArenaBrackets>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default RecapTournamentMain;
