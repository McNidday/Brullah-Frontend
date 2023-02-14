import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination } from "swiper";
import cn from "classnames";

import "swiper/css/bundle";
import styles from "./styles.module.scss";
import UpdateUserFullName from "./names/UpdateUserFullName";
import UpdateUserBrullahName from "./arenaname/UpdateUserBrullahName";
import UpdateUserAvatar from "./avatar/UpdateUserAvatar";
import { useEffect, useState, useCallback } from "react";
import UpdateUserComplete from "./complete/UpdateUserComplete";
import { gql, useMutation } from "@apollo/client";
import UpdateUserEmail from "./email/UpdateUserEmail";
import Logo from "../../../../components/Logo/Logo";
import { encodeImageToBlurHash } from "../../../../functions/helpers";
import UpdateUserPassword from "./new_password/UpdateUserPassword";
import ConfirmPasswordUpdate from "./password/ConfirmPasswordUpdate";

interface Props {
  user: { [key: string]: any } | null;
}

const UPDATE_USER = gql`
  mutation UpdateUser($input: UserInput) {
    updateUser(input: $input) {
      identity {
        brullah_name
        first_name
        last_name
        email
        timezone
      }
    }
  }
`;

const UpdateUserInputSlides = ({ user }: Props) => {
  const [profile, setProfile] = useState<{ [key: string]: any }>({});
  const [profileUpload, setProfileUpload] = useState<{ [key: string]: any }>(
    {}
  );
  const [updateUser, { data, loading, error, reset }] = useMutation(
    UPDATE_USER,
    {
      errorPolicy: "all",
    }
  );

  const updateProfile = (name: string, value: string) => {
    setProfileUpload((prev) => {
      if (value === "" || !value) {
        delete prev[name];
        return { ...prev };
      } else {
        prev[name] = value;
        return { ...prev };
      }
    });
    setProfile((prev) => {
      if (value === "" || !value) {
        delete prev[name];
        return { ...prev };
      } else {
        prev[name] = value;
        return { ...prev };
      }
    });
  };

  const update = async () => {
    let profileInput: any = {};
    let imageHash: any;
    if (profileUpload.avatar) {
      imageHash = await new Promise((resolve) => {
        const image = new FileReader();
        image.readAsDataURL(profileUpload.avatar);
        image.onload = async () => {
          const imageHash = await encodeImageToBlurHash(
            typeof image.result! === "string" ? image.result : ""
          );
          resolve(imageHash);
        };
      });
    }
    if (imageHash) {
      profileInput = { ...profileUpload, blurhash: imageHash };
    } else {
      profileInput = { ...profileUpload };
    }
    delete profileInput["confirm_new_password"];
    await updateUser({ variables: { input: profileInput } });
  };

  useEffect(() => {
    if (user) {
      const localUserData = { ...user };
      delete localUserData["__typename"];
      setProfile({ ...localUserData });
    }
  }, [user]);

  useEffect(() => {
    // If there is an error reset it after 5 seconds
    if (error || data) setTimeout(reset, 5000);
  }, [error, data, reset]);

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
              <UpdateUserFullName
                updateProfile={updateProfile}
                first_name={profile.first_name}
                last_name={profile.last_name}
                error={error}
                isActive={isActive}
              ></UpdateUserFullName>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <UpdateUserEmail
                updateProfile={updateProfile}
                email={profile.email}
                error={error}
                isActive={isActive}
              ></UpdateUserEmail>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <UpdateUserBrullahName
                updateProfile={updateProfile}
                brullah_name={profile.brullah_name}
                error={error}
                isActive={isActive}
              ></UpdateUserBrullahName>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          <UpdateUserAvatar
            updateProfile={updateProfile}
            error={error}
          ></UpdateUserAvatar>
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <UpdateUserPassword
                updateProfile={updateProfile}
                password={profile.new_password}
                confirm_password={profile.confirm_new_password}
                errors={error}
                isActive={isActive}
              ></UpdateUserPassword>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          {({ isActive }) => {
            return (
              <ConfirmPasswordUpdate
                updateProfile={updateProfile}
                password={profile.password}
                errors={error}
                isActive={isActive}
                update={update}
              ></ConfirmPasswordUpdate>
            );
          }}
        </SwiperSlide>
        <SwiperSlide className={cn(styles.swiperSlide)}>
          <UpdateUserComplete data={data}></UpdateUserComplete>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default UpdateUserInputSlides;
