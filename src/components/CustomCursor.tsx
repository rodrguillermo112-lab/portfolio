"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (
      reduced ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const node = ref.current!;
    let x = -100,
      y = -100,
      targetX = -100,
      targetY = -100,
      raf = 0;
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      node.style.opacity = "1";
    };
    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor],a,button",
      );
      const label = target?.dataset.cursor || "";
      node.dataset.expanded = target ? "true" : "false";
      node.dataset.labeled = label ? "true" : "false";
      node.textContent = label;
    };
    const hide = () => {
      node.style.opacity = "0";
    };
    const tick = () => {
      x += (targetX - x) * 0.17;
      y += (targetY - y) * 0.17;
      node.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    document.documentElement.classList.add("custom-cursor");
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", hide);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", hide);
    };
  }, [reduced]);
  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
