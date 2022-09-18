import styles from "./styles.module.scss";
import cn from "classnames";
import { ApolloError } from "@apollo/client";

interface Props {
  error: ApolloError;
}

const VerifyAccountError = ({ error }: Props) => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <p>{error.message}</p>
      </div>
    </div>
  );
};

export default VerifyAccountError;
