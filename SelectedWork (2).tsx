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
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    description: "Private homes, villas & living spaces",
  },
  {
    slug: "commercial",
    label: "Commercial",
    count: 8,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop",
    description: "Offices, retail & public buildings",
  },
  {
    slug: "3d-design",
    label: "3D Design",
    count: 16,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    description: "Visualisations, renders & walkthroughs",
  },
];

// ─────────────────────────────────────────────
// Desktop CategoryCard — rich hover + useInView entrance
// ─────────────────────────────────────────────

function CategoryCard({ category, index, onClick }: { category: Category; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group flex-1 min-w-[280px] cursor-pointer"
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl" style={{ height: "clamp(240px,38vh,420px)" }}>
        <motion.img
          src={category.image}
          alt={category.label}
          draggable={false}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full select-none object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-50"
          style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.52) 100%)" }}
        />

        {/* Index */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
          className="absolute left-4 top-4 font-mono text-[8px] tracking-[0.35em]"
          style={{ color: "rgba(200,160,80,0.7)" }}
        >
          0{index + 1}
        </motion.div>

        {/* Count badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.35 }}
          className="absolute right-4 top-4 font-mono text-[8px] tracking-[0.25em]"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {category.count} PROJECTS
        </motion.div>

        {/* Brass rule draws on hover */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left"
          style={{ background: "linear-gradient(90deg,#c8a052,#e8c070,transparent)" }}
        />
      </div>

      {/* Footer */}
      <div
        className="mt-5 flex items-end justify-between border-b pb-5"
        style={{ borderColor: "rgba(0,0,0,0.12)" }}
      >
        <div className="flex flex-col gap-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.25 }}
            className="font-mono text-[8px] uppercase tracking-[0.32em]"
            style={{ color: "rgba(0,0,0,0.4)" }}
          >
            {category.description}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif tracking-tight text-[#1a1208]"
            style={{ fontSize: "clamp(22px,2.8vw,38px)" }}
          >
            {category.label}
          </motion.h3>
        </div>

        {/* Arrow */}
        <motion.div
          whileHover={{ x: 6 }}
          transition={{ duration: 0.25 }}
          className="font-mono mb-1 flex items-center gap-2 text-[8px] tracking-[0.25em]"
          style={{ color: "rgba(0,0,0,0.35)" }}
        >
          VIEW
          <svg viewBox="0 0 16 10" fill="none" style={{ width: 14 }}>
            <line x1="0" y1="5" x2="13" y2="5" stroke="currentColor" strokeWidth="1" />
            <polyline points="9,1 14,5 9,9" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────
// Mobile category card — unchanged
// ─────────────────────────────────────────────

function MobileCategoryCard({ category, index, onClick }: { category: Category; index: number; onClick: () => void }) {
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
      <div className="flex items-start justify-between px-4 pt-4 pb-3">
        <div className="flex flex-col gap-0.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.3em]" style={{ color: "rgba(0,0,0,0.38)" }}>
            {category.description}
          </p>
          <h3 className="font-serif text-[24px] leading-tight tracking-tight text-[#1a1208]">{category.label}</h3>
          <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.22em]" style={{ color: "rgba(200,160,80,0.7)" }}>
            {category.count} projects
          </p>
        </div>
        <div className="mt-1 flex items-center gap-1.5 font-mono text-[8px] tracking-[0.22em] shrink-0" style={{ color: "rgba(0,0,0,0.3)" }}>
          VIEW
          <svg viewBox="0 0 16 10" fill="none" style={{ width: 12 }}>
            <line x1="0" y1="5" x2="13" y2="5" stroke="currentColor" strokeWidth="1.2" />
            <polyline points="9,1 14,5 9,9" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="relative h-[110px] w-full overflow-hidden">
        <img src={category.image} alt={category.label} draggable={false} loading="lazy" className="absolute inset-0 h-full w-full object-cover select-none grayscale" />
        <div className="absolute inset-x-0 top-0 h-6" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-[1.5px]" style={{ background: "linear-gradient(90deg,#c8a052,#e8c070,transparent)" }} />
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────
// Mobile normal-flow layout
// ─────────────────────────────────────────────

function MobileSelectedWorkFlow() {
  const router = useRouter();
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-8%" });

  return (
    <section className="bg-[#f5f2eb] px-4 py-12">
      <div ref={headingRef} className="mb-8">
        <motion.p initial={{ opacity: 0 }} animate={headingInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="font-mono uppercase tracking-[0.4em] text-[8px]" style={{ color: "rgba(0,0,0,0.38)" }}>
          Selected Work
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.07, ease: [0.22, 1, 0.36, 1] }} className="mt-2 font-serif text-[36px] leading-tight tracking-tighter text-[#1a1208]">
          Projects shaped with light, proportion and timeless form.
        </motion.h2>
        <motion.div initial={{ scaleX: 0 }} animate={headingInView ? { scaleX: 1 } : {}} transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }} className="mt-5 h-px origin-left bg-black/15" />
      </div>
      <div className="flex flex-col gap-4">
        {CATEGORIES.map((cat, i) => (
          <MobileCategoryCard key={cat.slug} category={cat} index={i} onClick={() => router.push(`/work/${cat.slug}`)} />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SelectedWork
// ─────────────────────────────────────────────

export default function SelectedWork({ isActive, isMobileFlow = false, workX, workOpacity, workHeadingY, workHeadingScale, workHeadingX, carouselX, carouselOpacity, workExitY }: SelectedWorkProps) {
  const router = useRouter();
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-6%" });

  if (isMobileFlow) return <MobileSelectedWorkFlow />;

  // ── Desktop: plain section, useInView animations, no scroll transforms ──
  return (
    <section className="bg-[#f5f2eb] px-6 py-24 md:px-10 lg:px-16">

      {/* Heading */}
      <div ref={headingRef} className="mb-16 max-w-4xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono uppercase tracking-[0.4em] text-[8px] mb-4"
          style={{ color: "rgba(0,0,0,0.38)" }}
        >
          Selected Work
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 48 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif tracking-tighter leading-tight text-[#1a1208]"
            style={{ fontSize: "clamp(2.2rem,5.5vw,5rem)" }}
          >
            Projects shaped with light,<br />proportion and timeless form.
          </motion.h2>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-[0.5px] w-full origin-left bg-black/15"
        />
      </div>

      {/* Category grid */}
      <div className="flex flex-col gap-10 md:flex-row md:gap-6 lg:gap-8">
        {CATEGORIES.map((cat, i) => (
          <CategoryCard
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
