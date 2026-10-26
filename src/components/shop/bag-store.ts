"use client";

import { useSyncExternalStore } from "react";
import { bagKey, parseBag, type BagLine } from "@/lib/shop";

const eventName = "eba-shop-bag-change";
const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(eventName, callback);
  };
};
const getSnapshot = () => {
  try { return window.localStorage.getItem(bagKey) ?? "[]"; }
  catch { return "[]"; }
};
const getServerSnapshot = () => "[]";

export function useBag() {
  return parseBag(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
}
export function saveBag(lines: BagLine[]) {
  try {
    window.localStorage.setItem(bagKey, JSON.stringify(parseBag(JSON.stringify(lines))));
    window.dispatchEvent(new Event(eventName));
    return true;
  } catch { return false; }
}
export function readBag() { return parseBag(getSnapshot()); }
