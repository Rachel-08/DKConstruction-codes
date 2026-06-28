"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, type MotionValue } from "motion/react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Category = {
  slug: string;
  label: string;
  count: number;
  image: string;
  description: string;
  accent: string;
};

type SelectedWorkProps = {
  isActive: boolean;
  workX: MotionValue<string>;
  workOpacity: MotionValue<number>;
  workHeadingY: MotionValue<string>;
  workHeadingScale: MotionValue<number>;
  workHeadingX: MotionValue<string>;
  carouselX: MotionValue<string>;
  carouselOpacity: MotionValue<number>;
  workExitY: MotionValue<string>;
  /** When true the section renders in normal document flow (mobile layout). */
  isMobileFlow?: boolean;
};

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    slug: "residential",
    label: "Residential",
    count: 12,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    description: "Private homes, villas & living spaces",
    accent: "#c8a052",
  },
  {
    slug: "commercial",
    label: "Commercial",
    count: 8,
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop",
    description: "Offices, retail & public buildings",
    accent: "#c8a052",
  },
  {
    slug: "3d-design",
    label: "3D Design",
    count: 16,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    description: "Visualisations, renders & walkthroughs",
    accent: "#c8a052",
  },
];

// ─────────────────────────────────────────────
// CategoryCard — desktop carousel card (unchanged)
// ─────────────────────────────────────────────

function CategoryCard({
  category,
  index,
  onClick,
}: {
  category: Category;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      className="group snap-start min-w-[78vw] shrink-0 cursor-pointer md:w-[38vw]"
      whileTap={{ scale: 0.98 }}
    >
      {/* Image container */}
      <div className="relative h-[46vh] overflow-hidden rounded-xl md:h-[52vh]">
        <motion.img
          src={category.image}
          alt={category.label}
          draggable={false}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full select-none object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-50"
          style={{
            background:
              "linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Category index */}
        <div
          className="absolute left-4 top-4 font-mono"
          style={{
            fontSize: "clamp(7px,0.62vw,9px)",
            color: "rgba(200,160,80,0.7)",
            letterSpacing: "0.35em",
          }}
        >
          0{index + 1}
        </div>

        {/* Project count badge */}
        <div
          className="absolute right-4 top-4 font-mono"
          style={{
            fontSize: "clamp(7px,0.62vw,9px)",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.25em",
          }}
        >
          {category.count} PROJECTS
        </div>

        {/* Bottom brass rule — draws in on hover */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transformOrigin: "left",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1.5px",
            background:
              "linear-gradient(90deg,#c8a052,#e8c070,transparent)",
          }}
        />
      </div>

      {/* Card footer */}
      <div className="mt-5 flex items-end justify-between border-b pb-5"
        style={{ borderColor: "rgba(0,0,0,0.12)" }}
      >
        <div className="flex flex-col gap-1">
          <p
            className="font-mono uppercase"
            style={{
              fontSize: "clamp(7px,0.62vw,9px)",
              color: "rgba(0,0,0,0.4)",
              letterSpacing: "0.32em",
            }}
          >
            {category.description}
          </p>
          <h3
            className="font-serif tracking-tight"
            style={{ fontSize: "clamp(22px,2.8vw,38px)", color: "#1a1208" }}
          >
            {category.label}
          </h3>
        </div>

        {/* Arrow */}
        <motion.div
          whileHover={{ x: 4 }}
          transition={{ duration: 0.25 }}
          className="font-mono flex items-center gap-2 mb-1"
          style={{
            fontSize: "clamp(7px,0.62vw,9px)",
            color: "rgba(0,0,0,0.35)",
            letterSpacing: "0.25em",
          }}
        >
          VIEW
          <svg viewBox="0 0 16 10" fill="none" style={{ width: 14 }}>
            <line x1="0" y1="5" x2="13" y2="5"
              stroke="currentColor" strokeWidth="1" />
            <polyline points="9,1 14,5 9,9"
              stroke="currentColor" strokeWidth="1"
              fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────
// Mobile category card — vertical, full-width
// Text on top, small thumbnail below
// ─────────────────────────────────────────────

function MobileCategoryCard({
  category,
  index,
  onClick,
}: {
  category: Category;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-[14px] border border-black/10 bg-white active:scale-[0.99] transition-transform duration-150"
    >
      {/* Text block */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3">
        <div className="flex flex-col gap-0.5">
          <p
            className="font-mono text-[8px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(0,0,0,0.38)" }}
          >
            {category.description}
          </p>

          <h3
            className="font-serif text-[24px] leading-tight tracking-tight text-[#1a1208]"
          >
            {category.label}
          </h3>

          <p
            className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(200,160,80,0.7)" }}
          >
            {category.count} projects
          </p>
        </div>

        {/* Arrow */}
        <div
          className="mt-1 flex items-center gap-1.5 font-mono text-[8px] tracking-[0.22em] shrink-0"
          style={{ color: "rgba(0,0,0,0.3)" }}
        >
          VIEW
          <svg viewBox="0 0 16 10" fill="none" style={{ width: 12 }}>
            <line x1="0" y1="5" x2="13" y2="5"
              stroke="currentColor" strokeWidth="1.2" />
            <polyline points="9,1 14,5 9,9"
              stroke="currentColor" strokeWidth="1.2"
              fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="relative h-[110px] w-full overflow-hidden">
        <img
          src={category.image}
          alt={category.label}
          draggable={false}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover select-none grayscale"
        />
        {/* Subtle top fade so it blends with text block above */}
        <div
          className="absolute inset-x-0 top-0 h-6"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, transparent 100%)",
          }}
        />
        {/* Brass bottom accent */}
        <div
          className="absolute inset-x-0 bottom-0 h-[1.5px]"
          style={{
            background: "linear-gradient(90deg,#c8a052,#e8c070,transparent)",
          }}
        />
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────
// Mobile normal-flow Selected Work section
// ─────────────────────────────────────────────

function MobileSelectedWorkFlow() {
  const router = useRouter();
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-8%" });

  return (
    <section className="bg-[#f5f2eb] px-4 py-12">
      {/* Heading */}
      <div ref={headingRef} className="mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono uppercase tracking-[0.4em] text-[8px]"
          style={{ color: "rgba(0,0,0,0.38)" }}
        >
          Selected Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 font-serif text-[36px] leading-tight tracking-tighter text-[#1a1208]"
        >
          Projects shaped with light, proportion and timeless form.
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 h-px origin-left bg-black/15"
        />
      </div>

      {/* Category cards — vertical list */}
      <div className="flex flex-col gap-4">
        {CATEGORIES.map((cat, i) => (
          <MobileCategoryCard
            key={cat.slug}
            category={cat}
            index={i}
            onClick={() => router.push(`/work/${cat.slug}`)}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SelectedWork
// ─────────────────────────────────────────────

export default function SelectedWork({
  isActive,
  workX,
  workOpacity,
  workHeadingY,
  workHeadingScale,
  workHeadingX,
  carouselX,
  carouselOpacity,
  workExitY,
  isMobileFlow = false,
}: SelectedWorkProps) {
  const router = useRouter();

  // ── Mobile normal-flow render ──
  if (isMobileFlow) {
    return <MobileSelectedWorkFlow />;
  }

  // ── Desktop / tablet scroll-driven render (unchanged) ──
  return (
    <motion.section
      id="work"
      style={{ x: workX, opacity: workOpacity, y: workExitY, zIndex: isActive ? 1 : 0 }}
      className={`absolute inset-0 overflow-hidden bg-[#f5f2eb] px-4 pb-6 pt-4 sm:px-6 sm:pb-8 ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Heading */}
      <motion.div
        style={{
          y: workHeadingY,
          scale: workHeadingScale,
          x: workHeadingX,
          transformOrigin: "left top",
        }}
        className="pointer-events-none absolute left-1/2 top-16 z-45 max-w-5xl -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:max-w-5xl max-w-[90vw]"
      >
        <p
          className="font-mono uppercase tracking-[0.4em]"
          style={{
            fontSize: "clamp(7px,0.62vw,9px)",
            color: "rgba(0,0,0,0.4)",
          }}
        >
          Selected Work
        </p>
        <h2 className="mt-5 max-w-3xl font-serif text-[clamp(1.8rem,6vw,2.8rem)] md:text-[clamp(4.4rem,7vw,5.5rem)] tracking-tighter leading-tight">
          Projects shaped with light, proportion and timeless form.
        </h2>
        <div className="mt-10 h-[0.5px] w-full bg-black/20" />
      </motion.div>

      {/* Category carousel */}
      <motion.div
        className="pointer-events-auto absolute bottom-0 left-0 z-60 flex snap-x snap-mandatory overflow-x-auto gap-4 px-4 pb-8 sm:gap-6 sm:px-6 md:bottom-16 md:px-10 md:pb-0 w-full"
        style={{
          x: carouselX,
          opacity: carouselOpacity,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {CATEGORIES.map((cat, i) => (
          <CategoryCard
            key={cat.slug}
            category={cat}
            index={i}
            onClick={() => router.push(`/work/${cat.slug}`)}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
