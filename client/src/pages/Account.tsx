/* EduSpace recovery style: match the reference account screens with quiet lavender canvas, raised white cards, tiny metadata, and indigo active controls. */

import { useState } from "react";
import { Bell, Heart, UserRound, CircleHelp, Settings2, Bookmark, Eye, Search } from "lucide-react";
import { useLocation } from "wouter";
import { AppFrame } from "@/components/eduspace/Chrome";
import { EmptyState, Pill, SchoolListCard, SearchField, SectionLabel, ToneIcon } from "@/components/eduspace/UI";
import { schools } from "@/data/eduspace";

function useSavedSchool() {
  const [saved, setSaved] = useState(() => window.localStorage.getItem("eduspace-saved-nuyoma") !== "false");
  const toggle = () => setSaved((current) => {
    const next = !current;
    window.localStorage.setItem("eduspace-saved-nuyoma", String(next));
    return next;
  });
  return [saved, toggle] as const;
}

export function SavedPage() {
  const [, navigate] = useLocation();
  const [saved, toggleSaved] = useSavedSchool();
  const [query, setQuery] = useState("");
  return (
    <AppFrame className="saved-screen">
      <div className="page-intro"><h1>Saved</h1><p>Quick access to your favourite<br />schools.</p></div>
      <SearchField placeholder="Search saved schools or regions..." value={query} onChange={setQuery} trailing />
      {saved && <SchoolListCard name={schools[0].name} region={schools[0].region} location={schools[0].location} spaces={schools[0].spaces} image={schools[0].image} saved={saved} onOpen={() => navigate("/school/nuyoma")} onToggleSaved={toggleSaved} />}
      {!saved && <div className="saved-empty"><div className="saved-empty-icon"><Bookmark size={18} /></div><strong>No saved schools yet</strong><small>Tap the heart on a school to find it here.</small><button onClick={() => navigate("/search")}>Browse schools <span>→</span></button></div>}
    </AppFrame>
  );
}

export function AlertsPage() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState("All");
  const tabs = ["All", "Updates", "Reminders", "Announcements"];
  return (
    <AppFrame className="alerts-screen">
      <div className="account-top-row"><div className="page-intro"><h1>Alerts</h1><p>Stay informed about schools you're interested in.</p></div><button className="circle-button alert-circle" aria-label="Notifications"><Bell size={16} /></button></div>
      <SearchField placeholder="Search notifications..." trailing />
      <div className="alert-tabs">{tabs.map((item) => <Pill key={item} active={tab === item} onClick={() => setTab(item)}>{item}</Pill>)}</div>
      <EmptyState icon={<Bell size={24} fill="currentColor" />} title="You're all caught up!" copy="We'll notify you when schools you've saved have updates or new admission opportunities." action="Browse Schools" onAction={() => navigate("/search")} />
    </AppFrame>
  );
}

export function ProfilePage() {
  const [, navigate] = useLocation();
  const [saved] = useSavedSchool();
  return (
    <AppFrame className="profile-screen">
      <div className="page-intro"><h1>Profile</h1><p>Manage your account and preferences.</p></div>
      <section className="profile-card"><div className="profile-avatar">T</div><div><strong>tt</strong><span>Parent</span><small><span className="tiny-pin">⌖</span> Khomas Region, Windhoek</small></div></section>
      <div className="profile-shortcuts"><button onClick={() => undefined}><ToneIcon tone="lilac" kind="user" /><strong>Personal Info</strong><small>Manage details</small><b>3</b></button><button onClick={() => navigate("/saved")}><ToneIcon tone="pink" kind="pin" /><strong>Favourites</strong><small>Saved schools</small><b>{saved ? 1 : 0}</b></button></div>
      <SectionLabel>Your activity</SectionLabel>
      <section className="activity-card"><div><strong>{saved ? 1 : 0}</strong><small>Saved</small></div><div><strong>1</strong><small>Viewed</small></div></section>
      <SectionLabel>Support & more</SectionLabel>
      <div className="support-list"><button><span className="support-icon"><CircleHelp size={13} /></span><span><strong>Help &amp; Support</strong><small>Get answers and assistance</small></span><span>›</span></button><button><span className="support-icon"><Settings2 size={13} /></span><span><strong>Preferences</strong><small>Notifications and app settings</small></span><span>›</span></button></div>
    </AppFrame>
  );
}
