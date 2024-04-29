"use client";

import TextAnimation from "../components/text-animation";
import DescriptionIcons from "../container/landing/description-icons";

export default function SupportPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <div className="flex min-h-[90%] w-full  flex-col items-center bg-[#A6FF72] p-10">
      <div className="text-6xl font-bold">
        <TextAnimation inputText="What is Mugit?" />
      </div>
      <DescriptionIcons />
    </div>
  );
}
