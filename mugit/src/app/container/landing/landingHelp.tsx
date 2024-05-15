"use client";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import useRefFocusEffect from "@/app/hooks/useRefFocusEffect";

const WavesurferComp = dynamic(() => import("@/app/components/wavesurfer"), {
  ssr: false,
});

export default function LandingHelp() {
  const scrollHandler = () => {
    window.scrollTo({
      top: window.innerHeight * 2,
      behavior: "smooth",
    });
  };

  const examplefetch = () => {
    scrollHandler();
  };

  const { elementRef } = useRefFocusEffect<HTMLDivElement>(examplefetch, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="relative flex min-h-[100%] w-full flex-col items-center bg-pointblack pt-10">
        {/* <div className="relative flex w-full flex-col items-center">
          <div className="z-4 flex w-full items-center justify-around gap-4">
            <Image src="/flow.gif" alt="note-flow" width={500} height={500} />
            <div className=" flex w-[45%] flex-col justify-around">
              <p className="text-bold text-6xl italic text-gray-100">Note</p>
              <span className="text-bold mt-4  text-3xl text-gray-100">
                Note : Note에 대한 설명
              </span>

              <WavesurferComp
                musicname="note"
                musicPath="/sound/note.mp3"
                type="?"
              />
            </div>
          </div>
        </div> */}
      </div>
      <div
        ref={elementRef}
        className="h-4 border-2 border-solid border-pointblack bg-pointblack"
      >
        {" "}
      </div>
      <div className="flex  min-h-[100%] w-full bg-pointblack">
        {/* <div
          className=" flex w-[30%] flex-col items-center justify-center"
          data-aos="fade-right"
          data-aos-offset="500"
          data-aos-duration="500"
        >
          <Image
            src="/blueVinyl.png"
            alt="note-flow"
            width={600}
            height={600}
          />
          <p className="text-5xl font-bold text-gray-100 ">Flow</p>
          <p className="text-2xl font-bold text-gray-100 ">Flow에 대한 설명</p>
        </div>
        <div className="flex w-[70%] flex-col items-center justify-center">
          {[1, 2, 3].map((item) => {
            return (
              <>
                <div
                  key={item}
                  className="my-6 flex w-[100%] items-center justify-center gap-6 "
                  data-aos="fade-left"
                  data-aos-offset="100"
                  data-aos-duration="500"
                >
                  <p className="text-2xl text-gray-100">record</p>
                  <div className="w-[60%]">
                    <WavesurferComp
                      musicname="note"
                      musicPath="/sound/note.mp3"
                      type="?"
                    />
                  </div>
                </div>
                {item < 3 && (
                  <p
                    className="text-2xl text-white"
                    data-aos="fade-left"
                    data-aos-offset="100"
                    data-aos-duration="500"
                  >
                    +
                  </p>
                )}
              </>
            );
          })}
        </div> */}
      </div>
      <div className="min-h-[90%] w-full bg-blue-100">
        여기 설명 들어갈 거임
      </div>
    </>
  );
}
