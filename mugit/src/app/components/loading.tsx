"use client";

import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

export default function Loading() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateLoader = async () => {
      await animate(
        [
          [scope.current, { x: 0, width: "100%" }],
          [scope.current, { x: "100%", width: "0%" }, { delay: 0.6 }],
        ],
        {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.8,
        }
      );
    };
    animateLoader();
  }, []);

  return (
    <div className="relative mx-auto w-2/3">
      <motion.div
        ref={scope}
        className="absolute h-full bg-pointyellow text-center"
      />
      <h1 className="flex-nowrap p-28 text-center text-6xl text-white mix-blend-difference">
        <i>Loading</i>
      </h1>
    </div>
  );
}
