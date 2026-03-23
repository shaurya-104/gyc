/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";

const COMMITTEES = [
  { abbr: "UNGA", name: "United Nations General Assembly", description: "Founded in 1945, UNGA is the central forum for all 193 UN member states to deliberate on peace, security, and human rights. Each nation holds an equal vote, making it the most inclusive body in global governance.", agenda: "Cross Border Terrorism and Strengthening", color: "#4A90D9", icon: "🌐" },
  { abbr: "UNSC", name: "United Nations Security Council", description: "The UNSC ensures global peace and security through 15 member nations—five of which hold permanent veto power. It can impose sanctions, authorize peacekeeping missions, and enforce binding resolutions.", agenda: "Comprehensive Weapon Disarmament and Non-Proliferation", color: "#E63946", icon: "🛡️" },
  { abbr: "UNHRC", name: "UN Human Rights Council", description: "An international body of 47 member states committed to promoting and protecting human rights globally. It addresses violations, provides recommendations, and upholds equality, justice, and dignity.", agenda: "Safeguarding Data Privacy and Data Protection as a Fundamental Right", color: "#2EC4B6", icon: "⚖️" },
  { abbr: "AIPPM", name: "All India Political Parties Meet", description: "A forum where representatives from across India's political spectrum convene to build consensus on pressing national issues, foster cross-party dialogue, and promote unity on matters of public welfare.", agenda: "Religious Intolerance and Secularism", color: "#FF9F1C", icon: "🏛️" },
  { abbr: "Lok Sabha", name: "Lok Sabha Simulation", description: "Simulates India's parliamentary system, giving participants an immersive experience in debating national issues, drafting resolutions, and understanding the full arc of legislative processes.", agenda: "Review of 12 Years of NDA Government", color: "#7B2D8B", icon: "📜" },
  { abbr: "RYS", name: "Rashtriya Yuva Sansad", description: "A simulation of India's youth parliament, RYS empowers young voices to debate pressing national issues, draft policy recommendations, and engage in democratic processes — building the next generation of informed and responsible citizens.", agenda: "The Role of Youth in Viksit Bharat 2047", color: "#22C55E", icon: "🇮🇳" },
  { abbr: "Int'l Press", name: "International Press", description: "The media body of GYC — covering debates, reporting developments, and providing critical analysis. Participants take on roles as reporters, photographers, and editors in a live journalism simulation.", agenda: "Simulating Real-World Journalism Across All Committees", color: "#6C757D", icon: "📰" },
];

const FEES = [
  { label: "Standard Delegate", price: "₹2,499", note: "per delegate" },
  { label: "Early Bird", price: "₹1,999", note: "until 30 March 2026", highlight: true },
  { label: "Delegation (5+)", price: "₹1,799", note: "per delegation" },
  { label: "International Press", price: "₹1,599", note: "per delegation" },
  { label: "Rashtriya Yuva Sansad", price: "₹999", note: "per delegation" },
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
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 6vw, 3.5rem)", fontWeight: 700, color: "#C9A84C", lineHeight: 1 }}>
            {String(v).padStart(2, "0")}
          </div>
          <div style={{ fontSize: "clamp(0.55rem, 1.5vw, 0.65rem)", letterSpacing: "0.15em", color: "#9CA3AF", marginTop: "4px", textTransform: "uppercase" }}>{l}</div>
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
        transition: "opacity 0.6s ease, transform 0.6s ease",
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

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const c = COMMITTEES[activeCommittee];

  return (
    <main style={{ background: "#080C14", color: "#E8E6E1", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        
        ::selection { background: rgba(201,168,76,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080C14; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 4px; }

        .nav-link { color: #9CA3AF; text-decoration: none; font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; transition: color 0.2s; font-weight: 500; }
        .nav-link:hover { color: #C9A84C; }

        .gold-btn { background: linear-gradient(135deg, #C9A84C, #E8CC7A, #C9A84C); background-size: 200%; color: #080C14; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 14px 36px; border: none; cursor: pointer; transition: background-position 0.4s, transform 0.2s, box-shadow 0.2s; text-decoration: none; display: inline-block; }
        .gold-btn:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,168,76,0.35); }

        .ghost-btn { background: transparent; color: #C9A84C; font-weight: 600; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 13px 35px; border: 1px solid rgba(201,168,76,0.5); cursor: pointer; transition: all 0.3s; text-decoration: none; display: inline-block; }
        .ghost-btn:hover { border-color: #C9A84C; background: rgba(201,168,76,0.08); }

        .committee-tab { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 13px 18px; border-left: 2px solid transparent; width: 100%; text-align: left; transition: all 0.2s; color: #6B7280; font-family: 'DM Sans', sans-serif; }
        .committee-tab:hover { color: #E8E6E1; border-left-color: rgba(201,168,76,0.4); background: rgba(255,255,255,0.02); }
        .committee-tab.active { color: #C9A84C; border-left-color: #C9A84C; background: rgba(201,168,76,0.05); }

        .committee-chip { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 10px 16px; border-radius: 40px; cursor: pointer; font-size: 0.8rem; font-weight: 500; color: #6B7280; transition: all 0.2s; white-space: nowrap; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; gap: 6px; }
        .committee-chip.active { color: #C9A84C; border-color: rgba(201,168,76,0.5); background: rgba(201,168,76,0.08); }

        .fee-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; transition: all 0.25s; }
        .fee-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(201,168,76,0.25); }

        .collab-badge { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); border-radius: 4px; transition: all 0.2s; cursor: default; }
        .collab-badge:hover { border-color: rgba(201,168,76,0.3); background: rgba(201,168,76,0.05); }

        .divider-line { width: 60px; height: 2px; background: linear-gradient(90deg, #C9A84C, transparent); margin: 16px 0 24px; }

        .tag { display: inline-block; font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #C9A84C; border: 1px solid rgba(201,168,76,0.3); padding: 4px 12px; margin-bottom: 20px; }

        .particle { position: absolute; border-radius: 50%; animation: floatup linear infinite; }
        @keyframes floatup { from { transform: translateY(0px) rotate(0deg); opacity: 0.6; } 50% { opacity: 0.2; } to { transform: translateY(-100vh) rotate(720deg); opacity: 0; } }

        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%); }

        .contact-link { color: #9CA3AF; text-decoration: none; font-size: 0.85rem; transition: color 0.2s; }
        .contact-link:hover { color: #C9A84C; }

        .mobile-menu { position: fixed; inset: 0; top: 70px; background: rgba(8,12,20,0.98); backdrop-filter: blur(20px); z-index: 99; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; }

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
        background: scrolled || menuOpen ? "rgba(8,12,20,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "1px solid transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ display: "flex", width: "36px", height: "36px", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,0.15)", borderRadius: "6px", fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.05em" }}>
            GYC
          </span>

          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", letterSpacing: "0.05em", color: "#E8E6E1" }}>
            GYC <span style={{ color: "#C9A84C" }}>2.0</span>
          </span>
        </div>

        <div className="hide-mobile" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {["about", "committees", "fees", "contact"].map(s => (
            <a key={s} href={`#${s}`} className="nav-link">{s}</a>
          ))}
          <a href="#contact" className="gold-btn" style={{ padding: "10px 24px", fontSize: "0.75rem" }}>Register</a>
        </div>

        <button
          type="button"
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "transparent", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px", padding: "8px" }}
        >
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: "22px", height: "2px", background: "#C9A84C", transition: "all 0.3s",
              transform: menuOpen
                ? (i === 0 ? "rotate(45deg) translateY(7px)" : i === 2 ? "rotate(-45deg) translateY(-7px)" : "scaleX(0)")
                : "none",
            }} />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {["about", "committees", "fees", "contact"].map(s => (
            <a key={s} href={`#${s}`} className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em" }} onClick={() => setMenuOpen(false)}>{s}</a>
          ))}
          <a href="#contact" className="gold-btn" onClick={() => setMenuOpen(false)}>Register Now</a>
        </div>
      )}

      {/* HERO */}
      <header id="top" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px clamp(20px, 5vw, 48px) 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        <div className="hero-grid" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(74,144,217,0.08) 0%, transparent 60%)" }} />

        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
            background: i % 3 === 0 ? "#C9A84C" : "rgba(201,168,76,0.3)",
            left: `${10 + i * 11}%`, bottom: `${5 + (i * 13) % 40}%`,
            animationDuration: `${8 + i * 2.5}s`, animationDelay: `${i * 0.8}s`,
          }} />
        ))}

        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", width: "100%" }}>
          <div className="tag">24 April 2026 · Panjab University, Chandigarh</div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 9vw, 7rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "clamp(-1px, -0.02em, -2px)", marginBottom: "24px", color: "#FFFFFF" }}>
            Global Youth<br />
            <span style={{ background: "linear-gradient(135deg, #C9A84C 20%, #F0DC8C 50%, #C9A84C 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic" }}>
              Conclave 2.0
            </span>
          </h1>

          <p style={{ color: "#9CA3AF", fontSize: "clamp(0.9rem, 2.5vw, 1.15rem)", lineHeight: 1.7, maxWidth: "540px", margin: "0 auto 40px", fontWeight: 300 }}>
            A two-day summit of diplomacy, debate, and discovery — where young minds forge the resolutions of tomorrow.
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
            <a href="#committees" className="gold-btn">Explore Committees</a>
            <a href="#contact" className="ghost-btn">Register Now</a>
          </div>

          <div className="countdown-box" style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.03)", padding: "24px 32px", display: "inline-block", width: "100%", maxWidth: "420px" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#6B7280", textTransform: "uppercase", marginBottom: "16px" }}>Conference Begins In</div>
            <CountdownTimer />
          </div>
        </div>
      </header>

      {/* COLLABORATORS */}
      <section style={{ padding: "28px clamp(20px, 5vw, 48px)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#6B7280", textTransform: "uppercase" }}>In Association With</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", alignItems: "center" }}>
            {COLLABORATORS.map(({ name, short, logo }) => (
              <div key={name} title={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", borderRadius: "8px", transition: "all 0.2s", cursor: "default", minWidth: "80px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.35)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <img
                    src={logo}
                    alt={name}
                    width={52}
                    height={52}
                    style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(1.05)" }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <span style={{ display: "none", width: "52px", height: "52px", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,0.1)", borderRadius: "50%", fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", fontWeight: 700, color: "#C9A84C" }}>
                    {short}
                  </span>
                </div>
                <span style={{ fontSize: "0.65rem", color: "#9CA3AF", fontWeight: 400, textAlign: "center", lineHeight: 1.3, maxWidth: "80px" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section style={{ padding: "80px clamp(20px, 5vw, 48px)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div className="tag" style={{ display: "inline-block" }}>GYC 1.0 Guests</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 700, color: "#FFFFFF" }}>
                Voices That <span style={{ color: "#C9A84C", fontStyle: "italic" }}>Inspired</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(140px, 28vw, 200px), 1fr))", gap: "20px" }}>
              {[
                { name: "Prof. Rakesh Sinha", role: "Former MP", org: "Rajya Sabha", initials: "RS", color: "#4A90D9" },
                { name: "Sharad Vivek Sagar", role: "CEO & Founder", org: "Dexterity Global", initials: "SVS", color: "#C9A84C" },
                { name: "Shagun Parihar", role: "MLA", org: "Jammu & Kashmir", initials: "SP", color: "#2EC4B6" },
                { name: "Rashmi Samant", role: "Former President", org: "Oxford University Students Union", initials: "RS", color: "#E63946" },
                { name: "Gaurav Attri", role: "North Zone Organizing Secretary", org: "ABVP", initials: "GA", color: "#FF9F1C" },
                { name: "Aditya Takiar", role: "National Secretary", org: "ABVP", initials: "AT", color: "#7B2D8B" },
              ].map(({ name, role, org, initials, color }) => (
                <div key={name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "24px 20px", textAlign: "center", transition: "all 0.25s", cursor: "default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${color}40`; (e.currentTarget as HTMLDivElement).style.background = `${color}08`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
                >
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `linear-gradient(135deg, ${color}40, ${color}15)`, border: `2px solid ${color}60`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: color, letterSpacing: "0.05em" }}>
                    {initials}
                  </div>
                  <div style={{ fontWeight: 600, color: "#E8E6E1", fontSize: "0.88rem", marginBottom: "4px", lineHeight: 1.3 }}>{name}</div>
                  <div style={{ color: color, fontSize: "0.72rem", fontWeight: 500, marginBottom: "4px", letterSpacing: "0.03em" }}>{role}</div>
                  <div style={{ color: "#6B7280", fontSize: "0.7rem", fontWeight: 300, lineHeight: 1.4 }}>{org}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "80px clamp(20px, 5vw, 48px)", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <div className="about-grid" style={{ display: "grid", gap: "48px", alignItems: "start" }}>
            <div>
              <div className="tag">About GYC</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.15, color: "#FFFFFF", marginBottom: "20px" }}>
                Where Youth Shape the<br /><span style={{ color: "#C9A84C", fontStyle: "italic" }}>World&apos;s Agenda</span>
              </h2>
              <div className="divider-line" />
              <p style={{ color: "#9CA3AF", lineHeight: 1.8, marginBottom: "16px", fontWeight: 300, fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                Model United Nations is more than an academic exercise — it is a journey that shapes young minds into global citizens, articulate speakers, and empathetic leaders.
              </p>
              <p style={{ color: "#9CA3AF", lineHeight: 1.8, fontWeight: 300, fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                Through GYC 2.0, participants step into the shoes of diplomats and world leaders, navigating complex issues and working toward peaceful solutions across seven dynamic committees.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              {[
                { icon: "🎯", title: "Vision", desc: "Empowering young minds through discourse on national and international issues, nurturing tomorrow's leaders." },
                { icon: "🚀", title: "Mission", desc: "Build leadership, diplomacy, and communication skills through parliamentary and UN-style simulations." },
                { icon: "🏛️", title: "Venue", desc: "Panjab University, established 1882 — one of India's most distinguished institutions on a 550-acre campus." },
                { icon: "🏆", title: "Prize Pool", desc: "₹5 Lakhs in awards and cash prizes recognizing exceptional debate, resolution, and diplomatic performance." },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderLeft: "2px solid rgba(201,168,76,0.2)", borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "default" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.1rem", marginTop: "2px", flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: "#E8E6E1", marginBottom: "4px", fontSize: "0.9rem" }}>{title}</div>
                      <div style={{ color: "#6B7280", fontSize: "0.82rem", lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* COMMITTEES */}
      <section id="committees" style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <AnimatedSection style={{ maxWidth: "1100px", margin: "0 auto 40px", padding: "0 clamp(20px, 5vw, 48px)" }}>
          <div className="tag">Committees</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 700, color: "#FFFFFF" }}>
            Seven Arenas of <span style={{ color: "#C9A84C", fontStyle: "italic" }}>Debate</span>
          </h2>
        </AnimatedSection>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 48px)" }}>

          {/* Mobile chips */}
          <div className="show-mobile" style={{ flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px" }}>
              {COMMITTEES.map((com, i) => (
                <button key={i} type="button" tabIndex={-1} className={`committee-chip ${activeCommittee === i ? "active" : ""}`} onClick={() => setActiveCommittee(i)}>
                  <span>{com.icon}</span>{com.abbr}
                </button>
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "24px 20px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: `radial-gradient(circle, ${c.color}15, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: c.color, textTransform: "uppercase", marginBottom: "10px" }}>{c.abbr}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "14px", lineHeight: 1.2 }}>{c.name}</h3>
              <p style={{ color: "#9CA3AF", lineHeight: 1.7, marginBottom: "24px", fontWeight: 300, fontSize: "0.88rem" }}>{c.description}</p>
              <div style={{ borderLeft: `3px solid ${c.color}`, paddingLeft: "16px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", color: "#6B7280", textTransform: "uppercase", marginBottom: "6px" }}>Official Agenda</div>
                <div style={{ color: "#E8E6E1", fontWeight: 500, fontSize: "0.9rem", lineHeight: 1.5 }}>{c.agenda}</div>
              </div>
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="hide-mobile" style={{ display: "flex" }}>
            <div style={{ width: "240px", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.07)" }}>
              {COMMITTEES.map((com, i) => (
                <button key={i} type="button" tabIndex={-1} className={`committee-tab ${activeCommittee === i ? "active" : ""}`} onClick={() => setActiveCommittee(i)}>
                  <span style={{ fontSize: "1rem" }}>{com.icon}</span>
                  <span style={{ fontWeight: 500, fontSize: "0.82rem", letterSpacing: "0.02em" }}>{com.abbr}</span>
                </button>
              ))}
            </div>
            <div style={{ flex: 1, padding: "40px 48px", background: "rgba(255,255,255,0.015)", position: "relative", overflow: "hidden", minHeight: "380px" }}>
              <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: `radial-gradient(circle, ${c.color}15, transparent 70%)`, pointerEvents: "none", transition: "background 0.4s" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", color: c.color, textTransform: "uppercase", marginBottom: "10px" }}>{c.abbr}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "18px", lineHeight: 1.2 }}>{c.name}</h3>
                <p style={{ color: "#9CA3AF", lineHeight: 1.8, marginBottom: "32px", fontWeight: 300, fontSize: "0.95rem", maxWidth: "520px" }}>{c.description}</p>
                <div style={{ borderLeft: `3px solid ${c.color}`, paddingLeft: "20px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#6B7280", textTransform: "uppercase", marginBottom: "8px" }}>Official Agenda</div>
                  <div style={{ color: "#E8E6E1", fontWeight: 500, fontSize: "1rem", lineHeight: 1.5 }}>{c.agenda}</div>
                </div>
                <div style={{ position: "absolute", bottom: "-40px", right: "0", fontFamily: "'Playfair Display', serif", fontSize: "8rem", fontWeight: 900, color: "rgba(255,255,255,0.025)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                  {String(activeCommittee + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEES */}
      <section id="fees" style={{ padding: "80px clamp(20px, 5vw, 48px)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <div className="fees-grid" style={{ display: "grid", gap: "48px", alignItems: "flex-start" }}>
              <div>
                <div className="tag">Registration</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}>
                  Fees & <span style={{ color: "#C9A84C", fontStyle: "italic" }}>Inclusions</span>
                </h2>
                <div className="divider-line" />
                <p style={{ color: "#6B7280", fontSize: "0.8rem", marginBottom: "28px", fontWeight: 300 }}>
                  All fees include conference materials & meals. Accommodation is extra. A delegation = group of 5.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {FEES.map(({ label, price, note, highlight }) => (
                    <div key={label} className={"fee-card" + (highlight ? " highlight" : "")}>
                      <div>
                        <div style={{ fontWeight: 600, color: highlight ? "#E8CC7A" : "#E8E6E1", marginBottom: "2px", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "8px" }}>
                          {label}
                          {highlight && <span style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C", fontSize: "0.58rem", padding: "2px 8px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>Best Value</span>}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#6B7280" }}>{note}</div>
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontWeight: 700, color: highlight ? "#C9A84C" : "#E8E6E1", flexShrink: 0, marginLeft: "12px" }}>{price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.03))", border: "1px solid rgba(201,168,76,0.3)", padding: "28px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "-10px", right: "-10px", fontSize: "5rem", opacity: 0.06, lineHeight: 1 }}>🏆</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 900, color: "#C9A84C", lineHeight: 1, marginBottom: "6px" }}>₹5 Lakhs</div>
                  <div style={{ color: "#E8E6E1", fontWeight: 600, marginBottom: "8px" }}>in Awards & Cash Prizes</div>
                  <div style={{ color: "#6B7280", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6 }}>Recognizing exceptional performances in debate, resolution drafting, and diplomatic excellence.</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "24px" }}>
                  <div style={{ fontWeight: 700, color: "#E8E6E1", marginBottom: "8px" }}>🎓 Campus Ambassador</div>
                  <div style={{ color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 300, marginBottom: "12px" }}>Bring 7+ delegates and earn free participation, all meals, a certificate, trophy, and cash prize.</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "#C9A84C", letterSpacing: "0.1em" }}>→ Eligibility: 7+ delegates (excluding self)</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "24px" }}>
                  <div style={{ fontWeight: 700, color: "#E8E6E1", marginBottom: "16px" }}>Social Events</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      { icon: "🎭", label: "Cultural Performances", desc: "Dance, drama & music celebrating India's heritage" },
                      { icon: "✨", label: "Prom Night", desc: "An evening of celebration and elegance" },
                      { icon: "🎸", label: "Band Night", desc: "Live music to close out the conclave" },
                    ].map(({ icon, label, desc }) => (
                      <div key={label} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{icon}</span>
                        <div>
                          <div style={{ color: "#E8E6E1", fontSize: "0.85rem", fontWeight: 500 }}>{label}</div>
                          <div style={{ color: "#6B7280", fontSize: "0.75rem", fontWeight: 300 }}>{desc}</div>
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
      <section id="contact" style={{ padding: "80px clamp(20px, 5vw, 48px)", borderTop: "1px solid rgba(255,255,255,0.05)", background: "linear-gradient(to bottom, rgba(201,168,76,0.02), transparent)", textAlign: "center" }}>
        <AnimatedSection>
          <div className="tag" style={{ display: "inline-block" }}>Join GYC 2.0</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 7vw, 4rem)", fontWeight: 900, color: "#FFFFFF", marginBottom: "16px", lineHeight: 1.1 }}>
            Ready to Make<br /><span style={{ color: "#C9A84C", fontStyle: "italic" }}>History?</span>
          </h2>
          <p style={{ color: "#9CA3AF", maxWidth: "460px", margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 300, fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
            Join hundreds of delegates from across India for two days of diplomacy, debate, and transformation at Panjab University.
          </p>
          <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="gold-btn" style={{ fontSize: "0.85rem", padding: "16px 40px" }}>
            Register via Google Form
          </a>

          <div className="contact-grid" style={{ display: "grid", gap: "1px", maxWidth: "680px", margin: "56px auto 0", border: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { icon: "📧", label: "Email", value: "globalyouthconclave@gmail.com", href: "mailto:globalyouthconclave@gmail.com" },
              { icon: "📱", label: "WhatsApp", value: "+91 63974 29749", href: "tel:+916397429749" },
              { icon: "📸", label: "Instagram", value: "@globalyouthconclavegyc", href: "https://instagram.com/globalyouthconclavegyc" },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{ padding: "24px 16px", background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: "1.3rem", marginBottom: "6px" }}>{icon}</div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "#6B7280", textTransform: "uppercase", marginBottom: "6px" }}>{label}</div>
                <a href={href} className="contact-link" style={{ fontSize: "clamp(0.7rem, 2vw, 0.82rem)", wordBreak: "break-word" }}>{value}</a>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "24px clamp(20px, 5vw, 48px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          
          <span style={{ display: "flex", width: "28px", height: "28px", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,0.15)", borderRadius: "4px", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", fontWeight: 700, color: "#C9A84C" }}>
            GYC
          </span>

          <span style={{ color: "#6B7280", fontSize: "0.78rem" }}>Global Youth Conclave 2.0 — 2026</span>
        </div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {["about", "committees", "fees", "contact"].map(s => (
            <a key={s} href={`#${s}`} className="nav-link" style={{ fontSize: "0.7rem" }}>{s}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}