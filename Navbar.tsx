"use client";

import { motion, type MotionValue } from "motion/react";
import { Menu } from "lucide-react";

type NavbarProps = {
  navOpacity: MotionValue<number>;
  navY: MotionValue<number>;
};

export default function Navbar({ navOpacity, navY }: NavbarProps) {
  return (
    <motion.header
      style={{
        opacity: navOpacity,
        y: navY,
      }}
      className="pointer-events-auto fixed left-0 top-0 z-[999] w-full border-b border-black/10 bg-[#f5f2eb]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* LOGO */}
        <a
          href="#top"
          className="font-serif text-2xl italic tracking-tight"
        >
          Aurea Studio
        </a>

        {/* NAV ITEMS */}
        <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.25em] md:flex">
          {[
            { label: "Work", href: "#work" },
            { label: "Studio", href: "#studio" },
            { label: "Services", href: "#studio" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative px-1"
            >
              <span className="relative z-10 transition-all duration-300 group-hover:text-black/60">
                {item.label}
              </span>

              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full" />

              <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-black opacity-0 transition-all duration-300 group-hover:opacity-100" />

              <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-black opacity-0 transition-all duration-300 group-hover:opacity-100" />

              <span className="absolute inset-0 rounded-md opacity-0 transition duration-300 group-hover:opacity-100 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]" />
            </a>
          ))}
        </nav>

        {/* MOBILE MENU */}
        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden"
        >
          <Menu size={24} />
        </button>
      </div>
    </motion.header>
  );
      }
