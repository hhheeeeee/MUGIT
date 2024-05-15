// "use client";

// import { SetStateAction, useEffect, useRef, useState } from "react";
// // import { StaticImport } from "next/dist/shared/lib/get-img-props";
// import { useLocale, useTranslations } from "next-intl";
// import fireToast from "@/app/utils/fireToast";

// import { useParams, useRouter } from "next/navigation";
// import { useAtomValue } from "jotai";
// import { userAtom } from "@/app/store/atoms/user";
// import DragnDrop from "./editor/components/source/DragnDrop";
// import {
//   recordIcon,
//   stopIcon,
//   playIcon,
//   pauseIcon,
//   downloadIcon,
// } from "./editor/constants/icons";

// import RecordMessage from "./recordMessage";
// import UserInfo from "@/app/container/profile/userinfo";

// const dummymessage = [
//   {
//     id: 1,
//     title: "Added band session recordings",
//     data: "2024-02-25",
//   },
//   {
//     id: 2,
//     title: "Added Chorus",
//     data: "2024-03-24",
//   },
//   {
//     id: 3,
//     title: "Added Keyboard Session",
//     data: "2024-04-11",
//   },
// ];

// export default function RecordPage() {
//   const router = useRouter();
//   const locale = useLocale();
//   const userInfo = useAtomValue(userAtom);
//   const t = useTranslations("Form");
//   const [message, setMessage] = useState<string>("");
//   const [records, setRecords] = useState({ list: dummymessage });
//   const [audioFiles, setAudioFiles] = useState([]);
//   const [fileResponse, setFileResponse] = useState([]);
//   const [recordResponse, setRecordResponse] = useState([]);

//   const params = useParams<{
//     [x: string]: any;
//     tag: string;
//     item: string;
//   }>();

//   // 해당 플로우의 모든 레코드를 불러와 나열하는 메서드
//   const getRecords = async () => {
//     try {
//       const response = await fetch(
//         `https://mugit.site/api/flows/${params.id}/records`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return await response.json();
//     } catch (error) {
//       console.error("Failed to fetch records:", error);
//       fireToast({ type: "error", title: "Failed to fetch records" });
//       return []; // 실패 시 빈 배열 반환
//     }
//   };

//   // 메시지가 바뀌면 set해주는 메서드
//   const handleChangeMessage = (event: {
//     target: { value: SetStateAction<string> };
//   }) => {
//     setMessage(event.target.value);
//   };

//   // const addRecord = async () => {
//   //   if (audioFiles.length == 0 || message.length == 0) {
//   //     fireToast({
//   //       type: "경고",
//   //       title: "빈 항목이 있습니다",
//   //     });
//   //     return;
//   //   }

//   //   // 각 파일을 FormData에 추가
//   //   let audioFormData = new FormData();
//   //   audioFiles.forEach((file) => {
//   //     audioFormData.append("source", file);
//   //   });

//   //   // 그 FormData를 files에 추가하는 로직
//   //   await fetch("https://mugit.site/files", {
//   //     method: "POST",
//   //     credentials: "include",
//   //     body: audioFormData,
//   //   }).then(async (response) => setFileResponse(await response.json()));

//   //   // router.push(`${locale}/profile/${userInfo.id}`);

//   //   // // 아이디 참조?
//   //   // fetch("https://mugit.site/api/records/flows/5", {
//   //   //   method: "POST",
//   //   //   headers: {
//   //   //     "Content-Type": "application/json",
//   //   //   },
//   //   //   credentials: "include",
//   //   //   body: JSON.stringify({
//   //   //     message: message,
//   //   //     preSources: [],
//   //   //     newSources: [audioFiles.map((file)=> {"name" : file.name, "path" : Response.path.})],
//   //   //   }),
//   //   // }).then((response) => response.json());
//   // };

//   // 레코드를 추가하는 메서드
//   const addRecord = async () => {
//     // 파일이나 메시지가 없을 때
//     if (audioFiles.length === 0 || message.length === 0) {
//       fireToast({
//         type: "경고",
//         title: "빈 항목이 있습니다",
//       });
//       return;
//     }

//     // 각 파일을 FormData에 추가
//     let audioFormData = new FormData();
//     audioFiles.forEach((file) => {
//       audioFormData.append("source", file);
//     });

//     try {
//       // 파일 업로드하는 첫 번째 POST 요청
//       const filePost = await fetch("https://mugit.site/files", {
//         method: "POST",
//         credentials: "include",
//         body: audioFormData,
//       }).then((response) => response.json());

//       setFileResponse(filePost);

//       // response에 왜 아무 것도 안 뜨는지?
//       console.log("File upload response:", filePost);

//       // 파일과 메시지를 record에 기록하는 두 번째 POST 요청
//       if (filePost?.path) {
//         const recordPost = await fetch(
//           `https://mugit.site/api/records/flows/${params.id}`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify({
//               message: message,
//               preSources: [],
//               newSources: filePost.map((file: { name: any; path: any }) => ({
//                 type: "source",
//                 name: file.name,
//                 path: file.path,
//               })),
//             }),
//           }
//         ).then((response) => response.json());
//         setRecordResponse(recordPost);
//         console.log("Record creation response:", recordPost);
//         fireToast({
//           type: "success",
//           title: "Record created successfully",
//         });
//       } else {
//         fireToast({
//           type: "error",
//           title: "파일 업로드 실패",
//         });
//       }
//     } catch (error) {
//       console.error("Error in addRecord:", error);
//       fireToast({
//         type: "error",
//         title: "요청 처리 중 오류 발생",
//       });
//     }
//   };

//   async function goBack() {
//     router.push(`/${locale}/profile/${userInfo.id}`);
//   }
//   async function goEdit() {
//     router.push(`editor`);
//   }
//   /// 파일은 DB로 보내고
//   /// 쌓인 레코드는 Edit에 들어가면 볼 수 있도록
//   /// New Record 페이지에서 Edit을 클릭하면 편집 페이지로 감
//   /// 편집 마친 파일들은 원래의 소스를 대치하고, New Record를 구성하는 새로운 파일이 됨

//   useEffect(() => {
//     const fetchRecords = async () => {
//       const fetchedRecords = await getRecords();
//       setRecords(fetchedRecords);
//     };
//     console.log("params : ", params.id);
//     console.log("audio-files: ", audioFiles);
//     console.log("fileResponse: ", fileResponse);
//     fetchRecords();
//   }, [audioFiles, fileResponse]);

//   return (
//     <main className="relative flex min-h-[90%] w-full flex-col px-52 py-10">
//       <h1 className="pb-10 pt-20 text-6xl font-bold italic leading-6">
//         Record
//       </h1>
//       <div className="mt-4 flex w-full sm:flex-col md:flex-col lg:flex-row">
//         <div className="flex w-9/12 flex-col  md:mt-4 md:w-full lg:w-9/12">
//           {/* <RecordList /> */}
//           <RecordMessage records={records} />
//           <h2 className="mt-4 text-lg">
//             {/* {t("record")} */}
//             Record Message
//           </h2>
//           <input
//             value={message}
//             onChange={handleChangeMessage}
//             type="text"
//             className="h-8 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 px-4"
//           />
//           {/* <p>{params}</p> */}
//           <DragnDrop audioFiles={audioFiles} setAudioFiles={setAudioFiles} />
//           <div className="mt-5 flex w-full justify-end gap-x-3">
//             <div className="flex flex-col justify-evenly">
//               <div>
//                 <button
//                   className="rounded-lg bg-pointyellow px-10 py-3 text-black"
//                   onClick={goEdit}
//                 >
//                   Edit
//                   {/* {t("edit")} */}
//                 </button>
//                 <button
//                   className="rounded-lg
//                   bg-black px-10 py-3 text-white"
//                   onClick={goBack}
//                 >
//                   Cancel
//                 </button>
//               </div>
//               {/* <button
//                 className="rounded-lg bg-pointblue px-10 py-3 text-white"
//                 onClick={handleSave}
//               >
//                 Record
//                 {t("release")}
//               </button> */}
//               <button
//                 className="rounded-lg
//                   bg-black px-10 py-3 text-white"
//                 onClick={addRecord}
//               >
//                 Record
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { SetStateAction, useEffect, useState } from "react";
// import { useLocale, useTranslations } from "next-intl";
// import fireToast from "@/app/utils/fireToast";
// import { useParams, useRouter } from "next/navigation";
// import { useAtomValue } from "jotai";
// import { userAtom } from "@/app/store/atoms/user";
// import DragnDrop from "./editor/components/source/DragnDrop";
// import RecordMessage from "./recordMessage";

// const dummymessage = [
//   {
//     id: 1,
//     title: "Added band session recordings",
//     data: "2024-02-25",
//   },
//   {
//     id: 2,
//     title: "Added Chorus",
//     data: "2024-03-24",
//   },
//   {
//     id: 3,
//     title: "Added Keyboard Session",
//     data: "2024-04-11",
//   },
// ];

// const getRecords = async (id: any) => {
//   try {
//     const response = await fetch(`https://mugit.site/api/flows/${id}/records`, {
//       method: "GET",
//       credentials: "include",
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Failed to fetch records:", error);
//     fireToast({ type: "error", title: "Failed to fetch records" });
//     return []; // 실패 시 빈 배열 반환
//   }
// };

// export default function RecordPage() {
//   const router = useRouter();
//   const locale = useLocale();
//   const userInfo = useAtomValue(userAtom);
//   const t = useTranslations("Form");
//   const [files, setFiles] = useState<File[]>([]);
//   const [message, setMessage] = useState<string>("");
//   const [records, setRecords] = useState({ list: dummymessage });
//   const [audioFiles, setAudioFiles] = useState([]);
//   const [fileResponse, setFileResponse] = useState([]);

//   const params = useParams<{
//     [x: string]: any;
//     tag: string;
//     item: string;
//   }>();

//   const handleChangeMessage = (event: {
//     target: { value: SetStateAction<string> };
//   }) => {
//     setMessage(event.target.value);
//   };
//   const addRecord = async () => {
//     if (audioFiles.length === 0 || message.length === 0) {
//       fireToast({
//         type: "경고",
//         title: "빈 항목이 있습니다",
//       });
//       return;
//     }

//     // 각 파일을 FormData에 추가
//     let audioFormData = new FormData();
//     audioFiles.forEach((file) => {
//       audioFormData.append("source", file);
//     });

//     try {
//       // 파일 업로드 요청
//       const fileResponse = await fetch("https://mugit.site/files", {
//         method: "POST",
//         credentials: "include",
//         body: audioFormData,
//       }).then((response) => response.json());

//       console.log("File upload response:", fileResponse);

//       // 파일 응답 처리 및 두 번째 POST 요청
//       if (fileResponse?.path) {
//         const recordResponse = await fetch(
//           `https://mugit.site/api/records/flows/${params.id}`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify({
//               message: message,
//               preSources: [],
//               newSources: fileResponse.map(
//                 (file: { name: any; path: any }) => ({
//                   type: "source",
//                   name: file.name,
//                   path: file.path,
//                 })
//               ),
//             }),
//           }
//         ).then((response) => response.json());

//         console.log("Record creation response:", recordResponse);
//         fireToast({
//           type: "success",
//           title: "Record created successfully",
//         });
//       } else {
//         fireToast({
//           type: "error",
//           title: "파일 업로드 실패",
//         });
//       }
//     } catch (error) {
//       console.error("Error in addRecord:", error);
//       fireToast({
//         type: "error",
//         title: "요청 처리 중 오류 발생",
//       });
//     }
//   };

//   // const addRecord = async () => {
//   //   if (audioFiles.length === 0 || message.length === 0) {
//   //     fireToast({
//   //       type: "경고",
//   //       title: "빈 항목이 있습니다",
//   //     });
//   //     return;
//   //   }

//   //   // 각 파일을 FormData에 추가
//   //   let audioFormData = new FormData();
//   //   audioFiles.forEach((file) => {
//   //     audioFormData.append("source", file);
//   //   });

//   //   // 파일 업로드 요청
//   //   const fileResponse = await fetch("https://mugit.site/files", {
//   //     method: "POST",
//   //     credentials: "include",
//   //     body: audioFormData,
//   //   }).then((response) => response.json());

//   //   // 파일 응답 처리 및 두 번째 POST 요청
//   //   if (fileResponse?.path) {
//   //     await fetch(`https://mugit.site/api/records/flows/${params.id}`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       credentials: "include",
//   //       body: JSON.stringify({
//   //         message: message,
//   //         preSources: [],
//   //         newSources: fileResponse.map((file: { name: any; path: any }) => ({
//   //           type: "source",
//   //           name: file.name,
//   //           path: file.path,
//   //         })),
//   //       }),
//   //     }).then((response) => response.json());
//   //   } else {
//   //     fireToast({
//   //       type: "error",
//   //       title: "파일 업로드 실패",
//   //     });
//   //   }
//   // };

//   async function goBack() {
//     router.push(`/${locale}/profile/${userInfo.id}`);
//   }

//   async function goEdit() {
//     const audioFilesString = encodeURIComponent(JSON.stringify(audioFiles));
//     router.push(`/editor?audioFiles=${audioFilesString}`);
//   }

//   useEffect(() => {
//     const fetchRecords = async () => {
//       const fetchedRecords = await getRecords(params.id);
//       setRecords(fetchedRecords);
//     };
//     console.log("params : ", params.id);
//     console.log("audio-files: ", audioFiles);
//     console.log("fileResponse: ", fileResponse);
//     fetchRecords();
//   }, [audioFiles, fileResponse]);

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
//           <DragnDrop audioFiles={audioFiles} setAudioFiles={setAudioFiles} />
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
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { SetStateAction, useEffect, useState } from "react";
// import { useLocale, useTranslations } from "next-intl";
// import fireToast from "@/app/utils/fireToast";
// import { useParams, useRouter } from "next/navigation";
// import { useAtomValue } from "jotai";
// import { userAtom } from "@/app/store/atoms/user";
// import DragnDrop from "./editor/components/source/DragnDrop";
// import RecordMessage from "./recordMessage";

// const dummymessage = [
//   {
//     id: 1,
//     title: "Added band session recordings",
//     data: "2024-02-25",
//   },
//   {
//     id: 2,
//     title: "Added Chorus",
//     data: "2024-03-24",
//   },
//   {
//     id: 3,
//     title: "Added Keyboard Session",
//     data: "2024-04-11",
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
//     return await response.json();
//   } catch (error) {
//     console.error("Failed to fetch records:", error);
//     fireToast({ type: "error", title: "Failed to fetch records" });
//     return []; // 실패 시 빈 배열 반환
//   }
// };

// export default function RecordPage() {
//   const router = useRouter();
//   const locale = useLocale();
//   const userInfo = useAtomValue(userAtom);
//   const t = useTranslations("Form");
//   const [message, setMessage] = useState("");
//   const [records, setRecords] = useState({ list: dummymessage });
//   const [audioFiles, setAudioFiles] = useState([]);
//   const [fileResponse, setFileResponse] = useState([]);
//   const [recordResponse, setRecordResponse] = useState([]);

//   const params = useParams();

//   const handleChangeMessage = (event: {
//     target: { value: SetStateAction<string> };
//   }) => {
//     setMessage(event.target.value);
//   };

//   const addRecord = async () => {
//     if (audioFiles.length === 0 || message.length === 0) {
//       fireToast({
//         type: "경고",
//         title: "빈 항목이 있습니다",
//       });
//       return;
//     }

//     let audioFormData = new FormData();
//     audioFiles.forEach((file) => {
//       audioFormData.append("source", file);
//     });

//     try {
//       const filePost = await fetch("https://mugit.site/files", {
//         method: "POST",
//         credentials: "include",
//         body: audioFormData,
//       });

//       // 응답 데이터의 내용을 확인합니다.
//       const filePostJson = await filePost.json();
//       setFileResponse(filePostJson);
//       console.log("File upload response:", filePostJson);

//       // 파일 업로드가 성공적이었는지 확인합니다.
//       if (filePost.ok && filePostJson.length > 0) {
//         const recordPost = await fetch(
//           `https://mugit.site/api/records/flows/${params.id}`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify({
//               message: message,
//               preSources: [],
//               newSources: filePostJson.map(
//                 (file: { name: any; path: any }) => ({
//                   type: "source",
//                   name: file.name,
//                   path: file.path,
//                 })
//               ),
//             }),
//           }
//         );

//         const recordPostJson = await recordPost.json();
//         setRecordResponse(recordPostJson);
//         console.log("Record creation response:", recordPostJson);

//         if (recordPost.ok) {
//           fireToast({
//             type: "success",
//             title: "Record created successfully",
//           });
//         } else {
//           fireToast({
//             type: "error",
//             title: "Record creation failed",
//           });
//         }
//       } else {
//         fireToast({
//           type: "error",
//           title: "파일 업로드 실패",
//         });
//       }
//     } catch (error) {
//       console.error("Error in addRecord:", error);
//       fireToast({
//         type: "error",
//         title: "요청 처리 중 오류 발생",
//       });
//     }
//   };

//   async function goBack() {
//     router.push(`/${locale}/profile/${userInfo.id}`);
//   }

//   async function goEdit() {
//     const audioFilesString = encodeURIComponent(JSON.stringify(audioFiles));
//     router.push(`/editor?audioFiles=${audioFilesString}`);
//   }

//   useEffect(() => {
//     const fetchRecords = async () => {
//       const fetchedRecords = await getRecords(params.id);
//       setRecords(fetchedRecords);
//     };
//     console.log("params : ", params.id);
//     console.log("audio-files: ", audioFiles);
//     console.log("fileResponse: ", fileResponse);
//     fetchRecords();
//   }, [audioFiles, fileResponse]);

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
//           <DragnDrop audioFiles={audioFiles} setAudioFiles={setAudioFiles} />
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
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
// "use client";

// import { SetStateAction, useEffect, useState } from "react";
// import { useLocale, useTranslations } from "next-intl";
// import { useParams, useRouter } from "next/navigation";
// import { useAtomValue } from "jotai";
// import { userAtom } from "@/app/store/atoms/user";
// import DragnDrop from "./editor/components/source/DragnDrop";
// import RecordMessage from "./recordMessage";

// const dummymessage = [
//   {
//     id: 1,
//     title: "Added band session recordings",
//     data: "2024-02-25",
//   },
//   {
//     id: 2,
//     title: "Added Chorus",
//     data: "2024-03-24",
//   },
//   {
//     id: 3,
//     title: "Added Keyboard Session",
//     data: "2024-04-11",
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
//     return await response.json();
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
//   const [records, setRecords] = useState({ list: dummymessage });
//   const [audioFiles, setAudioFiles] = useState<File[]>();
//   const [fileResponse, setFileResponse] = useState([]);
//   const [recordResponse, setRecordResponse] = useState([]);
//   const params = useParams();

//   const handleChangeMessage = (event: {
//     target: { value: SetStateAction<string> };
//   }) => {
//     setMessage(event.target.value);
//   };

//   const addRecord = async () => {

//     const audioFormData = new FormData();
//     audioFiles.map((file) => audioFormData.append("source", file));
//     console.log("audioFormData:", audioFormData);
//     const filePost = await fetch("https://mugit.site/files", {
//       method: "post",
//       credentials: "include",
//       body: audioFormData,
//     }).then((response) => response.json());

//     setFileResponse(filePost);

//     const recordPost = await fetch(
//       `https://mugit.site/api/records/flows/${params.id}`,
//       {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           message: message,
//           preSources: [],
//           newSources: [
//             filePost.list.map((file: { name: any; path: any }) => ({
//               type: "source",
//               name: file.name,
//               path: file.path,
//             })),
//           ],
//         }),
//       }
//     ).then((response) => response.json());
//     setRecordResponse(recordPost);
//   };
//   async function goBack() {
//     router.push(`/${locale}/profile/${userInfo.id}`);
//   }

//   async function goEdit() {
//     const audioFilesString = encodeURIComponent(JSON.stringify(audioFiles));
//     router.push(`/editor?audioFiles=${audioFilesString}`);
//   }

//   useEffect(() => {
//     const fetchRecords = async () => {
//       const fetchedRecords = await getRecords(params.id);
//       setRecords(fetchedRecords);
//     };
//     console.log("params : ", params.id);
//     console.log("audio-files: ", audioFiles);
//     console.log("fileResponse: ", fileResponse);
//     console.log("recordResponse: ", recordResponse);

//     fetchRecords();
//   }, [audioFiles, fileResponse, recordResponse]);

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
//           <DragnDrop audioFiles={audioFiles} setAudioFiles={setAudioFiles} />
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
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import { SetStateAction, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/atoms/user";
import DragnDrop from "./editor/components/source/DragnDrop";
import RecordMessage from "./recordMessage";

const dummymessage = [
  {
    id: 1,
    title: "Added band session recordings",
    data: "2024-02-25",
  },
  {
    id: 2,
    title: "Added Chorus",
    data: "2024-03-24",
  },
  {
    id: 3,
    title: "Added Keyboard Session",
    data: "2024-04-11",
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
    return await response.json();
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
  const [records, setRecords] = useState({ list: dummymessage });
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [fileResponse, setFileResponse] = useState([]);
  const [recordResponse, setRecordResponse] = useState([]);
  const params = useParams();

  const handleChangeMessage = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  const addRecord = async () => {
    if (audioFiles.length === 0 || message.length === 0) {
      console.log("빈 항목이 있습니다");
      return;
    }

    const audioFormData = new FormData();
    audioFiles.forEach((file) => audioFormData.append("source", file));

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
  };

  async function goBack() {
    router.push(`/${locale}/profile/${userInfo.id}`);
  }

  async function goEdit() {
    const audioFilesString = encodeURIComponent(JSON.stringify(audioFiles));
    router.push("editor");
  }

  useEffect(() => {
    const fetchRecords = async () => {
      const fetchedRecords = await getRecords(params.id);
      setRecords(fetchedRecords);
    };

    console.log("params : ", params.id);
    console.log("audio-files: ", audioFiles);
    console.log("fileResponse: ", fileResponse);
    console.log("recordResponse: ", recordResponse);

    fetchRecords();
  }, [params.id, audioFiles, fileResponse, recordResponse]);

  return (
    <main className="relative flex min-h-[90%] w-full flex-col px-52 py-10">
      <h1 className="pb-10 pt-20 text-6xl font-bold italic leading-6">
        Record
      </h1>
      <div className="mt-4 flex w-full sm:flex-col md:flex-col lg:flex-row">
        <div className="flex w-9/12 flex-col md:mt-4 md:w-full lg:w-9/12">
          <RecordMessage records={records} />
          <h2 className="mt-4 text-lg">Record Message</h2>
          <input
            value={message}
            onChange={handleChangeMessage}
            type="text"
            className="h-8 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 px-4"
          />
          <DragnDrop audioFiles={audioFiles} setAudioFiles={setAudioFiles} />
          <div className="mt-5 flex w-full justify-end gap-x-3">
            <div className="flex flex-col justify-evenly">
              <div>
                <button
                  className="rounded-lg bg-pointyellow px-10 py-3 text-black"
                  onClick={goEdit}
                >
                  Edit
                </button>
                <button
                  className="rounded-lg bg-black px-10 py-3 text-white"
                  onClick={goBack}
                >
                  Cancel
                </button>
              </div>
              <button
                className="rounded-lg bg-black px-10 py-3 text-white"
                onClick={addRecord}
              >
                Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
