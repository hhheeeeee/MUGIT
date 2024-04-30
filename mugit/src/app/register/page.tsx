import Image from "next/image";
import { useState } from "react";

export default function Page() {
  return (
    <div className="mx-auto mt-[4%] flex w-11/12 justify-evenly">
      <Image
        src="/register2.webp"
        alt="register image"
        className="w-[60%] rounded-lg"
        width={1920}
        height={1200}
      />
      <div className="relative my-auto h-[350px]">
        <p className="mb-3 text-xl font-semibold">Nickname</p>
        <input
          type="text"
          className="mb-3 w-11/12 rounded border-2 border-solid border-slate-500 p-1 text-lg focus:outline-none focus:ring focus:ring-slate-300"
        />
        <p className="mb-3 text-xl font-semibold">Description</p>
        <textarea className="mb-3 h-32 w-11/12 rounded border-2 border-solid border-slate-500 p-1 text-lg focus:outline-none focus:ring focus:ring-slate-300" />
        <button className="absolute bottom-0 right-[8.33%] mb-5 rounded border-2 border-pointblue bg-pointblue px-2 py-1 text-lg font-semibold text-white">
          Sign Up
        </button>
      </div>
    </div>
    // <div className="absolute left-[33.33%] top-1/4 w-1/3 rounded bg-white/75 pl-[5%] pt-5">
    //   <p className="mb-3 text-xl font-semibold">Nickname</p>
    //   <input
    //     type="text"
    //     className="mb-3 w-5/6 rounded border-2 border-solid border-slate-500 p-1 text-lg focus:outline-none focus:ring focus:ring-slate-300"
    //   />
    //   <p className="mb-3 text-xl font-semibold">Description</p>
    //   <textarea className="mb-3 h-32 w-5/6 rounded border-2 border-solid border-slate-500 p-1 text-lg focus:outline-none focus:ring focus:ring-slate-300" />
    //   <button className="mb-5 rounded border-2 border-pointblue bg-pointblue px-2 py-1 text-lg font-semibold text-white">
    //     Sign Up
    //   </button>
    // </div>
  );
}
