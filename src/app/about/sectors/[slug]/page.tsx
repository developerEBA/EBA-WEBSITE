import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorEditorial } from "@/components/sector-editorial";
import { sectorEditorials } from "@/lib/sector-editorials";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return sectorEditorials.map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = sectorEditorials.find(sector => sector.slug === slug);
  return { title: item ? `${item.title} | EBA Sectors` : "Sector Not Found | EBA", description: item?.intro };
}
export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const editorial = sectorEditorials.find(sector => sector.slug === slug);
  if (!editorial) notFound();
  return <SectorEditorial sector={editorial}/>;
}
