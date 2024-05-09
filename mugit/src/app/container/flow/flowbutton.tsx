"use client";
// import { useRouter } from "next/navigation";
import { useRouter } from "@/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FlowDetailType } from "@/app/types/flowtype";
import { IconPlus } from "@/app/assets/icon/flow/IconPlus";
import LikeButton from "./likebutton";

interface PropType {
  item: FlowDetailType;
  page: string;
  isLogined: string;
}

export default function ButtonGroup({ item, page, isLogined }: PropType) {
  const router = useRouter();

  if (isLogined !== "true") return <></>;

  return (
    <div className="absolute bottom-0 right-0 flex">
      {page === "detail" ? (
        <>
          <button
            className=" mr-3 rounded border-2 border-pointblue bg-pointblue px-1 py-[3px] 
          text-white transition duration-300 hover:bg-[#0831d6]"
            onClick={() => router.push(`/flow/${item.id}/working`)}
          >
            <IconPlus />
            <span className="mx-1 text-base font-semibold">New Flow</span>
          </button>
          <LikeButton item={item} isLogined={isLogined} />
        </>
      ) : (
        <button
          className=" mr-3 rounded border-2 border-pointblue bg-pointblue p-1 
          text-white transition duration-300 hover:bg-[#0831d6]"
          // transition duration-300 hover:scale-105 hover:bg-[#0831d6]
          onClick={() => router.push(`/flow/${item.id}/working`)}
        >
          <span className="mx-1 text-base font-semibold">Edit</span>
        </button>
      )}
    </div>
  );
}
