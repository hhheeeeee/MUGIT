"use client";

import { Tab } from "@headlessui/react";
import Image from "next/image";
import FlowDetail from "./flowdetail";

const tempInfo = {
  coverPath: "/Rectangle 35.png",
  hashtags: ["Hip Hop", "R&B", "한국", "ssafy"],
  title: "Bus Driver",
  nickname: "Static Duo",
  message: "비트 주세요",
  musicPath: "Burkinelectric.mp3",
  sources: [
    "Far_Apart.mp3",
    "Unavailable.mp3",
    "Valley_of_Spies.mp3",
    "Tin_Spirit.mp3",
  ],
};

export default function FlowInfo() {
  return (
    <div className="mx-auto w-2/3">
      <div className="mb-5 mt-10 flex">
        <div className="flex w-full">
          <Image
            width={254}
            height={254}
            alt="cover image"
            src={tempInfo.coverPath}
            className="mr-5 h-48 w-48 rounded"
            priority
          />
          <div className="relative w-full">
            <div className="mb-3 flex">
              {tempInfo.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="mr-0.5 rounded-lg border-2 border-solid border-slate-300 px-1 text-sm text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-5xl font-semibold">{tempInfo.title}</p>
            <p className="text-2xl">{tempInfo.nickname}</p>
            <div className="absolute bottom-0 right-0">
              <button className="mr-2 rounded border-2 border-pointblue bg-pointblue p-1.5 text-white">
                <Image
                  width={20}
                  height={20}
                  alt="network icon"
                  src={"/network.png"}
                  className="inline-block"
                />
                <span className="ml-2 text-[22px]">New Flow</span>
              </button>
              <button className="rounded border-2 border-black p-1.5">
                <Image
                  width={22}
                  height={20}
                  alt="heart icon"
                  src={"/heart-line.png"}
                  className="inline-block"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-2" />
      <p className="mt-5 text-xl">{tempInfo.message}</p>
      <div className="my-10">
        <Tab.Group>
          <Tab.List>
            <Tab
              className={({ selected }) =>
                (selected
                  ? "font-bold underline decoration-4 underline-offset-[7.3px] focus:outline-none "
                  : "") + "pr-5 text-2xl"
              }
            >
              Details
            </Tab>
            <Tab
              className={({ selected }) =>
                (selected
                  ? "font-bold underline decoration-4 underline-offset-[7.3px] focus:outline-none "
                  : "") + "pr-5 text-2xl"
              }
            >
              Tree
            </Tab>
          </Tab.List>
          <hr className="border-2" />
          <Tab.Panels>
            <Tab.Panel className="mt-5">
              <FlowDetail
                musicPath={tempInfo.musicPath}
                sources={tempInfo.sources}
              />
            </Tab.Panel>
            <Tab.Panel>Tree tab</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
