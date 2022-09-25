import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../../components/Button/Button";
import { FormEvent, useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { ApolloError } from "@apollo/client";

interface Props {
  updateProfile: Function;
  first_name: string | undefined;
  last_name: string | undefined;
  error: ApolloError | undefined;
  isActive: boolean;
}

const SignUpFullName = ({
  updateProfile,
  first_name,
  last_name,
  error,
  isActive,
}: Props) => {
  const swiper = useSwiper();
  const [namesError, setNamesError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const errorArray = error.message.split(":");
      if (errorArray[0] === "first_name" || errorArray[0] === "last_name") {
        setNamesError(errorArray[1].trim());
        swiper.slideTo(0);
      }
    } else {
      setNamesError(null);
    }
  }, [error, swiper]);
  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>What&apos;s your name?</h3>
          </label>
        </div>
        {namesError ? (
          <div className={cn(styles.errors)} data-swiper-parallax="-750">
            <p>{namesError}</p>
          </div>
        ) : (
          ""
        )}
        <div className={cn(styles.inputs)} data-swiper-parallax="-500">
          <input
            className={cn("swiper-no-swiping")}
            tabIndex={isActive ? 0 : -1}
            type="text"
            placeholder="First Name"
            value={first_name || ""}
            onInput={(
              e: FormEvent & { target: EventTarget & { [key: string]: any } }
            ) => {
              updateProfile("first_name", e.target.value);
            }}
          ></input>
          <input
            className={cn("swiper-no-swiping")}
            tabIndex={isActive ? 0 : -1}
            type="text"
            placeholder="Last Name"
            value={last_name || ""}
            onInput={(
              e: FormEvent & { target: EventTarget & { [key: string]: any } }
            ) => {
              updateProfile("last_name", e.target.value);
            }}
          ></input>
        </div>
        <div className={cn(styles.buttons)} data-swiper-parallax="-100">
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

export default SignUpFullName;
