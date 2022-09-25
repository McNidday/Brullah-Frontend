import classNames from "classnames";
import ApolloClientOnly from "../../../Apollo/ApolloClientOnly";
import TopNavigationLeft from "./left/TopNavigationLeft";
import TopNavigationRightLoading from "./right/Loading/TopNavigationRightLoading";
import TopNavigationRight from "./right/TopNavigationRight";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

interface Props {
  handleSideNavigation: () => void;
  hideSideNav?: boolean;
}

const TopNavigation = ({ handleSideNavigation, hideSideNav }: Props) => {
  return (
    <nav className={cn(styles.container)}>
      <TopNavigationLeft
        hideSideNav={hideSideNav}
        handleSideNavigation={handleSideNavigation}
      ></TopNavigationLeft>
      <ApolloClientOnly
        fallback={<TopNavigationRightLoading></TopNavigationRightLoading>}
      >
        <TopNavigationRight></TopNavigationRight>
      </ApolloClientOnly>
    </nav>
  );
};

export default TopNavigation;
