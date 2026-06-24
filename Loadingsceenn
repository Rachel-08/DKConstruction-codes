"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type LoadingScreenProps = {
  onComplete: () => void;
  studioName?: string;
};

export default function LoadingScreen({
  onComplete,
  studioName = "DK Constructions",
}: LoadingScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  // 1. Add a boolean flag to control DOM mounting
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // enter → hold after 1.2s
    const t1 = setTimeout(() => setPhase("hold"), 1200);
    
    // hold → exit after 2.4s
    const t2 = setTimeout(() => {
      setPhase("exit");
      setIsVisible(false); // 2. Trigger Framer Motion's exit animation
    }, 2000);
    
    // notify parent after exit animation completes (~3.2s total)
    const t3 = setTimeout(() => onComplete(), 3200);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {/* 3. Check visibility flag instead of phase */}
      {isVisible ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8"
          style={{
            minHeight: "100svh",
            paddingTop: "max(env(safe-area-inset-top), 24px)",
            paddingBottom: "max(env(safe-area-inset-bottom), 24px)",
            background: "#060402",
          }}
        >
          {/* Top + bottom thin brass rules that draw in */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === "hold" || phase === "exit" ? 1 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformOrigin: "center",
              position: "absolute",
              top: "clamp(32px,5vh,56px)",
              left: "clamp(40px,8vw,100px)",
              right: "clamp(40px,8vw,100px)",
              height: "0.5px",
              background:
                "linear-gradient(90deg,transparent,rgba(200,160,80,0.35) 30%,rgba(200,160,80,0.35) 70%,transparent)",
            }}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === "hold" || phase === "exit" ? 1 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformOrigin: "center",
              position: "absolute",
              bottom: "clamp(32px,5vh,56px)",
              left: "clamp(40px,8vw,100px)",
              right: "clamp(40px,8vw,100px)",
              height: "0.5px",
              background:
                "linear-gradient(90deg,transparent,rgba(200,160,80,0.35) 30%,rgba(200,160,80,0.35) 70%,transparent)",
            }}
          />

          {/* Studio name */}
          <div className="flex flex-col items-center gap-4">
            <motion.h1
              initial={{ opacity: 0, y: 18, letterSpacing: "0.5em" }}
              animate={{
                opacity: phase === "hold" || phase === "exit" ? 1 : 0,
                y: phase === "hold" || phase === "exit" ? 0 : 18,
                letterSpacing:
                  phase === "hold" || phase === "exit" ? "0.28em" : "0.5em",
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif uppercase"
              style={{
                fontSize: "clamp(28px,5vw,72px)",
                color: "#e8d8b8",
                fontWeight: 400,
              }}
            >
              {studioName}
            </motion.h1>

            {/* Thin line beneath name */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: phase === "hold" || phase === "exit" ? 1 : 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformOrigin: "center",
                width: "clamp(40px,8vw,100px)",
                height: "0.5px",
                background:
                  "linear-gradient(90deg,transparent,rgba(200,160,80,0.6),transparent)",
              }}
            />

            {/* Tagline */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{
                opacity: phase === "hold" || phase === "exit" ? 0.38 : 0,
              }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-mono uppercase tracking-[0.45em]"
              style={{
                fontSize: "clamp(7px,0.62vw,9px)",
                color: "rgba(200,160,80,0.7)",
              }}
            >
              Architecture & Design
            </motion.span>
          </div>

          {/* Pulsing dot */}
          <motion.div
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.1, 0.8] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              bottom: "clamp(52px,8vh,80px)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "rgba(200,160,80,0.55)",
            }}
          />
        </motion.div>
          ) : null}
    </AnimatePresence>
  );
}
