import { useQuery, gql } from "@apollo/client";
import cn from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import { useInterval } from "../../functions/hooks";
import CreateTournamentSlides from "./slides/CreateTournamentSlides";
import styles from "./styles.module.scss";

const USER = gql`
  query GetUser {
    user {
      security {
        account_verified
      }
    }
  }
`;

const CreateTournamentMain = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(USER);
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
    if (error) {
      setRedirect("/login");
      setCountDown(5);
      return;
    }
    if (data?.user && !data?.user?.security?.account_verified) {
      setRedirect("/dashboard");
      setCountDown(5);
      return;
    }
  }, [error, data]);

  if (error) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <div className={cn(styles.loading, styles.loaderActive)}>
            <h3>
              You cannot create a tournament unless you are logged in. You will
              be directed to the login page in ${countDown || 0}
            </h3>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <div
            className={cn(styles.loading, loading ? styles.loaderActive : "")}
          >
            <Logo
              thinking={true}
              text={true}
              image={{ width: "100px", height: "100px" }}
              container={{ width: "210px", height: "80px" }}
            ></Logo>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.user?.security?.account_verified) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <div className={cn(styles.loading, styles.loaderActive)}>
            <h3>
              You cannot create a tournament unless you have a verified account.
              You will be directed to the dashboard in ${countDown}
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <CreateTournamentSlides></CreateTournamentSlides>
      </div>
    </div>
  );
};

export default CreateTournamentMain;
