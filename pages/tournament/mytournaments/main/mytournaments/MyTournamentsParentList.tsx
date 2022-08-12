import styles from "./styles.module.scss";
import cn from "classnames";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import MyTournamentList, {
  MyTournamentListFragment,
} from "./list/MyTournamentList";

interface Props {
  setEditId: (id: string) => void;
  tournaments: Array<{
    id: string;
    information: {
      name: string;
      description: string;
      thumbnail: { image: string; blurhash: string };
    };
    status: { progress: string };
    analytics: { joined_users: number };
    creator: { identity: { arena_name: string } };
    sponsor: { sponsored: boolean };
    contribution: { contributed: boolean };
  }>;
}

const MyTournamentsParentList = ({ tournaments, setEditId }: Props) => {
  if (tournaments.length === 0) {
    return (
      <div className={cn(styles.noTournaments, styles.container)}>
        <div>
          <Image src="/illustrations/01.png" layout="fill"></Image>
        </div>
        <div>
          <h3>
            You have no tornaments currenctly.{" "}
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
            <MyTournamentList
              key={t.id}
              {...t}
              setEditId={setEditId}
            ></MyTournamentList>
          );
        })}
      </ul>
    </div>
  );
};

export const MyTournamentsParentListFragment = gql`
  fragment MyTournamentsParentList_PaginatedTournament on PaginatedTournament {
    docs {
      id
      ...MyTournamentList_Tournament
    }
  }
  ${MyTournamentListFragment}
`;

export default MyTournamentsParentList;
