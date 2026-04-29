"use client";

import { useScroll, useTransform } from "motion/react";
import Navbar from "@/components/Navbar";
import WelcomeWindow from "@/components/WelcomeWindow";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // SEGMENT 1: window opening
  const leftRotate = useTransform(scrollYProgress, [0, 0.18], [0, -78]);
  const rightRotate = useTransform(scrollYProgress, [0, 0.18], [0, 78]);

  const windowScale = useTransform(scrollYProgress, [0, 0.24], [1, 2.8]);

  const windowOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.28],
    [1, 0]
  );

  const windowExitX = useTransform(
    scrollYProgress,
    [0.48, 0.68],
    ["0vw", "-158vw"]
  );

  const scrollTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.12],
    [1, 0]
  );

  // SEGMENT 2: landing page (still inside page for now)
  const landingOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.48, 0.58],
    [0, 1, 1, 0]
  );

  const landingY = useTransform(
    scrollYProgress,
    [0.22, 0.32],
    [80, 0]
  );

  return (
    <main className="bg-[#f5f2eb] text-black">
      <section className="relative h-[520vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#f5f2eb]">
          
          {/* NAVBAR */}
          <Navbar landingOpacity={landingOpacity} />

          {/* SEGMENT 1: WELCOME WINDOW */}
          <WelcomeWindow
            leftRotate={leftRotate}
            rightRotate={rightRotate}
            windowScale={windowScale}
            windowOpacity={windowOpacity}
            windowExitX={windowExitX}
            scrollTextOpacity={scrollTextOpacity}
          />

          {/* BREAK 1 */}

          {/* SEGMENT 2: STUDIO LANDING (still inline for now) */}
          <div
            className="absolute inset-0 z-10 flex items-center justify-center px-6 pt-24"
            style={{
              opacity: landingOpacity,
              transform: `translateY(${landingY}px)`,
            }}
          >
            <div className="text-center">
              <p className="mb-6 text-xs uppercase tracking-[0.45em] text-neutral-500">
                Welcome to
              </p>

              <h1 className="font-serif text-6xl italic tracking-[-0.06em] md:text-9xl">
                Aurea Studio
              </h1>

              <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-neutral-600">
                A modern architecture studio designing spaces with light,
                silence, proportion and timeless form.
              </p>
            </div>
          </div>

          {/* BREAK 2 */}

        </div>
      </section>
    </main>
  );
          }
