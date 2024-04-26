"use client";
import IconCamera from "@/app/assets/icon/IconCamera";
import { useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type UpoladPicturePropsType = {
  imageSrc: string | StaticImport;
  setImageSrc: React.Dispatch<React.SetStateAction<string | StaticImport>>;
};

function UploadPicture({ imageSrc, setImageSrc }: UpoladPicturePropsType) {
  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        const file = reader.result as string;
        setImageSrc(file); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  return (
    <>
      <div className="flex w-3/12 flex-col items-center ">
        <Image
          width={254}
          height={254}
          alt="cover image"
          className="h-56 w-56"
          priority
          src={imageSrc}
        />
        <label
          htmlFor="uploadimg"
          className="mt-2 flex h-8 w-56 items-center justify-center gap-2 rounded-md bg-gray-300 text-sm hover:bg-[#c8cace] hover:shadow"
        >
          <IconCamera />
          Upload Image
        </label>
        <input
          id="uploadimg"
          className="hidden"
          accept="image/*"
          type="file"
          onChange={(e) => onUpload(e)}
        />
      </div>
    </>
  );
}

export default UploadPicture;
