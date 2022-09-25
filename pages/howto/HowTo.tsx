import type { NextPage } from "next";
import cn from "classnames";
import styles from "./styles.module.scss";
import Head from "next/head";
import "swiper/css/bundle";
import HowToMain from "../../modules/howto/HowToMain";

const HowTo: NextPage = () => {
  return (
    <div className={cn(styles.grid)}>
      <Head>
        <title>HowTo | Brullah</title>
        <meta
          name="Brullah how to"
          content="Learn how to utilize brullah, for your own benefit."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HowToMain></HowToMain>
    </div>
  );
};

export default HowTo;
