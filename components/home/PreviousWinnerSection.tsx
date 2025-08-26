// app/components/PreviousWinnerSection.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FaMedal } from "react-icons/fa";

type Props = { pageData: any };

type WinnerItem = {
  name?: { value?: string };
  image?: { value?: Array<{ url: string }> };
  position?: { value?: number };
};

function Medal({ pos }: { pos?: number }) {
  if (!pos || pos > 3) return null;
  const color =
    pos === 1 ? "text-amber-500" : pos === 2 ? "text-slate-400" : "text-orange-600";
  const label = pos === 1 ? "First place" : pos === 2 ? "Second place" : "Third place";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-medium shadow ${color}`}
      aria-label={label}
      title={label}
    >
      <FaMedal />
      {pos === 1 ? "1st" : pos === 2 ? "2nd" : "3rd"}
    </span>
  );
}

function TabBar({
  items,
  selectedIndex,
  onSelect,
  ariaLabel,
}: {
  items: string[];
  selectedIndex: number;
  onSelect: (i: number) => void;
  ariaLabel: string;
}) {
  return (
    <div className="overflow-x-auto">
      <div role="tablist" aria-label={ariaLabel} className="flex min-w-max border-b border-slate-200">
        {items.map((label, i) => {
          const selected = i === selectedIndex;
          return (
            <button
              key={`${label}-${i}`}
              role="tab"
              aria-selected={selected}
              onClick={() => onSelect(i)}
              className={[
                "-mb-px inline-flex items-center border-b-2 px-3 py-2 text-md font-medium transition",
                "text-slate-600 hover:text-slate-900 border-transparent",
                selected ? "border-slate-900 text-slate-900" : "",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WinnerCard({ w }: { w: WinnerItem }) {
  const name = w?.name?.value ?? "Unnamed";
  const img = w?.image?.value?.[0]?.url;
  const pos = Number(w?.position?.value);

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:ring-2 hover:ring-primary-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
        {img ? (
          <Image
            src={img}
            alt={name}
            width={640}
            height={480}
            sizes="(max-width: 640px) 100vw, 25vw"
            className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">No Image</div>
        )}
        {pos && pos <= 3 && (
          <div className="absolute left-2 top-2">
            <Medal pos={pos} />
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="line-clamp-2 text-sm font-semibold text-slate-900">{name}</h4>
      </div>
    </article>
  );
}

export default function PreviousWinnerSection({ pageData }: Props) {
  const yearsRaw = pageData?.previouswinneritems?.value ?? [];
  const years = useMemo(() => yearsRaw, [yearsRaw]);

  const [yearIndex, setYearIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    setYearIndex(0);
    setCategoryIndex(0);
  }, [years.length]);

  useEffect(() => {
    setCategoryIndex(0);
  }, [yearIndex]);

  const selectedYear = years[yearIndex];
  const categories = selectedYear?.items?.value ?? [];
  const selectedCategory = categories[categoryIndex];
  const groups = selectedCategory?.winner_category_items?.value ?? [];

  const yearLabels = years.map(
    (y: any, i: number) => y?.yeartext?.value ?? `Year ${i + 1}`
  );
  const categoryLabels = categories.map(
    (c: any, i: number) => c?.name?.value ?? `Category ${i + 1}`
  );

  return (
    <section className="">
      <div className="mx-auto max-w-6xl ">
        <header className="mb-8">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Previous Winners
          </h2>
        </header>

        {/* Year Tabs */}
        <div className="mb-4 flex justify-center">
          {yearLabels.length ? (
            <TabBar
              ariaLabel="Years"
              items={yearLabels}
              selectedIndex={yearIndex}
              onSelect={setYearIndex}
            />
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
              No years found.
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex justify-center">
          {categoryLabels.length ? (
            <TabBar
              ariaLabel="Categories"
              items={categoryLabels}
              selectedIndex={categoryIndex}
              onSelect={setCategoryIndex}
            />
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
              No categories for this year.
            </div>
          )}
        </div>

        {/* Winner Groups */}
        {!groups.length ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            No winners listed for this category.
          </div>
        ) : (
          groups.map((group: any, gi: number) => {
            const heading = group?.heading?.value ?? `Group ${gi + 1}`;
            const merged: WinnerItem[] = [
              ...(group?.hero_winner?.value ?? []),
              ...(group?.items?.value ?? []),
            ];

            return (
              <section key={`${heading}-${gi}`} className="mb-12">
                <div className="mb-5 flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">{heading}</h3>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {merged.map((w, wi) => (
                    <WinnerCard key={`w-${wi}`} w={w} />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
    </section>
  );
}
