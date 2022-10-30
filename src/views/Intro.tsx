import Head from "next/head";
import { useStore } from "@store/store";

import Image from "next/image";
import Button from "@components/Button";
import { ScreenSizeMessage } from "@components/ScreenSizeError";

type Props = {
  isSmallScreen: boolean;
};

const Intro: React.FC<Props> = ({ isSmallScreen }) => {
  const moveToView = useStore((state) => state.moveToView);

  return (
    <>
      <Head>
        <title>Cuisine Clash</title>
      </Head>
      <main className="mx-auto flex min-h-screen flex-col items-center justify-center bg-intro bg-cover bg-center bg-no-repeat p-4">
        <div className="mt-auto">
          <Image
            src="/logo.png"
            className="motion-safe:animate-intro-logo"
            width="800"
            height="369"
            alt=""
          />
        </div>
        <h1 className="sr-only">Cuisine Clash</h1>
        <div className="mb-auto flex flex-col items-center motion-safe:animate-intro-content">
          <p className="mb-5 text-xl text-indigo-400 md:text-2xl lg:text-3xl">
            A food fighting card game
          </p>
          {isSmallScreen && <ScreenSizeMessage />}
          <Button
            onClickHandler={() => moveToView("DRAFTING")}
            isDisabled={isSmallScreen}
            className="mt-6 mb-16"
          >
            Start Game
          </Button>
        </div>

        <div className="mb-6 mt-6 flex text-sm motion-safe:animate-intro-content">
          <div className="mr-5 border-r border-slate-500 pr-5">
            <a
              className="border-b border-transparent transition-colors hover:border-slate-500 hover:text-slate-300"
              href="https://fineli.fi/fineli/en/ohje/19?"
            >
              Food nutrition data from Fineli
            </a>
          </div>
          <div>
            <a
              className=" border-b border-transparent transition-colors hover:border-slate-500 hover:text-slate-300"
              href="https://github.com/peippo/cuisine-clash"
            >
              Github
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Intro;
