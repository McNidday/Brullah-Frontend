import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.scss";

const DashboardNavLinks = () => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.title)}>
        <h3>Navigation</h3>
      </div>
      <div className={cn(styles.links)}>
        <Link href={"/tournament/mytournaments"} passHref>
          <a>
            <h4>My tournaments</h4>
          </a>
        </Link>
        <Link href={"/tournament/tournaments"} passHref>
          <a>
            <h4>Tournaments</h4>
          </a>
        </Link>
        <Link href={"/play"} passHref>
          <a>
            <h4>Play</h4>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default DashboardNavLinks;
