"use client";
import { useAtom } from "jotai";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "@/app/store/atoms/user";
import { releaseFlowAtom } from "@/app/store/atoms";
import RecordMessage from "./recordMessage";
import { mergeTracks } from "./MergeTracks";

import {
  addInitialValue,
  fileToAdd,
  fileToEdit,
  fileToPut,
  fileToRelease,
  flowInitialValue3,
} from "@/app/store/atoms/editfile";

import DragnDropRecord from "./editor/components/source/DragnDropRecord";
import IconRecord from "@/app/assets/icon/IconRecord";
import { noteIcon } from "./editor/constants/icons";
import Accordions from "./SourceComponent";
import AddedAccordions from "./AddedSourceComponent";
import MultiAudioPlayer from "./MultiAudioPlayer";
import WavesurferComp2 from "./WaveSurferComp2";
//=======================인터페이스 지역===================//
// 주고받을 오디오파일 형식
interface AudioFile {
  file: File;
  id: string;
  url: string;
}
interface User {
  id: number;
  nickName: string;
  profileImagePath: string;
}

interface Ancestor {
  id: number;
  user: User;
  title: string;
  authority: "PUBLIC";
  musicPath: string;
  coverPath: string;
  createdAt: string;
  hashtags: string[];
}

interface ParentItem {
  id: number;
  name: string;
  path: string;
}

type Parent = ParentItem[];
//=======================함수 지역===================//
// 현재 새 플로우에 쌓인 레코드 기록들 가져오는 함수
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
    return [];
  }
};

// 현재 플로우의 정보를 불러오는 함수
const getParent = async (id: string | string[]) => {
  try {
    const response = await fetch(`https://mugit.site/api/flows/${id}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data.record?.sources || [];
  } catch (error) {
    console.error("Failed to fetch records:", error);
    return [];
  }
};

export default function RecordPage() {
  //=======================변수 지역===================//
  const router = useRouter();
  const locale = useLocale();
  const userInfo = useAtomValue(userAtom);
  const t = useTranslations("Form");
  const [message, setMessage] = useState("");
  const [records, setRecords] = useState<any>({});

  // 주고받는 오디오파일
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);

  // post response 확인
  const [fileResponse, setFileResponse] = useState<any[]>([]);
  const [recordResponse, setRecordResponse] = useState<any[]>([]);

  // 릴리즈 전 파일 수정 과정
  const [toEditFile, setToEditFile] = useAtom(fileToEdit);
  const [finalFile, setFinalFile] = useAtom(fileToRelease);
  // 있던 파일들 중 둘 파일 선정
  const [putFile, setPutFile] = useAtom(fileToPut);
  const puttFile = useAtomValue(fileToPut);

  // 추가한 파일들 중 더할 파일 선정
  const [addFile, setAddFile] = useAtom(fileToAdd);
  const addedFile = useAtomValue(fileToAdd);

  const mergedSources = [...addedFile.source, ...puttFile.source];
  const params = useParams();
  const multiAudioPlayerRef = useRef<any>(null);
  // 유효한 오디오 URL인지 확인하는 함수 -
  const isValidAudioUrl = (url: string) => {
    return url && url !== flowInitialValue3.flow;
  };

  const [ancestorList, setAncestorList] = useState<Ancestor[]>([]);
  const [parentSource, setParentSource] = useState<Parent>([]);
  const [isOrigin, setIfIsNotOrigin] = useState(true);

  //=======================useEffect 지역===================//
  // 제일 위에 띄울 것 세팅
  // 제일처음 params에 맞는 History 딱 한번붙이기
  useEffect(() => {
    // 플로우 변화 감지시 레코드 새로 불러오기
    const fetchRecords = async () => {
      const fetchedRecords = await getRecords(params.id);
      // setRecordTimes(fetchedRecords.list.length);
      setRecords(fetchedRecords);
      console.log(">>>>>>>>>>>>>>레코드 : ", fetchedRecords);
    };
    fetchRecords();

    const fetchParent = async () => {
      const fetchedParent = await getParent(params.id);
      setParentSource(fetchedParent);
      console.log(">>>>>>>>>>>>>>>부모 소스 : ", fetchedParent);
    };
    fetchParent();
    const latestRecord =
      records.list && records.list.length > 0
        ? records.list[records.list.length - 1]
        : null;
    setPutFile({
      source: latestRecord
        ? latestRecord.sources.map(
            (item: { name: string; id: any; path: any }) => ({
              file: new File([], item.name),
              id: item.id,
              path: item.path,
            })
          )
        : [],
    });
  }, [params.id]);
  // finalFile을 계속 추적해서 재업
  useEffect(() => console.log(">>>>>>>>>웨이브 : ", finalFile), [finalFile]);

  // 레코드 추가시 finalFile 재렌더
  useEffect(() => {
    // origin이면 history, 아니면 마지막 레코드 불러오기 + 소스 추가되면 합성
    const getWave = async () => {
      if (isOrigin) {
        setFinalFile({
          flow: ancestorList[0]?.musicPath,
          source: parentSource.map((item) => ({
            file: new File([], item.name),
            id: item.id.toString(),
            url: item.path,
          })),
        });
      } else {
        setFinalFile({
          // 마지막 레코드 다 합친 파일
          flow: mergedTrackUrl,
          // 마지막 레코드 소스들로 시작해, 빼고 넣기 가능 (뻬고 넣을 때마다 재렌더)
          source: records.list[records.list.length - 1]?.sources.map(
            (item: { name: string; id: any; path: any }) => ({
              file: new File([], item.name),
              id: item.id,
              url: item.path,
            })
          ),
        });
      }
    };
    getWave();
    // console.log(
    //   "!!!!!!!!!!!!!!!!!!!!!!마지막 레코드:",
    //   records.list,
    //   records.list[records.list.length - 1]
    // );
  }, [records]);

  useEffect(() => {
    setPutFile({
      source: finalFile.source.map((item) => ({
        file: item.file,
        id: item.id,
        url: item.url,
      })),
    });
    setAudioFiles(mergedSources);
  }, []);

  // isOrigin은 제일 처음 레코드 후 계속 false
  useEffect(() => {
    if (records.list && records.list.length > 1) {
      setIfIsNotOrigin(false);
    }
    // console.log("레코드 개수 : ", records.list.length);
  }, [records]);

  //=======================내부 함수 지역===================//
  // 레코드 메시지 세팅하는 함수
  const handleChangeMessage = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  // 레코드 추가하는 함수
  const addRecord = async () => {
    // 레코드 메시지와 파일 모두 확인

    if (message.length === 0) {
      window.alert("빈 항목이 있습니다");
      return;
    }

    // 파일 서버에 저장
    let audioFormData = new FormData();

    // 새로 더한 파일
    addFile.source.forEach((f) => {
      audioFormData.append("source", f.file);
    });

    puttFile.source.forEach((f) => {
      audioFormData.append("source", f.file);
    });

    const filePost = await fetch("https://mugit.site/files", {
      method: "POST",
      credentials: "include",
      body: audioFormData,
    }).then((response) => response.json());

    setFileResponse(filePost);

    // response에서 파일 이름과 경로 추출
    const newSources = filePost.list.map(
      (file: { name: string; path: string }) => ({
        name: file.name,
        path: file.path,
      })
    );

    // const preSources = puttFile.source.map(
    //   (item: { file: any; name: string; path: string }) => ({
    //     file: item,
    //     name: item.file.id,
    //     path: item.url,
    //   })
    // );

    // record 서버에 저장
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

    // 업데이트된 기록을 가져오기
    fetchUpdatedRecords();

    // message와 audioFiles 상태를 초기화
    setMessage("");
    setAudioFiles([]);
    setAddFile(addInitialValue);
  };

  // record 다시 업데이트
  const fetchUpdatedRecords = async () => {
    const fetchedRecords = await getRecords(params.id);
    setRecords(fetchedRecords);
  };
  //=======================라우팅 지역===================//
  // 취소 시 라우팅
  async function goBack() {
    router.push(`/${locale}/profile/${userInfo.id}`);
  }

  // 편집시 라우팅
  const goEdit = async () => {
    // 파일 존재하는지 확인
    // if (audioFiles.length === 0) {
    //   window.alert("편집할 파일이 없습니다");
    //   return;
    // }

    setToEditFile({
      preSources: finalFile.source.map((item) => ({
        file: item.file,
        id: item.id,
        url: item.url,
      })),
      newSources: audioFiles.map((item) => ({
        file: item.file,
        id: item.file.name,
        url: URL.createObjectURL(item.file),
      })),
    });

    router.push(`editor`);
  };

  useEffect(() => {
    console.log("드래그앤드롭으로 들어온 파일: ", audioFiles);
    console.log("목록에 올린 파일: ", addedFile);
    console.log("$$$$$$$$$$$$$$$$$$ 파일: ", puttFile);
    console.log("에디터로 보내는 파일:", toEditFile);
    console.log("파일 서버 업로드 응답: ", fileResponse);
    console.log("레코드 서버 업로드 응답: ", recordResponse);
    console.log(
      "############",
      audioFiles.map((file) => ({
        file: file.file,
        id: file.file.name,
        url: URL.createObjectURL(file.file),
      })),
      "%%%%%%%%%%%%%",
      finalFile.source.map((item) => ({
        file: item.file,
        id: item.id,
        url: item.url,
      }))
    );
  }, [
    params.id,
    audioFiles,
    fileResponse,
    recordResponse,
    toEditFile,
    finalFile,
    addedFile,
  ]);
  const [mergedTrackUrl, setMergedTrackUrl] = useState("");

  const merge = async () => {
    const url = await mergeTracks(mergedSources);
    setMergedTrackUrl(url);
  };
  // 릴리즈 페이지로 라우팅
  const handleClickRelease = (id: string | string[]) => {
    merge();
    setAddFile(addInitialValue);
    setFinalFile({
      // 마지막 레코드 다 합친 파일
      flow: mergedTrackUrl,
      // 마지막 레코드 소스들로 시작해, 빼고 넣기 가능 (뻬고 넣을 때마다 재렌더)
      source: records.list[records.list.length - 1]?.sources.map(
        (item: { name: string; id: any; path: any }) => ({
          file: new File([], item.name),
          id: item.id,
          url: item.path,
        })
      ),
    });
    console.log("###################결국보낸거", fileToRelease);
    router.push(`/${locale}/flow/${id}/release`);
  };

  return (
    <main className="relative flex min-h-[90%] w-full flex-col bg-gray-100 px-8 py-10">
      <div className="w-full flex-row">
        <h1 className="pb-10 pt-20 text-6xl font-bold italic text-gray-800">
          Original Flow
        </h1>
      </div>
      <div className="mt-4 flex w-full rounded-lg bg-white p-6 shadow-md sm:flex-col md:flex-col lg:flex-row">
        <div className="flex w-full flex-col ">
          {/* 릴리즈 전 최종 버전의 레코드 */}
          <div className="latest-version rounded-md border-2 border-solid border-gray-300 bg-gray-100">
            <div className="latest-version-title m-8 flex">
              {noteIcon}
              <p className=" px-4 text-2xl font-bold  text-gray-700">
                {isOrigin ? "Origin" : "Latest Version"}
              </p>
            </div>
            <div className="m-4">
              <div className="mt-8">
                {/* <MultiAudioPlayer audioFiles={mergedSources} />
                <WavesurferComp
                  musicPath={finalFile.flow}
                  musicname={""}
                  type="source"
                /> */}
                <WavesurferComp2
                  musicname=""
                  musicPath={
                    isOrigin ? ancestorList[0]?.musicPath : mergedTrackUrl
                  }
                  type="source"
                  onPlay={() => multiAudioPlayerRef.current.handlePlay()}
                  onStop={() => multiAudioPlayerRef.current.handleStop()}
                />
                <MultiAudioPlayer
                  ref={multiAudioPlayerRef}
                  audioFiles={mergedSources}
                />
              </div>
              <div className="mt-8">
                <Accordions />
                <AddedAccordions />
              </div>
            </div>
            <div className="my-6 flex w-full justify-end gap-x-4 pr-4">
              <button
                className="mx-4 h-[45px] w-[150px] rounded-full bg-black text-2xl  italic text-white transition  duration-200 hover:bg-gray-300 hover:text-black"
                onClick={goBack}
              >
                Cancel
              </button>
              <button
                className=" h-[45px] w-[150px] rounded-full bg-pointblue text-2xl italic text-white transition duration-200 hover:bg-pointyellow hover:text-pointblue"
                onClick={() => handleClickRelease(params.id)}
              >
                Release
              </button>
            </div>
          </div>

          {/* 새 소스 파일 업로드 드롭다운 박스 */}
          <div className="define-source">
            <div className="define-source-title ml-8 mt-16 flex">
              {noteIcon}
              <p className="px-4 text-2xl font-bold  text-gray-700">
                Define New Source File
              </p>
            </div>
            <DragnDropRecord
              audioFiles={audioFiles}
              setAudioFiles={setAudioFiles}
            />
            <div className="my-6 flex w-full justify-end gap-x-4 pr-4">
              <button
                className="rounded-lg bg-black  px-4 py-2 text-2xl  italic text-white transition  duration-200 hover:bg-gray-300 hover:text-black"
                onClick={goEdit}
              >
                Open Editor
              </button>
            </div>
          </div>
          {/* 그동안의 레코드 */}
          {isOrigin ? (
            <></>
          ) : (
            <div className="record-history">
              <div className="record-history-title ml-8 mt-16 flex">
                {noteIcon}

                <p className="mb-4 px-4 text-2xl font-bold text-gray-700">
                  Record History
                </p>
              </div>
              <RecordMessage records={records} />
            </div>
          )}

          {/* 레코드 메시지*/}
          <div className="record-message">
            <div className="record-message-title ml-8 mt-16 flex">
              {noteIcon}

              <p className="px-4 text-2xl font-bold  text-gray-700">
                Record Message
              </p>
            </div>
            <div className="record-message-input mt-4 flex-col">
              <input
                value={message}
                onChange={handleChangeMessage}
                type="text"
                className="h-10 w-full rounded-md border-2 border-solid border-gray-300 px-4 focus:border-pointblue"
              />
              <div className="my-6 flex w-full justify-end gap-x-4 pr-4">
                <button
                  className="mt-8 h-[45px] w-[150px] rounded-full bg-pointblue text-2xl italic text-white transition duration-200 hover:bg-pointyellow hover:text-pointblue"
                  onClick={addRecord}
                >
                  Record
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
