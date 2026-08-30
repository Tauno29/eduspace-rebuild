/* EduSpace recovery style: small rounded cards, low-contrast depth, compact typography, and vivid indigo/mint state colors mirror the supplied screens. */

import { ReactNode } from "react";
import { Search, SlidersHorizontal, ChevronDown, Heart, MapPin, Trophy, House, BookOpen, Bell, UserRound } from "lucide-react";

export function SearchField({ placeholder, value, onChange, trailing = false }: { placeholder: string; value?: string; onChange?: (value: string) => void; trailing?: boolean }) {
  return (
    <label className="search-field">
      <Search size={15} strokeWidth={1.9} />
      <input value={value} onChange={(event) => onChange?.(event.target.value)} placeholder={placeholder} aria-label={placeholder} />
      {trailing && <SlidersHorizontal size={14} className="search-trailing" strokeWidth={1.7} />}
    </label>
  );
}

export function Pill({ children, active = false, onClick, className = "" }: { children: ReactNode; active?: boolean; onClick?: () => void; className?: string }) {
  return <button className={`filter-pill ${active ? "active" : ""} ${className}`} onClick={onClick}>{children}</button>;
}

export function FilterSelect({ label, value = label, onClick }: { label: string; value?: string; onClick?: () => void }) {
  return (
    <button className="filter-select" onClick={onClick}>
      <span>{value}</span>
      <ChevronDown size={12} strokeWidth={1.7} />
    </button>
  );
}

const TONE_ICONS: Record<string, ReactNode> = {
  blue: <MapPin size={14} />,
  lilac: <House size={14} />,
  violet: <Trophy size={14} />,
  mint: <BookOpen size={14} />,
  yellow: <BookOpen size={14} />,
};

export function ToneIcon({ tone = "lilac", kind }: { tone?: string; kind?: "pin" | "trophy" | "house" | "book" | "bell" | "user" }) {
  const icon = kind === "pin" ? <MapPin size={15} /> : kind === "trophy" ? <Trophy size={15} /> : kind === "house" ? <House size={15} /> : kind === "book" ? <BookOpen size={15} /> : kind === "bell" ? <Bell size={15} /> : kind === "user" ? <UserRound size={15} /> : TONE_ICONS[tone] ?? <House size={14} />;
  return <span className={`tone-icon tone-${tone}`}>{icon}</span>;
}

export function RegionCard({ name, schools, available, icon, tone, onClick }: { name: string; schools: number; available: number; icon: string; tone: string; onClick: () => void }) {
  return (
    <button className="region-card" onClick={onClick}>
      <div className={`region-symbol region-symbol-${tone}`}>{icon}</div>
      <span className="availability-badge">{available}%</span>
      <strong>{name}</strong>
      <small>{schools} Schools</small>
      <span className="explore-link">Explore <span>→</span></span>
    </button>
  );
}

export function SchoolThumb({ src, alt }: { src: string; alt: string }) {
  return <img className="school-thumb" src={src} alt={alt} />;
}

export function SchoolListCard({ name, region, location, spaces, image, saved, onOpen, onToggleSaved }: { name: string; region: string; location: string; spaces: number; image: string; saved: boolean; onOpen: () => void; onToggleSaved: () => void }) {
  return (
    <div className="school-list-card">
      <button className="school-list-main" onClick={onOpen}>
        <SchoolThumb src={image} alt="" />
        <span className="school-list-copy">
          <strong>{name}</strong>
          <small>{region} - {location}</small>
          <span className="school-list-meta"><em>{spaces} available</em><span>Secondary</span></span>
        </span>
      </button>
      <button className={`heart-button ${saved ? "saved" : ""}`} onClick={onToggleSaved} aria-label={saved ? "Remove from saved" : "Save school"}>
        <Heart size={15} fill={saved ? "currentColor" : "none"} strokeWidth={1.9} />
      </button>
    </div>
  );
}

export function EmptyState({ icon, title, copy, action, onAction }: { icon: ReactNode; title: string; copy: string; action?: string; onAction?: () => void }) {
  return (
    <section className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{copy}</p>
      {action && <button className="primary-button empty-action" onClick={onAction}>{action}</button>}
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}
