"use client";
import React from "react";
import Edit from "./Edit";
import { SettingsContext } from "./context/settingsContext";
import { Tab } from "@headlessui/react";
import LiveRecord from "./components/record/Liverecord.tsx";
import DragnDrop from "./components/source/DragnDrop";
import { Synth2 } from "./components/synth/Synth";
import { Fmsynth2 } from "./components/synth/FMSynth";

export default function Editor() {
  // const SOURCE = ["Burkinelectric.mp3", "Far_Apart.mp3", "Podcast.wav"];
  // const VOICE = ["Tin_Spirit.mp3", "Unavailable.mp3"];
  // const SYNTH = [
  //   "Valley_of_Spies.mp3",
  //   "Winner_Winner_Funky_Chicken_Dinner.mp3",
  // ];

  return (
    <div className="h-full px-20">
      <h1 className="pb-10 pt-20 text-6xl font-bold italic leading-6">
        Record Edit
      </h1>
      <div>
        <div
          style={{ borderWidth: "8px" }}
          className=" rounded-2xl border border-solid border-black p-10"
        >
          <div className="source-file">
            {/* 멀티트랙 음향 편집기 */}
            <SettingsContext>
              <Edit />
            </SettingsContext>
            <div className="w-4/ mx-auto my-10">
              <Tab.Group>
                <Tab.List>
                  <Tab
                    className={({ selected }) =>
                      (selected
                        ? "font-bold underline underline-offset-[6px] focus:outline-none "
                        : "") + "pr-5 text-2xl"
                    }
                  >
                    Source
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      (selected
                        ? "font-bold underline underline-offset-[6px] focus:outline-none "
                        : "") + "pr-5 text-2xl"
                    }
                  >
                    Voice
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      (selected
                        ? "font-bold underline underline-offset-[6px] focus:outline-none "
                        : "") + "pr-5 text-2xl"
                    }
                  >
                    Synth
                  </Tab>
                </Tab.List>
                <hr />
                <Tab.Panels>
                  <Tab.Panel>
                    <DragnDrop />
                  </Tab.Panel>
                  <Tab.Panel>
                    <LiveRecord />
                  </Tab.Panel>
                  <Tab.Panel>
                    <LiveRecord />
                    <Fmsynth2 />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
        <button className="m-10 mb-[20%] h-12 w-[15%] rounded-full bg-pointyellow text-3xl font-bold italic text-black">
          Submit
        </button>
      </div>
    </div>
  );
}
