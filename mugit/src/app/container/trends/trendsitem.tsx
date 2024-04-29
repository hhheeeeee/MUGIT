"use client";
import { useRouter } from "next/navigation";
type item = {
  id: number;
  title: string;
  name: string;
  soundurl: string;
  imgurl: string;
};

interface itemProp {
  item: item;
}

export default function TrendsItem({ item }: itemProp) {
  const router = useRouter();

  return (
    <>
      <p
        className="cursor-pointer text-xl hover:font-bold"
        onClick={() => router.push("/flow")}
      >
        {item.title}
      </p>
      <p
        className="mb-4 cursor-pointer text-base hover:font-bold"
        onClick={() => router.push("/profile")}
      >
        {item.name}
      </p>
    </>
  );
}
