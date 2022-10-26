import type { NextPage } from "next";
import Head from "next/head";
import { useStore } from "@store/store";

import Intro from "@views/Intro";
import Drafting from "@views/Drafting";
import Battle from "@views/Battle";
import useMediaQuery from "@hooks/useMediaQuery";
import { SMALL_WIDTH_MQ, SMALL_HEIGHT_MQ } from "@utils/constants";
import { ScreenSizeErrorView } from "@components/ScreenSizeError";

const Home: NextPage = () => {
  const view = useStore((state) => state.view);
  const isSmallWidth = useMediaQuery(SMALL_WIDTH_MQ);
  const isSmallHeight = useMediaQuery(SMALL_HEIGHT_MQ);
  const isSmallScreen = isSmallWidth || isSmallHeight;

  return (
    <>
      <Head>
        <title>Cuisine Clash</title>
      </Head>
      {isSmallScreen && view !== "TITLE" && <ScreenSizeErrorView />}
      {view === "TITLE" && <Intro isSmallScreen={isSmallScreen} />}
      {view === "DRAFTING" && <Drafting />}
      {view === "BATTLE" && <Battle />}
    </>
  );
};

export default Home;
