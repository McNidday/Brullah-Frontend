import type { NextPage } from "next";
import Head from "next/head";
import SideNavigation from "../components/SideNavigation/SideNavigation";
import TopNavigation from "../components/TopNavigation/TopNavigation";

const Tournaments: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tournaments | Brullah</title>
        <meta
          name="Join Brullah Tournaments"
          content="Make a load of mulllah by playing tournaments. Fripple your brullah coins"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavigation></TopNavigation>
      <SideNavigation></SideNavigation>
      <main></main>
      <footer></footer>
    </div>
  );
};

export default Tournaments;
