import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../../components/Button/Button";
import { ChangeEvent } from "react";
import { useSwiper } from "swiper/react";

interface Props {
  accessType: string;
  setAccessType: Function;
  isActive: boolean;
}

const TournamentAccess = ({ accessType, setAccessType, isActive }: Props) => {
  const swiper = useSwiper();
  const handleTickChange = (
    e: ChangeEvent & { target: Element & { [key: string]: any } }
  ) => {
    setAccessType(e.target.value);
  };

  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>Is the tournament public or secret?</h3>
            {accessType === "PUBLIC" ? (
              <h4>
                Public tournaments will be viewed by others others on the
                tournament dashboard.
              </h4>
            ) : (
              <h4>
                Secret tournaments will not be viewed by others others on the
                tournament dashboard and only people with secret will be able to
                join.
              </h4>
            )}
          </label>
        </div>
        <div className={cn(styles.inputs)} data-swiper-parallax="-500">
          <label className={cn("swiper-no-swiping", styles.checkbox)}>
            <input
              className={cn("swiper-no-swiping")}
              tabIndex={isActive ? 0 : -1}
              type="radio"
              value="PUBLIC"
              name="access"
              checked={accessType === "PUBLIC"}
              onChange={handleTickChange}
            ></input>
            <span></span>
          </label>
          <label className={cn("swiper-no-swiping", styles.checkbox)}>
            <input
              className={cn("swiper-no-swiping")}
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
