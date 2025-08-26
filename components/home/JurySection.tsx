// app/components/JurySection.tsx
"use client";

import React, { useMemo, useState } from "react";

type Props = { pageData: any };

export default function JurySection({ pageData }: Props) {
  const items = useMemo(() => pageData?.juryitems?.value ?? [], [pageData]);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, 4);

  return (
    <section>
      <div className="mx-auto max-w-6xl">
        {pageData?.juryheading?.value ? (
          <h2
            id="jury-heading"
            className="text-center text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
          >
            {pageData.juryheading.value}
          </h2>
        ) : null}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((item: any, idx: number) => {
            const name = item?.name?.value ?? "Jury Member";
            const role = item?.designation?.value ?? "";
            const img = item?.image?.value?.[0]?.url;

            return (
              <article
                key={item?.id ?? idx}
                className="group relative hover:ring-2 hover:ring-primary-3 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm transition hover:shadow-lg"
              >
                <div className="relative">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    {img ? (
                      <img
                        src={img}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200" />
                    )}
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="absolute inset-x-4 bottom-4">
                  <h3 className="text-white text-lg font-semibold leading-tight">
                    {name}
                  </h3>
                  {role ? (
                    <p className="text-white/80 text-sm">{role}</p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        {items.length > 4 && !showAll && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Show all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
