import styles from "./styles.module.scss";
import cn from "classnames";
import { useState } from "react";
import Icon from "../../../../components/Icon/Icon";
import Link from "next/link";

const MyTournamentSearch = () => {
  const [searcIconHover, setSearcIconHover] = useState(false);
  return (
    <div className={cn(styles.container)}>
      <div>
        <input placeholder="Search"></input>
        <div
          onMouseEnter={() => setSearcIconHover(true)}
          onMouseLeave={() => setSearcIconHover(false)}
        >
          <Icon
            activeLink="/icons/search/active.svg"
            inactiveLink="/icons/search/inactive.svg"
            hover={searcIconHover}
          ></Icon>
        </div>
      </div>
      <div className={cn(styles.createTournamentLink)}>
        <Link href={"/tournament/createtournament"}>
          <a>
            <h4>Create Tournament</h4>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MyTournamentSearch;
