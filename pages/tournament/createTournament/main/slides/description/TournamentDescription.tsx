import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../../../components/Button/Button";
import { FormEvent, useState, useEffect } from "react";
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
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  useEffect(() => {
    if (error) {
      const errorArray = error.message.split(":");
      if (errorArray[0] === "information.description") {
        setDescriptionError(errorArray[1].trim());
        swiper.slideTo(1);
      }
    } else {
      setDescriptionError(null);
    }
  }, [error, swiper]);
  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>
              Simple description of your tournament. As simple as
              &quot;sponsored&quot;.
            </h3>
          </label>
        </div>
        {descriptionError ? (
          <div className={cn(styles.errors)} data-swiper-parallax="-750">
            <p>{descriptionError}</p>
          </div>
        ) : (
          ""
        )}
        <div className={cn(styles.inputs)} data-swiper-parallax="-500">
          <textarea
            className={cn("swiper-no-swiping")}
            maxLength={60}
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
