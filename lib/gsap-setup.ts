// lib/gsap-setup.ts
"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// keep a reference to the smoother
let smoother: ScrollSmoother | null = null;

export const initSmoother = () => {
  if (!smoother) {
    smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
    });
  }
  return smoother;
};

export { gsap, ScrollTrigger, ScrollSmoother, smoother };
