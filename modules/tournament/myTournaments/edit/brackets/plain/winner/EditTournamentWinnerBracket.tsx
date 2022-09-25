import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";

const EditTournamentWinnerBracket = () => {
  return (
    <li className={cn(styles.tournamentBracketItem)}>
      <div className={cn(styles.tournamentBracketMatch)}>
        <div className={cn(styles.tournamentBracketInformation)}>
          <div className={cn(styles.tournmentBracketCaptionContainer)}>
            <span className={cn(styles.tournamentBracketCounter)}></span>
            <div className={cn(styles.tournamentBracketCaption)}>
              <time>Some time in future</time>
            </div>
          </div>

          <div className={cn(styles.tournamentBracketData)}>
            <div className={cn(styles.tournamentBracketDataWinnerContainer)}>
              <div className={cn(styles.tournamentBracketDataWinner)}>
                <Image
                  src={"/illustrations/05.png"}
                  layout="fill"
                  alt=""
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EditTournamentWinnerBracket;
