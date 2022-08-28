import TournamentSearch from "./search/TournamentSearch";
import TournamentsParentList, {
  TournamentsParentListFragment,
} from "./tournaments/TournamentsParentList";
import styles from "./styles.module.scss";
import cn from "classnames";
import { gql, NetworkStatus, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import TournamentParentListModal from "./tournaments/modal/TournamentParentListModal";
import TournamentsLoading from "./loading/TournamentsLoading";
import TournamentsError from "./error/TournamentsError";
import debounce from "lodash.debounce";

const TOURNAMENTS = gql`
  query GetPublicTournaments($page: Int!, $limit: Int!, $search: String) {
    tournaments(page: $page, limit: $limit, search: $search) {
      page
      hasNextPage
      ...TournamentsParentList_PaginatedTournament
    }
  }
  ${TournamentsParentListFragment}
`;

const USER = gql`
  query GetUser {
    user {
      id
    }
  }
`;

const TournamentsMain = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data, networkStatus, fetchMore, refetch } = useQuery(
    TOURNAMENTS,
    {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
      variables: {
        page: page,
        limit: 10,
        search: "",
      },
    }
  );

  const { loading: userLoading, data: userData } = useQuery(USER);
  const [search, setSearch] = useState<string | null>(null);
  const [joinTournamentId, setJoinTournamentId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);
  const getSearchResults = useRef(
    debounce((val: string) => {
      if (val) {
        refetch({
          page: 1,
          search: val,
          limit: 10,
        });
      } else {
        refetch({
          page: 1,
          search: "",
          limit: 10,
        });
      }
    }, 500)
  ).current;

  const handleSearch = (val: string) => {
    if (val && val !== "") {
      setSearch(val);
    } else {
      setSearch(null);
    }
    getSearchResults(val);
  };

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
        <TournamentSearch
          search={search}
          setSearch={handleSearch}
        ></TournamentSearch>
        <TournamentsParentList
          user={userData?.user}
          search={search}
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
