"use client";

import { useScroll, useTransform } from "motion/react";
import Navbar from "@/components/Navbar";
import WelcomeWindowSection from "@/components/sections/WelcomeWindowSection";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // // SEGMENT 1: window opening
  // const leftRotate = useTransform(scrollYProgress, [0, 0.18], [0, -78]);
  // const rightRotate = useTransform(scrollYProgress, [0, 0.18], [0, 78]);

  // const windowScale = useTransform(scrollYProgress, [0, 0.24], [1, 2.8]);

  // const windowOpacity = useTransform(
  //   scrollYProgress,
  //   [0.2, 0.28],
  //   [1, 0]
  // );

  // const windowExitX = useTransform(
  //   scrollYProgress,
  //   [0.48, 0.68],
  //   ["0vw", "-158vw"]
  // );

  // const scrollTextOpacity = useTransform(
  //   scrollYProgress,
  //   [0, 0.03, 0.04],
  //   [1, 1, 0]
  // );

  // SEGMENT 2: landing page (still inside page for now)
  const landingOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.48, 0.58],
    [0, 1, 1, 0]
  );

  const landingY = useTransform(
    scrollYProgress,
    [0.22, 0.32],
    [80, 0]
  );

  // SEGMENT 3: selected work
  const workX = useTransform(scrollYProgress, [0.5, 0.68], ["110vw", "0vw"]);
  const workOpacity = useTransform(scrollYProgress, [0.5, 0.62, 0.98, 0.99], [0, 1,1,0]);
  const workHeadingY = useTransform(scrollYProgress, [0.68, 0.82], [0, -260]);
  const workHeadingScale = useTransform(scrollYProgress, [0.68, 0.82], [1, 0.6]);
  const workHeadingX = useTransform(scrollYProgress, [0.68, 0.82], [0, -250]);
  const carouselX = useTransform(scrollYProgress, [0.89, 0.94], ["25vw", "-95vw"]);
  const carouselOpacity = useTransform(scrollYProgress, [0.78, 0.82, 0.94], [0, 1, 1]);
  

  // SEGMENT 4: about
  const studioOpacity = useTransform(scrollYProgress, [0.94, 0.96, 0.99], [0, 1, 1]);
  const studioY = useTransform(scrollYProgress, [0.94, 0.96, 0.99], [150, 150, 0]);

  // SEGMENT 5: contact
  const contactOpacity = useTransform(scrollYProgress, [0.98, 1], [0, 1]);
  const contactY = useTransform(scrollYProgress, [0.98, 1], [100, 0]);

  return (
    <main className="relative overflow-x-hiddenbg-[#f5f2eb] text-black">
      <WelcomeWindowSection/>
       <Navbar/>
    </main>
          );}
