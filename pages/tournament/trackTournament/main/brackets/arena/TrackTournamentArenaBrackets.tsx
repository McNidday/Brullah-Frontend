import styles from "./styles.module.scss";
import cn from "classnames";
import TrackTournamentBrackets from "../plain/TrackTournamentBrackets";
import { useEffect, useState } from "react";
import Icon from "../../../../../components/Icon/Icon";
import Button from "../../../../../components/Button/Button";
import Image from "next/image";
import { decodeBlurHash } from "../../../../../functions/helpers";

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

interface Slot {
  joined: boolean;
  user: User;
  reason: string;
  winner: boolean;
}

interface Match {
  done: boolean;
  matchNumber: number;
  progress: string;
  slot_one: Slot;
  slot_two: Slot;
}

interface Round {
  roundNumber: number;
  matches: Array<Match>;
}

interface Props {
  userId: string;
  activeArena: boolean;
  handleActiveArena: (arena: number) => void;
  config: {
    winner: { status: "IN-PROGRESS" | "NONE" | "DONE"; user: User };
    arenaNumber: number;
    rounds: Array<Round>;
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
  userId,
  activeArena,
  handleActiveArena,
  config,
  time,
}: Props) => {
  const [arenaHover, setArenaHover] = useState(false);
  const [section, setSection] = useState(1);
  const [sectionOne, setSectionOne] = useState<Array<Round>>([]);
  const [sectionTwo, setSectionTwo] = useState<Array<Round>>([]);

  useEffect(() => {
    const sectionOneRound: Array<Round> = [];
    let initialNumOfRoundOneMatches =
      config.rounds[0].matches.length >= 4
        ? 4
        : config.rounds[0].matches.length;
    if (initialNumOfRoundOneMatches > 0) {
      for (let i = 0; i < config.rounds.length; i++) {
        const newRound: Round = {
          roundNumber: config.rounds[i].roundNumber,
          matches: [],
        };
        if (initialNumOfRoundOneMatches === 1) {
          newRound.matches = config.rounds[i].matches.slice(0, 1);
        }

        if (initialNumOfRoundOneMatches === 2) {
          newRound.matches = config.rounds[i].matches.slice(0, 2);
          initialNumOfRoundOneMatches = 1;
        }

        if (
          initialNumOfRoundOneMatches === 3 ||
          initialNumOfRoundOneMatches === 4
        ) {
          newRound.matches = config.rounds[i].matches.slice(0, 4);
          initialNumOfRoundOneMatches = 2;
        }
        sectionOneRound.push(newRound);
      }
    }
    setSectionOne(sectionOneRound);

    const sectionTwoRound: Array<Round> = [];
    let initialNumOfRoundTwoMatches =
      config.rounds[0].matches.length > 4
        ? config.rounds[0].matches.length - 4
        : null;
    if (initialNumOfRoundTwoMatches) {
      for (let i = 0; i < config.rounds.length; i++) {
        const newRound: Round = {
          roundNumber: config.rounds[i].roundNumber,
          matches: [],
        };
        if (initialNumOfRoundTwoMatches === 1) {
          newRound.matches = config.rounds[i].matches.slice(0, 1);
        }

        if (initialNumOfRoundTwoMatches === 2) {
          newRound.matches = config.rounds[i].matches.slice(0, 2);
          initialNumOfRoundTwoMatches = 1;
        }

        if (
          initialNumOfRoundTwoMatches === 3 ||
          initialNumOfRoundTwoMatches === 4
        ) {
          newRound.matches = config.rounds[i].matches.slice(0, 4);
          initialNumOfRoundTwoMatches = 2;
        }
        sectionTwoRound.push(newRound);
      }
    }
    setSectionTwo(sectionTwoRound);
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
              <TrackTournamentBrackets
                userId={userId}
                arenaWinner={config.winner}
                roundNumber={1}
                arenaNumber={config.arenaNumber}
                rounds={sectionOne}
                time={time}
              ></TrackTournamentBrackets>
            </section>
          ) : (
            ""
          )}
          {sectionTwo.length >= 1 && section === 2 ? (
            <section>
              <TrackTournamentBrackets
                arenaWinner={config.winner}
                userId={userId}
                roundNumber={1}
                arenaNumber={config.arenaNumber}
                rounds={sectionTwo}
                time={time}
              ></TrackTournamentBrackets>
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
