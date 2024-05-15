"use client";
// import { useRouter } from "next/navigation";
import { useRouter } from "@/navigation";
import { FlowType } from "@/app/types/flowtype";

interface itemProp {
  item: FlowType;
}

export default function TrendsItem({ item }: itemProp) {
  const router = useRouter();

  return (
    <>
      <p
        className="cursor-pointer text-xl hover:underline"
        onClick={() => router.push(`/flow/${item.id}`)}
      >
        {item.title}
      </p>
      <p
        className="mb-4 cursor-pointer text-base hover:underline"
        onClick={() => router.push(`/profile/${item.user.id}`)}
      >
        {item.user.nickName}
      </p>
    </>
  );
}
