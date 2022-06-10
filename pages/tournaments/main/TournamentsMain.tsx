import TournamentSearch from "./search/TournamentSearch";
import TournamentsParentList, {
  TournamentsParentListFragment,
} from "./tournaments/TournamentsParentList";
import styles from "./styles.module.scss";
import cn from "classnames";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import TournamentParentListModal from "./tournaments/modal/TournamentParentListModal";
import TournamentsLoading from "./loading/TournamentsLoading";
import TournamentsError from "./error/TournamentsError";

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

  if (loading) return <TournamentsLoading></TournamentsLoading>;

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
