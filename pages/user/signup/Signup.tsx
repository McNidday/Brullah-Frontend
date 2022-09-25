import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../../../components/Footer/Footer";
import SignupMain from "../../../modules/user/signup/SignupMain";
import ApolloClientOnly from "../../../Apollo/ApolloClientOnly";
import Fallback from "../../../components/Fallback/Fallback";
import Navigation from "../../../components/Navigation/Navigation";

const Signup: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>SignUp | Brullah</title>
        <meta
          name="Make a brullah account"
          content="Make mullah playing games (A.K.A) Making money with your brain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation></Navigation>
      <ApolloClientOnly fallback={<Fallback></Fallback>}>
        <SignupMain></SignupMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Signup;
