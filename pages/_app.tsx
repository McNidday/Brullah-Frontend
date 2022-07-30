import "../styles/globals.scss";
import "../node_modules/normalize.css/normalize.css";
import client from "./components/Apollo/Client";
import type { AppProps } from "next/app";
import { ApolloProvider, gql } from "@apollo/client";
import { useEffect } from "react";
import Cookies, { setCookie } from "./functions/Cookies";
import moment from "moment";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const USER = gql`
      query GetUser {
        user {
          token
        }
      }
    `;
    // Excecute initial
    if (Cookies("token")) {
      client
        .query({
          query: USER,
        })
        .then((result) => {
          setCookie(
            "token",
            result.data.user.token,
            moment.duration(15, "minutes")
          );
        });
    }
    // Authenticate every 10 minutes
    const interval = setInterval(async () => {
      const USER = gql`
        query GetUser {
          user {
            token
          }
        }
      `;
      if (Cookies("token")) {
        const result = await client.query({
          query: USER,
        });
        setCookie(
          "token",
          result.data.user.token,
          moment.duration(15, "minutes")
        );
      }
    }, moment.duration(10, "minutes").asMilliseconds());
    return () => clearInterval(interval);
  }, []);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
