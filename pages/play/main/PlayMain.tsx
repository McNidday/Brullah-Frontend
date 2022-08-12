import { gql, useQuery } from "@apollo/client";
import cn from "classnames";
import Image from "next/image";
import { useState } from "react";
import Button from "../../components/Button/Button";
import Cookies from "../../functions/Cookies";
import PlayError from "./error/PlayError";
import PlayLoading from "./loading/PlayLoading";
import styles from "./styles.module.scss";

const USER = gql`
  query GetUser {
    user {
      id
    }
  }
`;

const PlayMain = () => {
  const { loading, error, data } = useQuery(USER, {
    errorPolicy: "all",
  });
  if (loading) return <PlayLoading></PlayLoading>;
  if (error && (error?.networkError as any).statusCode !== 401) {
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <PlayError errorNum={1} error={error}></PlayError>;
        </div>
      </div>
    );
  }
  if (!data?.user)
    return (
      <div className={cn(styles.container)}>
        <div className={cn(styles.miniContainer)}>
          <PlayError errorNum={0} error={error!}></PlayError>
        </div>
      </div>
    );
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.miniContainer)}>
        <ul className={cn(styles.listParent)}>
          <li className={cn(styles.listItem)}>
            <div>
              <Image src={`/images/Checkers-Tai.jpg`} layout="fill"></Image>
            </div>
            <div>
              <h3>Checkers</h3>
            </div>
            <div>
              <p>Play one of the oldest and roots of board games</p>
            </div>
            <div>
              <Button
                text="play"
                disabled={false}
                link={`${process.env.CHECKERS_URL}/?id=${
                  data.user.id
                }&token=${Cookies("token")}`}
              ></Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlayMain;
