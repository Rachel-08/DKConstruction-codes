"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Menu } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // SEGMENT 1: window opening
  const leftRotate = useTransform(scrollYProgress, [0, 0.18], [0, -78]);
  const rightRotate = useTransform(scrollYProgress, [0, 0.18], [0, 78]);
  const windowScale = useTransform(scrollYProgress, [0, 0.24], [1, 2.8]);
  const windowOpacity = useTransform(scrollYProgress, [0.2, 0.28, 0.65, 0.68], [1, 1, 1, 0]);
  const windowExitX = useTransform(scrollYProgress, [0.48, 0.68], ["0vw", "-156vw"]);
  const scrollTextOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // SEGMENT 2: landing page
  const landingOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.48, 0.58],
    [0, 1, 1, 0]
  );

  const landingY = useTransform(scrollYProgress, [0.22, 0.32], [80, 0]);

  // SEGMENT 3: selected work slides from right
  const workX = useTransform(scrollYProgress, [0.5, 0.68], ["100vw", "0vw"]);
  const workOpacity = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);

  return (
    <main className="bg-[#f5f2eb] text-black">
      {/* COMPLETE SCROLL EXPERIENCE */}
      <section className="relative h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#f5f2eb]">
          {/* NAVBAR */}
          <motion.header
            style={{ opacity: landingOpacity }}
            className="absolute left-0 top-0 z-50 w-full border-b border-black/10 bg-[#f5f2eb]/80 backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
              <div className="font-serif text-2xl italic tracking-tight">
                Aurea Studio
              </div>

              <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.25em] md:flex">
                {["Work", "Studio", "Services", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="group relative"
                  >
                    <span className="transition duration-300 group-hover:text-black/60 group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                      {item}
                    </span>
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </nav>

              <button className="md:hidden">
                <Menu size={24} />
              </button>
            </div>
          </motion.header>

          {/* SEGMENT 1: WELCOME WINDOW */}
          <motion.div
            style={{ scale: windowScale, opacity: windowOpacity, x: windowExitX }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="relative h-[65vh] w-[78vw] max-w-5xl rounded-[18px] border-[14px] border-[#2b2118] bg-[#1d1712] shadow-[0_40px_120px_rgba(0,0,0,0.45)] [perspective:1400px]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop"
                alt="Architecture view"
                className="absolute inset-0 h-full w-full rounded-[4px] object-cover"
              />

              <div className="absolute inset-0 bg-black/10" />

              <div className="absolute left-1/2 top-0 z-20 h-full w-[12px] -translate-x-1/2 bg-[#2b2118]" />

              <motion.div
                style={{
                  rotateY: leftRotate,
                  transformOrigin: "left center",
                }}
                className="absolute left-0 top-0 z-30 h-full w-1/2 border-r-[6px] border-[#2b2118] bg-[#120f0c]/80 backdrop-blur-[3px]"
              >
                <div className="absolute inset-5 border border-white/25" />
                <div className="absolute inset-10 border border-white/10" />
              </motion.div>

              <motion.div
                style={{
                  rotateY: rightRotate,
                  transformOrigin: "right center",
                }}
                className="absolute right-0 top-0 z-30 h-full w-1/2 border-l-[6px] border-[#2b2118] bg-[#120f0c]/80 backdrop-blur-[3px]"
              >
                <div className="absolute inset-5 border border-white/25" />
                <div className="absolute inset-10 border border-white/10" />
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            style={{ opacity: scrollTextOpacity }}
            className="absolute bottom-10 left-1/2 z-40 -translate-x-1/2 text-xs uppercase tracking-[0.35em] text-black/60"
          >
            Scroll to enter
          </motion.p>

          {/* BREAK 1 */}

          {/* SEGMENT 2: STUDIO LANDING */}
          <motion.section
            style={{ opacity: landingOpacity, y: landingY }}
            className="absolute inset-0 z-10 flex items-center justify-center px-6 pt-24"
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
          </motion.section>

          {/* BREAK 2 */}

          {/* SEGMENT 3: SELECTED WORK SLIDES FROM RIGHT */}
          <motion.section
            id="work"
            style={{ x: workX, opacity: workOpacity }}
            className="absolute inset-0 z-40 flex items-center bg-white px-6"
          >
            <div className="mx-auto max-w-7xl">
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
                Selected Work
              </p>

              <h2 className="mt-5 max-w-3xl font-serif text-5xl tracking-[-0.05em] md:text-7xl">
                Projects shaped with light, proportion and timeless form.
              </h2>

              <div className="mt-10 h-[1px] w-full bg-black/20" />

              <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
                This section slides in from the right while the studio landing
                fades away, so the page feels like moving through architectural
                spaces instead of normal scrolling.
              </p>
            </div>
          </motion.section>

          {/* BREAK 3 */}
        </div>
      </section>
    </main>
  );
}
