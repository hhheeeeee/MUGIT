"use client";

import { useState } from "react";
import IconInfo from "@/app/assets/icon/IconInfo";
import { descriptionScript } from "@/app/constants/description-script";

type propType = {
  target: string;
};

function Description({ target }: propType) {
  const [open, setOpen] = useState<boolean>(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      {open ? (
        <IconInfo
          tailwindCSS="cursor-pointer absolute top-0 left-[25%]"
          size="1.5rem"
          onClick={handleClick}
        />
      ) : (
        <>
          <IconInfo
            tailwindCSS="cursor-pointer absolute top-0 left-[25%]"
            size="1.5rem"
            color="#0033ff"
            onClick={handleClick}
          />

          <div className="absolute left-[27%] top-2 rounded-lg bg-gray-400 p-4 text-sm font-normal not-italic text-white shadow-lg">
            {descriptionScript[target]}
          </div>
        </>
      )}
    </>
  );
}

export default Description;
