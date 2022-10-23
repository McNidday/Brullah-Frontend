import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import cn from "classnames";
import Fallback from "../../components/Fallback/Fallback";
import Navigation from "../../components/Navigation/Navigation";
import VerifyAccountMain from "../../modules/user/verify/VerifyAccountMain";
import Favicon from "../../components/Favicon/Favicon";

const Forgot: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Verify Account | Brullah</title>
        <meta
          name="Verify brullah account"
          content="Verify your brullah account to gain access to more brullah services"
        />
        <Favicon></Favicon>
      </Head>
      <Navigation hideSideNav={true}></Navigation>
      <ApolloClientOnly fallback={<Fallback></Fallback>}>
        <VerifyAccountMain></VerifyAccountMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Forgot;
