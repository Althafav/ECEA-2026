// app/components/ImportantDates.tsx
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type Props = {
  pageData: any;
};

export default function ImportantDates({ pageData }: Props) {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".timeline-item", {
      opacity: 0,
      y: 80,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 80%",
        scrub: true,
        end: "bottom 20%",
        toggleActions: "play none none reset",
      },
    });
  });

  return (
    <section>
      <div className="mx-auto max-w-4xl ">
        <h2
          id="important-dates-heading"
          className="text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
        >
          {pageData.importantdateheading.value}
        </h2>

        <div className="relative timeline mt-8">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-slate-200 -translate-x-1/2" />

          <ol className="space-y-16 relative">
            {pageData.importantdateitems.value.map(
              (item: any, index: number) => {
                const isLeft = index % 2 === 0;
                return (
                  <li
                    key={index}
                    className={`timeline-item relative flex items-center ${
                      isLeft ? "justify-start" : "justify-end"
                    } w-full`}
                  >
                    <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-primary-3 shadow-md z-10" />

                    <div
                      className={`w-5/12 p-6 bg-white rounded-2xl shadow-lg border border-slate-200 relative z-20 ${
                        isLeft ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 shadow-md">
                          <img
                            src={item.icon.value[0]?.url}
                            alt={item.name.value}
                            className="h-8 w-8 object-contain"
                          />
                        </div>
                        <h3 className="font-semibold text-lg text-center text-slate-800">
                          {item.name.value}
                        </h3>
                        <p className="mt-2 text-slate-600 text-sm text-center">
                          {item.date.value ? item.date.value : "TBA"}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              }
            )}
          </ol>
        </div>
      </div>
    </section>
  );
}
