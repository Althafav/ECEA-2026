"use client";

export default function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed max-w-full inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-neutral-950 dark:to-neutral-900" />

      {/* Radial spotlights (soft color wash) */}
      <div className="absolute -top-24 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full blur-3xl opacity-40 [background:radial-gradient(ellipse_at_center,rgba(59,130,246,0.28),transparent_60%)]" />
      <div className="absolute top-10 right-[10%] h-[45vh] w-[50vw] rounded-full blur-3xl opacity-35 [background:radial-gradient(ellipse_at_center,rgba(14,165,233,0.22),transparent_60%)]" />

      {/* Hairline grid (SVG so it stays crisp) */}
      <svg className="absolute inset-0 h-full w-full opacity-10">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth=".5"
            />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="10%" r="65%">
            <stop offset="60%" stopColor="black" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="currentColor"
          className="text-black/0 dark:text-white/0"
        />
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          className="text-black/80 dark:text-white/70"
        />
        <rect width="100%" height="100%" fill="url(#fade)" />
      </svg>
    </div>
  );
}
