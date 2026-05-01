"use client";

import { motion, type MotionValue } from "motion/react";

type AboutProps = {
  aboutOpacity: MotionValue<number>;
  aboutY: MotionValue<number>;
  aboutExitY: MotionValue<number>;
};

export default function About({
  aboutOpacity,
  aboutY,
  aboutExitY,
}: AboutProps) {
  return (
    <motion.section
      style={{
        opacity: aboutOpacity,
        y: aboutY,
      }}
      className="pointer-events-none absolute inset-0 z-[65] flex items-center bg-[#f5f2eb] px-6"
    >
      <motion.div
        style={{
          y: aboutExitY,
        }}
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16"
      >
        {/* TEXT */}
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
            About the Studio
          </p>

          <h2 className="mt-6 max-w-2xl font-serif text-5xl tracking-[-0.05em] md:text-6xl">
            We design spaces that feel silent, precise and timeless.
          </h2>

          <p className="mt-8 max-w-xl text-base leading-8 text-neutral-600 md:text-lg">
            Aurea Studio creates architecture, interiors and spatial experiences
            shaped by light, proportion, materiality and detail. Our work focuses
            on calm luxury, functional planning and emotional atmosphere.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="font-serif text-4xl tracking-[-0.05em]">01</p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-neutral-500">
                Architecture
              </p>
            </div>

            <div>
              <p className="font-serif text-4xl tracking-[-0.05em]">02</p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-neutral-500">
                Interiors
              </p>
            </div>

            <div>
              <p className="font-serif text-4xl tracking-[-0.05em]">03</p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-neutral-500">
                Visualization
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="h-[48vh] overflow-hidden rounded-[28px] border border-black/10 bg-neutral-100 md:h-[60vh] md:rounded-[32px]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
            alt="Minimal architectural interior"
            draggable={false}
            className="h-full w-full select-none object-cover"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
