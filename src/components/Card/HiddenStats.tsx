import { HeartIcon, ShieldIcon, SwordIcon } from "@components/Icons";

const HiddenStats = () => {
  return (
    <ul aria-hidden="true" className="mb-0 mt-auto text-slate-500">
      <li className="my-2 flex">
        <HeartIcon width="24" className="mr-3" />
        <span className="font-serif text-lg">???</span>
      </li>
      <li className="my-2 flex ">
        <SwordIcon width="24" className="mr-3" />
        <div className="relative h-5 w-full rounded-lg bg-slate-800"></div>
      </li>
      <li className="my-2 flex ">
        <ShieldIcon width="24" className="mr-3" />
        <div className="relative h-5 w-full rounded-lg bg-slate-800"></div>
      </li>
    </ul>
  );
};

export default HiddenStats;
