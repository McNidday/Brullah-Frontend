import styles from "./styles.module.scss";
import cn from "classnames";
import { ApolloError } from "@apollo/client";

interface Props {
  error: ApolloError;
  code: number;
}

const CompletedTournamentsError = ({ error, code }: Props) => {
  return (
    <div className={cn(styles.container)}>
      <div>
        <div>
          <h4>Completed</h4>
        </div>
      </div>
      <div className={cn(styles.errorContainer)}>
        {code === 401 ? (
          <p className={cn(styles.warnMessage)}>Login Required</p>
        ) : (
          <p className={cn(styles.errorMessage)}>{error.message}</p>
        )}
      </div>
    </div>
  );
};

export default CompletedTournamentsError;
