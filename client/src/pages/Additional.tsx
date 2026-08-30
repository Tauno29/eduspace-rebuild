/* EduSpace recovery style: these support/account screens follow the newly supplied references with large rounded surfaces, quiet lavender canvas, and indigo action controls. */

import { useState } from "react";
import { ChevronDown, ChevronLeft, CircleHelp, Mail, Phone, Save, ShieldCheck, GraduationCap, UserRound } from "lucide-react";
import { useLocation } from "wouter";
import { AppFrame, AppTopBar } from "@/components/eduspace/Chrome";

export function ProfileSetupPage() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const start = () => {
    if (!name.trim()) return;
    window.localStorage.setItem("eduspace-user-name", name.trim());
    window.localStorage.setItem("eduspace-onboarded", "true");
    navigate("/home");
  };
  return (
    <AppFrame withNav={false} className="setup-screen">
      <div className="setup-card">
        <div className="setup-illustration"><span>👋</span></div>
        <h1>Set up your profile</h1>
        <p>Personalise your Edu Space experience.</p>
        <label className="form-label" htmlFor="setup-name">Your full name <em>*</em></label>
        <input id="setup-name" className="large-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Maria Amutenya" />
        <button className="primary-button setup-start" disabled={!name.trim()} onClick={start}>Start using Edu Space <span>✨</span></button>
        <button className="back-to-slides" onClick={() => navigate("/")}>← Back to slides</button>
      </div>
    </AppFrame>
  );
}

export function PersonalInfoPage() {
  const [, navigate] = useLocation();
  const [name, setName] = useState(() => window.localStorage.getItem("eduspace-user-name") || "Tauno");
  const [region, setRegion] = useState("Khomas Region");
  const [town, setTown] = useState("Windhoek");
  const save = () => {
    window.localStorage.setItem("eduspace-user-name", name);
    window.localStorage.setItem("eduspace-user-region", region);
    window.localStorage.setItem("eduspace-user-town", town);
    navigate("/profile");
  };
  return (
    <AppFrame className="personal-info-screen">
      <AppTopBar title="Personal Information" onBack={() => navigate("/profile")} />
      <div className="personal-info-body"><div className="personal-avatar">TA</div><label className="form-label" htmlFor="full-name">Full name</label><input id="full-name" className="large-input" value={name} onChange={(event) => setName(event.target.value)} /><label className="form-label" htmlFor="region-name">Region</label><input id="region-name" className="large-input" value={region} onChange={(event) => setRegion(event.target.value)} /><label className="form-label" htmlFor="town-name">Town</label><input id="town-name" className="large-input" value={town} onChange={(event) => setTown(event.target.value)} /><button className="primary-button save-info-button" onClick={save}>Save Changes <Save size={16} /></button></div>
    </AppFrame>
  );
}

export function AboutPage() {
  const [, navigate] = useLocation();
  return (
    <AppFrame className="about-screen">
      <AppTopBar title="About Edu Space" onBack={() => navigate("/profile")} />
      <div className="about-body"><div className="about-icon"><GraduationCap size={27} /></div><h1>Edu Space</h1><div className="about-namibia">NAMIBIA</div><div className="about-divider" /><strong>Version 1.0.0 (Build 842)</strong><p>A namibian school statistical displaying app made by Mr.Tauno Nakasole . built to ensure equitable access to educational resources across all 14 regions of the Republic Of Namibia</p><small>2026 EDU SPACE</small></div>
    </AppFrame>
  );
}

const FAQS = [
  { question: "Why does a school show '0 Available Spaces'?", answer: "This means the school has reached its maximum enrollment capacity for that specific grade based on real-time data from the Ministry's database." },
  { question: "How do I change my default Region?", answer: "You can change your default region in the 'Personal Information' section under the Profile tab." },
  { question: "Are the statistics real-time?", answer: "Yes, Edu Space synchronizes directly with the Namibia National School Placement Database to provide the most up-to-date capacity metrics." },
];

export function HelpSupportPage() {
  const [, navigate] = useLocation();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <AppFrame className="support-screen">
      <AppTopBar title="Help & Support" onBack={() => navigate("/profile")} />
      <div className="support-body"><div className="support-contact-grid"><a className="support-contact call" href="tel:0817851924"><Phone size={22} /><strong>Call Support</strong><span>0817851924</span></a><a className="support-contact email" href="mailto:taunonakasole4@gmail.com"><Mail size={22} /><strong>Email Us</strong><span>taunonakasole4@gmail.com</span></a></div><h1>Frequently Asked Questions</h1><div className="faq-list">{FAQS.map((faq, index) => <div className={`faq-item ${open === index ? "open" : ""}`} key={faq.question}><button onClick={() => setOpen(open === index ? null : index)}><strong>{faq.question}</strong>{open === index ? <ChevronDown size={16} className="faq-chevron open-chevron" /> : <ChevronDown size={16} className="faq-chevron" />}</button>{open === index && <p>{faq.answer}</p>}</div>)}</div></div>
    </AppFrame>
  );
}

export function PrivacyPage() {
  const [, navigate] = useLocation();
  return (
    <AppFrame className="privacy-screen">
      <AppTopBar title="Privacy Policy" onBack={() => navigate("/profile")} />
      <div className="privacy-body"><ShieldCheck size={32} className="privacy-icon" /><h1>Privacy Policy</h1><div className="last-updated">LAST UPDATED: JULY 2026</div><PrivacySection title="1. Data Collection">Edu Space collects basic profile information (such as your name and region) to personalize your school search experience. Application data is securely transmitted directly to the Ministry's central database.</PrivacySection><PrivacySection title="2. Data Usage">Your data is solely used for facilitating school placements and generating anonymous aggregate statistics for the Ministry of Education, Arts and Culture. We do not sell your data to third parties.</PrivacySection><PrivacySection title="3. Security">All data transmitted between the Edu Space application and the Ministry's servers is encrypted using industry-standard protocols. Your profile information is stored securely.</PrivacySection><PrivacySection title="4. Your Rights">You have the right to request the deletion of your account and associated placement applications. Contact support through the Help &amp; Support page to initiate this process.</PrivacySection></div>
    </AppFrame>
  );
}

function PrivacySection({ title, children }: { title: string; children: string }) {
  return <section className="privacy-section"><h2>{title}</h2><p>{children}</p></section>;
}
