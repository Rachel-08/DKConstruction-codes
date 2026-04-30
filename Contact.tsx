"use client";

import { motion } from "motion/react";
import type { MotionValue } from "motion";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

type Props = {
  contactOpacity: MotionValue<number>;
  contactY: MotionValue<number>;
};

export default function ContactSection({
  contactOpacity,
  contactY,
}: Props) {
  return (
    <motion.section
      style={{ opacity: contactOpacity, y: contactY }}
      className="absolute inset-0 z-[70] flex items-center bg-black px-6 text-white"
    >
      {/* SUBTLE FADE OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        
        {/* TOP LABEL */}
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
          Contact
        </p>

        {/* MAIN HEADING */}
        <h2 className="mt-6 font-serif text-5xl leading-tight md:text-7xl">
          Let’s build something timeless together.
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-8 max-w-md text-lg leading-8 text-neutral-400">
          Reach out to discuss your project, collaboration, or ideas.
          We’d love to hear from you.
        </p>

        {/* CTA + CONTACT */}
        <div className="mt-12 flex flex-col gap-8">

          {/* BUTTON */}
          <button className="w-fit border border-white px-10 py-4 text-xs uppercase tracking-[0.3em] transition hover:bg-white hover:text-black">
            Get in touch
          </button>

          {/* EMAIL */}
          <div className="text-sm text-neutral-400">
            hello@aureastudio.com
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-6">

            <a
              href="https://instagram.com"
              target="_blank"
              className="group"
            >
              <Instagram
                size={20}
                className="transition duration-300 group-hover:scale-110 group-hover:text-white/60"
              />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              className="group"
            >
              <Linkedin
                size={20}
                className="transition duration-300 group-hover:scale-110 group-hover:text-white/60"
              />
            </a>

            <a
              href="https://wa.me/911234567890"
              target="_blank"
              className="group"
            >
              <Phone
                size={20}
                className="transition duration-300 group-hover:scale-110 group-hover:text-white/60"
              />
            </a>

            <a
              href="mailto:hello@aureastudio.com"
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
