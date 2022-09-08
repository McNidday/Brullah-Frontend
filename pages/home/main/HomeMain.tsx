import moment from "moment";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { setCookie } from "../../functions/Cookies";
import HomeNav from "./nav/HomeNav";
import HomeSlides from "./slides/HomeSlides";

const HomeMain = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const { affiliate } = router.query;
      if (affiliate) {
        setCookie(
          "affiliate",
          affiliate as string,
          moment.duration(1, "month")
        );
      }
    }
  }, [router.isReady]);
  return (
    <>
      <HomeNav></HomeNav>
      <HomeSlides></HomeSlides>
    </>
  );
};

export default HomeMain;
