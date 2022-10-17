import type { NextPage } from "next";
import Head from "next/head";
import "swiper/css/bundle";
import HowToMain from "../modules/howto/HowToMain";
import styled from "@emotion/styled";
import Favicon from "../components/Favicon/Favicon";

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

const HowTo: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>HowTo | Brullah</title>
        <meta
          name="Brullah how to"
          content="Learn how to utilize brullah, for your own benefit."
        />
        <Favicon></Favicon>
      </Head>
      <HowToMain></HowToMain>
    </Container>
  );
};

export default HowTo;
