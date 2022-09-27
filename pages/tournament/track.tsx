import { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import TrackTournamentMain from "../../modules/tournament/trackTournament/TrackTournamentMain";
import Footer from "../../components/Footer/Footer";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import TrackTournamentLoading from "../../modules/tournament/trackTournament/loading/TrackingTournamentLoading";
import Navigation from "../../components/Navigation/Navigation";

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
      <Navigation></Navigation>
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
