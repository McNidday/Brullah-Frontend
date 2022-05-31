import cn from "classnames";
import DashboardNavLinks from "./navigation/DashboardNavLinks";
import styles from "./styles.module.scss";
import DashboardTransactionLinks from "./transactions/DashboardTransactionLinks";

interface Props {
  handleModalOpen: () => void;
}

const DashboardTransactions = ({ handleModalOpen }: Props) => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <DashboardTransactionLinks
          handleModalOpen={handleModalOpen}
        ></DashboardTransactionLinks>
        <DashboardNavLinks></DashboardNavLinks>
      </div>
    </div>
  );
};

export default DashboardTransactions;
