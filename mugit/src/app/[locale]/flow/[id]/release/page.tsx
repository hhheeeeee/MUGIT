"use client";
import Description from "@/app/components/Description";
import UploadPicture from "@/app/components/fileUpload/UploadPicture";
import RecordMessage from "../record/recordMessage";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInput } from "@/app/hooks/useInput";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import SelectTags from "@/app/components/selectTags";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { fileToRelease } from "@/app/store/atoms/editfile";

const WavesurferComp = dynamic(() => import("@/app/components/wavesurfer"), {
  ssr: false,
});

export default function ReleasePage() {
  const t = useTranslations("Form");
  const [name, handleChangeName] = useInput("");
  const [description, handleChangeDescription] = useInput("");
  const [imageSrc, setImageSrc] = useState<string>(
    "https://mugit.site/files/default/flow.png"
  );
  const locale = useLocale();
  const router = useRouter();

  const [records, setRecords] = useState({});
  const [tags, setTags] = useState<string[]>([]);
  const [imagefile, setImageFile] = useState<any>(null);
  const params = useParams();
  const [flowFile, setFlowFile] = useState(null);
  const [recordFiles, setRecordFiles] = useState([]);
  const toReleaseFile = useAtomValue(fileToRelease);
  const getRecords = async (id: string | string[]) => {
    try {
      const response = await fetch(
        `https://mugit.site/api/flows/${id}/records`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error("Failed to fetch records:", error);
      return []; // 실패 시 빈 배열 반환
    }
  };

  useEffect(() => {
    if (params.id) {
      getRecords(params.id).then((fetchedRecords) =>
        setRecords(fetchedRecords)
      );
    }
  }, [params.id]);

  // useEffect(() => {
  //   if (params.id) {
  //     getRecords(params.id).then((fetchedRecords) =>
  //       setRecords(fetchedRecords)
  //     );
  //   }

  //   if (records.list) {
  //     setRecordFiles(
  //       records.list.map((file) => file.sources.map((src) => src.path))
  //     );
  //     console.log(
  //       "records&&&&&&&&&&&&&&&&:",
  //       records.list.map((file) => file.sources.map((src) => src.path))
  //     );
  //   }
  // }, [params.id]);

  // // 처음에 완성된 플로우 파일 가져오기
  // useEffect(() => {
  //   setFlowFile(
  //     "https://mugit.site/files/efc94627-899d-4765-a10f-fda58598b1de.mp3"
  //   );
  // }, []);

  const releaseFlow = async () => {
    let imageFormData = new FormData();
    imageFormData.append("image", imagefile);

    let audioFormData = new FormData();
    audioFormData.append("source", toReleaseFile.flow);
    toReleaseFile.source.map((item) =>
      audioFormData.append("source", item.file)
    );

    const [postPic, postAudio] = await Promise.all([
      fetch("https://mugit.site/files", {
        method: "POST",
        credentials: "include",
        body: imageFormData,
      }).then((response) => response.json()),
      fetch("https://mugit.site/files", {
        method: "POST",
        credentials: "include",
        body: audioFormData,
      }).then((response) => response.json()),
    ]);

    const postRelease = await fetch(
      `https://mugit.site/api/flows/${params.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: name,
          message: description,
          authority: "PUBLIC",
          // files: [postPic.list[0], postAudio.list[0]],
          files: [toReleaseFile.flow, ...toReleaseFile.source],
          hashtags: tags,
        }),
      }
    ).then((res) => {
      console.log("반응?:", res);
    });

    console.log(
      "%%%%%%%%%%%%%%%%%%%%%%%%%%%postrelease : ",
      postPic,
      postAudio,
      postRelease
    );

    router.push(`/${locale}/flow/${params.id}`);
  };

  return (
    <main className="relative flex min-h-[90%] w-full flex-col px-52 py-10">
      <h1 className="relative border-b-2 border-solid border-gray-300 pl-5 text-5xl font-bold italic">
        Release Flow
      </h1>
      <Description target="release" />

      <div className="mt-4 flex w-full">
        {/* 사진 올리는 부분임 */}
        <UploadPicture
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          imagefile={imagefile}
          setImageFile={setImageFile}
        />
        s
        <div className="flex w-9/12 flex-col">
          <h2 className=" text-lg">{t("note")}</h2>
          <input
            type="text"
            className="h-8 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 px-4"
          />

          <h2 className="mt-4 text-lg">{t("flow")}</h2>
          <input
            value={name}
            onChange={handleChangeName}
            type="text"
            className="h-8 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 px-4"
          />

          <SelectTags selected={tags} setSelected={setTags} />

          <WavesurferComp
            musicPath={toReleaseFile.flow}
            musicname={""}
            type="source"
          />

          <h2 className="mt-6 text-lg">{t("recordMessages")}</h2>
          <RecordMessage records={records} />

          <h2 className="mt-4 text-lg">{t("description")}</h2>
          <textarea
            value={description}
            onChange={handleChangeDescription}
            placeholder={"Flow에 대한 설명을 적어주세요"}
            className="h-52 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 p-4"
          />

          <div className="mt-5 flex w-full justify-end gap-x-3">
            <button className="rounded-lg border-2 border-solid bg-gray-100 px-10 py-3 text-gray-600">
              {t("cancel")}
            </button>
            <button
              className="rounded-lg bg-pointblue px-10 py-3 text-white"
              onClick={releaseFlow}
            >
              {t("save")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
