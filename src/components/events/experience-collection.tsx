"use client";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { presentedEvents } from "@/lib/event-presentation";
import { ExperienceCard } from "@/components/events/experience-card";
const groups = ["All experiences", "Community", "Culture", "Golf & purpose"];
export function ExperienceCollection({ all = false }: { all?: boolean }) {
  const [group,setGroup] = useState("All experiences");
  const [query,setQuery] = useState("");
  const [page,setPage] = useState(1);
  const results = useMemo(()=>presentedEvents.filter(event=>(group === "All experiences" || event.group === group) && `${event.title} ${event.location} ${event.summary}`.toLowerCase().includes(query.trim().toLowerCase())),[group,query]);
  const pageSize=6;
  const pageCount=Math.ceil(results.length/pageSize);
  function goToPage(value:number){setPage(value);document.getElementById("experience-results")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});}
  return <section className="experience-collection experience-shell" id="event-stories"><div className="experience-collection-heading"><div><span className="experience-eyebrow">The experiences</span><h2>{all ? "The whole collection." : "A reason to come together."}</h2></div><div className="experience-search"><Search size={17}/><label className="sr-only" htmlFor="experience-search">Search events</label><input id="experience-search" type="search" placeholder="Find an experience…" value={query} onChange={event=>{setQuery(event.target.value);setPage(1);}}/>{query && <button aria-label="Clear event search" onClick={()=>{setQuery("");setPage(1);}}><X size={16}/></button>}</div></div><div className="experience-filters" role="group" aria-label="Filter events">{groups.map(item=><button key={item} aria-pressed={group===item} onClick={()=>{setGroup(item);setPage(1);}}>{item}</button>)}</div><div className="experience-results-meta" id="experience-results"><span role="status">{results.length} {results.length===1?"experience":"experiences"}{query && ` matching “${query}”`}</span><span>Most recent first</span></div>{results.length ? <div className="experience-card-grid">{results.slice((page-1)*pageSize,page*pageSize).map(event=><ExperienceCard key={event.id} event={event}/>)}</div> : <div className="experience-empty"><h3>No experiences found.</h3><p>Try a name, a place or another category.</p><button onClick={()=>{setQuery("");setGroup("All experiences");setPage(1);}}>Reset filters <ArrowRight size={16}/></button></div>}{pageCount>1 && <nav className="experience-pagination" aria-label="Event pages"><button aria-label="Previous event page" disabled={page===1} onClick={()=>goToPage(page-1)}><ArrowLeft size={17}/></button>{Array.from({length:pageCount},(_,i)=><button key={i} aria-label={`Event page ${i+1}`} aria-current={page===i+1?"page":undefined} onClick={()=>goToPage(i+1)}>{String(i+1).padStart(2,"0")}</button>)}<button aria-label="Next event page" disabled={page===pageCount} onClick={()=>goToPage(page+1)}><ArrowRight size={17}/></button></nav>}</section>;
}
