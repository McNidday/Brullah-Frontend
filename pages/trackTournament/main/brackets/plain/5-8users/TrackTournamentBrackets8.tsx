import styles from "./styles.module.scss";
import cn from "classnames";
import TrackTournamentBracket from "../bracket/TrackTournamentBracket";
import { useEffect, useState } from "react";
import TrackTournamentWinnerBracket from "../winner/TrackTournamentWinnerBracket";

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
  slot_one: Slot;
  slot_two: Slot;
  bye?: Slot;
}

interface Props {
  userId: string;
  arenaNumber: number;
  roundNumber: number;
  arenaWinner: {
    status: "IN-PROGRESS" | "NONE" | "DONE";
    user: User;
  };
  matches: Array<Match>;
  time: {
    arenaNumber: number;
    rounds: Array<{
      roundNumber: number;
      matches: Array<{
        matchNumber: number;
        time: number;
      }>;
    }>;
  };
}

const TrackTournamentBrackets8 = ({
  userId,
  arenaWinner,
  time,
  arenaNumber,
  roundNumber,
  matches,
}: Props) => {
  const [byeMatchNumber, setByeMatchNumber] = useState(1);
  const [bye, setBye] = useState<{
    user: User;
  } | null>(null);

  useEffect(() => {
    let byeTracker: any;
    matches.forEach((m) => {
      if (m.bye && m.bye.user) {
        byeTracker = m.bye;
        if (m.matchNumber % 2 === 0) {
          setByeMatchNumber(m.matchNumber - 1);
        }

        if (m.matchNumber % 2 !== 0) {
          setByeMatchNumber((m.matchNumber + 1) / 2);
        }
      }
    });

    if (byeTracker) {
      setBye(byeTracker);
    } else {
      setBye(null);
    }
  }, [matches]);

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
                {matches.map((m, mi) => (
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
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>
                SemiFinals
              </h3>
              <ul className={cn(styles.tournamentBracketList)}>
                {bye ? (
                  byeMatchNumber === 1 ? (
                    <>
                      <TrackTournamentBracket
                        userId={userId}
                        time={time?.rounds[1]?.matches[0]?.time}
                        bye={bye}
                      ></TrackTournamentBracket>
                      <TrackTournamentBracket
                        userId={userId}
                        time={time?.rounds[1]?.matches[1]?.time}
                      ></TrackTournamentBracket>
                    </>
                  ) : (
                    <>
                      <TrackTournamentBracket
                        userId={userId}
                        time={time?.rounds[1]?.matches[0]?.time}
                      ></TrackTournamentBracket>
                      <TrackTournamentBracket
                        userId={userId}
                        time={time?.rounds[1]?.matches[1]?.time}
                        bye={bye}
                      ></TrackTournamentBracket>
                    </>
                  )
                ) : (
                  <>
                    <TrackTournamentBracket
                      userId={userId}
                      time={time?.rounds[1]?.matches[0]?.time}
                    ></TrackTournamentBracket>
                    <TrackTournamentBracket
                      userId={userId}
                      time={time?.rounds[1]?.matches[1]?.time}
                    ></TrackTournamentBracket>
                  </>
                )}
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Finals</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <TrackTournamentBracket
                  userId={userId}
                  time={time?.rounds[2]?.matches[0]?.time}
                ></TrackTournamentBracket>
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

export default TrackTournamentBrackets8;
