import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../components/Button/Button";
import { useEffect, ChangeEvent, useState } from "react";
import { useSwiper } from "swiper/react";
import { ApolloError } from "@apollo/client";

interface Props {
  setIsSponsored: Function;
  setContribution: Function;
  setIsContributed: Function;
  isContributed: boolean;
  contribution: number | undefined;
  error: ApolloError | undefined;
  isActive: boolean;
}

const TournamentContribution = ({
  setIsSponsored,
  setContribution,
  isContributed,
  setIsContributed,
  contribution,
  error,
  isActive,
}: Props) => {
  const swiper = useSwiper();
  const [nameError, setNameError] = useState<string | null>(null);

  const handleBrcChange = (
    e: ChangeEvent & { target: Element & { [key: string]: any } }
  ) => {
    if (e.target.checked) {
      setContribution(parseInt(e.target.value));
    }
  };

  const handleTickChange = (
    e: ChangeEvent & { target: Element & { [key: string]: any } }
  ) => {
    if (e.target.checked) {
      setIsSponsored(false);
    }
    setIsContributed(e.target.checked);
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
            <h2>
              Will the players contribute to the tournament prize? tick for yes.
            </h2>
            {isContributed ? (
              <h3>If yes, how much BRC would you like them to contribute.</h3>
            ) : (
              ""
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
              type="checkbox"
              checked={isContributed}
              onChange={handleTickChange}
            ></input>
            <span></span>
          </label>
          <div
            className={cn(
              styles.brcSliderContainer,
              isContributed ? "" : "disabled"
            )}
          >
            <div className={cn("brc-slider")}>
              <input
                tabIndex={isActive ? 0 : -1}
                type="radio"
                name="brc"
                id="1"
                value="1"
                required
                checked={`${contribution}` === "1"}
                onChange={handleBrcChange}
              ></input>
              <label htmlFor="1" data-brc="1 BRC"></label>
              <input
                tabIndex={isActive ? 0 : -1}
                type="radio"
                name="brc"
                id="2"
                value="2"
                required
                checked={`${contribution}` === "2"}
                onChange={handleBrcChange}
              ></input>
              <label htmlFor="2" data-brc="2 BRC"></label>
              <input
                tabIndex={isActive ? 0 : -1}
                type="radio"
                name="brc"
                id="3"
                value="3"
                required
                checked={`${contribution}` === "3"}
                onChange={handleBrcChange}
              ></input>
              <label htmlFor="3" data-brc="3 BRC"></label>
              <input
                tabIndex={isActive ? 0 : -1}
                type="radio"
                name="brc"
                id="4"
                value="4"
                required
                checked={`${contribution}` === "4"}
                onChange={handleBrcChange}
              ></input>
              <label htmlFor="4" data-brc="4 BRC"></label>
              <input
                tabIndex={isActive ? 0 : -1}
                type="radio"
                name="brc"
                id="5"
                value="5"
                required
                checked={`${contribution}` === "5"}
                onChange={handleBrcChange}
              ></input>
              <label htmlFor="5" data-brc="5 BRC"></label>
              <div className="brc-pos"></div>
            </div>
          </div>
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

export default TournamentContribution;
