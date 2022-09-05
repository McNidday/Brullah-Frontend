import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../components/Footer/Footer";
import ApolloClientOnly from "../components/Apollo/ApolloClientOnly";
import Navigation from "../components/Navigation/Navigation";
import AffiliateMainLoading from "./main/loading/AffiliateMainLoading";
import AffiliateMain from "./main/AffiliateMain";

const Affiliate: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Affiliate | Brullah</title>
        <meta name="Brullah affiliates" content="Brullah affiliate program" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation></Navigation>
      <ApolloClientOnly
        fallback={<AffiliateMainLoading></AffiliateMainLoading>}
      >
        <AffiliateMain></AffiliateMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Affiliate;
