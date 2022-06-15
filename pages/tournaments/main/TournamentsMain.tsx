import TournamentSearch from "./search/TournamentSearch";
import TournamentsParentList, {
  TournamentsParentListFragment,
} from "./tournaments/TournamentsParentList";
import styles from "./styles.module.scss";
import cn from "classnames";
import { gql, NetworkStatus, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import TournamentParentListModal from "./tournaments/modal/TournamentParentListModal";
import TournamentsLoading from "./loading/TournamentsLoading";
import TournamentsError from "./error/TournamentsError";

const TOURNAMENTS = gql`
  query GetPublicTournaments($page: Int!, $limit: Int!) {
    tournaments(page: $page, limit: $limit) {
      page
      hasNextPage
      ...TournamentsParentList_PaginatedTournament
    }
  }
  ${TournamentsParentListFragment}
`;

const TournamentsMain = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data, networkStatus, fetchMore } = useQuery(
    TOURNAMENTS,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        page: page,
        limit: 20,
      },
    }
  );

  const [joinTournamentId, setJoinTournamentId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  const onLoadMore = () => {
    if (
      networkStatus === NetworkStatus.fetchMore ||
      networkStatus === NetworkStatus.loading ||
      !data.tournaments.hasNextPage
    )
      return;
    fetchMore({
      variables: {
        page: page + 1,
      },
    });
  };

  useEffect(() => {
    if (data?.tournaments) {
      setPage(data.tournaments.page);
    }
  }, [data]);

  if (loading && NetworkStatus.loading === networkStatus)
    return <TournamentsLoading></TournamentsLoading>;

  if (error) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <TournamentsError error={error}></TournamentsError>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <TournamentSearch></TournamentSearch>
        <TournamentsParentList
          hasNextPage={data.tournaments.hasNextPage}
          networkStatus={networkStatus}
          onLoadMore={onLoadMore}
          setJoinTournamentId={(id: string) => setJoinTournamentId(id)}
          handleModalOpen={handleModalOpen}
          tournaments={data.tournaments.docs}
        ></TournamentsParentList>
        <TournamentParentListModal
          tournamentId={joinTournamentId}
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
        ></TournamentParentListModal>
      </div>
    </div>
  );
};

export default TournamentsMain;
