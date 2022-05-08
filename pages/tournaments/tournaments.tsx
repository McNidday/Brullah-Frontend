import type { NextPage } from "next";
import Head from "next/head";
import SideNavigation from "../components/SideNavigation/SideNavigation";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import classNames from "classnames";
import styles from "./styles.module.scss";
import Footer from "../components/Footer/Footer";
import HomeMain from "./main/HomeMain";
import ApolloClientOnly from "../components/Apollo/ApolloClientOnly";
import TournamentListLoading from "./main/tournaments/Loading/TournamentListLoading";
const cn = classNames.bind(styles);

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
      <TopNavigation></TopNavigation>
      <SideNavigation></SideNavigation>
      <ApolloClientOnly
        fallback={<TournamentListLoading></TournamentListLoading>}
      >
        <HomeMain></HomeMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Tournaments;
