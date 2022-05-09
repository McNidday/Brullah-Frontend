import type { NextPage } from "next";
import Head from "next/head";
import cn from "classnames";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
import SignupMain from "./main/SignupMain";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Signup: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/dashboard");
  });
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
      <TopNavigation></TopNavigation>
      <SignupMain></SignupMain>
      <Footer></Footer>
    </div>
  );
};

export default Signup;
