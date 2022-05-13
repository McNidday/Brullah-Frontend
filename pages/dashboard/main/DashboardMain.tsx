import cn from "classnames";
import DashboardProfile from "./profile/DashboardProfile";
import styles from "./styles.module.scss";

const DashboardMain = () => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <DashboardProfile></DashboardProfile>
      </div>
    </div>
  );
};

export default DashboardMain;
