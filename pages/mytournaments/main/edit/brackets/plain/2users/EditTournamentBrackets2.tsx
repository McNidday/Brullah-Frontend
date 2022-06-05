import styles from "./styles.module.scss";
import cn from "classnames";
import EditTournamentBracket from "../bracket/EditTournamentBracket";

interface Props {
  matches: [
    {
      matchNumber: number;
      progress: string;
      slot_one: {
        joined: boolean;
        user: string;
        reason: string;
      };
      slot_two: {
        joined: boolean;
        user: string;
        reason: string;
      };
    }
  ];
}

const EditTournamentBrackets2 = ({ matches }: Props) => {
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
                {matches.map((m) => (
                  <EditTournamentBracket
                    twoOveride={true}
                    match={m}
                  ></EditTournamentBracket>
                ))}
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>Winner</h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <EditTournamentBracket
                  twoOveride={true}
                ></EditTournamentBracket>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTournamentBrackets2;
