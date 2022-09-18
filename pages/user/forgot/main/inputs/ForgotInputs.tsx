import cn from "classnames";
import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import { gql, useMutation } from "@apollo/client";
import Logo from "../../../../components/Logo/Logo";

const RESET_PASSWORD = gql`
  mutation ResetPassword($username: String!) {
    resetPassword(username: $username) {
      id
      identity {
        email
        arena_name
      }
    }
  }
`;

const ForotInputs = () => {
  const [arenaName, setArenaName] = useState<string>("");
  let [userReset, { data, loading, error, reset }] = useMutation(
    RESET_PASSWORD,
    {
      errorPolicy: "all",
    }
  );

  const resetPassword = () => {
    userReset({
      variables: {
        username: arenaName,
      },
    });
  };

  useEffect(() => {
    let timeout: any;
    if (error) {
      timeout = setTimeout(reset, 5000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  if (data?.resetPassword)
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.success)}>
          <p>
            A reset password email has been sent to{" "}
            {data.resetPassword.identity.email}. It expires in 10 minuites so
            chop chop w(ﾟДﾟ)w
          </p>
        </div>
      </div>
    );
  return (
    <div className={cn(styles.container)}>
      {error && error.graphQLErrors.length <= 0 ? (
        <div className={cn(styles.error)}>
          <h2>{error.message}</h2>
        </div>
      ) : (
        <>
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
          <div className={cn(styles.miniContainer)}>
            <div className={cn(styles.cover)}>
              <div className={cn(styles.title)}>
                <label>
                  <h3>
                    Please enter your email address or your brullah name to
                    reset your password.
                  </h3>
                </label>
              </div>
              {error ? (
                <div className={cn(styles.errors)}>
                  {error.graphQLErrors.length > 0 ? (
                    <p>
                      {error.message.split(":")[1]
                        ? error.message.split(":")[1].trim()
                        : error.message.split(":")[0].trim()}
                    </p>
                  ) : (
                    <p>{error.message.trim()}</p>
                  )}
                </div>
              ) : (
                ""
              )}
              <div className={cn(styles.inputs)}>
                <input
                  type="text"
                  placeholder="Brullah Name"
                  value={arenaName}
                  onInput={(
                    e: FormEvent & {
                      target: EventTarget & { [key: string]: any };
                    }
                  ) => {
                    setArenaName(e.target.value);
                  }}
                ></input>
              </div>
              <div className={cn(styles.buttons)} data-swiper-parallax="-100">
                <Button
                  text="Reset"
                  disabled={loading || data?.login ? true : false}
                  onClick={resetPassword}
                ></Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ForotInputs;
