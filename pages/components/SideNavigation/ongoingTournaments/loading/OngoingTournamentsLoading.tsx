import styles from "./styles.module.scss";
import cn from "classnames";
import CircularLoading from "../../../CricularLoad/CircularLoading";

const OngoingTournamentsLoading = () => {
  return (
    <div className={cn(styles.container)}>
      <div>
        <div>
          <h4>OnGoing</h4>
        </div>
      </div>
      <div className={cn(styles.loadingContainer)}>
        <CircularLoading></CircularLoading>
      </div>
    </div>
  );
};

export default OngoingTournamentsLoading;
