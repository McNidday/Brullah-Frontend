import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import { decodeBlurHash } from "../../../../../../functions/helpers";
import { Tooltip, Typography } from "@mui/material";
import { MatchType } from "../../../../../../types/match";
import { DateTime } from "luxon";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

interface Props {
  userId: string;
  makeFinalBefore?: boolean;
  makeFinalAfter?: boolean;
  tournamentId: string;
  arenaNumber: number;
  roundNumber: number;
  matchNumber: number;
  gameNumber: number;
}

const MATCH = gql`
  query GetMatch($input: GetMatchInput!) {
    match(input: $input) {
      time
      match_number
      status
      slot_two {
        reason
        winner
        joined
        user {
          id
          identity {
            brullah_name
            avatar {
              image
              blurhash
            }
          }
        }
      }
      slot_one {
        reason
        winner
        joined
        user {
          id
          identity {
            brullah_name
            avatar {
              image
              blurhash
            }
          }
        }
      }
      bye_slot {
        user {
          id
          identity {
            brullah_name
            avatar {
              image
              blurhash
            }
          }
        }
      }
    }
  }
`;

const TrackTournamentBracket = ({
  gameNumber,
  arenaNumber,
  roundNumber,
  matchNumber,
  tournamentId,
  userId,
  makeFinalBefore,
  makeFinalAfter,
}: Props) => {
  const { data, loading } = useQuery<{
    match: MatchType;
  }>(MATCH, {
    variables: {
      input: {
        tournament: tournamentId,
        game: gameNumber,
        arena_number: arenaNumber,
        round_number: roundNumber,
        match_number: matchNumber,
      },
    },
  });

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
              {data?.match?.slot_one?.reason &&
              data?.match?.slot_two?.reason ? (
                <>
                  <div>
                    <h3>
                      {data?.match?.slot_one?.user?.identity.brullah_name}:{" "}
                      <em>{data?.match?.slot_one?.reason}</em>
                    </h3>
                  </div>
                  <div>
                    <h3>
                      {data?.match?.slot_two?.user?.identity.brullah_name}:{" "}
                      <em>{data?.match?.slot_two?.reason}</em>
                    </h3>
                  </div>
                </>
              ) : data?.match?.slot_one?.reason ? (
                <div>
                  <h3>
                    {data?.match?.slot_one?.user?.identity.brullah_name}:{" "}
                    <em>{data?.match?.slot_one?.reason}</em>
                  </h3>
                </div>
              ) : data?.match?.slot_two?.reason ? (
                <div>
                  <h3>
                    {data?.match?.slot_two?.user?.identity.brullah_name}:{" "}
                    <em>{data?.match?.slot_two?.reason}</em>
                  </h3>
                </div>
              ) : !data?.match?.slot_two?.user &&
                data?.match?.slot_one?.user &&
                !data?.match?.slot_two?.reason &&
                !data?.match?.slot_one?.reason ? (
                <h3>Still cooking 👩‍🍳</h3>
              ) : !data?.match?.slot_two?.user &&
                !data?.match?.slot_one?.user ? (
                <h3>Empty void 🖤</h3>
              ) : (
                <h3>Processing 🧠</h3>
              )}
            </div>
          </>
        }
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
                data?.match?.slot_one?.user?.id === userId &&
                  data?.match?.slot_one?.winner
                  ? styles.wonMatch
                  : "",
                data?.match?.slot_two?.user?.id === userId &&
                  data?.match?.slot_two?.winner
                  ? styles.wonMatch
                  : "",
                data?.match?.slot_one?.user?.id === userId &&
                  !data?.match?.slot_one?.winner &&
                  data?.match?.status === "DONE"
                  ? styles.lostMatch
                  : "",
                data?.match?.slot_two?.user?.id === userId &&
                  !data?.match?.slot_two?.winner &&
                  data?.match?.status === "DONE"
                  ? styles.lostMatch
                  : ""
              )}
            >
              <span
                className={cn(
                  styles.tournamentBracketCounter,
                  loading ? styles.tournamentBracketCounterFlicker : ""
                )}
              ></span>
              {data?.match.bye_slot ? (
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
                          {data?.match.bye_slot.user.identity.brullah_name} is a
                          bye in this bracket👋
                        </Typography>
                      </div>
                    </>
                  }
                >
                  <div className={cn(styles.tournamentBracketBye)}>
                    <Image
                      fill
                      src={data?.match.bye_slot.user.identity.avatar.image}
                      alt={data?.match.bye_slot.user.identity.brullah_name}
                      placeholder="blur"
                      blurDataURL={decodeBlurHash(
                        data?.match.bye_slot.user.identity.avatar.blurhash,
                        50,
                        50
                      )}
                    ></Image>
                  </div>
                </Tooltip>
              ) : (
                ""
              )}

              <div className={cn(styles.tournamentBracketCaption)}>
                <time>
                  {data?.match?.time
                    ? DateTime.fromISO(data?.match?.time).toLocaleString(
                        DateTime.DATETIME_MED
                      )
                    : "(⊙_(⊙_⊙)_⊙)"}
                </time>
              </div>
            </div>

            <div className={cn(styles.tournamentBracketData)}>
              <div className={cn(styles.tournamentBracketDataProfile)}>
                {data?.match?.slot_one?.user ? (
                  <>
                    <div
                      className={cn(styles.tournamentBracketDataProfilePicture)}
                    >
                      <Image
                        fill
                        src={data?.match.slot_one.user.identity.avatar.image}
                        alt={data?.match.slot_one.user.identity.brullah_name}
                        placeholder="blur"
                        blurDataURL={decodeBlurHash(
                          data?.match.slot_one.user.identity.avatar.blurhash,
                          50,
                          50
                        )}
                      ></Image>
                    </div>
                    <div className={cn(styles.tournamentBracketDataName)}>
                      <span>
                        {data?.match.slot_one.user.identity.brullah_name}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={cn(styles.tournamentBracketDataProfilePicture)}
                    >
                      <Image
                        fill
                        src={"/icons/cyclone/active.svg"}
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
                {data?.match?.slot_two?.user ? (
                  <>
                    <div
                      className={cn(styles.tournamentBracketDataProfilePicture)}
                    >
                      <Image
                        fill
                        src={data?.match.slot_two.user.identity.avatar.image}
                        alt={data?.match.slot_two.user.identity.brullah_name}
                        placeholder="blur"
                        blurDataURL={decodeBlurHash(
                          data?.match.slot_two.user.identity.avatar.blurhash,
                          50,
                          50
                        )}
                      ></Image>
                    </div>
                    <div className={cn(styles.tournamentBracketDataName)}>
                      <span>
                        {data?.match.slot_two.user.identity.brullah_name}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={cn(styles.tournamentBracketDataProfilePicture)}
                    >
                      <Image
                        fill
                        src={"/icons/cyclone/active.svg"}
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
      </Tooltip>
    </li>
  );
};

export default TrackTournamentBracket;
