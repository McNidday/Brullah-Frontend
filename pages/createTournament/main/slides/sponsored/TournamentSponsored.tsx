import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../components/Button/Button";
import { useEffect, FormEvent, ChangeEvent, useState } from "react";
import { useSwiper } from "swiper/react";
import { ApolloError } from "@apollo/client";

interface Props {
  setSponsorAmount: Function;
  setIsSponsored: Function;
  setIsContributed: Function;
  isSponsored: boolean;
  sponsorAmount: number | undefined;
  error: ApolloError | undefined;
  isActive: boolean;
}

const TournamentSponsored = ({
  setSponsorAmount,
  isSponsored,
  setIsSponsored,
  sponsorAmount,
  setIsContributed,
  error,
  isActive,
}: Props) => {
  const swiper = useSwiper();
  const [nameError, setNameError] = useState<string | null>(null);

  const handleBrcChange = (
    e: FormEvent & { target: EventTarget & { [key: string]: any } }
  ) => {
    setSponsorAmount(parseInt(e.target.value));
  };

  const handleTickChange = (
    e: ChangeEvent & { target: Element & { [key: string]: any } }
  ) => {
    if (e.target.checked) {
      setIsContributed(false);
    }
    setIsSponsored(e.target.checked);
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
            <h2>Will you sponsor this tournament? tick for yes.</h2>
            {isSponsored ? <h3>If yes, for how much?</h3> : ""}
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
              onChange={handleTickChange}
            ></input>
            <span></span>
          </label>
          <div className={cn(styles.brcInput, isSponsored ? "" : "disabled")}>
            <input
              tabIndex={isActive ? 0 : -1}
              type="number"
              placeholder="BRC AMOUNT"
              value={sponsorAmount}
              onInput={handleBrcChange}
            />
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

export default TournamentSponsored;
