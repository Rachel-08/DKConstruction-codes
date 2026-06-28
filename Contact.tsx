"use client";

import { useRef } from "react";
import { motion, useInView, type MotionValue } from "motion/react";
import { Mail, Phone } from "lucide-react";

type ContactSectionProps = {
  isActive: boolean;
  contactOpacity: MotionValue<number>;
  contactY: MotionValue<string>;
  /** When true the section renders in normal document flow (mobile layout). */
  isMobileFlow?: boolean;
};

const exactMapSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3712.004831601632!2d86.9101116!3d21.5075307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1cf500463f7a81%3A0x6ba2f575110fb1c2!2sDK%20CONSTRUCTION%20%26%20CONSULTANCY!5e0!3m2!1sen!2sin!4v1780477629214!5m2!1sen!2sin";

// ─────────────────────────────────────────────
// Mobile normal-flow layout
// ─────────────────────────────────────────────

function MobileContactFlow() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-8%" });

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-6%" });

  return (
    <section className="bg-black text-white">
      <div className="px-5 pt-14 pb-10">
        {/* Header */}
        <div ref={headingRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-400"
          >
            Contact
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-serif text-[36px] leading-tight tracking-tighter"
          >
            Let's build something timeless together.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-5 text-[14px] leading-7 text-neutral-400"
          >
            Reach out to discuss your project, collaboration, or ideas. We'd
            love to hear from you.
          </motion.p>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-7"
        >
          <a
            href="mailto:hello@aureastudio.com"
            className="w-fit border border-white px-7 py-3 font-mono text-[10px] uppercase tracking-[0.3em] transition duration-300 active:bg-white active:text-black"
          >
            Get in touch
          </a>

          <p className="font-mono text-[11px] tracking-[0.18em] text-neutral-400">
            hello@aureastudio.com
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://wa.me"
              target="_blank"
              rel="noreferrer"
              aria-label="Contact on WhatsApp"
            >
              <Phone
                size={20}
                className="text-white/60 active:text-white transition duration-200"
              />
            </a>

            <a
              href="mailto:hello@aureastudio.com"
              aria-label="Send email"
            >
              <Mail
                size={20}
                className="text-white/60 active:text-white transition duration-200"
              />
            </a>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, y: 20 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 relative w-full overflow-hidden rounded-2xl border border-neutral-800 group/map isolate"
          style={{ aspectRatio: "4/3" }}
        >
          <iframe
            title="DK Construction & Consultancy Location Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={exactMapSrc}
            className="relative z-10 w-full h-full opacity-80 contrast-125 select-none pointer-events-none"
          />

          {/* Tap overlay opens Google Maps */}
          <a
            href="https://maps.app.goo.gl/N4bj2Vxq1Zs6SZBh9"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-20 block w-full h-full bg-transparent pointer-events-auto"
            aria-label="Open DK Construction & Consultancy in Google Maps"
          >
            <span className="sr-only">
              Open DK Construction &amp; Consultancy in Google Maps
            </span>
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-5 pb-10 pt-8">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>DK Construction &amp; Consultancy · Balasore, Odisha</p>
          <p className="font-mono uppercase tracking-[0.24em] text-[10px] text-white/70">
            © {new Date().getFullYear()} DK Constructions
          </p>
        </div>
      </footer>
    </section>
  );
}

// ─────────────────────────────────────────────
// ContactSection
// ─────────────────────────────────────────────

export default function ContactSection({
  isActive,
  contactOpacity,
  contactY,
  isMobileFlow = false,
}: ContactSectionProps) {

  // ── Mobile normal-flow render ──
  if (isMobileFlow) {
    return <MobileContactFlow />;
  }

  // ── Desktop / tablet scroll-driven render (unchanged) ──
  return (
    <motion.section
      style={{
        opacity: contactOpacity,
        y: contactY,
        zIndex: isActive ? 1 : 0,
      }}
      className={`absolute inset-0 bg-black text-white overflow-y-auto ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* TWO-COLUMN GRID LAYOUT (60/40 Split) */}
      <div className="relative z-10 grid min-h-full grid-cols-1 xl:grid-cols-[0.6fr_0.4fr] items-start px-4 md:px-6 lg:px-12 xl:px-20 py-12 md:py-16 gap-10">

        {/* LEFT COLUMN: CONTACT TEXT PANEL */}
        <div className="flex items-start">
          <div className="pointer-events-auto w-full max-w-xl mx-auto lg:mx-0">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
              Contact
            </p>

            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Let's build something timeless together.
            </h2>

            <p className="mt-8 text-base leading-8 text-neutral-400 md:text-lg">
              Reach out to discuss your project, collaboration, or ideas. We'd love
              to hear from you.
            </p>

            <div className="mt-12 flex flex-col gap-8">
              <a
                href="mailto:hello@aureastudio.com"
                className="w-fit border border-white px-8 py-3 text-[11px] uppercase tracking-[0.3em] transition duration-300 hover:bg-white hover:text-black"
              >
                Get in touch
              </a>

              <div className="text-sm text-neutral-400">
                hello@aureastudio.com
              </div>

              <div className="flex items-center gap-6">
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Contact on WhatsApp"
                  className="group"
                >
                  <Phone
                    size={20}
                    className="transition duration-300 group-hover:scale-110 group-hover:text-white/60"
                  />
                </a>

                <a
                  href="mailto:hello@aureastudio.com"
                  aria-label="Send email"
                  className="group"
                >
                  <Mail
                    size={20}
                    className="transition duration-300 group-hover:scale-110 group-hover:text-white/60"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE GOOGLE MAP */}
        <div className="w-full max-w-full aspect-4/3 md:aspect-square mx-auto lg:ml-auto lg:mr-0 relative overflow-hidden rounded-2xl border border-neutral-800 group/map isolate">
          <iframe
            title="DK Construction & Consultancy Location Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={exactMapSrc}
            className="relative z-10 w-full h-full opacity-80 contrast-125 select-none pointer-events-none transition duration-300 group-hover/map:opacity-100"
          />

          <a
            href="https://maps.app.goo.gl/N4bj2Vxq1Zs6SZBh9"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-20 block w-full h-full cursor-pointer bg-transparent pointer-events-auto"
            aria-label="Open DK Construction & Consultancy in Google Maps"
          >
            <span className="sr-only">
              Open DK Construction &amp; Consultancy in Google Maps
            </span>
          </a>
        </div>
      </div>

      <footer className="border-t border-white/10 px-4 pb-8 pt-10 md:px-6 lg:px-12 xl:px-20">
        <div className="mx-auto flex flex-col gap-3 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>DK Construction &amp; Consultancy · Balasore, Odisha</p>
          <p className="uppercase tracking-[0.24em] text-[10px] text-white/70">
            © {new Date().getFullYear()} DK Constructions
          </p>
        </div>
      </footer>
    </motion.section>
  );
}
