import type { NextPage } from "next";
import Head from "next/head";
import SideNavigation from "../components/SideNavigation/SideNavigation";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import cn from "classnames";
import Footer from "../components/Footer/Footer";
import PlayMain from "./main/PlayMain";
import ApolloClientOnly from "../components/Apollo/ApolloClientOnly";
import PlayLoading from "./main/loading/PlayLoading";

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
      <TopNavigation></TopNavigation>
      <SideNavigation></SideNavigation>
      <ApolloClientOnly fallback={<PlayLoading></PlayLoading>}>
        <PlayMain></PlayMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Play;
