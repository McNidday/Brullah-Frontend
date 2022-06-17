import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import moment from "moment";
import { decodeBlurHash } from "../../../../../functions/helpers";

interface Props {
  time: number | null;
  bye?: {
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
  makeFinalBefore?: boolean;
  makeFinalAfter?: boolean;
  match?: {
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
  };
}

const TrackTournamentBracket = ({
  makeFinalBefore,
  makeFinalAfter,
  time,
  bye,
  match,
}: Props) => {
  return (
    <li
      className={cn(
        styles.tournamentBracketItem,
        makeFinalAfter ? styles.makeFinalAfter : ""
      )}
    >
      <div
        className={cn(
          styles.tournamentBracketMatch,
          makeFinalBefore ? styles.makeFinalBefore : ""
        )}
      >
        <div className={cn(styles.tournamentBracketInformation)}>
          <div className={cn(styles.tournmentBracketCaptionContainer)}>
            <span className={cn(styles.tournamentBracketCounter)}></span>
            <div className={cn(styles.tournamentBracketCaption)}>
              <time>
                {time ? moment.unix(time).format("LLL") : "Time not set"}
              </time>
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
              ) : bye ? (
                <>
                  <div
                    className={cn(styles.tournamentBracketDataProfilePicture)}
                  >
                    <Image
                      src={bye.user.identity.avatar.image}
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={decodeBlurHash(
                        bye.user.identity.avatar.blurhash,
                        50,
                        50
                      )}
                    ></Image>
                  </div>
                  <div className={cn(styles.tournamentBracketDataName)}>
                    <span>{bye.user.identity.arena_name}</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={cn(styles.tournamentBracketDataProfilePicture)}
                  >
                    <Image
                      src={"/icons/cyclone/active.svg"}
                      layout="fill"
                    ></Image>
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
                        match.slot_two.user.identity.avatar.blurhash,
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
                    <Image
                      src={"/icons/cyclone/active.svg"}
                      layout="fill"
                    ></Image>
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

export default TrackTournamentBracket;
