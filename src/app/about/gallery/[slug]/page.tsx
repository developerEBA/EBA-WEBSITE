import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { workGalleries } from "@/lib/about-content";
import { AboutDetail } from "@/components/about-detail";
import "../../about-detail.css";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return workGalleries.map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = workGalleries.find(gallery => gallery.slug === slug);
  return { title: item ? `${item.title} Gallery | EBA` : "Gallery Not Found | EBA", description: item?.intro };
}
export default async function WorkGalleryPage({ params }: Props) {
  const { slug } = await params;
  const item = workGalleries.find(gallery => gallery.slug === slug);
  if (!item) notFound();
  return <AboutDetail {...item} eyebrow="BEYOND THE WORK" navigation={workGalleries.map(gallery => ({ title: gallery.title, href: `/about/gallery/${gallery.slug}`, current: gallery.slug === slug }))}/>;
}
