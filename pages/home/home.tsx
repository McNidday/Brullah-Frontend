import type { NextPage } from "next";
import Head from "next/head";
import classNames from "classnames";
import styles from "./styles.module.scss";
const cn = classNames.bind(styles);

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home | Brullah</title>
        <meta
          name="Welcome to Brullah"
          content="Make mullah playing games (A.K.A) Making money with your brain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h4>Welcome to brullah</h4>
    </div>
  );
};

export default Home;
