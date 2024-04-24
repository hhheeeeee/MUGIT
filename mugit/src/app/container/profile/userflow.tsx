"use client";

import { Tab } from "@headlessui/react";
import Image from "next/image";
import dynamic from "next/dynamic";
const WavesurferComp = dynamic(() => import("@/app/components/wavesurfer"), {
  ssr: false,
});

export default function UserFlow() {
  const Flows = ["Burkinelectric.mp3", "Far_Apart.mp3", "Podcast.wav"];
  const Likes = ["Tin_Spirit.mp3", "Unavailable.mp3"];
  const Works = [
    "Valley_of_Spies.mp3",
    "Winner_Winner_Funky_Chicken_Dinner.mp3",
  ];

  return (
    <div className="mx-auto my-10 w-2/3">
      <Tab.Group>
        <Tab.List>
          <Tab
            className={({ selected }) =>
              (selected
                ? "font-bold underline decoration-4 underline-offset-[7.3px] focus:outline-none "
                : "") + "pr-5 text-2xl"
            }
          >
            Flows
          </Tab>
          <Tab
            className={({ selected }) =>
              (selected
                ? "font-bold underline decoration-4 underline-offset-[7.3px] focus:outline-none "
                : "") + "pr-5 text-2xl"
            }
          >
            Likes
          </Tab>
          <Tab
            className={({ selected }) =>
              (selected
                ? "font-bold underline decoration-4 underline-offset-[7.3px] focus:outline-none "
                : "") + "pr-5 text-2xl"
            }
          >
            Works
          </Tab>
        </Tab.List>
        <hr className="border-2" />
        <Tab.Panels>
          <Tab.Panel>
            {Flows.map((flow: string) => (
              <div className="my-5 flex w-full">
                <Image
                  src="/Rectangle 35.png"
                  alt=""
                  width={150}
                  height={150}
                />
                <div className="relative ml-5 w-full">
                  <p className="text-xl font-semibold">{flow}</p>
                  <p className="text-base">Any Nickname</p>
                  <div className="absolute bottom-0 w-full">
                    <WavesurferComp key={flow} musicname={flow} />
                  </div>
                </div>
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {Likes.map((flow: string) => (
              <div className="my-5 flex w-full">
                <Image
                  src="/Rectangle 35.png"
                  alt=""
                  width={150}
                  height={150}
                />
                <div className="relative ml-5 w-full">
                  <p className="text-xl font-semibold">{flow}</p>
                  <p className="text-base">Any Nickname</p>
                  <div className="absolute bottom-0 w-full">
                    <WavesurferComp key={flow} musicname={flow} />
                  </div>
                </div>
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {Works.map((flow: string) => (
              <div className="my-5 flex w-full">
                <Image
                  src="/Rectangle 35.png"
                  alt=""
                  width={150}
                  height={150}
                />
                <div className="relative ml-5 w-full">
                  <p className="text-xl font-semibold">{flow}</p>
                  <p className="text-base">Any Nickname</p>
                  <div className="absolute bottom-0 w-full">
                    <WavesurferComp key={flow} musicname={flow} />
                  </div>
                </div>
              </div>
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
