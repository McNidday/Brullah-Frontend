import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.scss";

interface Props {
  handleModalOpen: () => void;
  setModalName: (name: string) => void;
}

const DashboardTransactionLinks = ({
  handleModalOpen,
  setModalName,
}: Props) => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.title)}>
        <h3>Transactions</h3>
      </div>
      <div className={cn(styles.links)}>
        <Link
          href={""}
          onClick={(e) => {
            e.preventDefault();
            setModalName("depositTransactions");
            handleModalOpen();
          }}
        >
          <h4>Deposits</h4>
        </Link>
        <Link
          href={""}
          onClick={(e) => {
            e.preventDefault();
            setModalName("payoutTransactions");
            handleModalOpen();
          }}
        >
          <h4>Payouts</h4>
        </Link>
        <Link
          href={""}
          onClick={(e) => {
            e.preventDefault();
            setModalName("tournamentTransactions");
            handleModalOpen();
          }}
        >
          <h4>Tournaments</h4>
        </Link>
      </div>
    </div>
  );
};

export default DashboardTransactionLinks;
