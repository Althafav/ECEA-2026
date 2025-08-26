// app/components/EligibleSection.tsx
"use client";

import React from "react";

type Props = { pageData: any };

export default function EligibleSection({ pageData }: Props) {
  return (
    <section aria-labelledby="eligible-heading" className="">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="eligible-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
          >
            {pageData.eligibleheading.value}
          </h2>
        </header>

        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 "
        >
          {pageData.eligibleitems.value.map((item: any, index: number) => {
            const name = item?.name?.value ?? "Untitled";
            const iconUrl = item?.icon?.value?.[0]?.url;

            return (
              <li
                key={index}
                className="self-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:ring-2 ring-primary-3"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center">
                    {iconUrl ? (
                      <img
                        src={item.icon.value[0]?.url}
                        alt={item.name.value}
                        loading="lazy"
                        className="h-7 w-7 object-contain"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="inline-block h-7 w-7 rounded-md bg-slate-200"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-medium text-slate-900">
                      {item.name.value}
                    </h3>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
