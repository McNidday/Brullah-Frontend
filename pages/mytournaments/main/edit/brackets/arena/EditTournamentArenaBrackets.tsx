import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentBrackets from "../plain/EditTournamentBrackets";
import Button from "../../../../../components/Button/Button";
import { useEffect, useState } from "react";
import Icon from "../../../../../components/Icon/Icon";

interface Props {
  activeArena: boolean;
  activeEdit: string | null;
  setActiveEdit: (arbs: string | null) => void;
  handleActiveArena: (arena: number) => void;
  config: {
    arenaNumber: number;
    rounds: [
      {
        roundNumber: number;
        matches: [
          {
            matchNumber: number;
            progress: string;
            slot_one: {
              joined: boolean;
              user: {
                identity: {
                  arena_name: string;
                  avatar: {
                    image: string;
                    blurhash: string;
                  };
                };
              };
              reason: string;
            };
            slot_two: {
              joined: boolean;
              user: {
                identity: {
                  arena_name: string;
                  avatar: {
                    image: string;
                    blurhash: string;
                  };
                };
              };
              reason: string;
            };
          }
        ];
      }
    ];
  };
  time: {
    arenaNumber: number;
    rounds: [
      {
        roundNumber: number;
        matches: [
          {
            matchNumber: number;
            time: number;
          }
        ];
      }
    ];
  };
}

const EditTournamentArenaBrackets = ({
  activeArena,
  handleActiveArena,
  config,
  setActiveEdit,
  activeEdit,
  time,
}: Props) => {
  const [arenaHover, setArenaHover] = useState(false);
  const [section, setSection] = useState(1);
  const [sectionOne, setSectionOne] = useState<
    Array<{
      matchNumber: number;
      progress: string;
      slot_one: {
        joined: boolean;
        user: {
          identity: {
            arena_name: string;
            avatar: {
              image: string;
              blurhash: string;
            };
          };
        };
        reason: string;
      };
      slot_two: {
        joined: boolean;
        user: {
          identity: {
            arena_name: string;
            avatar: {
              image: string;
              blurhash: string;
            };
          };
        };
        reason: string;
      };
    }>
  >([]);
  const [sectionTwo, setSectionTwo] = useState<
    Array<{
      matchNumber: number;
      progress: string;
      slot_one: {
        joined: boolean;
        user: {
          identity: {
            arena_name: string;
            avatar: {
              image: string;
              blurhash: string;
            };
          };
        };
        reason: string;
      };
      slot_two: {
        joined: boolean;
        user: {
          identity: {
            arena_name: string;
            avatar: {
              image: string;
              blurhash: string;
            };
          };
        };
        reason: string;
      };
    }>
  >([]);

  useEffect(() => {
    if (
      config.rounds[0].matches.length <= 4 ||
      config.rounds[0].matches.length > 4
    ) {
      setSectionOne(config.rounds[0].matches.slice(0, 4));
    }

    if (config.rounds[0].matches.length > 4) {
      setSectionTwo(config.rounds[0].matches.slice(4, 9));
    }
  }, [config]);

  return (
    <div className={cn(styles.container)}>
      <div
        onMouseEnter={() => setArenaHover(true)}
        onMouseLeave={() => setArenaHover(false)}
        className={cn(styles.arenaNav)}
        onClick={() => {
          if (
            activeEdit &&
            parseInt(activeEdit?.split(":")[0]) !== config.arenaNumber
          ) {
            setActiveEdit(null);
          }
          handleActiveArena(config.arenaNumber);
        }}
      >
        <h2>Arena {config.arenaNumber}</h2>
        <div
          className={cn(
            styles.openArenaIcon,
            !activeArena ? styles.inactiveOpenArenaIcon : ""
          )}
        >
          <Icon
            activeLink="/icons/dropdown/active.svg"
            inactiveLink="/icons/dropdown/inactive.svg"
            hover={arenaHover}
          ></Icon>
        </div>
      </div>
      <div
        className={cn(
          styles.brackets,
          !activeArena ? styles.inactiveBrackets : ""
        )}
      >
        <div className={cn(styles.sectionNav)}>
          {sectionOne.length >= 1 ? (
            <Button
              text="Section 1"
              disabled={false}
              forceActive={section === 1 ? true : false}
              onClick={() => {
                if (section !== 1) {
                  setActiveEdit(null);
                }
                setSection(1);
              }}
            ></Button>
          ) : (
            ""
          )}
          {sectionTwo.length >= 1 ? (
            <Button
              text="Section 2"
              disabled={false}
              forceActive={section === 2 ? true : false}
              onClick={() => {
                if (section !== 2) {
                  setActiveEdit(null);
                }
                setSection(2);
              }}
            ></Button>
          ) : (
            ""
          )}
        </div>
        <div className={cn(styles.sections)}>
          {sectionOne.length >= 1 && section === 1 ? (
            <section>
              <EditTournamentBrackets
                activeEdit={activeEdit}
                setActiveEdit={setActiveEdit}
                roundNumber={1}
                arenaNumber={config.arenaNumber}
                matches={sectionOne}
                time={time}
              ></EditTournamentBrackets>
            </section>
          ) : (
            ""
          )}
          {sectionTwo.length >= 1 && section === 2 ? (
            <section>
              <EditTournamentBrackets
                activeEdit={activeEdit}
                setActiveEdit={setActiveEdit}
                roundNumber={1}
                arenaNumber={config.arenaNumber}
                matches={sectionTwo}
                time={time}
              ></EditTournamentBrackets>
            </section>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTournamentArenaBrackets;
