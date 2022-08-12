import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../../components/Button/Button";
import { useEffect, ChangeEvent, useState } from "react";
import { useSwiper } from "swiper/react";
import { ApolloError } from "@apollo/client";
import moment, { unix } from "moment";

interface Props {
  setDate: Function;
  date: { unix: number; date: string } | undefined;
  error: ApolloError | undefined;
  isActive: boolean;
}

const TournamentStartDate = ({ setDate, date, error, isActive }: Props) => {
  const swiper = useSwiper();
  const [nameError, setNameError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent & { target: Element & { [key: string]: any } }
  ) => {
    setDate({ unix: moment(e.target.value).unix(), date: e.target.value });
  };

  useEffect(() => {
    if (error) {
      const errorArray = error.message.split(":");
      if (errorArray[0] === "start_date") {
        setNameError(errorArray[1].trim());
        swiper.slideTo(5);
      }
    } else {
      setNameError(null);
    }
  }, [error]);

  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>When should the tournament start?</h3>
            <h4>
              If tournament is not started by the start date, It will be
              deleted.
            </h4>
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
          <label className={cn(styles.checkbox)}>
            <input
              tabIndex={isActive ? 0 : -1}
              value={date?.date || ""}
              type="datetime-local"
              onChange={handleChange}
            ></input>
            <span></span>
          </label>
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

export default TournamentStartDate;
