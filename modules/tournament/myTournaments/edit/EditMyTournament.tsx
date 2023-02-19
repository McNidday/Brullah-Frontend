import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentArenaBrackets from "./brackets/arena/EditTournamentArenaBrackets";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { DateTime, Duration } from "luxon";
import EditTournamentModal from "./modal/EditTournamentModal";
import EditMyTournamentLoading from "./loading/EditMyTournamentLoading";
import EditMyTournamentError from "./error/EditMyTournamentError";
import EditMyTournamentNav from "./nav/EditMyTournamentNav";
import PublishTournamentModal from "./publishModal/PublishTournamentModal";
import Image from "next/image";
import { MatchType } from "../../../../types/match";
import {
  isByeNumber,
  numOfArenas,
  numOfMatches,
} from "../../../../functions/helpers";

interface Props {
  editId: string;
  setEditId: (id: string | null) => void;
}

const TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
      id
      start_date
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

const MATCH = gql`
  query GetMatch($input: GetMatchInput!) {
    match(input: $input) {
      time
      match_number
      slot_two {
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
      slot_one {
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

const SAVE_CONFIG = gql`
  mutation SaveMatchConfig($input: MatchConfigInput) {
    saveMatchConfig(input: $input) {
      id
    }
  }
`;

const EditMyTournament = ({ editId, setEditId }: Props) => {
  const { loading, error, data, refetch } = useQuery<{
    tournament: {
      id: string;
      start_date: string;
      information: {
        name: string;
      };
      configured: Array<{
        id: string;
        identity: {
          brullah_name: string;
          avatar: {
            image: string;
            blurhash: string;
          };
        };
      }>;
      joined: Array<{
        id: string;
        identity: {
          brullah_name: string;
          avatar: {
            image: string;
            blurhash: string;
          };
        };
      }>;
      config: {
        after_dq: number;
        before_dq: number;
        round_offset: number;
        match_length: number;
      };
    };
  }>(TOURNAMENT, {
    variables: {
      id: editId,
    },
  });
  const [getMatch] = useLazyQuery<{
    match: MatchType;
  }>(MATCH);
  const [saveConfig] = useMutation(SAVE_CONFIG, {
    errorPolicy: "all",
  });
  const [activeEdit, setActiveEdit] = useState<string | null>(null);
  const [showPublishModal, setShowPublisModal] = useState(false);
  const [config, setConfig] = useState<
    Array<{ id: string; configured: boolean; arbs: string; removed?: boolean }>
  >([]);
  const [activeArena, setActiveArena] = useState(1);
  const [time, setTime] = useState("");
  const [initialized, setInitialized] = useState(false);

  const handleActiveEdit = (arb: string | null) => {
    setActiveEdit(arb);
  };
  const addToConfigured = (id: string, arbs: string) => {
    setConfig((ic) => {
      return [...ic, { id, arbs, configured: false }];
    });
  };
  const handleAutoConfigure = async () => {
    if (loading || !data || !initialized) return;
    setInitialized(() => false);
    const newConfig: Array<{
      id: string;
      configured: boolean;
      arbs: string;
      removed?: boolean;
    }> = [];
    const validNumbers = [5, 9, 13];
    let bye = false;
    if (data.tournament.joined.length % 2 !== 0) {
      let testBye = data.tournament.joined.length;
      while (testBye > 16) {
        testBye -= 16;
      }
      // Check if bye or just normales
      const testIndex = validNumbers.findIndex((v) => {
        return testBye === v;
      });
      if (testIndex <= -1) {
        bye = true;
      }
    }
    // Loop and create the matches with the arena winners
    for (let a = 1; a <= numOfArenas(data.tournament.joined.length); a++) {
      const mapped: Array<
        Array<{
          id: string;
          identity: {
            brullah_name: string;
            avatar: {
              image: string;
              blurhash: string;
            };
          };
        }>
      > = [];
      const mappedArena = data.tournament.joined.slice((a - 1) * 16, a * 16);
      for (let i = 0; i < 16; i += 2) {
        let map: Array<{
          id: string;
          identity: {
            brullah_name: string;
            avatar: {
              image: string;
              blurhash: string;
            };
          };
        }> = [];
        if (mappedArena[i]) map.push(mappedArena[i]);
        if (mappedArena[i + 1]) map.push(mappedArena[i + 1]);
        if (mappedArena[i] || mappedArena[i + 1]) mapped.push(map);
      }
      for (
        let m = 1;
        m <= numOfMatches(data.tournament.joined.length, a, 1);
        m++
      ) {
        const input: {
          id: string;
          arena_number: number;
          round_number: number;
          match_number: number;
          time?: string;
          slot_one?: string;
          slot_two?: string;
          bye_slot?: string;
        } = {
          id: data.tournament.id,
          arena_number: a,
          round_number: 1,
          match_number: m,
          time: time,
        };
        if (
          a === numOfArenas(data.tournament.joined.length) &&
          m === numOfMatches(data.tournament.joined.length, a, 1) &&
          bye
        ) {
          input.slot_one = mapped[m - 1][0].id;
          newConfig.push({
            id: mapped[m - 1][0].id,
            arbs: `${a}:${1}:${m}:1`,
            configured: false,
          });
          input.slot_two = mapped[m - 1][1].id;
          newConfig.push({
            id: mapped[m - 1][1].id,
            arbs: `${a}:${1}:${m}:2`,
            configured: false,
          });
          input.bye_slot = mapped[m][0].id;
          newConfig.push({
            id: mapped[m][0].id,
            arbs: `${a}:${1}:${m}:3`,
            configured: false,
          });
        } else {
          if (mapped[m - 1][0]) {
            input.slot_one = mapped[m - 1][0].id;
            newConfig.push({
              id: mapped[m - 1][0].id,
              arbs: `${a}:${1}:${m}:1`,
              configured: false,
            });
          }
          if (mapped[m - 1][1]) {
            input.slot_two = mapped[m - 1][1].id;
            newConfig.push({
              id: mapped[m - 1][1].id,
              arbs: `${a}:${1}:${m}:2`,
              configured: false,
            });
          }
        }
        await saveConfig({ variables: { input } });
      }
    }
    setConfig(() => newConfig);
    setInitialized(() => true);
  };
  const removeBye = async (input: {
    id: string;
    arena_number: number;
    round_number: number;
    match_number: number;
    time?: string;
    slot_one?: string;
    slot_two?: string;
    bye_slot?: string;
  }) => {
    await saveConfig({ variables: { input } });
    const arbs = `${input.arena_number}:${input.round_number}:${input.match_number}:3`;
    setConfig((ic) => ic.filter((v) => v.arbs !== arbs));
  };
  const handlePublishModalOpen = () => {
    setShowPublisModal(true);
  };
  const handlePublishModalClose = () => {
    setShowPublisModal(false);
  };
  const markConfigured = (id: string) => {
    setConfig((ic) => {
      return ic.map((c) => (c.id === id ? { ...c, configured: true } : c));
    });
  };
  const removeMarked = (arbs: string) => {
    setConfig((ic) => {
      return ic.filter((v) => v.arbs !== arbs);
    });
  };
  const markRemovedFromConfigured = (arbs: string) => {
    setConfig((ic) => {
      // A bye should be removed if one of the slots have been removed
      const byeArbs = `${arbs.split(":").splice(0, 3).join(":")}:3`;
      return ic.map((v) =>
        v.arbs === arbs
          ? { ...v, removed: true }
          : byeArbs !== arbs && v.arbs === byeArbs
          ? { ...v, removed: true }
          : v
      );
    });
  };
  useEffect(() => {
    (async () => {
      if (data && !loading) {
        let time = DateTime.fromISO(data?.tournament.start_date);
        do {
          time = time.plus(Duration.fromObject({ hours: 2 }));
        } while (time < DateTime.now());
        setTime(time.toISO());
        for (let i = 1; i <= numOfArenas(data.tournament.joined.length); i++) {
          for (
            let m = 1;
            m <= numOfMatches(data.tournament.joined.length, i, 1);
            m++
          ) {
            const res = await getMatch({
              variables: {
                input: {
                  tournament: data.tournament.id,
                  game: 1,
                  arena_number: i,
                  round_number: 1,
                  match_number: m,
                },
              },
            });

            if (res.data?.match.slot_one?.user) {
              setConfig((ic) => {
                return [
                  ...ic,
                  {
                    id: res.data!.match.slot_one!.user.id,
                    arbs: `${i}:${1}:${m}:1`,
                    configured: true,
                  },
                ];
              });
            }

            if (res.data?.match.slot_two?.user) {
              setConfig((ic) => {
                return [
                  ...ic,
                  {
                    id: res.data!.match.slot_two!.user.id,
                    arbs: `${i}:${1}:${m}:2`,
                    configured: true,
                  },
                ];
              });
            }

            if (res.data?.match.bye_slot?.user) {
              let num = data.tournament.joined.length;
              for (
                let k = 1;
                k < numOfArenas(data.tournament.joined.length);
                k++
              ) {
                num -= 16;
              }
              if (!isByeNumber(num >= 16 ? 16 : num)) {
                setConfig((ic) => {
                  return [
                    ...ic,
                    {
                      id: res.data!.match.bye_slot!.user.id,
                      arbs: `${i}:${1}:${m}:3`,
                      configured: true,
                    },
                  ];
                });
              }
            }
          }
        }
        setInitialized(true);
      }
    })();
  }, [data, loading, getMatch]);

  if (error)
    return <EditMyTournamentError error={error}></EditMyTournamentError>;

  if (loading || !data)
    return <EditMyTournamentLoading></EditMyTournamentLoading>;

  return (
    <>
      <EditMyTournamentNav
        setEditId={setEditId}
        handlePublishModalOpen={handlePublishModalOpen}
        handleAutoPple={handleAutoConfigure}
      ></EditMyTournamentNav>
      {numOfArenas(data.tournament.joined.length) > 0 ? (
        <div className={cn(styles.editContainer)}>
          {[...Array(numOfArenas(data.tournament.joined.length))].map(
            (a, i) => {
              return (
                <EditTournamentArenaBrackets
                  time={time}
                  removeBye={removeBye}
                  removeMarked={removeMarked}
                  markConfigured={markConfigured}
                  config={config}
                  arenaNumber={i + 1}
                  numOfJoined={data.tournament.joined.length}
                  tournamentId={data.tournament.id}
                  handleActiveArena={(val: number) => {
                    setActiveArena(val);
                  }}
                  activeArena={activeArena === i + 1 ? true : false}
                  activeEdit={activeEdit}
                  key={`${data.tournament.id}:${i}`}
                  setActiveEdit={handleActiveEdit}
                ></EditTournamentArenaBrackets>
              );
            }
          )}
          <div className={cn(styles.modalContainer)}>
            <EditTournamentModal
              initialized={initialized}
              config={config}
              addToConfigured={addToConfigured}
              setActiveEdit={(val: string | null) => setActiveEdit(val)}
              markRemovedFromConfigured={markRemovedFromConfigured}
              usersToConfigure={data.tournament.joined}
              activeEdit={activeEdit}
            ></EditTournamentModal>
          </div>
        </div>
      ) : (
        <div className={cn(styles.editContainer)}>
          <div className={cn(styles.noUsers)}>
            <div>
              <Image
                fill
                src="/illustrations/02.png"
                alt="Illustration"
              ></Image>
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
