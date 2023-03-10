import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination } from "swiper";
import { gql, useMutation } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import cn from "classnames";

import "swiper/css/bundle";
import { DateTime } from "luxon";
import styles from "./styles.module.scss";
import SignUpFullName from "./names/SignUpFullName";
import SignUpArenaName from "./arenaname/SignUpArenaName";
import SignUpAvatar from "./avatar/SignUpAvatar";
import SignupPassword from "./password/SignupPassword";
import SignUpComplete from "./complete/SignUpComplete";
import SignupEmail from "./email/SignupEmail";
import SignUpAgreement from "./agreement/SignUpAgreement";
import Logo from "../../../../components/Logo/Logo";
import { encodeImageToBlurHash } from "../../../../functions/helpers";
import Cookies, { deleteCookie } from "../../../../functions/Cookies";
import SignupAffiliate from "./affiliate/SignupAffiliate";

const CREATE_USER = gql`
  mutation CreateUser($input: SignupInput) {
    signup(input: $input) {
      identity {
        avatar {
          image
          blurhash
        }
        brullah_name
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
    timezone: DateTime.now().zoneName,
  });
  const [localAvatarError, setLocalAvatarError] = useState<string | null>(null);
  const [createUser, { data, loading, error, reset }] = useMutation(
    CREATE_USER,
    {
      errorPolicy: "all",
    }
  );

  const updateProfile = useCallback((name: string, value: string) => {
    setProfile((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  }, []);

  const signup = useCallback(
    async (excludeAffiliate: boolean) => {
      if (!profile.avatar) {
        setLocalAvatarError("Please select the icon and upload avatar.");
        return;
      }
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
      const profileInput: any = { ...profile, blurhash: imageHash };
      if (Cookies("affiliate") && !excludeAffiliate) {
        profileInput.affiliate = Cookies("affiliate");
      } else if (excludeAffiliate && Cookies("affiliate")) {
        deleteCookie("affiliate");
        delete profileInput.affiliate;
      }

      await createUser({ variables: { input: profileInput } });
    },
    [profile, createUser]
  );

  useEffect(() => {
    let timeout: any;
    // If there is an error reset it after 5 seconds
    if (error) {
      const errorArray = error.message.split(":");
      if (errorArray[0] !== "affiliate" && !Cookies("affiliate")) {
        timeout = setTimeout(reset, 5000);
      } else if (errorArray[0] === "affiliate" && !Cookies("affiliate")) {
        timeout = setTimeout(reset, 5000);
      }
    }
    return () => clearTimeout(timeout);
  }, [error, reset]);

  useEffect(() => {
    let timeout: any;
    if (localAvatarError) {
      timeout = setTimeout(() => {
        setLocalAvatarError(null);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [localAvatarError]);

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
                brullah_name={profile.brullah_name}
                error={error}
                isActive={isActive}
              ></SignUpArenaName>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          <SignUpAvatar
            localAvatarError={localAvatarError}
            updateProfile={updateProfile}
            error={error}
          ></SignUpAvatar>
        </SwiperSlide>
        {!Cookies("affiliate") ? (
          <SwiperSlide className={cn(styles.swiperSlide)}>
            {({ isActive }) => {
              return (
                <SignupAffiliate
                  updateProfile={updateProfile}
                  affiliate={profile.affiliate}
                  isActive={isActive}
                  error={error}
                ></SignupAffiliate>
              );
            }}
          </SwiperSlide>
        ) : (
          ""
        )}
        <SwiperSlide className={cn(styles.swiperSlide)}>
          <SignUpAgreement></SignUpAgreement>
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
