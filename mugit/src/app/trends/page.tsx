import Searchbar from "../container/trends/searchbar";
import Trendslist from "../container/trends/trendslist";
import Image from "next/image";

export default function TrendsPage() {
  return (
    <main
      //   className="py-10s flex min-h-[90%] w-full flex-auto flex-col content-center items-center
      // justify-center bg-pointyellow"
      className="flex min-h-[90%] w-full flex-auto flex-col items-center bg-pointyellow py-10
    "
    >
      <div className="flex h-full w-7/12 flex-col ">
        <Searchbar />
        <Trendslist />
        <Image
          width={900}
          height={254}
          alt="cover image"
          src="/help/example.png"
          priority
        />
      </div>
    </main>
  );
}
