"use client";

import { motion, type MotionValue } from "motion/react";
import { Mail, Phone } from "lucide-react";

type ContactSectionProps = {
  isActive: boolean;
  contactOpacity: MotionValue<number>;
  contactY: MotionValue<string>;
};

export default function ContactSection({
  isActive,
  contactOpacity,
  contactY,
}: ContactSectionProps) {
  
  const exactMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3712.004831601632!2d86.9101116!3d21.5075307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1cf500463f7a81%3A0x6ba2f575110fb1c2!2sDK%20CONSTRUCTION%20%26%20CONSULTANCY!5e0!3m2!1sen!2sin!4v1780477629214!5m2!1sen!2sin";

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
              Let’s build something timeless together.
            </h2>

            <p className="mt-8 text-base leading-8 text-neutral-400 md:text-lg">
              Reach out to discuss your project, collaboration, or ideas. We’d love
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

        {/* 
  RIGHT COLUMN: INTERACTIVE GOOGLE MAP (PERFECT SQUARE) WITH CLICKABLE OVERLAY
*/}
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

  {/* Transparent Link Overlay - Intercepts clicks and opens Google Maps */}
  <a
    href="https://maps.app.goo.gl/N4bj2Vxq1Zs6SZBh9"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute inset-0 z-20 block w-full h-full cursor-pointer bg-transparent pointer-events-auto"
    aria-label="Open DK Construction & Consultancy in Google Maps"
  >
    <span className="sr-only">Open DK Construction & Consultancy in Google Maps</span>
  </a>
</div>

      </div>

            <footer className="border-t border-white/10 px-4 pb-8 pt-10 md:px-6 lg:px-12 xl:px-20">
              <div className="mx-auto flex flex-col gap-3 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  DK Construction & Consultancy · Balasore, Odisha
                </p>
                <p className="uppercase tracking-[0.24em] text-[10px] text-white/70">
                  © {new Date().getFullYear()} DK Constructions
                </p>
              </div>
            </footer>
    </motion.section>
  );
}
