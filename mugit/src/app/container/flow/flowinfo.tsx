import Image from "next/image";

const tempInfo = {
  coverPath: "/Rectangle 35.png",
  hashtags: ["Hip Hop", "R&B", "한국", "ssafy"],
  title: "Bus Driver",
  nickname: "Static Duo",
};

export default function FlowInfo() {
  return (
    <div className="mx-auto my-10 flex w-3/5">
      <div className="flex w-full">
        <Image
          width={254}
          height={254}
          alt="cover image"
          src={tempInfo.coverPath}
          className="mr-5 h-48 w-48 rounded"
          priority
        />
        <div>
          <div className="mb-5 flex">
            {tempInfo.hashtags.map((tag) => (
              <span
                key={tag}
                className="mr-1 rounded-lg border-2 border-solid border-slate-300 p-1 text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-4xl">{tempInfo.title}</p>
          <p className="text-2xl">{tempInfo.nickname}</p>
          <div className="text-right">
            <button className="mr-2 rounded bg-pointblue px-2 text-lg text-white">
              <Image
                width={20}
                height={20}
                alt="network icon"
                src={"/network.png"}
                className="mr-2 inline-block pt-0.5"
              />
              <span className="text-[20px]">New Flow</span>
            </button>
            <button className="inline-block rounded border-2 border-solid border-black p-0.5">
              <Image
                width={22}
                height={22}
                alt="heart icon"
                src={"/free-icon-heart.png"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
