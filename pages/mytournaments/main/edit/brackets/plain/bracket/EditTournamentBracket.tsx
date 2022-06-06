import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import { decodeBlurHash } from "../../../../../../functions/helpers";

interface Props {
  match?: {
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
  };
}

const EditTournamentBracket = ({ match }: Props) => {
  return (
    <li className={cn(styles.tournamentBracketItem)}>
      <div className={cn(styles.tournamentBracketMatch)}>
        <div className={cn(styles.tournamentBracketInformation)}>
          <div className={cn(styles.tournmentBracketCaptionContainer)}>
            <span className={cn(styles.tournamentBracketCounter)}></span>
            <caption className={cn(styles.tournamentBracketCaption)}>
              <time>18 February 1998</time>
            </caption>
            <div className={cn(styles.editIcon)}>
              <Image src={"/icons/edit/white.svg"} layout="fill"></Image>
            </div>
          </div>

          <div className={cn(styles.tournamentBracketData)}>
            <div className={cn(styles.tournamentBracketDataProfile)}>
              {match?.slot_one.user ? (
                <>
                  <div
                    className={cn(styles.tournamentBracketDataProfilePicture)}
                  >
                    <Image
                      src={match.slot_one.user.identity.avatar.image}
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={decodeBlurHash(
                        match.slot_one.user.identity.avatar.blurhash,
                        50,
                        50
                      )}
                    ></Image>
                  </div>
                  <div className={cn(styles.tournamentBracketDataName)}>
                    <span>{match.slot_one.user.identity.arena_name}</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={cn(styles.tournamentBracketDataProfilePicture)}
                  >
                    <Image src={"/icons/duck.png"} layout="fill"></Image>
                  </div>
                  <div className={cn(styles.tournamentBracketDataName)}>
                    <span>¯\(°_o)/¯</span>
                  </div>
                </>
              )}
            </div>
            <span>VS</span>
            <div className={cn(styles.tournamentBracketDataProfile)}>
              {match?.slot_two.user ? (
                <>
                  <div
                    className={cn(styles.tournamentBracketDataProfilePicture)}
                  >
                    <Image
                      src={match.slot_two.user.identity.avatar.image}
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={decodeBlurHash(
                        match.slot_one.user.identity.avatar.blurhash,
                        50,
                        50
                      )}
                    ></Image>
                  </div>
                  <div className={cn(styles.tournamentBracketDataName)}>
                    <span>{match.slot_two.user.identity.arena_name}</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={cn(styles.tournamentBracketDataProfilePicture)}
                  >
                    <Image src={"/icons/duck.png"} layout="fill"></Image>
                  </div>
                  <div className={cn(styles.tournamentBracketDataName)}>
                    <span>¯\(°_o)/¯</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EditTournamentBracket;
