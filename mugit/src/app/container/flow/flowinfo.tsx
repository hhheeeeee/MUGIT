"use client";

import { Tab } from "@headlessui/react";
import FlowDetail from "./flowdetail";
import dynamic from "next/dynamic";
import Image from "next/image";
import ButtonGroup from "./flowbutton";
import { apiUrl } from "@/app/store/atoms";
import { useParams } from "next/navigation";
import { useState } from "react";
import useAsync from "@/app/hooks/useAsync";
import { FlowDetailType } from "@/app/types/flowtype";

const Tree = dynamic(() => import("./tree"), { ssr: false });
interface PropType {
  page: string;
}

async function getFlowDetail(id: string): Promise<FlowDetailType> {
  const response = await fetch("https://mugit.site/api" + "/flows/" + id, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Data fetch failed");
  }
  return response.json();
}

export default function FlowInfo({ page }: PropType) {
  const params = useParams<{ id: string }>();
  const [state, refetch] = useAsync(() => getFlowDetail(params.id), []);

  const { loading, data: flowDetail, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <>
      {flowDetail && (
        <div className="mx-auto w-2/3">
          <div className="mb-5 mt-10 flex w-full">
            <Image
              width={254}
              height={254}
              alt="cover image"
              src={flowDetail.coverPath}
              className="mr-5 h-48 w-48 rounded"
              priority
            />
            <div className="relative w-full">
              <div className="mb-3 flex">
                {flowDetail.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="mr-0.5 rounded-lg border-2 border-solid border-slate-300 px-1 text-sm text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-5xl font-semibold">{flowDetail.title}</p>
              <p className="text-2xl">{flowDetail.user.nickName}</p>
              <ButtonGroup item={flowDetail} page={page} />
            </div>
          </div>
          <hr className="border-2" />
          <p className="mt-5 text-xl">{flowDetail.message}</p>
          <div className="my-10">
            <Tab.Group>
              <Tab.List>
                <Tab
                  className={({ selected }) =>
                    (selected
                      ? "font-bold underline decoration-4 underline-offset-[7.3px] focus:outline-none "
                      : "") + "pr-5 text-2xl"
                  }
                >
                  Details
                </Tab>
                <Tab
                  className={({ selected }) =>
                    (selected
                      ? "font-bold underline decoration-4 underline-offset-[7.3px] focus:outline-none "
                      : "") + "pr-5 text-2xl"
                  }
                >
                  Tree
                </Tab>
              </Tab.List>
              <hr className="border-2" />
              <Tab.Panels>
                <Tab.Panel className="mt-5">
                  <FlowDetail item={flowDetail} />
                </Tab.Panel>
                <Tab.Panel>
                  <Tree />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      )}
    </>
  );
}
