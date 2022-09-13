import { Controller, HashNavigation, Parallax } from "swiper";
import { Swiper as SwiperInterface } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import HomeBrullahSlide from "./brullah/HomeBrullahSlide";
import HomeAboutSlide from "./about/HomeAboutSlide";
import HomeFeaturesSlide from "./features/HomeFeaturesSlide";
import HomeCommunitySlide from "./community/HomeCommunitySlide";
import HomeDiscoverSlide from "./discover/HomeDiscoverSlide";

interface Props {
  hashChange: () => void;
  hash: string | null;
}

const HomeSlides = ({ hash, hashChange }: Props) => {
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
    <main>
      <Swiper
        hashNavigation={{
          watchState: true,
        }}
        controller={
          controlledSwiper ? { control: controlledSwiper } : undefined
        }
        onHashChange={hashChange}
        modules={[HashNavigation, Parallax, Controller]}
        onSwiper={setControlledSwiper}
        parallax={true}
        slidesPerView={"auto"}
        centeredSlides={true}
        className={cn("mySwiper", styles.swiper)}
        direction={"horizontal"}
      >
        <div
          slot="container-start"
          className={cn(styles.parallaxBg)}
          data-swiper-parallax="-2%"
        ></div>
        <SwiperSlide data-hash="brullah">
          <HomeBrullahSlide></HomeBrullahSlide>
        </SwiperSlide>
        <SwiperSlide data-hash="about">
          <HomeAboutSlide></HomeAboutSlide>
        </SwiperSlide>
        <SwiperSlide data-hash="features">
          <HomeFeaturesSlide></HomeFeaturesSlide>
        </SwiperSlide>
        <SwiperSlide data-hash="community">
          <HomeCommunitySlide></HomeCommunitySlide>
        </SwiperSlide>
        <SwiperSlide data-hash="discover">
          <HomeDiscoverSlide></HomeDiscoverSlide>
        </SwiperSlide>
      </Swiper>
    </main>
  );
};

export default HomeSlides;
