import Head from "next/head";
import { useStore } from "@store/store";

import Image from "next/image";
import Button from "@components/Button";

const Intro = () => {
  const moveToView = useStore((state) => state.moveToView);

  return (
    <>
      <Head>
        <title>Cuisine Clash</title>
      </Head>
      <main className="mx-auto flex min-h-screen flex-col items-center justify-center bg-intro bg-cover bg-center bg-no-repeat p-4">
        <Image
          src="/logo.png"
          className="motion-safe:animate-intro-logo"
          width="800"
          height="369"
          alt=""
        />
        <h1 className="sr-only">Cuisine Clash</h1>
        <div className="flex flex-col motion-safe:animate-intro-content">
          <p className="mb-5 text-lg text-indigo-400 md:text-2xl">
            A food fighting card game
          </p>
          <Button onClickHandler={() => moveToView("DRAFTING")}>
            Start Game
          </Button>
        </div>
      </main>
    </>
  );
};

export default Intro;
