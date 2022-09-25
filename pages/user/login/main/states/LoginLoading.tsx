import styles from "./styles.module.scss";
import cn from "classnames";
import Logo from "../../../../../components/Logo/Logo";

const LoginLoading = () => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.loadingMiniContainer)}>
        <div className={cn(styles.loading, styles.loaderActive)}>
          <Logo
            thinking={true}
            text={true}
            image={{ width: "100px", height: "100px" }}
            container={{ width: "210px", height: "80px" }}
          ></Logo>
        </div>
      </div>
    </div>
  );
};

export default LoginLoading;
