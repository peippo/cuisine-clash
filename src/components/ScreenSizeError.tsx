import Image from "next/image";
import { WarningIcon } from "@components/Icons";

export const ScreenSizeMessage = () => {
  return (
    <p className="mt-6 flex flex-col items-center text-center text-orange-500 md:flex-row md:text-lg lg:text-xl">
      <WarningIcon width="24" className="mb-2 md:mr-3" />
      Sorry, screen size is too small!
      <br className="md:hidden" /> Please resize or try a another device
    </p>
  );
};

export const ScreenSizeErrorView = () => {
  return (
    <div className="absolute inset-0 z-50 mx-auto flex min-h-full min-w-full flex-col items-center justify-center bg-slate-900">
      <Image src="/logo.png" width="266" height="123" alt="" />
      <ScreenSizeMessage />
    </div>
  );
};
