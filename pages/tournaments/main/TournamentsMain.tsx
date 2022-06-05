import TournamentSearch from "./search/TournamentSearch";
import TournamentsParentList, {
  TournamentsParentListFragment,
} from "./tournaments/TournamentsParentList";
import styles from "./styles.module.scss";
import cn from "classnames";
import { gql, useQuery } from "@apollo/client";
import TournamentListLoading from "./tournaments/Loading/TournamentListLoading";
import { useState } from "react";
import TournamentParentListModal from "./tournaments/modal/TournamentParentListModal";

const TOURNAMENTS = gql`
  query GetPublicTournaments {
    tournaments(page: 1, limit: 10) {
      ...TournamentsParentList_PaginatedTournament
    }
  }
  ${TournamentsParentListFragment}
`;

const TournamentsMain = () => {
  const { loading, error, data } = useQuery(TOURNAMENTS);
  const [joinTournamentId, setJoinTournamentId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  if (loading) return <TournamentListLoading></TournamentListLoading>;
  if (error) {
    return <p>Error :( {error.message}</p>;
  }
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <TournamentSearch></TournamentSearch>
        <TournamentsParentList
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
