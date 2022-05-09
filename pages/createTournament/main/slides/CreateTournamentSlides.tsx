import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination } from "swiper";
import cn from "classnames";

import "swiper/css/bundle";
import momenttz from "moment-timezone";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Logo from "../../../components/Logo/Logo";
import { encodeImageToBlurHash } from "../../../functions/helpers";

const CreateTournamentSlides = () => {
  const loading = false;
  return (
    <>
      <Swiper
        speed={1000}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        modules={[Parallax, Pagination]}
        className={cn("mySwiper", styles.swiper)}
        direction={"vertical"}
        noSwipingClass="swiper-no-swiping"
      >
        <div
          slot="container-start"
          className={cn(styles.parallaxBg)}
          data-swiper-parallax="-2%"
        ></div>
        <div
          slot="container-start"
          className={cn(styles.loading, loading ? styles.loaderActive : "")}
        >
          <Logo
            thinking={true}
            text={true}
            image={{ width: "100px", height: "100px" }}
            container={{ width: "210px", height: "80px" }}
          ></Logo>
        </div>
      </Swiper>
    </>
  );
};

export default CreateTournamentSlides;
