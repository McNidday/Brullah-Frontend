import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./styles.module.scss";
import TrackTournamentError from "./error/TrackTournamentError";
import TrackTournamentLoading from "./loading/TrackingTournamentLoading";
import TrackTournamentNav from "./nav/TrackTournamentNav";
import TrackTournamentArenaBrackets from "./brackets/arena/TrackTournamentArenaBrackets";
import { useEffect, useState } from "react";
import { getNumOfArenas } from "../../functions/helpers";
import moment from "moment";
import dinero from "dinero.js";

const TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
      id
      reward
      start_date
      analytics {
        joined_users
      }
      information {
        name
      }
      match {
        id
        users {
          configured {
            id
            identity {
              arena_name
              avatar {
                image
                blurhash
              }
            }
          }
          joined {
            id
            identity {
              arena_name
              avatar {
                image
                blurhash
              }
            }
          }
        }
        configuration {
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
            winner {
              user {
                id
                identity {
                  arena_name
                  avatar {
                    image
                    blurhash
                  }
                }
              }
              status
            }
            arenaNumber
            rounds {
              roundNumber
              matches {
                matchNumber
                progress
                bye {
                  advanced
                  user {
                    id
                    identity {
                      arena_name
                      avatar {
                        image
                        blurhash
                      }
                    }
                  }
                  reason
                }
                slot_one {
                  joined
                  winner
                  user {
                    id
                    identity {
                      arena_name
                      avatar {
                        image
                        blurhash
                      }
                    }
                  }
                  reason
                }
                slot_two {
                  joined
                  winner
                  user {
                    id
                    identity {
                      arena_name
                      avatar {
                        image
                        blurhash
                      }
                    }
                  }
                  reason
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

const TrackTournamentMain = () => {
  const router = useRouter();
  const { loading, error, data, networkStatus, refetch } = useQuery(
    TOURNAMENT,
    {
      variables: {
        id: router.query.id,
      },
    }
  );

  const {
    data: userData,
    loading: userDataLoading,
    error: userError,
  } = useQuery(USER);

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

  const matchTime = (arm: string) => {
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
  };

  useEffect(() => {
    if (data?.tournament) {
      const numOfArenas = getNumOfArenas(
        data.tournament.analytics.joined_users
      );
      const theArenas = [];
      for (let i = 0; i < numOfArenas; i++) {
        theArenas.push(i + 1);
      }
      setArenas(theArenas);
      setTimeConfig(data.tournament.match.configuration.timmers.match_time);
      setUserConfig(data.tournament.match.configuration.configure);
      let user: any = null;
      data.tournament.match.configuration.configure.forEach((a: any) => {
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
      });
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
  }, [data]);

  if (loading) return <TrackTournamentLoading></TrackTournamentLoading>;
  if (error)
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <TrackTournamentError error={error}></TrackTournamentError>
        </div>
      </div>
    );
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <TrackTournamentNav
          perUser={perUser}
          reward={reward}
          rewardAmount={rewardAmount}
          dq={dq}
          ready={ready}
          waiting={waiting}
          notIn={notIn}
          networkStatus={networkStatus}
        ></TrackTournamentNav>
        <div className={cn(styles.tournamentContainer)}>
          {arenas?.map((a, i) => {
            return (
              <TrackTournamentArenaBrackets
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

export default TrackTournamentMain;
