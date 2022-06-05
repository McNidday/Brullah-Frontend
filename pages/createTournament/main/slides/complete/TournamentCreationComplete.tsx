import cn from "classnames";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { useInterval } from "../../../../functions/hooks";
import styles from "./styles.module.scss";

const TournamentCreationComplete = ({ data }: { data: undefined | any }) => {
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
  }, [data]);

  useEffect(() => {
    if (countDown === 0) {
      setCountDown(undefined);
      Router.replace("/mytournaments");
    }
  }, [countDown]);

  return (
    <div className={cn(styles.container)}>
      {data && data.createTournament ? (
        <h2>
          Greate, tournament "{data.createTournament.information.name}" has been
          created, you will be directed to the tournament dashboard in $
          {countDown || 0}.
        </h2>
      ) : (
        <h2>You are a few steps away from making a brullah tournament.</h2>
      )}
    </div>
  );
};

export default TournamentCreationComplete;
