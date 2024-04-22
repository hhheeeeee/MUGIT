"use client";

import { Tab } from "@headlessui/react";
import Demows from "@/components/demows";

export default function UserFlow() {
  const Flows = ["Burkinelectric.mp3", "Far_Apart.mp3", "Podcast.wav"];
  const Likes = ["Tin_Spirit.mp3", "Unavailable.mp3"];
  const Works = [
    "Valley_of_Spies.mp3",
    "Winner_Winner_Funky_Chicken_Dinner.mp3",
  ];
  return (
    <div className="w-4/5 my-10 mx-auto">
      <Tab.Group>
        <Tab.List>
          <Tab
            className={({ selected }) =>
              (selected
                ? "underline underline-offset-[6px] font-bold focus:outline-none "
                : "") + "pr-5 text-2xl"
            }
          >
            Flows
          </Tab>
          <Tab
            className={({ selected }) =>
              (selected
                ? "underline underline-offset-[6px] font-bold focus:outline-none "
                : "") + "pr-5 text-2xl"
            }
          >
            Likes
          </Tab>
          <Tab
            className={({ selected }) =>
              (selected
                ? "underline underline-offset-[6px] font-bold focus:outline-none "
                : "") + "pr-5 text-2xl"
            }
          >
            Works
          </Tab>
        </Tab.List>
        <hr />
        <Tab.Panels>
          <Tab.Panel>
            {Flows.map((flow: string) => (
              <Demows key={flow} musicname={flow} />
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {Likes.map((flow: string) => (
              <Demows key={flow} musicname={flow} />
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {Works.map((flow: string) => (
              <Demows key={flow} musicname={flow} />
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
