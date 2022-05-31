import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.scss";

interface Props {
  handleModalOpen: () => void;
}

const DashboardTransactionLinks = ({ handleModalOpen }: Props) => {
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
              handleModalOpen();
            }}
          >
            <h4>Deposits</h4>
          </a>
        </Link>
        <Link href={""}>
          <a>
            <h4>Payouts</h4>
          </a>
        </Link>
        <Link href={""}>
          <a>
            <h4>Tournaments</h4>
          </a>
        </Link>
      </div>
    </>
  );
};

export default DashboardTransactionLinks;
