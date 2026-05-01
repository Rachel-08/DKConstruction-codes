"use client";

import { motion, type MotionValue } from "motion/react";

type StudioLandingProps = {
  landingOpacity: MotionValue<number>;
  landingY: MotionValue<number>;
  landingExitX: MotionValue<string>;
};

export default function StudioLanding({
  landingOpacity,
  landingY,
  landingExitX,
}: StudioLandingProps) {
  return (
    <motion.section
      style={{
        opacity: landingOpacity,
        y: landingY,
        x: landingExitX,
      }}
      className="pointer-events-none absolute inset-0 z-[50] flex items-center justify-center bg-[#f5f2eb] px-6 pt-24"
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
