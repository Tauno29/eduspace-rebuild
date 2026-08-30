/* EduSpace recovery style: preserve the classroom hero, mint availability card, simple tab strip, and bottom-sheet hostel modal shown in the screenshots. */

import { useState } from "react";
import { ArrowLeft, Heart, X, Building2, UsersRound, FileText, CircleGauge, ChevronDown, Bell } from "lucide-react";
import { useLocation } from "wouter";
import { AppFrame, AppTopBar } from "@/components/eduspace/Chrome";
import { Pill, SectionLabel } from "@/components/eduspace/UI";
import { schools, vacancyRows } from "@/data/eduspace";

export function SchoolProfilePage() {
  const [, navigate] = useLocation();
  const [saved, setSaved] = useState(() => window.localStorage.getItem("eduspace-saved-nuyoma") !== "false");
  const [tab, setTab] = useState("Overview");
  const [hostelOpen, setHostelOpen] = useState(() => new URLSearchParams(window.location.search).get("hostel") === "1");
  const school = schools[0];
  const toggleSaved = () => {
    setSaved((current) => {
      const next = !current;
      window.localStorage.setItem("eduspace-saved-nuyoma", String(next));
      return next;
    });
  };
  return (
    <AppFrame className="school-profile-screen">
      <AppTopBar title="School Profile" onBack={() => navigate("/region/oshikoto")} />
      <div className="school-profile-body">
        <div className="school-hero"><img src={school.image} alt="Classroom at Nuyoma Senior Secondary School" /><span className="hero-label">GOVERNMENT</span><button className={`hero-heart ${saved ? "saved" : ""}`} onClick={toggleSaved} aria-label={saved ? "Remove from saved" : "Save school"}><Heart size={17} fill={saved ? "currentColor" : "none"} /></button></div>
        <h2>{school.name}</h2><p className="school-location"><span>⌖</span> {school.region} · {school.location}</p>
        <div className="school-stat-grid"><button className="school-stat available" onClick={() => navigate("/availability")}><span>SPACES AVAILABLE</span><strong>84</strong><em>Check Seat Details →</em></button><button className="school-stat hostel" onClick={() => setHostelOpen(true)}><span>BOARDING STATUS</span><strong>Hostel</strong><em>View Hostel Stats →</em></button></div>
        <div className="school-tabs">{["Overview", "Academics"].map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>
        {tab === "Overview" ? <div className="school-copy"><h3>About the School</h3><p>{school.description}</p><h3>Our Mission</h3><p>To build young minds.</p><h3>Historical Profile</h3><p>The Best of the Best.</p></div> : <div className="academics-copy"><div><CircleGauge size={16} /><span><strong>Secondary education</strong><small>Grades 8–12</small></span></div><div><FileText size={16} /><span><strong>Curriculum</strong><small>National curriculum</small></span></div></div>}
      </div>
      {hostelOpen && <HostelSheet onClose={() => setHostelOpen(false)} />}
    </AppFrame>
  );
}

function HostelSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="sheet-layer" role="dialog" aria-modal="true" aria-labelledby="hostel-title">
      <button className="sheet-scrim" aria-label="Close hostel statistics" onClick={onClose} />
      <section className="hostel-sheet"><div className="sheet-heading"><h2 id="hostel-title">Hostel Statistics</h2><button onClick={onClose} aria-label="Close"><X size={16} /></button></div><div className="hostel-card boys"><strong>Boys Hostel</strong><div><span><small>Capacity</small><b>600</b></span><span><small>Enrolled</small><b>600</b></span><span><small>Available</small><b className="green">0</b></span></div></div><div className="hostel-card girls"><strong>Girls Hostel</strong><div><span><small>Capacity</small><b>600</b></span><span><small>Enrolled</small><b>600</b></span><span><small>Available</small><b className="green">0</b></span></div></div><button className="primary-button" onClick={onClose}>Close</button></section>
    </div>
  );
}

export function AvailabilityPage() {
  const [, navigate] = useLocation();
  const [expanded, setExpanded] = useState<string | null>(() => new URLSearchParams(window.location.search).get("grade") === "8" ? "Grade 8" : null);
  return (
    <AppFrame className="availability-screen">
      <AppTopBar title="Availability" onBack={() => navigate("/school/nuyoma")} />
      <div className="availability-body"><section className="allocation-card"><p>PLACEMENT SEAT ALLOCATION</p><div className="allocation-ring"><div><strong>82</strong><small>SPACES LEFT</small><em>86% full</em></div></div></section><div className="availability-summary"><div><strong>263</strong><small>CAPACITY</small></div><div><strong>181</strong><small>ENROLLED</small></div><div><strong className="mint-text">82</strong><small>AVAILABLE</small></div></div><section className="vacancies"><h2>🎓 Grade Vacancies Breakdown</h2>{vacancyRows.map((row) => <div className={`vacancy-row ${expanded === row.grade ? "expanded" : ""}`} key={row.grade}><button className="vacancy-head" onClick={() => setExpanded(expanded === row.grade ? null : row.grade)}><div><strong>{row.grade}</strong><small>{row.note}</small></div><span><em>{row.enrolled} spaces</em><ChevronDown size={12} /></span></button><div className="vacancy-progress"><i style={{ width: `${row.occupied}%` }} /></div><div className="vacancy-foot"><span>{row.enrolled} Enrolled</span><span>{row.occupied}% Occupied</span></div>{expanded === row.grade && <div className="stream-list">{row.streams.map((stream) => <div key={stream.name}><span><strong>{stream.name}</strong><small>{stream.capacity} seat capacity</small></span><span>{stream.enrolled} / {stream.capacity} Enrolled ({Math.round((stream.enrolled / stream.capacity) * 100)}%)</span></div>)}</div>}</div>)}</section></div>
    </AppFrame>
  );
}
