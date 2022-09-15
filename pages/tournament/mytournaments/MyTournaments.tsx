import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../../components/Footer/Footer";
import ApolloClientOnly from "../../components/Apollo/ApolloClientOnly";
import MyTournamentsMain from "./main/MyTournamentsMain";
import MyTournamentsLoading from "./main/loading/MyTournamentsLoading";
import Navigation from "../../components/Navigation/Navigation";
import MyTournamentsMainUser from "./main/MyTournamentsMainUser";

const MyTournaments: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>My Tournaments | Brullah</title>
        <meta name="My Tournaments" content="Tournaments you have created" />
        <link rel="icon" href="/favicon.ico" />
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
