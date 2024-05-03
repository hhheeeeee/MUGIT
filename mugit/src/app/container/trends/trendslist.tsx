import { dummytrends } from "./dummy";
import Image from "next/image";
import PlayHover from "./PlayHover";
import TrendsItem from "./trendsitem";
import { useTranslations } from "next-intl";

export default function Trendslist() {
  const t = useTranslations("Trends");

  return (
    <div className="flex h-full w-full flex-col">
      <p className="text-4xl font-bold">{t("title")}</p>
      <div className="grid w-full grid-cols-3 gap-x-6">
        {dummytrends.map((item) => {
          return (
            <div key={item.id}>
              <div className="relative h-[180px] rounded-lg">
                <Image
                  className="rounded-lg "
                  src={item.imgurl}
                  alt={item.name}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <PlayHover item={item} />
              </div>
              <TrendsItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
