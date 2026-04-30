"use client";

import { motion } from "motion/react";
import type { MotionValue } from "motion";

type Props = {
  studioOpacity: MotionValue<number>;
  studioY: MotionValue<number>;
};

export default function StudioSection({
  studioOpacity,
  studioY,
}: Props) {
  return (
    <motion.section
      style={{ opacity: studioOpacity, y: studioY }}
      className="absolute inset-0 z-30 flex items-center bg-white px-6"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2">

        {/* TEXT */}
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
            Studio
          </p>

          <h2 className="mt-6 font-serif text-5xl tracking-[-0.05em] md:text-6xl">
            We design spaces that feel silent, precise and timeless.
          </h2>

          <p className="mt-8 max-w-md text-lg leading-8 text-neutral-600">
            Our approach blends architecture, light and materiality to create
            environments that are both functional and emotionally refined.
            Every project is treated as a unique spatial experience.
          </p>
        </div>

        {/* IMAGE */}
        <div className="h-[60vh] overflow-hidden rounded-[32px]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </motion.section>
  );
}
