import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { HiArrowRight } from "react-icons/hi";

type Props = { pageData: any };

export default function TargetCTAComponent({ pageData }: Props) {
  const { locale } = useRouter();
  const heading: string = pageData.targetctaheading.value;

  const items = pageData?.targetctaitems?.value ?? [];

  // Emphasize specific words in the heading to match the reference
  const highlightWords = locale == "ar" ? ["حضورك", "تأثيرك"] : ["Presence", "Impact"];
  const parts = heading.split(new RegExp(`(${highlightWords.join("|")})`, "i"));

  return (
    <section aria-labelledby="target-cta-heading" className="">
      <div className="container mx-auto">
        <h2
          id="target-cta-heading"
          className="text-center font-medium tracking-tight text-slate-900
                     text-4xl md:text-5xl lg:text-6xl"
        >
          {parts.map((t, i) =>
            highlightWords.some((w) => new RegExp(`^${w}$`, "i").test(t)) ? (
              <span
                key={i}
                className="bg-gradient-to-r from-primary-3 to-primaryDark bg-clip-text text-transparent"
              >
                {t}
              </span>
            ) : (
              <span key={i}>{t}</span>
            )
          )}
        </h2>

        <div
          className="
            mt-12 grid gap-x-12 gap-y-8
            grid-cols-1 md:grid-cols-2 lg:grid-cols-4
          "
        >
          {items.map((item: any, idx: number) => {
            const href = item?.link?.value || "#";

            return (
              <Link
                key={idx}
                href={href}
                target={item.target.value === 1 ? "_blank" : "_self"}
                className="
                  group block focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md
                "
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                    {item?.name?.value ?? ""}
                  </h3>
                  <HiArrowRight
                    aria-hidden
                    className="mt-1 shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </div>
                <p className="mt-1 text-slate-500">
                  {item?.description?.value ?? ""}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
