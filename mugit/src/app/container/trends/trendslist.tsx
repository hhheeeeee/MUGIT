import { dummytrends } from "./dummy";
import Image from "next/image";
import IconPlay from "@/app/assets/icon/IconPlay";

export default function Trendslist() {
  return (
    <div className="flex h-full w-full flex-col">
      <p className="text-4xl font-bold">Trends</p>
      <div className="grid w-full grid-cols-3 gap-x-6">
        {dummytrends.map((item) => {
          return (
            <div className="">
              <div className="relative h-[180px] rounded-lg">
                <Image
                  className="rounded-lg "
                  src={item.imgurl}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="group absolute top-0 h-full w-full rounded-lg hover:bg-gray-600 hover:bg-opacity-75">
                  <IconPlay tailwindCSS="absolute top-[32%] left-[35%] hidden group-hover:block z-10 cursor-pointer" />
                </div>
              </div>
              <p className="text-xl">{item.title}</p>
              <p className="mb-4 text-base">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
