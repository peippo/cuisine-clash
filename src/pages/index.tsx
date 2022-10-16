import type { NextPage } from "next";
import Head from "next/head";
import { useGameStore } from "@store/store";
import Intro from "@views/Intro";
import Drafting from "@views/Drafting";
import Battle from "@views/Battle";

const Home: NextPage = () => {
  const view = useGameStore((state) => state.view);

  return (
    <>
      <Head>
        <title>Cuisine Clash</title>
      </Head>
      {view === "TITLE" && <Intro />}
      {view === "DRAFTING" && <Drafting />}
      {view === "BATTLE" && <Battle />}
    </>
  );
};

export default Home;
