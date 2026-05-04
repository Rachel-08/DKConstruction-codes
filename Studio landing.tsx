"use client";

import { motion } from "motion/react";

type StudioLandingProps = {
  isActive: boolean;
  viewImage: string;
};

export default function StudioLanding({
  isActive,
  viewImage,
}: StudioLandingProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f4efe7]">
      {/* Background image carried from the window */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 1.08,
        }}
        transition={{
          duration: 1.15,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${viewImage}")` }}
        />
      </motion.div>

      {/* Transparent overlay that fades over the image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.72 : 0 }}
        transition={{
          duration: 1.2,
          delay: 0.15,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute inset-0 bg-[#f4efe7]"
      />

      {/* Optional subtle darkening for readability */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.12 : 0 }}
        transition={{
          duration: 1,
          delay: 0.2,
        }}
        className="absolute inset-0 bg-black"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 1.03,
          }}
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 50,
            scale: isActive ? 1 : 1.03,
          }}
          transition={{
            duration: 1.05,
            delay: 0.35,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="max-w-5xl text-center text-[#302b25]"
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
      </div>
    </section>
  );
}
