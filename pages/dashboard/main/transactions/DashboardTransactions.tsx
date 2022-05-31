import cn from "classnames";
import DashboardNavLinks from "./navigation/DashboardNavLinks";
import styles from "./styles.module.scss";
import DashboardTransactionLinks from "./transactions/DashboardTransactionLinks";

interface Props {
  handleModalOpen: () => void;
  setModalName: (name: string) => void;
}

const DashboardTransactions = ({ handleModalOpen, setModalName }: Props) => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <DashboardTransactionLinks
          handleModalOpen={handleModalOpen}
          setModalName={setModalName}
        ></DashboardTransactionLinks>
        <DashboardNavLinks></DashboardNavLinks>
      </div>
    </div>
  );
};

export default DashboardTransactions;
