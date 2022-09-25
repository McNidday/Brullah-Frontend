import type { NextPage } from "next";
import cn from "classnames";
import styles from "./styles.module.scss";
import Head from "next/head";
import HomeMain from "../../modules/home/HomeMain";
import "swiper/css/bundle";

const Home: NextPage = () => {
  return (
    <div className={cn(styles.grid)}>
      <Head>
        <title>Home | Brullah</title>
        <meta
          name="Welcome to Brullah"
          content="Make money for for fun, for hustle and for checkers. A brain with mullah is worth 2 jobs in the bush."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeMain></HomeMain>
    </div>
  );
};

export default Home;
