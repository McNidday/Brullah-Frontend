import styles from "./styles.module.scss";
import cn from "classnames";
import { useState } from "react";
import Icon from "../../../../components/Icon/Icon";

const TournamentSearch = () => {
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
    </div>
  );
};

export default TournamentSearch;
