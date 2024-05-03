"use client";
import { motion } from "framer-motion";
import IconAudio from "@/app/assets/icon/support/IconWave";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function DescriptionIcons() {
  const t = useTranslations("SupportDescription");
  const keys = ["Royalty", "Edit", "Share"] as const;

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
          {keys.map((key, i) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7, delay: i / 10 }}
                key={key}
                className="flex flex-col items-center gap-3"
              >
                <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-pointblack">
                  <IconAudio />
                </div>
                <h4 className="text-2xl font-bold">{t(`${key}.title`)}</h4>
                <div className="text-center leading-snug">
                  {t(`${key}.value`)}
                </div>
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
