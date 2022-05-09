import type { NextPage } from "next";
import Head from "next/head";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
import LoginMain from "./main/LoginMain";
import ApolloClientOnly from "../components/Apollo/ApolloClientOnly";
import Logo from "../components/Logo/Logo";
import cn from "classnames";
import styles from "./styles.module.scss";

const Login: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Login | Brullah</title>
        <meta name="Brullah login" content="Login to your brullah account." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavigation></TopNavigation>
      <ApolloClientOnly
        fallback={
          <div className={cn(styles.loading)}>
            <Logo
              thinking={true}
              text={true}
              image={{ width: "100px", height: "100px" }}
              container={{ width: "210px", height: "80px" }}
            ></Logo>
          </div>
        }
      >
        <LoginMain></LoginMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Login;
