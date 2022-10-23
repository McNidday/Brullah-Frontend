import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../../components/Footer/Footer";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import MyTournamentsMain from "../../modules/tournament/myTournaments/MyTournamentsMain";
import MyTournamentsLoading from "../../modules/tournament/myTournaments/loading/MyTournamentsLoading";
import Navigation from "../../components/Navigation/Navigation";
import MyTournamentsMainUser from "../../modules/tournament/myTournaments/MyTournamentsMainUser";
import Favicon from "../../components/Favicon/Favicon";

const MyTournaments: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>My Tournaments | Brullah</title>
        <meta name="description" content="Tournaments you have created" />
        <Favicon></Favicon>
      </Head>
      <Navigation></Navigation>
      <ApolloClientOnly
        fallback={<MyTournamentsLoading></MyTournamentsLoading>}
      >
        <MyTournamentsMainUser></MyTournamentsMainUser>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default MyTournaments;
