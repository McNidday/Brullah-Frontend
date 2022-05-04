import TournamentSearch from "./search/TournamentSearch";
import TournamentsMain, {
  TournamentsMainFragment,
} from "./tournaments/TournamentsMain";
import styles from "./styles.module.scss";
import cn from "classnames";
import { gql, useQuery } from "@apollo/client";
import TournamentListLoading from "./tournaments/Loading/TournamentListLoading";

const TOURNAMENTS = gql`
  query GetPublicTournaments {
    tournaments(page: 1, limit: 10) {
      ...TournamentsMain_PaginatedTournament
    }
  }
  ${TournamentsMainFragment}
`;

const HomeMain = () => {
  const { loading, error, data } = useQuery(TOURNAMENTS);
  if (loading) return <TournamentListLoading></TournamentListLoading>;
  if (error) {
    return <p>Error :( {error.message}</p>;
  }
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <TournamentSearch></TournamentSearch>
        <TournamentsMain tournaments={data.tournaments.docs}></TournamentsMain>
      </div>
    </div>
  );
};

export default HomeMain;
