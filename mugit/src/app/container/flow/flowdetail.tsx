import WavesurferComp from "@/app/components/wavesurfer";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";

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
        <WavesurferComp musicname={musicPath} />
      </div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="mx-auto flex justify-between">
              <span className="pt-0.5 font-medium">Sources</span>
              <Image
                src="/down.png"
                alt=""
                width={20}
                height={20}
                className={open ? "rotate-180 transform" : ""}
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              {sources.map((source) => (
                <div className="mb-5">
                  <p className="mb-2 text-xl font-medium">{source}</p>
                  <WavesurferComp musicname={source} />
                </div>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
