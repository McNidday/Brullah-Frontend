import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../components/Button/Button";
import { FormEvent, useState } from "react";
import { useSwiper } from "swiper/react";
import { ApolloError } from "@apollo/client";

interface Props {
  setDescription: Function;
  description: string | undefined;
  error: ApolloError | undefined;
  isActive: boolean;
}

const TournamentDescription = ({
  setDescription,
  description,
  error,
  isActive,
}: Props) => {
  const swiper = useSwiper();
  const [nameError, setnameError] = useState<string | null>(null);
  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h2>
              Simple description of your tournament. As simple as "sponsored".
            </h2>
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
          <textarea
            tabIndex={isActive ? 0 : -1}
            placeholder="Tournament Description"
            value={description || ""}
            onInput={(
              e: FormEvent & { target: EventTarget & { [key: string]: any } }
            ) => {
              setDescription(e.target.value);
            }}
          ></textarea>
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

export default TournamentDescription;
