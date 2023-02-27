import cn from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { useInterval } from "../../../../../functions/hooks";
import styles from "./styles.module.scss";

const TournamentCreationComplete = ({ data }: { data: undefined | any }) => {
  const router = useRouter();
  const swiper = useSwiper();
  const [countDown, setCountDown] = useState<number | undefined>();

  useInterval(
    () => {
      if (!countDown) return;
      setCountDown(countDown! - 1);
    },
    countDown ? 1000 : undefined
  );

  useEffect(() => {
    if (data && data.createTournament) {
      swiper.slideTo(7);
      swiper.disable();
      setCountDown(5);
    }
  }, [data, swiper]);

  useEffect(() => {
    if (countDown === 0) {
      setCountDown(undefined);
      router.replace("/tournament/mytournaments");
    }
  }, [countDown, router]);

  return (
    <div className={cn(styles.container)}>
      {data && data.createTournament ? (
        <h3>
          Greate, tournament &quot;{data.createTournament.information.name}
          &quot; has been created, you will be directed to the tournament
          dashboard in ${countDown || 0}.
        </h3>
      ) : (
        <h3>You are a few steps away from making a brullah tournament.</h3>
      )}
    </div>
  );
};

export default TournamentCreationComplete;
