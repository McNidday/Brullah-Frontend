import anime from "animejs";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Icon from "../../../Icon/Icon";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

const TopRightNavigationLogin = () => {
  const [signupHover, setSignupHover] = useState(false);
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
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.profileContainer)}>
        <ul onMouseEnter={dropDropDown} onMouseLeave={closeDropDropDown}>
          <li>
            <div className={cn(styles.profileImage)}>
              <Image src="/icons/person/person.svg" layout="fill"></Image>
            </div>
            <Link href="/user/login">
              <a>Login</a>
            </Link>
          </li>
          <span
            className={cn(dropDownHover ? styles.dropDownActive : "")}
          ></span>
          <ul
            ref={dropDownRef}
            className={cn(dropDownHover ? styles.dropDownActive : "")}
          >
            <li
              onMouseEnter={() => setSignupHover(true)}
              onMouseLeave={() => setSignupHover(false)}
            >
              <div>
                <Icon
                  activeLink="/icons/dashboard/active.svg"
                  inactiveLink="/icons/dashboard/inactive.svg"
                  hover={signupHover}
                ></Icon>
              </div>
              <Link href="/signup">
                <a>Signup</a>
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default TopRightNavigationLogin;
