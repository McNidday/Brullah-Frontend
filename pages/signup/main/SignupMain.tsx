import cn from "classnames";
import SignUpInputSlides from "./slides/SignUpInputSlides";
import styles from "./styles.module.scss";

const SignupMain = () => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <SignUpInputSlides></SignUpInputSlides>
      </div>
    </div>
  );
};

export default SignupMain;
