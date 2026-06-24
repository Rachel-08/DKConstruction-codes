"use client";

import { useRouter } from "next/navigation";
import { motion, type MotionValue } from "motion/react";

type StudioLandingProps = {
  isActive: boolean;
  landingOpacity: MotionValue<number>;
  landingY: MotionValue<string>;
  landingExitX: MotionValue<string>;
  onNavigate?: (target: "home" | "services" | "team" | "contact" | "howwework") => void;
};

export default function StudioLanding({
  isActive,
  landingOpacity,
  landingY,
  landingExitX,
  onNavigate,
}: StudioLandingProps) {
  const router = useRouter();

  return (
    <motion.section
      style={{
        opacity: landingOpacity,
        y: landingY,
        x: landingExitX,
        zIndex: isActive ? 1 : 0,
      }}
      className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#f5f2eb] px-5 pt-16 sm:px-6 sm:pt-20 ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Main copy */}
      <div className="max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="
            font-mono uppercase text-[10px] tracking-[0.36em]
            sm:text-sm sm:tracking-[0.42em]
            md:text-lg
            lg:text-xl lg:tracking-[0.45em]
          "
          style={{ color: "rgba(26,18,8)" }}
        >
          Welcome to
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-3 font-serif italic tracking-[-0.06em] text-[#1a1208]
            text-[clamp(43px,15vw,72px)]
            leading-[0.86]
            sm:text-[clamp(58px,11vw,110px)]
            md:leading-[0.9]
            lg:text-[clamp(76px,10vw,130px)]
          "
          style={{ wordSpacing: "-0.08em" }}
        >
          DK Constructions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.32 }}
          className="
            mx-auto mt-5 max-w-[300px] leading-relaxed
            text-[13px]
            sm:mt-4 sm:max-w-xl sm:text-[15px]
            md:text-[17px]
            lg:text-[20px]
          "
          style={{
            color: "rgba(26,18,8,0.52)",
          }}
        >
          A modern architecture studio designing spaces with light, silence,
          proportion and timeless form.
        </motion.p>
      </div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mt-9 flex flex-col items-center justify-center gap-4
          sm:mt-10 sm:flex-row sm:gap-4
        "
      >
        {/* Primary — 3D Designs */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => router.push("/work/3d-design")}
          className="
            group relative flex min-h-[74px] min-w-[74px] w-full max-w-[280px]
            items-center justify-center overflow-hidden rounded-full
            border-none bg-[#1a1208] px-6 py-4
            sm:w-auto sm:rounded-[10px] sm:px-8 sm:py-4 lg:px-9
            cursor-pointer
          "
          style={{
            fontFamily: "inherit",
            touchAction: "manipulation",
            userSelect: "none",
          }}
          aria-label="Open 3D Designs"
        >
          {/* Subtle shine on hover */}
          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(200,160,80,0.12),transparent)",
            }}
          />

          {/* Mobile circle text */}
          <span
            className="
              relative flex flex-col items-center justify-center font-mono
              text-[10px] uppercase leading-[1.05] tracking-[0.16em]
              text-[rgba(232,216,184,0.9)]
              sm:hidden
            "
          >
            <span>3D</span>
            <span>Design</span>
          </span>

          {/* Desktop / tablet text */}
          <span
            className="
              relative hidden font-mono uppercase tracking-[0.32em]
              text-[rgba(232,216,184,0.9)]
              sm:inline-block sm:text-[9px]
              md:text-[10px]
              lg:text-[12px]
            "
          >
            3D Designs
          </span>
        </motion.button>

        {/* Secondary — Our Services */}
        <motion.button
          type="button"
          // Subtle micro-scale interaction on desktop tap/clicks
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94 }}
          // Stop event propagation and fire the section-scroll handler
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (onNavigate) {
              onNavigate("services");
            }
          }}
          // pointer-events-auto and z-30 break through hidden interactive layers
          className="
            group relative flex min-h-[74px] min-w-[74px] w-full max-w-[280px]
            items-center justify-center overflow-hidden rounded-full
            border border-[rgba(26,18,8,0.28)] bg-transparent
            px-6 py-4 cursor-pointer pointer-events-auto z-30
            sm:w-auto sm:rounded-[10px] sm:px-8 sm:py-4 lg:px-9
            select-none
          "
          style={{
            fontFamily: "inherit",
            touchAction: "manipulation",
            userSelect: "none",
          }}
          aria-label="Scroll to Our Services"
        >
      {/* DESKTOP ONLY: Premium hover overlay effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 origin-left hidden sm:block pointer-events-none"
        style={{
          background: "rgba(26,18,8,0.04)",
        }}
      />

      {/* MOBILE SCREEN INTERFACE */}
      <span
        className="
          relative flex flex-col items-center justify-center font-mono
          text-[9px] uppercase leading-[1.15] tracking-[0.13em]
          text-[rgba(26,18,8,0.62)] pointer-events-none
          sm:hidden
        "
      >
        <span>Our</span>
        <span>Services</span>
      </span>

      {/* TABLET & DESKTOP INTERFACE */}
      <span
        className="
          relative hidden font-mono uppercase tracking-[0.32em]
          text-[rgba(26,18,8,0.55)] pointer-events-none
          sm:inline-block sm:text-[9px]
          md:text-[10px]
          lg:text-[12px]
        "
      >
        Our Services
      </span>
    </motion.button>
    </motion.div>
    </motion.section>
  );
}
