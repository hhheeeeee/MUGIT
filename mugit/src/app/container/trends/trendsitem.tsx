"use client";
// import { useRouter } from "next/navigation";
import { useRouter } from "@/navigation";
import { flowType } from "@/app/types/flow-type";

interface itemProp {
  item: flowType;
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
        {item.user.nickName}
      </p>
    </>
  );
}
