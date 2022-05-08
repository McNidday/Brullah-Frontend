import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../components/Button/Button";
import { FormEvent, useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { ApolloError } from "@apollo/client";

interface Props {
  updateProfile: Function;
  signup: Function;
  password: string;
  confirm_password: string;
  errors: ApolloError | undefined;
}

const SignupPassword = ({
  updateProfile,
  password,
  confirm_password,
  signup,
  errors,
}: Props) => {
  const swiper = useSwiper();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (errors) {
      const errorArray = errors.message.split(":");
      if (errorArray[0] === "password") {
        setPasswordError(errorArray[1].trim());
        swiper.slideTo(4);
      }
    } else {
      setPasswordError(null);
    }
  });

  useEffect(() => {
    if (password === confirm_password && error) {
      setError(null);
    }

    if (password === confirm_password) {
      setButtonDisabled(false);
    }

    if (password !== confirm_password) {
      setButtonDisabled(true);
    }
  }, [confirm_password]);

  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h1>
              You are almost there! Create a password and your brain will start
              making mullah
            </h1>
          </label>
        </div>
        {error ? (
          <div className={cn(styles.errors)} data-swiper-parallax="-750">
            <p>{error}</p>
          </div>
        ) : (
          ""
        )}
        {passwordError ? (
          <div className={cn(styles.errors)} data-swiper-parallax="-750">
            <p>{passwordError}</p>
          </div>
        ) : (
          ""
        )}
        <div className={cn(styles.inputs)} data-swiper-parallax="-500">
          <input
            type="text"
            placeholder="Password"
            value={password || ""}
            onInput={(
              e: FormEvent & { target: EventTarget & { [key: string]: any } }
            ) => {
              updateProfile("password", e.target.value!);
            }}
          ></input>
          <input
            type="text"
            placeholder="Confirm Password"
            value={confirm_password || ""}
            onBlur={() => {
              if (password !== confirm_password) {
                setError("Password and confirmation do not match.");
              } else {
                setError(null);
              }
            }}
            onInput={(
              e: FormEvent & { target: EventTarget & { [key: string]: any } }
            ) => {
              updateProfile("confirm_password", e.target.value!);
            }}
          ></input>
        </div>
        <div className={cn(styles.buttons)} data-swiper-parallax="-250">
          <Button
            text="back"
            disabled={false}
            onClick={() => swiper.slidePrev()}
          ></Button>
          <Button
            text="Make Me A Brullah"
            disabled={buttonDisabled}
            onClick={signup}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default SignupPassword;
