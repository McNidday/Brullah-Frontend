import classNames from "classnames";
import NotStarted from "./notStarted/NotStarted";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

const TournamentsNotStarted = () => {
  const tournamentProps = {
    information: { name: "Donald Duck", thumbnail: "sothin" },
    startUnix: 100000000,
  };
  return (
    <div className={cn(styles.container)}>
      <div>
        <div>
          <h3>Not Started</h3>
        </div>
      </div>
      <ul className={cn(styles.tournamentList)}>
        <NotStarted {...tournamentProps}></NotStarted>
      </ul>
    </div>
  );
};

export default TournamentsNotStarted;
