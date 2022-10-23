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
        <h1 className="my-8 text-center text-4xl">Draft your deck</h1>
        <section className="flex flex-col items-center">
          <div className="mb-6 flex w-full items-center justify-between">
            <CardSelectCount />
            <RedrawButton />
          </div>
          <CardSelect />

          {isHandFull && (
            <Button onClickHandler={() => moveToView("BATTLE")}>
              Go battle!
            </Button>
          )}
        </section>
      </main>
    </>
  );
};

export default Drafting;
