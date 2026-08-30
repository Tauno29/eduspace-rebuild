/* EduSpace recovery style: screenshot-faithful onboarding and home surfaces, with portrait-first spacing and the original lavender/white/indigo visual hierarchy. */

import { useState } from "react";
import { Bell, Search, Smile, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { AppFrame, EduMark } from "@/components/eduspace/Chrome";
import { RegionCard, SearchField } from "@/components/eduspace/UI";
import { regions } from "@/data/eduspace";

export function OnboardingPage() {
  const [, navigate] = useLocation();
  const finish = () => {
    window.localStorage.setItem("eduspace-onboarded", "true");
    navigate("/home");
  };
  return (
    <AppFrame withNav={false} className="onboarding-frame">
      <div className="onboarding-background" />
      <button className="skip-button" onClick={finish}>Skip</button>
      <section className="onboarding-content">
        <div className="onboarding-mark"><img src="/manus-storage/eduspace-mark_c98b53c4.png" alt="Edu Space" /></div>
        <div className="onboarding-copy">
          <h1>Welcome to Edu Space</h1>
          <p>Your central gateway to the Namibian National School Placement Database. Find the perfect school for your child with ease.</p>
        </div>
        <div className="onboarding-dots" aria-label="Slide 1 of 4"><span className="active" /><span /><span /><span /></div>
      </section>
      <button className="primary-button onboarding-continue" onClick={finish}>Continue <span>→</span></button>
    </AppFrame>
  );
}

export default function HomePage() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const homeRegions = regions.slice(0, 4);
  return (
    <AppFrame className="home-screen">
      <div className="home-header">
        <EduMark />
        <div className="home-header-actions">
          <button className="circle-button" onClick={() => navigate("/alerts")} aria-label="Open alerts"><Bell size={15} /></button>
          <button className="avatar-button" onClick={() => navigate("/profile")} aria-label="Open profile">TT</button>
        </div>
      </div>
      <button className="home-search" onClick={() => navigate("/search")}>
        <Search size={15} strokeWidth={1.8} />
        <span>{query || "Search schools, towns or regions..."}</span>
      </button>
      <section className="greeting-block">
        <div>
          <p className="eyebrow">Good evening</p>
          <h1>tt</h1>
          <p>Find the perfect school for your child anywhere in Namibia.</p>
        </div>
        <div className="greeting-emoji"><Smile size={34} strokeWidth={1.4} /><Sparkles size={12} /></div>
      </section>
      <section className="region-section">
        <div className="section-heading-row"><h2>Explore by region</h2><button onClick={() => navigate("/regions")}>View all <span>→</span></button></div>
        <div className="region-grid">
          {homeRegions.map((region) => <RegionCard key={region.id} {...region} onClick={() => navigate(`/region/${region.id}`)} />)}
        </div>
      </section>
    </AppFrame>
  );
}
