
"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type MotionValue,
} from "motion/react";

import type { IconType } from "react-icons";

import {
  FaRegComments,
  FaFileSignature,
  FaHardHat,
  FaClipboardCheck,
  FaHome,
} from "react-icons/fa";

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
    description:
      "We begin with a structured briefing session — understanding your vision, spatial requirements, budget parameters, and timeline.",
    icon: FaRegComments,
  },

  {
    id: 2,
    number: "02",
    phase: "Proposal",
    title: "Design Proposal & Agreement",
    description:
      "We present drawings, material schedules, and a detailed estimate. Upon approval, the agreement is signed.",
    payment: "5%",
    paymentLabel: "Retainer to confirm project",
    icon: FaFileSignature,
  },

  {
    id: 3,
    number: "03",
    phase: "Execution",
    title: "Construction & Project Execution",
    description:
      "Groundwork begins. Procurement, contractor scheduling, and quality control are managed throughout execution.",
    payment: "60%",
    paymentLabel: "Progressive milestone payment",
    icon: FaHardHat,
  },

  {
    id: 4,
    number: "04",
    phase: "Completion",
    title: "Final Installations & Handover",
    description:
      "All finishes and fixtures are inspected before the final balance is settled and handover is completed.",
    payment: "100%",
    paymentLabel: "Final balance on handover",
    icon: FaClipboardCheck,
  },

  {
    id: 5,
    number: "05",
    phase: "Occupation",
    title: "Move In & Enjoy",
    description:
      "Your space is complete with warranty documents, supplier contacts, and aftercare support.",
    icon: FaHome,
  },
];

// ─────────────────────────────────────────────
// Step Card
// ─────────────────────────────────────────────

function StepCard({
  step,
  index,
  isLast,
}: {
  step: Step;
  index: number;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const ref = useRef<HTMLElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-5%",
  });

  const Icon = step.icon;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: 24 }}
      animate={
        inView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: 24 }
      }
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-[72px]"
    >
      {/* Vertical line */}

      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute left-[24px] top-[72px]"
          style={{
            width: "1px",
            height: "calc(100% - 24px)",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.08))",
          }}
        />
      )}

      {/* Icon */}

      <motion.div
        aria-hidden="true"
        animate={{
          borderColor: expanded
            ? "rgba(0,0,0,0.75)"
            : "rgba(0,0,0,0.28)",

          background: expanded
            ? "rgba(0,0,0,0.06)"
            : "rgba(255,255,255,0.35)",
        }}
        transition={{ duration: 0.25 }}
        className="absolute left-0 top-[18px] z-10 flex items-center justify-center rounded-full"
        style={{
          width: 48,
          height: 48,
          border: "1px solid rgba(0,0,0,0.28)",
        }}
      >
        <Icon className="h-[42%] w-[42%]" />
      </motion.div>

      {/* Content */}

      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
        className="relative z-10 block w-full text-left"
        style={{
          padding: "18px 0",
        }}
      >
        <header className="flex flex-col gap-3">
          {/* Top Row */}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className="font-mono uppercase tracking-[0.28em]"
              style={{
                fontSize: "clamp(7px,0.65vw,9px)",
              }}
            >
              Phase {step.number} — {step.phase}
            </span>

            {step.payment && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        scale: 0.9,
                      }
                }
                transition={{
                  duration: 0.25,
                  delay: 0.15,
                }}
                style={{
                  background: "rgba(0,0,0,0.04)",
                  border: "0.5px solid rgba(0,0,0,0.25)",
                  borderRadius: 2,
                  padding: "4px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "clamp(9px,0.75vw,11px)",
                    fontWeight: 600,
                  }}
                >
                  {step.payment}
                </span>

                <span
                  className="font-mono"
                  style={{
                    fontSize: "clamp(6px,0.55vw,7px)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {step.paymentLabel?.toUpperCase()}
                </span>
              </motion.div>
            )}
          </div>

          {/* Title */}

          <h3
            className="font-serif leading-snug"
            style={{
              fontSize: "clamp(20px,2vw,30px)",
            }}
          >
            {step.title}
          </h3>

          {/* Divider */}

          <motion.div
            aria-hidden="true"
            animate={{
              scaleX: expanded ? 1 : 0.2,
              opacity: expanded ? 0.6 : 0.25,
            }}
            transition={{
              duration: 0.3,
            }}
            style={{
              transformOrigin: "left",
              height: "1px",
              width: "100px",
              background:
                "linear-gradient(90deg,#000,rgba(0,0,0,0.3),transparent)",
            }}
          />

          {/* Expand Content */}

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="description"
                initial={{
                  opacity: 0,
                  scaleY: 0.92,
                }}
                animate={{
                  opacity: 1,
                  scaleY: 1,
                }}
                exit={{
                  opacity: 0,
                  scaleY: 0.92,
                }}
                transition={{
                  duration: 0.22,
                }}
                style={{
                  overflow: "hidden",
                  transformOrigin: "top",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(12px,0.95vw,14px)",
                    lineHeight: 1.8,
                    paddingTop: 6,
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand Label */}

          <span
            className="font-mono"
            style={{
              fontSize: "clamp(8px,0.65vw,9px)",
              letterSpacing: "0.24em",
              opacity: 0.7,
            }}
          >
            {expanded ? "— COLLAPSE" : "+ EXPAND"}
          </span>
        </header>
      </button>

      {!isLast && (
        <div
          aria-hidden="true"
          style={{
            height: "0.5px",
            background:
              "linear-gradient(90deg,rgba(0,0,0,0.16),rgba(0,0,0,0.05),transparent)",
          }}
        />
      )}
    </motion.article>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export default function HowWeWork({
  isActive,
  howWeWorkOpacity,
  howWeWorkY,
}: HowWeWorkProps) {
  const headingRef = useRef<HTMLElement>(null);

  const headingInView = useInView(headingRef, {
    once: true,
    margin: "-6%",
  });

  if (!isActive) return null;

  return (
    <motion.section
      aria-labelledby="how-we-work-heading"
      style={{
        opacity: howWeWorkOpacity,
        y: howWeWorkY,

        position: "relative",
        width: "100%",
        minHeight: "100vh",

        background: "#f5f2eb",

        overflowX: "hidden",
      }}
      className="relative"
    >
      {/* Background Grid */}

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.025 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0"
            style={{
              top: `${(i / 19) * 100}%`,
              height: "0.5px",
              background: "rgba(100,160,220)",
            }}
          />
        ))}

        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-0"
            style={{
              left: `${(i / 23) * 100}%`,
              width: "0.5px",
              background: "rgba(100,160,220)",
            }}
          />
        ))}
      </div>

      {/* Content */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-[0.42fr_0.58fr]
          gap-[clamp(40px,6vw,100px)]
        "
        style={{
          maxWidth: "1280px",
          padding:
            "clamp(56px,9vh,100px) clamp(24px,5vw,72px) clamp(40px,5vh,60px)",
        }}
      >
        {/* Left */}

        <aside
          ref={headingRef}
          className="self-start lg:sticky lg:top-[120px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={
              headingInView
                ? { opacity: 1, y: 0 }
                : {}
            }
            transition={{
              duration: 0.6,
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <span
                className="font-mono uppercase tracking-[0.42em]"
                style={{
                  fontSize: "clamp(7px,0.62vw,9px)",
                }}
              >
                Process
              </span>

              <div
                aria-hidden="true"
                style={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(90deg,#000 0%,transparent 100%)",
                }}
              />
            </div>

            <h2
              id="how-we-work-heading"
              className="font-serif leading-none tracking-tight"
              style={{
                fontSize: "clamp(46px,7vw,104px)",
              }}
            >
              How It
              <br />
              Works
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={
                headingInView
                  ? { opacity: 1 }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
              style={{
                fontSize: "clamp(12px,0.95vw,14px)",
                lineHeight: 1.8,
                maxWidth: "420px",
              }}
            >
              A transparent, phased process designed to keep you informed and
              in control at every stage — from first meeting to final handover.
            </motion.p>
          </motion.div>
        </aside>

        {/* Right */}

        <main>
          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>

          {/* Footer */}

          <footer
            className="mt-[clamp(18px,3vh,32px)] flex items-start gap-4"
            style={{
              borderTop: "0.5px solid rgba(0,0,0)",
              paddingTop: "clamp(14px,2.5vh,24px)",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: "24px",
                height: "1px",
                background: "#000",
                marginTop: 8,
                flexShrink: 0,
              }}
            />

            <p
              style={{
                fontSize: "clamp(10px,0.8vw,11px)",
                lineHeight: 1.75,
              }}
            >
              Payment milestones are structured to align with verified project
              progress. All schedules and timelines are confirmed before
              commencement.
            </p>
          </footer>
        </main>
      </div>
    </motion.section>
  );
}
