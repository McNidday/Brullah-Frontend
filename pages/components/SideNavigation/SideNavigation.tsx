import classNames from "classnames";
import ApolloClientOnly from "../Apollo/ApolloClientOnly";
import CompletedTournaments from "./completedTournaments/CompletedTournaments";
import CompletedTournamentsLoading from "./completedTournaments/loading/CompletedTournamentsLoading";
import OngoingTournamentsLoading from "./ongoingTournaments/loading/OngoingTournamentsLoading";
import OngoingTournaments from "./ongoingTournaments/OngoingTournaments";
import styles from "./styles.module.scss";
import TournamentNotStartedLoading from "./tournamentsNoStarted/loading/TournamentNotStartedLoading";
import TournamentsNotStarted from "./tournamentsNoStarted/TournamentsNotStarted";
const cn = classNames.bind(styles);

const SideNavigation = () => {
  return (
    <nav className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <div>
          <h3>Tournaments</h3>
        </div>
        <div>
          <ApolloClientOnly
            fallback={<OngoingTournamentsLoading></OngoingTournamentsLoading>}
          >
            <OngoingTournaments></OngoingTournaments>
          </ApolloClientOnly>

          <ApolloClientOnly
            fallback={
              <TournamentNotStartedLoading></TournamentNotStartedLoading>
            }
          >
            <TournamentsNotStarted></TournamentsNotStarted>
          </ApolloClientOnly>
          <ApolloClientOnly
            fallback={
              <CompletedTournamentsLoading></CompletedTournamentsLoading>
            }
          >
            <CompletedTournaments></CompletedTournaments>
          </ApolloClientOnly>
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
