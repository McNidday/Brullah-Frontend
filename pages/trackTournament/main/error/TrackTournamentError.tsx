import styles from "./styles.module.scss";
import cn from "classnames";
import { ApolloError } from "@apollo/client";

interface Props {
  error: ApolloError;
}

const TrackTournamentError = ({ error }: Props) => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <div className={cn(styles.error)}>
          <h3>{error.message}</h3>
        </div>
      </div>
    </div>
  );
};

export default TrackTournamentError;
