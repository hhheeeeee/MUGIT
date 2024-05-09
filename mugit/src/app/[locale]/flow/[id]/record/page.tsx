import { Dialog, Transition } from "@headlessui/react";
import dynamic from "next/dynamic";

export default function Record() {
  const Source = ["Burkinelectric.mp3", "Far_Apart.mp3", "Podcast.wav"];
  return (
    <div className="h-full px-20">
      <div className="flex">
        <h1 className="pb-10 pt-20 text-6xl font-bold italic leading-6">
          New Record
        </h1>
        <button className=" absolute bottom-[10%] h-12 w-[15%] rounded-full bg-pointyellow text-3xl font-bold italic text-black">
          Edit Record
        </button>
      </div>
      <div className="flex flex-wrap">
        <div className="w-1/2">
          <p className="py-3 text-xl">Record Message</p>
          <div className="relative h-12 w-[70%] rounded border-2 border-solid p-0">
            <input
              type="text"
              placeholder="Put your message on"
              className=" h-full w-[85%] rounded-full p-0 pl-4 outline-none"
              // onChange={(event) => handleInput(event)}
              // value={searchInput}
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="source-file">
            {/* {Source.map((source: string) => (
              <Demows key={source} musicname={source} />
            ))} */}
          </div>
        </div>
      </div>
      <button className=" absolute bottom-[10%] h-12 w-[15%] rounded-full bg-pointyellow text-3xl font-bold italic text-black">
        Record
      </button>
    </div>
  );
}
