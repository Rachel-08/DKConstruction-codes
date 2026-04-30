"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function LandingSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const landingOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );

  const landingY = useTransform(
    scrollYProgress,
    [0, 0.25],
    [80, 0]
  );

  return (
    <section
      ref={ref}
      className="relative isolate min-h-screen overflow-hidden bg-[#f5f2eb]"
    >
      <motion.div
        style={{ opacity: landingOpacity, y: landingY }}
        className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-24"
      >
        <div className="text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-neutral-500">
            Welcome to
          </p>

          <h1 className="font-serif text-6xl italic tracking-[-0.06em] md:text-9xl">
            Aurea Studio
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-neutral-600">
            A modern architecture studio designing spaces with light, silence,
            proportion and timeless form.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
