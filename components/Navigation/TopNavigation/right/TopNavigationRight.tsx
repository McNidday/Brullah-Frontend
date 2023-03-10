import { useQuery, gql } from "@apollo/client";
import anime from "animejs";
import classNames from "classnames";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Icon from "../../../Icon/Icon";
import TopNavigationRightLoading from "./Loading/TopNavigationRightLoading";
import TopRightNavigationLogin from "./Login/TopRightNavigationLogin";
import styles from "./styles.module.scss";
import { decodeBlurHash } from "../../../../functions/helpers";
import { useRouter } from "next/router";
import Link from "next/link";
import { deleteCookie } from "../../../../functions/Cookies";
import { ClickAwayListener } from "@mui/material";
const cn = classNames.bind(styles);

const USER = gql`
  query GetUser {
    user {
      id
      identity {
        brullah_name
        avatar {
          image
          blurhash
        }
      }
    }
  }
`;

const TopNavigationRight = () => {
  const router = useRouter();
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

  const logout = () => {
    deleteCookie("token");
    router.reload();
  };

  if (loading) return <TopNavigationRightLoading></TopNavigationRightLoading>;
  if (error) return <TopRightNavigationLogin></TopRightNavigationLogin>;

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.profileContainer)}>
        <div>
          <ClickAwayListener onClickAway={closeDropDropDown}>
            <div>
              <ul>
                <li className={cn(styles.profileImage)} onClick={dropDropDown}>
                  <Image
                    fill
                    src={data.user.identity.avatar.image}
                    alt={data.user.identity.brullah_name}
                    placeholder="blur"
                    blurDataURL={decodeBlurHash(
                      data.user.identity.avatar.blurhash,
                      100,
                      100
                    )}
                  ></Image>
                </li>
                <li className={cn(styles.profileName)}>
                  {data.user.identity.brullah_name}
                </li>
              </ul>
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
                      alt={"Dashboard Icon"}
                    ></Icon>
                  </div>
                  <div>
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </div>
                </li>
                <li
                  onMouseEnter={() => setLogoutHover(true)}
                  onMouseLeave={() => setLogoutHover(false)}
                  onClick={logout}
                >
                  <div>
                    <Icon
                      activeLink="/icons/logout/active.svg"
                      inactiveLink="/icons/logout/inactive.svg"
                      hover={logoutHover}
                      alt={"Logout Icon"}
                    ></Icon>
                  </div>
                  <div>Logout</div>
                </li>
              </ul>
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </div>
  );
};

export default TopNavigationRight;
