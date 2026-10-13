"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Project } from "@/data/projects";
import { Media } from "./Media";
export function HoverPreview({ project }: { project: Project | null }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const node = ref.current;
    const x = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3.out" });
    const move = (event: PointerEvent) => {
      x(Math.min(event.clientX + 32, innerWidth - 330));
      y(Math.max(24, Math.min(event.clientY - 100, innerHeight - 230)));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      gsap.killTweensOf(node);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`hover-preview ${project ? "visible" : ""}`}
      aria-hidden="true"
    >
      {project && <Media key={project.id} project={project} active />}
      <span>
        {project?.category.toUpperCase()} / {project?.id}
      </span>
    </div>
  );
}
