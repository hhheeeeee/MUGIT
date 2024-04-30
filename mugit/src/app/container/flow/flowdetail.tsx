import WavesurferComp from "@/app/components/wavesurfer";
import { Disclosure } from "@headlessui/react";
// import Image from "next/image";

export default function FlowDetail({
  musicPath,
  sources,
}: {
  musicPath: string;
  sources: string[];
}) {
  return (
    <div className="">
      <div className="mb-5">
        <p className="mb-2 text-xl font-medium">{musicPath}</p>
        <WavesurferComp musicname={musicPath} type="main" />
      </div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="mx-auto flex justify-between">
              <span className="mr-1 pt-[2.5px] font-medium">Sources</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    open
                      ? "m4.5 15.75 7.5-7.5 7.5 7.5"
                      : "m19.5 8.25-7.5 7.5-7.5-7.5"
                  }
                />
              </svg>
            </Disclosure.Button>
            <Disclosure.Panel>
              {sources.map((source) => (
                <div key={source} className="mb-5">
                  <p className="mb-2 text-xl font-medium">{source}</p>
                  <WavesurferComp musicname={source} type="source" />
                </div>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
