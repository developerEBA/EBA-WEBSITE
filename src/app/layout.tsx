import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Yellowtail } from "next/font/google";
import "./globals.css";
import "./ui-foundation.css";
import Footer from "@/components/footer";
import SiteHeader from "@/components/site-header";
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yellowtail",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eni Brand Architect | EBA",
  description: "Strategic communications and brand architecture.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`h-full antialiased ${dmSans.variable} ${playfairDisplay.variable} ${yellowtail.variable}`}
    >
      <body id="site-top" className="min-h-full flex flex-col"><SiteHeader />{children}<Footer /></body>
    </html>
  );
}




