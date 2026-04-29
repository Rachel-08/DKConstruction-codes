"use client";

import { motion } from "motion/react";
import type { MotionValue } from "motion";
import { projects } from "@/data/projects";

type SelectedWorkProps = {
  workX: MotionValue<string>;
  workOpacity: MotionValue<number>;
  workHeadingY: MotionValue<number>;
  workHeadingScale: MotionValue<number>;
  workHeadingX: MotionValue<number>;
  carouselX: MotionValue<string>;
  carouselOpacity: MotionValue<number>;
};

export default function SelectedWork({
  workX,
  workOpacity,
  workHeadingY,
  workHeadingScale,
  workHeadingX,
  carouselX,
  carouselOpacity,
}: SelectedWorkProps) {
  return (
    <motion.section
      id="work"
      style={{ x: workX, opacity: workOpacity }}
      className="absolute inset-0 z-40 overflow-hidden bg-white px-6"
    >
      <motion.div
        style={{
          y: workHeadingY,
          scale: workHeadingScale,
          x: workHeadingX,
          transformOrigin: "left top",
        }}
        className="absolute left-1/2 top-1/2 max-w-5xl -translate-x-1/2 -translate-y-1/2"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
          Selected Work
        </p>

        <h2 className="mt-5 max-w-3xl font-serif text-5xl tracking-[-0.05em] md:text-7xl">
          Projects shaped with light, proportion and timeless form.
        </h2>

        <div className="mt-10 h-[1px] w-full bg-black/20" />
      </motion.div>

      <motion.div
        style={{ x: carouselX, opacity: carouselOpacity }}
        className="absolute bottom-16 left-0 flex gap-8 px-10"
      >
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="w-[72vw] shrink-0 md:w-[38vw]"
          >
            <div className="h-[52vh] overflow-hidden rounded-[32px] border border-black/10 bg-neutral-100">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0"
              />
            </div>

            <div className="mt-5 flex items-end justify-between border-b border-black/20 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  0{index + 1} / {project.type}
                </p>

                <h3 className="mt-2 font-serif text-3xl tracking-[-0.04em]">
                  {project.title}
                </h3>
              </div>

              <span className="text-xs uppercase tracking-[0.25em]">
                View
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
