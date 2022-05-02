import TournamentSearch from "./search/TournamentSearch";
import TournamentsMain from "./tournaments/TournamentsMain";
import styles from "./styles.module.scss";
import cn from "classnames";

const HomeMain = () => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <TournamentSearch></TournamentSearch>
        <TournamentsMain></TournamentsMain>
      </div>
    </div>
  );
};

export default HomeMain;
