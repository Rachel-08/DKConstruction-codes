"use client";

import { useRef } from "react";
import { motion, useInView, type MotionValue } from "motion/react";
import { Mail, Phone } from "lucide-react";

type ContactSectionProps = {
  isActive: boolean;
  contactOpacity: MotionValue<number>;
  contactY: MotionValue<string>;
  isMobileFlow?: boolean;
};

const exactMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3712.004831601632!2d86.9101116!3d21.5075307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1cf500463f7a81%3A0x6ba2f575110fb1c2!2sDK%20CONSTRUCTION%20%26%20CONSULTANCY!5e0!3m2!1sen!2sin!4v1780477629214!5m2!1sen!2sin";

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
        <div ref={headingRef}>
          <motion.p initial={{ opacity: 0 }} animate={headingInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-400">
            Contact
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 18 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.07, ease: [0.22, 1, 0.36, 1] }} className="mt-5 font-serif text-[36px] leading-tight tracking-tighter">
            Let's build something timeless together.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={headingInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.18 }} className="mt-5 text-[14px] leading-7 text-neutral-400">
            Reach out to discuss your project, collaboration, or ideas. We'd love to hear from you.
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }} className="mt-10 flex flex-col gap-7">
          <a href="mailto:hello@aureastudio.com" className="w-fit border border-white px-7 py-3 font-mono text-[10px] uppercase tracking-[0.3em] transition duration-300 active:bg-white active:text-black">
            Get in touch
          </a>
          <p className="font-mono text-[11px] tracking-[0.18em] text-neutral-400">hello@aureastudio.com</p>
          <div className="flex items-center gap-6">
            <a href="https://wa.me" target="_blank" rel="noreferrer" aria-label="WhatsApp"><Phone size={20} className="text-white/60" /></a>
            <a href="mailto:hello@aureastudio.com" aria-label="Email"><Mail size={20} className="text-white/60" /></a>
          </div>
        </motion.div>
        <motion.div ref={mapRef} initial={{ opacity: 0, y: 20 }} animate={mapInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="mt-10 relative w-full overflow-hidden rounded-2xl border border-neutral-800 isolate" style={{ aspectRatio: "4/3" }}>
          <iframe title="DK Construction & Consultancy Location Map" width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src={exactMapSrc} className="relative z-10 w-full h-full opacity-80 contrast-125 select-none pointer-events-none" />
          <a href="https://maps.app.goo.gl/N4bj2Vxq1Zs6SZBh9" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20 block" aria-label="Open in Google Maps"><span className="sr-only">Open DK Construction &amp; Consultancy in Google Maps</span></a>
        </motion.div>
      </div>
      <footer className="border-t border-white/10 px-5 pb-10 pt-8">
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>DK Construction &amp; Consultancy · Balasore, Odisha</p>
          <p className="font-mono uppercase tracking-[0.24em] text-[10px] text-white/70">© {new Date().getFullYear()} DK Constructions</p>
        </div>
      </footer>
    </section>
  );
}

// ─────────────────────────────────────────────
// ContactSection — desktop: plain section, rich useInView animations
// ─────────────────────────────────────────────

export default function ContactSection({ isActive, contactOpacity, contactY, isMobileFlow = false }: ContactSectionProps) {
  if (isMobileFlow) return <MobileContactFlow />;

  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-6%" });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-6%" });
  const footerRef = useRef<HTMLElement>(null);
  const footerInView = useInView(footerRef, { once: true, margin: "-4%" });

  // ── Desktop: plain section, no scroll-driven transforms ──
  return (
    <section className="bg-black text-white">
      <div className="relative z-10 grid min-h-screen grid-cols-1 xl:grid-cols-[0.6fr_0.4fr] items-start px-6 md:px-10 lg:px-16 xl:px-20 py-24 gap-12">

        {/* LEFT — text */}
        <div ref={leftRef} className="flex items-start">
          <div className="w-full max-w-xl mx-auto lg:mx-0 flex flex-col gap-0">

            {/* Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-400"
            >
              Contact
            </motion.p>

            {/* Heading */}
            <div className="overflow-hidden mt-6">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-4xl leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Let's build something timeless together.
              </motion.h2>
            </div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-base leading-8 text-neutral-400 md:text-lg"
            >
              Reach out to discuss your project, collaboration, or ideas. We'd love to hear from you.
            </motion.p>

            {/* Brass rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={leftInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 h-[1px] origin-left w-16"
              style={{ background: "linear-gradient(90deg,#c8a052,#e8c070,transparent)" }}
            />

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col gap-8"
            >
              <motion.a
                href="mailto:hello@aureastudio.com"
                whileHover={{ backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
                transition={{ duration: 0.25 }}
                className="w-fit border border-white px-8 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white"
                style={{ display: "inline-block" }}
              >
                Get in touch
              </motion.a>

              <div className="text-sm text-neutral-400">hello@aureastudio.com</div>

              <div className="flex items-center gap-6">
                <motion.a
                  href="https://wa.me"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  whileHover={{ scale: 1.15, color: "rgba(255,255,255,0.9)" }}
                  transition={{ duration: 0.2 }}
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  <Phone size={20} />
                </motion.a>
                <motion.a
                  href="mailto:hello@aureastudio.com"
                  aria-label="Email"
                  whileHover={{ scale: 1.15, color: "rgba(255,255,255,0.9)" }}
                  transition={{ duration: 0.2 }}
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT — map */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, x: 40 }}
          animate={mapInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full aspect-square mx-auto lg:ml-auto lg:mr-0 relative overflow-hidden rounded-2xl border border-neutral-800 group/map isolate"
        >
          <iframe
            title="DK Construction & Consultancy Location Map"
            width="100%" height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={exactMapSrc}
            className="relative z-10 w-full h-full opacity-80 contrast-125 select-none pointer-events-none transition duration-300 group-hover/map:opacity-100"
          />
          <a href="https://maps.app.goo.gl/N4bj2Vxq1Zs6SZBh9" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20 block cursor-pointer bg-transparent pointer-events-auto" aria-label="Open in Google Maps">
            <span className="sr-only">Open DK Construction &amp; Consultancy in Google Maps</span>
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <footer ref={footerRef} className="border-t border-white/10 px-6 pb-10 pt-8 md:px-10 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={footerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>DK Construction &amp; Consultancy · Balasore, Odisha</p>
          <p className="uppercase tracking-[0.24em] text-[10px] text-white/70">© {new Date().getFullYear()} DK Constructions</p>
        </motion.div>
      </footer>
    </section>
  );
}
