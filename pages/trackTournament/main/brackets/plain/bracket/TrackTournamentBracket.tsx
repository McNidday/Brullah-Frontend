import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import moment from "moment";
import { decodeBlurHash } from "../../../../../functions/helpers";
import { Tooltip, Typography } from "@mui/material";

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
  reason: string;
  winner: boolean;
  user?: User;
}

interface Props {
  userId: string;
  time: number | null;
  bye?: {
    user: User;
  };
  makeFinalBefore?: boolean;
  makeFinalAfter?: boolean;
  match?: {
    done: boolean;
    matchNumber: number;
    slot_one: Slot;
    slot_two: Slot;
  };
}

const TrackTournamentBracket = ({
  userId,
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
      <Tooltip
        componentsProps={{
          tooltip: {
            className: cn(styles.tooltip),
          },
        }}
        title={
          <>
            <div>
              <Typography color="inherit" fontFamily={"inherit"}>
                Reason For Results
              </Typography>
              {match?.slot_one?.reason ? (
                <div>
                  <h3>
                    {match?.slot_one?.user?.identity.arena_name}:{" "}
                    <em>{match?.slot_one?.reason}</em>
                  </h3>
                </div>
              ) : (
                ""
              )}

              {match?.slot_two?.reason ? (
                <div>
                  <h3>
                    {match?.slot_two?.user?.identity.arena_name}:{" "}
                    <em>{match?.slot_two?.reason}</em>
                  </h3>
                </div>
              ) : (
                ""
              )}

              {!match?.slot_two?.reason && !match?.slot_one?.reason ? (
                <h3>Still cooking 👩‍🍳</h3>
              ) : (
                ""
              )}
            </div>
          </>
        }
        placement={"right"}
      >
        <div
          className={cn(
            styles.tournamentBracketMatch,
            makeFinalBefore ? styles.makeFinalBefore : ""
          )}
        >
          <div className={cn(styles.tournamentBracketInformation)}>
            <div
              className={cn(
                styles.tournmentBracketCaptionContainer,
                match?.slot_one?.user?.id === userId && match?.slot_one?.winner
                  ? styles.wonMatch
                  : "",
                match?.slot_two?.user?.id === userId && match?.slot_two?.winner
                  ? styles.wonMatch
                  : "",
                match?.slot_one?.user?.id === userId &&
                  !match?.slot_one?.winner &&
                  match?.done
                  ? styles.lostMatch
                  : "",
                match?.slot_two?.user?.id === userId &&
                  !match?.slot_two?.winner &&
                  match?.done
                  ? styles.lostMatch
                  : ""
              )}
            >
              <span className={cn(styles.tournamentBracketCounter)}></span>
              <div className={cn(styles.tournamentBracketCaption)}>
                <time>
                  {time ? moment.unix(time).format("LLL") : "(⊙_(⊙_⊙)_⊙)"}
                </time>
              </div>
            </div>

            <div className={cn(styles.tournamentBracketData)}>
              <div className={cn(styles.tournamentBracketDataProfile)}>
                {match?.slot_one?.user ? (
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
                {match?.slot_two?.user ? (
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
      </Tooltip>
    </li>
  );
};

export default TrackTournamentBracket;
