import Head from "next/head";
import { useHandStore } from "@store/store";
import CardSelect from "@components/Drafting/CardSelect";
import CardSelectCount from "@components/Drafting/CardSelectCount";
import RedrawButton from "@components/Drafting/RedrawButton";
import Button from "@components/Button";
import { useGameStore } from "@store/store";

const Drafting = () => {
  const isHandFull = useHandStore((state) => state.isHandFull);
  const moveTo = useGameStore((state) => state.moveTo);

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
            <Button onClickHandler={() => moveTo("BATTLE")}>Go battle!</Button>
          )}
        </section>
      </main>
    </>
  );
};

export default Drafting;
