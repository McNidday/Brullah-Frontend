import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentBrackets from "../plain/TrackTournamentBrackets";
import { useEffect, useState } from "react";
import Icon from "../../../../components/Icon/Icon";
import Button from "../../../../components/Button/Button";
import Image from "next/image";
import { decodeBlurHash } from "../../../../functions/helpers";

interface User {
  identity: {
    arena_name: string;
    avatar: {
      image: string;
      blurhash: string;
    };
  };
}

interface Props {
  activeArena: boolean;
  handleActiveArena: (arena: number) => void;
  config: {
    winner: { status: "IN-PROGRESS" | "NONE" | "DONE"; user: User } | null;
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
              user: User;
              reason: string;
            };
            slot_two: {
              joined: boolean;
              user: User;
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

const TrackTournamentArenaBrackets = ({
  activeArena,
  handleActiveArena,
  config,
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
        {config.winner?.status === "DONE" ? (
          <div className={cn(styles.arenaWinner)}>
            <div className={cn(styles.arenaWinnerName)}>
              Arena Winner: {config.winner.user.identity.arena_name}
            </div>
            <div className={cn(styles.arenaWinnerImage)}>
              <Image
                src={config.winner.user.identity.avatar.image}
                layout="fill"
                placeholder="blur"
                blurDataURL={decodeBlurHash(
                  config.winner.user.identity.avatar.blurhash,
                  50,
                  50
                )}
              ></Image>
            </div>
          </div>
        ) : config.winner?.status === "NONE" ? (
          <div className={cn(styles.arenaWinner)}>
            <div className={cn(styles.arenaWinnerName)}>
              Arena Winner: No Winner ¯\(°_o)/¯
            </div>
            <div className={cn(styles.arenaWinnerImage)}>
              <Image src={"/icons/cyclone/active.svg"} layout="fill"></Image>
            </div>
          </div>
        ) : (
          <div className={cn(styles.arenaWinner)}>
            <div className={cn(styles.arenaWinnerName)}>
              Arena Winner: Battle In Progress
            </div>
            <div className={cn(styles.arenaWinnerImage)}>
              <Image src={"/icons/cyclone/active.svg"} layout="fill"></Image>
            </div>
          </div>
        )}
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

export default TrackTournamentArenaBrackets;
