import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../components/Footer/Footer";
import PlayMain from "./main/PlayMain";
import ApolloClientOnly from "../components/Apollo/ApolloClientOnly";
import PlayLoading from "./main/loading/PlayLoading";
import Navigation from "../components/Navigation/Navigation";

const Play: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Play Games | Brullah</title>
        <meta
          name="Brullah games"
          content="Play games by brullah for money, for fun, for skill, for all"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation></Navigation>
      <ApolloClientOnly fallback={<PlayLoading></PlayLoading>}>
        <PlayMain></PlayMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Play;
