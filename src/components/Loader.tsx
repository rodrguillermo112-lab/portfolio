"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "./LanguageProvider";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("gr-intro");
    } catch {
      /* Storage can be disabled. */
    }
    if (!root.current || reduced || seen) {
      onComplete();
      return;
    }
    const count = { value: 0 };
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem("gr-intro", "1");
          } catch {
            /* Intro still completes. */
          }
          onComplete();
        },
      });
      timeline
        .to(count, {
          value: 100,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            const number = root.current?.querySelector(".loader-count");
            if (number)
              number.textContent = String(
                Math.floor(count.value / 25) * 25,
              ).padStart(3, "0");
          },
        })
        .fromTo(
          ".loader-name span",
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.08, duration: 0.6, ease: "power4.out" },
          0.65,
        )
        .to(
          ".loader-rule",
          { scaleX: 1, duration: 1.4, ease: "power2.inOut" },
          0,
        )
        .to(
          root.current,
          { yPercent: -101, duration: 0.85, ease: "power4.inOut" },
          1.65,
        );
    }, root);
    return () => context.revert();
  }, [onComplete, reduced]);
  return (
    <div ref={root} className="loader" aria-hidden="true">
      <span className="loader-small">{t.hero.lines.join(" ")}</span>
      <div className="loader-name">
        <div>
          <span>GUILLERMO</span>
        </div>
        <div>
          <span>RODRÍGUEZ</span>
        </div>
        <p>{t.role}</p>
      </div>
      <span className="loader-count">000</span>
      <div className="loader-rule" />
    </div>
  );
}
