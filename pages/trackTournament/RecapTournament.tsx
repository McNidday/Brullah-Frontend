import { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import SideNavigation from "../components/SideNavigation/SideNavigation";
import Footer from "../components/Footer/Footer";
import ApolloClientOnly from "../components/Apollo/ApolloClientOnly";
import TrackTournamentLoading from "./main/loading/TrackingTournamentLoading";
import RecapTournamentMain from "./main/RecapTournamentMain";

const TrackTournament: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Recap Tournament | Brullah</title>
        <meta
          name="Recap Tournament Brullah"
          content="Recap tournament progress"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavigation></TopNavigation>
      <SideNavigation></SideNavigation>
      <ApolloClientOnly
        fallback={<TrackTournamentLoading></TrackTournamentLoading>}
      >
        <RecapTournamentMain></RecapTournamentMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default TrackTournament;
