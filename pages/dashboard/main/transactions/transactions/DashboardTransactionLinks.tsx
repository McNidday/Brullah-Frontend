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
    <>
      <div className={cn(styles.title)}>
        <h2>Transactions</h2>
      </div>
      <div className={cn(styles.links)}>
        <Link href={""} passHref>
          <a
            onClick={(e) => {
              e.preventDefault();
              setModalName("depositTransactions");
              handleModalOpen();
            }}
          >
            <h4>Deposits</h4>
          </a>
        </Link>
        <Link href={""}>
          <a
            onClick={(e) => {
              e.preventDefault();
              setModalName("payoutTransactions");
              handleModalOpen();
            }}
          >
            <h4>Payouts</h4>
          </a>
        </Link>
        <Link href={""}>
          <a
            onClick={(e) => {
              e.preventDefault();
              setModalName("tournamentTransactions");
              handleModalOpen();
            }}
          >
            <h4>Tournaments</h4>
          </a>
        </Link>
      </div>
    </>
  );
};

export default DashboardTransactionLinks;
