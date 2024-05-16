"use client";
import Description from "@/app/components/Description";
import UploadPicture from "@/app/components/fileUpload/UploadPicture";
import RecordMessage from "../record/recordMessage";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInput } from "@/app/hooks/useInput";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import SelectTags from "@/app/components/selectTags";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
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

const WavesurferComp = dynamic(() => import("@/app/components/wavesurfer"), {
  ssr: false,
});

export default function NotePage() {
  const t = useTranslations("Form");
  const [name, handleChangeName] = useInput("");
  const [description, handleChangeDescription] = useInput("");
  const [imageSrc, setImageSrc] = useState<string>(
    "https://mugit.site/files/default/flow.png"
  );

  const [records, setRecords] = useState({ list: dummymessage });
  const [tags, setTags] = useState<string[]>([]);
  const [imagefile, setImageFile] = useState<any>(null);
  const params = useParams();

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

  return (
    <main className="relative flex min-h-[90%] w-full flex-col px-52 py-10">
      <h1 className="relative border-b-2 border-solid border-gray-300 pl-5 text-5xl font-bold italic">
        Release Note
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

          <WavesurferComp musicPath="" musicname="" type="source" />

          <h2 className="mt-6 text-lg">{t("recordMessages")}</h2>
          <RecordMessage records={records} />

          <h2 className="mt-4 text-lg">{t("description")}</h2>
          <textarea
            value={description}
            onChange={handleChangeDescription}
            placeholder={t("descriptionPlaceholder")}
            className="h-52 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 p-4"
          />

          <div className="mt-5 flex w-full justify-end gap-x-3">
            <button className="rounded-lg border-2 border-solid bg-gray-100 px-10 py-3 text-gray-600">
              {t("cancel")}
            </button>
            <button className="rounded-lg bg-pointblue px-10 py-3 text-white">
              {t("save")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
