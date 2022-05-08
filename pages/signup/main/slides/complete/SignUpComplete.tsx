import cn from "classnames";
import styles from "./styles.module.scss";
const SignUpComplete = () => {
  return (
    <div className={cn(styles.container)}>
      <h2>
        Greate. You just became a brullah. One more step to give you full access
        to brullah services. A verification link has been sent to your email,
        click on it and you will be golden.
      </h2>
    </div>
  );
};

export default SignUpComplete;
