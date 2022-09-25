import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../../components/Button/Button";
import { FormEvent, useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { ApolloError } from "@apollo/client";

interface Props {
  setName: Function;
  name: string | undefined;
  error: ApolloError | undefined;
  isActive: boolean;
}

const TournamentName = ({ setName, name, error, isActive }: Props) => {
  const swiper = useSwiper();
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const errorArray = error.message.split(":");
      if (errorArray[0] === "information.name") {
        setNameError(errorArray[1].trim());
        swiper.slideTo(0);
      }
    } else {
      setNameError(null);
    }
  }, [error, swiper]);

  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>What name would you give your tournament?</h3>
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
            className={cn("swiper-no-swiping")}
            tabIndex={isActive ? 0 : -1}
            type="text"
            placeholder="Tournament Name"
            value={name || ""}
            onInput={(
              e: FormEvent & { target: EventTarget & { [key: string]: any } }
            ) => {
              setName(e.target.value);
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

export default TournamentName;
