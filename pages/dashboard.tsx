import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../components/Footer/Footer";
import ApolloClientOnly from "../Apollo/ApolloClientOnly";
import Navigation from "../components/Navigation/Navigation";
import DashboardMainLoading from "../modules/dashboard/loading/DashboardMainLoading";
import DashboardMain from "../modules/dashboard/DashboardMain";
import Favicon from "../components/Favicon/Favicon";

const Dashboard: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Dashboard | Brullah</title>
        <meta name="Brullah dashboard" content="Manage your brullah account" />
        <Favicon></Favicon>
      </Head>
      <Navigation></Navigation>
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
