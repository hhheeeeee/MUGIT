import AudioSprites from "../components/audioSprites/audiosprites";
import Image from "next/image";

export default function Help() {
  return (
    <main className="min-h-[90%] w-full bg-[#A6FF72]">
      <div>
        <Image
          width={254}
          height={254}
          alt="cover image"
          className="slide-in-left 0.6s both h-56 w-56 animate-[wiggle_1s_ease-in-out_infinite] ease-out"
          priority
          src="/help/recordplaying.gif"
        />
      </div>
    </main>
  );
}
