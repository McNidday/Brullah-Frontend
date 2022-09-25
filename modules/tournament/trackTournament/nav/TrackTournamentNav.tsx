import styles from "./styles.module.scss";
import cn from "classnames";
import { CircularProgress } from "@mui/material";
import { NetworkStatus } from "@apollo/client";
import Button from "../../../../components/Button/Button";
import { useEffect, useState } from "react";
import moment from "moment";
import Cookies from "../../../../functions/Cookies";

interface Props {
  setRecapNumber?: (num: number) => void;
  userId: string;
  id: string;
  reward: string;
  rewardAmount: string;
  perUser: string;
  waiting: number | null;
  ready: boolean;
  notIn: boolean;
  dq: boolean;
  networkStatus: number;
  recap?: boolean;
  recapNumber?: number | null;
  status: { progress: string };
  matchId: string;
  winner: {
    id: string;
    identity: {
      arena_name: string;
      avatar: { image: string; blurhash: string };
    };
  } | null;
}

const TrackTournamentNav = ({
  setRecapNumber,
  userId,
  winner,
  recapNumber,
  recap,
  id,
  perUser,
  rewardAmount,
  reward,
  networkStatus,
  ready,
  waiting,
  notIn,
  dq,
  status,
  matchId,
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
        {recap && recapNumber === 0 && status.progress !== "DONE" ? (
          <>
            <div className={cn(styles.actionButton)}>
              <Button
                text={"back"}
                disabled={false}
                onClick={() => setRecapNumber!(0)}
              ></Button>
            </div>
            <div className={cn(styles.actionButton)}>
              <Button
                text={"track"}
                link={`/tournament/track?id=${id}`}
                disabled={false}
              ></Button>
            </div>
          </>
        ) : recap && recapNumber !== 0 && status.progress === "DONE" ? (
          <div className={cn(styles.actionButton)}>
            <Button
              text={"back"}
              disabled={false}
              onClick={() => setRecapNumber!(0)}
            ></Button>
          </div>
        ) : recap && status.progress !== "DONE" ? (
          <div className={cn(styles.actionButton)}>
            <Button
              text={"track"}
              link={`/tournament/track?id=${id}`}
              disabled={false}
            ></Button>
          </div>
        ) : (
          ""
        )}
        {ready ? (
          <div className={cn(styles.actionButton)}>
            <Button
              text={buttonText}
              link={`${
                process.env.CHECKERS_URL
              }?matchId=${matchId}&id=${userId}&token=${Cookies("token")}`}
              disabled={false}
            ></Button>
          </div>
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
        ) : winner && winner.id === userId ? (
          <div className={cn(styles.countDown)}>
            <h4>Congrats 🎉 your brain does wonders</h4>
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

      <div className={cn(styles.statusContainer)}>
        {recapNumber ? (
          <div className={cn(styles.countDown)}>
            <h4>Battle number {recapNumber}</h4>
          </div>
        ) : (
          ""
        )}
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
    </div>
  );
};

export default TrackTournamentNav;
