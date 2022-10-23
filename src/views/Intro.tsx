import Head from "next/head";
import { useStore } from "@store/store";
import Button from "@components/Button";

const Intro = () => {
  const moveToView = useStore((state) => state.moveToView);

  return (
    <>
      <Head>
        <title>Cuisine Clash</title>
      </Head>
      <main className="mx-auto flex min-h-screen flex-col items-center justify-center bg-intro bg-cover bg-center bg-no-repeat p-4">
        <img
          src="logo.png"
          srcSet="logo.png 1x, logo@2x.png 2x"
          width="800"
          height="369"
          alt=""
          className="animate-intro-logo"
        />
        <h1 className="sr-only">Cuisine Clash</h1>
        <div className="flex animate-intro-content flex-col">
          <p className="mb-5 text-2xl text-indigo-400">
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
