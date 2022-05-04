import { ApolloError, useQuery, gql } from "@apollo/client";
import anime from "animejs";
import classNames from "classnames";
import Image from "next/image";
import { useRef, useState } from "react";
import Icon from "../../Icon/Icon";
import TopNavigationRightLoading from "./Loading/TopNavigationRightLoading";
import TopRightNavigationLogin from "./Login/TopRightNavigationLogin";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

const USER = gql`
  query GetUser {
    user {
      id
      identity {
        arena_name
      }
    }
  }
`;

const TopNavigationRight = () => {
  const { loading, error, data } = useQuery(USER);
  const [dashboardHover, setDashboardHover] = useState(false);
  const [logoutHover, setLogoutHover] = useState(false);
  // Get access to the dropdown ref
  const [dropDownHover, setDropdownHover] = useState(false);
  const dropDownRef = useRef(null);
  const dropDropDown = () => {
    setDropdownHover(true);
    anime({
      targets: dropDownRef.current,
      top: "60px",
      opacity: 1,
    });
  };
  const closeDropDropDown = () => {
    setDropdownHover(false);
    anime({
      targets: dropDownRef.current,
      top: "0px",
      opacity: 0,
    });
  };

  if (loading) return <TopNavigationRightLoading></TopNavigationRightLoading>;
  if (error) return <TopRightNavigationLogin></TopRightNavigationLogin>;
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.profileContainer)}>
        <ul onMouseEnter={dropDropDown} onMouseLeave={closeDropDropDown}>
          <li>
            <div className={cn(styles.profileImage)}>
              <Image src="/icons/duck.png" layout="fill"></Image>
            </div>
            <div className={cn(styles.profileName)}>{data.user.arena_name}</div>
          </li>
          <span
            className={cn(dropDownHover ? styles.dropDownActive : "")}
          ></span>
          <ul
            ref={dropDownRef}
            className={cn(dropDownHover ? styles.dropDownActive : "")}
          >
            <li
              onMouseEnter={() => setDashboardHover(true)}
              onMouseLeave={() => setDashboardHover(false)}
            >
              <div>
                <Icon
                  activeLink="/icons/dashboard/active.svg"
                  inactiveLink="/icons/dashboard/inactive.svg"
                  hover={dashboardHover}
                ></Icon>
              </div>
              <div>Dashboard</div>
            </li>
            <li
              onMouseEnter={() => setLogoutHover(true)}
              onMouseLeave={() => setLogoutHover(false)}
            >
              <div>
                <Icon
                  activeLink="/icons/logout/active.svg"
                  inactiveLink="/icons/logout/inactive.svg"
                  hover={logoutHover}
                ></Icon>
              </div>
              <div>Logout</div>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default TopNavigationRight;
