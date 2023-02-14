import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./styles.module.scss";
import TrackTournamentError from "./error/TrackTournamentError";
import TrackTournamentLoading from "./loading/TrackingTournamentLoading";
import TrackTournamentNav from "./nav/TrackTournamentNav";
import TrackTournamentArenaBrackets from "./brackets/arena/TrackTournamentArenaBrackets";
import { useCallback, useEffect, useState } from "react";
import {
  createOnlineConfigFromLocalConfig,
  getNumOfArenas,
  matchConfigShallowCopy,
} from "../../../functions/helpers";
import moment from "moment";
import dinero from "dinero.js";
import RecapTournamentList from "./recapCard/RecapTournamentList";

const TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
      id
      reward
      start_date
      status {
        id
        progress
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
      analytics {
        id
        joined_users
      }
      information {
        id
        name
      }
      match {
        id
        users {
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
        recap {
          timmers {
            afterDq
            beforeDq
            auto_reconfigure
            match_time {
              arenaNumber
              rounds {
                roundNumber
                matches {
                  matchNumber
                  time
                }
              }
            }
          }
          configure {
            arenaNumber
            winner {
              status
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
            rounds {
              roundNumber
              matches {
                matchNumber
                done
                bye {
                  reason
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
                slot_two {
                  reason
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
                  reason
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
              }
            }
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

const RecapTournamentMain = () => {
  const router = useRouter();
  const { loading, error, data, networkStatus, refetch } = useQuery(
    TOURNAMENT,
    {
      errorPolicy: "all",
      variables: {
        id: router.query.id,
      },
    }
  );

  const {
    data: userData,
    loading: userDataLoading,
    error: userError,
  } = useQuery(USER, { errorPolicy: "all" });

  const [timeConfig, setTimeConfig] = useState<Array<any>>([]);
  const [userConfig, setUserConfig] = useState<Array<any>>([]);
  const [arenas, setArenas] = useState<Array<number>>([]);
  const [activeArena, setActiveArena] = useState(1);

  const [ready, setReady] = useState(false);
  const [waiting, setWaiting] = useState<number | null>(null);
  const [dq, setDq] = useState(false);
  const [notIn, setNotIn] = useState(false);

  const [rewardAmount, setRewardAmount] = useState<string>("NONE");
  const [reward, setReward] = useState("NONE");
  const [perUser, setPerUser] = useState("NONE");
  const [recapNumber, setRecapNumber] = useState(0);

  const matchTime = useCallback(
    (arm: string) => {
      // arm stands for arena rounds and match number
      let time: number = 0;
      const armArray = arm.split(":");
      data.tournament.match.configuration.timmers.match_time.forEach(
        (ma: any) => {
          if (armArray[0] !== ma.arenaNumber) return;
          ma.rounds.forEach((ra: any) => {
            if (armArray[1] !== ra.roundNumber) return;
            ra.matches.forEach((mt: any) => {
              if (mt.matchNumber !== armArray[2]) return;
              time = mt.time;
            });
          });
        }
      );
      return time;
    },
    [data?.tournament?.match?.configuration?.timmers?.match_time]
  );

  useEffect(() => {
    if (
      data?.tournament &&
      data.tournament.match.recap.length > 0 &&
      recapNumber > 0
    ) {
      const numOfArenas = getNumOfArenas(
        data.tournament.analytics.joined_users
      );
      const theArenas = [];
      for (let i = 0; i < numOfArenas; i++) {
        theArenas.push(i + 1);
      }
      const config = createOnlineConfigFromLocalConfig(
        data.tournament.match.users.joined,
        matchConfigShallowCopy(
          data.tournament.match.recap[recapNumber - 1].configure
        ),
        true,
        true
      );
      setArenas(theArenas);
      setTimeConfig(
        data.tournament.match.recap[recapNumber - 1].timmers.match_time
      );
      setUserConfig(config.localConfig);
      let user: any = null;
      data.tournament.match.recap[recapNumber - 1].configure.forEach(
        (a: any) => {
          a.rounds.forEach((r: any) => {
            r.matches.forEach((s: any) => {
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
              if (user && !s.done) {
                const time = matchTime(
                  `${a.arenaNumber}:${r.roundNumber}:${s.matchNumber}`
                );
                if (moment().isAfter(moment.unix(time))) {
                  setReady(true);
                }
                if (moment().isSameOrBefore(moment.unix(time))) {
                  setWaiting(time);
                }
              } else if (user && s.done) {
                if (!user.winner) {
                  setDq(true);
                }
              }
            });
          });
        }
      );
      if (!user) {
        setNotIn(true);
      }
      // Set the rewards
      if (data.tournament.reward === "SPONSOR") {
        setRewardAmount(
          dinero({
            currency: data.tournament.sponsor.balance.currency,
            amount: data.tournament.sponsor.balance.value,
          }).toFormat()
        );
      }

      if (data.tournament.reward === "CONTRIBUTION") {
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
  }, [recapNumber, data?.tournament, userData?.user?.id, matchTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, moment.duration(10, "minutes").asMilliseconds());
    return () => clearInterval(interval);
  }, [refetch]);

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
  if (data.tournament.match.recap.length <= 0)
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <TrackTournamentError
            message={`There is currently no recap for ${data.tournament.information.name}`}
          ></TrackTournamentError>
        </div>
      </div>
    );
  if (recapNumber === 0) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <TrackTournamentNav
            matchId={data.tournament.match.id}
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
            recaps={data.tournament.match.recap.length}
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
          matchId={data.tournament.match.id}
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
          {arenas?.map((a, i) => {
            return (
              <TrackTournamentArenaBrackets
                userId={userData.user.id}
                handleActiveArena={(val: number) => {
                  setActiveArena(val);
                }}
                activeArena={activeArena === i + 1 ? true : false}
                key={`${data.tournament.match.id}:${a}`}
                config={userConfig[i]}
                time={timeConfig[i]}
              ></TrackTournamentArenaBrackets>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecapTournamentMain;
