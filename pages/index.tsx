import type { NextPage } from "next";
import styled from "@emotion/styled";
import Head from "next/head";
import HomeMain from "../modules/home/HomeMain";
import "swiper/css/bundle";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  background-color: ${(props) => props.theme.colors.background};
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: 60px minmax(0, 1fr);
  grid-template-areas:
    "navigationtop"
    "maincontent";
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Home | Brullah</title>
        <meta
          name="description"
          content="Make money for for fun, for hustle and for independence. A brain with mullah is worth 2 jobs in the bush."
        />
      </Head>
      <HomeMain></HomeMain>
    </Container>
  );
};

export default Home;
