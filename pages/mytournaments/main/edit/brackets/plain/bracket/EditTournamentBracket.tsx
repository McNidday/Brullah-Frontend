import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";

interface Props {
  twoOveride?: boolean;
  match?: {
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
  };
}

const EditTournamentBracket = ({ twoOveride, match }: Props) => {
  return (
    <li className={cn(styles.tournamentBracketItem)}>
      <div
        className={cn(
          styles.tournamentBracketMatch,
          twoOveride ? styles.tournamentBracketMatchTwoOveride : ""
        )}
      >
        <div className={cn(styles.tournamentBracketInformation)}>
          <div className={cn(styles.tournmentBracketCaptionContainer)}>
            <span className={cn(styles.tournamentBracketCounter)}></span>
            <caption className={cn(styles.tournamentBracketCaption)}>
              <time>18 February 1998</time>
            </caption>
          </div>

          <div className={cn(styles.tournamentBracketData)}>
            <div className={cn(styles.tournamentBracketDataProfile)}>
              <div className={cn(styles.tournamentBracketDataProfilePicture)}>
                <Image src={"/icons/duck.png"} layout="fill"></Image>
              </div>
              <div className={cn(styles.tournamentBracketDataName)}>
                <span>nidday</span>
              </div>
            </div>
            <span>VS</span>
            <div className={cn(styles.tournamentBracketDataProfile)}>
              <div className={cn(styles.tournamentBracketDataProfilePicture)}>
                <Image src={"/icons/duck.png"} layout="fill"></Image>
              </div>
              <div className={cn(styles.tournamentBracketDataName)}>
                <span>nidday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EditTournamentBracket;
