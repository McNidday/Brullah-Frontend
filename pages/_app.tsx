import "../styles/globals.scss";
import "../node_modules/normalize.css/normalize.css";
import client from "../Apollo/Client";
import type { AppProps } from "next/app";
import { ApolloProvider, gql } from "@apollo/client";
import { useEffect } from "react";
import Cookies, { setCookie } from "../functions/Cookies";
import moment from "moment";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Original Surfer",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const USER = gql`
      query GetUser {
        user {
          id
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
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
