import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import ForgotMain from "./main/ForgotMain";
import ApolloClientOnly from "../../components/Apollo/ApolloClientOnly";
import cn from "classnames";
import Fallback from "../../components/Fallback/Fallback";
import Navigation from "../../components/Navigation/Navigation";

const Forgot: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Forgot Password | Brullah</title>
        <meta
          name="Brullah forgot password"
          content="Reset to your brullah account password."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation hideSideNav={true}></Navigation>
      <ApolloClientOnly fallback={<Fallback></Fallback>}>
        <ForgotMain></ForgotMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Forgot;