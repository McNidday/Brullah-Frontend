import cn from "classnames";
import { useEffect } from "react";
import { useSwiper } from "swiper/react";
import Cookies from "../../../../../functions/Cookies";
import styles from "./styles.module.scss";

const SignUpComplete = ({ data }: { data: undefined | any }) => {
  const swiper = useSwiper();
  useEffect(() => {
    if (data && data.signup) {
      swiper.slideTo(Cookies("affiliate") ? 5 : 6);
      swiper.disable();
    }
  }, [data]);
  return (
    <div className={cn(styles.container)}>
      {data && data.signup ? (
        <h3>
          Greate {data.signup.identity.arena_name}, you just became a brullah.
          One more step to give you full access to brullah services. A
          verification link has been sent to your email, click on it and you
          will be golden.
        </h3>
      ) : (
        <h3>
          You are a few steps away from making mullah with your brain. Finish
          the signup process.
        </h3>
      )}
    </div>
  );
};

export default SignUpComplete;
