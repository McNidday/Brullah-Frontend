import styles from "./styles.module.scss";
import cn from "classnames";
import { CircularProgress } from "@mui/material";
import { NetworkStatus } from "@apollo/client";
import Button from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import moment from "moment";

interface Props {
  reward: string;
  rewardAmount: string;
  perUser: string;
  waiting: number | null;
  ready: boolean;
  notIn: boolean;
  dq: boolean;
  networkStatus: number;
}

const TrackTournamentNav = ({
  perUser,
  rewardAmount,
  reward,
  networkStatus,
  ready,
  waiting,
  notIn,
  dq,
}: Props) => {
  const [countDown, setCountDown] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState("Get the bag 💰");

  useEffect(() => {
    if (reward === "NONE") {
      setButtonText("Get em 🤪");
    }
  }, [reward]);

  useEffect(() => {
    if (!waiting) return;
    const interval = setInterval(() => {
      if (moment().isSameOrAfter(moment.unix(waiting))) {
        setCountDown(">>>");
        clearInterval(interval);
      } else {
        setCountDown(moment().to(moment.unix(waiting)));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [waiting]);

  return (
    <div className={cn(styles.navigation)}>
      <div className={cn(styles.navigationButtons)}>
        {ready ? (
          <Button text={buttonText} link="/" disabled={false}></Button>
        ) : countDown ? (
          <div className={cn(styles.countDown)}>
            <h4>{countDown}</h4>
          </div>
        ) : notIn ? (
          <div className={cn(styles.countDown)}>
            <h4>You are not in current battle</h4>
          </div>
        ) : dq ? (
          <div className={cn(styles.countDown)}>
            <h4>You have been obliterated</h4>
          </div>
        ) : (
          ""
        )}
        {reward === "SPONSOR" ? (
          <div className={cn(styles.countDown)}>
            <h4>*Sponsored* Winner gets {rewardAmount}</h4>
          </div>
        ) : reward === "CONTRIBUTION" ? (
          <div className={cn(styles.countDown)}>
            <h4>
              *Contributed* Per user: {perUser} Winner gets {rewardAmount}
            </h4>
          </div>
        ) : (
          <div className={cn(styles.countDown)}>
            <h4>No 💰 for this tournament (。_。)</h4>
          </div>
        )}
      </div>
      {networkStatus === NetworkStatus.refetch ? (
        <div className={cn(styles.statesLoading)}>
          <span>Progress</span>
          <CircularProgress
            className={styles.statesLoadingProgress}
          ></CircularProgress>
        </div>
      ) : (
        <div className={cn(styles.cool)}>
          <h3>(✿◡‿◡)</h3>
        </div>
      )}
    </div>
  );
};

export default TrackTournamentNav;
