import classNames from "classnames";
import CompletedTournaments from "./completedTournaments/CompletedTournaments";
import OngoingTournaments from "./ongoingTournaments/OngoingTournaments";
import styles from "./styles.module.scss";
import TournamentsNotStarted from "./tournamentsNoStarted/TournamentsNotStarted";
const cn = classNames.bind(styles);

interface Props {}

const SideNavigation = (props: Props) => {
  const ongoingTournamentProps = {
    tournaments: [],
  };

  return (
    <nav className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <div>
          <h2>Tournaments</h2>
        </div>
        <div>
          <OngoingTournaments {...ongoingTournamentProps}></OngoingTournaments>
          <TournamentsNotStarted></TournamentsNotStarted>
          <CompletedTournaments></CompletedTournaments>
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
