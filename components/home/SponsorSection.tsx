import React from "react";

type Props = { pageData: any };

export default function SponsorSection({ pageData }: Props) {
  return (
    <div>
      <div className="mb-8">
        <h2
          id="award-categories-heading"
          className="text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
        >
          {pageData.sponsorsheading.value}
        </h2>
      </div>

      {/* Flex centers the last/only row even with 1–2 items */}
      <div className="flex flex-wrap justify-center gap-5">
        {pageData.sponsoritems.value.map((item: any, index: number) => (
          <div
            key={index}
            className="
              sponsor-card group relative rounded-2xl border border-slate-200
              bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-md
              w-[180px] sm:w-[200px] md:w-[220px]
            "
          >
            <div className="flex h-24 items-center justify-center">
              {item.logo.value && (
                <img
                  src={item.logo.value[0]?.url}
                  alt={item.name?.value || "Sponsor logo"}
                  loading="lazy"
                  decoding="async"
                  className="max-h-16 w-auto object-contain grayscale transition-transform duration-200 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              )}
            </div>

            {item.name?.value && (
              <div className="mt-3 text-center text-xs font-medium text-slate-600 line-clamp-1">
                {item.name.value}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
