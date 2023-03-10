import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../../components/Footer/Footer";
import CreateTournamentMain from "../../modules/tournament/createTournament/CreateTournamentMain";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import Fallback from "../../components/Fallback/Fallback";
import Navigation from "../../components/Navigation/Navigation";

const CreateTournament: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Create Tournament | Brullah</title>
        <meta name="description" content="Create a new tournament" />
      </Head>
      <Navigation hideSideNav={true}></Navigation>
      <ApolloClientOnly fallback={<Fallback></Fallback>}>
        <CreateTournamentMain></CreateTournamentMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default CreateTournament;
