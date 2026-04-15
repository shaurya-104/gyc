/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";

const COMMITTEES = [
  { abbr: "UNGA", name: "United Nations General Assembly", description: "The ultimate forum for all 193 UN member states. Step into the shoes of global diplomats to tackle peace, security, and human rights. Every nation gets one vote—make yours count.", agenda: "Cross Border Terrorism and Strengthening", color: "#2563EB", icon: "🌐" },
  { abbr: "UNSC", name: "United Nations Security Council", description: "The heavyweight room. 15 member nations, 5 permanent vetoes. You'll be dealing with global crises, imposing sanctions, and authorizing peacekeeping missions under extreme pressure.", agenda: "Comprehensive Weapon Disarmament and Non-Proliferation", color: "#DC2626", icon: "🛡️" },
  { abbr: "UNHRC", name: "UN Human Rights Council", description: "The frontline for global equality and justice. Address severe human rights violations, navigate ethical gray areas, and draft recommendations that protect human dignity worldwide.", agenda: "Safeguarding Data Privacy and Data Protection as a Fundamental Right", color: "#0D9488", icon: "⚖️" },
  { abbr: "AIPPM", name: "All India Political Parties Meet", description: "Step away from the UN and into Indian politics. Representatives from across the political spectrum clash over pressing national issues. It gets loud, it gets heated, and consensus is everything.", agenda: "Religious Intolerance and Secularism", color: "#D97706", icon: "🏛️" },
  { abbr: "Lok Sabha", name: "Lok Sabha Simulation", description: "Experience the absolute chaos and brilliance of India's parliamentary system. Draft bills, debate national policies, and master the art of legislative negotiation.", agenda: "Review of 12 Years of NDA Government", color: "#7C3AED", icon: "📜" },
  { abbr: "RYS", name: "Rashtriya Yuva Sansad", description: "The youth parliament. This is where young voices take the mic to debate national policy and shape the future. Pure grassroots democracy in action.", agenda: "The Role of Youth in Viksit Bharat 2047", color: "#16A34A", icon: "🇮🇳" },
  { abbr: "Int'l Press", name: "International Press", description: "The journalists who hold the committees accountable. You'll be covering the debates, analyzing the flaws in resolutions, and publishing the breaking news that shapes the narrative.", agenda: "Simulating Real-World Journalism Across All Committees", color: "#475569", icon: "📰" },
  { abbr: "Dhurandhar", name: "Dhurandhar Committee", description: "A unique, specialized committee. Details are currently highly classified.", agenda: "Revealing soon...", color: "#E11D48", icon: "⏳" },
];

const FEES = [
  { label: "Standard Delegate", price: "₹2,499", note: "per delegate" },
  { label: "Early Bird", price: "₹1,999", note: "until 30 March 2026", highlight: true },
  { label: "Delegation (5+)", price: "₹1,799", note: "per delegation" },
  { label: "International Press", price: "₹1,599", note: "per journalist" },
  { label: "Rashtriya Yuva Sansad", price: "₹999", note: "per delegate" },
];

const COLLABORATORS = [
  { name: "Panjab University", short: "PU", logo: "/logos/panjab-university.png" },
  { name: "Commonwealth Youth Council", short: "CYC", logo: "/logos/cyc.png" },
  { name: "G20 India", short: "G20", logo: "/logos/g20.png" },
  { name: "Y20 India", short: "Y20", logo: "/logos/y20.png" },
  { name: "Global Shapers Community", short: "GSC", logo: "/logos/global-shapers.png" },
  { name: "Saviṣkār", short: "SVK", logo: "/logos/savishkar.png" },
  { name: "AAYA", short: "AAYA", logo: "/logos/aaya.png" },
  { name: "Young Sapiens", short: "YS", logo: "/logos/young-sapiens.png" },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function CountdownTimer() {
  const target = new Date("2026-04-24T09:00:00+05:30").getTime();
  const [diff, setDiff] = useState(0); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDiff(target - Date.now());
    const id = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!mounted) {
    return <div style={{ height: "60px" }}></div>;
  }

  const d = Math.max(0, Math.floor(diff / 86400000));
  const h = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000));
  const s = Math.max(0, Math.floor((diff % 60000) / 1000));
  const units = [{ v: d, l: "Days" }, { v: h, l: "Hours" }, { v: m, l: "Min" }, { v: s, l: "Sec" }];
  
  return (
    <div style={{ display: "flex", gap: "clamp(12px, 3vw, 24px)", justifyContent: "center" }}>
      {units.map(({ v, l }) => (
        <div key={l} style={{ textAlign: "center", minWidth: "clamp(52px, 12vw, 70px)" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 6vw, 3.5rem)", fontWeight: 700, color: "#1E3A8A", lineHeight: 1 }}>
            {String(v).padStart(2, "0")}
          </div>
          <div style={{ fontSize: "clamp(0.55rem, 1.5vw, 0.65rem)", letterSpacing: "0.15em", color: "#64748B", marginTop: "4px", textTransform: "uppercase", fontWeight: 600 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function AnimatedSection({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [activeCommittee, setActiveCommittee] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { 
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0); 
    }
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const c = COMMITTEES[activeCommittee];

  return (
    <main style={{ background: "#FFFFFF", color: "#0F172A", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        
        ::selection { background: rgba(37,99,235,0.2); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F8FAFC; }
        ::-webkit-scrollbar-thumb { background: #94A3B8; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #64748B; }

        .nav-link { color: #64748B; text-decoration: none; font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; transition: color 0.2s; font-weight: 600; }
        .nav-link:hover { color: #2563EB; }

        .blue-btn { background: linear-gradient(135deg, #1E3A8A, #3B82F6, #1E3A8A); background-size: 200%; color: #FFFFFF; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 14px 36px; border: none; cursor: pointer; transition: background-position 0.4s, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s; text-decoration: none; display: inline-block; border-radius: 4px; }
        .blue-btn:hover { background-position: right center; transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 25px rgba(37,99,235,0.3); }

        .ghost-btn { background: transparent; color: #2563EB; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 13px 35px; border: 2px solid rgba(37,99,235,0.3); cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-decoration: none; display: inline-block; border-radius: 4px; }
        .ghost-btn:hover { border-color: #2563EB; background: rgba(37,99,235,0.05); transform: translateY(-3px) scale(1.02); }

        /* NEW FORMAL PRIZE BADGE */
        .prize-badge { display: inline-flex; align-items: center; gap: 10px; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 8px 24px; border-radius: 6px; color: #475569; font-weight: 600; font-size: 0.8rem; margin-bottom: 32px; text-decoration: none; box-shadow: 0 2px 6px rgba(0,0,0,0.02); font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.2s ease; cursor: pointer; position: relative; z-index: 10; }
        .prize-badge:hover { border-color: #93C5FD; box-shadow: 0 8px 20px rgba(37,99,235,0.08); color: #2563EB; transform: translateY(-2px); }

        .teaser-card { transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease; background: #FFFFFF; }
        .teaser-card:hover { transform: translateY(-8px) rotate(1deg); box-shadow: 0 25px 50px rgba(0,0,0,0.08); }
        .teaser-card:hover .arrow { transform: translateX(5px); }

        .committee-tab { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 14px 20px; border-left: 3px solid transparent; width: 100%; text-align: left; transition: all 0.2s; color: #64748B; font-family: 'DM Sans', sans-serif; border-radius: 0 8px 8px 0; }
        .committee-tab:hover { color: #0F172A; background: rgba(15,23,42,0.02); }
        .committee-tab.active { color: #2563EB; border-left-color: #2563EB; background: rgba(37,99,235,0.06); font-weight: 600; }

        .committee-chip { background: #FFFFFF; border: 1px solid #E2E8F0; padding: 10px 18px; border-radius: 40px; cursor: pointer; font-size: 0.85rem; font-weight: 600; color: #64748B; transition: all 0.2s; white-space: nowrap; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; gap: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .committee-chip.active { color: #FFFFFF; border-color: #2563EB; background: #2563EB; box-shadow: 0 4px 10px rgba(37,99,235,0.2); }

        .fee-card { background: #FFFFFF; border: 1px solid #E2E8F0; padding: 22px 26px; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
        .fee-card:hover { border-color: #93C5FD; box-shadow: 0 12px 30px rgba(37,99,235,0.08); transform: translateY(-4px) rotate(-0.5deg); }
        .fee-card.highlight { border: 2px solid #3B82F6; background: #F0F9FF; }

        .collab-badge { display: flex; align-items: center; gap: 8px; padding: 12px 20px; border: 1px solid #E2E8F0; background: #FFFFFF; border-radius: 8px; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: default; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .collab-badge:hover { border-color: #93C5FD; box-shadow: 0 10px 25px rgba(37,99,235,0.08); transform: translateY(-4px) scale(1.05); }

        .divider-line { width: 60px; height: 3px; background: linear-gradient(90deg, #2563EB, #93C5FD); margin: 16px 0 24px; border-radius: 2px; }

        .tag { display: inline-block; font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #2563EB; border: 1px solid rgba(37,99,235,0.2); background: rgba(37,99,235,0.05); padding: 6px 14px; margin-bottom: 20px; border-radius: 40px; font-weight: 600; }

        .particle { position: absolute; border-radius: 50%; animation: floatup linear infinite; }
        @keyframes floatup { from { transform: translateY(0px) rotate(0deg); opacity: 0.6; } 50% { opacity: 0.2; } to { transform: translateY(-100vh) rotate(720deg); opacity: 0; } }

        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%); }

        .contact-link { color: #475569; text-decoration: none; font-size: 0.85rem; transition: color 0.2s; font-weight: 500; }
        .contact-link:hover { color: #2563EB; }

        .mobile-menu { position: fixed; inset: 0; top: 70px; background: rgba(255,255,255,0.98); backdrop-filter: blur(20px); z-index: 99; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; border-top: 1px solid #E2E8F0; }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .fees-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .hero-btns { flex-direction: column; align-items: center; }
          .hero-btns a { width: 100%; text-align: center; }
          .countdown-box { padding: 20px 16px !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .fees-grid { grid-template-columns: 1fr 1fr; }
          .about-grid { grid-template-columns: 1fr 1fr; }
          .contact-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(16px, 4vw, 40px)", height: "70px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled || menuOpen ? "rgba(255,255,255,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid #E2E8F0" : "1px solid transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.03)" : "none",
        transition: "all 0.3s ease",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img 
            src="/gyc-logo.png" 
            alt="GYC" 
            style={{ width: "36px", height: "36px", objectFit: "contain", flexShrink: 0 }} 
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }} 
          />
          <span style={{ display: "none", width: "36px", height: "36px", alignItems: "center", justifyContent: "center", background: "rgba(37,99,235,0.1)", borderRadius: "8px", fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", fontWeight: 700, color: "#2563EB", letterSpacing: "0.05em" }}>
            GYC
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", letterSpacing: "0.05em", color: "#0F172A", fontWeight: 700 }}>
            GYC <span style={{ color: "#2563EB" }}>2.0</span>
          </span>
        </a>

        <div className="hide-mobile" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          <a href="/#about" className="nav-link">About</a>
          <a href="/#committees" className="nav-link">Committees</a>
          <a href="/#fees" className="nav-link">Fees</a>
          <a href="/gallery" className="nav-link">Gallery</a>
          <a href="/tech-events" className="nav-link">Tech Events</a>
          <a href="/speakers" className="nav-link">Speakers</a>
          <a href="https://linktr.ee/GlobalYouthConclave" target="_blank" rel="noopener noreferrer" className="blue-btn" style={{ padding: "10px 24px", fontSize: "0.75rem" }}>Register</a>
        </div>

        <button
          type="button"
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "transparent", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px", padding: "8px" }}
        >
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: "22px", height: "2px", background: "#0F172A", transition: "all 0.3s",
              transform: menuOpen
                ? (i === 0 ? "rotate(45deg) translateY(7px)" : i === 2 ? "rotate(-45deg) translateY(-7px)" : "scaleX(0)")
                : "none",
            }} />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="/#about" className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em", color: "#0F172A" }} onClick={() => setMenuOpen(false)}>About</a>
          <a href="/#committees" className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em", color: "#0F172A" }} onClick={() => setMenuOpen(false)}>Committees</a>
          <a href="/#fees" className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em", color: "#0F172A" }} onClick={() => setMenuOpen(false)}>Fees</a>
          <a href="/gallery" className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em", color: "#0F172A" }} onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="/tech-events" className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em", color: "#0F172A" }} onClick={() => setMenuOpen(false)}>Tech Events</a>
          <a href="/speakers" className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em", color: "#0F172A" }} onClick={() => setMenuOpen(false)}>Speakers</a>
          <a href="https://linktr.ee/GlobalYouthConclave" target="_blank" rel="noopener noreferrer" className="blue-btn" onClick={() => setMenuOpen(false)}>Register</a>
        </div>
      )}

      {/* HERO */}
      <header id="top" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px clamp(20px, 5vw, 48px) 60px", position: "relative", overflow: "hidden", background: "linear-gradient(to bottom, #F8FAFC, #FFFFFF)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37,99,235,0.05) 0%, transparent 70%)" }} />
        <div className="hero-grid" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(14,165,233,0.05) 0%, transparent 60%)" }} />

        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            width: `${3 + (i % 3)}px`, height: `${3 + (i % 3)}px`,
            background: i % 3 === 0 ? "#2563EB" : "rgba(37,99,235,0.3)",
            left: `${10 + i * 11}%`, bottom: `${5 + (i * 13) % 40}%`,
            animationDuration: `${8 + i * 2.5}s`, animationDelay: `${i * 0.8}s`,
          }} />
        ))}

        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* 🔥 FORMAL, STRAIGHT PRIZE HOOK LINK 🔥 */}
          <a href="#fees" className="prize-badge">
            <span style={{ fontSize: "1.1rem" }}>🏆</span> 
            ₹5 Lakhs Prize Pool
          </a>

          <div className="tag" style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>April 24-25, 2026 · Panjab University</div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 9vw, 6.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "clamp(-1px, -0.02em, -2px)", marginBottom: "24px", color: "#0F172A" }}>
            Global Youth<br />
            <span style={{ background: "linear-gradient(135deg, #1E3A8A 20%, #3B82F6 50%, #1E3A8A 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic", paddingRight: "10px" }}>
              Conclave 2.0
            </span>
          </h1>

          <p style={{ color: "#475569", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: 1.7, maxWidth: "580px", margin: "0 auto 40px", fontWeight: 400 }}>
            Two days of intense debate, high-stakes diplomacy, and building connections that outlast the conference.
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
            <a href="#committees" className="blue-btn">Explore Committees</a>
            <a href="https://linktr.ee/GlobalYouthConclave" target="_blank" rel="noopener noreferrer" className="ghost-btn">Register Now</a>
          </div>

          <div className="countdown-box" style={{ border: "1px solid #E2E8F0", background: "#FFFFFF", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", padding: "28px 36px", display: "inline-block", width: "100%", maxWidth: "420px", borderRadius: "16px" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#64748B", textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>Taking the floor in</div>
            <CountdownTimer />
          </div>
        </div>
      </header>

      {/* COLLABORATORS */}
      <section style={{ padding: "36px clamp(20px, 5vw, 48px)", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#64748B", textTransform: "uppercase", fontWeight: 600 }}>In Association With</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", alignItems: "center" }}>
            {COLLABORATORS.map(({ name, short, logo }) => (
              <div key={name} title={name} className="collab-badge" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", minWidth: "90px" }}>
                <div style={{ width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <img
                    src={logo}
                    alt={name}
                    width={56}
                    height={56}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <span style={{ display: "none", width: "52px", height: "52px", alignItems: "center", justifyContent: "center", background: "rgba(37,99,235,0.05)", borderRadius: "50%", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", fontWeight: 700, color: "#2563EB" }}>
                    {short}
                  </span>
                </div>
                <span style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 500, textAlign: "center", lineHeight: 1.3, maxWidth: "85px" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px clamp(20px, 5vw, 48px)", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <div className="about-grid" style={{ display: "grid", gap: "56px", alignItems: "start" }}>
            <div>
              <div className="tag">The Vibe</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.15, color: "#0F172A", marginBottom: "20px" }}>
                Step into the Room Where it <span style={{ color: "#2563EB", fontStyle: "italic" }}>Happens</span>
              </h2>
              <div className="divider-line" />
              <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "16px", fontWeight: 400, fontSize: "clamp(1rem, 2vw, 1.05rem)" }}>
                This isn't just another academic exercise. GYC 2.0 is a proving ground. Step into the shoes of global leaders, navigate geopolitical crises, and negotiate resolutions that actually make sense.
              </p>
              <p style={{ color: "#475569", lineHeight: 1.8, fontWeight: 400, fontSize: "clamp(1rem, 2vw, 1.05rem)" }}>
                Whether you're drafting a ceasefire in the UNSC or fighting over national policy in the Lok Sabha, you'll leave with sharper arguments, a massive network, and actual real-world skills.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: "🎯", title: "The Mission", desc: "No more passive debates. We're here to build confident communicators, sharp negotiators, and leaders who can actually command a room." },
                { icon: "🏛️", title: "The Venue", desc: "Panjab University. One of the most historic and prestigious campuses in the country. The perfect backdrop for diplomacy." },
                { icon: "🏆", title: "The Stakes", desc: "₹5 Lakhs in awards and cash prizes. Because exceptional debate and preparation should actually be rewarded." },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ padding: "24px", background: "#FFFFFF", border: "1px solid #E2E8F0", borderLeft: "4px solid #2563EB", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)", cursor: "default" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.2rem", marginTop: "2px", flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: "#0F172A", marginBottom: "6px", fontSize: "0.95rem" }}>{title}</div>
                      <div style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.6, fontWeight: 400 }}>{desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* DISCOVER MORE (TEASER SECTION) */}
      <section style={{ padding: "0 clamp(20px, 5vw, 48px) 100px", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            
            {/* Speakers Teaser Card */}
            <a href="/speakers" style={{ textDecoration: "none", display: "block", height: "100%" }}>
              <div className="teaser-card" style={{ padding: "40px", background: "linear-gradient(135deg, #EFF6FF, #FFFFFF)", border: "1px solid #BFDBFE", borderRadius: "16px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>🎤</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#1E3A8A", marginBottom: "12px" }}>Previous Speakers</h3>
                <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "24px" }}>Learn from diplomats, founders, and policymakers who have actually been in the room where it happens.</p>
                <div style={{ color: "#2563EB", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
                  Check the Lineup <span style={{ transition: "transform 0.3s" }} className="arrow">→</span>
                </div>
              </div>
            </a>

            {/* Tech Events Teaser Card */}
            <a href="/tech-events" style={{ textDecoration: "none", display: "block", height: "100%" }}>
              <div className="teaser-card" style={{ padding: "40px", background: "linear-gradient(135deg, #FEF2F2, #FFFFFF)", border: "1px solid #FECACA", borderRadius: "16px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>💻</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#991B1B", marginBottom: "12px" }}>Technical Events</h3>
                <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "24px" }}>Stop watching tutorials. Join the Astryx 24-hour hackathon, survive on caffeine, and build something real.</p>
                <div style={{ color: "#DC2626", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
                  View the Hackathon <span style={{ transition: "transform 0.3s" }} className="arrow">→</span>
                </div>
              </div>
            </a>

            {/* Gallery Teaser Card */}
            <a href="/gallery" style={{ textDecoration: "none", display: "block", height: "100%" }}>
              <div className="teaser-card" style={{ padding: "40px", background: "linear-gradient(135deg, #F0FDF4, #FFFFFF)", border: "1px solid #BBF7D0", borderRadius: "16px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>📸</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#166534", marginBottom: "12px" }}>Event Gallery</h3>
                <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "24px" }}>Take a look at the chaos, the debates, and the unforgettable memories from past Conclaves.</p>
                <div style={{ color: "#16A34A", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
                  View Photos <span style={{ transition: "transform 0.3s" }} className="arrow">→</span>
                </div>
              </div>
            </a>

          </div>
        </AnimatedSection>
      </section>

      {/* COMMITTEES */}
      <section id="committees" style={{ padding: "100px 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <AnimatedSection style={{ maxWidth: "1100px", margin: "0 auto 40px", padding: "0 clamp(20px, 5vw, 48px)" }}>
          <div className="tag" style={{ background: "#FFFFFF" }}>The Lineup</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#0F172A" }}>
            Eight Arenas of <span style={{ color: "#2563EB", fontStyle: "italic" }}>Debate</span>
          </h2>
        </AnimatedSection>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 48px)" }}>

          {/* Mobile chips */}
          <div className="show-mobile" style={{ flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "12px" }}>
              {COMMITTEES.map((com, i) => (
                <button key={i} type="button" tabIndex={-1} className={`committee-chip ${activeCommittee === i ? "active" : ""}`} onClick={() => setActiveCommittee(i)}>
                  <span>{com.icon}</span>{com.abbr}
                </button>
              ))}
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", padding: "32px 24px", position: "relative", overflow: "hidden", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: `radial-gradient(circle, ${c.color}15, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: c.color, textTransform: "uppercase", marginBottom: "12px", fontWeight: 600 }}>{c.abbr}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#0F172A", marginBottom: "16px", lineHeight: 1.2 }}>{c.name}</h3>
              <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "28px", fontWeight: 400, fontSize: "0.95rem" }}>{c.description}</p>
              <div style={{ borderLeft: `3px solid ${c.color}`, paddingLeft: "16px", background: "#F8FAFC", padding: "16px", borderRadius: "0 8px 8px 0" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#64748B", textTransform: "uppercase", marginBottom: "8px", fontWeight: 600 }}>Official Agenda</div>
                <div style={{ color: "#0F172A", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.5 }}>{c.agenda}</div>
              </div>
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="hide-mobile" style={{ display: "flex", gap: "32px" }}>
            <div style={{ width: "260px", flexShrink: 0 }}>
              {COMMITTEES.map((com, i) => (
                <button key={i} type="button" tabIndex={-1} className={`committee-tab ${activeCommittee === i ? "active" : ""}`} onClick={() => setActiveCommittee(i)}>
                  <span style={{ fontSize: "1.2rem" }}>{com.icon}</span>
                  <span style={{ fontSize: "0.9rem", letterSpacing: "0.02em" }}>{com.abbr}</span>
                </button>
              ))}
            </div>
            <div style={{ flex: 1, padding: "48px 56px", background: "#FFFFFF", position: "relative", overflow: "hidden", minHeight: "420px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 20px 40px rgba(0,0,0,0.03)" }}>
              <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${c.color}15, transparent 70%)`, pointerEvents: "none", transition: "background 0.4s" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", color: c.color, textTransform: "uppercase", marginBottom: "12px", fontWeight: 600 }}>{c.abbr}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 700, color: "#0F172A", marginBottom: "20px", lineHeight: 1.2 }}>{c.name}</h3>
                <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "36px", fontWeight: 400, fontSize: "1rem", maxWidth: "560px" }}>{c.description}</p>
                <div style={{ borderLeft: `4px solid ${c.color}`, background: "#F8FAFC", padding: "20px", borderRadius: "0 8px 8px 0", maxWidth: "600px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#64748B", textTransform: "uppercase", marginBottom: "10px", fontWeight: 600 }}>Official Agenda</div>
                  <div style={{ color: "#0F172A", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.5 }}>{c.agenda}</div>
                </div>
                <div style={{ position: "absolute", bottom: "-40px", right: "-10px", fontFamily: "'Playfair Display', serif", fontSize: "10rem", fontWeight: 900, color: "rgba(15,23,42,0.03)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                  {String(activeCommittee + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEES */}
      <section id="fees" style={{ padding: "100px clamp(20px, 5vw, 48px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <div className="fees-grid" style={{ display: "grid", gap: "56px", alignItems: "flex-start" }}>
              <div>
                <div className="tag">Registration</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>
                  Fees & <span style={{ color: "#2563EB", fontStyle: "italic" }}>Inclusions</span>
                </h2>
                <div className="divider-line" />
                <p style={{ color: "#64748B", fontSize: "0.9rem", marginBottom: "32px", fontWeight: 400, lineHeight: 1.6 }}>
                  All fees include conference materials & meals. Accommodation is extra. A delegation is a group of 5.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {FEES.map(({ label, price, note, highlight }) => (
                    <div key={label} className={"fee-card" + (highlight ? " highlight" : "")}>
                      <div>
                        <div style={{ fontWeight: 700, color: highlight ? "#1E3A8A" : "#0F172A", marginBottom: "4px", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "10px" }}>
                          {label}
                          {highlight && <span style={{ background: "#DBEAFE", color: "#1D4ED8", fontSize: "0.6rem", padding: "4px 10px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 800, borderRadius: "20px" }}>Best Value</span>}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#64748B" }}>{note}</div>
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 700, color: highlight ? "#2563EB" : "#0F172A", flexShrink: 0, marginLeft: "16px" }}>{price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* AWARDS & CASH PRIZES WITH BROKEN SYMMETRY (Tilted 1 degree) */}
                <div style={{ transform: "rotate(1deg)", background: "linear-gradient(135deg, #EFF6FF, #FFFFFF)", border: "1px solid #BFDBFE", padding: "36px", position: "relative", overflow: "hidden", borderRadius: "16px", boxShadow: "0 10px 30px rgba(37,99,235,0.05)" }}>
                  <div style={{ position: "absolute", top: "-10px", right: "-10px", fontSize: "6rem", opacity: 0.08, lineHeight: 1 }}>🏆</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#1D4ED8", lineHeight: 1, marginBottom: "10px" }}>₹5 Lakhs</div>
                  <div style={{ color: "#0F172A", fontWeight: 700, marginBottom: "12px", fontSize: "1.1rem" }}>in Awards & Cash Prizes</div>
                  <div style={{ color: "#475569", fontSize: "0.9rem", fontWeight: 400, lineHeight: 1.6 }}>We believe in rewarding those who actually put in the work. Here is how the prize pool breaks down per committee.</div>
                  
                  {/* DETAILED PRIZE BREAKDOWN */}
                  <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px dashed #BFDBFE" }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#1D4ED8", textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>Committee Prizes</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                      <div style={{ background: "#FFFFFF", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                        <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, textTransform: "uppercase", marginBottom: "4px" }}>Best Delegate</div>
                        <div style={{ color: "#0F172A", fontWeight: 800, fontSize: "1.1rem" }}>₹10,000</div>
                      </div>
                      <div style={{ background: "#FFFFFF", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                        <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, textTransform: "uppercase", marginBottom: "4px" }}>High Commendation</div>
                        <div style={{ color: "#0F172A", fontWeight: 800, fontSize: "1.1rem" }}>₹6,000</div>
                      </div>
                      <div style={{ background: "#FFFFFF", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                        <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, textTransform: "uppercase", marginBottom: "4px" }}>Special Mention</div>
                        <div style={{ color: "#0F172A", fontWeight: 800, fontSize: "1.1rem" }}>Medals</div>
                      </div>
                      <div style={{ background: "#FFFFFF", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                        <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, textTransform: "uppercase", marginBottom: "4px" }}>Int&apos;l Press</div>
                        <div style={{ color: "#0F172A", fontWeight: 800, fontSize: "1.1rem" }}>₹4,000</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 10px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontWeight: 800, color: "#0F172A", marginBottom: "12px", fontSize: "1.1rem" }}>🎓 Campus Ambassador</div>
                  <div style={{ color: "#475569", fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 400, marginBottom: "16px" }}>Bring your crew. Get 7+ delegates to register and your entry, food, and accommodation are on us—plus a trophy to take home.</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#2563EB", letterSpacing: "0.1em", fontWeight: 600 }}>→ Eligibility: 7+ delegates (excluding self)</div>
                </div>

                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 10px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontWeight: 800, color: "#0F172A", marginBottom: "20px", fontSize: "1.1rem" }}>After Hours</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {[
                      { icon: "🎭", label: "Cultural Night", desc: "Celebrate India's heritage with live dance and drama." },
                      { icon: "✨", label: "Prom Night", desc: "Because you can't wear a suit for two days straight without an excuse to party." },
                      { icon: "🎸", label: "Live Band", desc: "The perfect way to close out the conclave." },
                    ].map(({ icon, label, desc }) => (
                      <div key={label} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                        <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{icon}</span>
                        <div>
                          <div style={{ color: "#0F172A", fontSize: "0.95rem", fontWeight: 600, marginBottom: "2px" }}>{label}</div>
                          <div style={{ color: "#64748B", fontSize: "0.85rem", fontWeight: 400 }}>{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px clamp(20px, 5vw, 48px)", borderTop: "1px solid #E2E8F0", background: "linear-gradient(to bottom, #F8FAFC, #FFFFFF)", textAlign: "center" }}>
        <AnimatedSection>
          <div className="tag" style={{ background: "#FFFFFF" }}>Join GYC 2.0</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 7vw, 4.5rem)", fontWeight: 900, color: "#0F172A", marginBottom: "20px", lineHeight: 1.1 }}>
            Ready to Take the<br /><span style={{ color: "#2563EB", fontStyle: "italic" }}>Floor?</span>
          </h2>
          <p style={{ color: "#475569", maxWidth: "500px", margin: "0 auto 48px", lineHeight: 1.8, fontWeight: 400, fontSize: "clamp(1rem, 2vw, 1.1rem)" }}>
            Don't just watch from the sidelines. Secure your spot, pick your committee, and get ready to debate with the best.
          </p>
          
          <a href="https://linktr.ee/GlobalYouthConclave" target="_blank" rel="noopener noreferrer" className="blue-btn" style={{ fontSize: "0.9rem", padding: "18px 48px" }}>
            Register Now
          </a>

          <div className="contact-grid" style={{ display: "grid", gap: "1px", maxWidth: "760px", margin: "64px auto 0", border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden", background: "#E2E8F0" }}>
            {[
              { icon: "📧", label: "Email", value: "globalyouthconclave@gmail.com", href: "mailto:globalyouthconclave@gmail.com" },
              { icon: "📱", label: "WhatsApp", value: "+91 63974 29749", href: "tel:+916397429749" },
              { icon: "📸", label: "Instagram", value: "@globalyouthconclavegyc", href: "https://instagram.com/globalyouthconclavegyc" },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{ padding: "32px 20px", background: "#FFFFFF" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "12px" }}>{icon}</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#64748B", textTransform: "uppercase", marginBottom: "8px", fontWeight: 600 }}>{label}</div>
                <a href={href} className="contact-link" style={{ fontSize: "clamp(0.8rem, 2vw, 0.9rem)", wordBreak: "break-word" }}>{value}</a>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E2E8F0", padding: "32px clamp(20px, 5vw, 48px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", maxWidth: "1200px", margin: "0 auto", background: "#FFFFFF" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img 
            src="/gyc-logo.png" 
            alt="GYC" 
            style={{ width: "32px", height: "32px", objectFit: "contain" }} 
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }} 
          />
          <span style={{ display: "none", width: "32px", height: "32px", alignItems: "center", justifyContent: "center", background: "rgba(37,99,235,0.1)", borderRadius: "6px", fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", fontWeight: 700, color: "#2563EB" }}>
            GYC
          </span>
          <span style={{ color: "#64748B", fontSize: "0.85rem", fontWeight: 500 }}>Global Youth Conclave 2.0 — 2026</span>
        </div>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {["about", "committees", "fees", "contact"].map(s => (
            <a key={s} href={`/#${s}`} className="nav-link" style={{ fontSize: "0.75rem" }}>{s}</a>
          ))}
          <a href="/tech-events" className="nav-link" style={{ fontSize: "0.75rem" }}>Tech Events</a>
          <a href="/gallery" className="nav-link" style={{ fontSize: "0.75rem" }}>Gallery</a>
          <a href="/speakers" className="nav-link" style={{ fontSize: "0.75rem" }}>Previous Speakers</a>
        </div>
      </footer>
    </main>
  );
}