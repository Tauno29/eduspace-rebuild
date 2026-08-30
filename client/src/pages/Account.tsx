/* EduSpace live-data style: account screens never invent saved records; favorites and counts derive from the configured school source and persisted user actions. */

import { useState } from "react";
import { Bell, CircleHelp, Settings2, Bookmark } from "lucide-react";
import { useLocation } from "wouter";
import { AppFrame } from "@/components/eduspace/Chrome";
import { DataNotice, EmptyState, Pill, SchoolListCard, SearchField, SectionLabel, ToneIcon } from "@/components/eduspace/UI";
import { useProfile } from "@/contexts/ProfileContext";
import { useEduSpaceData } from "@/contexts/DataContext";

function isSaved(id: string) {
  return window.localStorage.getItem(`eduspace-saved-${id}`) === "true";
}

export function SavedPage() {
  const [, navigate] = useLocation();
  const { status, data, reload } = useEduSpaceData();
  const [revision, setRevision] = useState(0);
  const [query, setQuery] = useState("");
  if (status !== "ready" || !data) return <AppFrame className="saved-screen"><DataNotice onRetry={reload} title={status === "loading" ? "Loading saved schools" : "Live school data required"} copy={status === "loading" ? "Fetching your saved schools from the configured source." : "Saved schools cannot be resolved until an authoritative EduSpace data source is configured."} /></AppFrame>;
  const savedSchools = data.schools.filter((school) => isSaved(school.id) && school.name.toLowerCase().includes(query.toLowerCase()));
  return <AppFrame className="saved-screen"><div className="page-intro"><h1>Saved</h1><p>Quick access to your favourite<br />schools.</p></div><SearchField placeholder="Search saved schools or regions..." value={query} onChange={setQuery} trailing />{savedSchools.map((school) => <SchoolListCard key={school.id} name={school.name} region={school.region} location={school.location} spaces={school.spaces} image={school.image} saved onOpen={() => navigate(`/school/${school.id}`)} onToggleSaved={() => { window.localStorage.setItem(`eduspace-saved-${school.id}`, "false"); setRevision((current) => current + 1); }} />)}{!savedSchools.length && <div className="saved-empty"><div className="saved-empty-icon"><Bookmark size={18} /></div><strong>No saved schools yet</strong><small>Save a school from its profile to find it here.</small><button onClick={() => navigate("/search")}>Browse schools <span>→</span></button></div>}{revision < 0 && null}</AppFrame>;
}

export function AlertsPage() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState("All");
  const tabs = ["All", "Updates", "Reminders", "Announcements"];
  return <AppFrame className="alerts-screen"><div className="account-top-row"><div className="page-intro"><h1>Alerts</h1><p>Stay informed about schools you're interested in.</p></div><button className="circle-button alert-circle" aria-label="Notifications"><Bell size={16} /></button></div><SearchField placeholder="Search notifications..." trailing /><div className="alert-tabs">{tabs.map((item) => <Pill key={item} active={tab === item} onClick={() => setTab(item)}>{item}</Pill>)}</div><EmptyState icon={<Bell size={24} fill="currentColor" />} title="You're all caught up!" copy="We'll notify you when schools you've saved have updates or new admission opportunities." action="Browse Schools" onAction={() => navigate("/search")} /></AppFrame>;
}

export function ProfilePage() {
  const [, navigate] = useLocation();
  const { profile } = useProfile();
  const { data } = useEduSpaceData();
  const savedCount = data?.schools.filter((school) => isSaved(school.id)).length ?? 0;
  return <AppFrame className="profile-screen"><div className="page-intro"><h1>Profile</h1><p>Manage your account and preferences.</p></div><button className="profile-card" onClick={() => navigate("/personal-info")}><div className="profile-avatar">{(profile.name || "TA").slice(0, 2).toUpperCase()}</div><div><strong>{profile.name || "Your name"}</strong><span>Parent</span><small><span className="tiny-pin">⌖</span> {profile.region || "Region not set"}, {profile.town || "Town not set"}</small></div></button><div className="profile-shortcuts"><button onClick={() => navigate("/personal-info")}><ToneIcon tone="lilac" kind="user" /><strong>Personal Info</strong><small>Manage details</small><b>3</b></button><button onClick={() => navigate("/saved")}><ToneIcon tone="pink" kind="pin" /><strong>Favourites</strong><small>Saved schools</small><b>{savedCount}</b></button></div><SectionLabel>Your activity</SectionLabel><section className="activity-card"><div><strong>{savedCount}</strong><small>Saved</small></div><div><strong>0</strong><small>Viewed</small></div></section><SectionLabel>Support & more</SectionLabel><div className="support-list"><button onClick={() => navigate("/support")}><span className="support-icon"><CircleHelp size={13} /></span><span><strong>Help &amp; Support</strong><small>Get answers and assistance</small></span><span>›</span></button><button onClick={() => navigate("/about")}><span className="support-icon"><Settings2 size={13} /></span><span><strong>About Edu Space</strong><small>Version and app information</small></span><span>›</span></button><button onClick={() => navigate("/privacy")}><span className="support-icon"><CircleHelp size={13} /></span><span><strong>Privacy Policy</strong><small>Data and security information</small></span><span>›</span></button></div></AppFrame>;
}
