import { ApolloError } from "@apollo/client";
import { useEffect, useState } from "react";
import { useInterval } from "../../../../functions/hooks";
import styles from "./styles.module.scss";
import cn from "classnames";
import { useRouter } from "next/router";

interface Props {
  brullah_name?: string;
  errorNum: number;
  error: ApolloError;
}

const LoginError = ({ brullah_name, errorNum, error }: Props) => {
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
    if (!redirect && errorNum === 0) {
      setRedirect("/dashboard");
      setCountDown(5);
    }
  }, [redirect, errorNum]);

  if (errorNum === 0)
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.loadingMiniContainer)}>
          <div className={cn(styles.loading, styles.loaderActive)}>
            <h3>
              You are already logged in {brullah_name}, you will be directed to
              the dashboard in ${countDown || 0}
            </h3>
          </div>
        </div>
      </div>
    );

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.loadingMiniContainer)}>
        <div className={cn(styles.loading, styles.loaderActive)}>
          <h3>
            An error occured. Please check your internet connection and try
            again. &quot;{error.message}&quot;
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LoginError;
