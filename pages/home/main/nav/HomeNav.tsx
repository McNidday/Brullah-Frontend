import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.scss";
import { Controller, HashNavigation, Swiper as SwiperInterface } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomeNav = () => {
  const router = useRouter();
  const [controlledSwiper, setControlledSwiper] = useState<
    SwiperInterface | undefined
  >(undefined);

  useEffect(() => {
    const hashChangeComplete = (url: string) => {
      if (!controlledSwiper) return;
      const hash = url.split("#")[1];
      switch (hash) {
        case "brullah":
          controlledSwiper!.slideTo(0);
          break;
        case "about":
          controlledSwiper!.slideTo(1);
          break;
        case "features":
          controlledSwiper!.slideTo(2);
          break;
        case "community":
          controlledSwiper!.slideTo(3);
          break;
        case "discover":
          controlledSwiper!.slideTo(4);
          break;
        default:
          controlledSwiper!.slideTo(0);
          break;
      }
    };
    router.events.on("hashChangeComplete", hashChangeComplete);
    return () => {
      router.events.off("hashChangeComplete", hashChangeComplete);
    };
  }, [router.events, controlledSwiper]);
  return (
    <nav className={cn(styles.container)}>
      <ul>
        <li>
          <Link href={`/#`}>
            <a>logo</a>
          </Link>
        </li>
        <li>
          <Swiper
            controller={
              controlledSwiper ? { control: controlledSwiper } : undefined
            }
            hashNavigation={true}
            effect="coverflow"
            slideToClickedSlide={true}
            modules={[EffectCoverflow, Controller, HashNavigation]}
            onSwiper={setControlledSwiper}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={8}
            className={cn("mySwiper", styles.swiper)}
            direction={"horizontal"}
            noSwipingClass="swiper-no-swiping"
          >
            <SwiperSlide data-hash="brullah">
              <Link href={`/#brullah`}>
                <a>Brullah</a>
              </Link>
            </SwiperSlide>
            <SwiperSlide data-hash="about">
              <Link href={`/#about`}>
                <a>About</a>
              </Link>
            </SwiperSlide>
            <SwiperSlide data-hash="features">
              <Link href={`/#features`}>
                <a>Features</a>
              </Link>
            </SwiperSlide>
            <SwiperSlide data-hash="community">
              <Link href={`/#community`}>
                <a>Community</a>
              </Link>
            </SwiperSlide>
            <SwiperSlide data-hash="discover">
              <Link href={`/#discover`}>
                <a>Discover</a>
              </Link>
            </SwiperSlide>
          </Swiper>
        </li>
        <li>
          <Link href={`/user/signup`}>
            <a>Sign Up</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNav;
