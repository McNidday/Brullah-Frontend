import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../../components/Button/Button";
import { useSwiper } from "swiper/react";
import { FormEvent, useEffect, useState } from "react";
import { ApolloError } from "@apollo/client";

interface Props {
  updateProfile: Function;
  email: string;
  error: ApolloError | undefined;
  isActive: boolean;
}

const UpdateUserEmail = ({ updateProfile, email, error, isActive }: Props) => {
  const swiper = useSwiper();
  const [emailError, setEmailError] = useState<string | null>(null);
  // if error exists split it and check if it's related to the email

  useEffect(() => {
    if (error) {
      const errorArray = error.message.split(":");
      if (errorArray[0] === "email") {
        setEmailError(errorArray[1].trim());
        swiper.slideTo(1);
      }
    } else {
      setEmailError(null);
    }
  });

  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>Update your email. It's important for transactions :)</h3>
          </label>
        </div>
        {emailError ? (
          <div className={cn(styles.errors)} data-swiper-parallax="-750">
            <p>{emailError}</p>
          </div>
        ) : (
          ""
        )}
        <div className={cn(styles.inputs)} data-swiper-parallax="-500">
          <input
            tabIndex={isActive ? 0 : -1}
            type="text"
            placeholder="Email"
            value={email || ""}
            onInput={(
              e: FormEvent & { target: EventTarget & { [key: string]: any } }
            ) => {
              updateProfile("email", e.target.value);
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
            text="next"
            disabled={false}
            onClick={() => swiper.slideNext()}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default UpdateUserEmail;
