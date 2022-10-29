import { useStore } from "@store/store";
import Head from "next/head";

import CardSelect from "@components/Drafting/CardSelect";
import CardSelectCount from "@components/Drafting/CardSelectCount";
import RedrawButton from "@components/Drafting/RedrawButton";
import Button from "@components/Button";
import { BattleIcon } from "@components/Icons";

const Drafting = () => {
  const isHandFull = useStore((state) => state.isPlayerHandFull);
  const moveToView = useStore((state) => state.moveToView);

  return (
    <>
      <Head>
        <title>Draft your deck</title>
      </Head>
      <main className="container mx-auto px-6">
        <section className="mt-8 flex flex-col items-center">
          <div className="flex w-full flex-wrap items-center justify-between">
            <CardSelectCount />
            <div className="order-1 ml-10 mr-auto mb-5 flex basis-full flex-col text-center lg:mb-0 lg:basis-auto">
              <h1 className="-mb-1 text-3xl tracking-wide text-indigo-400 md:text-4xl">
                Build your hand
              </h1>
              <p className="text-sm tracking-tight">
                Discover the most powerful cards to battle for you
              </p>
            </div>

            <div className="order-3">
              {isHandFull ? (
                <Button
                  onClickHandler={() => moveToView("BATTLE")}
                  className="flex items-center"
                >
                  <BattleIcon
                    width="24"
                    className="mr-4 text-yellow-400 shadow-md"
                  />
                  Go battle!
                </Button>
              ) : (
                <RedrawButton />
              )}
            </div>
          </div>
          <CardSelect />
        </section>
      </main>
    </>
  );
};

export default Drafting;
