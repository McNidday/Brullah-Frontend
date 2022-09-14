import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination } from "swiper";
import uniqid from "uniqid";
import cn from "classnames";

import "swiper/css/bundle";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Logo from "../../../../components/Logo/Logo";
import { encodeImageToBlurHash } from "../../../../functions/helpers";
import TournamentName from "./name/TournamentName";
import TournamentDescription from "./description/TournamentDescription";
import TournamentContribution from "./contributed/TournamentContribution";
import TournamentSponsored from "./sponsored/TournamentSponsored";
import TournamentAccess from "./access/TournamentAccess";
import TournamentStartDate from "./startDate/TournamentStartDate";
import TournamentThumbnail from "./thumbnail/TournamentThumbnail";
import TournamentCreationComplete from "./complete/TournamentCreationComplete";

const CREATE_TOURNAMENT = gql`
  mutation CreateTournament($input: TournamentInput) {
    createTournament(input: $input) {
      id
      information {
        name
      }
    }
  }
`;

const CreateTournamentSlides = () => {
  // Track if tournament is being created
  const [creatingTournament, setCreatingTounament] = useState(false);
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
  const [date, setDate] = useState<{ unix: number; date: string }>({
    unix: 0,
    date: "",
  });

  // Thumbnail
  const [thumbnail, setThumbnail] = useState<File | Blob>();
  const [thumbnailError, setThumbnailError] = useState<Error>();

  // Tournament description
  const [description, setDescription] = useState<string | undefined>(undefined);

  const [create, { data, loading, error, reset }] = useMutation(
    CREATE_TOURNAMENT,
    {
      errorPolicy: "all",
    }
  );

  const createTournament = async () => {
    if (loading || error || data) return;
    if (!thumbnail) {
      setThumbnailError(new Error("No image has been selected"));
      return;
    }
    const thumbnailHash = await new Promise((resolve) => {
      if (!thumbnail) return resolve(undefined);
      const image = new FileReader();
      image.readAsDataURL(thumbnail!);
      image.onload = async () => {
        const imageHash = await encodeImageToBlurHash(
          typeof image.result! === "string" ? image.result : ""
        );
        resolve(imageHash);
      };
    });
    const TData = {
      variables: {
        input: {
          game: {
            id: uniqid(),
            name: "Checkers",
          },
          information: {
            name: name,
            description: description,
            thumbnail: {
              image: thumbnail,
              blurhash: thumbnailHash,
            },
          },
          contribution: {
            contributed: isContributed,
            per_user: {
              currency: "BRC",
              value: contribution,
            },
          },
          sponsor: {
            sponsored: isSponsored,
            balance: {
              currency: "BRC",
              value: sponsorAmount,
            },
          },
          reward:
            isSponsored || isContributed
              ? isSponsored
                ? "SPONSORED"
                : "CONTRIBUTION"
              : "NONE",
          start_date: date?.unix,
        },
      },
    };
    create(TData);
  };

  useEffect(() => {
    // If there is an error reset it after 5 seconds
    if (thumbnailError) setTimeout(() => setThumbnailError(undefined), 5000);
    if (error) setTimeout(reset, 5000);
  }, [error]);

  if (error) {
    if (error.graphQLErrors.length <= 0) {
      return (
        <div className={cn(styles.error)}>
          <h2>{error.message}</h2>
        </div>
      );
    }
  }

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
                serverError={error}
                createTournament={() => createTournament()}
                setThumbnail={(val: File) => setThumbnail(val)}
                isActive={isActive}
                error={thumbnailError}
              ></TournamentThumbnail>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          <TournamentCreationComplete data={data}></TournamentCreationComplete>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default CreateTournamentSlides;
