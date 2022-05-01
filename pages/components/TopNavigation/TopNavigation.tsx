import classNames from "classnames";
import TopNavigationLeft from "./left/TopNavigationLeft";
import TopNavigationRight from "./right/TopNavigationRight";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

const TopNavigation = () => {
  return (
    <nav className={cn(styles.container)}>
      <TopNavigationLeft></TopNavigationLeft>
      <TopNavigationRight></TopNavigationRight>
    </nav>
  );
};

export default TopNavigation;
