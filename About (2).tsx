"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, type MotionValue } from "motion/react";
import type { IconType } from "react-icons";
import { FaRegComments, FaFileSignature, FaHardHat, FaClipboardCheck, FaHome } from "react-icons/fa";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Step = {
  id: number;
  number: string;
  phase: string;
  title: string;
  description: string;
  payment?: string;
  paymentLabel?: string;
  icon: IconType;
};

type HowWeWorkProps = {
  isActive: boolean;
  howWeWorkOpacity: MotionValue<number>;
  howWeWorkY: MotionValue<string>;
  howWeWorkExitY: MotionValue<string>;
  isMobileFlow?: boolean;
};

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const STEPS: Step[] = [
  {
    id: 1,
    number: "01",
    phase: "Discovery",
    title: "Initial Design Consultation",
    description: "We begin with a structured briefing session — understanding your vision, spatial requirements, budget parameters, and timeline.",
    icon: FaRegComments,
  },
  {
    id: 2,
    number: "02",
    phase: "Proposal",
    title: "Design Proposal & Agreement",
    description: "We present drawings, material schedules, and a detailed estimate before formal agreement and project confirmation.",
    payment: "5%",
    paymentLabel: "Retainer",
    icon: FaFileSignature,
  },
  {
    id: 3,
    number: "03",
    phase: "Execution",
    title: "Construction & Project Execution",
    description: "Procurement, contractor scheduling, supervision, and quality checks are handled through phased execution.",
    payment: "60%",
    paymentLabel: "Milestone",
    icon: FaHardHat,
  },
  {
    id: 4,
    number: "04",
    phase: "Completion",
    title: "Final Installations & Handover",
    description: "Final finishes, inspections, snagging walkthroughs, and handover are completed before project closure.",
    payment: "100%",
    paymentLabel: "Final",
    icon: FaClipboardCheck,
  },
  {
    id: 5,
    number: "05",
    phase: "Occupation",
    title: "Move In & Enjoy",
    description: "Warranty documents, care guides, supplier contacts, and aftercare support are provided post completion.",
    icon: FaHome,
  },
];

// ─────────────────────────────────────────────
// Step Card — useInView animation, accordion expand
// ─────────────────────────────────────────────

function StepCard({ step, index, isLast }: { step: Step; index: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const Icon = step.icon;

  return (
    <article ref={ref} className="relative pl-[72px] md:pl-[88px]">
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[23px] md:left-[30px] top-[62px] bottom-0 w-px bg-black/20 origin-top"
        />
      )}

      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Icon circle — pops in */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: index * 0.1 + 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-[#f5f2eb] md:h-14 md:w-14"
          whileHover={{ scale: 1.08, borderColor: "rgba(200,160,80,0.6)" }}
        >
          <Icon className="h-5 w-5 text-black" />
        </motion.div>

        {/* Expandable row */}
        <motion.button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="w-full cursor-pointer py-5 text-left group"
          whileTap={{ scale: 0.995 }}
        >
          <div className="flex flex-col gap-3">
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/70"
              >
                Phase {step.number} — {step.phase}
              </motion.span>

              {step.payment && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.28 }}
                  className="flex items-center gap-2 border border-black/15 bg-black/[0.03] px-3 py-1"
                >
                  <span className="font-mono text-[10px] font-semibold tracking-[0.12em]">{step.payment}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/60">{step.paymentLabel}</span>
                </motion.div>
              )}
            </div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.1 + 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[22px] leading-snug text-black md:text-[30px] group-hover:text-black/80 transition-colors duration-300"
            >
              {step.title}
            </motion.h3>

            {/* Animated underline */}
            <motion.div
              animate={{ scaleX: expanded ? 1 : 0.3, opacity: expanded ? 0.7 : 0.25 }}
              transition={{ duration: 0.35 }}
              className="h-px origin-left bg-black"
              style={{ width: "90px" }}
            />

            {/* Expandable description */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[640px] pt-2 text-[13px] leading-[1.9] text-black/75">
                    {step.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand label */}
            <motion.span
              animate={{ color: expanded ? "rgba(200,160,80,0.8)" : "rgba(0,0,0,0.55)" }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[9px] uppercase tracking-[0.28em]"
            >
              {expanded ? "— Collapse" : "+ Expand"}
            </motion.span>
          </div>
        </motion.button>

        {!isLast && <div className="h-px bg-gradient-to-r from-black/15 to-transparent" />}
      </motion.div>
    </article>
  );
}

// ─────────────────────────────────────────────
// Mobile flow layout (unchanged logic, same animations)
// ─────────────────────────────────────────────

function MobileHowWeWorkFlow() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-8%" });

  return (
    <section className="bg-[#f5f2eb]">
      <div className="mx-auto max-w-[640px] px-5 py-14">
        <div ref={headingRef} className="mb-10 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-black/60">Process</span>
            <div className="h-px flex-1 bg-gradient-to-r from-black to-transparent" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[52px] leading-none tracking-tight text-black"
          >
            How It<br />Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-[13px] leading-[1.9] text-black/65"
          >
            A transparent phased process designed to keep you informed and in control throughout the project lifecycle.
          </motion.p>
        </div>
        <div className="relative flex flex-col">
          {STEPS.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} isLast={index === STEPS.length - 1} />
          ))}
        </div>
        <footer className="mt-8 flex items-start gap-4 border-t border-black/15 pt-5">
          <div className="mt-2 h-px w-6 bg-black" />
          <p className="max-w-[640px] text-[11px] leading-[1.9] text-black/65">
            Payment milestones are aligned with verified construction progress. Timelines and deliverables are formally documented before commencement.
          </p>
        </footer>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export default function HowWeWork({ isActive, howWeWorkOpacity, howWeWorkY, howWeWorkExitY, isMobileFlow = false }: HowWeWorkProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-8%" });
  const footnoteRef = useRef<HTMLElement>(null);
  const footnoteInView = useInView(footnoteRef, { once: true, margin: "-5%" });

  if (isMobileFlow) return <MobileHowWeWorkFlow />;

  // ── Desktop: plain section, no scroll-driven transforms ──
  return (
    <section className="bg-[#f5f2eb] overflow-x-hidden">
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-black" style={{ top: `${(i / 19) * 100}%` }} />
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-black" style={{ left: `${(i / 23) * 100}%` }} />
        ))}
      </div>

      <main className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-[0.42fr_0.58fr] lg:px-12">

        {/* LEFT — sticky heading block */}
        <aside ref={headingRef} className="self-start lg:sticky lg:top-24">
          <div className="flex flex-col gap-5">

            {/* Label + rule */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-black/60">Process</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={headingInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-px flex-1 bg-gradient-to-r from-black to-transparent origin-left"
              />
            </motion.div>

            {/* Heading — chars stagger */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif leading-none tracking-tight text-black text-[56px] md:text-[90px]"
              >
                How It<br />Works
              </motion.h2>
            </div>

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[420px] text-[14px] leading-[1.9] text-black/70"
            >
              A transparent phased process designed to keep you informed and in control throughout the project lifecycle.
            </motion.p>

            {/* Brass accent line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={headingInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="origin-left h-[1.5px] w-16"
              style={{ background: "linear-gradient(90deg,#c8a052,#e8c070,transparent)" }}
            />
          </div>
        </aside>

        {/* RIGHT — steps */}
        <section className="relative pb-10">
          <div className="flex flex-col">
            {STEPS.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} isLast={index === STEPS.length - 1} />
            ))}
          </div>

          {/* Footnote */}
          <footer
            ref={footnoteRef}
            className="mt-8 flex items-start gap-4 border-t border-black/15 pt-5"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={footnoteInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 h-px w-6 bg-black origin-left shrink-0"
            />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={footnoteInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="max-w-[640px] text-[11px] leading-[1.9] text-black/65"
            >
              Payment milestones are aligned with verified construction progress. Timelines and deliverables are formally documented before commencement.
            </motion.p>
          </footer>
        </section>
      </main>
    </section>
  );
}
