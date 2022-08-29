import { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../../components/Footer/Footer";
import ApolloClientOnly from "../../components/Apollo/ApolloClientOnly";
import TrackTournamentLoading from "./main/loading/TrackingTournamentLoading";
import RecapTournamentMain from "./main/RecapTournamentMain";
import Navigation from "../../components/Navigation/Navigation";

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
      <Navigation></Navigation>
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
