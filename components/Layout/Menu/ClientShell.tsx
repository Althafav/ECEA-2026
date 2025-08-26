"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";

import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

import MenuComponent from "@/components/Layout/Menu/MenuComponent";
import BackgroundFX from "@/components/common/BackgroundFX";
import FooterComponent from "@/components/Layout/Menu/FooterComponent";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
 

  const smoother = useRef<any>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      smoother.current = ScrollSmoother.create({
        smooth: 2,
        effects: true,
      });
    },
    {
      dependencies: [pathname],
    }
  );

  return (
    <div className="flex flex-col min-h-screen">
      <MenuComponent />
      <BackgroundFX />

      <div id="smooth-wrapper" className="mt-[94px] flex-grow">
        <div id="smooth-content" className="smooth-content">
          {children}
          <FooterComponent />
        </div>
      </div>
    </div>
  );
}
