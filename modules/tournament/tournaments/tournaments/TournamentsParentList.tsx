import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";
import cn from "classnames";
import TournamentList, { TournamentListFragment } from "./list/TournamentList";
import { gql, NetworkStatus } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  hasNextPage: boolean;
  networkStatus: number;
  onLoadMore: () => void;
  search: string | null;
  user: { id: string } | null;
  tournaments: Array<{
    id: string;
    information: {
      name: string;
      description: string;
      thumbnail: { image: string; blurhash: string };
    };
    joined: Array<{ id: string }>;
    creator: {
      id: string;
      identity: {
        brullah_name: string;
        avatar: { image: string; blurhash: string };
      };
      stats: {
        tournament: {
          likes: number;
        };
      };
    };
    sponsor: { sponsored: boolean };
    contribution: { contributed: boolean };
  }>;
}

const TournamentsParentList = ({
  user,
  search,
  hasNextPage,
  networkStatus,
  onLoadMore,
  tournaments,
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
          <Image fill src="/illustrations/04.png" alt=""></Image>
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

  if (!tournamentsExist && tournaments && tournaments.length === 0) {
    return (
      <div className={cn(styles.noTournaments, styles.container)}>
        <div>
          <Image fill src="/illustrations/01.png" alt=""></Image>
        </div>
        <div>
          <h3>
            No tournaments currently.{" "}
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
          <Image fill src="/illustrations/04.png" alt=""></Image>
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
            <TournamentList user={user} key={t.id} {...t}></TournamentList>
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
