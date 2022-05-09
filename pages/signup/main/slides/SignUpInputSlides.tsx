import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination } from "swiper";
import cn from "classnames";

import "swiper/css/bundle";
import momenttz from "moment-timezone";
import styles from "./styles.module.scss";
import SignUpFullName from "./names/SignUpFullName";
import SignUpArenaName from "./arenaname/SignUpArenaName";
import SignUpAvatar from "./avatar/SignUpAvatar";
import SignupPassword from "./password/SignupPassword";
import { useEffect, useState } from "react";
import SignUpComplete from "./complete/SignUpComplete";
import { gql, useMutation } from "@apollo/client";
import SignupEmail from "./email/SignupEmail";
import Logo from "../../../components/Logo/Logo";
import { encodeImageToBlurHash } from "../../../functions/helpers";

const CREATE_USER = gql`
  mutation CreateUser($input: SignupInput) {
    signup(input: $input) {
      identity {
        avatar {
          image
          blurhash
        }
        arena_name
        first_name
        last_name
        email
        timezone
      }
    }
  }
`;

const SignUpInputSlides = () => {
  const [profile, setProfile] = useState<{ [key: string]: any }>({
    timezone: momenttz.tz.guess(),
  });
  const [createUser, { data, loading, error, reset }] = useMutation(
    CREATE_USER,
    {
      errorPolicy: "all",
    }
  );
  const updateProfile = (name: string, value: string) => {
    setProfile((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  const signup = async () => {
    const imageHash = await new Promise((resolve) => {
      const image = new FileReader();
      image.readAsDataURL(profile.avatar);
      image.onload = async () => {
        const imageHash = await encodeImageToBlurHash(
          typeof image.result! === "string" ? image.result : ""
        );
        resolve(imageHash);
      };
    });
    delete profile.confirm_password;
    const profileInput = { ...profile, blurhash: imageHash };
    await createUser({ variables: { input: profileInput } });
  };

  useEffect(() => {
    // If there is an error reset it after 5 seconds
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
              <SignUpFullName
                updateProfile={updateProfile}
                first_name={profile.first_name}
                last_name={profile.last_name}
                error={error}
                isActive={isActive}
              ></SignUpFullName>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <SignupEmail
                updateProfile={updateProfile}
                email={profile.email}
                error={error}
                isActive={isActive}
              ></SignupEmail>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <SignUpArenaName
                updateProfile={updateProfile}
                arena_name={profile.arena_name}
                error={error}
                isActive={isActive}
              ></SignUpArenaName>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          <SignUpAvatar
            updateProfile={updateProfile}
            error={error}
          ></SignUpAvatar>
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <SignupPassword
                updateProfile={updateProfile}
                signup={signup}
                password={profile.password}
                confirm_password={profile.confirm_password}
                errors={error}
                isActive={isActive}
              ></SignupPassword>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          <SignUpComplete data={data}></SignUpComplete>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SignUpInputSlides;
