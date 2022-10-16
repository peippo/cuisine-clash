import Head from "next/head";
import { useGameStore } from "@store/store";
import Button from "@components/Button";

const Intro = () => {
  const moveTo = useGameStore((state) => state.moveTo);

  return (
    <>
      <Head>
        <title>Cuisine Clash</title>
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-4xl">Cuisine Clash</h1>
        <Button onClickHandler={() => moveTo("DRAFTING")}>Start Game</Button>
      </main>
    </>
  );
};

export default Intro;
