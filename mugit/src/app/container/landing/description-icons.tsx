"use client";
import { motion } from "framer-motion";

import IconCamera from "@/app/assets/icon/IconCamera";

export default function DescriptionIcons() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute left-0 top-0 h-20 w-20 rounded-full bg-white"
      />
      <IconCamera />
    </div>
  );
}
