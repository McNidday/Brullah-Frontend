import styles from "./styles.module.scss";
import cn from "classnames";
import { gql } from "@apollo/client";
import TrackTournamentBrackets from "../plain/TrackTournamentBrackets";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Icon from "../../../../../components/Icon/Icon";
import Button from "../../../../../components/Button/Button";
import Image from "next/image";
import { decodeBlurHash } from "../../../../../functions/helpers";
import { numOfMatches } from "../../../../../functions/helpers";

interface Props {
  userId: string;
  tournamentId: string;
  arenaNumber: number;
  gameNumber: number;
  activeArena: boolean;
  numOfJoined: number;
  handleActiveArena: (arena: number) => void;
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

const TrackTournamentArenaBrackets = ({
  userId,
  arenaNumber,
  activeArena,
  tournamentId,
  gameNumber,
  numOfJoined,
  handleActiveArena,
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
  const [arenaHover, setArenaHover] = useState(false);
  const [section, setSection] = useState(1);
  const [sectionOne, setSectionOne] = useState<boolean>(false);
  const [sectionTwo, setSectionTwo] = useState<boolean>(false);
  const [numOfUsersInArena, setNumOfUsersInArena] = useState(0);

  useEffect(() => {
    let num = numOfJoined;
    for (let i = 1; i < arenaNumber; i++) {
      num -= 16;
    }
    setNumOfUsersInArena(num);
    if (
      numOfMatches(numOfJoined, arenaNumber, 1) <= 4 ||
      numOfMatches(numOfJoined, arenaNumber, 1) > 4
    ) {
      setSectionOne(true);
    }

    if (numOfMatches(numOfJoined, arenaNumber, 1) > 4) {
      setSectionTwo(true);
    }
  }, [numOfJoined, arenaNumber]);

  return (
    <div className={cn(styles.container)}>
      <div
        onMouseEnter={() => setArenaHover(true)}
        onMouseLeave={() => setArenaHover(false)}
        className={cn(styles.arenaNav)}
        onClick={() => {
          handleActiveArena(arenaNumber);
        }}
      >
        <h2>Arena {arenaNumber}</h2>
        <div
          className={cn(
            styles.openArenaIcon,
            !activeArena ? styles.inactiveOpenArenaIcon : ""
          )}
        >
          <Icon
            activeLink="/icons/dropdown/active.svg"
            inactiveLink="/icons/dropdown/inactive.svg"
            hover={arenaHover}
            alt="Dropdown Icon"
          ></Icon>
        </div>

        {data?.arenaWinner.status === "DONE" ? (
          <div className={cn(styles.arenaWinner)}>
            <div className={cn(styles.arenaWinnerName)}>
              Arena Winner: {data?.arenaWinner.winner?.identity.brullah_name}
            </div>
            <div className={cn(styles.arenaWinnerImage)}>
              <Image
                fill
                src={data?.arenaWinner.winner?.identity.avatar.image as string}
                alt={data?.arenaWinner.winner?.identity.brullah_name as string}
                placeholder="blur"
                blurDataURL={decodeBlurHash(
                  data?.arenaWinner.winner?.identity.avatar.blurhash as string,
                  50,
                  50
                )}
              ></Image>
            </div>
          </div>
        ) : data?.arenaWinner.status === "NONE" ? (
          <div className={cn(styles.arenaWinner)}>
            <div className={cn(styles.arenaWinnerName)}>
              Arena Winner: No Winner ¯\(°_o)/¯
            </div>
            <div className={cn(styles.arenaWinnerImage)}>
              <Image fill src={"/icons/cyclone/active.svg"} alt=""></Image>
            </div>
          </div>
        ) : (
          <div className={cn(styles.arenaWinner)}>
            <div className={cn(styles.arenaWinnerName)}>
              Arena Winner: Battle In Progress
            </div>
            <div className={cn(styles.arenaWinnerImage)}>
              <Image fill src={"/icons/cyclone/active.svg"} alt=""></Image>
            </div>
          </div>
        )}
      </div>
      <div
        className={cn(
          styles.brackets,
          !activeArena ? styles.inactiveBrackets : ""
        )}
      >
        <div className={cn(styles.sectionNav)}>
          {sectionOne ? (
            <Button
              text="Section 1"
              disabled={false}
              forceActive={section === 1 ? true : false}
              onClick={() => {
                setSection(1);
              }}
            ></Button>
          ) : (
            ""
          )}
          {sectionTwo ? (
            <Button
              text="Section 2"
              disabled={false}
              forceActive={section === 2 ? true : false}
              onClick={() => {
                setSection(2);
              }}
            ></Button>
          ) : (
            ""
          )}
        </div>
        <div className={cn(styles.sections)}>
          {sectionOne && section === 1 ? (
            <section>
              <TrackTournamentBrackets
                userId={userId}
                roundNumber={1}
                gameNumber={gameNumber}
                arenaNumber={arenaNumber}
                tournamentId={tournamentId}
                numOfUsersInSection={
                  numOfUsersInArena >= 8 ? 8 : numOfUsersInArena
                }
                sectionNumber={1}
              ></TrackTournamentBrackets>
            </section>
          ) : (
            ""
          )}
          {sectionTwo && section === 2 ? (
            <section>
              <TrackTournamentBrackets
                userId={userId}
                roundNumber={1}
                gameNumber={gameNumber}
                arenaNumber={arenaNumber}
                tournamentId={tournamentId}
                numOfUsersInSection={numOfUsersInArena - 8}
                sectionNumber={2}
              ></TrackTournamentBrackets>
            </section>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackTournamentArenaBrackets;
