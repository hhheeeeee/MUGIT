import Line from "./container/landing/line";

export default function Home() {
  return (
    <main
      className="flex h-[90%] w-full flex-auto flex-col content-center items-center justify-center
      bg-pointblack"
    >
      s
      <p
        className="flex w-full flex-col items-center justify-between bg-pointblack text-[14rem]
          font-extrabold italic text-pointyellow"
      >
        MUGIT
      </p>
      <div className="w-full items-center justify-between bg-pointblack">
        <Line />
        <p className="mt-5 text-center text-[2rem] font-bold text-pointyellow">
          Make your own Flow
        </p>
      </div>
    </main>
  );
}
