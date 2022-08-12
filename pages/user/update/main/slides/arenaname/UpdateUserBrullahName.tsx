import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../../components/Button/Button";
import { useSwiper } from "swiper/react";
import { FormEvent, useEffect, useState } from "react";
import { ApolloError } from "@apollo/client";

interface Props {
  updateProfile: Function;
  arena_name: string;
  error: ApolloError | undefined;
  isActive: boolean;
}

const UpdateUserBrullahName = ({
  updateProfile,
  arena_name,
  error,
  isActive,
}: Props) => {
  const swiper = useSwiper();
  const [nameError, setNameError] = useState<string | null>(null);
  useEffect(() => {
    if (error) {
      const errorArray = error.message.split(":");
      if (errorArray[0] === "arena_name") {
        setNameError(errorArray[1].trim());
        swiper.slideTo(2);
      }
    } else {
      setNameError(null);
    }
  });
  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>BrullahName update (A.K.A) UserName</h3>
          </label>
        </div>
        {nameError ? (
          <div className={cn(styles.errors)} data-swiper-parallax="-750">
            <p>{nameError}</p>
          </div>
        ) : (
          ""
        )}
        <div className={cn(styles.inputs)} data-swiper-parallax="-500">
          <input
            tabIndex={isActive ? 0 : -1}
            type="text"
            placeholder="Arena Name"
            value={arena_name || ""}
            onInput={(
              e: FormEvent & { target: EventTarget & { [key: string]: any } }
            ) => {
              updateProfile("arena_name", e.target.value);
            }}
          ></input>
        </div>
        <div className={cn(styles.buttons)} data-swiper-parallax="-100">
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

export default UpdateUserBrullahName;
