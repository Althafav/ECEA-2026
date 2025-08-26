import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import MenuComponent from "./Menu/MenuComponent";
import FooterComponent from "./Menu/FooterComponent";

export default function LayoutComponent({ children }: any) {
  const main = useRef<HTMLDivElement>(null);
  const smoother = useRef<any>(null);

  useGSAP(
    () => {
      smoother.current = ScrollSmoother.create({
        smooth: 1,
        effects: true,
      });
    },
    {
      scope: main,
    }
  );
  return (
    <div>
      <MenuComponent />
      <div id="smooth-wrapper" className="flex flex-col" ref={main}>
        <div id="smooth-content">
          <div className="flex-1 min-h-screen mt-[94px]">{children}</div>
          <FooterComponent />   
        </div>
      </div>
    </div>
  );
}
