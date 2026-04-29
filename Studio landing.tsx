"use client";

import { motion } from "motion/react";
import type { MotionValue } from "motion";

type StudioLandingProps = {
  landingOpacity: MotionValue<number>;
  landingY: MotionValue<number>;
};

export default function StudioLanding({
  landingOpacity,
  landingY,
}: StudioLandingProps) {
  return (
    <motion.section
      style={{ opacity: landingOpacity, y: landingY }}
      className="absolute inset-0 z-10 flex items-center justify-center px-6 pt-24"
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
    </motion.section>
  );
}
