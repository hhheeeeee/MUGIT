"use client";
import { motion } from "framer-motion";
import IconAudio from "@/app/assets/icon/support/IconWave";
import { useEffect, useState } from "react";

const description = [
  {
    icon: IconAudio,
    title: "100% royalty free",
    text: "Use your sounds everywhere, they're cleared for commercial use",
  },
  {
    icon: IconAudio,
    title: "Edit your Music",
    text: "The World's most easiest Music Editor",
  },
  {
    icon: IconAudio,
    title: "Share",
    text: "Share your Sounds with Other people",
  },
];

export default function DescriptionIcons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timer1 = setTimeout(() => setShow(true), 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <>
      {show ? (
        <div className="relative mt-10 grid w-[70%] grid-cols-3 gap-7 ">
          {description.map((item, i) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7, delay: i / 10 }}
                key={item.title}
                className="flex flex-col items-center gap-3"
              >
                <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-pointblack">
                  <IconAudio />
                </div>
                <h4 className="text-2xl font-bold">{item.title}</h4>
                <div className="text-center leading-snug">{item.text}</div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
