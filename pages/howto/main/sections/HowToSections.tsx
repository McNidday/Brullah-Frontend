import { Controller, HashNavigation, Parallax } from "swiper";
import { Swiper as SwiperInterface } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import HowToIntro from "./intro/HowToIntro";
import HowToGames from "./games/HowToGames";
import HowToTournament from "./tournament/HowToTournament";
import HowToDashboard from "./dashboard/HowToDashboard";

interface Props {
  hashChange: () => void;
  hash: string | null;
}

const HowToSections = ({ hash, hashChange }: Props) => {
  const [controlledSwiper, setControlledSwiper] = useState<
    SwiperInterface | undefined
  >(undefined);
  useEffect(() => {
    if (!controlledSwiper) return;
    switch (hash) {
      case "brullah":
        controlledSwiper!.slideTo(0);
        break;
      case "games":
        controlledSwiper!.slideTo(1);
        break;
      case "tournament":
        controlledSwiper!.slideTo(2);
        break;
      case "dashboard":
        controlledSwiper!.slideTo(3);
        break;
    }
  }, [hash, controlledSwiper]);

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
        direction={"vertical"}
      >
        <div
          slot="container-start"
          className={cn(styles.parallaxBg)}
          data-swiper-parallax="-2%"
        ></div>
        <SwiperSlide data-hash="brullah">
          <HowToIntro></HowToIntro>
        </SwiperSlide>
        <SwiperSlide data-hash="games">
          <HowToGames></HowToGames>
        </SwiperSlide>
        <SwiperSlide data-hash="tournament">
          <HowToTournament></HowToTournament>
        </SwiperSlide>
        <SwiperSlide data-hash="dashboard">
          <HowToDashboard></HowToDashboard>
        </SwiperSlide>
      </Swiper>
    </main>
  );
};

export default HowToSections;
