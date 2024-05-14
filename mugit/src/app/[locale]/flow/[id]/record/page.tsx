"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useLocale, useTranslations } from "next-intl";
import fireToast from "@/app/utils/fireToast";

import { useParams, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/atoms/user";
import DragnDrop from "./editor/components/source/DragnDrop";
import {
  recordIcon,
  stopIcon,
  playIcon,
  pauseIcon,
  downloadIcon,
} from "./editor/constants/icons";

import RecordMessage from "./recordMessage";
import UserInfo from "@/app/container/profile/userinfo";

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

const getRecords = async () => {
  try {
    const response = await fetch("https://mugit.site/api/flows/5/records", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch records:", error);
    fireToast({ type: "error", title: "Failed to fetch records" });
    return []; // 실패 시 빈 배열 반환
  }
};

export default function RecordPage() {
  const router = useRouter();
  const locale = useLocale();
  const userInfo = useAtomValue(userAtom);
  const t = useTranslations("Form");
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const [records, setRecords] = useState({ list: dummymessage });
  const [audioFiles, setAudioFiles] = useState([]);

  const params = useParams<{
    [x: string]: any;
    tag: string;
    item: string;
  }>();

  const handleChangeMessage = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };
  const addRecord = async () => {
    if (audioFiles.length == 0 || message.length == 0) {
      fireToast({
        type: "경고",
        title: "빈 항목이 있습니다",
      });
      return;
    }

    // 각 파일을 FormData에 추가
    let audioFormData = new FormData();
    audioFiles.forEach((file) => {
      audioFormData.append("source", file);
    });

    // 그 FormData를 files에 추가하는 로직
    await fetch("https://mugit.site/files", {
      method: "POST",
      credentials: "include",
      body: audioFormData,
    }).then((response) => response.json());

    // router.push(`${locale}/profile/${userInfo.id}`);

    // // 아이디 참조?
    // fetch("https://mugit.site/api/records/flows/5", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    //   body: JSON.stringify({
    //     message: message,
    //     preSources: [],
    //     newSources: [audioFiles],
    //   }),
    // }).then((response) => response.json());
  };

  async function goBack() {
    router.push(`/${locale}/profile/${userInfo.id}`);
  }
  async function goEdit() {
    router.push(`editor`);
  }
  /// 파일은 DB로 보내고
  /// 쌓인 레코드는 Edit에 들어가면 볼 수 있도록
  /// edit 버튼 클릭하면 Record List 지금껏 로컬에 쌓은 레코드 이름들
  /// 레코드 추가하기 누르면 나오는 New Record 페이지임   /// 레코드 추가하면 로컬에 저장된 지금껏 쌓은 레코드 이름들 뒤에 새로운 레코드가 추가됨
  /// New Record 페이지에서 Edit을 클릭하면 편집 페이지로 감
  /// 편집 마친 파일들은 원래의 소스를 대치하고, New Record를 구성하는 새로운 파일이 됨

  // const getRecord = async () => {
  //   const records = await fetch("https://mugit.site/api/flows/1/records", {
  //     method: "GET",
  //     credentials: "include",
  //   }).then((response) => response.json());
  // };

  useEffect(() => {
    const fetchRecords = async () => {
      const fetchedRecords = await getRecords();
      setRecords(fetchedRecords);
    };
    console.log("params : ", params.id);
    fetchRecords();
  }, []);

  return (
    <main className="relative flex min-h-[90%] w-full flex-col px-52 py-10">
      <h1 className="pb-10 pt-20 text-6xl font-bold italic leading-6">
        Record
      </h1>
      <div className="mt-4 flex w-full sm:flex-col md:flex-col lg:flex-row">
        <div className="flex w-9/12 flex-col  md:mt-4 md:w-full lg:w-9/12">
          {/* <RecordList /> */}
          <RecordMessage records={records} />
          <h2 className="mt-4 text-lg">
            {/* {t("record")} */}
            Record Message
          </h2>
          <input
            value={message}
            onChange={handleChangeMessage}
            type="text"
            className="h-8 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 px-4"
          />
          {/* <p>{params}</p> */}
          <DragnDrop audioFiles={audioFiles} setAudioFiles={setAudioFiles} />
          <div className="mt-5 flex w-full justify-end gap-x-3">
            <div className="flex flex-col justify-evenly">
              <div>
                <button
                  className="rounded-lg bg-pointyellow px-10 py-3 text-black"
                  onClick={goEdit}
                >
                  Edit
                  {/* {t("edit")} */}
                </button>
                <button
                  className="rounded-lg 
                  bg-black px-10 py-3 text-white"
                  onClick={goBack}
                >
                  Cancel
                </button>
              </div>
              {/* <button
                className="rounded-lg bg-pointblue px-10 py-3 text-white"
                onClick={handleSave}
              >
                Record
                {t("release")}
              </button> */}
              <button
                className="rounded-lg 
                  bg-black px-10 py-3 text-white"
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
