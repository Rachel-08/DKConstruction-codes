"use client";

import { useState, useEffect, useRef, forwardRef, useInView } from "react";
import { motion, AnimatePresence, type MotionValue } from "motion/react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Service = {
  id: number;
  number: string;
  keyword: string;
  fullTitle: string;
  description: string;
  detail: string[];
  image: string;
};

type ServicesSectionProps = {
  isActive: boolean;
  servicesOpacity: MotionValue<number>;
  servicesY: MotionValue<string>;
  servicesExitY: MotionValue<string>;
  /** When true the section renders in normal document flow (mobile layout). */
  isMobileFlow?: boolean;
};

type ContactForm = {
  phone: string;
  email: string;
};

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const SERVICES: Service[] = [
  {
    id: 1,
    number: "01",
    keyword: "Construction",
    fullTitle: "Complete Building Construction",
    description:
      "Full-scale construction with premium materials. From foundation to finishing — every element sourced, managed, and delivered.",
    detail: ["Foundation", "Structure", "Finishing", "Materials"],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    number: "02",
    keyword: "PLAN",
    fullTitle: "Floor Planning & Design",
    description:
      "Precise spatial layouts that balance flow, function, and form. Every square foot considered with purpose.",
    detail: ["Layouts", "Zoning", "Flow", "Function"],
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    number: "03",
    keyword: "STRUCT",
    fullTitle: "Structural Design",
    description:
      "Engineering-grade structural systems designed for longevity, safety, and load integrity across all typologies.",
    detail: ["Engineering", "Safety", "Loads", "Systems"],
    image:
      "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    number: "04",
    keyword: "DESIGN",
    fullTitle: "3D Interior & Exterior Design",
    description:
      "Photorealistic 3D visualisations with material selection, lighting simulation, and finish specification.",
    detail: ["3D Renders", "Materials", "Lighting", "Exteriors"],
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    number: "05",
    keyword: "APPROVE",
    fullTitle: "Municipality & Approval Services",
    description:
      "End-to-end handling of Municipal, N.A.C., Fire & BRIT approvals. We navigate compliance so your project moves without friction.",
    detail: ["Municipal", "N.A.C.", "Fire NOC", "BRIT"],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    number: "06",
    keyword: "RENEW",
    fullTitle: "Renovation Work",
    description:
      "Considered renovation that respects existing character while introducing contemporary precision. Old bones, new life.",
    detail: ["Restoration", "Remodel", "Retrofit", "Refresh"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
];

// ─────────────────────────────────────────────
// Contact Overlay
// ─────────────────────────────────────────────

function ContactOverlay({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<ContactForm>({ phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async () => {
    if (!form.phone) return;

    setStatus("sending");

    try {
      const res = await fetch(
        `https://graph.facebook.com/v19.0/YOUR_PHONE_NUMBER_ID/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer YOUR_WHATSAPP_ACCESS_TOKEN`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: form.phone.replace(/\D/g, ""),
            type: "text",
            text: {
              body: `Hello! Thank you for reaching out.\n\nWe've received your enquiry and our team will contact you shortly.\n\n— The Studio`,
            },
          }),
        }
      );

      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[300] flex items-center justify-center px-4 py-6"
      style={{
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(10px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 36, scale: 0.95 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[480px] overflow-hidden rounded-[10px] sm:rounded-[4px]"
        style={{
          background: "linear-gradient(160deg,#0c0a06 0%,#060402 100%)",
          border: "0.5px solid rgba(200,160,80,0.2)",
          boxShadow: "0 48px 120px rgba(0,0,0,0.9)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between p-5 sm:p-6"
          style={{ borderBottom: "0.5px solid rgba(200,160,80,0.1)" }}
        >
          <div className="flex flex-col gap-2">
            <span
              className="font-mono text-[7px] uppercase tracking-[0.32em] sm:text-[8px] sm:tracking-[0.38em]"
              style={{ color: "rgba(200,160,80,0.45)" }}
            >
              Lets Connect
            </span>

            <h3
              className="font-serif text-[24px] leading-tight sm:text-[30px]"
              style={{ color: "#e8d8b8" }}
            >
              Lets Make Fortune
            </h3>

            <p
              className="max-w-[260px] text-[12px] leading-relaxed sm:text-[14px]"
              style={{ color: "rgba(200,180,150,0.42)" }}
            >
              Drop your number and we will reach out to begin your project.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full transition hover:bg-white/5"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(200,160,80,0.45)",
              fontSize: 16,
            }}
            aria-label="Close contact form"
          >
            ✕
          </button>
        </div>

        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-5 p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="flex size-[52px] items-center justify-center rounded-full"
              style={{
                border: "1px solid rgba(200,160,80,0.4)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-[22px]">
                <polyline
                  points="4,12 9,17 20,7"
                  stroke="rgba(200,160,80,0.85)"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>

            <div className="flex flex-col gap-2">
              <p
                className="font-serif text-[18px] sm:text-[20px]"
                style={{ color: "#e8d8b8" }}
              >
                Message sent
              </p>

              <p
                className="font-mono text-[8px] tracking-[0.25em]"
                style={{ color: "rgba(200,160,80,0.4)" }}
              >
                WE WILL BE IN TOUCH SHORTLY
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4 p-5 sm:p-6">
            <div className="flex flex-col gap-2">
              <label
                className="font-mono text-[8px] uppercase tracking-[0.24em] sm:text-[10px] sm:tracking-[0.28em]"
                style={{ color: "rgba(200,160,80,0.4)" }}
              >
                Phone Number *
              </label>

              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="+91 98765 43210"
                className="w-full rounded-[4px] px-4 py-3 text-[14px] outline-none"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "0.5px solid rgba(200,160,80,0.14)",
                  color: "#e8d8b8",
                  fontFamily: "inherit",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(200,160,80,0.45)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(200,160,80,0.14)")
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="font-mono text-[8px] uppercase tracking-[0.24em] sm:text-[10px] sm:tracking-[0.28em]"
                style={{ color: "rgba(200,160,80,0.4)" }}
              >
                Email{" "}
                <span
                  style={{
                    color: "rgba(200,160,80,0.22)",
                    letterSpacing: "0.1em",
                  }}
                >
                  (optional)
                </span>
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="you@example.com"
                className="w-full rounded-[4px] px-4 py-3 text-[14px] outline-none"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "0.5px solid rgba(200,160,80,0.14)",
                  color: "#e8d8b8",
                  fontFamily: "inherit",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(200,160,80,0.45)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(200,160,80,0.14)")
                }
              />
            </div>

            <motion.button
              whileHover={form.phone ? { scale: 1.015 } : {}}
              whileTap={form.phone ? { scale: 0.985 } : {}}
              onClick={handleSubmit}
              disabled={!form.phone || status === "sending"}
              className="mt-2 rounded-[4px] px-6 py-4"
              style={{
                background: form.phone
                  ? "linear-gradient(90deg,#c8a052,#e8c070,#b88840)"
                  : "rgba(200,160,80,0.1)",
                border: "none",
                cursor: form.phone ? "pointer" : "not-allowed",
                fontFamily: "inherit",
              }}
            >
              <span
                className="font-mono text-[8px] uppercase tracking-[0.28em] sm:text-[9px] sm:tracking-[0.32em]"
                style={{
                  color: form.phone ? "#0e0b07" : "rgba(200,160,80,0.3)",
                }}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </span>
            </motion.button>

            {status === "error" && (
              <p
                className="text-center font-mono text-[8px] tracking-[0.2em]"
                style={{ color: "rgba(220,100,80,0.7)" }}
              >
                FAILED — PLEASE TRY AGAIN
              </p>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// ServiceColumn
// ─────────────────────────────────────────────
type ServiceColumnProps = {
  service: Service;
  index: number;
  total: number;
  isActive: boolean;
};

export const ServiceColumn = forwardRef<HTMLDivElement, ServiceColumnProps>(
  ({ service, index, total, isActive }, ref) => {
    const [hovered, setHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
      const raf = requestAnimationFrame(() => setIsMounted(true));

      if (typeof window === "undefined") {
        return () => cancelAnimationFrame(raf);
      }

      const update = () => setIsDesktop(window.innerWidth >= 768);
      update();
      window.addEventListener("resize", update);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", update);
      };
    }, []);

    return (
      <motion.div
        ref={ref}
        initial={isMounted ? { opacity: 0, y: 28 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: index * 0.07,
          ease: [0.22, 1, 0.36, 1],
        }}
        onHoverStart={() => isDesktop && setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className={
          `
          snap-start md:snap-none min-h-[80vh] md:min-h-0 relative flex flex-col cursor-default bg-black
          w-full rounded-[18px] border border-white/10 p-5 gap-3
          transition duration-300 ease-out
          ${isActive ? "shadow-[0_22px_80px_rgba(0,0,0,0.3)] border-white/20" : "opacity-90"}
          md:overflow-hidden md:p-0 md:gap-0 md:h-auto md:flex-1 md:rounded-none md:border-0
        `
        }
        style={{
          borderRight: index < total - 1 && isDesktop ? "0.5px solid rgba(255,255,255,0.06)" : undefined,
        }}
      >
        {/* ── Image Canvas Area ── */}
        <div
          className="
            relative w-full overflow-hidden shrink-0 rounded-[12px]
            h-[140px] min-[390px]:h-[155px]
            md:rounded-none md:h-[62vh]
          "
        >
          <motion.img
            src={service.image}
            alt={service.fullTitle}
            draggable={false}
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full select-none object-cover object-center md:object-top"
            style={{ transformOrigin: "top center" }}
          />

          <div className="absolute inset-0 bg-black/35 md:hidden" />

          <div
            className="absolute inset-x-0 bottom-0 hidden md:block"
            style={{
              height: "100%",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.9) 80%, #000 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background: hovered ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.32)",
              transition: "background 0.45s ease",
            }}
          />

          <motion.div
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 z-10 h-[1.5px] origin-left hidden md:block"
            style={{
              background: "linear-gradient(90deg,#c8a052,#e8c070,transparent)",
            }}
          />

          <div
            className="
              absolute z-10 font-mono left-3 top-3 text-[9px] tracking-[0.28em]
              md:left-[clamp(10px,1.4vw,18px)] md:top-[clamp(12px,2vh,20px)]
              md:text-[clamp(7px,0.6vw,9px)] md:tracking-[0.32em]
            "
            style={{ color: "rgba(200,160,80,0.85)" }}
          >
            {service.number}
          </div>
        </div>

        <div
          className="
            relative flex min-w-0 flex-col justify-start w-full pr-1 select-text
            md:absolute md:inset-x-0 md:z-20 md:h-[40vh] md:p-0
            md:bottom-[-12px] lg:bottom-[20px] xl:bottom-[48px]
          "
          style={{
            pointerEvents: !isDesktop ? "auto" : "none",
          }}
        >
          <span className="mb-1 block font-mono text-[8px] uppercase tracking-[0.26em] text-[#c8a052] md:hidden">
            {service.keyword}
          </span>

          <div
            className="w-full bg-transparent p-0 md:bg-[rgba(255,255,255,0.04)] md:px-[clamp(8px,1vw,14px)] md:py-[clamp(5px,0.8vh,9px)]"
            style={{
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <h3
              className="
                font-serif text-[22px] font-bold leading-tight text-white
                md:text-right md:text-[clamp(13px,1.6vw,22px)] md:leading-none
              "
              style={{
                color: hovered ? "#fff8ee" : "rgba(240,224,192,0.86)",
                letterSpacing: "0.03em",
                transition: "color 0.35s ease",
              }}
            >
              {service.fullTitle}
            </h3>
          </div>

          <div className="mt-2 flex flex-col gap-4 md:mt-0 md:gap-2 md:pt-3">
            <p
              className="
                text-[12px] leading-relaxed text-stone-400
                md:line-clamp-none md:px-[10px] md:text-[clamp(8px,0.80vw,16px)] md:leading-[1.4]
              "
              style={{ color: "rgba(210,190,158,0.68)" }}
            >
              {service.description}
            </p>

            <div className="grid grid-cols-1 gap-y-2 mt-1 md:hidden">
              {service.detail.map((d, i) => (
                <div
                  key={i}
                  className="
                    flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em]
                    md:gap-2 md:pl-[10px] md:text-[clamp(6px,0.80vw,16px)] md:leading-[2.2] md:tracking-[0.18em]
                  "
                  style={{ color: "rgba(200,160,80,0.65)" }}
                >
                  <span
                    className="h-px w-2 shrink-0 md:w-3"
                    style={{
                      background: "rgba(200,160,80,0.4)",
                      transform: "translateY(0.5px)",
                    }}
                  />
                  <span className="whitespace-nowrap">{d.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);
ServiceColumn.displayName = "ServiceColumn";

// ─────────────────────────────────────────────
// Mobile-flow Services — simple stacked list, no transforms
// ─────────────────────────────────────────────

function MobileServicesFlow({ onOpenOverlay }: { onOpenOverlay: () => void }) {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-8%" });

  return (
    <section className="bg-black">
      {/* Section header */}
      <div ref={headingRef} className="px-5 pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-5"
        >
          <span
            className="font-mono text-[8px] uppercase tracking-[0.38em]"
            style={{ color: "rgba(200,160,80,0.5)" }}
          >
            Services
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(200,160,80,0.14)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[42px] leading-none tracking-tight text-white"
        >
          What we do
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-3 text-[13px] leading-relaxed"
          style={{ color: "rgba(210,190,158,0.55)" }}
        >
          Six disciplines practised under one roof — from the first sketch to the final handover.
        </motion.p>
      </div>

      {/* Service cards */}
      <div className="flex flex-col gap-4 px-4 pb-6">
        {SERVICES.map((service, i) => (
          <MobileServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="px-4 pb-10">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onOpenOverlay}
          className="w-full rounded-[10px] py-4 font-mono text-[10px] uppercase tracking-[0.28em] text-black"
          style={{ background: "linear-gradient(90deg,#c8a052,#e8c070,#b88840)" }}
        >
          Lets Make Fortune
        </motion.button>
      </div>
    </section>
  );
}

function MobileServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[14px] overflow-hidden border border-white/10 bg-black"
    >
      {/* Text block */}
      <div className="px-4 pt-4 pb-3 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-[8px] tracking-[0.28em]"
            style={{ color: "rgba(200,160,80,0.7)" }}
          >
            {service.number}
          </span>
          <span
            className="font-mono text-[8px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(200,160,80,0.4)" }}
          >
            {service.keyword}
          </span>
        </div>

        <h3
          className="font-serif text-[20px] leading-snug"
          style={{ color: "rgba(240,224,192,0.9)" }}
        >
          {service.fullTitle}
        </h3>

        <p
          className="text-[12px] leading-relaxed mt-0.5"
          style={{ color: "rgba(210,190,158,0.55)" }}
        >
          {service.description}
        </p>
      </div>

      {/* Thumbnail */}
      <div className="relative h-[120px] w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.fullTitle}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover select-none"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// ServicesSection
// ─────────────────────────────────────────────

export default function ServicesSection({
  isActive,
  servicesOpacity,
  servicesY,
  servicesExitY,
  isMobileFlow = false,
}: ServicesSectionProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const serviceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (typeof window !== "undefined") setIsMobile(window.innerWidth < 768);
    });

    if (typeof window === "undefined") return () => cancelAnimationFrame(raf);

    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const activeTarget = visible[0].target;
        const index = serviceRefs.current.findIndex((ref) => ref === activeTarget);

            if (index !== -1) {
              setActiveServiceIndex(index);
            }
      },
      {
        root: wrapperRef.current,
        rootMargin: "0px",
        threshold: [0.45, 0.65, 0.85],
      }
    );

    serviceRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, [isActive]);

  // ── Mobile normal-flow render ──
  if (isMobileFlow) {
    return (
      <>
        <MobileServicesFlow onOpenOverlay={() => setShowOverlay(true)} />
        <AnimatePresence>
          {showOverlay && <ContactOverlay onClose={() => setShowOverlay(false)} />}
        </AnimatePresence>
      </>
    );
  }

  // ── Desktop / tablet scroll-driven render (unchanged) ──
  return (
    <>
      <motion.section
        ref={wrapperRef}
        style={{
          opacity: servicesOpacity,
          y: isActive ? servicesExitY : servicesY,
          position: "absolute",
          inset: 0,
          zIndex: isActive ? 1 : 0,
          pointerEvents: isActive ? "auto" : "none",
          background: "#000",
          ...(isMobile
            ? {
                height: "100dvh",
                maxHeight: "100dvh",
                overflowY: "auto",
                overflowX: "hidden",
                touchAction: "pan-y",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "auto",
              }
            : {}),
        }}
        className={`flex flex-col ${isMobile ? 'snap-y snap-mandatory' : ''}`}
        aria-hidden={!isActive}
      >
        {/* Section Heading Tag Label */}
        <div
          className="
            absolute z-30 flex items-center gap-3 left-5 top-5
            md:left-[clamp(18px,3vw,42px)] md:top-[clamp(14px,2.2vh,24px)]
          "
        >
          <span
            className="font-mono text-[8px] uppercase tracking-[0.36em] md:text-[clamp(6px,0.55vw,8px)] md:tracking-[0.42em]"
            style={{ color: "rgba(200,160,80,0.38)" }}
          >
            Services
          </span>
          <div className="h-px w-6 md:w-[clamp(16px,2vw,28px)]" style={{ background: "rgba(200,160,80,0.14)" }} />
        </div>

        {/* ── Vertical Responsive Services Layout Stack ── */}
        <div className="md:hidden px-4 pt-4">
          <div
            className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-[9px] uppercase tracking-[0.28em] text-[#c8a052]"
            aria-live="polite"
          >
            <span>{SERVICES[activeServiceIndex].number}</span>
            <span>{SERVICES[activeServiceIndex].keyword}</span>
            <span className="font-medium text-[#f9f3e8]">Active</span>
          </div>
        </div>

        <div
          className="
            flex min-h-0 flex-col gap-6 px-4 pt-2 pb-32
            snap-y snap-mandatory md:flex-1 md:flex-row md:gap-0 md:px-0 md:pb-0 md:pt-0 md:snap-none md:overflow-visible
          "
        >
          {SERVICES.map((service, i) => (
            <ServiceColumn
              key={service.id}
              service={service}
              index={i}
              total={SERVICES.length}
              isActive={activeServiceIndex === i}
              ref={(el) => {
                serviceRefs.current[i] = el;
              }}
            />
          ))}
        </div>

        {/* ── Desktop Text Information Strip Footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="
            hidden md:flex z-40 shrink-0 relative bottom-[10%] items-end justify-between
            bg-gradient-to-b from-transparent to-black/85
            px-[clamp(22px,3.8vw,52px)] pb-[clamp(16px,2.8vh,30px)] pt-[clamp(14px,2.4vh,28px)]
          "
        >
          <div className="w-full max-w-[85vw] flex-col gap-4 flex xl:max-w-[75vw]">
            <span className="font-cursive text-[clamp(40px,8vw,5rem)] font-extrabold leading-none tracking-wide text-white/95">
              What we do
            </span>
            <p className="max-w-[85%] text-[clamp(15px,1.6vw,18px)] font-light italic leading-relaxed tracking-wide text-[#c8b496]/70">
              Six disciplines practised under one roof — from the first sketch to the final handover. Every project built with the same commitment to precision, material, and craft.
            </p>
          </div>

          {/* DESKTOP BRAND CTA BUTTON LAYOUT */}
          <motion.button
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowOverlay(true)}
            className="
              group relative cursor-pointer overflow-hidden bg-[#c8b496] w-auto
              rounded-[24px_0px_24px_0px] px-[clamp(18px,2.6vw,36px)] py-[clamp(10px,1.4vh,16px)] border border-white/20
            "
          >
            <motion.div
              variants={{ initial: { x: "-100%" }, hover: { x: 0 } }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 bg-black"
            />
            <motion.span
              variants={{ initial: { color: "#000000" }, hover: { color: "#ffffff" } }}
              transition={{ duration: 0.3 }}
              className="relative z-10 block text-center font-mono text-[clamp(9px,0.75vw,11px)] font-semibold uppercase tracking-[0.32em]"
            >
              Lets Make Fortune
            </motion.span>
          </motion.button>
        </motion.div>

        {/* ── MOBILE BREAKPOINT ONLY: Circular Floating Action Button ── */}
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowOverlay(true)}
            className="
              flex items-center justify-center bg-[#c8b496] active:bg-[#b5a082]
              w-[68px] h-[68px] rounded-full shadow-[0_12px_36px_rgba(200,160,80,0.35)]
              border border-white/20 cursor-pointer
            "
            aria-label="Open Contact Form"
          >
            <div className="flex flex-col items-center justify-center text-center leading-[1.05]">
              <span className="font-mono text-[7px] font-black uppercase text-black tracking-wider">Lets</span>
              <span className="font-mono text-[7px] font-black uppercase text-black tracking-wider">Make</span>
              <span className="font-mono text-[6px] font-medium uppercase text-black/70 tracking-tighter mt-0.5">$$$</span>
            </div>
          </motion.button>
        </div>
      </motion.section>

      {/* Interactive Form Contact Overlay Grid Sheet */}
      <AnimatePresence>
        {showOverlay && <ContactOverlay onClose={() => setShowOverlay(false)} />}
      </AnimatePresence>
    </>
  );
}
