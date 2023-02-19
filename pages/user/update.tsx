import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import Footer from "../../components/Footer/Footer";
import UpdateUserMain from "../../modules/user/update/UpdateUserMain";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import Fallback from "../../components/Fallback/Fallback";
import Navigation from "../../components/Navigation/Navigation";

const Update: NextPage = () => {
  return (
    <div className={cn("page-grid")}>
      <Head>
        <title>Update User | Brullah</title>
        <meta
          name="description"
          content="Update your brullah account information"
        />
      </Head>
      <Navigation hideSideNav={true}></Navigation>
      <ApolloClientOnly fallback={<Fallback></Fallback>}>
        <UpdateUserMain></UpdateUserMain>
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default Update;
