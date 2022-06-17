import type { NextPage } from "next";
import Head from "next/head";
import SideNavigation from "../components/SideNavigation/SideNavigation";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import cn from "classnames";
import Footer from "../components/Footer/Footer";
import ApolloClientOnly from "../components/Apollo/ApolloClientOnly";
import MyTournamentsMain from "./main/MyTournamentsMain";
import MyTournamentsLoading from "./main/loading/MyTournamentsLoading";

const MyTournaments: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>My Tournaments | Brullah</title>
        <meta name="My Tournaments" content="Tournaments you have created" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavigation></TopNavigation>
      <SideNavigation></SideNavigation>
      <ApolloClientOnly
        fallback={<MyTournamentsLoading></MyTournamentsLoading>}
      >
        <MyTournamentsMain></MyTournamentsMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default MyTournaments;
