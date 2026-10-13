"use client";
import { useCallback, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import {
  IntroHero,
  FeaturedWork,
  Difference,
  WorkGallery,
  Benefits,
  AboutEditor,
  Process,
  FinalContact,
} from "./PortfolioSections";
import { LanguageProvider, useLanguage } from "./LanguageProvider";
import { Marquee } from "./Marquee";
import { Loader } from "./Loader";
import { CustomCursor } from "./CustomCursor";
import { VideoPlayer } from "./VideoPlayer";
import { useExperienceMotion } from "@/hooks/useExperienceMotion";
export function Experience() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  );
}
function Portfolio() {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [sound, setSound] = useState(false);
  const finishIntro = useCallback(() => setReady(true), []);
  const open = useCallback((p: Project) => {
    setSelected(p);
  }, []);
  const toggleSound = useCallback(() => setSound((value) => !value), []);
  useExperienceMotion(root, ready);
  return (
    <>
      <a className="skip-link" href="#work">
        {t.skip}
      </a>
      {!ready && <Loader onComplete={finishIntro} />}
      <CustomCursor />
      <main ref={root} className="portfolio-v3">
        <IntroHero />
        <FeaturedWork onOpen={open} />
        <Difference />
        <WorkGallery onOpen={open} />
        <Benefits />
        <Marquee />
        <AboutEditor />
        <Process />
        <FinalContact />
      </main>
      {selected && (
        <VideoPlayer
          key={selected.id}
          project={selected}
          sound={sound}
          onSound={toggleSound}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
