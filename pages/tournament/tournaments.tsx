import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../../components/Footer/Footer";
import TournamentsMain from "../../modules/tournament/tournaments/TournamentsMain";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import TournamentsLoading from "../../modules/tournament/tournaments/loading/TournamentsLoading";
import Navigation from "../../components/Navigation/Navigation";
import Favicon from "../../components/Favicon/Favicon";

const Tournaments: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Tournaments | Brullah</title>
        <meta
          name="description"
          content="Brullah tournaments would fripple your earnings. Make your mullah brain more happy."
        />
        <Favicon></Favicon>
      </Head>
      <Navigation></Navigation>
      <ApolloClientOnly fallback={<TournamentsLoading></TournamentsLoading>}>
        <TournamentsMain></TournamentsMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Tournaments;
