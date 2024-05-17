// "use client";
// import { useAtom } from "jotai";
// import { SetStateAction, useEffect, useState } from "react";
// import { useLocale, useTranslations } from "next-intl";
// import { useParams, useRouter } from "next/navigation";
// import { useAtomValue, useSetAtom } from "jotai";
// import { userAtom } from "@/app/store/atoms/user";
// import RecordMessage from "./recordMessage";
// import DragnDrop from "./editor/components/source/DragnDrop";
// import { releaseFlowAtom } from "@/app/store/atoms";
// import { fileToEdit } from "@/app/store/atoms/editfile";

// interface AudioFile {
//   file: File;
//   id: string;
// }

// const dummymessage = [
//   {
//     id: 1,
//     title: "Added band session recordings",
//     data: "2024-02-25",
//   },
// ];

// const getRecords = async (id: string | string[]) => {
//   try {
//     const response = await fetch(`https://mugit.site/api/flows/${id}/records`, {
//       method: "GET",
//       credentials: "include",
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   } catch (error) {
//     console.error("Failed to fetch records:", error);
//     return []; // 실패 시 빈 배열 반환
//   }
// };

// export default function RecordPage() {
//   const router = useRouter();
//   const locale = useLocale();
//   const userInfo = useAtomValue(userAtom);
//   const t = useTranslations("Form");
//   const [message, setMessage] = useState("");
//   const [records, setRecords] = useState<any>({});
//   const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
//   const [fileResponse, setFileResponse] = useState<any[]>([]);
//   const [recordResponse, setRecordResponse] = useState<any[]>([]);

//   const [sendFile, setSendFile] = useAtom(fileToEdit);
//   const params = useParams();

//   const handleChangeMessage = (event: {
//     target: { value: SetStateAction<string> };
//   }) => {
//     setMessage(event.target.value);
//   };

//   const addRecord = async () => {
//     if (audioFiles.length === 0 || message.length === 0) {
//       window.alert("빈 항목이 있습니다");
//       return;
//     }

//     let audioFormData = new FormData();

//     audioFiles.forEach((f) => {
//       audioFormData.append("source", f.file);
//     });

//     const filePost = await fetch("https://mugit.site/files", {
//       method: "POST",
//       credentials: "include",
//       body: audioFormData,
//     }).then((response) => response.json());

//     setFileResponse(filePost);

//     const newSources = filePost.list.map(
//       (file: { name: string; path: string }) => ({
//         name: file.name,
//         path: file.path,
//       })
//     );
//     const recordPost = await fetch(
//       `https://mugit.site/api/records/flows/${params.id}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           message,
//           preSources: [],
//           newSources,
//         }),
//       }
//     ).then((response) => response.json());

//     setRecordResponse(recordPost);

//     // 업데이트된 기록을 가져옵니다.
//     fetchUpdatedRecords();

//     // message와 audioFiles 상태를 초기화합니다.
//     setMessage("");
//     setAudioFiles([]);
//   };

//   const fetchUpdatedRecords = async () => {
//     const fetchedRecords = await getRecords(params.id);
//     setRecords(fetchedRecords);
//   };

//   async function goBack() {
//     router.push(`/${locale}/profile/${userInfo.id}`);
//   }

//   const goEdit = async () => {
//     if (audioFiles.length === 0) {
//       window.alert("편집할 파일이 없습니다");
//       return;
//     }

//     let audioFormData = new FormData();

//     audioFiles.forEach((f) => {
//       audioFormData.append("source", f.file);
//     });

//     const filePost = await fetch("https://mugit.site/files", {
//       method: "POST",
//       credentials: "include",
//       body: audioFormData,
//     }).then((response) => response.json());

//     setFileResponse(filePost);
//     setSendFile(filePost.list.map((f: { path: any }) => f.path));

//     console.log("sendFile:", sendFile);
//     const audioFilesString = encodeURIComponent(
//       JSON.stringify(filePost.list.map((f: { path: any }) => f.path))
//     );

//     router.push(`editor?audioFiles=${audioFilesString}`);
//     fetchUpdatedRecords();
//   };

//   useEffect(() => {
//     const fetchRecords = async () => {
//       const fetchedRecords = await getRecords(params.id);
//       setRecords(fetchedRecords);
//     };

//     console.log("params : ", params.id);
//     console.log("audio-files: ", audioFiles);
//     console.log("fileResponse: ", fileResponse);
//     console.log("recordResponse: ", recordResponse);
//     console.log("sendFile:", sendFile);
//     fetchRecords();
//   }, [params.id, audioFiles, fileResponse, recordResponse, sendFile]);

//   const setReleaseFlow = useSetAtom(releaseFlowAtom);
//   const handleClickRelease = (id: string | string[]) => {
//     router.push(`/${locale}/flow/${id}/release`);
//   };

//   return (
//     <main className="relative flex min-h-[90%] w-full flex-col px-52 py-10">
//       <h1 className="pb-10 pt-20 text-6xl font-bold italic leading-6">
//         Record
//       </h1>
//       <div className="mt-4 flex w-full sm:flex-col md:flex-col lg:flex-row">
//         <div className="flex w-9/12 flex-col md:mt-4 md:w-full lg:w-9/12">
//           <RecordMessage records={records} />
//           <h2 className="mt-4 text-lg">Record Message</h2>
//           <input
//             value={message}
//             onChange={handleChangeMessage}
//             type="text"
//             className="h-8 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 px-4"
//           />
//           <DragnDrop
//             audioFiles={audioFiles}
//             setAudioFiles={setAudioFiles}
//             // handleUploadFromDragnDrop={handleUploadFromDragnDrop}
//           />

//           <div className="mt-5 flex w-full justify-end gap-x-3">
//             <div className="flex flex-col justify-evenly">
//               <div>
//                 <button
//                   className="rounded-lg bg-pointyellow px-10 py-3 text-black"
//                   onClick={goEdit}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="rounded-lg bg-black px-10 py-3 text-white"
//                   onClick={goBack}
//                 >
//                   Cancel
//                 </button>
//               </div>
//               <button
//                 className="rounded-lg bg-black px-10 py-3 text-white"
//                 onClick={addRecord}
//               >
//                 Record
//               </button>

//               <button
//                 className=" mr-3 rounded border-2 border-pointblue bg-white p-1
//                     text-pointblue transition duration-300 hover:bg-pointblue hover:text-white"
//                 // transition duration-300 hover:scale-105 hover:bg-[#0831d6]
//                 onClick={() => handleClickRelease(params.id)}
//               >
//                 <span className="mx-1 text-base font-semibold">Release</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";
import { useAtom } from "jotai";
import { SetStateAction, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "@/app/store/atoms/user";
import { releaseFlowAtom } from "@/app/store/atoms";
import RecordMessage from "./recordMessage";

import { fileToEdit, fileToRelease } from "@/app/store/atoms/editfile";
import WavesurferComp from "@/app/components/wavesurfer";

import CustomizedAccordions from "./SourceComponent";
import DragnDropRecord from "./editor/components/source/DragnDropRecord";
import IconRecord from "@/app/assets/icon/IconRecord";
import { noteIcon } from "./editor/constants/icons";
interface AudioFile {
  file: File;
  id: string;
}

const dummymessage = [
  {
    id: 1,
    title: "Added band session recordings",
    data: "2024-02-25",
  },
];

const getRecords = async (id: string | string[]) => {
  try {
    const response = await fetch(`https://mugit.site/api/flows/${id}/records`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch records:", error);
    return []; // 실패 시 빈 배열 반환
  }
};

export default function RecordPage() {
  const router = useRouter();
  const locale = useLocale();
  const userInfo = useAtomValue(userAtom);
  const t = useTranslations("Form");
  const [message, setMessage] = useState("");
  const [records, setRecords] = useState<any>({});
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [fileResponse, setFileResponse] = useState<any[]>([]);
  const [recordResponse, setRecordResponse] = useState<any[]>([]);
  const [toEditFile, setToEditFile] = useAtom(fileToEdit);
  const editedFile = useAtomValue(fileToRelease);
  const params = useParams();

  const handleChangeMessage = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  const addRecord = async () => {
    if (audioFiles.length === 0 || message.length === 0) {
      window.alert("빈 항목이 있습니다");
      return;
    }

    let audioFormData = new FormData();

    audioFiles.forEach((f) => {
      audioFormData.append("source", f.file);
    });

    const filePost = await fetch("https://mugit.site/files", {
      method: "POST",
      credentials: "include",
      body: audioFormData,
    }).then((response) => response.json());

    setFileResponse(filePost);

    const newSources = filePost.list.map(
      (file: { name: string; path: string }) => ({
        name: file.name,
        path: file.path,
      })
    );
    const recordPost = await fetch(
      `https://mugit.site/api/records/flows/${params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message,
          preSources: [],
          newSources,
        }),
      }
    ).then((response) => response.json());

    setRecordResponse(recordPost);

    // 업데이트된 기록을 가져옵니다.
    fetchUpdatedRecords();

    // message와 audioFiles 상태를 초기화합니다.
    setMessage("");
    setAudioFiles([]);
  };

  const fetchUpdatedRecords = async () => {
    const fetchedRecords = await getRecords(params.id);
    setRecords(fetchedRecords);
  };

  async function goBack() {
    router.push(`/${locale}/profile/${userInfo.id}`);
  }

  const goEdit = async () => {
    if (audioFiles.length === 0) {
      window.alert("편집할 파일이 없습니다");
      return;
    }

    let audioFormData = new FormData();

    audioFiles.forEach((f) => {
      audioFormData.append("source", f.file);
    });

    const filePost = await fetch("https://mugit.site/files", {
      method: "POST",
      credentials: "include",
      body: audioFormData,
    }).then((response) => response.json());

    setFileResponse(filePost);
    setToEditFile(filePost.list.map((f: { path: any }) => f.path));

    const audioFilesString = encodeURIComponent(
      JSON.stringify(filePost.list.map((f: { path: any }) => f.path))
    );

    router.push(`editor?audioFiles=${audioFilesString}`);
    fetchUpdatedRecords();
  };

  useEffect(() => {
    const fetchRecords = async () => {
      const fetchedRecords = await getRecords(params.id);
      setRecords(fetchedRecords);
    };

    console.log("드래그앤드롭으로 들어온 파일: ", audioFiles);
    console.log("에디터로 보낸파일:", toEditFile);
    console.log("fileResponse: ", fileResponse);
    console.log("recordResponse: ", recordResponse);
    fetchRecords();
  }, [params.id, audioFiles, fileResponse, recordResponse, toEditFile]);

  const handleClickRelease = (id: string | string[]) => {
    router.push(`/${locale}/flow/${id}/release`);
  };

  return (
    <main className="relative flex min-h-[90%] w-full flex-col bg-gray-100 px-8 py-10">
      <div className="w-full flex-row">
        <h1 className="pb-10 pt-20 text-6xl font-bold italic text-gray-800">
          Record
        </h1>
        <div className="w-full">
          <button
            className="h-[45px] w-[150px] rounded-full bg-black text-2xl font-extrabold italic text-white transition  duration-200 hover:bg-gray-300 hover:text-black"
            onClick={goBack}
          >
            Cancel
          </button>
          <button
            className="h-[45px] w-[150px] rounded-full bg-pointblue text-2xl font-extrabold italic text-white transition duration-200 hover:bg-pointyellow hover:text-pointblue"
            onClick={() => handleClickRelease(params.id)}
          >
            Release
          </button>
        </div>
      </div>
      <div className="mt-4 flex w-full rounded-lg bg-white p-6 shadow-md sm:flex-col md:flex-col lg:flex-row">
        <div className="flex w-full flex-col ">
          <div className="mt-4 flex">
            {noteIcon}
            <div>
              <p className="px-4 text-2xl font-bold  text-gray-700">
                Record History
              </p>
            </div>
          </div>
          <RecordMessage records={records} />
          <div className="mt-8 flex">
            {noteIcon}
            <div>
              <p className="px-4 text-2xl font-bold  text-gray-700">
                Latest Version
              </p>
            </div>
          </div>
          <div className="m-4">
            <WavesurferComp
              musicPath={editedFile[0].flow}
              musicname={""}
              type="source"
            />
          </div>
          <CustomizedAccordions />
          <DragnDropRecord
            audioFiles={audioFiles}
            setAudioFiles={setAudioFiles}
          />
          <button
            className="h-[45px] w-[150px] rounded-full bg-black px-10 text-2xl font-extrabold italic text-white transition  duration-200 hover:bg-gray-300 hover:text-black"
            onClick={goEdit}
          >
            Edit
          </button>

          <div className="mt-8 flex">
            {noteIcon}
            <div>
              <p className="px-4 text-2xl font-bold  text-gray-700">
                Record Message
              </p>
            </div>
          </div>

          <div className="mt-4 flex">
            <input
              value={message}
              onChange={handleChangeMessage}
              type="text"
              className="h-10 w-full rounded-md border-2 border-solid border-gray-300 px-4 focus:border-pointblue"
            />
            <button
              className="mx-4 h-[45px] w-[150px] rounded-full bg-pointblue text-2xl font-extrabold italic text-white transition duration-200 hover:bg-pointyellow hover:text-pointblue"
              onClick={addRecord}
            >
              Record
            </button>
          </div>

          <div className="mt-5 flex w-full justify-end gap-x-4">
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-4"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
