import styles from "./styles.module.scss";
import cn from "classnames";
import TrackTournamentBracket from "../bracket/TrackTournamentBracket";
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

const TrackTournamentBrackets2 = ({
  userId,
  arenaWinner,
  arenaNumber,
  roundNumber,
  rounds,
  time,
}: Props) => {
  return (
    <>
      <div className={cn(styles.brackets)}>
        <div className={styles.container}>
          <div
            className={cn(styles.tournamentBracket, "tournamentBracketRounded")}
          >
            <div className={cn(styles.tournamentBracketRound)}>
              <h2 className={cn(styles.tournamentBracketRoundTitle)}>Finals</h2>
              <ul className={cn(styles.tournamentBracketList)}>
                {rounds[0].matches.map((m, mi) => (
                  <TrackTournamentBracket
                    userId={userId}
                    makeFinalAfter={true}
                    time={time.rounds[0].matches[mi].time}
                    key={`${arenaNumber}:${roundNumber}:${m.matchNumber}`}
                    match={m}
                  ></TrackTournamentBracket>
                ))}
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>
                Probable Final
              </h3>
              <ul className={cn(styles.tournamentBracketList)}>
                {rounds[1] && rounds[1].matches.length > 0 ? (
                  rounds[1].matches.map((m, mi) => (
                    <TrackTournamentBracket
                      userId={userId}
                      makeFinalAfter={true}
                      time={time.rounds[0].matches[mi].time}
                      key={`${arenaNumber}:${roundNumber}:${m.matchNumber}`}
                      match={m}
                    ></TrackTournamentBracket>
                  ))
                ) : (
                  <TrackTournamentBracket
                    userId={userId}
                    makeFinalBefore={true}
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

export default TrackTournamentBrackets2;