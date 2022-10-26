import Head from "next/head";
import useEnemyCards from "@hooks/useEnemyCards";

import Arena from "@components/Battle/Arena";
import HandCards from "@components/Battle/HandCards";
import EnemyCards from "@components/Battle/EnemyCards";

const Battle = () => {
  const { isLoadingEnemyCards } = useEnemyCards();

  return (
    <>
      <Head>
        <title>Battle!</title>
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <EnemyCards />
        <Arena isLoadingEnemyCards={isLoadingEnemyCards} />
        <HandCards />
      </main>
    </>
  );
};

export default Battle;
