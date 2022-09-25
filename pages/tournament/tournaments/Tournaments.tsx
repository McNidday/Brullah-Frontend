import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../../../components/Footer/Footer";
import TournamentsMain from "./main/TournamentsMain";
import ApolloClientOnly from "../../../Apollo/ApolloClientOnly";
import TournamentsLoading from "./main/loading/TournamentsLoading";
import Navigation from "../../../components/Navigation/Navigation";

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
      <Navigation></Navigation>
      <ApolloClientOnly fallback={<TournamentsLoading></TournamentsLoading>}>
        <TournamentsMain></TournamentsMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Tournaments;
