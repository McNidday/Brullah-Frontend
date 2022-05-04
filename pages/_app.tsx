import "../styles/globals.scss";
import "../node_modules/normalize.css/normalize.css";
import client from "./components/Apollo/Client";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
