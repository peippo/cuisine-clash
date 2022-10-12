import type { NextPage } from "next";
import Head from "next/head";

import CardSelect from "@components/Drafting/CardSelect";
import CardSelectCount from "@components/Drafting/CardSelectCount";
import RedrawButton from "@components/Drafting/RedrawButton";

const Drafting: NextPage = () => {
  return (
    <>
      <Head>
        <title>Draft your deck</title>
      </Head>
      <main className="container mx-auto">
        <h1 className="my-8 text-center text-4xl">Draft your deck</h1>
        <section className="flex flex-col items-center">
          <div className="mb-6 flex w-full items-center justify-between px-10">
            <CardSelectCount />
            <RedrawButton />
          </div>
          <CardSelect />
        </section>
      </main>
    </>
  );
};

export default Drafting;
