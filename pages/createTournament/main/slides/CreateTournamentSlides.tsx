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
import TournamentName from "./name/TournamentName";
import TournamentDescription from "./deccription/TournamentDescription";
import TournamentContribution from "./contributed/TournamentContribution";
import TournamentSponsored from "./sponsored/TournamentSponsored";
import TournamentAccess from "./access/TournamentAccess";
import TournamentStartDate from "./startDate/TournamentStartDate";
import TournamentThumbnail from "./thumbnail/TournamentThumbnail";

const CreateTournamentSlides = () => {
  // Tournament name
  const [name, setName] = useState<string | undefined>(undefined);

  // Contribution state
  const [contribution, setContribution] = useState<number | undefined>(
    undefined
  );
  const [isContributed, setIsContributed] = useState<boolean>(false);

  // Sponsor state
  const [isSponsored, setIsSponsored] = useState<boolean>(false);
  const [sponsorAmount, setSponsorAmount] = useState<number | undefined>(
    undefined
  );

  // Access type
  const [accessType, setAccessType] = useState<string>("PUBLIC");

  // Start Date
  const [date, setDate] = useState<{ unix: number; date: string }>();

  // Thumbnail
  const [thumbnail, setThumbnail] = useState<File>();

  // Tournament description
  const [description, setDescription] = useState<string | undefined>(undefined);

  const loading = false;
  const error = undefined;
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
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <TournamentName
                name={name}
                setName={(val: string) => setName(val)}
                error={error}
                isActive={isActive}
              ></TournamentName>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <TournamentDescription
                description={description}
                error={error}
                setDescription={(val: string) => setDescription(val)}
                isActive={isActive}
              ></TournamentDescription>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <TournamentContribution
                error={error}
                contribution={contribution}
                isContributed={isContributed}
                setIsContributed={(val: boolean) => setIsContributed(val)}
                setContribution={(val: number) => setContribution(val)}
                setIsSponsored={(val: boolean) => setIsSponsored(val)}
                isActive={isActive}
              ></TournamentContribution>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <TournamentSponsored
                error={error}
                isActive={isActive}
                isSponsored={isSponsored}
                sponsorAmount={sponsorAmount}
                setSponsorAmount={(val: number) => setSponsorAmount(val)}
                setIsSponsored={(val: boolean) => setIsSponsored(val)}
                setIsContributed={(val: boolean) => setIsContributed(val)}
              ></TournamentSponsored>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <TournamentAccess
                setAccessType={(val: string) => setAccessType(val)}
                accessType={accessType}
                isActive={isActive}
                error={error}
              ></TournamentAccess>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <TournamentStartDate
                setDate={(val: { unix: number; date: string }) => setDate(val)}
                date={date}
                isActive={isActive}
                error={error}
              ></TournamentStartDate>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <TournamentThumbnail
                setThumbnail={(val: File) => setThumbnail(val)}
                isActive={isActive}
                error={error}
              ></TournamentThumbnail>
            );
          }}
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default CreateTournamentSlides;
