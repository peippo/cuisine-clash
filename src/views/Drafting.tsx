import { useStore } from "@store/store";
import Head from "next/head";

import CardSelect from "@components/Drafting/CardSelect";
import CardSelectCount from "@components/Drafting/CardSelectCount";
import RedrawButton from "@components/Drafting/RedrawButton";
import Button from "@components/Button";

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
            <h1 className="order-1 ml-10 mr-auto mb-5 basis-full text-center text-3xl text-indigo-400 md:text-4xl lg:mb-0 lg:basis-auto">
              Draft your deck
            </h1>
            <RedrawButton />
          </div>
          <CardSelect />

          <div className="mb-12">
            <Button
              isDisabled={!isHandFull}
              onClickHandler={() => moveToView("BATTLE")}
            >
              Go battle!
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Drafting;
