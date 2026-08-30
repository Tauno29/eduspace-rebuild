/* EduSpace recovery style: the new references define a four-slide onboarding sequence and a full 14-region Home grid with Tauno / TA profile identity. */

import { useState } from "react";
import { Bell, BookOpen, GraduationCap, Map, Search, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { AppFrame, EduMark } from "@/components/eduspace/Chrome";
import { RegionCard } from "@/components/eduspace/UI";
import { regions } from "@/data/eduspace";

const onboardingSlides = [
  { title: "Welcome to Edu Space", copy: "Your central gateway to the Namibian National School Placement Database. Find the perfect school for your child with ease.", icon: GraduationCap },
  { title: "Discover Schools", copy: "Search through hundreds of verified schools across all 14 regions of Namibia. Filter by type and availability.", icon: Search },
  { title: "Real-time Availability", copy: "Check available spaces and occupancy rates for any grade, directly synchronised with the Ministry.", icon: Map },
  { title: "Stay Notified", copy: "Receive instant push notifications when spaces open at your favourite schools or when placement changes.", icon: Bell },
];

export function OnboardingPage() {
  const [, navigate] = useLocation();
  const [slide, setSlide] = useState(0);
  const current = onboardingSlides[slide];
  const Icon = current.icon;
  const finishSlides = () => navigate("/setup");
  return (
    <AppFrame withNav={false} className="onboarding-frame">
      <button className="skip-button" onClick={finishSlides}>Skip</button>
      <section className="onboarding-content">
        <div className="onboarding-mark"><Icon size={42} strokeWidth={1.8} /></div>
        <div className="onboarding-copy"><h1>{current.title}</h1><p>{current.copy}</p></div>
        <div className="onboarding-dots" aria-label={`Slide ${slide + 1} of ${onboardingSlides.length}`}>{onboardingSlides.map((_, index) => <span className={index === slide ? "active" : ""} key={index} />)}</div>
      </section>
      <button className="primary-button onboarding-continue" onClick={() => slide < onboardingSlides.length - 1 ? setSlide(slide + 1) : finishSlides()}>{slide === onboardingSlides.length - 1 ? "Get Started" : "Continue"} <span>→</span></button>
    </AppFrame>
  );
}

export default function HomePage() {
  const [, navigate] = useLocation();
  const [userName] = useState(() => window.localStorage.getItem("eduspace-user-name") || "Tauno");
  return (
    <AppFrame className="home-screen">
      <div className="home-header"><EduMark /><div className="home-header-actions"><button className="circle-button" onClick={() => navigate("/alerts")} aria-label="Open alerts"><Bell size={15} /></button><button className="avatar-button" onClick={() => navigate("/profile")} aria-label="Open profile">TA</button></div></div>
      <button className="home-search" onClick={() => navigate("/search")}><Search size={15} strokeWidth={1.8} /><span>Search schools, towns or regions...</span></button>
      <section className="greeting-block"><div><p className="eyebrow">Good evening</p><h1>{userName}</h1><p>Find the perfect school for your child anywhere in Namibia.</p></div><div className="greeting-emoji"><span>😀</span><Sparkles size={12} /></div></section>
      <section className="region-section"><div className="section-heading-row"><h2>Explore by region</h2><button onClick={() => navigate("/regions")}>View all <span>→</span></button></div><div className="region-grid">{regions.map((region) => <RegionCard key={region.id} {...region} onClick={() => navigate(`/region/${region.id}`)} />)}</div></section>
    </AppFrame>
  );
}
