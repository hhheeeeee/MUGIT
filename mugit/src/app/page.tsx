"use client";
import Line from "./container/landing/line";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col items-center bg-[#121214]">
      <p className="w-screen flex flex-col items-center justify-between text-[#f1f609] text-[14rem] italic font-extrabold bg-[#121214]">
        MUGIT
      </p>
      <div className="w-screen items-center justify-between  bg-[#121214]">
        <Line />
        <p className="text-[#f1f609] text-[2rem] font-bold text-center p-2">
          Make your own Flow
        </p>
      </div>
    </main>
  );
}
