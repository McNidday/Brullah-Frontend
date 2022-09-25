import styles from "./styles.module.scss";
import cn from "classnames";
import { gql, NetworkStatus } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import MyTournamentList, {
  MyTournamentListFragment,
} from "./list/MyTournamentList";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  hasNextPage: boolean;
  networkStatus: number;
  onLoadMore: () => void;
  setEditId: (id: string) => void;
  search: string | null;
  tournaments: Array<{
    id: string;
    information: {
      name: string;
      description: string;
      thumbnail: { image: string; blurhash: string };
    };
    status: { progress: string };
    analytics: { joined_users: number };
    access: { secret: string };
    creator: {
      identity: {
        arena_name: string;
        avatar: { image: string; blurhash: string };
      };
    };
    sponsor: { sponsored: boolean };
    contribution: { contributed: boolean };
  }>;
}

const MyTournamentsParentList = ({
  tournaments,
  setEditId,
  hasNextPage,
  networkStatus,
  onLoadMore,
  search,
}: Props) => {
  const [tournamentsExist, setTournamentsExist] = useState(false);
  const handleScroll = (e: any) => {
    if (
      e.currentTarget!.scrollTop + e.currentTarget!.clientHeight >=
      e.currentTarget!.scrollHeight
    ) {
      onLoadMore();
    }
  };

  useEffect(() => {
    if (tournaments.length > 0 && !tournamentsExist) {
      setTournamentsExist(true);
    }
  }, [tournaments, tournamentsExist]);

  if (
    (search && !tournaments) ||
    (search && tournaments && tournaments.length === 0)
  ) {
    return (
      <div className={cn(styles.noTournaments, styles.container)}>
        <div>
          <Image src="/illustrations/04.png" layout="fill" alt=""></Image>
        </div>
        <div>
          <h3>
            Couldn&apos;t find the searched tournament / tournaments, if you are
            just from typing, give me a moment to think about it.
          </h3>
        </div>
      </div>
    );
  }

  if (!tournamentsExist && tournaments.length === 0) {
    return (
      <div className={cn(styles.noTournaments, styles.container)}>
        <div>
          <Image src="/illustrations/01.png" layout="fill" alt=""></Image>
        </div>
        <div>
          <h3>
            You have no tornaments currenctly.{" "}
            <Link href="/createtournament">Create</Link> one to play with
            friends or jump right into the <Link href={""}>game</Link>.
          </h3>
        </div>
      </div>
    );
  }

  if (tournamentsExist && tournaments && tournaments.length === 0) {
    return (
      <div className={cn(styles.noTournaments, styles.container)}>
        <div>
          <Image src="/illustrations/04.png" layout="fill" alt=""></Image>
        </div>
        <div>
          <h3>Looking into the future...</h3>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        styles.container,
        networkStatus === NetworkStatus.fetchMore || !hasNextPage
          ? styles.containerLoading
          : ""
      )}
    >
      <ul onScroll={handleScroll}>
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
      {networkStatus === NetworkStatus.fetchMore ? (
        <div className={cn(styles.fetchMoreLoading)}>
          <CircularProgress
            className={styles.fetchMoreLoadingProgress}
          ></CircularProgress>
        </div>
      ) : !hasNextPage ? (
        <div className={cn(styles.noMore)}>
          <p>No more tournaments</p>
        </div>
      ) : (
        ""
      )}
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
