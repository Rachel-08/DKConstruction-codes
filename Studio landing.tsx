"use client";

import { motion } from "motion/react";

type StudioLandingProps = {
  isActive: boolean;
};

export default function StudioLanding({ isActive }: StudioLandingProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4efe7] px-6 text-[#302b25]">
      <motion.div
        initial={{
          opacity: 0,
          scale: 1.08,
          y: 40,
        }}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 1.08,
          y: isActive ? 0 : 40,
        }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.25,
        }}
        className="max-w-5xl text-center"
      >
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.45em] text-[#8a7a66]">
          Welcome to DK Studio
        </p>

        <h2 className="font-serif text-[72px] leading-[0.95] tracking-[-0.05em] md:text-[110px]">
          Spaces designed
          <br />
          with intention.
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#6d6256]">
          We create refined architecture, interiors, and construction solutions
          rooted in clarity, function, and purpose.
        </p>
      </motion.div>
    </section>
  );
}
