import type { NextPage } from "next";
import Head from "next/head";
import SideNavigation from "../components/SideNavigation/SideNavigation";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import classNames from "classnames";
import styles from "./styles.module.scss";
import Footer from "../components/Footer/Footer";
import HomeMain from "./main/HomeMain";
const cn = classNames.bind(styles);

const Home: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Home | Brullah</title>
        <meta
          name="Welcome to Brullah"
          content="Make mullah playing games (A.K.A) Making money with your brain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavigation></TopNavigation>
      <SideNavigation></SideNavigation>
      <HomeMain></HomeMain>
      <Footer></Footer>
    </div>
  );
};

export default Home;
