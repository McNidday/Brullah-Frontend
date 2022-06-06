import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentBrackets from "../plain/EditTournamentBrackets";
import Button from "../../../../../components/Button/Button";
import { useEffect, useState } from "react";

interface Props {
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
}

const EditTournamentArenaBrackets = ({ config }: Props) => {
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
      <h2>Arena {config.arenaNumber}</h2>
      <div className={cn(styles.brackets)}>
        <div className={cn(styles.sectionNav)}>
          {sectionOne.length >= 1 ? (
            <Button
              text="Section 1"
              disabled={false}
              forceActive={section === 1 ? true : false}
              onClick={() => setSection(1)}
            ></Button>
          ) : (
            ""
          )}
          {sectionTwo.length >= 1 ? (
            <Button
              text="Section 2"
              disabled={false}
              forceActive={section === 2 ? true : false}
              onClick={() => setSection(2)}
            ></Button>
          ) : (
            ""
          )}
        </div>
        <div className={cn(styles.sections)}>
          {sectionOne.length >= 1 ? (
            <section>
              <EditTournamentBrackets
                matches={sectionOne}
              ></EditTournamentBrackets>
            </section>
          ) : (
            ""
          )}
          {sectionTwo.length >= 1 ? (
            <section>
              <EditTournamentBrackets
                matches={sectionTwo}
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
