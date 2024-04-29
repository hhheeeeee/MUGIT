import Image from "next/image";

export default function Page() {
  return (
    // <div className="absolute left-[60%] top-1/3">
    <div className="">
      <Image
        src="/register2.webp"
        alt="register image"
        width={1920}
        height={1200}
        className="w-full"
      />
      <div>
        <p className="mb-3 text-xl font-semibold">Nickname</p>
        <input
          type="text"
          className="mb-3 w-60 rounded border-2 border-solid border-slate-500 p-1 text-lg focus:outline-none focus:ring focus:ring-slate-300"
        />
        <p className="mb-3 text-xl font-semibold">Description</p>
        <textarea className="h-32 w-60 rounded border-2 border-solid border-slate-500 p-1 text-lg focus:outline-none focus:ring focus:ring-slate-300" />
      </div>
    </div>
  );
}
