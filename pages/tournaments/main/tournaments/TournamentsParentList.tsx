import styles from "./styles.module.scss";
import cn from "classnames";
import TournamentList, { TournamentListFragment } from "./list/TournamentList";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  setJoinTournamentId: (id: string) => void;
  handleModalOpen: () => void;
  tournaments: Array<{
    id: string;
    information: {
      name: string;
      description: string;
      thumbnail: { image: string; blurhash: string };
    };
    analytics: { joined_users: number };
    creator: { identity: { arena_name: string } };
    sponsor: { sponsored: boolean };
    contribution: { contributed: boolean };
  }>;
}

const TournamentsParentList = ({
  tournaments,
  setJoinTournamentId,
  handleModalOpen,
}: Props) => {
  if (tournaments.length === 0) {
    return (
      <div className={cn(styles.noTournaments, styles.container)}>
        <div>
          <Image src="/illustrations/01.png" layout="fill"></Image>
        </div>
        <div>
          <h3>
            No tournaments currently.{" "}
            <Link href="/createtournament">Create</Link> one to play with
            friends or jump right into the <Link href={""}>game</Link> .
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className={cn(styles.container)}>
      <ul>
        {tournaments.map((t) => {
          return (
            <TournamentList
              key={t.id}
              {...t}
              handleModalOpen={handleModalOpen}
              setJoinTournamentId={setJoinTournamentId}
            ></TournamentList>
          );
        })}
      </ul>
    </div>
  );
};

export const TournamentsParentListFragment = gql`
  fragment TournamentsParentList_PaginatedTournament on PaginatedTournamentType {
    docs {
      id
      ...TournamentList_Tournament
    }
  }
  ${TournamentListFragment}
`;

export default TournamentsParentList;
