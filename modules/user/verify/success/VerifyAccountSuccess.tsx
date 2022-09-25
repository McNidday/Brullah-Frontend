import styles from "./styles.module.scss";
import cn from "classnames";

interface Props {
  identity: {
    arena_name: string;
  };
}

const VerifyAccountSuccess = ({ identity }: Props) => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <p>
          {identity.arena_name} your account has been verified. Brullah at your
          service (✿◠‿◠)
        </p>
      </div>
    </div>
  );
};

export default VerifyAccountSuccess;
