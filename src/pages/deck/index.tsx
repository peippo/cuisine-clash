import type { NextPage } from "next";
import Head from "next/head";

import CardSelect from "@components/CardSelect";
import CardSelectCount from "@components/CardSelectCount";

const DeckSelection: NextPage = () => {
  return (
    <>
      <Head>
        <title>Choose deck</title>
      </Head>
      <main>
        <h1 className="my-8 text-center text-4xl">Choose deck</h1>
        <section className="flex flex-col justify-center">
          <CardSelect />
          <CardSelectCount />
        </section>
      </main>
    </>
  );
};

export default DeckSelection;
