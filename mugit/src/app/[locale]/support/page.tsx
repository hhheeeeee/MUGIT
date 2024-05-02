"use client";

import TextAnimation from "@/app/components/text-animation";
import DescriptionIcons from "@/app/container/landing/description-icons";

export default function SupportPage() {
  return (
    <div className="flex min-h-[90%] w-full  flex-col items-center bg-[#A6FF72] p-10">
      <div className="text-6xl font-bold">
        <TextAnimation inputText="What is Mugit?" />
      </div>
      <DescriptionIcons />
    </div>
  );
}
