// app/components/AwardCategories.tsx
"use client";

import Link from "next/link";
import * as React from "react";

type Props = {
  pageData: any;
};

export default function AwardCategorySection({ pageData }: Props) {
  const heading = pageData?.awardcategoryheading?.value ?? "Award Categories";
  const categories = pageData?.awardcategoryitems?.value ?? [];

  return (
    <section >
      <div className="container mx-auto ">
        <div className="mb-8">
          <h2
            id="award-categories-heading"
            className="text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
          >
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {categories.map((item: any, idx: number) => {
            const iconUrl = item?.icon?.value?.[0]?.url;
            const title = item?.heading?.value ?? "";
            const items = item?.items?.value ?? [];

            return (
              <article
                key={item?.system?.codename ?? idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <header className="flex items-center gap-4">
                  {iconUrl ? (
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-primary-3 bg-slate-50">
                      <img
                        src={iconUrl}
                        alt=""
                        className="h-full w-full object-contain p-2"
                        loading="lazy"
                      />
                    </div>
                  ) : null}

                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {title}
                    </h3>
                  </div>
                </header>

                {!!items.length && (
                  <ul className="mt-5 space-y-3">
                    {items.map((it: any, iIdx: number) => {
                      const code = it?.system?.codename ?? String(iIdx);
                      const subItems = it?.items?.value ?? [];
                      const hasSubs = subItems.length > 0;
                      const contentHtml = it?.content?.value;
                      const btnLink = it?.btn_link?.value;
                      const btnName = it?.btn_name?.value;

                      return (
                        <li
                          key={code}
                          className="rounded-xl border border-slate-200"
                        >
                          {/* Level 1 */}
                          <details className="group">
                            <summary
                              className="flex cursor-pointer select-none items-center justify-between gap-3 px-4 py-3 text-slate-900 [&::-webkit-details-marker]:hidden"
                              aria-controls={`lvl1_${code}`}
                            >
                              <span className="font-medium">
                                {it?.name?.value}
                              </span>
                              <Chevron className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" />
                            </summary>

                            <div id={`lvl1_${code}`} className="px-4 pb-4">
                              {/* If there are subitems, render nested disclosure list */}
                              {hasSubs ? (
                                <ul className="space-y-2">
                                  {subItems.map((s: any, sIdx: number) => {
                                    const sCode = `${code}_${
                                      s?.system?.codename ?? sIdx
                                    }`;
                                    const sContent = s?.content?.value;
                                    const sBtnLink = s?.btnLink?.value;
                                    const sBtnName = s?.btnName?.value;

                                    return (
                                      <li
                                        key={sCode}
                                        className="rounded-lg border border-slate-200"
                                      >
                                        <details className="group">
                                          <summary
                                            className="flex cursor-pointer select-none items-center justify-between gap-3 px-3 py-2 text-slate-800 [&::-webkit-details-marker]:hidden"
                                            aria-controls={`lvl2_${sCode}`}
                                          >
                                            <span className="text-sm font-medium">
                                              {s?.name?.value}
                                            </span>
                                            <Chevron className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
                                          </summary>

                                          <div
                                            id={`lvl2_${sCode}`}
                                            className="px-3 pb-3"
                                          >
                                            {sContent ? (
                                              <div
                                                className="space-y-3 text-sm leading-relaxed text-slate-700"
                                                dangerouslySetInnerHTML={{
                                                  __html: sContent,
                                                }}
                                              />
                                            ) : null}

                                            {sBtnLink ? (
                                              <div className="mt-3">
                                                <Link
                                                  href={sBtnLink}
                                                  className="inline-flex items-center gap-2 rounded-full border border-primary-3 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                                >
                                                  {sBtnName ?? "Learn more"}
                                                  <Arrow className="h-4 w-4" />
                                                </Link>
                                              </div>
                                            ) : null}
                                          </div>
                                        </details>
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : (
                                <>
                                  {/* Plain content (no subitems) */}
                                  {contentHtml ? (
                                    <div
                                      className="space-y-3 text-sm leading-relaxed text-slate-700"
                                      dangerouslySetInnerHTML={{
                                        __html: contentHtml,
                                      }}
                                    />
                                  ) : null}

                                  {btnLink ? (
                                    <div className="mt-3">
                                      <Link
                                        href={btnLink}
                                        className="inline-flex items-center gap-2 rounded-full border bg-primary-3 text-white border-primary-3 px-3 py-1.5 text-sm font-medium "
                                      >
                                        {btnName ?? "Learn more"}
                                        <Arrow className="h-4 w-4" />
                                      </Link>
                                    </div>
                                  ) : null}
                                </>
                              )}
                            </div>
                          </details>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Minimal inline SVG icons (no extra libraries) */
function Chevron(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 8l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Arrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 10h10M11 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
