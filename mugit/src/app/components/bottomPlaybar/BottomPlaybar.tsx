"use client";

import { useAtom, useAtomValue } from "jotai";
import BottomController from "./BottomController";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { isplaying, nowPlaying, SonginitialValue } from "@/app/store/atoms";

const BottomPlaybar = () => {
  const [playing, setPlaying] = useAtom(isplaying);
  const [song, setSong] = useAtom(nowPlaying);

  const handleClose = () => {
    localStorage.clear();
    setPlaying(false);
    setSong(SonginitialValue);
  };

  return (
    <>
      {playing === true ? (
        <>
          <div className="pt-4"></div>
          <div className="fixed bottom-0 left-0 flex h-24 w-full items-center justify-center bg-pointblue px-10">
            <div className="relative h-20 w-20 rounded-lg bg-red-500"></div>
            <div className="mx-4 flex flex-col">
              <p className="mb-2 text-2xl font-bold text-pointyellow">
                {song?.title}
              </p>
              <p className="text-pointyellow">{song?.name}</p>
            </div>
            <BottomController />
            <div
              className="fixed bottom-16 right-5 text-white"
              onClick={() => handleClose()}
            >
              X
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default BottomPlaybar;
