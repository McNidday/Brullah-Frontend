import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.scss";

const DashboardNavLinks = () => {
  return (
    <>
      <div className={cn(styles.title)}>
        <h2>Navigation</h2>
      </div>
      <div className={cn(styles.links)}>
        <Link href={"/mytournaments"} passHref>
          <a>
            <h4>My tournaments</h4>
          </a>
        </Link>
        <Link href={"/tournaments"}>
          <a>
            <h4>Tournaments</h4>
          </a>
        </Link>
        <Link href={"/play"}>
          <a>
            <h4>Play</h4>
          </a>
        </Link>
      </div>
    </>
  );
};

export default DashboardNavLinks;
