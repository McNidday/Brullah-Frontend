import { Duration } from "luxon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setCookie } from "../../functions/Cookies";
import HowToNav from "./nav/HowToNav";
import HowToSections from "./sections/HowToSections";

const HowToMain = () => {
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
          Duration.fromObject({ month: 1 })
        );
      }
    }
  }, [router.isReady, router.query]);

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
      <HowToNav hash={hash}></HowToNav>
      <HowToSections hash={hash} hashChange={hashChange}></HowToSections>
    </>
  );
};

export default HowToMain;
