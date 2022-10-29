import Head from "next/head";

import Arena from "@components/Battle/Arena";
import HandCards from "@components/Battle/HandCards";
import EnemyCards from "@components/Battle/EnemyCards";

const Battle = () => {
  return (
    <>
      <Head>
        <title>Battle!</title>
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <EnemyCards />
        <Arena />
        <HandCards />
      </main>
    </>
  );
};

export default Battle;
