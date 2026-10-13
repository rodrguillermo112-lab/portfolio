"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

// Small code-native studies; no additional video downloads or repeated projects.
export function MotionStudy({ variant }: { variant: "frames" | "wave" }) {
  const { t } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    let visible = false;
    const sync = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return (
    <div
      ref={root}
      className={`motion-study study-${variant}`}
      data-active={active}
      aria-hidden="true"
    >
      <div className="study-label">
        <span>
          {variant === "frames" ? t.hero.timeline.join(" / ") : t.visual.wave}
        </span>
        <span>{variant === "frames" ? "01—03" : "GR / 024"}</span>
      </div>
      {variant === "frames" ? (
        <svg className="frame-study" viewBox="0 0 420 260" fill="none">
          <path className="study-guide" d="M0 130h420M210 0v260" />
          <g className="study-frame loop">
            <rect x="97" y="20" width="226" height="220" />
            <path d="M85 20h24M97 8v24M311 240h24M323 228v24" />
          </g>
          <g className="study-frame frame-second loop">
            <rect x="59" y="52" width="302" height="156" />
          </g>
          <g className="study-star loop">
            <path d="M210 78v104M158 130h104M173 93l74 74M173 167l74-74" />
          </g>
          <circle cx="210" cy="130" r="5" fill="currentColor" />
        </svg>
      ) : (
        <div className="wave-study">
          {Array.from({ length: 24 }, (_, i) => (
            <i
              className="loop"
              key={i}
              style={{
                height: `${25 + ((i * 37) % 72)}%`,
                animationDelay: `${i * -0.13}s`,
              }}
            />
          ))}
          <span className="wave-scan loop" />
        </div>
      )}
      <div className="study-ruler">
        {Array.from({ length: 16 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="study-label">
        <span>{t.visual.before}</span>
        <span>→</span>
        <span>{t.visual.after}</span>
      </div>
    </div>
  );
}
