import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../components/Footer/Footer";
import ApolloClientOnly from "../Apollo/ApolloClientOnly";
import Navigation from "../components/Navigation/Navigation";
import AffiliateMainLoading from "../modules/affiliate/loading/AffiliateMainLoading";
import AffiliateMain from "../modules/affiliate/AffiliateMain";
import "swiper/css/bundle";
import Favicon from "../components/Favicon/Favicon";

const Affiliate: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Affiliate | Brullah</title>
        <meta name="Brullah affiliates" content="Brullah affiliate program" />
        <Favicon></Favicon>
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
