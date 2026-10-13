"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "./LanguageProvider";
import { site } from "@/data/site";

// Keep only one preview decoder playing, including touch and hover previews.
let currentPreview: HTMLVideoElement | null = null;

type Props = {
  project: Project;
  active?: boolean;
  priority?: boolean;
  className?: string;
};
// Poster is an independent layer: a missing or unsupported video never exposes a broken player.
export function Media({
  project,
  active = false,
  priority = false,
  className = "",
}: Props) {
  const { t, projectText } = useLanguage();
  const video = useRef<HTMLVideoElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(priority);
  const [visible, setVisible] = useState(priority);
  const [failedVideo, setFailedVideo] = useState(false);
  const [failedPoster, setFailedPoster] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const preloader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          preloader.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    preloader.observe(node);
    observer.observe(node);
    return () => {
      preloader.disconnect();
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const sync = () => {
      if (
        active &&
        visible &&
        !reduced &&
        !document.hidden &&
        !document.querySelector("dialog[open]")
      ) {
        if (currentPreview !== node) currentPreview?.pause();
        currentPreview = node;
        void node.play().catch(() => {});
      } else node.pause();
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    const modal = (event: Event) => {
      if ((event as CustomEvent<boolean>).detail) node.pause();
      else sync();
    };
    window.addEventListener("portfolio:modal", modal);
    return () => {
      node.pause();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("portfolio:modal", modal);
      if (currentPreview === node) currentPreview = null;
    };
  }, [active, visible, near, reduced, failedVideo]);
  return (
    <div ref={container} className={`media media-${project.tone} ${className}`}>
      <div className="media-fallback" aria-hidden="true">
        <div className="fallback-cross" />
        <span>
          {t.frame} / {project.id.toUpperCase()}
        </span>
        <strong>{t.category[project.category].toUpperCase()}</strong>
        <span>{site.name.toUpperCase()}</span>
      </div>
      {project.poster && !failedPoster && (
        <Image
          src={project.poster}
          alt={`${projectText(project).title} — ${t.category[project.category]}`}
          fill
          sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 60vw"
          className="media-poster"
          priority={priority}
          onError={() => setFailedPoster(true)}
        />
      )}
      {near && active && !reduced && project.preview && !failedVideo && (
        <video
          ref={video}
          className={`media-video ${playing ? "is-playing" : ""}`}
          src={project.preview}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setFailedVideo(true);
            setPlaying(false);
          }}
        />
      )}
    </div>
  );
}
