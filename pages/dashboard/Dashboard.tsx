import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
import ApolloClientOnly from "../components/Apollo/ApolloClientOnly";
import SideNavigation from "../components/SideNavigation/SideNavigation";
import DashboardMain from "./main/DashboardMain";
import DashboardMainLoading from "./main/loading/DashboardMainLoading";

const Dashboard: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Dashboard | Brullah</title>
        <meta name="Brullah dashboard" content="Manage your brullah account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavigation></TopNavigation>
      <SideNavigation></SideNavigation>
      <ApolloClientOnly
        fallback={<DashboardMainLoading></DashboardMainLoading>}
      >
        <DashboardMain></DashboardMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
