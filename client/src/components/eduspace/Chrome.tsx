/* EduSpace recovery style: preserve the pale lavender portrait stage, rounded white dock, and indigo selected navigation treatment from the references. */

import { useLocation } from "wouter";
import {
  Bell,
  Heart,
  House,
  Search,
  UserRound,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { ReactNode } from "react";

const NAV_ITEMS = [
  { label: "Home", path: "/home", icon: House },
  { label: "Search", path: "/search", icon: Search },
  { label: "Saved", path: "/saved", icon: Heart },
  { label: "Alerts", path: "/alerts", icon: Bell },
  { label: "Profile", path: "/profile", icon: UserRound },
];

export function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <span>6:31</span>
      <span className="status-icons"><span className="status-signal" /><span className="status-battery" /></span>
    </div>
  );
}

export function EduMark({ size = "small" }: { size?: "small" | "large" }) {
  return (
    <div className={`edu-mark edu-mark-${size}`}>
      <img src="/manus-storage/eduspace-mark_c98b53c4.png" alt="" />
      <div className="edu-wordmark">
        <span>Edu Space</span>
        <small>NAMIBIA</small>
      </div>
    </div>
  );
}

export function AppTopBar({ title, onBack, right }: { title: string; onBack?: () => void; right?: ReactNode }) {
  return (
    <div className="app-topbar">
      <button className="icon-button topbar-back" onClick={onBack} aria-label="Go back">
        <ArrowLeft size={16} strokeWidth={1.8} />
      </button>
      <h1>{title}</h1>
      <div className="topbar-right">{right ?? <span className="topbar-spacer" />}</div>
    </div>
  );
}

export function BottomNav() {
  const [location, navigate] = useLocation();
  const active = location === "/" ? "/home" : location;
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
        const isActive = active === path || (path === "/home" && (active === "/regions" || active.startsWith("/region/") || active.startsWith("/school/") || active === "/availability"));
        return (
          <button
            key={path}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
            onClick={() => navigate(path)}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="nav-icon-wrap"><Icon size={15} strokeWidth={isActive ? 2.3 : 1.6} /></span>
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function AppFrame({ children, withNav = true, className = "" }: { children: ReactNode; withNav?: boolean; className?: string }) {
  return (
    <main className={`device-frame ${withNav ? "has-bottom-nav" : ""} ${className}`}>
      <StatusBar />
      <div className="screen-content">{children}</div>
      {withNav && <BottomNav />}
    </main>
  );
}

export function BackLink({ onClick, label = "Back" }: { onClick: () => void; label?: string }) {
  return (
    <button className="back-link" onClick={onClick}>
      <ArrowLeft size={15} />
      <span>{label}</span>
    </button>
  );
}

export function ListChevron() {
  return <ChevronRight size={16} className="list-chevron" strokeWidth={1.7} />;
}
