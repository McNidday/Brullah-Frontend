import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.scss";
import { Controller, HashNavigation, Swiper as SwiperInterface } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper";
import { useEffect, useState } from "react";
import Image from "next/image";
import TopNavigationRight from "../../../components/Navigation/TopNavigation/right/TopNavigationRight";

interface Props {
  hash: string | null;
}

const HomeNav = ({ hash }: Props) => {
  const [controlledSwiper, setControlledSwiper] = useState<
    SwiperInterface | undefined
  >(undefined);

  useEffect(() => {
    if (!controlledSwiper) return;
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
    }
  }, [hash]);

  return (
    <nav className={cn(styles.container)}>
      <ul>
        <li>
          <div>
            <Link href={`/#`}>
              <a>
                <Image src={`/icons/logo/active.svg`} layout={"fill"}></Image>
              </a>
            </Link>
          </div>
        </li>
        <li>
          <Swiper
            controller={
              controlledSwiper ? { control: controlledSwiper } : undefined
            }
            hashNavigation={{
              watchState: true,
            }}
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
                <a>Colony</a>
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
          <TopNavigationRight></TopNavigationRight>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNav;
