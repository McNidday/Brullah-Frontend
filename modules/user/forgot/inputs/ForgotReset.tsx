import cn from "classnames";

import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Icon from "../../../../components/Icon/Icon";
import Button from "../../../../components/Button/Button";
import Logo from "../../../../components/Logo/Logo";

interface Props {
  token: string;
}

const UPDATE_PASSWORD = gql`
  mutation VerifyPasswordReset($token: String!, $newPassword: String!) {
    verifyPasswordReset(token: $token, newPassword: $newPassword) {
      id
      identity {
        email
        brullah_name
      }
    }
  }
`;

const ForgotReset = ({ token }: Props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconHover, setEyeIconHover] = useState(false);

  let [verifyPasswordReset, { data, loading, error, reset }] = useMutation(
    UPDATE_PASSWORD,
    {
      errorPolicy: "all",
    }
  );

  const updatePassword = () => {
    verifyPasswordReset({
      variables: {
        token: token,
        newPassword: password,
      },
    });
  };

  useEffect(() => {
    if (password === confirmPassword && error) {
      setLocalError(null);
    }

    if (password === confirmPassword) {
      setButtonDisabled(false);
    }

    if (password !== confirmPassword) {
      setButtonDisabled(true);
    }
  }, [confirmPassword, password, error]);

  useEffect(() => {
    let timeout: any;
    if (error) {
      timeout = setTimeout(reset, 5000);
    }
    return () => clearTimeout(timeout);
  }, [error, reset]);

  if (data?.verifyPasswordReset)
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.success)}>
          <p>
            Your password has been reset{" "}
            {data.verifyPasswordReset.identity.brullah_name}. Head on to login to
            continue using brullah services.
          </p>
        </div>
      </div>
    );

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
              <h3>Create your new password.</h3>
            </label>
          </div>
          {localError ? (
            <div className={cn(styles.errors)}>
              <p>{localError}</p>
            </div>
          ) : (
            ""
          )}
          {error ? (
            <div className={cn(styles.errors)}>
              <p>
                {error.message.split(":")[1]
                  ? error.message.split(":")[1].trim()
                  : error.message.split(":")[0].trim()}
              </p>
            </div>
          ) : (
            ""
          )}
          <div className={cn(styles.inputs)}>
            <input
              type={`${showPassword ? `text` : `password`}`}
              placeholder="Password"
              value={password}
              onInput={(
                e: FormEvent & { target: EventTarget & { [key: string]: any } }
              ) => {
                setPassword(e.target.value!);
              }}
            ></input>
            <input
              type={`${showPassword ? `text` : `password`}`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onBlur={() => {
                if (password !== confirmPassword) {
                  setLocalError("Password and confirmation do not match.");
                } else {
                  setLocalError(null);
                }
              }}
              onInput={(
                e: FormEvent & { target: EventTarget & { [key: string]: any } }
              ) => {
                setConfirmPassword(e.target.value!);
              }}
            ></input>
            <div
              className={cn(styles.eyeIcons)}
              onMouseEnter={() => setEyeIconHover(true)}
              onMouseLeave={() => setEyeIconHover(false)}
              onClick={() => setShowPassword(showPassword ? false : true)}
            >
              {showPassword ? (
                <div className={cn(styles.eyeIcon)}>
                  <Icon
                    activeLink="/icons/eye_visible/active.svg"
                    inactiveLink="/icons/eye_visible/inactive.svg"
                    hover={eyeIconHover}
                    alt="Hide Password Icon"
                  ></Icon>
                </div>
              ) : (
                <div className={cn(styles.eyeIcon)}>
                  <Icon
                    activeLink="/icons/eye_slash/active.svg"
                    inactiveLink="/icons/eye_slash/inactive.svg"
                    hover={eyeIconHover}
                    alt="Show Password Icon"
                  ></Icon>
                </div>
              )}
            </div>
          </div>
          <div className={cn(styles.buttons)}>
            <Button
              text="Update Password"
              disabled={buttonDisabled}
              onClick={updatePassword}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotReset;
