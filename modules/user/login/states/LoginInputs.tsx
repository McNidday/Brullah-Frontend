import cn from "classnames";
import styles from "./styles.module.scss";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import { gql, useMutation } from "@apollo/client";
import Logo from "../../../../components/Logo/Logo";
import { useRouter } from "next/router";
import { setCookie } from "../../../../functions/Cookies";
import { Duration } from "luxon";
import Icon from "../../../../components/Icon/Icon";

const USER_LOGIN = gql`
  mutation UserLogin($input: LoginInput) {
    login(input: $input) {
      token
    }
  }
`;

const LoginInputs = () => {
  const router = useRouter();
  const [arenaName, setArenaName] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconHover, setEyeIconHover] = useState(false);
  let [userLogin, { data, loading, error, reset }] = useMutation(USER_LOGIN, {
    errorPolicy: "all",
  });

  const login = () => {
    userLogin({
      variables: {
        input: {
          username: arenaName,
          password: password,
        },
      },
    });
  };

  useEffect(() => {
    if (error) setTimeout(reset, 5000);
    if (data?.login) {
      setCookie(
        "token",
        data.login.token,
        Duration.fromObject({ minutes: 15 })
      );
      router.replace("/dashboard");
    }
  }, [error, data, router, reset]);

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
              <h3>Welcome back. Login to your brullah account.</h3>
            </label>
          </div>
          {error ? (
            <div className={cn(styles.errors)}>
              <p>{error.message.trim()}</p>
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
            <div
              className={cn(styles.inputContainer)}
              onMouseEnter={() => setEyeIconHover(true)}
              onMouseLeave={() => setEyeIconHover(false)}
            >
              <input
                type={`${showPassword ? `text` : `password`}`}
                placeholder="Password"
                value={password || ""}
                onInput={(
                  e: FormEvent & {
                    target: EventTarget & { [key: string]: any };
                  }
                ) => {
                  setPassword(e.target.value);
                }}
              ></input>
              <div
                className={cn(styles.eyeIcons)}
                onClick={() => setShowPassword(showPassword ? false : true)}
              >
                {showPassword ? (
                  <div className={cn(styles.eyeIcon)}>
                    <Icon
                      activeLink="/icons/eye_visible/active.svg"
                      inactiveLink="/icons/eye_visible/inactive.svg"
                      hover={eyeIconHover}
                      alt={"Hide Password Icon"}
                    ></Icon>
                  </div>
                ) : (
                  <div className={cn(styles.eyeIcon)}>
                    <Icon
                      activeLink="/icons/eye_slash/active.svg"
                      inactiveLink="/icons/eye_slash/inactive.svg"
                      hover={eyeIconHover}
                      alt={"Sow Password Icon"}
                    ></Icon>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={cn(styles.buttons)} data-swiper-parallax="-100">
            <Button
              text="Login"
              disabled={loading || data?.login ? true : false}
              onClick={login}
            ></Button>
            <Button
              link="/user/forgot"
              text="Forgot Password"
              disabled={loading || data?.login ? true : false}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInputs;
