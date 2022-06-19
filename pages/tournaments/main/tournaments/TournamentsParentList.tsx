import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";
import cn from "classnames";
import TournamentList, { TournamentListFragment } from "./list/TournamentList";
import { gql, NetworkStatus } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  hasNextPage: boolean;
  networkStatus: number;
  onLoadMore: () => void;
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

const TournamentsParentList = ({
  hasNextPage,
  networkStatus,
  onLoadMore,
  tournaments,
  setJoinTournamentId,
  handleModalOpen,
}: Props) => {
  const handleScroll = (e: any) => {
    if (
      e.currentTarget!.scrollTop + e.currentTarget!.clientHeight >=
      e.currentTarget!.scrollHeight
    ) {
      onLoadMore();
    }
  };

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
            <TournamentList
              key={t.id}
              {...t}
              handleModalOpen={handleModalOpen}
              setJoinTournamentId={setJoinTournamentId}
            ></TournamentList>
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
