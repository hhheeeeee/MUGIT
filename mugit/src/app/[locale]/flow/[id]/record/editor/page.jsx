"use client";
import React from "react";
import Edit from "./edit";
import { SettingsContext } from "./context/settingsContext";
import { Tab } from "@headlessui/react";
import RegionWave from "../regionwave";
import LiveRecord from "../liverecord";
import DragDrop from "@/app/components/fileUpload/DragDrop";

export default function Editor() {
  const SOURCE = ["Burkinelectric.mp3", "Far_Apart.mp3", "Podcast.wav"];
  const VOICE = ["Tin_Spirit.mp3", "Unavailable.mp3"];
  const SYNTH = [
    "Valley_of_Spies.mp3",
    "Winner_Winner_Funky_Chicken_Dinner.mp3",
  ];

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
            {/* 멀티트랙 음량 편집기 */}
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
                    {/* 드래그 앤 드롭 */}
                    {/* <DragDrop /> */}
                    {/* 소스 파일 추가 */}
                    {SOURCE.map((url) => (
                      <RegionWave key={url} url={`/musics/${url}`} />
                    ))}
                  </Tab.Panel>
                  <Tab.Panel>
                    {/* 녹음기 */}
                    <LiveRecord />
                    {/* 파형 */}
                    {/* 녹음된 파일 소스에 추가 */}
                    {VOICE.map((url) => (
                      <RegionWave key={url} url={`/musics/${url}`} />
                    ))}
                  </Tab.Panel>
                  <Tab.Panel>
                    {/* 녹음기 */}
                    <LiveRecord />
                    {/* 신스 */}
                    {/* <AudioComponent /> */}
                    {/* 파형 */}
                    {/* 녹음된 파일 소스에 추가 */}
                    {SYNTH.map((url) => (
                      <RegionWave key={url} url={`/musics/${url}`} />
                    ))}
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
