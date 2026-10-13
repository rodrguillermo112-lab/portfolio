"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { copy, type Locale } from "@/data/copy";
import type { Project } from "@/data/projects";

const key = "guillermo-portfolio-language";
let memoryLocale: Locale = "es";
function snapshot(): Locale {
  try {
    const stored = localStorage.getItem(key);
    return stored === "en" || stored === "es" ? stored : memoryLocale;
  } catch {
    return memoryLocale;
  }
}
const serverSnapshot = (): Locale => "es";
function subscribe(callback: () => void) {
  window.addEventListener("portfolio:language", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("portfolio:language", callback);
    window.removeEventListener("storage", callback);
  };
}
type LanguageValue = {
  locale: Locale;
  t: typeof copy.es;
  setLocale: (locale: Locale) => void;
  projectText: (project: Project) => { title: string; description: string };
};
const Context = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const setLocale = useCallback((value: Locale) => {
    memoryLocale = value;
    try {
      localStorage.setItem(key, value);
    } catch {
      /* In-memory selection still works. */
    }
    window.dispatchEvent(new Event("portfolio:language"));
  }, []);
  const value = useMemo(
    () => ({
      locale,
      t: copy[locale],
      setLocale,
      projectText: (project: Project) =>
        locale === "es"
          ? { title: project.titleEs, description: project.descriptionEs }
          : { title: project.title, description: project.description },
    }),
    [locale, setLocale],
  );
  useEffect(() => {
    const meta = copy[locale].meta;
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    document.title = meta.title;
    for (const [selector, content] of [
      ['meta[name="description"]', meta.description],
      ['meta[property="og:title"]', meta.title],
      ['meta[property="og:description"]', meta.description],
      ['meta[property="og:locale"]', locale === "es" ? "es_ES" : "en_US"],
      ['meta[name="twitter:title"]', meta.title],
      ['meta[name="twitter:description"]', meta.description],
    ])
      document.querySelector(selector)?.setAttribute("content", content);
    window.dispatchEvent(new Event("portfolio:layout"));
  }, [locale]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useLanguage() {
  const context = useContext(Context);
  if (!context) throw new Error("LanguageProvider is required.");
  return context;
}

export function LanguageSwitch() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div className="language-switch" role="group" aria-label={t.language}>
      <button
        type="button"
        lang="es"
        aria-label="Español"
        aria-pressed={locale === "es"}
        onClick={() => setLocale("es")}
      >
        ES
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        lang="en"
        aria-label="English"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
    </div>
  );
}
