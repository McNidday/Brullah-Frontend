import styles from "./styles.module.scss";
import cn from "classnames";
import moment from "moment";
import EditTournamentArenaBrackets from "./brackets/arena/EditTournamentArenaBrackets";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import {
  createMatchConfig,
  createOnlineConfigFromLocalConfig,
  createTimeConfig,
  getNumOfArenas,
} from "../../../../functions/helpers";
import EditTournamentModal from "./modal/EditTournamentModal";
import debounce from "lodash.debounce";
import EditMyTournamentLoading from "./loading/EditMyTournamentLoading";
import EditMyTournamentError from "./error/EditMyTournamentError";
import EditMyTournamentNav from "./nav/EditMyTournamentNav";
import PublishTournamentModal from "./publishModal/PublishTournamentModal";
import Image from "next/image";

interface User {
  id: string;
  identity: {
    arena_name: string;
    avatar: {
      image: string;
      blurhash: string;
    };
  };
}

interface Props {
  editId: string;
  setEditId: (id: string | null) => void;
}

const TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
      id
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

const SAVE_CONFIG = gql`
  mutation SaveMatchConfig(
    $id: ID!
    $config: MatchConfigInput
    $timmers: MatchTimmersInput
  ) {
    saveConfiguration(id: $id, config: $config, timmers: $timmers) {
      id
    }
  }
`;

const EditMyTournament = ({ editId, setEditId }: Props) => {
  const { loading, error, data, refetch } = useQuery(TOURNAMENT, {
    variables: {
      id: editId,
    },
  });

  const [
    saveTournamentConfig,
    {
      data: saveConfigData,
      loading: saveConfigLoading,
      error: saveConfigError,
      reset,
    },
  ] = useMutation(SAVE_CONFIG, {
    errorPolicy: "all",
  });

  const [activeEdit, setActiveEdit] = useState<string | null>(null);
  const [localConfig, setLocalConfig] = useState<Array<any>>([]);
  const [onlineConfig, setOnlineConfig] = useState<Array<any>>([]);
  const [timeConfig, setTimeConfig] = useState<Array<any>>([]);
  const [showPublishModal, setShowPublisModal] = useState(false);

  const [numOfArenas, setNumOfArenas] = useState(0);
  const [arenas, setArenas] = useState<Array<number>>([]);

  const [usersToConfigure, setUsersToConfigure] = useState<Array<User>>([]);
  const [usersJoined, setUsersJoined] = useState<Array<User>>([]);

  const [activeArena, setActiveArena] = useState(1);

  const saveConfigDebounce = useRef(
    debounce((id, config, onlineTimeConfig) => {
      saveTournamentConfig({
        variables: {
          id: id,
          timmers: {
            afterDq: 30,
            beforeDq: 30,
            auto_reconfigure: 30,
            match_time: onlineTimeConfig,
          },
          config: {
            configure: config,
          },
        },
      });
    }, 5000)
  );

  const handleActiveEdit = (arb: string | null) => {
    setActiveEdit(arb);
  };

  const matchConfigShallowCopy = (config: any) => {
    return config.map((a: any) => {
      return {
        ...a,
        rounds: a.rounds.map((r: any) => {
          return {
            ...r,
            matches: r.matches.map((m: any) => {
              return {
                ...m,
                slot_one: {
                  ...m.slot_one,
                },
                slot_two: {
                  ...m.slot_two,
                },
              };
            }),
          };
        }),
      };
    });
  };

  const handleConfigUserRemove = (arbs: string) => {
    const arbsArray = arbs.split(":").map((v) => parseInt(v));
    const newOnlineConfig = matchConfigShallowCopy(onlineConfig);
    newOnlineConfig.forEach((a: any) => {
      if (a.arenaNumber === arbsArray[0]) {
        a.rounds.forEach((r: any, ri: number) => {
          if (r.roundNumber === arbsArray[1]) {
            a.rounds[ri].matches.forEach((m: any) => {
              if (m.matchNumber === arbsArray[2]) {
                if (arbsArray[3] === 1) {
                  m.slot_one = {};
                }
                if (arbsArray[3] === 2) {
                  m.slot_two = {};
                }
                delete m.bye;
              }
            });
          }
        });
      }
    });
    setOnlineConfig(newOnlineConfig);
    const newUsersToConfigure = [...usersToConfigure];
    // Find user in joined users
    const newLocalConfig = matchConfigShallowCopy(localConfig);
    newLocalConfig.forEach((a: any) => {
      if (a.arenaNumber === arbsArray[0]) {
        a.rounds.forEach((r: any, ri: number) => {
          if (r.roundNumber === arbsArray[1]) {
            a.rounds[ri].matches.forEach((m: any) => {
              if (m.matchNumber === arbsArray[2]) {
                if (arbsArray[3] === 1) {
                  newUsersToConfigure.push({ ...m.slot_one.user });
                  m.slot_one = {};
                }
                if (arbsArray[3] === 2) {
                  newUsersToConfigure.push({ ...m.slot_two.user });
                  m.slot_two = {};
                }
                if (m.bye) {
                  newUsersToConfigure.push({ ...m.bye.user });
                  delete m.bye;
                }
              }
            });
          }
        });
      }
    });
    setUsersToConfigure(newUsersToConfigure);
    setLocalConfig(newLocalConfig);
  };

  const handleConfigUserUpdate = (userId: string, slot: number) => {
    // arbs stands for arena, round, bracket and last;y the slot
    // In the format of 1:1:1:1
    const arbsArray = activeEdit!.split(":").map((v) => parseInt(v));
    const newOnlineConfig = matchConfigShallowCopy(onlineConfig);
    newOnlineConfig.forEach((a: any) => {
      if (a.arenaNumber === arbsArray[0]) {
        a.rounds.forEach((r: any) => {
          if (r.roundNumber === arbsArray[1]) {
            r.matches.forEach((m: any) => {
              if (m.matchNumber === arbsArray[2]) {
                if (slot === 1) {
                  m.slot_one = {
                    user: userId,
                  };
                }
                if (slot === 2) {
                  m.slot_two = {
                    user: userId,
                  };
                }
                if (slot === 3) {
                  m.bye = {
                    user: userId,
                  };
                }
              }
            });
          }
        });
      }
    });
    setOnlineConfig(newOnlineConfig);
    const newUsersToConfigure = usersToConfigure.filter((u) => {
      return u.id !== userId;
    });
    setUsersToConfigure(newUsersToConfigure);
    // Update local config
    // Find user in joined users
    const userIndex = usersJoined.findIndex((u: any) => u.id === userId);
    const newLocalConfig = matchConfigShallowCopy(localConfig);
    newLocalConfig.forEach((a: any) => {
      if (a.arenaNumber === arbsArray[0]) {
        a.rounds.forEach((r: any, ri: number) => {
          if (r.roundNumber === arbsArray[1]) {
            a.rounds[ri].matches.forEach((m: any) => {
              if (m.matchNumber === arbsArray[2]) {
                if (slot === 1) {
                  m.slot_one = {
                    user: { ...usersJoined[userIndex] },
                  };
                }
                if (slot === 2) {
                  m.slot_two = {
                    user: { ...usersJoined[userIndex] },
                  };
                }
                if (slot === 3) {
                  m.bye = {
                    user: { ...usersJoined[userIndex] },
                  };
                }
              }
            });
          }
        });
      }
    });
    setLocalConfig(newLocalConfig);
  };

  const handleAutoPple = () => {
    const newOnlineConfig = createMatchConfig(usersJoined.length);
    usersJoined.forEach((u) => {
      let inserted = false;
      newOnlineConfig.forEach((a) => {
        a.rounds.forEach((r: any) => {
          r.matches.forEach((m: any) => {
            if (inserted) return;
            if (!m.slot_one.user) {
              m.slot_one = { user: u.id };
              inserted = true;
            } else if (!m.slot_two.user) {
              m.slot_two = { user: u.id };
              inserted = true;
            }
          });
        });
      });
    });
    setOnlineConfig(newOnlineConfig);
    const newLocalConfig = createMatchConfig(usersJoined.length);
    usersJoined.forEach((u) => {
      let inserted = false;
      newLocalConfig.forEach((a) => {
        a.rounds.forEach((r: any) => {
          r.matches.forEach((m: any) => {
            if (inserted) return;
            if (!m.slot_one.user) {
              m.slot_one = { user: { ...u } };
              delete m.slot_one.user.__typename;
              inserted = true;
            } else if (!m.slot_two.user) {
              m.slot_two = { user: { ...u } };
              delete m.slot_two.user.__typename;
              inserted = true;
            }
          });
        });
      });
    });
    setLocalConfig(newLocalConfig);
    setUsersToConfigure([]);
    handleTimeUpdate(4);
  };

  const handleTimeUpdate = (hours: number) => {
    const roundOneTime = moment().add(hours, "hours");
    const roundTwoTime = roundOneTime.clone().add(hours, "hours");
    const roundThreeTime = roundTwoTime.clone().add(hours, "hours");
    const roundFourTime = roundThreeTime.clone().add(hours, "hours");
    const newTimeConfig = createTimeConfig(usersJoined.length);
    newTimeConfig.forEach((a) => {
      a.rounds.forEach((r: any) => {
        r.matches.forEach((m: any) => {
          if (r.roundNumber === 1) {
            m.time = roundOneTime.unix();
          }
          if (r.roundNumber === 2) {
            m.time = roundTwoTime.unix();
          }
          if (r.roundNumber === 3) {
            m.time = roundThreeTime.unix();
          }
          if (r.roundNumber === 4) {
            m.time = roundFourTime.unix();
          }
        });
      });
    });
    setTimeConfig(newTimeConfig);
  };

  const handlePublishModalOpen = () => {
    setShowPublisModal(true);
  };

  const handlePublishModalClose = () => {
    setShowPublisModal(false);
  };

  useEffect(() => {
    if (data?.tournament) {
      setNumOfArenas(getNumOfArenas(data.tournament.analytics.joined_users));
    }
  }, [data]);

  useEffect(() => {
    if (data?.tournament) {
      if (
        !data.tournament.match.configuration.timmers ||
        data.tournament.match.configuration.timmers.match_time.length !==
          numOfArenas
      ) {
        setTimeConfig(createTimeConfig(data.tournament.analytics.joined_users));
      } else {
        setTimeConfig(
          createTimeConfig(
            data.tournament.analytics.joined_users,
            data.tournament.match.configuration.timmers.match_time
          )
        );
      }

      if (
        data.tournament.match.configuration.configure.length !== numOfArenas
      ) {
        setOnlineConfig(
          createMatchConfig(data.tournament.analytics.joined_users)
        );
        setLocalConfig(
          createMatchConfig(data.tournament.analytics.joined_users)
        );
        setUsersToConfigure(data.tournament.match.users.joined);
      } else {
        const config = createOnlineConfigFromLocalConfig(
          data.tournament.match.users.joined,
          matchConfigShallowCopy(data.tournament.match.configuration.configure)
        );
        setOnlineConfig(config.onlineConfig);
        setUsersToConfigure(config.usersToConfigure);
        setLocalConfig(config.localConfig);
      }
      // Set the joined users
      setUsersJoined(data.tournament.match.users.joined);
    }
  }, [numOfArenas, data.tournament]);

  useEffect(() => {
    if (localConfig.length > 0) {
      const theArenas = [];
      for (let i = 0; i < numOfArenas; i++) {
        theArenas.push(i + 1);
      }
      setArenas(theArenas);
    }
  }, [localConfig, data, numOfArenas]);

  useEffect(() => {
    if (data?.tournament && onlineConfig.length > 0) {
      saveConfigDebounce.current(
        data.tournament.match.id,
        onlineConfig,
        timeConfig
      );
    }
  }, [onlineConfig, timeConfig, data, data.tournament]);

  useEffect(() => {
    if (saveConfigData || saveConfigError) {
      setTimeout(reset, 10000);
    }
  }, [saveConfigData, reset, saveConfigError]);

  if (loading) return <EditMyTournamentLoading></EditMyTournamentLoading>;
  if (error)
    return <EditMyTournamentError error={error}></EditMyTournamentError>;

  return (
    <>
      <EditMyTournamentNav
        setEditId={setEditId}
        handlePublishModalOpen={handlePublishModalOpen}
        handleAutoPple={handleAutoPple}
        saveConfigError={saveConfigError}
        saveConfigLoading={saveConfigLoading}
      ></EditMyTournamentNav>
      {arenas.length > 0 ? (
        <div className={cn(styles.editContainer)}>
          {arenas?.map((a, i) => {
            return (
              <EditTournamentArenaBrackets
                handleActiveArena={(val: number) => {
                  setActiveArena(val);
                }}
                activeArena={activeArena === i + 1 ? true : false}
                activeEdit={activeEdit}
                key={`${data.tournament.match.id}:${a}`}
                setActiveEdit={handleActiveEdit}
                config={localConfig[i]}
                time={timeConfig[i]}
              ></EditTournamentArenaBrackets>
            );
          })}
          <div className={cn(styles.modalContainer)}>
            <EditTournamentModal
              setActiveEdit={(val: string | null) => setActiveEdit(val)}
              handleTimeUpdate={handleTimeUpdate}
              joinedUsers={usersJoined}
              handleConfigUserRemove={handleConfigUserRemove}
              config={localConfig}
              usersToConfigure={usersToConfigure}
              handleConfigUserUpdate={handleConfigUserUpdate}
              activeEdit={activeEdit}
            ></EditTournamentModal>
          </div>
        </div>
      ) : (
        <div className={cn(styles.editContainer)}>
          <div className={cn(styles.noUsers)}>
            <div>
              <Image src="/illustrations/02.png" layout="fill" alt=""></Image>
            </div>
            <div>
              <h3>
                You cannot configure the tournament yet, no one has joined the
                tournament yet.
              </h3>
            </div>
          </div>
        </div>
      )}

      {data?.tournament ? (
        <PublishTournamentModal
          refetchTournament={() => refetch()}
          tournament={data.tournament}
          showPublishModal={showPublishModal}
          handlePublishModalClose={handlePublishModalClose}
        ></PublishTournamentModal>
      ) : (
        ""
      )}
    </>
  );
};

export default EditMyTournament;
