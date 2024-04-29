"use client";

// import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

type PrivacyRadioPropType = {
  privacy: string;
  setPrivacy: React.Dispatch<React.SetStateAction<string>>;
};

function MyRadioGroup({ privacy, setPrivacy }: PrivacyRadioPropType) {
  return (
    <>
      <RadioGroup value={privacy} onChange={setPrivacy}>
        <RadioGroup.Label className="mt-4 text-lg">Privacy</RadioGroup.Label>
        <div className="my-4 flex gap-x-6">
          <RadioGroup.Option value="Public">
            {({ checked }) => (
              <span
                className={
                  checked
                    ? "rounded-md bg-gray-500 px-4 py-2 text-white"
                    : "rounded-md border-2 border-solid border-gray-300 bg-gray-100 px-4 py-2 "
                }
              >
                Public
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="Private">
            {({ checked }) => (
              <span
                className={
                  checked
                    ? "rounded-md bg-gray-500 px-4 py-2 text-white"
                    : "rounded-md border-2 border-solid border-gray-300 bg-gray-100 px-4 py-2 "
                }
              >
                Private
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="Protected">
            {({ checked }) => (
              <span
                className={
                  checked
                    ? "rounded-md bg-gray-500 px-4 py-2 text-white"
                    : "rounded-md border-2 border-solid border-gray-300 bg-gray-100 px-4 py-2 "
                }
              >
                Protected
              </span>
            )}
          </RadioGroup.Option>
        </div>
      </RadioGroup>
    </>
  );
}

export default MyRadioGroup;
