import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../../components/Button/Button";
import { FormEvent, useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { ApolloError } from "@apollo/client";
import Icon from "../../../../../components/Icon/Icon";

interface Props {
  updateProfile: Function;
  update: Function;
  password: string;
  errors: ApolloError | undefined;
  isActive: boolean;
}

const ConfirmPasswordUpdate = ({
  updateProfile,
  password,
  update,
  errors,
  isActive,
}: Props) => {
  const swiper = useSwiper();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconHover, setEyeIconHover] = useState(false);

  useEffect(() => {
    if (password === "" || !password) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [password]);

  useEffect(() => {
    if (errors) {
      const errorArray = errors.message.split(":");
      if (errorArray[0] === "password") {
        setPasswordError(errorArray[1].trim());
        swiper.slideTo(5);
      }
    } else {
      setPasswordError(null);
    }
  }, [errors, swiper]);

  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>Enter your current password to seal the deal.</h3>
          </label>
        </div>
        {passwordError ? (
          <div className={cn(styles.errors)} data-swiper-parallax="-750">
            <p>{passwordError}</p>
          </div>
        ) : (
          ""
        )}
        <div className={cn(styles.inputs)} data-swiper-parallax="-500">
          <input
            className={cn("swiper-no-swiping")}
            tabIndex={isActive ? 0 : -1}
            type={`${showPassword ? `text` : `password`}`}
            placeholder="Password"
            value={password || ""}
            onInput={(
              e: FormEvent & { target: EventTarget & { [key: string]: any } }
            ) => {
              updateProfile("password", e.target.value!);
            }}
          ></input>
          <div
            className={cn(styles.eyeIcons)}
            onMouseEnter={() => setEyeIconHover(true)}
            onMouseLeave={() => setEyeIconHover(false)}
            onClick={() => setShowPassword(showPassword ? false : true)}
          >
            {showPassword ? (
              <div className={cn(styles.eyeIcon)}>
                <Icon
                  activeLink="/icons/eye_visible/active.svg"
                  inactiveLink="/icons/eye_visible/inactive.svg"
                  hover={eyeIconHover}
                  alt="Hide Password Icon"
                ></Icon>
              </div>
            ) : (
              <div className={cn(styles.eyeIcon)}>
                <Icon
                  activeLink="/icons/eye_slash/active.svg"
                  inactiveLink="/icons/eye_slash/inactive.svg"
                  hover={eyeIconHover}
                  alt="Show Password Icon"
                ></Icon>
              </div>
            )}
          </div>
        </div>
        <div className={cn(styles.buttons)} data-swiper-parallax="-250">
          <Button
            text="back"
            disabled={false}
            onClick={() => swiper.slidePrev()}
          ></Button>
          <Button
            text="Seal the deal"
            disabled={buttonDisabled}
            onClick={update}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default ConfirmPasswordUpdate;
