"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import "./merch-popup.css";

const storageKey = "eba-merch-popup-views";
const maxViews = 3;

export default function MerchPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const views = useRef(0);
  const excluded = /^\/(shop|editorial)(\/|$)/.test(pathname);

  useEffect(() => {
    if (excluded || open) return;
    try {
      const saved = Number(sessionStorage.getItem(storageKey));
      if (Number.isFinite(saved)) views.current = Math.max(views.current, saved);
    } catch { /* Keep the limit in memory if browser storage is unavailable. */ }
    if (views.current >= maxViews) return;

    // Let the page become interactive before showing a non-critical promotion.
    const timer = window.setTimeout(() => {
      views.current += 1;
      try { sessionStorage.setItem(storageKey, String(views.current)); } catch {}
      setOpen(true);
    }, views.current === 0 ? 2500 : 30000);
    return () => window.clearTimeout(timer);
  }, [excluded, open]);

  function explore() {
    views.current = maxViews;
    try { sessionStorage.setItem(storageKey, String(maxViews)); } catch {}
    setOpen(false);
  }

  return (
    // A non-modal promotion keeps the website accessible and avoids Radix
    // adding aria-hidden to page sections that are still hydrating.
    <Dialog.Root modal={false} open={open && !excluded} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Content className="merch-popup" aria-describedby="merch-popup-description">
          <Dialog.Title className="sr-only">Get your EBA merch</Dialog.Title>
          <Dialog.Description id="merch-popup-description" className="sr-only">
            Wear the culture. Explore EBA clothing, cups and accessories in our company shop.
          </Dialog.Description>
          <Dialog.Close className="merch-popup-close" aria-label="Exit merchandise popup">
            <X size={18} aria-hidden="true" />
          </Dialog.Close>
          <Link href="/shop" onClick={explore} className="merch-popup-art" aria-label="Shop now — explore the EBA company shop">
            <Image src="/images/shop/merch-popup.png" alt="Get your EBA merch. EBA hoodies, T-shirts, caps, bags, cups and accessories. Shop now." width={1536} height={1024} loading="eager" unoptimized sizes="(max-width: 304px) calc(100vw - 24px), (max-width: 520px) 280px, 360px" />
          </Link>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
