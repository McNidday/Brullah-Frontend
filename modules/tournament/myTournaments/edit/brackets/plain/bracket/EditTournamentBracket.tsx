import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import { decodeBlurHash } from "../../../../../../../functions/helpers";
import moment from "moment";

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
  activeEdit?: string | null;
  arenaNumber?: number;
  roundNumber?: number;
  setActiveEdit?: (arb: string | null) => void;
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

const EditTournamentBracket = ({
  makeFinalBefore,
  makeFinalAfter,
  time,
  bye,
  activeEdit,
  match,
  arenaNumber,
  roundNumber,
  setActiveEdit,
}: Props) => {
  return (
    <li
      className={cn(
        styles.tournamentBracketItem,
        makeFinalAfter ? styles.makeFinalAfter : ""
      )}
      onClick={() => {
        if (setActiveEdit) {
          if (
            activeEdit === `${arenaNumber}:${roundNumber}:${match?.matchNumber}`
          ) {
            setActiveEdit(null);
          } else {
            setActiveEdit(
              `${arenaNumber}:${roundNumber}:${match?.matchNumber}`
            );
          }
        }
      }}
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
            {activeEdit ===
            `${arenaNumber}:${roundNumber}:${match?.matchNumber}` ? (
              <div className={cn(styles.editIcon)}>
                <Image
                  src={"/icons/edit/green.svg"}
                  layout="fill"
                  alt=""
                ></Image>
              </div>
            ) : (
              <div className={cn(styles.editIcon)}>
                <Image
                  src={"/icons/edit/white.svg"}
                  layout="fill"
                  alt=""
                ></Image>
              </div>
            )}
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
                      alt={match.slot_one.user.identity.arena_name}
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
                      alt={bye.user.identity.arena_name}
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
                      alt=""
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
                      alt={match.slot_two.user.identity.arena_name}
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
                      alt=""
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

export default EditTournamentBracket;
