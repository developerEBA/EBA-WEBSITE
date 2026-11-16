import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectorDetails } from "@/lib/about-content";
import { SectorDetail } from "@/components/sector-detail";
import "../sectors.css";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return sectorDetails.map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = sectorDetails.find(sector => sector.slug === slug);
  return { title: item ? `${item.title} | EBA Sectors` : "Sector Not Found | EBA", description: item?.intro };
}
export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const item = sectorDetails.find(sector => sector.slug === slug);
  if (!item) notFound();
  return <SectorDetail sector={item}/>;
}
