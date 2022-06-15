import styles from "./styles.module.scss";
import cn from "classnames";
import CircularLoading from "../../../CricularLoad/CircularLoading";

const TournamentNotStartedLoading = () => {
  return (
    <div className={cn(styles.container)}>
      <div>
        <div>
          <h3>Not Started</h3>
        </div>
      </div>
      <div className={cn(styles.loadingContainer)}>
        <CircularLoading></CircularLoading>
      </div>
    </div>
  );
};

export default TournamentNotStartedLoading;
