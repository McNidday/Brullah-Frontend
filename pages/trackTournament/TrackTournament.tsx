import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import cn from "classnames";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import SideNavigation from "../components/SideNavigation/SideNavigation";
import TrackTournamentMain from "./main/TrackTournamentMain";
import Footer from "../components/Footer/Footer";
import ApolloClientOnly from "../components/Apollo/ApolloClientOnly";
import TrackTournamentLoading from "./main/loading/TrackingTournamentLoading";

const TrackTournament: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Track Tournament | Brullah</title>
        <meta
          name="Track Tournament Brullah"
          content="Track tournament progress"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavigation></TopNavigation>
      <SideNavigation></SideNavigation>
      <ApolloClientOnly
        fallback={<TrackTournamentLoading></TrackTournamentLoading>}
      >
        <TrackTournamentMain></TrackTournamentMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default TrackTournament;
