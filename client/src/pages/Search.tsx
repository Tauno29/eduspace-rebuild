/* EduSpace recovery style: the new references define a large Search page, rounded filter selectors, lavender scrims, white option sheets, and six browse-category cards. */

import { useMemo, useState } from "react";
import { BookOpen, House, Layers3, MapPin, Trophy } from "lucide-react";
import { useLocation } from "wouter";
import { AppFrame, AppTopBar } from "@/components/eduspace/Chrome";
import { FilterSelect, Pill, RegionCard, SearchField, SectionLabel, ToneIcon } from "@/components/eduspace/UI";
import { regions, schools } from "@/data/eduspace";

type FilterKey = "region" | "grade" | "type";

const filterOptions: Record<FilterKey, { title: string; all: string; options: string[] }> = {
  region: { title: "Select Region", all: "All Regions", options: regions.map((region) => region.name) },
  grade: { title: "Select Grade", all: "All Grades", options: ["Pre-primary", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"] },
  type: { title: "Select School Type", all: "All Types", options: ["Government", "Private"] },
};

export default function SearchPage() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<FilterKey | null>(() => {
    const requested = new URLSearchParams(window.location.search).get("modal");
    return requested === "region" || requested === "grade" || requested === "type" ? requested : null;
  });
  const [filters, setFilters] = useState({ region: "Region", grade: "Grade", type: "School Type", boarding: "Boarding Only" });
  const filteredSchools = useMemo(() => schools.filter((school) => school.name.toLowerCase().includes(query.toLowerCase())), [query]);
  const categories = [
    { title: "Nearby Schools", copy: "Find schools close to you", tone: "pink", kind: "pin" as const, action: () => navigate("/region/khomas") },
    { title: "Top Availability", copy: "Schools with most spaces", tone: "blue", kind: "trophy" as const, action: () => navigate("/availability") },
    { title: "Boarding Schools", copy: "Hostel facilities available", tone: "lilac", kind: "house" as const, action: () => setFilters((f) => ({ ...f, boarding: "Hostel Only" })) },
    { title: "Primary Schools", copy: "Grades 1–7", tone: "yellow", kind: "book" as const, action: () => setFilters((f) => ({ ...f, grade: "Primary" })) },
    { title: "Secondary Schools", copy: "Grades 8–12", tone: "mint", kind: "book" as const, action: () => setFilters((f) => ({ ...f, grade: "Secondary" })) },
    { title: "Combined Schools", copy: "All-in-one schools", tone: "lilac", kind: "house" as const, action: () => setFilters((f) => ({ ...f, type: "Combined" })) },
  ];
  const chooseFilter = (key: FilterKey, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setModal(null);
  };
  const resetFilters = () => setFilters({ region: "Region", grade: "Grade", type: "School Type", boarding: "Boarding Only" });
  const hasFilters = Object.values(filters).some((value) => !["Region", "Grade", "School Type", "Boarding Only"].includes(value));
  return (
    <AppFrame className="search-screen">
      <div className="page-intro search-intro"><h1>Search</h1><p>Find schools by name,<br />region or town.</p></div>
      <SearchField placeholder="Search schools, towns or regions..." value={query} onChange={setQuery} />
      <div className="filter-grid"><FilterSelect label="Region" value={filters.region} onClick={() => setModal("region")} /><FilterSelect label="Grade" value={filters.grade} onClick={() => setModal("grade")} /><FilterSelect label="School Type" value={filters.type} onClick={() => setModal("type")} /><FilterSelect label="Boarding Only" value={filters.boarding} onClick={() => setFilters((f) => ({ ...f, boarding: f.boarding === "Boarding Only" ? "Hostel Only" : "Boarding Only" }))} /></div>
      <SectionLabel>Browse by category</SectionLabel>
      <div className="category-grid">{categories.map((category) => <button className="category-card" key={category.title} onClick={category.action}><ToneIcon tone={category.tone} kind={category.kind} /><strong>{category.title}</strong><small>{category.copy}</small></button>)}</div>
      {(query || hasFilters) && <section className="quick-results"><div className="section-heading-row"><h2>{query ? "Results" : "Current filters"}</h2><button onClick={resetFilters}>Reset all filters</button></div>{query && filteredSchools.length ? <button className="search-result-row" onClick={() => navigate(`/school/${filteredSchools[0].id}`)}><span>{filteredSchools[0].name}</span><span>84 available →</span></button> : !query && <p className="no-results">Filters ready. Choose a school category or search by name.</p>}</section>}
      {modal && <SelectionModal filter={modal} value={filters[modal]} onSelect={(value) => chooseFilter(modal, value)} onClose={() => setModal(null)} />}
    </AppFrame>
  );
}

function SelectionModal({ filter, value, onSelect, onClose }: { filter: FilterKey; value: string; onSelect: (value: string) => void; onClose: () => void }) {
  const { title, all, options } = filterOptions[filter];
  const allSelected = value === all || (filter === "region" && value === "Region") || (filter === "grade" && value === "Grade") || (filter === "type" && value === "School Type");
  return <div className="selection-layer" role="dialog" aria-modal="true" aria-labelledby="selection-title"><button className="selection-scrim" onClick={onClose} aria-label="Close filter options" /><section className="selection-sheet"><h2 id="selection-title">{title}</h2><div className="selection-options"><button className={allSelected ? "selected" : ""} onClick={() => onSelect(all)}>{all}</button>{options.map((option) => <button key={option} className={value === option ? "selected" : ""} onClick={() => onSelect(option)}>{option}</button>)}</div></section></div>;
}

export function RegionsPage() {
  const [, navigate] = useLocation();
  return <AppFrame className="regions-screen"><div className="page-intro regions-intro"><h1>Regions</h1><p>Explore schools across all 14 regions.</p></div><div className="region-grid all-regions">{regions.map((region) => <RegionCard key={region.id} {...region} onClick={() => navigate(`/region/${region.id}`)} />)}</div></AppFrame>;
}

export function RegionDetailPage() {
  const [, navigate] = useLocation();
  const id = window.location.pathname.split("/").pop() ?? "erongo";
  const region = regions.find((item) => item.id === id) ?? regions[0];
  const [activeType, setActiveType] = useState("All");
  const types = ["All", "Government", "Private"];
  const categories = ["Primary", "Secondary", "Combined"];
  return <AppFrame className="region-detail-screen"><AppTopBar title="Region" onBack={() => navigate("/regions")} /><div className="region-detail-body"><div className="region-metrics"><div><span className="metric-icon purple"><House /></span><strong>1</strong><small>Schools</small></div><div><span className="metric-icon mint"><BookOpen /></span><strong>84</strong><small>Capacity</small></div><div><span className="metric-icon blue"><MapPin /></span><strong>84</strong><small>Spaces left</small></div><div><span className="metric-icon yellow"><Trophy /></span><strong>0%</strong><small>Occupancy</small></div></div><section className="analytics-block"><h2>Regional Profiles Analytics</h2><div className="analytics-bar"><span style={{ width: "100%" }} /></div><div className="analytics-legend"><span><i className="dot blue" />Govt Schools (1)</span><span><i className="dot violet" />Private Schools (0)</span></div></section><section className="analytics-block category-analytics"><h2>Schools category</h2>{categories.map((category, index) => <div className="category-stat" key={category}><span>{category}</span><div className="category-track"><i style={{ width: index === 1 ? "100%" : "0%" }} /></div><strong>{index === 1 ? 1 : 0}</strong></div>)}</section><SearchField placeholder={`Search in ${region.name}...`} trailing /><div className="mini-filter-row">{types.map((type) => <Pill key={type} active={activeType === type} onClick={() => setActiveType(type)}>{type}</Pill>)}<Pill>Primary</Pill><Pill>Secondary</Pill><Pill>Combined</Pill></div><p className="section-label schools-label">Schools (1)</p><button className="region-school-row" onClick={() => navigate("/school/nuyoma")}><img src="/manus-storage/eduspace-classroom_b42ae36b.jpg" alt="" /><span><strong>Nuyoma Senior Secondary School</strong><small>Oshikuku · Government</small><em>84 available</em></span><span className="list-chevron">›</span></button></div></AppFrame>;
}
