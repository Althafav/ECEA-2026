"use client";

import { Globalcomponent } from "@/models/globalcomponent";
import Globals from "@/modules/Globals";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
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
  const { asPath, locale, push, locales } = useRouter();

  useEffect(() => {
    let mounted = true;
    Globals.KontentClient.item("global_component")
      .withParameter("depth", "6")
      .toPromise()
      .then((response: any) => mounted && setPageData(response.item))
      .catch(console.error);
    return () => {
      mounted = false;
    };
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggle = (i: number) => setActive((a) => (a === i ? null : i));

  if (!pageData) return null;

  return (
    <div>
      <div className="menu-wrapper     w-full z-50 shadow">
        <div className="bg-primary-2 p-2">
          <div className="container mx-auto">
            <p
              className="text-white text-center max-w-3xl mx-auto"
              style={{ fontSize: "15px" }}
            >
              Under the patronage and presence of Sheikh Rashid bin Hamdan bin
              Rashid Al Maktoum, <br /> Supreme President of Hamdan bin Rashid
              Al Maktoum Foundation for Medical and Educational Sciences
            </p>
          </div>
        </div>
        <div className="bg-white py-5">
          <nav className="container mx-auto">
            <div className="flex justify-between items-center">
              {/* Logos */}
              <div className="flex gap-4 items-center">
                <Link href="/">
                  <img
                    src={pageData?.ecealogo?.value?.[0]?.url}
                    alt="ECEA"
                    className="w-[140px] md:w-[180px]"
                  />
                </Link>
                <div className="h-6 w-px bg-gray-300" />
                <Link href={pageData.sewebsitelink.value}>
                  <img
                    src={pageData?.selogo?.value?.[0]?.url}
                    alt="Society"
                    className="w-[140px] md:w-[180px]"
                  />
                </Link>
              </div>

              <div className="flex gap-3">
                <div className="flex gap-1">
                  <button
                    className="lang-btn text-sm cursor-pointer border border-gray-300 rounded-full text-black p-2"
                    onClick={() =>
                      push(asPath, asPath, {
                        locale: locale === "en" ? "ar" : "en",
                      })
                    }
                  >
                    {locale === "en" ? "العربية" : "English"}
                  </button>
                </div>
                <div className="flex items-center hover:bg-gray-100 rounded-lg p-2">
                  <span>Menu</span>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="  focus:outline-none"
                    aria-label="Open menu"
                  >
                    <IoMdArrowDropdown  size={28} />
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Overlay */}
          {isOpen && (
            <div className="fixed inset-0 z-[70] bg-white/95 backdrop-blur-sm flex flex-col min-h-screen">
              {/* Top bar */}
              <div className="container mx-auto flex justify-between items-center py-5">
                <div className="flex gap-4 items-center">
                  <img
                    src={pageData?.ecealogo?.value?.[0]?.url}
                    alt="ECEA"
                    className="w-[140px] md:w-[180px]"
                  />
                  <div className="h-6 w-px bg-gray-300" />
                  <img
                    src={pageData?.selogo?.value?.[0]?.url}
                    alt="Society"
                    className="w-[140px] md:w-[180px]"
                  />
                </div>
              </div>

              {/* Menu list */}
              <div className="container mx-auto flex-1 overflow-y-auto">
                <ul className="space-y-4">
                  {pageData?.headermenuitems?.value?.map(
                    (item: any, index: number) => {
                      const hasChildren = !!item?.items?.value?.length;
                      const open = active === index;
                      const href = item?.link?.value || "#";
                      const newTab = item?.target?.value === 1;

                      return (
                        <li key={item?.system?.id ?? index}>
                          {hasChildren ? (
                            <>
                              {/* Entire row toggles submenu */}
                              <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center text-2xl font-semibold text-gray-800 py-3 border-b border-gray-200"
                                aria-expanded={open}
                                aria-controls={`submenu-${index}`}
                              >
                                <span className="text-left">
                                  {item?.name?.value}
                                </span>
                                <HiChevronDown
                                  className={`transition-transform ${
                                    open ? "rotate-180" : ""
                                  }`}
                                />
                              </button>

                              {/* Children (accordion) */}
                              <div
                                id={`submenu-${index}`}
                                className={`overflow-hidden transition-[max-height] duration-200 ${
                                  open ? "max-h-60" : "max-h-0"
                                }`}
                              >
                                <ul className="pl-4 mt-2 space-y-2 pb-2">
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
                                            className="block py-2 text-lg text-gray-600 hover:text-gray-900"
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
                            // No children -> plain link
                            <Link
                              href={href}
                              target={newTab ? "_blank" : "_self"}
                              rel={newTab ? "noopener noreferrer" : undefined}
                              className="block text-2xl font-semibold text-gray-800 py-3 border-b border-gray-200 hover:text-gray-900"
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

              <div className="container mx-auto py-10">
                <div className="flex items-center justify-start gap-3">
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
              <div className="container mx-auto py-6 border-t border-gray-200 text-gray-500 text-sm">
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
