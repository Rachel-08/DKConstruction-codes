"use client";

import { motion, type MotionValue } from "motion/react";
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
      style={{
        x: workX,
        opacity: workOpacity,
      }}
      className="pointer-events-auto absolute inset-0 z-[40] overflow-hidden bg-[#f5f2eb] px-6"
    >
      {/* HEADING */}
      <motion.div
        style={{
          y: workHeadingY,
          scale: workHeadingScale,
          x: workHeadingX,
          transformOrigin: "left top",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[45] max-w-5xl -translate-x-1/2 -translate-y-1/2"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
          Selected Work
        </p>

        <h2 className="mt-5 max-w-3xl font-serif text-5xl tracking-[-0.05em] md:text-7xl">
          Projects shaped with light, proportion and timeless form.
        </h2>

        <div className="mt-10 h-[1px] w-full bg-black/20" />
      </motion.div>

      {/* CAROUSEL */}
      <motion.div
        style={{
          x: carouselX,
          opacity: carouselOpacity,
        }}
        className="pointer-events-auto absolute bottom-14 left-0 z-[60] flex gap-8 px-6 md:bottom-16 md:px-10"
      >
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="group pointer-events-auto w-[76vw] shrink-0 md:w-[38vw]"
          >
            <div className="pointer-events-auto h-[48vh] overflow-hidden rounded-[28px] border border-black/10 bg-neutral-100 md:h-[52vh] md:rounded-[32px]">
              <img
                src={project.image}
                alt={project.title}
                draggable={false}
                className="h-full w-full select-none object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
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
          </article>
        ))}
      </motion.div>
    </motion.section>
  );
}
