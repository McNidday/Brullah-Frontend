import styles from "./styles.module.scss";
import cn from "classnames";
import TournamentList from "./list/TournamentList";
import uniqid from "uniqid";

const TournamentsMain = () => {
  const list = [];
  for (let i = 0; i < 50; i++) {
    list.push(<TournamentList key={uniqid()}></TournamentList>);
  }
  return (
    <div className={cn(styles.container)}>
      <ul>{list.map((t) => t)}</ul>
    </div>
  );
};

export default TournamentsMain;
