import "../styles/globals.scss";
import "../node_modules/normalize.css/normalize.css";
import client from "../Apollo/Client";
import type { AppProps } from "next/app";
import { ApolloProvider, gql } from "@apollo/client";
import { useEffect } from "react";
import Cookies, { setCookie } from "../functions/Cookies";
import moment from "moment";
import { createTheme, ThemeProvider } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      background: string;
      backgroundLight: string;
      textColor: string;
      iconColor: string;
      activeColor: string;
      inactiveColor: string;
      moneyColor: string;
      borderRadius: string;
    };
  }
  interface ThemeOptions {
    colors?: {
      background?: string;
      backgroundLight?: string;
      textColor?: string;
      iconColor?: string;
      activeColor?: string;
      inactiveColor?: string;
      moneyColor?: string;
      borderRadius?: string;
    };
  }
}

declare module "@emotion/react" {
  interface Theme {
    colors: {
      background: string;
      backgroundLight: string;
      textColor: string;
      iconColor: string;
      activeColor: string;
      inactiveColor: string;
      moneyColor: string;
      borderRadius: string;
    };
  }
  interface ThemeOptions {
    colors?: {
      background?: string;
      backgroundLight?: string;
      textColor?: string;
      iconColor?: string;
      activeColor?: string;
      inactiveColor?: string;
      moneyColor?: string;
      borderRadius?: string;
    };
  }
}

const theme = createTheme({
  colors: {
    background: `#1a1a1d`,
    backgroundLight: `#4e4e50`,
    textColor: `#707070`,
    iconColor: `#950740`,
    activeColor: `#c3073f`,
    inactiveColor: `#6f2232`,
    moneyColor: `#118c4f`,
    borderRadius: `10px`,
  },
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
