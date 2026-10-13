"use client";
import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);

export function useExperienceMotion(
  root: RefObject<HTMLElement | null>,
  ready: boolean,
) {
  useLayoutEffect(() => {
    if (!ready || !root.current) return;
    const element = root.current;
    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lenis = new Lenis({
          duration: 1.05,
          smoothWheel: true,
          syncTouch: false,
          anchors: true,
        });
        const update = (time: number) => lenis.raf(time * 1000);
        const modal = (event: Event) =>
          (event as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start();
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);
        window.addEventListener("portfolio:modal", modal);
        gsap.from(".hero-line > span", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.14,
          ease: "power4.out",
          clearProps: "transform",
        });
        gsap.from(".site-header", {
          y: -30,
          opacity: 0,
          duration: 0.8,
          clearProps: "transform,opacity",
        });
        gsap.from(".edit-composition > *", {
          y: 20,
          opacity: 0,
          duration: 1.1,
          delay: 0.3,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
        gsap.to(".intro-hero", {
          backgroundColor: "#ff553d",
          ease: "none",
          scrollTrigger: {
            trigger: ".intro-hero",
            start: "top top",
            end: "bottom 20%",
            scrub: true,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
          gsap.from(node.querySelectorAll(".reveal-line > span"), {
            yPercent: 115,
            rotate: 2,
            stagger: 0.09,
            duration: 0.9,
            ease: "power4.out",
            clearProps: "transform",
            scrollTrigger: { trigger: node, start: "top 94%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>(".editorial-row").forEach((node) => {
          gsap.from(node, {
            y: 24,
            opacity: 0.25,
            duration: 0.65,
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: node, start: "top 96%", once: true },
          });
        });
        gsap.utils
          .toArray<HTMLElement>(".featured-card .card-picture")
          .forEach((node, i) => {
            gsap.fromTo(
              node,
              { scale: 0.93, clipPath: "inset(7% 0% 7% 0%)" },
              {
                scale: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                scrollTrigger: {
                  trigger: node,
                  start: "top 98%",
                  end: "top 60%",
                  scrub: 0.5,
                },
              },
            );
            gsap.from(node.querySelector(".card-play"), {
              rotate: -45,
              duration: 0.8,
              delay: i * 0.08,
              scrollTrigger: { trigger: node, start: "top 90%", once: true },
            });
          });
        const marquee = gsap.to(".marquee-track", {
          xPercent: -50,
          duration: 32,
          ease: "none",
          repeat: -1,
        });
        const direction = ScrollTrigger.create({
          onUpdate: (self) => {
            gsap.to(marquee, {
              timeScale: self.direction,
              duration: 0.45,
              overwrite: true,
            });
          },
        });
        let refreshFrame = 0;
        const refresh = () => {
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
        };
        window.addEventListener("load", refresh);
        window.addEventListener("portfolio:layout", refresh);
        void document.fonts.ready.then(() => {
          if (element.isConnected) refresh();
        });
        return () => {
          cancelAnimationFrame(refreshFrame);
          window.removeEventListener("load", refresh);
          window.removeEventListener("portfolio:layout", refresh);
          window.removeEventListener("portfolio:modal", modal);
          direction.kill();
          marquee.kill();
          gsap.ticker.remove(update);
          lenis.destroy();
        };
      });
      mm.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to(".edit-composition", {
            y: -45,
            rotate: 5,
            ease: "none",
            scrollTrigger: {
              trigger: ".intro-hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
          gsap.fromTo(
            ".signature-monogram",
            { rotate: -5, y: 25 },
            {
              rotate: 5,
              y: -25,
              ease: "none",
              scrollTrigger: {
                trigger: ".signature-art",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        },
      );
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const remove: (() => void)[] = [];
          gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((node) => {
            const x = gsap.quickTo(node, "x", {
              duration: 0.45,
              ease: "power3.out",
            });
            const y = gsap.quickTo(node, "y", {
              duration: 0.45,
              ease: "power3.out",
            });
            const move = (event: PointerEvent) => {
              const bounds = node.getBoundingClientRect();
              x((event.clientX - bounds.left - bounds.width / 2) * 0.12);
              y((event.clientY - bounds.top - bounds.height / 2) * 0.12);
            };
            const leave = () => {
              x(0);
              y(0);
            };
            node.addEventListener("pointermove", move);
            node.addEventListener("pointerleave", leave);
            remove.push(() => {
              node.removeEventListener("pointermove", move);
              node.removeEventListener("pointerleave", leave);
            });
          });
          return () => remove.forEach((fn) => fn());
        },
      );
    }, element);
    return () => {
      mm.revert();
      context.revert();
    };
  }, [root, ready]);
}
