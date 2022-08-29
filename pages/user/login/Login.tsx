import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import LoginMain from "./main/LoginMain";
import ApolloClientOnly from "../../components/Apollo/ApolloClientOnly";
import cn from "classnames";
import Fallback from "../../components/Fallback/Fallback";
import Navigation from "../../components/Navigation/Navigation";

const Login: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Login | Brullah</title>
        <meta name="Brullah login" content="Login to your brullah account." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation hideSideNav={true}></Navigation>
      <ApolloClientOnly fallback={<Fallback></Fallback>}>
        <LoginMain></LoginMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Login;
