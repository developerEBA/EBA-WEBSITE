import { portfolioClients, type PortfolioClient } from "@/lib/client-portfolio";

function client(name: string): PortfolioClient {
  const entry = portfolioClients.find(item => item.name === name);
  if (!entry) throw new Error(`Unknown footprint client: ${name}`);
  return entry;
}

const afriex = client("Afriex");
const pws = client("Play With Stephen (PWS)");
const communitee = client("communiTEEbyeba");
const stephen = client("Stephen Onaivi");

// Client/location relationships supplied by EBA. City entries are labelled explicitly.
export const globalFootprint = [
  { id: "nigeria", label: "Nigeria", country: "Nigeria", coordinates: [8, 9], clients: [
    afriex, client("mediaReach OMD"), client("Hostessng"), client("Official Loud Urban Choir"),
    client("Hoardings Africa"), pws, communitee, client("EBA Foundation"),
    client("Ann Obaseki"), stephen, client("Omoniyi Dada"),
  ] },
  { id: "ghana", label: "Ghana", country: "Ghana", coordinates: [-1.5, 7.9], clients: [pws, stephen, afriex] },
  { id: "south-africa", label: "South Africa", country: "South Africa", coordinates: [25, -29], clients: [communitee, afriex, client("Omoniyi Dada")] },
  { id: "cotonou", label: "Cotonou, Benin", country: "Benin", coordinates: [2.4, 6.4], clients: [communitee, afriex, pws, client("Hoardings Africa")] },
  { id: "dubai", label: "Dubai, UAE", country: "United Arab Emirates", coordinates: [55.3, 25.2], clients: [client("Dinku Transnational")] },
  { id: "kenya", label: "Kenya", country: "Kenya", coordinates: [38, 0.2], clients: [afriex, communitee] },
  { id: "uk", label: "United Kingdom", country: "United Kingdom", coordinates: [-2, 54], clients: [{ name: "Queen Margret", category: "Personal Brands" as const }] },
];

