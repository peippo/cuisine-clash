import Image from "next/image";

const LoadingShuffle = () => {
  return (
    <div className="flex flex-col">
      <div className="relative ml-5 h-32 w-24">
        <div className="absolute top-0 z-30 ml-5 flex h-28 w-20 animate-loading-card-1 items-center justify-center rounded-lg border-4 border-slate-900 bg-gradient-to-b from-slate-600 to-slate-800 shadow-sm">
          <Image
            src="/logo.png"
            className="opacity-40 brightness-200 grayscale"
            width="50"
            height="23"
            alt=""
          />
        </div>
        <div className="absolute top-0 z-20 ml-2 flex h-28 w-20 animate-loading-card-2 items-center justify-center rounded-lg border-4 border-slate-900 bg-gradient-to-b from-slate-600 to-slate-800 shadow-sm">
          <Image
            src="/logo.png"
            className="opacity-40 brightness-200 grayscale"
            width="50"
            height="23"
            alt=""
          />
        </div>
        <div className="absolute top-0 z-10 flex h-28 w-20 animate-loading-card-3 items-center justify-center rounded-lg border-4 border-slate-900 bg-gradient-to-b from-slate-600 to-slate-800 shadow-sm">
          <Image
            src="/logo.png"
            className="opacity-40 brightness-200 grayscale"
            width="50"
            height="23"
            alt=""
          />
        </div>
      </div>
      <p className="my-5 text-2xl">Shuffling cards...</p>
    </div>
  );
};

export default LoadingShuffle;
