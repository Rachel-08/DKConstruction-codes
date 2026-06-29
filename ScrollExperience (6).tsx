"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

import { useRouter } from "next/navigation";

import LoadingScreen from "@/components/common/LoadingScreen";
import Navbar from "@/components/common/Navbar";
import WelcomeWindow from "@/components/common/WelcomeWindow";
import StudioLanding from "@/components/desktop/sections/StudioLanding";
import ServicesSection from "@/components/desktop/sections/ServiceSection";
import SelectedWork from "@/components/desktop/sections/SelectedWork";
import HowWeWork from "@/components/desktop/sections/About";
import ContactSection from "@/components/desktop/sections/Contact";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type ActiveSegment =
  | "intro"
  | "landing"
  | "services"
  | "howwework"
  | "work"
  | "contact";

type NavigateTarget =
  | "home"
  | "services"
  | "howwework"
  | "team"
  | "contact";

type ViewportMode = "mobile" | "tablet" | "desktop" | "wide";

type Timeline = {
  scrollVh: number;

  active: {
    introEnd: number;
    landingEnd: number;
    servicesEnd: number;
    howWeWorkEnd: number;
    workEnd: number;
  };

  navbar: {
    hideBefore: number;
    showStart: number;
    showEnd: number;
  };

  intro: {
    rotate: [number, number];
    frame: [number, number];
    zoom: [number, number];
    scrollText: [number, number];
    exitX: [number, number];
    enterTarget: number;
    enterTargetMobile: number;
    enterTargetDesktop: number;
  };

  landing: {
    opacity: [number, number, number, number];
    y: [number, number];
    exitX: [number, number];
    target: number;
  };

  services: {
    opacity: [number, number, number, number];
    y: [number, number];
    exitY: [number, number];
    target: number;
  };

  howWeWork: {
    opacity: [number, number, number, number];
    y: [number, number];
    exitY: [number, number];
    target: number;
  };

  work: {
    x: [number, number];
    opacity: [number, number, number, number];
    headingY: [number, number];
    headingScale: [number, number];
    headingX: [number, number];
    carouselOpacity: [number, number];
    carouselX: [number, number];
    exitY: [number, number];
    target: number;
  };

  contact: {
    opacity: [number, number, number];
    y: [number, number, number];
    target: number;
  };
};

// ─────────────────────────────────────────────
// Responsive viewport mode
// ─────────────────────────────────────────────

function getViewportMode(width: number): ViewportMode {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  if (width < 1536) return "desktop";
  return "wide";
}

function useViewportMode(): ViewportMode {
  const [mode, setMode] = useState<ViewportMode>("desktop");

  useEffect(() => {
    const update = () => {
      setMode(getViewportMode(window.innerWidth));
    };

    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return mode;
}

// ─────────────────────────────────────────────
// Responsive timeline
// ─────────────────────────────────────────────

function getTimeline(mode: ViewportMode): Timeline {
  /**
   * Mobile gets:
   * - longer total scroll height
   * - more Services duration
   * - slower Selected Work carousel
   * - smoother intro/landing spacing
   */
  if (mode === "mobile") {
    return {
      // Mobile sticky block covers ONLY the WelcomeWindow zoom/exit animation.
      // ~300vh is enough — after that the user is in normal document flow.
      // StudioLanding + all subsequent sections live below the sticky block.
      scrollVh: 300,

      active: {
        // On mobile these thresholds only gate intro vs "past intro".
        // Segments after landing are irrelevant to the sticky block.
        introEnd: 0.55,
        landingEnd: 1.0,
        servicesEnd: 1.0,
        howWeWorkEnd: 1.0,
        workEnd: 1.0,
      },

      navbar: {
        // Show navbar as soon as intro window exits (progress ~0.6)
        hideBefore: 0.0,
        showStart: 0.0,
        showEnd: 1.0,
      },

      intro: {
        rotate: [0.0, 0.35],
        frame: [0.05, 0.35],
        zoom: [0.1, 0.5],
        scrollText: [0.0, 0.1],
        exitX: [0.55, 0.85],
        enterTarget: 0.6,
        enterTargetMobile: 0.6,
        enterTargetDesktop: 0.6,
      },

      // Landing is in normal flow on mobile — these values are unused but
      // kept to satisfy the Timeline type.
      landing: {
        opacity: [0, 0, 1, 1],
        y: [0, 0],
        exitX: [0, 0],
        target: 1.0,
      },

      // Services–contact are unused on mobile (normal flow), kept for type.
      services: {
        opacity: [0, 0, 1, 1],
        y: [0, 0],
        exitY: [0, 0],
        target: 1.0,
      },

      howWeWork: {
        opacity: [0, 0, 1, 1],
        y: [0, 0],
        exitY: [0, 0],
        target: 1.0,
      },

      work: {
        x: [0, 0],
        opacity: [0, 0, 1, 1],
        headingY: [0, 0],
        headingScale: [1, 1],
        headingX: [0, 0],
        carouselOpacity: [0, 1],
        carouselX: [0, 0],
        exitY: [0, 0],
        target: 1.0,
      },

      contact: {
        opacity: [0, 1, 1],
        y: [0, 0, 0],
        target: 1.0,
      },
    };
  }

  if (mode === "tablet") {
    return {
      scrollVh: 2100,

      active: {
        introEnd: 0.15,
        landingEnd: 0.27,
        servicesEnd: 0.43,
        howWeWorkEnd: 0.57,
        workEnd: 0.86,
      },

      navbar: {
        hideBefore: 0.18,
        showStart: 0.18,
        showEnd: 0.27,
      },

      intro: {
        rotate: [0.0, 0.1],
        frame: [0.04, 0.1],
        zoom: [0.05, 0.14],
        scrollText: [0.0, 0.05],
        exitX: [0.21, 0.26],
        enterTarget: 0.21,
        enterTargetMobile: 0.21,
        enterTargetDesktop: 0.21,
      },

      landing: {
        opacity: [0.14, 0.17, 0.22, 0.27],
        y: [0.14, 0.17],
        exitX: [0.22, 0.27],
        target: 0.18,
      },

      services: {
        opacity: [0.25, 0.28, 0.39, 0.43],
        y: [0.25, 0.29],
        exitY: [0.39, 0.45],
        target: 0.31,
      },

      howWeWork: {
        opacity: [0.43, 0.47, 0.53, 0.57],
        y: [0.43, 0.47],
        exitY: [0.53, 0.58],
        target: 0.49,
      },

      work: {
        x: [0.55, 0.6],
        opacity: [0.55, 0.6, 0.84, 0.87],
        headingY: [0.57, 0.61],
        headingScale: [0.59, 0.63],
        headingX: [0.59, 0.63],
        carouselOpacity: [0.61, 0.75],
        carouselX: [0.65, 0.7],
        exitY: [0.7, 0.75],
        target: 0.63,
      },

      contact: {
        opacity: [0.7, 0.75, 1.0],
        y: [0.7, 0.8, 1.0],
        target: 1.0,
      },
    };
  }

  if (mode === "wide") {
    return {
      scrollVh: 2000,

      active: {
        introEnd: 0.15,
        landingEnd: 0.26,
        servicesEnd: 0.36,
        howWeWorkEnd: 0.48,
        workEnd: 0.86,
      },

      navbar: {
        hideBefore: 0.19,
        showStart: 0.19,
        showEnd: 0.24,
      },

      intro: {
        rotate: [0.0, 0.1],
        frame: [0.04, 0.1],
        zoom: [0.05, 0.14],
        scrollText: [0.0, 0.05],
        exitX: [0.2, 0.24],
        enterTarget: 0.2,
        enterTargetMobile: 0.2,
        enterTargetDesktop: 0.2,
      },

      landing: {
        opacity: [0.14, 0.17, 0.2, 0.24],
        y: [0.14, 0.17],
        exitX: [0.2, 0.24],
        target: 0.18,
      },

      services: {
        opacity: [0.22, 0.24, 0.3, 0.32],
        y: [0.22, 0.26],
        exitY: [0.3, 0.34],
        target: 0.27,
      },

      howWeWork: {
        opacity: [0.34, 0.38, 0.44, 0.48],
        y: [0.34, 0.38],
        exitY: [0.44, 0.48],
        target: 0.41,
      },

      work: {
        x: [0.46, 0.52],
        opacity: [0.46, 0.52, 0.86, 0.88],
        headingY: [0.48, 0.52],
        headingScale: [0.5, 0.54],
        headingX: [0.5, 0.54],
        carouselOpacity: [0.52, 0.66],
        carouselX: [0.55, 0.65],
        exitY: [0.65, 0.67],
        target: 0.45,
      },

      contact: {
        opacity: [0.65, 0.7, 1.0],
        y: [0.62, 0.7, 1.0],
        target: 1.0,
      },
    };
  }

  return {
    // Desktop sticky block covers intro → landing → services only.
    // HowWeWork, SelectedWork, Contact render in normal flow below.
    scrollVh: 900,

    active: {
      introEnd: 0.15,
      landingEnd: 0.35,
      servicesEnd: 0.75,
      howWeWorkEnd: 1.0,   // unused — sections in normal flow
      workEnd: 1.0,        // unused
    },

    navbar: {
      hideBefore: 0.30,
      showStart: 0.30,
      showEnd: 0.45,
    },

    intro: {
      rotate: [0.0, 0.1],
      frame: [0.04, 0.1],
      zoom: [0.05, 0.14],
      scrollText: [0.0, 0.05],
      exitX: [0.2, 0.30],
      enterTarget: 0.22,
      enterTargetMobile: 0.22,
      enterTargetDesktop: 0.22,
    },

    landing: {
      opacity: [0.18, 0.24, 0.30, 0.38],
      y: [0.18, 0.24],
      exitX: [0.30, 0.38],
      target: 0.26,
    },

    services: {
      opacity: [0.36, 0.42, 0.65, 0.72],
      y: [0.36, 0.42],
      exitY: [0.65, 0.75],
      target: 0.48,
    },

    // Kept in type but unused on desktop — sections in normal flow
    howWeWork: {
      opacity: [0, 0, 1, 1],
      y: [0, 0],
      exitY: [0, 0],
      target: 1.0,
    },

    work: {
      x: [0, 0],
      opacity: [0, 0, 1, 1],
      headingY: [0, 0],
      headingScale: [1, 1],
      headingX: [0, 0],
      carouselOpacity: [0, 1],
      carouselX: [0, 0],
      exitY: [0, 0],
      target: 1.0,
    },

    contact: {
      opacity: [0, 1, 1],
      y: [0, 0, 0],
      target: 1.0,
    },
  };
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function ScrollExperience() {
  const containerRef = useRef<HTMLElement | null>(null);
  const nudgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoScrollTriggeredRef = useRef<Set<string>>(new Set());
  const isProgrammaticScrollingRef = useRef(false);
  const isSnappingRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const hasSettledOnLandingRef = useRef(false);
  const prevActiveRef = useRef<ActiveSegment>("intro");

  useEffect(() => {
    return () => { if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current); };
  }, []);

  const router = useRouter();

  const [loadingDone, setLoadingDone] = useState<boolean>(false);
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [showNudge, setShowNudge] = useState<boolean>(false);
  const [activeSegment, setActiveSegment] =
    useState<ActiveSegment>("intro");

  const viewportMode = useViewportMode();
  const isMobile = viewportMode === "mobile";

  const timeline = useMemo(() => {
    return getTimeline(viewportMode);
  }, [viewportMode]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ----------------------------------------
  // Loading complete callback
  // ----------------------------------------

  const handleLoadingComplete = useCallback(() => {
    setLoadingDone(true);
    console.debug("Loading complete: ready to animate intro", { ts: Date.now() });
  }, []);

  // ----------------------------------------
  // Scroll helper
  // ----------------------------------------

  const scrollToProgress = useCallback((progress: number): void => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollableDistance = container.scrollHeight - window.innerHeight;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: containerTop + scrollableDistance * progress,
      behavior: "smooth",
    });
  }, []);

  const performSnapTo = useCallback(
    (progress: number, key: string | null = null, duration = 900) => {
      if (isAnimatingRef.current) {
        console.debug("performSnapTo: blocked - already animating", {
          progress,
          key,
          ts: Date.now(),
        });
        return;
      }

      if (key) autoScrollTriggeredRef.current.add(key);

      console.debug("performSnapTo: start", { key, progress, duration, ts: Date.now() });

      isAnimatingRef.current = true;
      isProgrammaticScrollingRef.current = true;
      isSnappingRef.current = true;

      scrollToProgress(progress);

      const clear = () => {
        isAnimatingRef.current = false;
        isProgrammaticScrollingRef.current = false;
        isSnappingRef.current = false;
        console.debug("performSnapTo: end", { key, ts: Date.now() });
      };

      const t = window.setTimeout(clear, duration);

      return () => {
        clear();
        clearTimeout(t);
      };
    },
    [scrollToProgress]
  );

  const handleEnterClick = useCallback((): void => {
    if (autoScrollTriggeredRef.current.has("intro-enter")) return;
    const enterTarget =
      viewportMode === "mobile"
        ? timeline.intro.enterTargetMobile
        : timeline.intro.enterTargetDesktop;
    performSnapTo(enterTarget, "intro-enter", 1500);
  }, [
    performSnapTo,
    timeline.intro.enterTargetMobile,
    timeline.intro.enterTargetDesktop,
    viewportMode,
  ]);

  // ─────────────────────────────────────────────────────────────────
  // Single consolidated scroll handler — eliminates 4× re-renders/tick
  // Desktop auto-snap: only landing → services. Free scroll after.
  // Mobile: returns early after nudge — no snap logic runs.
  // ─────────────────────────────────────────────────────────────────

  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    const previous = scrollYProgress.getPrevious() ?? 0;
    const isScrollingDown = latest > previous;
    const isScrollingUp = latest < previous;

    // ── 1. Active segment ──
    let newSeg: ActiveSegment = "contact";
    if (latest < timeline.active.introEnd)        newSeg = "intro";
    else if (latest < timeline.active.landingEnd)  newSeg = "landing";
    else if (latest < timeline.active.servicesEnd) newSeg = "services";

    if (prevActiveRef.current !== newSeg) {
      prevActiveRef.current = newSeg;
      setActiveSegment(newSeg);
    }

    // ── 2. Navbar ──
    if (latest < timeline.navbar.hideBefore) {
      setShowNavbar(false);
    } else if (latest >= timeline.navbar.showStart && latest < timeline.navbar.showEnd) {
      setShowNavbar(true);
    } else if (isScrollingDown) {
      setShowNavbar(false);
    } else if (isScrollingUp) {
      setShowNavbar(true);
    }

    // ── 3. Idle nudge — only show during intro/landing on desktop ──
    if (!isMobile && (newSeg === "intro" || newSeg === "landing")) {
      setShowNudge(false);
      if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
      nudgeTimerRef.current = setTimeout(() => {
        if (prevActiveRef.current === "intro" || prevActiveRef.current === "landing") {
          setShowNudge(true);
        }
      }, 2000);
    } else {
      setShowNudge(false);
      if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    }

    // ── 4. Auto-snap — desktop/tablet only, landing → services only ──
    if (isMobile) return;
    if (isAnimatingRef.current) return;
    if (isSnappingRef.current) return;

    if (!hasSettledOnLandingRef.current) {
      if (latest >= timeline.landing.target) hasSettledOnLandingRef.current = true;
      return;
    }

    // Only one downward snap: landing → services
    // After services the user free-scrolls through remaining sections
    if (
      isScrollingDown &&
      !autoScrollTriggeredRef.current.has("landing") &&
      latest >= timeline.landing.opacity[1] &&
      latest < timeline.active.landingEnd
    ) {
      performSnapTo(timeline.services.target, "landing", 1500);
      return;
    }

    // One upward snap: services back → landing
    if (
      !isScrollingDown &&
      previous >= timeline.services.opacity[1] &&
      latest <= timeline.services.opacity[1] &&
      latest > timeline.landing.target &&
      !autoScrollTriggeredRef.current.has("landing-back")
    ) {
      autoScrollTriggeredRef.current.clear();
      performSnapTo(timeline.landing.target, "landing-back", 1200);
      return;
    }

    if (!isScrollingDown) autoScrollTriggeredRef.current.clear();
  });

  // ----------------------------------------
  // Navigation callback
  // ----------------------------------------

  const handleNavigate = useCallback(
    (target: NavigateTarget) => {
      if (target === "team") {
        router.push("/team");
        return;
      }

      const progressMap: Record<Exclude<NavigateTarget, "team">, number> = {
        home: timeline.landing.target,
        services: timeline.services.target,
        howwework: timeline.howWeWork.target,
        contact: timeline.contact.target,
      };

    console.debug("handleNavigate ->", target, { ts: Date.now() });
    performSnapTo(progressMap[target], `nav-${target}`, 1200);
    },
    [
      performSnapTo,
      timeline.landing.target,
      timeline.services.target,
      timeline.howWeWork.target,
      timeline.contact.target,
      router,
    ]
  );

  // ----------------------------------------
  // Wheel / touch handlers — throttle and ignore during programmatic scroll
  // ----------------------------------------
  useEffect(() => {
    let lastWheel = 0;
    const throttle = 150;

    const onWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) {
        console.debug("wheel ignored during animation", { deltaY: e.deltaY, ts: Date.now() });
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const now = performance.now();
      if (now - lastWheel < throttle) return;
      lastWheel = now;

      console.debug("wheel pass-through", { deltaY: e.deltaY, ts: Date.now() });
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isAnimatingRef.current) {
        console.debug("touchstart ignored during animation", { ts: Date.now() });
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: false, capture: true });

    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
    };
  }, []);

  // ─────────────────────────────────────────
  // Motion transforms — desktop/tablet only
  // Mobile uses static/neutralised values to avoid transform-driven lag
  // ─────────────────────────────────────────

  // Segment 1: Welcome Window (all viewports)
  const leftRotate = useTransform(
    scrollYProgress,
    timeline.intro.rotate,
    [0, -78]
  );

  const rightRotate = useTransform(
    scrollYProgress,
    timeline.intro.rotate,
    [0, 78]
  );

  const windowScale = useTransform(
    scrollYProgress,
    timeline.intro.zoom,
    [1, viewportMode === "mobile" ? 2.35 : 2.1]
  );

  const windowOpacity = useTransform(
    scrollYProgress,
    timeline.intro.zoom,
    [1, 0]
  );

  const frameOpacity = useTransform(
    scrollYProgress,
    timeline.intro.frame,
    [1, 0]
  );

  const scrollTextOpacity = useTransform(
    scrollYProgress,
    timeline.intro.scrollText,
    [1, 0]
  );

  const windowExitX = useTransform(
    scrollYProgress,
    timeline.intro.exitX,
    ["0vw", viewportMode === "mobile" ? "-220vw" : "-180vw"]
  );

  // Segment 2: Studio Landing (all viewports)
  const landingOpacity = useTransform(
    scrollYProgress,
    timeline.landing.opacity,
    [0, 1, 1, 0]
  );

  const landingY = useTransform(
    scrollYProgress,
    timeline.landing.y,
    ["120vh", "0vh"]
  );

  // Mobile: no exit animation on landing — just fades out via opacity above
  const landingExitX = useTransform(
    scrollYProgress,
    timeline.landing.exitX,
    isMobile
      ? ["0vw", "0vw"]            // neutralised on mobile
      : ["0vw", "-140vw"]
  );

  // Segment 3–6: desktop/tablet transforms (unchanged)
  const servicesOpacity = useTransform(
    scrollYProgress,
    timeline.services.opacity,
    [0, 1, 1, 0]
  );

  const servicesY = useTransform(
    scrollYProgress,
    timeline.services.y,
    [viewportMode === "mobile" ? "60vh" : "40vh", "0vh"]
  );

  const servicesExitY = useTransform(
    scrollYProgress,
    timeline.services.exitY,
    ["0vh", viewportMode === "mobile" ? "-85vh" : "-60vh"]
  );

  const howWeWorkOpacity = useTransform(
    scrollYProgress,
    timeline.howWeWork.opacity,
    [0, 1, 1, 0]
  );

  const howWeWorkY = useTransform(
    scrollYProgress,
    timeline.howWeWork.y,
    ["55vh", "0vh"]
  );

  const howWeWorkExitY = useTransform(
    scrollYProgress,
    timeline.howWeWork.exitY,
    ["0vh", "-55vh"]
  );

  const workX = useTransform(
    scrollYProgress,
    timeline.work.x,
    [viewportMode === "mobile" ? "120vw" : "100vw", "0vw"]
  );

  const workOpacity = useTransform(
    scrollYProgress,
    timeline.work.opacity,
    [0, 1, 1, 0]
  );

  const workHeadingY = useTransform(
    scrollYProgress,
    timeline.work.headingY,
    ["0vh", viewportMode === "mobile" ? "-24vh" : "-30vh"]
  );

  const workHeadingScale = useTransform(
    scrollYProgress,
    timeline.work.headingScale,
    [1, viewportMode === "mobile" ? 0.85 : 0.75]
  );

  const workHeadingX = useTransform(
    scrollYProgress,
    timeline.work.headingX,
    ["0vw", viewportMode === "mobile" ? "-4vw" : "-14vw"]
  );

  const carouselOpacity = useTransform(
    scrollYProgress,
    timeline.work.carouselOpacity,
    [0, 1]
  );

  const carouselX = useTransform(
    scrollYProgress,
    timeline.work.carouselX,
    ["25vw", viewportMode === "mobile" ? "-150vw" : "-95vw"]
  );

  const workExitY = useTransform(
    scrollYProgress,
    timeline.work.exitY,
    ["0vh", "-100vh"]
  );

  const contactOpacity = useTransform(
    scrollYProgress,
    timeline.contact.opacity,
    [0, 1, 1]
  );

  const contactY = useTransform(
    scrollYProgress,
    timeline.contact.y,
    ["65vh", "50vh", "0vh"]
  );

  const isIntroActive = activeSegment === "intro";
  const isLandingActive = activeSegment === "landing";
  const isServicesActive = activeSegment === "services";
  const isHowWeWorkActive = activeSegment === "howwework";
  const isWorkActive = activeSegment === "work";
  const isContactActive = activeSegment === "contact";

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────

  return (
    <>
      {!loadingDone && (
        <LoadingScreen
          onComplete={handleLoadingComplete}
          studioName="DK Constructions"
        />
      )}

      {/* ─────────────────────────────────────
          MOBILE LAYOUT
          Sticky section covers only intro + landing.
          Remaining sections live in normal document flow below.
      ───────────────────────────────────── */}
      {isMobile ? (
        <div className="relative bg-[#f5f2eb]">

          {/*
            ── MOBILE NAVBAR ──
            Fixed at top, visible once loading is done.
            Scrolls to section DOM ids since there's no scroll-progress nav.
          */}
          {loadingDone && (
            <div className="fixed top-0 left-0 right-0 z-[200]">
              <Navbar
                showNavbar
                activeSegment="home"
                onNavigate={(target) => {
                  if (target === "team") { router.push("/team"); return; }

                  const idMap: Record<string, string> = {
                    home: "mobile-landing",
                    services: "mobile-services",
                    howwework: "mobile-howwework",
                    contact: "mobile-contact",
                  };

                  const el = document.getElementById(idMap[target] ?? "");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          )}

          {/*
            ── STICKY WELCOME WINDOW ──
            Only 300vh — just enough for the zoom + exit animation.
            After scrolling past it the user lands directly on StudioLanding.
          */}
          <section
            id="top"
            ref={containerRef}
            className="relative"
            style={{ height: `${timeline.scrollVh}vh` }}
          >
            <div className="sticky top-0 h-svh overflow-hidden bg-[#f5f2eb]">
              {/* <WelcomeWindow
                isActive={isIntroActive}
                leftRotate={leftRotate}
                rightRotate={rightRotate}
                windowScale={windowScale}
                windowOpacity={windowOpacity}
                windowExitX={windowExitX}
                frameOpacity={frameOpacity}
                scrollTextOpacity={scrollTextOpacity}
                onEnterClick={handleEnterClick}
                loadingComplete={loadingDone}
              /> */}
              <StudioLanding
              isActive
              isMobileFlow
              landingOpacity={landingOpacity}
              landingY={landingY}
              landingExitX={landingExitX}
              onNavigate={(target) => {
                if (target === "team") { router.push("/team"); return; }
                const idMap: Record<string, string> = {
                  home: "mobile-landing",
                  services: "mobile-services",
                  howwework: "mobile-howwework",
                  contact: "mobile-contact",
                };
                const el = document.getElementById(idMap[target] ?? "");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            />

              {/* Idle nudge — only shown during intro */}
              {showNudge && activeSegment === "intro" && (
                <div className="pointer-events-none absolute left-1/2 z-[200] flex -translate-x-1/2 flex-col items-center gap-1.5 bottom-[calc(1.4rem+env(safe-area-inset-bottom))]">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.12, 0.55, 0.12], y: [0, 5, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                    >
                      <svg viewBox="0 0 16 9" fill="none" className="h-3 w-4">
                        <polyline points="1,1 8,8 15,1" stroke="rgba(200,160,80)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  ))}
                  <span className="font-mono uppercase text-[9px] tracking-[0.28em]" style={{ color: "rgba(200,160,80)" }}>
                    Scroll
                  </span>
                </div>
              )}
            </div>
          </section>

          {/*
            ── STUDIO LANDING — normal flow, no motion transforms ──
            Appears immediately after the sticky WelcomeWindow ends.
            isMobileFlow=true renders it as a plain static section.
          */}
          {/* <div id="mobile-landing">
            <StudioLanding
              isActive
              isMobileFlow
              landingOpacity={landingOpacity}
              landingY={landingY}
              landingExitX={landingExitX}
              onNavigate={(target) => {
                if (target === "team") { router.push("/team"); return; }
                const idMap: Record<string, string> = {
                  home: "mobile-landing",
                  services: "mobile-services",
                  howwework: "mobile-howwework",
                  contact: "mobile-contact",
                };
                const el = document.getElementById(idMap[target] ?? "");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div> */}

          {/* Normal-flow sections */}
          <div id="mobile-services">
          <ServicesSection
            isActive={isServicesActive}
            servicesOpacity={servicesOpacity}
            servicesY={servicesY}
            servicesExitY={servicesExitY}
            isMobileFlow
          />
          </div>

          <div id="mobile-howwework">
          <HowWeWork
            isActive={isHowWeWorkActive}
            howWeWorkOpacity={howWeWorkOpacity}
            howWeWorkY={howWeWorkY}
            howWeWorkExitY={howWeWorkExitY}
            isMobileFlow
          />
          </div>

          <SelectedWork
            isActive={isWorkActive}
            workX={workX}
            workOpacity={workOpacity}
            workHeadingY={workHeadingY}
            workHeadingScale={workHeadingScale}
            workHeadingX={workHeadingX}
            carouselX={carouselX}
            carouselOpacity={carouselOpacity}
            workExitY={workExitY}
            isMobileFlow
          />

          <div id="mobile-contact">
          <ContactSection
            isActive={isContactActive}
            contactOpacity={contactOpacity}
            contactY={contactY}
            isMobileFlow
          />
          </div>
        </div>

      ) : (

        /* ─────────────────────────────────────
            DESKTOP / TABLET LAYOUT
            Sticky block: intro → landing → services (scroll-animated)
            Normal flow: howwework → selectedwork → contact (free scroll)
        ───────────────────────────────────── */
        <div className="relative bg-[#f5f2eb]">

          {/* ── Sticky animated block: intro + landing + services ── */}
          <section
            id="top"
            ref={containerRef}
            className="relative bg-[#f5f2eb]"
            style={{ height: `${timeline.scrollVh}vh` }}
          >
            <div className="sticky top-0 h-svh overflow-hidden bg-[#f5f2eb]">
              <Navbar
                showNavbar={showNavbar}
                activeSegment={
                  activeSegment === "intro" ||
                  activeSegment === "landing" ||
                  activeSegment === "services"
                    ? "home"
                    : activeSegment
                }
                onNavigate={handleNavigate}
              />

              {/* Segment 1 — Welcome Window */}
              <WelcomeWindow
                isActive={isIntroActive}
                leftRotate={leftRotate}
                rightRotate={rightRotate}
                windowScale={windowScale}
                windowOpacity={windowOpacity}
                windowExitX={windowExitX}
                frameOpacity={frameOpacity}
                scrollTextOpacity={scrollTextOpacity}
                onEnterClick={handleEnterClick}
                loadingComplete={loadingDone}
              />

              {/* Segment 2 — Studio Landing */}
              <StudioLanding
                isActive={isLandingActive}
                landingOpacity={landingOpacity}
                landingY={landingY}
                landingExitX={landingExitX}
                onNavigate={(target) => {
                  if (target === "services") handleNavigate("services");
                  else if (target === "contact") handleNavigate("contact");
                  else if (target === "home") handleNavigate("home");
                  else if (target === "team") router.push("/team");
                }}
              />

              {/* Segment 3 — Services */}
              <ServicesSection
                isActive={isServicesActive}
                servicesOpacity={servicesOpacity}
                servicesY={servicesY}
                servicesExitY={servicesExitY}
              />

              {/* Idle scroll nudge — only during intro/landing */}
              {showNudge && (activeSegment === "intro" || activeSegment === "landing") && (
                <div className="pointer-events-none absolute left-1/2 z-[200] flex -translate-x-1/2 flex-col items-center gap-1.5 bottom-8">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.12, 0.55, 0.12], y: [0, 5, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                    >
                      <svg viewBox="0 0 16 9" fill="none" className="h-4.5 w-5">
                        <polyline points="1,1 8,8 15,1" stroke="rgba(200,160,80)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  ))}
                  <span className="font-mono uppercase text-[15px] tracking-[0.32em]" style={{ color: "rgba(200,160,80)" }}>
                    Scroll
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* ── Normal flow sections — no scroll-driven transforms ── */}

          {/* Services (black) → HowWeWork (cream) gradient blend */}
          <div
            className="pointer-events-none relative z-10 h-32"
            style={{
              background: "linear-gradient(to bottom, #000000 0%, #f5f2eb 100%)",
              marginTop: "-1px",
            }}
          />

          {/* Segment 4 — How We Work */}
          <HowWeWork
            isActive
            howWeWorkOpacity={howWeWorkOpacity}
            howWeWorkY={howWeWorkY}
            howWeWorkExitY={howWeWorkExitY}
          />

          {/* HowWeWork (cream) → SelectedWork (cream) — same bg, thin rule */}
          <div
            className="pointer-events-none h-px w-full"
            style={{ background: "rgba(26,18,8,0.08)" }}
          />

          {/* Segment 5 — Selected Work */}
          <SelectedWork
            isActive
            workX={workX}
            workOpacity={workOpacity}
            workHeadingY={workHeadingY}
            workHeadingScale={workHeadingScale}
            workHeadingX={workHeadingX}
            carouselX={carouselX}
            carouselOpacity={carouselOpacity}
            workExitY={workExitY}
          />

          {/* SelectedWork (cream) → Contact (black) gradient blend */}
          <div
            className="pointer-events-none relative z-10 h-32"
            style={{
              background: "linear-gradient(to bottom, #f5f2eb 0%, #000000 100%)",
              marginBottom: "-1px",
            }}
          />

          {/* Segment 6 — Contact */}
          <ContactSection
            isActive
            contactOpacity={contactOpacity}
            contactY={contactY}
          />
        </div>
      )}
    </>
  );
}
