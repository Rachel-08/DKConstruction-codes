"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Menu } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();

  const leftWindow = useTransform(scrollYProgress, [0, 0.25], ["0%", "-100%"]);
  const rightWindow = useTransform(scrollYProgress, [0, 0.25], ["0%", "100%"]);
  const welcomeOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const mainOpacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);

  return (
    <main className="bg-[#f5f2eb] text-black">
      {/* NAVBAR */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-[#f5f2eb]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="font-serif text-2xl italic tracking-tight">
            Aurea Studio
          </div>

          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.25em] md:flex">
            {["Work", "Studio", "Services", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="group relative">
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
      </header>

      {/* WELCOME SCROLL AREA */}
      <section className="relative h-[220vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Website behind window */}
          <motion.div
            style={{ opacity: mainOpacity }}
            className="absolute inset-0 flex items-center justify-center px-6 pt-24"
          >
            <div className="max-w-5xl text-center">
              <p className="mb-5 text-xs uppercase tracking-[0.4em] text-neutral-500">
                Architecture / Interiors / Spatial Design
              </p>

              <h1 className="font-serif text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">
                Designing spaces with light, silence and precision.
              </h1>

              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
                A modern architecture studio creating minimal, timeless and
                emotionally refined spaces.
              </p>

              <button className="mt-10 rounded-full border border-black bg-black px-8 py-4 text-xs uppercase tracking-[0.25em] text-white transition duration-300 hover:rounded-tl-3xl hover:rounded-br-3xl hover:shadow-2xl">
                Explore Studio
              </button>
            </div>
          </motion.div>

          {/* Welcome title */}
          <motion.div
            style={{ opacity: welcomeOpacity }}
            className="absolute inset-0 z-20 flex items-center justify-center px-6"
          >
            <div className="text-center">
              <p className="mb-6 text-xs uppercase tracking-[0.45em] text-neutral-500">
                Welcome to
              </p>
              <h1 className="font-serif text-6xl italic tracking-[-0.06em] md:text-9xl">
                Aurea Studio
              </h1>
              <p className="mt-8 text-xs uppercase tracking-[0.35em] text-neutral-500">
                Scroll to open the window
              </p>
            </div>
          </motion.div>

          {/* Window frame */}
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
            <div className="relative h-[62vh] w-full max-w-5xl border-[10px] border-black bg-transparent shadow-2xl">
              <div className="absolute left-1/2 top-0 h-full w-[10px] -translate-x-1/2 bg-black" />

              <motion.div
                style={{ x: leftWindow }}
                className="absolute left-0 top-0 h-full w-1/2 border-r-[5px] border-black bg-[#111]"
              >
                <div className="absolute inset-6 border border-white/20" />
                <div className="absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white/70" />
              </motion.div>

              <motion.div
                style={{ x: rightWindow }}
                className="absolute right-0 top-0 h-full w-1/2 border-l-[5px] border-black bg-[#111]"
              >
                <div className="absolute inset-6 border border-white/20" />
                <div className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white/70" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* WEBSITE CONTENT AFTER WELCOME */}
      <section id="work" className="min-h-screen px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
            Selected Work
          </p>
          <h2 className="mt-5 max-w-3xl font-serif text-5xl tracking-[-0.05em] md:text-7xl">
            Projects shaped like frames, openings and quiet forms.
          </h2>
        </div>
      </section>
    </main>
  );
}
