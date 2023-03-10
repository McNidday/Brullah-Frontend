import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import LoginMain from "../../modules/user/login/LoginMain";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import cn from "classnames";
import Fallback from "../../components/Fallback/Fallback";
import Navigation from "../../components/Navigation/Navigation";

const Login: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Login | Brullah</title>
        <meta name="description" content="Login to your brullah account" />
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
