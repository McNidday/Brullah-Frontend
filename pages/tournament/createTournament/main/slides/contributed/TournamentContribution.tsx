import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../../../components/Button/Button";
import { ChangeEvent } from "react";
import { useSwiper } from "swiper/react";

interface Props {
  setIsSponsored: Function;
  setContribution: Function;
  setIsContributed: Function;
  isContributed: boolean;
  contribution: number | undefined;
  isActive: boolean;
}

const TournamentContribution = ({
  setIsSponsored,
  setContribution,
  isContributed,
  setIsContributed,
  contribution,
  isActive,
}: Props) => {
  const swiper = useSwiper();

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

  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>
              Will the players contribute to the tournament prize? tick for yes.
            </h3>
            {isContributed ? (
              <h4>If yes, how much BRC would you like them to contribute.</h4>
            ) : (
              ""
            )}
          </label>
        </div>
        <div className={cn(styles.inputs)} data-swiper-parallax="-500">
          <label className={cn("swiper-no-swiping", styles.checkbox)}>
            <input
              className={cn("swiper-no-swiping")}
              tabIndex={isActive ? 0 : -1}
              type="checkbox"
              checked={isContributed}
              onChange={handleTickChange}
            ></input>
            <span></span>
          </label>
          <div
            className={cn(
              "swiper-no-swiping",
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
                value="100"
                required
                checked={`${contribution}` === "100"}
                onChange={handleBrcChange}
              ></input>
              <label htmlFor="1" data-brc="1 BRC"></label>
              <input
                tabIndex={isActive ? 0 : -1}
                type="radio"
                name="brc"
                id="2"
                value="200"
                required
                checked={`${contribution}` === "200"}
                onChange={handleBrcChange}
              ></input>
              <label htmlFor="2" data-brc="2 BRC"></label>
              <input
                tabIndex={isActive ? 0 : -1}
                type="radio"
                name="brc"
                id="3"
                value="300"
                required
                checked={`${contribution}` === "300"}
                onChange={handleBrcChange}
              ></input>
              <label htmlFor="3" data-brc="3 BRC"></label>
              <input
                tabIndex={isActive ? 0 : -1}
                type="radio"
                name="brc"
                id="4"
                value="400"
                required
                checked={`${contribution}` === "400"}
                onChange={handleBrcChange}
              ></input>
              <label htmlFor="4" data-brc="4 BRC"></label>
              <input
                tabIndex={isActive ? 0 : -1}
                type="radio"
                name="brc"
                id="5"
                value="500"
                required
                checked={`${contribution}` === "500"}
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
