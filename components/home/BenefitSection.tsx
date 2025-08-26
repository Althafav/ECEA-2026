// app/components/BenefitSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type Props = { pageData: any };
type BenefitItem = {
  system?: { codename?: string };
  icon?: { value?: { url: string }[] };
  name?: { value?: string };
  content?: { value?: string };
};

/* ---------- Modal (relative to section) ---------- */
function BenefitModal({
  open,
  title,
  html,
  iconUrl,
  onClose,
}: {
  open: boolean;
  title: string;
  html: string;
  iconUrl?: string;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!open || !overlayRef.current || !panelRef.current) return;
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(panelRef.current, { opacity: 0, y: 16, scale: 0.96 });
      tlRef.current = gsap
        .timeline({ paused: true })
        .to(
          overlayRef.current,
          { opacity: 1, duration: 0.2, ease: "power1.out" },
          0
        )
        .to(
          panelRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" },
          0.05
        )
        .play();
      closeBtnRef.current?.focus({ preventScroll: true });
    },
    { dependencies: [open] }
  );

  const handleAnimatedClose = () => {
    const tl = tlRef.current;
    if (!tl) return onClose();
    tl.eventCallback("onReverseComplete", onClose);
    tl.reverse();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && handleAnimatedClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
      onMouseDown={(e) =>
        e.target === overlayRef.current && handleAnimatedClose()
      }
      aria-hidden={false}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="benefit-modal-title"
          className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-200"
        >
          <div className="flex items-start gap-4 p-6 pb-4">
            <div className="relative">
              <span className="pointer-events-none absolute -inset-1 -z-10 rounded-xl blur-md bg-gradient-to-br from-indigo-500/20 to-blue-500/10" />
              <div className="h-12 w-12 grid place-content-center rounded-xl ring-1 ring-slate-200 bg-slate-50 overflow-hidden">
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt={title || "Benefit icon"}
                    className="h-8 w-8 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-md bg-slate-200" />
                )}
              </div>
            </div>
            <h3
              id="benefit-modal-title"
              className="text-xl font-semibold text-slate-900"
            >
              {title}
            </h3>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={handleAnimatedClose}
              aria-label="Close"
              className="ml-auto rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.22 4.22a.75.75 0 011.06 0L10 8.94l4.72-4.72a.75.75 0 011.06 1.06L11.06 10l4.72 4.72a.75.75 0 11-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 11-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mx-6 mb-2 h-px bg-gradient-to-r from-indigo-400/40 via-slate-200 to-blue-300/40" />
          <div className="px-6 pb-6">
            <div
              className="prose max-w-none text-slate-700 leading-relaxed
                         [&_p]:mt-3 [&_p:first-child]:mt-0
                         [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-3
                         [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mt-3
                         max-h-[65vh] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Card ---------- */
function BenefitCard({
  item,
  onOpen,
}: {
  item: BenefitItem;
  onOpen: (item: BenefitItem) => void;
}) {
  const iconUrl = item?.icon?.value?.[0]?.url;
  const title = item?.name?.value ?? "";
  const hasHtml = !!item?.content?.value;

  return (
    <li className="h-full ">
      {/* make wrapper fill height */}
      <div className="h-full rounded-2xl p-[1px] bg-[conic-gradient(at_top_left,_#a5b4fc_0%,_#bfdbfe_20%,_#e2e8f0_40%,_transparent_60%)] ">
        {/* card fills height, column layout */}
        <article className="h-full min-h-[250px] sm:min-h-[260px] flex flex-col rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200 hover:ring-2 hover:ring-primary-3">
          {/* content grows to take available space */}
          <div className="p-6 flex-1">
            <div className="flex items-start flex-col gap-5">
              <div className="relative">
                <span className="pointer-events-none absolute -inset-1 -z-10 rounded-xl blur-md bg-gradient-to-br from-indigo-500/20 to-blue-500/10" />
                <div className="h-14 w-14 grid place-content-center rounded-xl ring-1 ring-slate-200 bg-slate-50 overflow-hidden">
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt={title || "Benefit icon"}
                      className="h-10 w-10 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-md bg-slate-200" />
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold leading-snug text-slate-900 line-clamp-2">
                {title}
              </h3>
            </div>
          </div>

          {/* footer sticks to bottom */}
          <div className="px-6 pb-6 mt-auto">
            <button
              type="button"
              disabled={!hasHtml}
              onClick={() => hasHtml && onOpen(item)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70
                         px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50
                         disabled:opacity-50 disabled:cursor-not-allowed
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
            >
              Know more
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.75 4.75a.75.75 0 00-1.5 0v7.19L6.53 9.22a.75.75 0 10-1.06 1.06l4 4a.75.75 0 001.06 0l4-4a.75.75 0 10-1.06-1.06l-2.72 2.72V4.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </li>
  );
}

/* ---------- Section ---------- */
export default function BenefitSection({ pageData }: Props) {
  const heading = pageData?.benefitsheading?.value ?? "Benefits";
  const items: BenefitItem[] = pageData?.benefititems?.value ?? [];
  const [active, setActive] = useState<BenefitItem | null>(null);

  return (
    <section className="relative isolate ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2
            id="benefits-heading"
            className="text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
          >
            {heading}
          </h2>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
        >
          {items.map((item, idx) => (
            <BenefitCard
              key={item?.system?.codename ?? idx}
              item={item}
              onOpen={setActive}
            />
          ))}
        </ul>
      </div>

      <BenefitModal
        open={!!active}
        title={active?.name?.value ?? ""}
        html={active?.content?.value ?? ""}
        iconUrl={active?.icon?.value?.[0]?.url}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
