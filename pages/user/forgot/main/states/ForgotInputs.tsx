import cn from "classnames";
import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import { gql, useMutation } from "@apollo/client";
import Logo from "../../../../components/Logo/Logo";
import { useRouter } from "next/router";
import { setCookie } from "../../../../functions/Cookies";
import moment from "moment";
import Icon from "../../../../components/Icon/Icon";

const USER_LOGIN = gql`
  mutation UserLogin($input: LoginInput) {
    login(input: $input) {
      token
    }
  }
`;

const ForotInputs = () => {
  const router = useRouter();
  const [arenaName, setArenaName] = useState<string | undefined>(undefined);
  let [userLogin, { data, loading, error, reset }] = useMutation(USER_LOGIN, {
    errorPolicy: "all",
  });

  const login = () => {
    userLogin({
      variables: {
        input: {
          username: arenaName,
        },
      },
    });
  };

  useEffect(() => {
    if (error) setTimeout(reset, 5000);
    if (data?.login) {
      setCookie("token", data.login.token, moment.duration(15, "minutes"));
      router.replace("/dashboard");
    }
  }, [error, data]);

  if (error) {
    if (error.graphQLErrors.length <= 0) {
      return (
        <div className={cn(styles.error)}>
          <h2>{error.message}</h2>
        </div>
      );
    }
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.loading, loading ? styles.loaderActive : "")}>
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
                Please enter your email address or your brullah name to reset
                your password.
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
              value={arenaName || ""}
              onInput={(
                e: FormEvent & { target: EventTarget & { [key: string]: any } }
              ) => {
                setArenaName(e.target.value);
              }}
            ></input>
          </div>
          <div className={cn(styles.buttons)} data-swiper-parallax="-100">
            <Button
              text="Reset"
              disabled={loading || data?.login ? true : false}
              onClick={login}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForotInputs;
