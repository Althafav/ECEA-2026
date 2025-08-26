// app/components/animated/HeroCenterAuto.tsx
"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import Link from "next/link";

type ResponsiveVw = number | { base: number; md?: number; lg?: number };

type Props = {
  videoSrc: string;
  poster?: string;
  topOffsetPx?: number;
  initialVw?: ResponsiveVw;
  overlayClassName?: string;

  // CHANGED: allow a string OR array
  bannerHeading: string | string[];

  ctaText?: string;
  ctaHref?: string;

  duration?: number;
  linesStagger?: number;
  startViewport?: string;
  playOnce?: boolean;
  delay?: number;
};

// helper: split a single string into lines by newline, <br>, or |
const splitLines = (s: string): string[] =>
  (s ?? "")
    .split(/\r?\n|<br\s*\/?>|\|/i)
    .map((x) => x.trim())
    .filter(Boolean);

export default function HeroCenterAuto({
  videoSrc,
  poster,
  topOffsetPx = 0,
  initialVw = 30,
  overlayClassName = "bg-black/30",
  bannerHeading, // string or string[]
  ctaText,
  ctaHref,
  duration = 1.2,
  linesStagger = 0.12,
  startViewport = "top 80%",
  playOnce = true,
  delay = 0,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linesWrapRef = useRef<HTMLDivElement>(null);

  // NEW: normalize to array of lines for the existing animation
  const lines = useMemo(
    () =>
      Array.isArray(bannerHeading) ? bannerHeading : splitLines(bannerHeading),
    [bannerHeading]
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const linesWrap = linesWrapRef.current;
    if (!section || !panel || !linesWrap) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const getInitialVw = () => {
        const w = window.innerWidth;
        if (typeof initialVw === "number") return initialVw;
        if (w >= 1024 && initialVw.lg != null) return initialVw.lg;
        if (w >= 768 && initialVw.md != null) return initialVw.md;
        return initialVw.base;
      };
      const setClipFromVw = (vw: number) => {
        const side = (100 - vw) / 2;
        gsap.set(panel, { "--sideVW": `${side}vw` } as any);
      };

      gsap.set(panel, {
        clipPath: "inset(0 var(--sideVW) 0 var(--sideVW))",
        willChange: "clip-path",
      });

      const lineEls = Array.from(
        linesWrap.querySelectorAll<HTMLElement>(".line")
      );
      const cta = linesWrap.querySelector<HTMLElement>(".cta");

      gsap.set(lineEls, { yPercent: 200 });
      if (cta) gsap.set(cta, { yPercent: 120, autoAlpha: 0 });

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      setClipFromVw(getInitialVw());

      if (prefersReduced) {
        gsap.set(panel, { "--sideVW": "0vw" } as any);
        gsap.set(lineEls, { yPercent: 0 });
        if (cta) gsap.set(cta, { yPercent: 0, autoAlpha: 1 });
        return;
      }

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });
      tl.to(panel, { "--sideVW": "0vw", duration } as any, 0)
        .to(
          lineEls,
          { yPercent: 0, duration: 0.8, stagger: linesStagger },
          0.15
        )
        .to(cta, { yPercent: 0, autoAlpha: 1, duration: 0.6 }, 0.45);

      if (delay > 0) tl.delay(delay);

      const st = ScrollTrigger.create({
        trigger: section,
        start: startViewport,
        once: playOnce,
        onEnter: () => tl.play(0),
        onLeaveBack: () => {
          if (!playOnce) {
            tl.pause(0).progress(0);
            setClipFromVw(getInitialVw());
            gsap.set(lineEls, { yPercent: 200 });
            if (cta) gsap.set(cta, { yPercent: 120, autoAlpha: 0 });
          }
        },
      });

      const handleResize = () => {
        if (tl.progress() === 0) setClipFromVw(getInitialVw());
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        st.kill();
      };
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [initialVw, duration, linesStagger, startViewport, playOnce, delay]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: `calc(100dvh - ${topOffsetPx}px)` }}
    >
      <div ref={panelRef} className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          autoPlay
          playsInline
          poster={poster}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {overlayClassName && (
          <div
            className={`absolute inset-0 pointer-events-none ${overlayClassName}`}
          />
        )}

        <div
          ref={linesWrapRef}
          className="relative z-10 h-full w-full px-6 md:px-12 flex items-center container mx-auto"
        >
          <div className="text-white">
            {lines.map((t, i) => (
              <div key={i} className="overflow-hidden">
                <h1 className="line text-4xl lg:text-6xl leading-20  font-extrabold drop-shadow">
                  {t}
                </h1>
              </div>
            ))}
            {ctaText && ctaHref && (
              <div className="overflow-hidden mt-6">
                <Link
                  className="cta inline-block rounded-full hover:bg-white/10 px-5 py-3 text-white backdrop-blur-md  bg-primary-3 transition"
                  href={ctaHref}
                >
                  {ctaText}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
