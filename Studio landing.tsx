"use client";

import { useRouter } from "next/navigation";
import { motion, type MotionValue } from "motion/react";

type StudioLandingProps = {
  isActive: boolean;
  landingOpacity: MotionValue<number>;
  landingY: MotionValue<string>;
  landingExitX: MotionValue<string>;
  onNavigate?: (target: "home" | "services" | "team" | "contact") => void;
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
      }}
      className={`absolute inset-0 z-[50] flex flex-col items-center justify-center bg-[#f5f2eb] px-6 pt-20 ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Main copy */}
      <div className="text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-xl uppercase tracking-[0.45em]"
          style={{ color: "rgba(26,18,8)" }}
        >
          Welcome to
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic tracking-[-0.06em]"
          style={{ fontSize: "clamp(48px,10vw,130px)", color: "#1a1208" , wordSpacing: "-0.08em"}}
        >
          DK Constructions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.32 }}
          className="mx-auto mt-2 max-w-xl leading-relaxed"
          style={{
            fontSize: "clamp(13px,1.5vw,20px)",
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
        transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
      >
        {/* Primary — 3D Designs */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/work/3d-design")}
          style={{
            background: "#1a1208",
            border: "none",
            borderRadius: 10,
            padding: "clamp(11px,1.6vh,15px) clamp(22px,3vw,36px)",
            cursor: "pointer",
            fontFamily: "inherit",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle shine on hover */}
          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.55 }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg,transparent,rgba(200,160,80,0.12),transparent)",
            }}
          />
          <span
            className="relative font-mono uppercase tracking-[0.32em]"
            style={{
              fontSize: "clamp(7px,0.70vw,12px)",
              color: "rgba(232,216,184,0.9)",
            }}
          >
            3D Designs
          </span>
        </motion.button>

        {/* Secondary — Our Services */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate?.("services")}
          style={{
            background: "transparent",
            border: "0.5px solid rgba(26,18,8,0.28)",
            borderRadius: 10,
            padding: "clamp(11px,1.6vh,15px) clamp(22px,3vw,36px)",
            cursor: "pointer",
            fontFamily: "inherit",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformOrigin: "left",
              position: "absolute",
              inset: 0,
              background: "rgba(26,18,8,0.04)",
            }}
          />
          <span
            className="relative font-mono uppercase tracking-[0.32em]"
            style={{
              fontSize: "clamp(7px,0.70vw,12px)",
              color: "rgba(26,18,8,0.55)",
            }}
          >
            Our Services
          </span>
        </motion.button>
      </motion.div>

      {/* Scroll hint */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 16 9" fill="none" style={{ width: 14, height: 8 }}>
            <polyline
              points="1,1 8,8 15,1"
              stroke="rgba(26,18,8,0.25)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <span
          className="font-mono uppercase tracking-[0.32em]"
          style={{ fontSize: 7, color: "rgba(26,18,8,0.25)" }}
        >
          Scroll
        </span>
      </motion.div> */}
    </motion.section>
  );
}
