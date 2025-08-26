"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Path to your logo */
  src?: string;
  /** Minimum time to show (ms) to avoid flicker */
  minDuration?: number;
  /** Logo width in px */
  width?: number;
};

export default function LoaderComponent({
  src = "/assets/logos/ecea-logo-colored.png",
  minDuration = 800,
  width = 220,
}: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();

    // Lock scroll while visible
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const finish = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        setVisible(false);
        html.style.overflow = prevOverflow;
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => window.removeEventListener("load", finish);
  }, [minDuration]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] grid place-items-center bg-white text-white"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Soft ping halo behind logo */}
        <div className="absolute inset-0 -z-10 grid place-items-center">
          <div className="h-32 w-32 rounded-full bg-white/10 animate-ping" />
        </div>

        {/* Logo (subtle pulse) */}
        <img
          src={src}
          alt="ECEA Logo"
          width={width}
          height={Math.round(width * 0.38) || 100}
          className="h-auto w-[220px] max-w-[60vw] animate-pulse"
          style={{ width, height: "auto" }}
        />

        {/* Minimal bar */}
        <div className="h-1 w-40 overflow-hidden rounded-full bg-black/10">
          <div className="h-full w-1/2 animate-pulse bg-black" />
        </div>

        <span className="text-xs tracking-wide text-black select-none">
          Loading…
        </span>
      </div>
    </div>
  );
}
