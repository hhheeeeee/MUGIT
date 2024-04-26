"use client";

import { Tab } from "@headlessui/react";
import Image from "next/image";
import FlowDetail from "./flowdetail";
import dynamic from "next/dynamic";

const Tree = dynamic(() => import("./tree"), { ssr: false });

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
              <button className="mr-2 rounded border-2 border-pointblue bg-pointblue p-0.5 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="inline-block h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span className="mx-1 text-base font-semibold">New Flow</span>
              </button>
              <button className="rounded border-2 border-black p-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="inline-block h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="inline-block h-7 w-7"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
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
            <Tab.Panel>
              <Tree />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
