import { Controller, HashNavigation, Parallax } from "swiper";
import { Swiper as SwiperInterface } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const HomeSlides = () => {
  const router = useRouter();
  const [controlledSwiper, setControlledSwiper] = useState<
    SwiperInterface | undefined
  >(undefined);
  useEffect(() => {
    if (!controlledSwiper) return;
    const hashChangeComplete = (url: string) => {
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
    <main>
      <Swiper
        hashNavigation={{
          watchState: true,
        }}
        controller={
          controlledSwiper ? { control: controlledSwiper } : undefined
        }
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
          <div>This is a brullah</div>
        </SwiperSlide>
        <SwiperSlide data-hash="about">
          <div>This is a about</div>
        </SwiperSlide>
        <SwiperSlide data-hash="features">
          <div>This is a features</div>
        </SwiperSlide>
        <SwiperSlide data-hash="community">
          <div>This is a community</div>
        </SwiperSlide>
        <SwiperSlide data-hash="discover">
          <div>This is a discover</div>
        </SwiperSlide>
      </Swiper>
    </main>
  );
};

export default HomeSlides;
