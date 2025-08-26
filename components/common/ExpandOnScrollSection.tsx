// app/components/ExpandOnScrollSection.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

type Props = {
  imageSrc: string;
  videoSrc: string;
  heightVh?: number; // section height
  initialVw?: number; // starting visible width in vw (30 = 30vw)
  endScroll?: string; // pinned scroll distance, e.g. "+=100%"
  overlayClassName?: string;
  children?: React.ReactNode;
};

export default function ExpandOnScrollSection({
  imageSrc,
  videoSrc,
  heightVh = 100,
  initialVw = 30,
  endScroll = "+=100%",
  overlayClassName = "bg-black/25",
  children,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cropRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const crop = cropRef.current;
    if (!section || !crop) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // The crop box is what changes width. Content behind stays full size (no stretch).
      gsap.set(crop, { width: `${initialVw}vw` });

      if (reduce) {
        gsap.set(crop, { width: "100vw" });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: endScroll,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(crop, { width: "100vw", ease: "none" });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [initialVw, endScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${heightVh}vh` }}
    >
      {/* Full-width background stays fixed-size relative to viewport */}
      <div
        ref={bgRef}
        className="absolute inset-0  bg-primary-1"
        // style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          autoPlay
          playsInline
          poster={videoSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="  h-full w-full flex items-center justify-center p-6 text-white">
          {children}
        </div>
      </div>

      {/* Optional global overlay over the background */}

      {/* Crop box: expands from 30vw -> 100vw; content inside is not scaled */}
      <div
        ref={cropRef}
        className="absolute inset-y-0 left-0 overflow-hidden will-change-[width]"
      >
        {/* Content wrapper matches the viewport width so it never stretches */}
        <div className="relative h-full w-[100vw]">
          {/* Place foreground text here; centers within the visible area */}
          <div
            style={{ backgroundImage: `url(${imageSrc})` }}
            className="bg-cover bg-center h-full w-full flex items-center justify-center p-6 text-white drop-shadow bg-primary-1"
          ></div>
        </div>
      </div>
    </section>
  );
}
