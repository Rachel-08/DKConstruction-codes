"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type NavbarProps = {
  showNavbar: boolean;
  onNavigate?: (target: "home" | "howwework" | "team" | "contact") => void;
  activeSegment?: string;
};

// ─────────────────────────────────────────────
// Nav items
// ─────────────────────────────────────────────

const NAV_ITEMS: {
  label: string;
  target: "home" | "howwework" | "team" | "contact";
}[] = [
  { label: "Home",        target: "home"      },
  { label: "How We Work", target: "howwework" },
  { label: "Team",        target: "team"       },
  { label: "Contact",     target: "contact"    },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function Navbar({
  showNavbar,
  onNavigate,
  activeSegment,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNav = (target: "home" | "howwework" | "team" | "contact") => {
    setMobileOpen(false);
    onNavigate?.(target);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={
          showNavbar
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -50 }
        }
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="pointer-events-auto fixed left-0 top-0 z-[999] w-full"
        style={{
          borderBottom: "0.5px solid rgba(26,18,8,0.1)",
          background: "rgba(245,242,235,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">

          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="font-serif text-xl italic tracking-tight md:text-2xl"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1a1208",
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            Aurea Studio
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex lg:gap-10">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSegment === item.target;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.target)}
                  className="group relative px-1"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    padding: "4px 4px",
                  }}
                >
                  {/* Label */}
                  <span
                    className="relative z-10 font-mono uppercase transition-colors duration-300"
                    style={{
                      fontSize: "clamp(8px,0.68vw,10px)",
                      letterSpacing: "0.28em",
                      // ── HIGHLIGHT ── active = brass gold, inactive = dark muted
                      color: isActive
                        ? "#c8a052"
                        : "rgba(26,18,8,0.45)",
                    }}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator — dot below */}
                  <motion.span
                    animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      transformOrigin: "center",
                      position: "absolute",
                      bottom: -2,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#c8a052",
                    }}
                  />

                  {/* Hover underline */}
                  <span
                    className="absolute bottom-0 left-0 h-[0.5px] w-0 transition-all duration-300 group-hover:w-full"
                    style={{ background: "rgba(200,160,80,0.5)" }}
                  />
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex items-center justify-center md:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1a1208",
              padding: 4,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[998] flex flex-col"
            style={{
              background: "rgba(245,242,235,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              paddingTop: "clamp(80px,14vh,110px)",
            }}
          >
            {/* Mobile nav items */}
            <nav className="flex flex-col px-8">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSegment === item.target;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleNav(item.target)}
                    className="flex items-center justify-between py-5"
                    style={{
                      background: "none",
                      border: "none",
                      borderBottom: "0.5px solid rgba(26,18,8,0.08)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="font-mono"
                        style={{
                          fontSize: 9,
                          color: "rgba(200,160,80,0.4)",
                          letterSpacing: "0.3em",
                        }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className="font-serif italic"
                        style={{
                          fontSize: "clamp(24px,6vw,36px)",
                          // ── HIGHLIGHT ── active item is brass, inactive is dark
                          color: isActive ? "#c8a052" : "#1a1208",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>

                    {isActive && (
                      <span
                        className="font-mono uppercase"
                        style={{
                          fontSize: 7,
                          color: "rgba(200,160,80,0.6)",
                          letterSpacing: "0.3em",
                        }}
                      >
                        Current
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Bottom studio name */}
            <div
              className="mt-auto px-8 pb-10"
            >
              <p
                className="font-mono uppercase"
                style={{
                  fontSize: 8,
                  color: "rgba(26,18,8,0.22)",
                  letterSpacing: "0.4em",
                }}
              >
                Aurea Studio · Architecture & Design
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
