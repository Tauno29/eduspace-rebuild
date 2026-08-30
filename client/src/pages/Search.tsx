/* EduSpace live-data style: search and region results render only configured authoritative records; missing data is explicit rather than silently mocked. */

import { useMemo, useState } from "react";
import { BookOpen, House, MapPin, Trophy } from "lucide-react";
import { useLocation } from "wouter";
import { AppFrame, AppTopBar } from "@/components/eduspace/Chrome";
import { DataNotice, FilterSelect, Pill, RegionCard, SearchField, SectionLabel, ToneIcon } from "@/components/eduspace/UI";
import { useEduSpaceData } from "@/contexts/DataContext";
import type { Region } from "@/data/eduspace";

type FilterKey = "region" | "grade" | "type";

export default function SearchPage() {
  const [, navigate] = useLocation();
  const { status, data, reload } = useEduSpaceData();
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<FilterKey | null>(() => {
    const requested = new URLSearchParams(window.location.search).get("modal");
    return requested === "region" || requested === "grade" || requested === "type" ? requested : null;
  });
  const [filters, setFilters] = useState({ region: "Region", grade: "Grade", type: "School Type", boarding: "Boarding Only" });
  const filteredSchools = useMemo(() => (data?.schools ?? []).filter((school) => school.name.toLowerCase().includes(query.toLowerCase())), [data?.schools, query]);
  const categories = [
    { title: "Nearby Schools", copy: "Find schools close to you", tone: "pink", kind: "pin" as const, action: () => navigate("/region/khomas") },
    { title: "Top Availability", copy: "Schools with most spaces", tone: "blue", kind: "trophy" as const, action: () => navigate("/availability") },
    { title: "Boarding Schools", copy: "Hostel facilities available", tone: "lilac", kind: "house" as const, action: () => setFilters((f) => ({ ...f, boarding: "Hostel Only" })) },
    { title: "Primary Schools", copy: "Grades 1–7", tone: "yellow", kind: "book" as const, action: () => setFilters((f) => ({ ...f, grade: "Primary" })) },
    { title: "Secondary Schools", copy: "Grades 8–12", tone: "mint", kind: "book" as const, action: () => setFilters((f) => ({ ...f, grade: "Secondary" })) },
    { title: "Combined Schools", copy: "All-in-one schools", tone: "lilac", kind: "house" as const, action: () => setFilters((f) => ({ ...f, type: "Combined" })) },
  ];
  const chooseFilter = (key: FilterKey, value: string) => { setFilters((current) => ({ ...current, [key]: value })); setModal(null); };
  const resetFilters = () => setFilters({ region: "Region", grade: "Grade", type: "School Type", boarding: "Boarding Only" });
  const hasFilters = Object.values(filters).some((value) => !["Region", "Grade", "School Type", "Boarding Only"].includes(value));
  const optionSets = { region: { title: "Select Region", all: "All Regions", options: (data?.regions ?? []).map((region) => region.name) }, grade: { title: "Select Grade", all: "All Grades", options: ["Pre-primary", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"] }, type: { title: "Select School Type", all: "All Types", options: ["Government", "Private"] } };
  return (
    <AppFrame className="search-screen"><div className="page-intro search-intro"><h1>Search</h1><p>Find schools by name,<br />region or town.</p></div><SearchField placeholder="Search schools, towns or regions..." value={query} onChange={setQuery} /><div className="filter-grid"><FilterSelect label="Region" value={filters.region} onClick={() => setModal("region")} /><FilterSelect label="Grade" value={filters.grade} onClick={() => setModal("grade")} /><FilterSelect label="School Type" value={filters.type} onClick={() => setModal("type")} /><FilterSelect label="Boarding Only" value={filters.boarding} onClick={() => setFilters((f) => ({ ...f, boarding: f.boarding === "Boarding Only" ? "Hostel Only" : "Boarding Only" }))} /></div><SectionLabel>Browse by category</SectionLabel><div className="category-grid">{categories.map((category) => <button className="category-card" key={category.title} onClick={category.action}><ToneIcon tone={category.tone} kind={category.kind} /><strong>{category.title}</strong><small>{category.copy}</small></button>)}</div>{status === "missing" && <DataNotice onRetry={reload} title="Live search data required" copy="Configure VITE_EDUSPACE_DATA_URL to search current school records." />}{status === "error" && <DataNotice onRetry={reload} title="Unable to load schools" copy="The configured EduSpace data source could not be reached." />}{(query || hasFilters) && status === "ready" && <section className="quick-results"><div className="section-heading-row"><h2>{query ? "Results" : "Current filters"}</h2><button onClick={resetFilters}>Reset all filters</button></div>{query && filteredSchools.length ? <button className="search-result-row" onClick={() => navigate(`/school/${filteredSchools[0].id}`)}><span>{filteredSchools[0].name}</span><span>{filteredSchools[0].spaces} available →</span></button> : <p className="no-results">No schools match the current search criteria.</p>}</section>}{modal && <SelectionModal filter={modal} value={filters[modal]} options={optionSets[modal]} onSelect={(value) => chooseFilter(modal, value)} onClose={() => setModal(null)} />}</AppFrame>
  );
}

function SelectionModal({ filter, value, options, onSelect, onClose }: { filter: FilterKey; value: string; options: { title: string; all: string; options: string[] }; onSelect: (value: string) => void; onClose: () => void }) {
  const allSelected = value === options.all || (filter === "region" && value === "Region") || (filter === "grade" && value === "Grade") || (filter === "type" && value === "School Type");
  return <div className="selection-layer" role="dialog" aria-modal="true" aria-labelledby="selection-title"><button className="selection-scrim" onClick={onClose} aria-label="Close filter options" /><section className="selection-sheet"><h2 id="selection-title">{options.title}</h2><div className="selection-options"><button className={allSelected ? "selected" : ""} onClick={() => onSelect(options.all)}>{options.all}</button>{options.options.map((option) => <button key={option} className={value === option ? "selected" : ""} onClick={() => onSelect(option)}>{option}</button>)}</div></section></div>;
}

export function RegionsPage() {
  const [, navigate] = useLocation();
  const { status, data, reload } = useEduSpaceData();
  return <AppFrame className="regions-screen"><div className="page-intro regions-intro"><h1>Regions</h1><p>Explore schools across all regions.</p></div>{status === "ready" && data ? <div className="region-grid all-regions">{data.regions.map((region) => <RegionCard key={region.id} {...region} onClick={() => navigate(`/region/${region.id}`)} />)}</div> : <DataNotice onRetry={reload} title={status === "loading" ? "Loading live regions" : "Live regions unavailable"} copy="Connect an authoritative EduSpace data source to display current regions." />}</AppFrame>;
}

export function RegionDetailPage() {
  const [, navigate] = useLocation();
  const { status, data, reload } = useEduSpaceData();
  const id = window.location.pathname.split("/").pop() ?? "";
  const region = data?.regions.find((item: Region) => item.id === id);
  const [activeType, setActiveType] = useState("All");
  const types = ["All", "Government", "Private"];
  const categories = ["Primary", "Secondary", "Combined"];
  if (status !== "ready" || !data || !region) return <AppFrame className="region-detail-screen"><AppTopBar title="Region" onBack={() => navigate("/regions")} /><DataNotice onRetry={reload} title={status === "loading" ? "Loading region" : "Region data unavailable"} copy={status === "loading" ? "Fetching the latest regional record." : "This region is not present in the configured data source."} /></AppFrame>;
  const regionSchools = data.schools.filter((school) => school.region.toLowerCase().includes(region.name.toLowerCase()));
  return <AppFrame className="region-detail-screen"><AppTopBar title="Region" onBack={() => navigate("/regions")} /><div className="region-detail-body"><div className="region-metrics"><div><span className="metric-icon purple"><House /></span><strong>{region.schools}</strong><small>Schools</small></div><div><span className="metric-icon mint"><BookOpen /></span><strong>{region.available}</strong><small>Capacity</small></div><div><span className="metric-icon blue"><MapPin /></span><strong>{region.available}</strong><small>Spaces left</small></div><div><span className="metric-icon yellow"><Trophy /></span><strong>0%</strong><small>Occupancy</small></div></div><section className="analytics-block"><h2>Regional Profiles Analytics</h2><div className="analytics-bar"><span style={{ width: "100%" }} /></div><div className="analytics-legend"><span><i className="dot blue" />Govt Schools ({regionSchools.filter((school) => school.type === "Government").length})</span><span><i className="dot violet" />Private Schools ({regionSchools.filter((school) => school.type === "Private").length})</span></div></section><section className="analytics-block category-analytics"><h2>Schools category</h2>{categories.map((category) => { const count = regionSchools.filter((school) => school.category === category).length; return <div className="category-stat" key={category}><span>{category}</span><div className="category-track"><i style={{ width: `${regionSchools.length ? (count / regionSchools.length) * 100 : 0}%` }} /></div><strong>{count}</strong></div>; })}</section><SearchField placeholder={`Search in ${region.name}...`} trailing /><div className="mini-filter-row">{types.map((type) => <Pill key={type} active={activeType === type} onClick={() => setActiveType(type)}>{type}</Pill>)}<Pill>Primary</Pill><Pill>Secondary</Pill><Pill>Combined</Pill></div><p className="section-label schools-label">Schools ({regionSchools.length})</p>{regionSchools.map((school) => <button className="region-school-row" key={school.id} onClick={() => navigate(`/school/${school.id}`)}><img src={school.image} alt="" /><span><strong>{school.name}</strong><small>{school.location} · {school.type}</small><em>{school.spaces} available</em></span><span className="list-chevron">›</span></button>)}{!regionSchools.length && <DataNotice title="No schools returned" copy="This region currently has no schools in the configured data source." />}</div></AppFrame>;
}
