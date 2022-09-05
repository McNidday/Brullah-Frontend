import { ApolloError } from "@apollo/client";
import { useEffect, useState } from "react";
import { useInterval } from "../../../functions/hooks";
import styles from "./styles.module.scss";
import cn from "classnames";
import { useRouter } from "next/router";

interface Props {
  errorNum: number;
  error: ApolloError;
}

const AffiliateMainError = ({ errorNum, error }: Props) => {
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
  }, [countDown]);

  useEffect(() => {
    if (!redirect && errorNum === 0) {
      setRedirect("/user/login");
      setCountDown(5);
    }
  }, [redirect]);

  if (errorNum === 0)
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <div className={cn(styles.error)}>
            <h3>
              You cannot view affiliates / enlisted while not logged in, you
              will be directed to login in ${countDown || 0}
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
            again. "{error.message}"
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AffiliateMainError;
