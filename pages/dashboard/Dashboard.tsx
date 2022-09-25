import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../../components/Footer/Footer";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import DashboardMain from "./main/DashboardMain";
import DashboardMainLoading from "./main/loading/DashboardMainLoading";
import Navigation from "../../components/Navigation/Navigation";

const Dashboard: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Dashboard | Brullah</title>
        <meta name="Brullah dashboard" content="Manage your brullah account" />
        <link rel="icon" href="/favicon.ico" />
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
