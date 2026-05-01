"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { use, useEffect, useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const {scrollYProgress} = useScroll();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if(v > 0.5){
        setVisible(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  if(!visible) return null;
  // const navOpacity = useTransform(scrollYProgress, [0.12, 0.16], [0, 1]);
  // const navY = useTransform(scrollYProgress, [0.12, 0.16], [-40, 0]);

  return (
    <motion.header
      style={{ opacity: 0, y: -40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{duration:0.6, ease: "easeOut"}}
      className="fixed left-0 top-0 z-[999] w-full border-b border-black/10 bg-[#f5f2eb]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* LOGO */}
        <div className="font-serif text-2xl italic tracking-tight">
          Aurea Studio
        </div>

        {/* NAV ITEMS */}
        <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.25em] md:flex">
          {["Work", "Studio", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative px-1"
            >
              {/* TEXT */}
              <span className="relative z-10 transition-all duration-300 group-hover:text-black/60">
                {item}
              </span>

              {/* UNDERLINE */}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full" />

              {/* ARCHITECTURAL CORNERS */}
              <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-black opacity-0 transition-all duration-300 group-hover:opacity-100" />
              <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-black opacity-0 transition-all duration-300 group-hover:opacity-100" />

              {/* SOFT SHADOW */}
              <span className="absolute inset-0 rounded-md opacity-0 transition duration-300 group-hover:opacity-100 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]" />
            </a>
          ))}
        </nav>

        {/* MOBILE MENU */}
        <button className="md:hidden">
          <Menu size={24} />
        </button>

      </div>
    </motion.header>
  );
}
