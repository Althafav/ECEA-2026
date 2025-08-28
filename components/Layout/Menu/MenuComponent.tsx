"use client";

import { Globalcomponent } from "@/models/globalcomponent";
import Globals from "@/modules/Globals";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiMenuAlt4, HiX, HiChevronDown } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";

export default function MenuComponent() {
  const [pageData, setPageData] = useState<Globalcomponent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const { asPath, locale, push } = useRouter();
  const languageCode = locale === "ar" ? "arabic" : "default";
  useEffect(() => {
    let mounted = true;
    Globals.KontentClient.item("global_component")
      .languageParameter(languageCode)
      .withParameter("depth", "6")
      .toPromise()
      .then((response: any) => mounted && setPageData(response.item))
      .catch(console.error);
    return () => {
      mounted = false;
    };
  }, []);

  // Body scroll lock (mobile-safe)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [isOpen]);

  const toggle = (i: number) => setActive((a) => (a === i ? null : i));

  if (!pageData) return null;

  return (
    <div className="w-full">
      <div className="menu-wrapper w-full z-50 shadow overflow-x-clip">
        {/* Top ribbon */}
        <div className="bg-primary-2 px-4 py-2">
          <div className="container mx-auto">
            <p
              className="text-white text-center mx-auto text-xs sm:text-sm leading-relaxed"
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              {locale === "ar" ? (
                <>
                  تحت رعاية الشيخ راشد بن حمدان بن راشد آل مكتوم،
                  <br className="hidden sm:block" />
                  الرئيس الأعلى لمؤسسة حمدان بن راشد للعلوم الطبية والتربوية
                </>
              ) : (
                <>
                  Under the patronage and presence of Sheikh Rashid bin Hamdan
                  bin Rashid Al Maktoum,
                  <br className="hidden sm:block" />
                  Supreme President of Hamdan bin Rashid Al Maktoum Foundation
                  for Medical and Educational Sciences
                </>
              )}
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white py-4 sm:py-5" >
          <nav className="container mx-auto px-4" dir="ltr">
            {/* was: flex flex-col ... */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Logos */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <Link href="/" className="block">
                  <img
                    src={pageData?.ecealogo?.value?.[0]?.url}
                    alt="ECEA"
                    className="h-10 sm:h-12 md:h-14 w-auto max-w-[44vw] sm:max-w-none object-contain"
                  />
                </Link>
                <span className="hidden sm:block h-6 w-px bg-gray-300" />
                <a
                  href={pageData?.sewebsitelink?.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={pageData?.selogo?.value?.[0]?.url}
                    alt="Society"
                    className="h-10 sm:h-12 md:h-14 w-auto max-w-[44vw] sm:max-w-none object-contain"
                  />
                </a>
              </div>

              {/* Actions — add self-end on mobile so it sticks to the right */}
              <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
                <button
                  className="lang-btn text-xs sm:text-sm border border-gray-300 rounded-full text-black px-3 py-1.5"
                  onClick={() => {
                    const newLocale = locale === "en" ? "ar" : "en";
                    push(asPath, asPath, { locale: newLocale }).then(() => {
                      window.location.reload();
                    });
                  }}
                >
                  {locale === "en" ? "العربية" : "English"}
                </button>

                <button
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100"
                  aria-label="Open menu"
                >
                  <span className="text-sm sm:text-base">Menu</span>
                  <IoMdArrowDropdown size={22} />
                </button>
              </div>
            </div>
          </nav>

          {/* Overlay */}
          {isOpen && (
            <div className="fixed inset-0 z-[70] bg-white/95 backdrop-blur-sm flex flex-col h-screen overflow-x-hidden">
              {/* Top bar */}
              <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 sm:py-5 flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <img
                        src={pageData?.ecealogo?.value?.[0]?.url}
                        alt="ECEA"
                        className="h-9 sm:h-10 w-auto object-contain"
                      />
                    </Link>
                    <span className="hidden sm:block h-6 w-px bg-gray-300" />
                    <Link href={pageData.sewebsitelink.value} target="_blank">
                      <img
                        src={pageData?.selogo?.value?.[0]?.url}
                        alt="Society"
                        className="h-9 sm:h-10 w-auto object-contain"
                      />
                    </Link>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100"
                    aria-label="Close menu"
                  >
                    <HiX size={22} />
                    <span className="hidden sm:inline">
                      {locale === "ar" ? "إغلاق" : "Close"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Menu list */}
              <div className="container mx-auto px-4 flex-1 overflow-y-auto">
                <ul className="divide-y divide-gray-200">
                  {pageData?.headermenuitems?.value?.map(
                    (item: any, index: number) => {
                      const hasChildren = !!item?.items?.value?.length;
                      const open = active === index;
                      const href = item?.link?.value || "#";
                      const newTab = item?.target?.value === 1;

                      return (
                        <li key={item?.system?.id ?? index} className="py-1">
                          {hasChildren ? (
                            <>
                              {/* Row toggles submenu */}
                              <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between py-3 sm:py-4"
                                aria-expanded={open}
                                aria-controls={`submenu-${index}`}
                              >
                                <span className="text-base sm:text-2xl font-semibold text-gray-800 text-left">
                                  {item?.name?.value}
                                </span>
                                <HiChevronDown
                                  className={`shrink-0 transition-transform duration-200 ${
                                    open ? "rotate-180" : ""
                                  }`}
                                  size={22}
                                />
                              </button>

                              {/* Children with grid auto-height animation */}
                              <div
                                id={`submenu-${index}`}
                                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                              >
                                <ul className="overflow-hidden pl-3 sm:pl-4 pb-2 sm:pb-3 space-y-1 sm:space-y-2">
                                  {item.items.value.map(
                                    (sub: any, subIndex: number) => {
                                      const subHref = sub?.link?.value || "#";
                                      const subNewTab =
                                        sub?.target?.value === 1;
                                      return (
                                        <li key={sub?.system?.id ?? subIndex}>
                                          <a
                                            href={subHref}
                                            target={
                                              subNewTab ? "_blank" : "_self"
                                            }
                                            rel={
                                              subNewTab
                                                ? "noopener noreferrer"
                                                : undefined
                                            }
                                            className="block py-2 text-sm sm:text-lg text-gray-600 hover:text-gray-900"
                                            onClick={() => setIsOpen(false)}
                                          >
                                            {sub?.name?.value}
                                          </a>
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              </div>
                            </>
                          ) : (
                            <Link
                              href={href}
                              target={newTab ? "_blank" : "_self"}
                              rel={newTab ? "noopener noreferrer" : undefined}
                              className="block py-3 sm:py-4 text-base sm:text-2xl font-semibold text-gray-800 hover:text-gray-900"
                              onClick={() => setIsOpen(false)}
                            >
                              {item?.name?.value}
                            </Link>
                          )}
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>

              {/* Social Media */}
              <div className="container mx-auto px-4 py-6 sm:py-10">
                <div className="flex flex-wrap items-center gap-3">
                  {pageData?.facebookurl?.value && (
                    <Link
                      href={pageData.facebookurl.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                    >
                      <FaFacebookF size={18} />
                    </Link>
                  )}
                  {pageData?.instagramurl?.value && (
                    <Link
                      href={pageData.instagramurl.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                    >
                      <FaInstagram size={18} />
                    </Link>
                  )}
                  {pageData?.xurl?.value && (
                    <Link
                      href={pageData.xurl.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X (Twitter)"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                    >
                      <FaXTwitter size={18} />
                    </Link>
                  )}
                  {pageData?.linkedinurl?.value && (
                    <Link
                      href={pageData.linkedinurl.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                    >
                      <FaLinkedinIn size={18} />
                    </Link>
                  )}
                  {pageData?.youtubeurl?.value && (
                    <Link
                      href={pageData.youtubeurl.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                    >
                      <FaYoutube size={18} />
                    </Link>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="container mx-auto px-4 py-4 sm:py-6 border-t border-gray-200 text-gray-500 text-xs sm:text-sm">
                © {new Date().getFullYear()} Excellence And Creative Engineering
                Awards. All rights reserved.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
