import { useState } from "react";
import Icon from "../../../Icon/Icon";
import styles from "./styles.module.scss";
import cn from "classnames";
import { Tooltip } from "@mui/material";
import Link from "next/link";

interface Props {
  handleSideNavigation: () => void;
  hideSideNav?: boolean;
}

const TopNavigationLeft = ({ handleSideNavigation, hideSideNav }: Props) => {
  const [tournamentIconHover, setTournamentIconHover] = useState(false);
  const [managerIconHover, setManagerIconHover] = useState(false);
  const [playIconHover, setPlayIconHover] = useState(false);
  const [homeIconHover, setHomeIconHover] = useState(false);

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <Link href={"/"} passHref>
          <Tooltip
            title={`Home`}
            componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
          >
            <div
              className={cn(styles.icon, hideSideNav ? "" : styles.homeIcon)}
              onMouseEnter={() => setHomeIconHover(true)}
              onMouseLeave={() => setHomeIconHover(false)}
            >
              <Icon
                activeLink="/icons/home/active.svg"
                inactiveLink="/icons/home/inactive.svg"
                hover={homeIconHover}
                alt={"Home Icon"}
              ></Icon>
            </div>
          </Tooltip>
        </Link>

        <Tooltip
          title={`Tournament schedule`}
          componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
        >
          <div
            className={cn(
              styles.icon,
              hideSideNav ? styles.hideSandwichIcon : styles.sandwichIcon
            )}
            onMouseEnter={() => setHomeIconHover(true)}
            onMouseLeave={() => setHomeIconHover(false)}
            onClick={handleSideNavigation}
          >
            <Icon
              activeLink="/icons/sandwich/active.svg"
              inactiveLink="/icons/sandwich/inactive.svg"
              hover={homeIconHover}
              alt={"Tournament Navigation Icon"}
            ></Icon>
          </div>
        </Tooltip>

        <Link href={"/tournament/tournaments"} passHref>
          <Tooltip
            title={`Join tournaments`}
            componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
          >
            <div
              className={cn(styles.icon)}
              onMouseEnter={() => setTournamentIconHover(true)}
              onMouseLeave={() => setTournamentIconHover(false)}
            >
              <Icon
                activeLink="/icons/tournament/active.svg"
                inactiveLink="/icons/tournament/inactive.svg"
                hover={tournamentIconHover}
                alt={"Toutnaments Icon"}
              ></Icon>
            </div>
          </Tooltip>
        </Link>

        <Link href={`/tournament/mytournaments`} passHref>
          <Tooltip
            title={`Your tournaments`}
            componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
          >
            <div
              className={cn(styles.icon)}
              onMouseEnter={() => setManagerIconHover(true)}
              onMouseLeave={() => setManagerIconHover(false)}
            >
              <Icon
                activeLink="/icons/tournament_manager/active.svg"
                inactiveLink="/icons/tournament_manager/inactive.svg"
                hover={managerIconHover}
                alt={"Manage Your Tournaments"}
              ></Icon>
            </div>
          </Tooltip>
        </Link>

        <Link href={`/play`} passHref>
          <Tooltip
            title={`Play`}
            componentsProps={{ tooltip: { className: cn(styles.tooltip) } }}
          >
            <div
              className={cn(styles.icon)}
              onMouseEnter={() => setPlayIconHover(true)}
              onMouseLeave={() => setPlayIconHover(false)}
            >
              <Icon
                activeLink="/icons/play/active.svg"
                inactiveLink="/icons/play/inactive.svg"
                hover={playIconHover}
                alt={"Play Games Icon"}
              ></Icon>
            </div>
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default TopNavigationLeft;
