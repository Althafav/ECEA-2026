// app/components/FAQSection.tsx
"use client";

import React, { useState } from "react";

type Props = { pageData: any };

export default function FAQSection({ pageData }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = pageData?.faqitems?.value ?? [];
  const heading = pageData?.faqheading?.value ?? "Frequently Asked Questions";

  const toggleFAQ = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <section aria-labelledby="faq-heading"  >
      <div className="mx-auto max-w-4xl">
        <h2
          id="faq-heading"
          className="text-center text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
        >
          {pageData.faqheading.value}
        </h2>

        <ul className="mt-8 space-y-3" role="list">
          {items.map((item: any, index: number) => {
            const isOpen = openIndex === index;

            return (
              <li
                key={index}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-button-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded-2xl"
                >
                  <span className="text-base md:text-lg font-medium text-slate-900">
                    {item.heading.value}
                  </span>

                  <svg
                    className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    } text-slate-500`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {isOpen && (
                  <div id={`faq-panel-${index}`} className="px-5 pb-5">
                    <div
                      className="prose prose-slate max-w-none prose-p:my-3 prose-li:my-1"
                      dangerouslySetInnerHTML={{ __html: item.content.value }}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
