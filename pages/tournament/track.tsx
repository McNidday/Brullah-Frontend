import { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import TrackTournamentMain from "../../modules/tournament/trackTournament/TrackTournamentMain";
import Footer from "../../components/Footer/Footer";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import TrackTournamentLoading from "../../modules/tournament/trackTournament/loading/TrackingTournamentLoading";
import Navigation from "../../components/Navigation/Navigation";
import Favicon from "../../components/Favicon/Favicon";

const TrackTournament: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Track Tournament | Brullah</title>
        <meta name="description" content="Track tournament progress" />
        <Favicon></Favicon>
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
