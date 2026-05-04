"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";

import WelcomeIntro from "@/components/WelcomeIntro";
import StudioLanding from "@/components/StudioLanding";

export default function Page() {
  const [entered, setEntered] = useState(false);

  const viewImage = "/images/window-view.jpg";

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        {!entered && (
          <WelcomeIntro
            key="welcome-intro"
            onEnter={() => setEntered(true)}
            viewImage={viewImage}
          />
        )}
      </AnimatePresence>

      <StudioLanding isActive={entered} viewImage={viewImage} />
    </main>
  );
}
