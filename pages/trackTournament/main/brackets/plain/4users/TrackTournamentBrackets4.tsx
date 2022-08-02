import styles from "./styles.module.scss";
import cn from "classnames";
import TrackTournamentBracket from "../bracket/TrackTournamentBracket";
import TrackTournamentWinnerBracket from "../winner/TrackTournamentWinnerBracket";
import { useEffect, useState } from "react";

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
  bye?: {
    joined: boolean;
    user: User;
    reason: string;
  };
}

interface Round {
  roundNumber: number;
  matches: Array<Match>;
}

interface Props {
  userId: string;
  arenaNumber: number;
  roundNumber: number;
  arenaWinner: {
    status: "IN-PROGRESS" | "NONE" | "DONE";
    user: User;
  };
  rounds: Array<Round>;
  time: {
    arenaNumber: number;
    rounds: Array<{
      roundNumber: number;
      matches: [
        {
          matchNumber: number;
          time: number;
        }
      ];
    }>;
  };
}

const TrackTournamentBrackets4 = ({
  arenaWinner,
  userId,
  time,
  arenaNumber,
  roundNumber,
  rounds,
}: Props) => {
  const [bye, setBye] = useState<{
    user: User;
  } | null>(null);
  useEffect(() => {
    rounds[0].matches.forEach((m) => {
      if (m.bye && m.bye.user) {
        setBye({ ...m.bye });
      }
    });
  }, [rounds]);
  return (
    <>
      <div className={cn(styles.brackets)}>
        <div className={styles.container}>
          <div
            className={cn(styles.tournamentBracket, "tournamentBracketRounded")}
          >
            <div className={cn(styles.tournamentBracketRound)}>
              <h2 className={cn(styles.tournamentBracketRoundTitle)}>
                Quarterfinals
              </h2>
              <ul className={cn(styles.tournamentBracketList)}>
                {rounds[0].matches.map((m, mi) => (
                  <TrackTournamentBracket
                    userId={userId}
                    time={time?.rounds[0]?.matches[mi]?.time}
                    key={`${arenaNumber}:${roundNumber}:${m.matchNumber}`}
                    match={m}
                  ></TrackTournamentBracket>
                ))}
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Finals</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                {rounds[1] && rounds[1].matches.length > 0 ? (
                  rounds[1].matches.map((m, mi) => (
                    <TrackTournamentBracket
                      userId={userId}
                      time={time?.rounds[0]?.matches[mi]?.time}
                      key={`${arenaNumber}:${roundNumber}:${m.matchNumber}`}
                      match={m}
                    ></TrackTournamentBracket>
                  ))
                ) : bye ? (
                  <TrackTournamentBracket
                    userId={userId}
                    time={time.rounds[1].matches[0].time}
                    bye={bye}
                  ></TrackTournamentBracket>
                ) : (
                  <TrackTournamentBracket
                    userId={userId}
                    time={time?.rounds[1]?.matches[0]?.time}
                  ></TrackTournamentBracket>
                )}
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Winner</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <TrackTournamentWinnerBracket
                  arenaWinner={arenaWinner}
                ></TrackTournamentWinnerBracket>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackTournamentBrackets4;
