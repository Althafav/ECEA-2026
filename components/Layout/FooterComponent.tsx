"use client";

import { Globalcomponent } from "@/models/globalcomponent";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { gsap } from "@/lib/gsap-setup";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useRouter } from "next/router";

export default function FooterComponent() {
  const [pageData, setPageData] = useState<Globalcomponent | null>(null);
  const { locale } = useRouter();
  const languageCode = locale === "ar" ? "arabic" : "default";
  useEffect(() => {
    Globals.KontentClient.item("global_component")
      .withParameter("depth", "6")
      .languageParameter(languageCode)
      .toPromise()
      .then((response: any) => setPageData(response.item))
      .catch(console.error);
  }, []);

  const menuItems = useMemo(
    () => pageData?.footermenuitems?.value ?? [],
    [pageData]
  );
  const splitIndex = Math.ceil(menuItems.length / 2);
  const leftMenu = menuItems.slice(0, splitIndex);
  const rightMenu = menuItems.slice(splitIndex);

  if (!pageData) null;
  return (
    <footer className="footer-component-wrapper relative bg-primaryDark text-slate-200">
      {/* Top accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand + Social */}
          <div className="footer-reveal">
            <div className="mb-6">
              <img
                className="w-[220px] max-w-full"
                src="/assets/logos/white-logo-ecea.png"
                alt="Excellence and Creative Engineering Award"
              />
            </div>

            {/* <p className="text-sm text-slate-300/90 leading-relaxed max-w-xs">
              Honoring innovation and excellence in engineering.
            </p> */}

            <div className="mt-6 flex items-center gap-3">
              {pageData?.facebookurl?.value && (
                <Link
                  href={pageData.facebookurl.value}
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10"
                >
                  <FaFacebookF />
                </Link>
              )}
              {pageData?.instagramurl?.value && (
                <Link
                  href={pageData.instagramurl.value}
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10"
                >
                  <FaInstagram />
                </Link>
              )}
              {pageData?.xurl?.value && (
                <Link
                  href={pageData.xurl.value}
                  aria-label="X (Twitter)"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10"
                >
                  <FaXTwitter />
                </Link>
              )}
              {pageData?.linkedinurl?.value && (
                <Link
                  href={pageData.linkedinurl.value}
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10"
                >
                  <FaLinkedinIn />
                </Link>
              )}
              {pageData?.youtubeurl?.value && (
                <Link
                  href={pageData.youtubeurl.value}
                  aria-label="YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10"
                >
                  <FaYoutube />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <nav className="footer-reveal md:col-span-1">
            <h4 className="mb-4 text-lg font-semibold tracking-wide text-white">
              {locale === "ar" ? "روابط سريعة": "Quick Links"}
            </h4>

            {/* Two-column auto layout when many items */}
            <div
              className={`grid gap-x-8 ${
                rightMenu.length ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              <ul className="space-y-2">
                {leftMenu.map((item: any, i: number) => {
                  const href = item?.link?.value ?? "#";
                  return (
                    <li key={`left-${i}`}>
                      <Link
                        href={href}
                        // onClick={(e) => handleNavClick(e, href)}
                        className="group inline-flex items-center gap-2 text-sm text-slate-200/90 transition hover:text-white"
                      >
                        <span className="h-[1px] w-0 bg-white transition-all group-hover:w-4" />
                        {item?.name?.value ?? "Link"}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {rightMenu.length > 0 && (
                <ul className="space-y-2">
                  {rightMenu.map((item: any, i: number) => {
                    const href = item?.link?.value ?? "#";
                    return (
                      <li key={`right-${i}`}>
                        <Link
                          href={href}
                          // onClick={(e) => handleNavClick(e, href)}
                          className="group inline-flex items-center gap-2 text-sm text-slate-200/90 transition hover:text-white"
                        >
                          <span className="h-[1px] w-0 bg-white transition-all group-hover:w-4" />
                          {item?.name?.value ?? "Link"}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </nav>

          {/* Organized By */}
          <div className="footer-reveal md:col-span-1 lg:col-span-2">
            <div className="flex flex-col items-start gap-4 lg:items-end lg:text-right">
              <h4 className="text-base font-medium text-white">
                {pageData?.organizedbytext?.value ?? "Organized by"}
              </h4>
              {pageData?.organizedbylogo?.value?.[0]?.url ? (
                <Link
                  href={pageData.organizedbywebsitelink.value}
                  target="_blank"
                >
                  <img
                    className="w-24 h-12 object-contain"
                    src={pageData.organizedbylogo.value[0].url}
                    alt={
                      pageData.organizedbylogo.value[0].name || "Organizer Logo"
                    }
                  />
                </Link>
              ) : null}

              {/* Back to top */}
              <button
                onClick={() =>
                  gsap.to(window, {
                    duration: 0.8,
                    scrollTo: 0,
                    ease: "power2.inOut",
                  })
                }
                className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
                aria-label="Back to top"
              >
                ↑ {locale === "ar" ? "العودة إلى الأعلى": "Back to top"}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-slate-300/80">
            {pageData?.copyrighttext?.value ??
              "© Excellence and Creative Engineering Award"}
          </p>
        </div>
      </div>

      {/* Soft radial spotlight */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
      </div>
    </footer>
  );
}
