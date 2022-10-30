import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import { decodeBlurHash } from "../../../../../../functions/helpers";

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

interface Props {
  arenaWinner: {
    status: "IN-PROGRESS" | "NONE" | "DONE";
    user: User;
  };
}

const TrackTournamentWinnerBracket = ({ arenaWinner }: Props) => {
  return (
    <li className={cn(styles.tournamentBracketItem)}>
      <div className={cn(styles.tournamentBracketMatch)}>
        <div className={cn(styles.tournamentBracketInformation)}>
          <div className={cn(styles.tournmentBracketCaptionContainer)}>
            <span className={cn(styles.tournamentBracketCounter)}></span>
            <div className={cn(styles.tournamentBracketCaption)}>
              {arenaWinner.status === "NONE" ? (
                <time>No winner for this arena</time>
              ) : arenaWinner.status === "DONE" ? (
                <time>Graduate: {arenaWinner.user.identity.arena_name}</time>
              ) : (
                <time>Some time in future</time>
              )}
            </div>
          </div>

          <div className={cn(styles.tournamentBracketData)}>
            <div className={cn(styles.tournamentBracketDataWinnerContainer)}>
              <div className={cn(styles.tournamentBracketDataWinner)}>
                <Image fill src={"/illustrations/05.png"} alt=""></Image>
                {arenaWinner.status === "DONE" ? (
                  <div className={cn(styles.tournamentBracketDataWinnerImage)}>
                    <Image
                      fill
                      src={arenaWinner.user.identity.avatar.image}
                      alt={arenaWinner.user.identity.arena_name}
                      placeholder="blur"
                      blurDataURL={decodeBlurHash(
                        arenaWinner.user.identity.avatar.blurhash,
                        50,
                        50
                      )}
                    ></Image>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TrackTournamentWinnerBracket;
