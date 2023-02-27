import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination } from "swiper";
import cn from "classnames";

import "swiper/css/bundle";
import styles from "./styles.module.scss";
import { useEffect, useState, useCallback } from "react";
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
        thumbnail {
          image
        }
      }
    }
  }
`;

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
  const [date, setDate] = useState<string>("");

  // Thumbnail
  const [thumbnail, setThumbnail] = useState<File | Blob>();
  const [thumbnailError, setThumbnailError] = useState<Error>();

  // Tournament description
  const [description, setDescription] = useState<string | undefined>(undefined);

  const [create, { data, loading, error, reset }] = useMutation(
    CREATE_TOURNAMENT,
    {
      errorPolicy: "all",
      update(cache, { data: createdTournament }) {
        cache.modify({
          fields: {
            myTournaments: (existing) => {
              console.log(existing, "This is the existing piece of shiet");
              const newTournamentRef = cache.writeFragment({
                data: createdTournament.createTournament,
                fragment: gql`
                  fragment NewTournament on Tournament {
                    id
                    information {
                      name
                      thumbnail {
                        image
                      }
                    }
                  }
                `,
              });
              return {
                ...existing,
                docs: [...existing.docs, newTournamentRef],
              };
            },
          },
        });
      },
    }
  );

  const setThumbnailCallback = useCallback((val: File) => {
    setThumbnail(val);
  }, []);

  const createTournament = useCallback(async () => {
    if (loading || error || data) return;
    console.log(loading, error, data, "The three of them bitch ass pussy.");
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
          game: "Checkers",
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
              value: sponsorAmount ? sponsorAmount * 100 : undefined,
            },
          },
          reward:
            isSponsored || isContributed
              ? isSponsored
                ? "SPONSORED"
                : "CONTRIBUTION"
              : "NONE",
          access: accessType,
          start_date: date,
        },
      },
    };
    create(TData);
  }, [
    accessType,
    contribution,
    create,
    data,
    date,
    description,
    error,
    isContributed,
    isSponsored,
    loading,
    name,
    sponsorAmount,
    thumbnail,
  ]);

  useEffect(() => {
    // If there is an error reset it after 5 seconds
    if (thumbnailError) setTimeout(() => setThumbnailError(undefined), 5000);
    if (error) setTimeout(reset, 5000);
  }, [error, thumbnailError, reset]);

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
                setDate={(val: string) => setDate(val)}
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
                createTournament={createTournament}
                setThumbnail={setThumbnailCallback}
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
