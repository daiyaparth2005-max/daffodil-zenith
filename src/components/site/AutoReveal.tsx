import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function AutoReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const selector =
      "main section, main article, main h1, main h2, main h3, main .reveal-auto, main img, main .grid > *, main form, main blockquote";
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    nodes.forEach((el) => {
      if (el.closest("[data-no-reveal]")) return;
      el.classList.add("reveal-init");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            el.classList.remove("reveal-out");
          } else {
            // animate out when scrolling away (both directions)
            el.classList.remove("reveal-in");
            el.classList.add("reveal-out");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}