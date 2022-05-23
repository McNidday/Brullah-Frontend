import cn from "classnames";
import DashboardNavLinks from "./navigation/DashboardNavLinks";
import styles from "./styles.module.scss";
import DashboardTransactionLinks from "./transactions/DashboardTransactionLinks";

const DashboardTransactions = () => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <DashboardTransactionLinks></DashboardTransactionLinks>
        <DashboardNavLinks></DashboardNavLinks>
      </div>
    </div>
  );
};

export default DashboardTransactions;
