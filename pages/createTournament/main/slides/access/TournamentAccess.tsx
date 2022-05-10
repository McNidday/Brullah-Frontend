import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../components/Button/Button";
import { useEffect, ChangeEvent, useState } from "react";
import { useSwiper } from "swiper/react";
import { ApolloError } from "@apollo/client";

interface Props {
  accessType: string;
  setAccessType: Function;
  error: ApolloError | undefined;
  isActive: boolean;
}

const TournamentAccess = ({
  accessType,
  setAccessType,
  error,
  isActive,
}: Props) => {
  const swiper = useSwiper();
  const [nameError, setNameError] = useState<string | null>(null);

  const handleTickChange = (
    e: ChangeEvent & { target: Element & { [key: string]: any } }
  ) => {
    setAccessType(e.target.value);
  };

  useEffect(() => {
    if (error) {
      const errorArray = error.message.split(":");
      if (errorArray[0] === "blurhash") {
        setNameError(errorArray[1].trim());
      }
    }
  }, [error]);

  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h2>Is the tournament public or secret?</h2>
            {accessType === "PUBLIC" ? (
              <h3>
                Public tournaments will be viewed by others others on the
                tournament dashboard.
              </h3>
            ) : (
              <h3>
                Secret tournaments will not be viewed by others others on the
                tournament dashboard and only people with secret will be able to
                join.
              </h3>
            )}
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
              type="radio"
              value="PUBLIC"
              name="access"
              checked={accessType === "PUBLIC"}
              onChange={handleTickChange}
            ></input>
            <span></span>
          </label>
          <label className={cn(styles.checkbox)}>
            <input
              tabIndex={isActive ? 0 : -1}
              value="SECRET"
              type="radio"
              name="access"
              checked={accessType === "SECRET"}
              onChange={handleTickChange}
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

export default TournamentAccess;
