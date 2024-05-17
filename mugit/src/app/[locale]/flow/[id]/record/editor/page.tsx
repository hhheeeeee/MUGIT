// "use client";
// import React, { useEffect, useState } from "react";
// import Edit from "./edit"; // Edit 컴포넌트를 import합니다.
// import { SettingsContext } from "./context/settingsContext";
// import { Tab } from "@headlessui/react";
// import LiveRecord from "./components/record/Liverecord";
// import DragnDropEdit from "./components/source/DragnDropEdit.jsx";
// import { useSearchParams } from "next/navigation";
// import FMKeyboard from "./components/synth/FmKeyboard";

// export default function Editor() {
//   const searchParams = useSearchParams();
//   const [audioFiles, setAudioFiles] = useState([]);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

//   useEffect(() => {
//     const audioFilesParam = searchParams.get("audioFiles");
//     if (audioFilesParam) {
//       try {
//         const parsedAudioFiles = JSON.parse(
//           decodeURIComponent(audioFilesParam)
//         );
//         const files = parsedAudioFiles.map(
//           (fileData: { data: string; type: any; name: string }) => {
//             const byteString = atob(fileData.data.split(",")[1]);
//             const ab = new ArrayBuffer(byteString.length);
//             const ia = new Uint8Array(ab);
//             for (let i = 0; i < byteString.length; i++) {
//               ia[i] = byteString.charCodeAt(i);
//             }
//             const blob = new Blob([ab], { type: fileData.type });
//             return new File([blob], fileData.name);
//           }
//         );
//         setAudioFiles(files);
//       } catch (error) {
//         console.error("Failed to parse audioFiles from URL", error);
//       }
//     }
//   }, [searchParams]);

//   const handleFileUpload = (files: File[]) => {
//     setUploadedFiles(files);
//   };
//   return (
//     <div className="h-full px-20">
//       <h1 className="pb-10 pt-20 text-6xl font-bold italic leading-6">
//         Record Edit
//       </h1>
//       <div>
//         <div
//           style={{ borderWidth: "8px" }}
//           className="rounded-2xl border border-solid border-black p-10"
//         >
//           <div className="source-file">
//             <SettingsContext>
//               <Edit uploadedFiles={uploadedFiles} />
//             </SettingsContext>
//             <div className="w-4/ mx-auto my-10">
//               <Tab.Group>
//                 <Tab.List>
//                   <Tab
//                     className={({ selected }) =>
//                       (selected
//                         ? "font-bold underline underline-offset-[6px] focus:outline-none "
//                         : "") + "pr-5 text-2xl"
//                     }
//                   >
//                     Source
//                   </Tab>
//                   <Tab
//                     className={({ selected }) =>
//                       (selected
//                         ? "font-bold underline underline-offset-[6px] focus:outline-none "
//                         : "") + "pr-5 text-2xl"
//                     }
//                   >
//                     Voice
//                   </Tab>
//                   <Tab
//                     className={({ selected }) =>
//                       (selected
//                         ? "font-bold underline underline-offset-[6px] focus:outline-none "
//                         : "") + "pr-5 text-2xl"
//                     }
//                   >
//                     Synth
//                   </Tab>
//                 </Tab.List>
//                 <hr />
//                 <Tab.Panels>
//                   <Tab.Panel>
//                     <DragnDropEdit
//                       audioFiles={audioFiles}
//                       setAudioFiles={setAudioFiles}
//                       onFileUpload={handleFileUpload}
//                     />
//                   </Tab.Panel>
//                   <Tab.Panel>
//                     <LiveRecord onFileUpload={handleFileUpload} />
//                   </Tab.Panel>
//                   <Tab.Panel>
//                     <main className="flex flex-col justify-center bg-gray-800 p-4 text-white">
//                       <FMKeyboard />
//                     </main>
//                   </Tab.Panel>
//                 </Tab.Panels>
//               </Tab.Group>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import Edit from "./edit"; // Edit 컴포넌트를 import합니다.
import { SettingsContext } from "./context/settingsContext";
import { Tab } from "@headlessui/react";
import LiveRecord from "./components/record/Liverecord";
import DragnDropEdit from "./components/source/DragnDropEdit";
import { useSearchParams } from "next/navigation";
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
          (fileData: { data: string; type: any; name: string }) => {
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
    <div className="h-full bg-gray-100 px-20">
      <h1 className="pb-10 pt-20 text-4xl font-bold text-gray-800">
        Record Edit
      </h1>
      <div>
        <div className="rounded-xl bg-white p-10 shadow-md">
          <div className="source-file">
            <SettingsContext>
              <Edit uploadedFiles={uploadedFiles} />
            </SettingsContext>
            <div className="mx-auto my-10 w-4/5">
              <Tab.Group>
                <Tab.List className="flex space-x-4 border-b-2 border-gray-300">
                  <Tab
                    className={({ selected }) =>
                      selected
                        ? "border-b-2 border-blue-600 pb-2 font-bold text-blue-600"
                        : "pb-2 text-gray-600"
                    }
                  >
                    Source
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      selected
                        ? "border-b-2 border-blue-600 pb-2 font-bold text-blue-600"
                        : "pb-2 text-gray-600"
                    }
                  >
                    Voice
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      selected
                        ? "border-b-2 border-blue-600 pb-2 font-bold text-blue-600"
                        : "pb-2 text-gray-600"
                    }
                  >
                    Synth
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <DragnDropEdit
                      audioFiles={audioFiles}
                      setAudioFiles={setAudioFiles}
                      onFileUpload={handleFileUpload}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <LiveRecord onFileUpload={handleFileUpload} />
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
      </div>
    </div>
  );
}
