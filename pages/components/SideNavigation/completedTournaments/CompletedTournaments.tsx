import classNames from "classnames";
import Completed from "./completed/Completed";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);
const CompletedTournaments = () => {
  const tournamentProps = {
    information: { name: "Donald Duck", thumbnail: "sothin" },
    startUnix: 100000000,
  };
  return (
    <div className={cn(styles.container)}>
      <div>
        <div>
          <h3>Completed</h3>
        </div>
      </div>
      <ul className={cn(styles.tournamentList)}>
        <Completed {...tournamentProps}></Completed>
      </ul>
    </div>
  );
};

export default CompletedTournaments;
