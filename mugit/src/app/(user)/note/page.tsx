"use client";

import UploadPicture from "@/app/components/fileUpload/UploadPicture";
import MyRadioGroup from "@/app/container/note/RadioGroup";
import Description from "@/app/components/Description";
import UploadContainer from "@/app/components/fileUpload/UploadContainer";
import SelectTags from "@/app/components/selectTags";
import { useInput } from "@/app/hooks/useInput";
import { useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function NotePage() {
  const [name, handleChangeName] = useInput("");
  const [description, handleChangeDescription] = useInput("");
  const [privacy, setPrivacy] = useState<string>("Public");
  const [imageSrc, setImageSrc] = useState<string | StaticImport>(
    "/person.jpg"
  );
  const [file, setFile] = useState<File | null>(null);

  return (
    <main className="relative flex min-h-[90%] w-full flex-col px-52 py-10">
      <h1 className="border-b-2 border-solid border-gray-300 pl-5 text-5xl font-bold italic">
        New Note
      </h1>
      <Description target="note" />

      <div className="mt-4 flex w-full">
        {/* 사진 올리는 부분임 */}
        <UploadPicture imageSrc={imageSrc} setImageSrc={setImageSrc} />

        {/* 파일 가져오는 부분임 */}
        <div className="flex w-9/12 flex-col">
          <UploadContainer file={file} setFile={setFile} />

          <h2 className="mt-4 text-lg">Note Name</h2>
          <input
            value={name}
            onChange={handleChangeName}
            type="text"
            className="h-8 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 px-4"
          />

          <SelectTags />

          <div className="mt-4 flex w-full">
            <MyRadioGroup privacy={privacy} setPrivacy={setPrivacy} />
          </div>

          <h2 className="mt-4 text-lg">Description</h2>
          <textarea
            value={description}
            onChange={handleChangeDescription}
            placeholder="Describe your Note"
            className="h-52 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 p-4"
          />

          <div className="mt-5 flex w-full justify-end gap-x-3">
            <button className="rounded-lg border-2 border-solid bg-gray-100 px-10 py-3 text-gray-600">
              Cancel
            </button>
            <button className="rounded-lg bg-pointblue px-10 py-3 text-white">
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
