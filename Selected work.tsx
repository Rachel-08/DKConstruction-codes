"use client";

import { useRouter } from "next/navigation";
import { motion, type MotionValue } from "motion/react";

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
// CategoryCard
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
      className="group w-[76vw] shrink-0 cursor-pointer md:w-[38vw]"
    >
      {/* Image container */}
      <div className="relative h-[48vh] overflow-hidden rounded-[4px] md:h-[52vh]">
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
}: SelectedWorkProps) {
  const router = useRouter();

  return (
    <motion.section
      id="work"
      style={{ x: workX, opacity: workOpacity, y: workExitY }}
      className={`absolute inset-0 overflow-hidden bg-[#f5f2eb] px-6 ${
        isActive
          ? "z-[90] pointer-events-auto"
          : "z-[10] pointer-events-none"
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
        className="pointer-events-none absolute left-1/2 top-1/2 z-[45] max-w-5xl -translate-x-1/2 -translate-y-1/2"
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
        <h2 className="mt-5 max-w-3xl font-serif text-5xl tracking-[-0.05em] md:text-7xl">
          Projects shaped with light, proportion and timeless form.
        </h2>
        <div className="mt-10 h-[0.5px] w-full bg-black/20" />
      </motion.div>

      {/* Category carousel */}
      <motion.div
        style={{ x: carouselX, opacity: carouselOpacity }}
        className="pointer-events-auto absolute bottom-14 left-0 z-[60] flex gap-8 px-6 md:bottom-16 md:px-10"
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
