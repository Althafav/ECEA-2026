// app/components/SplitTextReveal.tsx
"use client";
import React, { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap-setup"; // same instance as ScrollSmoother/Trigger

type Props = {
  text: string;
  className?: string;
  fromColor?: string;
  toColor?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  duration?: number;
  stagger?: number;
  debug?: boolean;
};

const SplitTextReveal: React.FC<Props> = ({
  text,
  className = "",
  fromColor = "#d1d5db",
  toColor = "#1f2937",
  start = "top 90%",
  end = "bottom 20%",
  scrub = 1,
  duration = 0.8,
  stagger = 0.1,
  debug = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = useMemo(() => text.trim().split(/\s+/), [text]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const parts = Array.from(
        containerRef.current!.querySelectorAll<HTMLElement>(".word")
      );
      if (!parts.length) return;

      gsap.set(parts, { color: fromColor });

      gsap.to(parts, {
        color: toColor,
        duration,
        ease: "none",
        stagger,
        scrollTrigger: {
          trigger: containerRef.current!,
          start,
          end,
          scrub,
          markers: debug,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [fromColor, toColor, start, end, scrub, duration, stagger, debug]);

  return (
    <div ref={containerRef} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline">
          <span className="word inline-block align-baseline">{w}</span>
          {i < words.length - 1 ? <span>{"\u00A0"}</span> : null}
        </span>
      ))}
    </div>
  );
};

export default SplitTextReveal;
