import styles from "./styles.module.scss";
import cn from "classnames";
import Logo from "../../../../../../components/Logo/Logo";

const EditMyTournamentLoading = () => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <div>
          <Logo
            thinking={true}
            text={true}
            image={{ width: "100px", height: "100px" }}
            container={{ width: "200px", height: "100px" }}
          ></Logo>
        </div>
      </div>
    </div>
  );
};

export default EditMyTournamentLoading;
