import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.scss";

const DashboardTransactionLinks = () => {
  return (
    <>
      <div className={cn(styles.title)}>
        <h2>Transactions</h2>
      </div>
      <div className={cn(styles.links)}>
        <Link href={""} passHref>
          <a>
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
