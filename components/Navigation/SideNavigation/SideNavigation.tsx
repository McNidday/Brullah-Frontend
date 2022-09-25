import classNames from "classnames";
import { useState } from "react";
import ApolloClientOnly from "../../../Apollo/ApolloClientOnly";
import Icon from "../../Icon/Icon";
import CompletedTournaments from "./completedTournaments/CompletedTournaments";
import CompletedTournamentsLoading from "./completedTournaments/loading/CompletedTournamentsLoading";
import OngoingTournamentsLoading from "./ongoingTournaments/loading/OngoingTournamentsLoading";
import OngoingTournaments from "./ongoingTournaments/OngoingTournaments";
import styles from "./styles.module.scss";
import TournamentNotStartedLoading from "./tournamentsNoStarted/loading/TournamentNotStartedLoading";
import TournamentsNotStarted from "./tournamentsNoStarted/TournamentsNotStarted";
const cn = classNames.bind(styles);

interface Props {
  sideNavigationOpen: boolean;
  handleSideNavigation: () => void;
}

const SideNavigation = ({
  sideNavigationOpen,
  handleSideNavigation,
}: Props) => {
  const [xIconHover, setXIconHover] = useState(false);
  return (
    <nav
      className={cn(
        styles.container,
        sideNavigationOpen ? styles.containerOpen : ""
      )}
    >
      <div className={cn(styles.miniContainer)}>
        <div>
          <div
            onMouseEnter={() => setXIconHover(true)}
            onMouseLeave={() => setXIconHover(false)}
            onClick={handleSideNavigation}
          >
            <Icon
              activeLink="/icons/x/active.svg"
              inactiveLink="/icons/x/inactive.svg"
              hover={xIconHover}
              alt="Close Icon"
            ></Icon>
          </div>
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
