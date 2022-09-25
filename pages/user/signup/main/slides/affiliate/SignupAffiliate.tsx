import cn from "classnames";

import styles from "./styles.module.scss";
import Button from "../../../../../../components/Button/Button";
import { useSwiper } from "swiper/react";
import { FormEvent, useEffect, useState } from "react";
import { ApolloError } from "@apollo/client";
import Cookies from "../../../../../../functions/Cookies";

interface Props {
  updateProfile: Function;
  affiliate: string;
  error: ApolloError | undefined;
  isActive: boolean;
}

const SignupAffiliate = ({
  updateProfile,
  affiliate,
  error,
  isActive,
}: Props) => {
  const swiper = useSwiper();
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const errorArray = error.message.split(":");
      if (errorArray[0] === "affiliate" && !Cookies("affiliate")) {
        setEmailError(errorArray[1].trim());
        swiper.slideTo(4);
      }
    } else {
      setEmailError(null);
    }
  }, [error, swiper]);

  return (
    <>
      <div>
        <div className={cn(styles.title)} data-swiper-parallax="-1000">
          <label>
            <h3>Do you have a promo code / refferal 🤔</h3>
          </label>
        </div>
        {emailError ? (
          <div className={cn(styles.errors)} data-swiper-parallax="-750">
            <p>{emailError}</p>
          </div>
        ) : (
          ""
        )}
        <div className={cn(styles.inputs)} data-swiper-parallax="-500">
          <input
            className={cn("swiper-no-swiping")}
            tabIndex={isActive ? 0 : -1}
            type="text"
            placeholder="Promo"
            value={affiliate || ""}
            onInput={(
              e: FormEvent & { target: EventTarget & { [key: string]: any } }
            ) => {
              updateProfile("affiliate", e.target.value);
            }}
          ></input>
        </div>
        <div className={cn(styles.buttons)} data-swiper-parallax="-250">
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

export default SignupAffiliate;
