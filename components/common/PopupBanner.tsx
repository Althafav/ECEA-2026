"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PopupBannerProps = {
  bannerImage: string;
  href?: string;
  alt?: string;
  target?: "_blank" | "_self";
  open?: boolean; // controlled; if omitted, component will auto-open
  onClose?: () => void;
  openDelay?: number; // ms
  frequency?: "always" | "session" | "day";
  storageKey?: string; // override if you want multiple banners
  dismissible?: boolean; // default true
};

export default function PopupBanner({
  bannerImage,
  href,
  alt = "Promotion",
  target = "_blank",
  open,
  onClose,
  openDelay = 600,
  frequency = "session",
  storageKey = "popup_banner_last_shown",
  dismissible = true,
}: PopupBannerProps) {
  const [mounted, setMounted] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<Element | null>(null);

  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? (open as boolean) : internalOpen;

  // Helpers
  const todayKey = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const markShown = () => {
    if (frequency === "session") {
      sessionStorage.setItem(storageKey, "shown");
    } else if (frequency === "day") {
      localStorage.setItem(storageKey, todayKey());
    }
  };

  const shouldShow = () => {
    if (frequency === "always") return true;
    if (frequency === "session") return !sessionStorage.getItem(storageKey);
    if (frequency === "day") return localStorage.getItem(storageKey) !== todayKey();
    return true;
  };

  // Auto-open logic (uncontrolled)
  useEffect(() => {
    setMounted(true);
    if (!isControlled) {
      const t = setTimeout(() => {
        if (shouldShow()) {
          setInternalOpen(true);
        }
      }, openDelay);
      return () => clearTimeout(t);
    }
  }, []); // eslint-disable-line

  // Focus management
  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement ?? null;
      // slight delay for animation before focusing
      const t = setTimeout(() => closeBtnRef.current?.focus(), 50);
      // Prevent page scroll behind modal
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        clearTimeout(t);
        (lastFocusedRef.current as HTMLElement | null)?.focus?.();
      };
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen || !dismissible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, dismissible]);

  const handleClose = () => {
    if (!isControlled) setInternalOpen(false);
    onClose?.();
    markShown();
  };

  const content = !isOpen ? null : (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Popup banner"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={dismissible ? handleClose : undefined}
      />

      {/* Card */}
      <div
        data-open={isOpen}
        className={[
          "relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl",
          "bg-white/0 outline-none ring-1 ring-black/5",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "data-[open=true]:scale-100 data-[open=false]:scale-95",
        ].join(" ")}
      >
        {/* Close */}
        {dismissible && (
          <button
            ref={closeBtnRef}
            onClick={handleClose}
            aria-label="Close popup"
            className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z" />
            </svg>
          </button>
        )}

        {/* Image/Link */}
        {href ? (
          <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
            <img src={bannerImage} alt={alt} className="block h-auto w-full" />
          </a>
        ) : (
          <img src={bannerImage} alt={alt} className="block h-auto w-full" />
        )}
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
}
