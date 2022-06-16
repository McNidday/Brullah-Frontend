import styles from "./styles.module.scss";
import cn from "classnames";
import CircularLoading from "../../../CricularLoad/CircularLoading";

const CompletedTournamentsLoading = () => {
  return (
    <div className={cn(styles.container)}>
      <div>
        <div>
          <h3>Completed</h3>
        </div>
      </div>
      <div className={cn(styles.loadingContainer)}>
        <CircularLoading></CircularLoading>
      </div>
    </div>
  );
};

export default CompletedTournamentsLoading;
