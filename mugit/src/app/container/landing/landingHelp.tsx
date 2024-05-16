"use client";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import GoogleButton from "../google/googlebutton";

const WavesurferComp = dynamic(() => import("@/app/components/wavesurfer"), {
  ssr: false,
});

export default function LandingHelp() {
  const locale = useLocale();
  const router = useRouter();
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="relative flex min-h-[100%] w-full items-center justify-evenly bg-pointblack pt-10">
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="500"
          className="flex h-full w-[50%] flex-col justify-center  p-10 text-white"
        >
          <p className="pb-4 text-4xl font-bold">Trends</p>
          <p className="pb-4 text-2xl">
            전 세계에서 지금 가장 인기 있는 음악들을 둘러볼 수 있다. 음악들을
            둘러보면서 자신의 취향에 맞는 음악을 digging할 수 있다.
          </p>
          <button
            className="mr-3 w-[22%] self-center rounded border-2 border-pointblue bg-pointblue px-2 py-[4px] 
          text-white transition duration-300 hover:bg-[#0831d6]"
            onClick={() => router.push(`/${locale}/trends`)}
          >
            <span className="mx-1 text-base font-semibold">
              Trends 보러가기
            </span>
          </button>
        </div>
        <div
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-duration="500"
          className="flex h-full w-[50%] justify-center "
        >
          <Image
            width={600}
            height={200}
            alt="Trend"
            priority
            src="/trend.png"
          />
        </div>
      </div>

      <div className="flex min-h-[100%] w-full items-center justify-center  bg-pointblack">
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="500"
          className="flex h-full w-[50%] flex-col justify-center  p-10 text-white"
        >
          <p className="pb-4 text-4xl font-bold">Note</p>
          <p className="pb-4 text-2xl">
            나만의 음악 그래프의 시작점을 만들 수 있다. 시작점인 Note에서 새로운
            Flow를 생성한 뒤, 나만의 소스를 추가하여 원래 Note를 발전시킬 수
            있다.
          </p>
        </div>
        <div
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-duration="500"
          className="flex h-full w-[50%] justify-center "
        >
          <Image
            width={600}
            height={200}
            alt="Trend"
            priority
            src="/note.png"
          />
        </div>
      </div>

      <div className="flex min-h-[90%] w-full items-center justify-center bg-pointblack">
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="500"
          className="flex h-full w-[50%] justify-center "
        >
          <Image
            width={600}
            height={200}
            alt="Trend"
            priority
            src="/record.png"
          />
        </div>
        <div
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-duration="500"
          className="flex h-full w-[50%] flex-col justify-center  py-10 pr-20 text-white"
        >
          <p className="pb-4 text-right text-4xl font-bold">Record</p>
          <p className="pb-4 text-right text-2xl">
            하나의 Flow 안에는 여러 개의 Record가 있다. <br></br>예를 들어, 기타
            소스를 추가하고 그 뒤에 드럼 소스도 추가할 수 있다.
            <br></br>변경 사항이 있을 때마다 메시지를 기록할 수 있다.
          </p>
        </div>
      </div>

      <div className="flex min-h-[90%] w-full items-center justify-center  bg-pointblack">
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="500"
          className="flex h-full w-[50%] flex-col justify-center  p-10 text-white"
        >
          <p className="pb-4 text-4xl font-bold">Release</p>
          <p className="pb-4 text-2xl">
            여러개의 레코드가 쌓여 내가 만든 Flow가 완성되었다면 Release하여
            전체 공개로 할 수 있다.
          </p>
        </div>
        <div
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-duration="500"
          className="flex h-full w-[50%] justify-center "
        >
          <Image
            width={600}
            height={200}
            alt="Release"
            priority
            src="/release.png"
          />
        </div>
      </div>

      <div className="flex min-h-[40%] w-full flex-col items-center justify-center  bg-pointblack">
        <p className="mb-6 text-2xl text-white" data-aos="fade-up">
          Thank you for listening. Now Join in!
        </p>
        <GoogleButton />
        {/* <button
          data-aos="fade-up"
          className="w-[15%] self-center rounded border-2 border-pointblue bg-pointblue px-2 py-[4px] 
          text-white transition duration-300 hover:bg-[#0831d6]"
        >
          <span className="mx-1 text-base font-semibold">Create Account</span>
        </button> */}
      </div>
    </>
  );
}
