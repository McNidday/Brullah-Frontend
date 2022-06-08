import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentArenaBrackets from "./brackets/arena/EditTournamentArenaBrackets";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  createMatchConfig,
  getAreanaFromConfig,
  getNumOfArenas,
} from "../../../functions/helpers";
import EditTournamentModal from "./modal/EditTournamentModal";

const matchConfig = {
  timmersInput: {
    afterDq: 100,
    beforeDq: 200,
    auto_reconfigure: 100,
    match_time: [
      {
        arenaNumber: 1,
        rounds: [
          {
            roundNumber: 1,
            matches: [
              {
                matchNumber: 1,
                time: 10000,
              },
            ],
          },
        ],
      },
    ],
  },
  input: {
    configure: [
      {
        arenaNumber: 1,
        rounds: [
          {
            roundNumber: 1,
            matches: [
              {
                matchNumber: 1,
                slot_one: {
                  user: "610c4b25bf2e5a2ca8738dc9",
                },
                slot_two: {
                  user: "610c5afc0f18351f4caca420",
                },
              },
              {
                matchNumber: 2,
                slot_one: {
                  user: "610c5b1d0f18351f4caca424",
                },
                slot_two: {
                  user: "610c5b3c0f18351f4caca428",
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

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
}

const TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
      id
      analytics {
        joined_users
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
          configure {
            winner {
              user
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
                  user
                  reason
                }
                slot_one {
                  joined
                  winner
                  user
                  reason
                }
                slot_two {
                  joined
                  winner
                  user
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
  mutation SaveMatchConfig($id: ID!, $config: MatchConfigInput) {
    saveConfiguration(id: $id, config: $config) {
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
        configure {
          arenaNumber
          rounds {
            roundNumber
            matches {
              matchNumber
              progress
              bye {
                advanced
                user
                reason
              }
              slot_one {
                joined
                winner
                user
                reason
              }
              slot_two {
                joined
                winner
                user
                reason
              }
            }
          }
        }
      }
    }
  }
`;

const EditMyTournament = ({ editId }: Props) => {
  const { loading, error, data } = useQuery(TOURNAMENT, {
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
  ] = useMutation(SAVE_CONFIG);

  const [activeEdit, setActiveEdit] = useState<string | null>(null);
  const [localConfig, setLocalConfig] = useState<Array<any>>([]);
  const [onlineConfig, setOnlineConfig] = useState<Array<any>>([]);

  const [numOfArenas, setNumOfArenas] = useState(0);
  const [arenas, setArenas] = useState<Array<JSX.Element> | null>(null);

  const [usersToConfigure, setUsersToConfigure] = useState<Array<User>>([]);
  const [usersJoined, setUsersJoined] = useState<Array<User>>([]);

  const handleActiveEdit = (arb: string) => {
    setActiveEdit(arb);
  };

  const handleConfigUserRemove = (arbs: string) => {};

  const handleConfigUserUpdate = (userId: string, slot: number) => {
    // arbs stands for arena, round, bracket and last;y the slot
    // In the format of 1:1:1:1
    const arbsArray = activeEdit!.split(":").map((v) => parseInt(v));
    const newOnlineConfig = [...onlineConfig];
    newOnlineConfig.forEach((a: any) => {
      if (a.arenaNumber === arbsArray[0]) {
        a.rounds.forEach((r: any, ri: number) => {
          if (r.roundNumber === arbsArray[1]) {
            a.rounds[ri].matches.forEach((m: any) => {
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
              }
            });
          }
        });
      }
    });
    const newUsersToConfigure = usersToConfigure.filter((u) => {
      return u.id !== userId;
    });
    setUsersToConfigure(newUsersToConfigure);
    // setConfig(newConfig);
    console.log(newOnlineConfig);
    // Update local config
    // Find user in joined users
    const userIndex = usersJoined.findIndex((u: any) => u.id === userId);
    const newLocalConfig = [...localConfig];
    newLocalConfig.forEach((a: any) => {
      if (a.arenaNumber === arbsArray[0]) {
        a.rounds.forEach((r: any, ri: number) => {
          if (r.roundNumber === arbsArray[1]) {
            a.rounds[ri].matches.forEach((m: any) => {
              if (m.matchNumber === arbsArray[2]) {
                if (slot === 1) {
                  m.slot_one = {
                    user: usersJoined[userIndex],
                  };
                }
                if (slot === 2) {
                  m.slot_two = {
                    user: usersJoined[userIndex],
                  };
                }
              }
            });
          }
        });
      }
    });
    setLocalConfig(newLocalConfig);
    console.log(newLocalConfig, "GAARRRRRIIIIT");
  };

  useEffect(() => {
    if (data?.tournament) {
      setNumOfArenas(getNumOfArenas(data.tournament.analytics.joined_users));
    }
  }, [data]);

  useEffect(() => {
    if (data?.tournament) {
      let config: Array<any> = [];
      if (
        data.tournament.match.configuration.configure.length !== numOfArenas
      ) {
        config = createMatchConfig(data.tournament.analytics.joined_users);
        setOnlineConfig(config);
        setLocalConfig(config);
      } else {
        config = data.tournament.match.configuration.configure;
        setLocalConfig(data.tournament.match.configuration.configure);
      }

      // Get all the users who have not been configured
      const notConfigured: Array<User> = [];
      data.tournament.match.users.joined.forEach((u: any) => {
        const configuredIndex =
          data.tournament.match.users.configured.findIndex((c: any) => {
            return c.id === u.id;
          });
        if (configuredIndex === -1) {
          notConfigured.push(u);
        }
      });
      setUsersToConfigure(notConfigured);
      // Set the joined users
      setUsersJoined(data.tournament.match.users.joined);
    }
  }, [numOfArenas]);

  useEffect(() => {
    if (localConfig.length > 0) {
      const theArenas = [];
      for (let i = 0; i < numOfArenas; i++) {
        theArenas.push(
          <EditTournamentArenaBrackets
            key={`${data.tournament.match.id}:${i + 1}`}
            setActiveEdit={handleActiveEdit}
            config={localConfig[i]}
          ></EditTournamentArenaBrackets>
        );
      }
      setArenas(theArenas);
    }
  }, [localConfig]);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className={cn(styles.editNavigation)}>Navigation</div>
      <div className={cn(styles.editContainer)}>
        {arenas?.map((a) => a)}
        <EditTournamentModal
          handleConfigUserRemove={handleConfigUserRemove}
          config={localConfig}
          usersToConfigure={usersToConfigure}
          handleConfigUserUpdate={handleConfigUserUpdate}
          activeEdit={activeEdit}
        ></EditTournamentModal>
      </div>
    </>
  );
};

export default EditMyTournament;
