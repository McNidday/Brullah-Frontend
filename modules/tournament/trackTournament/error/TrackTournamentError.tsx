import styles from "./styles.module.scss";
import cn from "classnames";
import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import { useInterval } from "../../../../functions/hooks";
import { useEffect, useState } from "react";

interface Props {
  errorNum?: number;
  error?: ApolloError;
  message?: string;
}

const TrackTournamentError = ({ errorNum, error, message }: Props) => {
  const router = useRouter();
  const [countDown, setCountDown] = useState<number | undefined>();
  const [redirect, setRedirect] = useState<string>();

  useInterval(
    () => {
      if (!countDown) return;
      setCountDown(countDown! - 1);
    },
    countDown ? 1000 : undefined
  );

  useEffect(() => {
    if (countDown === 0) {
      setCountDown(undefined);
      router.push(redirect!);
    }
  }, [countDown, router, redirect]);

  useEffect(() => {
    if (!redirect && errorNum === 401) {
      setRedirect("/user/login");
      setCountDown(5);
    }
  }, [redirect, errorNum]);

  if (message) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <div className={cn(styles.error)}>
            <h3>{message}</h3>
          </div>
        </div>
      </div>
    );
  }

  if (errorNum === 401)
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <div className={cn(styles.error)}>
            <h3>
              You cannot track tournaments while not logged in, you will be
              directed to login in ${countDown || 0}
            </h3>
          </div>
        </div>
      </div>
    );
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <div className={cn(styles.error)}>
          <h3>
            An error occured. Please check your internet connection and try
            again. &quot;{error?.message}&quot;
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TrackTournamentError;
