"use client";

import { motion, type MotionValue } from "motion/react";
import { Mail, Phone } from "lucide-react";

type ContactSectionProps = {
  contactOpacity: MotionValue<number>;
  contactY: MotionValue<number>;
};

export default function ContactSection({
  contactOpacity,
  contactY,
}: ContactSectionProps) {
  return (
    <motion.section
      style={{
        opacity: contactOpacity,
        y: contactY,
      }}
      className="pointer-events-none absolute inset-0 z-[75] flex items-center bg-black px-6 text-white"
    >
      {/* SUBTLE FADE OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

      {/* CONTACT CONTENT */}
      <div className="pointer-events-auto relative mx-auto w-full max-w-7xl">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
          Contact
        </p>

        <h2 className="mt-6 max-w-4xl font-serif text-5xl leading-tight tracking-[-0.05em] md:text-7xl">
          Let’s build something timeless together.
        </h2>

        <p className="mt-8 max-w-md text-base leading-8 text-neutral-400 md:text-lg">
          Reach out to discuss your project, collaboration, or ideas. We’d love
          to hear from you.
        </p>

        <div className="mt-12 flex flex-col gap-8">
          <a
            href="mailto:hello@aureastudio.com"
            className="w-fit border border-white px-10 py-4 text-xs uppercase tracking-[0.3em] transition duration-300 hover:bg-white hover:text-black"
          >
            Get in touch
          </a>

          <div className="text-sm text-neutral-400">
            hello@aureastudio.com
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/911234567890"
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
    </motion.section>
  );
}
