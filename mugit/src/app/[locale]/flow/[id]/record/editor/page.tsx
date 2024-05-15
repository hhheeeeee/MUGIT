"use client";
import React, { useEffect, useState } from "react";
import Edit from "./Edit";
import { SettingsContext } from "./context/settingsContext";
import { Tab } from "@headlessui/react";
import LiveRecord from "./components/record/Liverecord";
import DragnDropEdit from "./components/source/DragnDropEdit.jsx";
import { useSearchParams } from "next/navigation";
import { useThemeSettings } from "../editor/hooks";
import FMKeyboard from "./components/synth/FmKeyboard";

export default function Editor() {
  const searchParams = useSearchParams();
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    const audioFilesParam = searchParams.get("audioFiles");
    if (audioFilesParam) {
      try {
        const parsedAudioFiles = JSON.parse(
          decodeURIComponent(audioFilesParam)
        );
        const files = parsedAudioFiles.map(
          (fileData: { name: string; data: string; type: string }) => {
            const byteString = atob(fileData.data.split(",")[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: fileData.type });
            return new File([blob], fileData.name);
          }
        );
        setAudioFiles(files);
      } catch (error) {
        console.error("Failed to parse audioFiles from URL", error);
      }
    }
  }, [searchParams]);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files);
  };

  return (
    <div className="h-full px-20">
      <h1 className="pb-10 pt-20 text-6xl font-bold italic leading-6">
        Record Edit
      </h1>
      <div>
        <div
          style={{ borderWidth: "8px" }}
          className="rounded-2xl border border-solid border-black p-10"
        >
          <div className="source-file">
            <SettingsContext>
              <Edit uploadedFiles={uploadedFiles} />
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
                    <DragnDropEdit
                      audioFiles={audioFiles}
                      setAudioFiles={setAudioFiles}
                      onFileUpload={handleFileUpload}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <LiveRecord />
                  </Tab.Panel>
                  <Tab.Panel>
                    <main className="flex flex-col justify-center bg-gray-800 p-4 text-white">
                      <FMKeyboard />
                    </main>
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
