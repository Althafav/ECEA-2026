import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import MenuComponent from "./Menu/MenuComponent";
import FooterComponent from "./FooterComponent";
import BackgroundFX from "../common/BackgroundFX";
import InitialPageLoader from "../common/InitialPageLoader";
import Head from "next/head";

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
      {/* <InitialPageLoader /> */}
      <BackgroundFX />
   
      <div id="smooth-wrapper" className="flex flex-col" ref={main}>
        <div id="smooth-content">
          <MenuComponent />
          <div className="">{children}</div>
          <FooterComponent />
        </div>
      </div>
    </div>
  );
}
