/* EduSpace recovery style: retain the compact search form, 2-column category cards, lavender canvas, and persistent floating dock from the reference composites. */

import { useMemo, useState } from "react";
import { BookOpen, House, MapPin, Trophy } from "lucide-react";
import { useLocation } from "wouter";
import { AppFrame, AppTopBar } from "@/components/eduspace/Chrome";
import { FilterSelect, Pill, SearchField, SectionLabel, ToneIcon } from "@/components/eduspace/UI";
import { regions, schools } from "@/data/eduspace";

export default function SearchPage() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ region: "Region", grade: "Grade", type: "School Type", boarding: "Boarding Only" });
  const filteredSchools = useMemo(() => schools.filter((school) => school.name.toLowerCase().includes(query.toLowerCase())), [query]);
  const categories = [
    { title: "Nearby Schools", copy: "Find schools close to you", tone: "pink", kind: "pin" as const, action: () => navigate("/region/khomas") },
    { title: "Top Availability", copy: "Schools with most spaces", tone: "blue", kind: "trophy" as const, action: () => navigate("/availability") },
    { title: "Boarding Schools", copy: "Hostel facilities available", tone: "lilac", kind: "house" as const, action: () => setFilters((f) => ({ ...f, boarding: "Hostel Only" })) },
    { title: "Primary Schools", copy: "Grades 1–7", tone: "yellow", kind: "book" as const, action: () => setFilters((f) => ({ ...f, grade: "Primary" })) },
  ];
  return (
    <AppFrame className="search-screen">
      <div className="page-intro search-intro">
        <h1>Search</h1>
        <p>Find schools by name,<br />region or town.</p>
      </div>
      <SearchField placeholder="Search schools, towns or regions..." value={query} onChange={setQuery} />
      <div className="filter-grid">
        <FilterSelect label="Region" value={filters.region} onClick={() => setFilters((f) => ({ ...f, region: f.region === "Region" ? "Oshikoto" : "Region" }))} />
        <FilterSelect label="Grade" value={filters.grade} onClick={() => setFilters((f) => ({ ...f, grade: f.grade === "Grade" ? "Grade 8" : "Grade" }))} />
        <FilterSelect label="School Type" value={filters.type} onClick={() => setFilters((f) => ({ ...f, type: f.type === "School Type" ? "Government" : "School Type" }))} />
        <FilterSelect label="Boarding Only" value={filters.boarding} onClick={() => setFilters((f) => ({ ...f, boarding: f.boarding === "Boarding Only" ? "Hostel Only" : "Boarding Only" }))} />
      </div>
      <SectionLabel>Browse by category</SectionLabel>
      <div className="category-grid">
        {categories.map((category) => <button className="category-card" key={category.title} onClick={category.action}><ToneIcon tone={category.tone} kind={category.kind} /><strong>{category.title}</strong><small>{category.copy}</small></button>)}
      </div>
      {query && <section className="quick-results"><div className="section-heading-row"><h2>Results</h2><button onClick={() => navigate(`/school/${filteredSchools[0]?.id ?? "nuyoma"}`)}>View <span>→</span></button></div>{filteredSchools.length ? <button className="search-result-row" onClick={() => navigate(`/school/${filteredSchools[0].id}`)}><span>{filteredSchools[0].name}</span><span>84 available →</span></button> : <p className="no-results">No schools found yet. Try another search.</p>}</section>}
    </AppFrame>
  );
}

export function RegionsPage() {
  const [, navigate] = useLocation();
  return (
    <AppFrame className="regions-screen">
      <div className="page-intro regions-intro"><h1>Regions</h1><p>Explore schools across Namibia.</p></div>
      <div className="region-grid all-regions">{regions.slice(6).map((region) => <RegionCardProxy key={region.id} {...region} onClick={() => navigate(`/region/${region.id}`)} />)}</div>
    </AppFrame>
  );
}

function RegionCardProxy({ name, schools, available, icon, tone, onClick }: { name: string; schools: number; available: number; icon: string; tone: string; onClick: () => void }) {
  return <button className="region-card" onClick={onClick}><div className={`region-symbol region-symbol-${tone}`}>{icon}</div><span className="availability-badge">{available}%</span><strong>{name}</strong><small>{schools} Schools</small><span className="explore-link">Explore <span>→</span></span></button>;
}

export function RegionDetailPage() {
  const [, navigate] = useLocation();
  const id = window.location.pathname.split("/").pop() ?? "erongo";
  const region = regions.find((item) => item.id === id) ?? regions[0];
  const [activeType, setActiveType] = useState("All");
  const types = ["All", "Government", "Private"];
  const categories = ["Primary", "Secondary", "Combined"];
  return (
    <AppFrame className="region-detail-screen">
      <AppTopBar title="Region" onBack={() => navigate("/regions")} />
      <div className="region-detail-body">
        <div className="region-metrics"><div><span className="metric-icon purple"><House /></span><strong>1</strong><small>Schools</small></div><div><span className="metric-icon mint"><BookOpen /></span><strong>84</strong><small>Capacity</small></div><div><span className="metric-icon blue"><MapPin /></span><strong>84</strong><small>Spaces left</small></div><div><span className="metric-icon yellow"><Trophy /></span><strong>0%</strong><small>Occupancy</small></div></div>
        <section className="analytics-block"><h2>Regional Profiles Analytics</h2><div className="analytics-bar"><span style={{ width: "100%" }} /></div><div className="analytics-legend"><span><i className="dot blue" />Govt Schools (1)</span><span><i className="dot violet" />Private Schools (0)</span></div></section>
        <section className="analytics-block category-analytics"><h2>Schools category</h2>{categories.map((category, index) => <div className="category-stat" key={category}><span>{category}</span><div className="category-track"><i style={{ width: index === 1 ? "100%" : "0%" }} /></div><strong>{index === 1 ? 1 : 0}</strong></div>)}</section>
        <SearchField placeholder={`Search in ${region.name}...`} trailing />
        <div className="mini-filter-row">{types.map((type) => <Pill key={type} active={activeType === type} onClick={() => setActiveType(type)}>{type}</Pill>)}<Pill active={false}>Primary</Pill><Pill active={false}>Secondary</Pill><Pill active={false}>Combined</Pill></div>
        <p className="section-label schools-label">Schools (1)</p>
        <button className="region-school-row" onClick={() => navigate("/school/nuyoma")}><img src="/manus-storage/eduspace-classroom_b42ae36b.jpg" alt="" /><span><strong>Nuyoma Senior Secondary School</strong><small>Oshikuku · Government</small><em>84 available</em></span><span className="list-chevron">›</span></button>
      </div>
    </AppFrame>
  );
}
