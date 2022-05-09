import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
import CreateTournamentMain from "./main/CreateTournamentMain";

const CreateTournament: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Create Tournament | Brullah</title>
        <meta
          name="Create a new brullah tournament"
          content="Brullah tournaments would fripple your earnings. Make your mullah brain more happy."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavigation></TopNavigation>
      <CreateTournamentMain></CreateTournamentMain>
      <Footer></Footer>
    </div>
  );
};

export default CreateTournament;
