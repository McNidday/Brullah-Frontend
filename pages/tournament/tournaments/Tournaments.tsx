import type { NextPage } from "next";
import Head from "next/head";
import SideNavigation from "../../components/SideNavigation/SideNavigation";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import cn from "classnames";
import Footer from "../../components/Footer/Footer";
import TournamentsMain from "./main/TournamentsMain";
import ApolloClientOnly from "../../components/Apollo/ApolloClientOnly";
import TournamentsLoading from "./main/loading/TournamentsLoading";

const Tournaments: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Tournaments | Brullah</title>
        <meta
          name="Brullah Tournaments"
          content="Brullah tournaments would fripple your earnings. Make your mullah brain more happy."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavigation></TopNavigation>
      <SideNavigation></SideNavigation>
      <ApolloClientOnly fallback={<TournamentsLoading></TournamentsLoading>}>
        <TournamentsMain></TournamentsMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Tournaments;
