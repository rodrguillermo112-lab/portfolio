"use client";
import { useLanguage } from "./LanguageProvider";
export function Marquee() {
  const { t } = useLanguage();
  return (
    <div className="marquee" aria-label={t.marquee.join(", ")}>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>
            {t.marquee.map((word) => (
              <span key={word}>
                {word} <i>✳</i>{" "}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
