import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentBracket from "../bracket/EditTournamentBracket";
import { useEffect, useState } from "react";
import EditTournamentWinnerBracket from "../winner/EditTournamentWinnerBracket";

interface Props {
  activeEdit: string | null;
  setActiveEdit: (arbs: string | null) => void;
  arenaNumber: number;
  roundNumber: number;
  matches: Array<{
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
      reason: string;
    };
  }>;
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

const EditTournamentBrackets2 = ({
  activeEdit,
  setActiveEdit,
  arenaNumber,
  roundNumber,
  matches,
  time,
}: Props) => {
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
    matches.forEach((m) => {
      if (m.bye && m.bye.user) {
        setBye(m.bye);
      } else {
        setBye(null);
      }
    });
  }, [matches]);

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
                {matches.map((m, mi) => (
                  <EditTournamentBracket
                    makeFinalAfter={true}
                    time={time.rounds[0].matches[mi].time}
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
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Winner</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                {bye ? (
                  <EditTournamentBracket
                    makeFinalBefore={true}
                    time={time.rounds[1].matches[0].time}
                    bye={bye}
                  ></EditTournamentBracket>
                ) : (
                  <EditTournamentBracket
                    makeFinalBefore={true}
                    time={time.rounds[1].matches[0].time}
                  ></EditTournamentBracket>
                )}
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Winner</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <EditTournamentWinnerBracket></EditTournamentWinnerBracket>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTournamentBrackets2;
