import styles from "./styles.module.scss";
import cn from "classnames";
import Image from "next/image";
import { decodeBlurHash } from "../../../../../../functions/helpers";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
interface Props {
  arenaNumber: number;
  gameNumber: number;
  tournamentId: string;
}

const ARENA_WINNER = gql`
  query GetArenaWinner($input: GetArenaWinnerInput!) {
    arenaWinner(input: $input) {
      status
      winner {
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
`;

const TrackTournamentWinnerBracket = ({
  arenaNumber,
  gameNumber,
  tournamentId,
}: Props) => {
  const { data } = useQuery<{
    arenaWinner: {
      status: "NONE" | "IN-PROGRESS" | "DONE";
      winner?: {
        identity: {
          brullah_name: string;
          avatar: {
            image: string;
            blurhash: string;
          };
        };
      };
    };
  }>(ARENA_WINNER, {
    variables: {
      input: {
        tournament: tournamentId,
        game: gameNumber,
        arena_number: arenaNumber,
      },
    },
  });

  return (
    <li className={cn(styles.tournamentBracketItem)}>
      <div className={cn(styles.tournamentBracketMatch)}>
        <div className={cn(styles.tournamentBracketInformation)}>
          <div className={cn(styles.tournmentBracketCaptionContainer)}>
            <span className={cn(styles.tournamentBracketCounter)}></span>
            <div className={cn(styles.tournamentBracketCaption)}>
              {data?.arenaWinner.status === "NONE" ? (
                <time>No winner for this arena</time>
              ) : data?.arenaWinner.status === "DONE" ? (
                <time>
                  Graduate: {data?.arenaWinner.winner?.identity.brullah_name}
                </time>
              ) : (
                <time>Some time in future</time>
              )}
            </div>
          </div>

          <div className={cn(styles.tournamentBracketData)}>
            <div className={cn(styles.tournamentBracketDataWinnerContainer)}>
              <div className={cn(styles.tournamentBracketDataWinner)}>
                <Image fill src={"/illustrations/05.png"} alt=""></Image>
                {data?.arenaWinner.status === "DONE" ? (
                  <div className={cn(styles.tournamentBracketDataWinnerImage)}>
                    <Image
                      fill
                      src={
                        data?.arenaWinner.winner?.identity.avatar
                          .image as string
                      }
                      alt={
                        data?.arenaWinner.winner?.identity
                          .brullah_name as string
                      }
                      placeholder="blur"
                      blurDataURL={decodeBlurHash(
                        data?.arenaWinner.winner?.identity.avatar
                          .blurhash as string,
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
