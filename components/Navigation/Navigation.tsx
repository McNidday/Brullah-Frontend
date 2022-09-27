import anime from "animejs";
import { useState } from "react";
import SideNavigation from "./SideNavigation/SideNavigation";
import TopNavigation from "./TopNavigation/TopNavigation";

interface Props {
  hideTopNav?: boolean;
  hideSideNav?: boolean;
}

const Navigation = ({ hideTopNav, hideSideNav }: Props) => {
  const [sideNavigationOpen, setSideNavigationOpen] = useState(false);
  const handleSideNavigation = () => {
    if (sideNavigationOpen) {
      setSideNavigationOpen(false);
    } else {
      setSideNavigationOpen(true);
    }
  };
  return (
    <>
      {!hideTopNav ? (
        <TopNavigation
          hideSideNav={hideSideNav}
          handleSideNavigation={handleSideNavigation}
        ></TopNavigation>
      ) : (
        ""
      )}
      {!hideSideNav ? (
        <SideNavigation
          hideSideNav={hideSideNav}
          handleSideNavigation={handleSideNavigation}
          sideNavigationOpen={sideNavigationOpen}
        ></SideNavigation>
      ) : (
        ""
      )}
    </>
  );
};

export default Navigation;
