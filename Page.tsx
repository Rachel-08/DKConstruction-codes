"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Menu } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();

  const leftRotate = useTransform(scrollYProgress, [0, 0.25], [0, -78]);
  const rightRotate = useTransform(scrollYProgress, [0, 0.25], [0, 78]);

  const windowScale = useTransform(scrollYProgress, [0, 0.35], [1, 2.8]);
  const windowOpacity = useTransform(scrollYProgress, [0.25, 0.42], [1, 0]);

  const siteOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const siteY = useTransform(scrollYProgress, [0.35, 0.5], [80, 0]);

  return (
    <main className="bg-[#f5f2eb] text-black">
      {/* OPENING SCENE */}
      <section className="relative h-[220vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#efe9dd]">
          {/* final website behind */}
          <motion.div
            style={{ opacity: siteOpacity, y: siteY }}
            className="absolute inset-0 z-10"
          >
            <header className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-[#f5f2eb]/80 backdrop-blur-md">
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
            </header>

            <section className="flex min-h-screen items-center justify-center px-6 pt-24">
              <h1 className="text-center font-serif text-6xl italic tracking-[-0.06em] md:text-9xl">
                Architecture Studio
              </h1>
            </section>
          </motion.div>

          {/* realistic window */}
          <motion.div
            style={{ scale: windowScale, opacity: windowOpacity }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="relative h-[65vh] w-[78vw] max-w-5xl rounded-[18px] border-[14px] border-[#2b2118] bg-[#1d1712] shadow-[0_40px_120px_rgba(0,0,0,0.45)] [perspective:1400px]">
              {/* outside view */}
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop"
                alt="Architecture view"
                className="absolute inset-0 h-full w-full rounded-[4px] object-cover"
              />

              <div className="absolute inset-0 bg-black/10" />

              {/* center frame */}
              <div className="absolute left-1/2 top-0 z-20 h-full w-[12px] -translate-x-1/2 bg-[#2b2118]" />

              {/* left window panel */}
              <motion.div
                style={{ rotateY: leftRotate, transformOrigin: "left center" }}
                className="absolute left-0 top-0 z-30 h-full w-1/2 border-r-[6px] border-[#2b2118] bg-[#120f0c]/80 backdrop-blur-[3px]"
              >
                <div className="absolute inset-5 border border-white/25" />
                <div className="absolute inset-10 border border-white/10" />
                <div className="absolute right-6 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white/70 shadow-lg" />
              </motion.div>

              {/* right window panel */}
              <motion.div
                style={{ rotateY: rightRotate, transformOrigin: "right center" }}
                className="absolute right-0 top-0 z-30 h-full w-1/2 border-l-[6px] border-[#2b2118] bg-[#120f0c]/80 backdrop-blur-[3px]"
              >
                <div className="absolute inset-5 border border-white/25" />
                <div className="absolute inset-10 border border-white/10" />
                <div className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white/70 shadow-lg" />
              </motion.div>

              {/* light glow */}
              <div className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-b from-white/20 via-transparent to-black/20" />
            </div>
          </motion.div>

          {/* scroll text */}
          <motion.div
            style={{ opacity: windowOpacity }}
            className="absolute bottom-10 left-1/2 z-40 -translate-x-1/2 text-center"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-black/60">
              Scroll to enter
            </p>
          </motion.div>
        </div>
      </section>

      {/* website content after landing */}
      <section id="work" className="min-h-screen px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
            Selected Work
          </p>
          <h2 className="mt-5 max-w-3xl font-serif text-5xl tracking-[-0.05em] md:text-7xl">
            Projects shaped with light, proportion and timeless form.
          </h2>
        </div>
      </section>
    </main>
  );
}
