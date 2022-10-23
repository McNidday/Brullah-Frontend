import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../../components/Footer/Footer";
import SignupMain from "../../modules/user/signup/SignupMain";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import Fallback from "../../components/Fallback/Fallback";
import Navigation from "../../components/Navigation/Navigation";
import Favicon from "../../components/Favicon/Favicon";

const Signup: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>SignUp | Brullah</title>
        <meta
          name="description"
          content="Make a brullah account. Let's become mullah buddies"
        />
        <Favicon></Favicon>
      </Head>
      <Navigation hideSideNav={true}></Navigation>
      <ApolloClientOnly fallback={<Fallback></Fallback>}>
        <SignupMain></SignupMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Signup;
