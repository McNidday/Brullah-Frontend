import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setCookie } from "../../functions/Cookies";
import HomeNav from "./nav/HomeNav";
import HomeSlides from "./slides/HomeSlides";

const HomeMain = () => {
  const router = useRouter();
  const [hash, setHash] = useState<string | null>(null);

  const hashChange = () => {
    const hash = window.location.hash.split("#")[1];
    setHash(() => hash);
  };

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

  // The reason there is a hash change event is because
  // Swiper watch state does not trigger the hashChaneg event
  useEffect(() => {
    const hashChangeComplete = (url: string) => {
      const hash = url.split("#")[1];
      setHash(hash);
    };
    router.events.on("hashChangeComplete", hashChangeComplete);
    return () => {
      router.events.off("hashChangeComplete", hashChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      <HomeNav hash={hash}></HomeNav>
      <HomeSlides hash={hash} hashChange={hashChange}></HomeSlides>
    </>
  );
};

export default HomeMain;
