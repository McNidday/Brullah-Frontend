import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentBracket from "../bracket/EditTournamentBracket";
import { useEffect, useState } from "react";

interface Match {
  matchNumber: number;
  slot_one: {
    user?: {
      identity: {
        arena_name: string;
        avatar: {
          image: string;
          blurhash: string;
        };
      };
    };
  };
  slot_two: {
    user?: {
      identity: {
        arena_name: string;
        avatar: {
          image: string;
          blurhash: string;
        };
      };
    };
  };
  bye?: {
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
  };
}

interface Props {
  activeEdit: string | null;
  setActiveEdit: (arbs: string | null) => void;
  arenaNumber: number;
  roundNumber: number;
  matches: Array<Match>;
}

const EditTournamentBrackets8 = ({
  activeEdit,
  setActiveEdit,
  arenaNumber,
  roundNumber,
  matches,
}: Props) => {
  const [byeMatchNumber, setByeMatchNumber] = useState(1);
  const [bye, setBye] = useState<{
    user: {
      identity: {
        arena_name: string;
        avatar: {
          image: string;
          blurhash: string;
        };
      };
    };
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
                {matches.map((m) => (
                  <EditTournamentBracket
                    activeEdit={activeEdit}
                    key={`${arenaNumber}:${roundNumber}:${m.matchNumber}`}
                    setActiveEdit={setActiveEdit}
                    arenaNumber={arenaNumber}
                    roundNumber={roundNumber}
                    match={m}
                  ></EditTournamentBracket>
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
                      <EditTournamentBracket bye={bye}></EditTournamentBracket>
                      <EditTournamentBracket></EditTournamentBracket>
                    </>
                  ) : (
                    <>
                      <EditTournamentBracket></EditTournamentBracket>
                      <EditTournamentBracket bye={bye}></EditTournamentBracket>
                    </>
                  )
                ) : (
                  <>
                    <EditTournamentBracket></EditTournamentBracket>
                    <EditTournamentBracket></EditTournamentBracket>
                  </>
                )}
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Finals</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <EditTournamentBracket></EditTournamentBracket>
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Winner</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <EditTournamentBracket></EditTournamentBracket>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTournamentBrackets8;
