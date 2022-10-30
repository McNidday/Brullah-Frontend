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
        <Link href={"/tournament/mytournaments"}>
          <h4>My tournaments</h4>
        </Link>
        <Link href={"/tournament/tournaments"}>
          <h4>Tournaments</h4>
        </Link>
        <Link href={"/play"}>
          <h4>Play</h4>
        </Link>
      </div>
    </div>
  );
};

export default DashboardNavLinks;
