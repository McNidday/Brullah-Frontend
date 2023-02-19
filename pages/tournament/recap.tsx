import { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../../components/Footer/Footer";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import TrackTournamentLoading from "../../modules/tournament/trackTournament/loading/TrackingTournamentLoading";
import RecapTournamentMain from "../../modules/tournament/trackTournament/RecapTournamentMain";
import Navigation from "../../components/Navigation/Navigation";

const TrackTournament: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Recap Tournament | Brullah</title>
        <meta name="description" content="Recap tournament progress" />
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
