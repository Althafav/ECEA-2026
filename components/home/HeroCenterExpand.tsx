// app/components/HeroCenterExpand.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

type ResponsiveVw =
  | number // e.g. 30
  | { base: number; md?: number; lg?: number }; // responsive overrides

type Props = {
  videoSrc: string;
  poster?: string;
  topOffsetPx?: number; // header height to subtract (e.g. 111)
  initialVw?: ResponsiveVw; // starts visible width (vw), centered
  endScroll?: string; // e.g. "+=120%"
  overlayClassName?: string;
  desktopLines: string[];
  mobileLines?: string[];
  ctaText?: string;
  ctaHref?: string;
};

export default function HeroCenterExpand({
  videoSrc,
  poster,
  topOffsetPx = 0,
  initialVw = 30,
  endScroll = "+=120%",
  overlayClassName = "bg-black/30",
  desktopLines,

  ctaText,
  ctaHref,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linesWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const linesWrap = linesWrapRef.current;
    if (!section || !panel || !linesWrap) return;

    const ctx = gsap.context(() => {
      // --- helpers ---
      const getInitialVw = () => {
        const w = window.innerWidth;
        if (typeof initialVw === "number") return initialVw;
        // simple breakpoint map
        if (w >= 1024 && initialVw.lg != null) return initialVw.lg;
        if (w >= 768 && initialVw.md != null) return initialVw.md;
        return initialVw.base;
      };
      const setClipFromVw = (vw: number) => {
        // side = equal left/right inset in vw
        const side = (100 - vw) / 2;
        // use a CSS var so GSAP anim is super stable with Smoother
        gsap.set(panel, { "--sideVW": `${side}vw` } as any);
      };

      // base styles
      gsap.set(panel, {
        // reveal from center using clip-path inset, driven by CSS var
        clipPath: "inset(0 var(--sideVW) 0 var(--sideVW))",
        willChange: "clip-path",
      });

      // text lines slide up from 200%
      const lines = Array.from(
        linesWrap.querySelectorAll<HTMLElement>(".line")
      );
      const cta = linesWrap.querySelector<HTMLElement>(".cta");
      gsap.set(lines, { yPercent: 200 });
      if (cta) gsap.set(cta, { yPercent: 120, autoAlpha: 0 });

      // ensure correct starting state NOW (important with Smoother + HMR)
      setClipFromVw(getInitialVw());

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: endScroll,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            // recompute initial clip each refresh (viewport or font changes)
            setClipFromVw(getInitialVw());
          },
        },
      });

      // expand center → full, and reveal lines as it grows
      tl.to(panel, { "--sideVW": "0vw", ease: "none" } as any, 0).to(
        lines,
        { yPercent: 0, ease: "power2.out", stagger: 0.12 },
        0.15
      );

      if (cta)
        tl.to(cta, { yPercent: 0, autoAlpha: 1, ease: "power2.out" }, 0.45);

      // final safety with Smoother
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [initialVw, endScroll]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full">
      {/* Panel that reveals from center by animating --sideVW (no stretch) */}
      <div ref={panelRef} className="absolute inset-0">
        {/* Video stays object-cover behind the clip */}
        <video
          className="absolute inset-0 h-screen w-full object-cover"
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

        {/* Headings */}
        <div
          ref={linesWrapRef}
          className="relative z-10 h-full w-full px-6 md:px-12 flex items-center"
        >
          {/* Desktop */}
          <div className="hidden md:block text-white">
            {desktopLines.map((t, i) => (
              <div key={i} className="overflow-hidden">
                <h1 className="line tp-section-title-90 text-4xl lg:text-6xl xl:text-7xl font-extrabold drop-shadow">
                  {t}
                </h1>
              </div>
            ))}
            {ctaText && ctaHref && (
              <div className="overflow-hidden mt-6">
                <a
                  className="cta inline-block rounded-xl bg-white/10 px-5 py-3 text-white backdrop-blur-md ring-1 ring-white/30 hover:bg-white/20 transition"
                  href={ctaHref}
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
