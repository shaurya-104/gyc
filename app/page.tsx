"use client";

import React, { useState, useEffect, useRef } from "react";

const COMMITTEES = [
  {
    abbr: "UNGA",
    name: "United Nations General Assembly",
    description:
      "Founded in 1945, UNGA is the central forum for all 193 UN member states to deliberate on peace, security, and human rights. Each nation holds an equal vote, making it the most inclusive body in global governance.",
    agenda: "Cross Border Terrorism and Strengthening",
    color: "#4A90D9",
    icon: "🌐",
  },
  {
    abbr: "UNSC",
    name: "United Nations Security Council",
    description:
      "The UNSC ensures global peace and security through 15 member nations—five of which hold permanent veto power. It can impose sanctions, authorize peacekeeping missions, and enforce binding resolutions.",
    agenda: "Comprehensive Weapon Disarmament and Non-Proliferation",
    color: "#E63946",
    icon: "🛡️",
  },
  {
    abbr: "UNHRC",
    name: "UN Human Rights Council",
    description:
      "An international body of 47 member states committed to promoting and protecting human rights globally. It addresses violations, provides recommendations, and upholds equality, justice, and dignity.",
    agenda: "Safeguarding Data Privacy and Data Protection as a Fundamental Right",
    color: "#2EC4B6",
    icon: "⚖️",
  },
  {
    abbr: "AIPPM",
    name: "All India Political Parties Meet",
    description:
      "A forum where representatives from across India's political spectrum convene to build consensus on pressing national issues, foster cross-party dialogue, and promote unity on matters of public welfare.",
    agenda: "Religious Intolerance and Secularism",
    color: "#FF9F1C",
    icon: "🏛️",
  },
  {
    abbr: "Lok Sabha",
    name: "Lok Sabha Simulation",
    description:
      "Simulates India's parliamentary system, giving participants an immersive experience in debating national issues, drafting resolutions, and understanding the full arc of legislative processes.",
    agenda: "Review of 12 Years of NDA Government",
    color: "#7B2D8B",
    icon: "📜",
  },
  {
    abbr: "IPL Auction",
    name: "Indian Premier League Auction",
    description:
      "A high-intensity strategy simulation recreating the IPL player auction. Delegates compete as team owners and analysts, blending sports management, economics, and real-time crisis negotiation.",
    agenda: "Build the Strongest Squad Within a Fixed Budget",
    color: "#F4A261",
    icon: "🏏",
  },
  {
    abbr: "Int'l Press",
    name: "International Press",
    description:
      "The media body of GYC — covering debates, reporting developments, and providing critical analysis. Participants take on roles as reporters, photographers, and editors in a live journalism simulation.",
    agenda: "Simulating Real-World Journalism Across All Committees",
    color: "#6C757D",
    icon: "📰",
  },
];

const FEES = [
  { label: "Standard Delegate", price: "₹2,499", note: "per delegate" },
  { label: "Early Bird", price: "₹1,999", note: "until 10 Feb 2026" },
  { label: "Delegation (5+)", price: "₹1,799", note: "per delegation" },
  { label: "International Press", price: "₹1,599", note: "per delegation" },
  { label: "Rashtriya Yuva Sansad", price: "₹999", note: "per delegation" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CountdownTimer() {
  const target = new Date("2026-04-24T09:00:00+05:30").getTime();
  const [diff, setDiff] = useState(target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const d = Math.max(0, Math.floor(diff / 86400000));
  const h = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000));
  const s = Math.max(0, Math.floor((diff % 60000) / 1000));
  const units = [{ v: d, l: "Days" }, { v: h, l: "Hours" }, { v: m, l: "Minutes" }, { v: s, l: "Seconds" }];
  return (
    <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
      {units.map(({ v, l }) => (
        <div key={l} style={{ textAlign: "center", minWidth: "70px" }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "#C9A84C",
            lineHeight: 1,
            letterSpacing: "-1px",
          }}>
            {String(v).padStart(2, "0")}
          </div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#9CA3AF", marginTop: "6px", textTransform: "uppercase" }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeCommittee, setActiveCommittee] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        
        html { scroll-behavior: smooth; }

        ::selection { background: rgba(201, 168, 76, 0.3); }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080C14; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 4px; }

        .nav-link {
          color: #9CA3AF;
          text-decoration: none;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color 0.2s;
          font-weight: 500;
        }
        .nav-link:hover { color: #C9A84C; }

        .gold-btn {
          background: linear-gradient(135deg, #C9A84C, #E8CC7A, #C9A84C);
          background-size: 200%;
          color: #080C14;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 14px 36px;
          border: none;
          cursor: pointer;
          transition: background-position 0.4s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .gold-btn:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(201, 168, 76, 0.35);
        }

        .ghost-btn {
          background: transparent;
          color: #C9A84C;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 13px 35px;
          border: 1px solid rgba(201,168,76,0.5);
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }
        .ghost-btn:hover {
          border-color: #C9A84C;
          background: rgba(201, 168, 76, 0.08);
        }

        .committee-tab {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-left: 2px solid transparent;
          width: 100%;
          text-align: left;
          transition: all 0.25s;
          color: #6B7280;
          font-family: 'DM Sans', sans-serif;
        }
        .committee-tab:hover { color: #E8E6E1; border-left-color: rgba(201,168,76,0.4); background: rgba(255,255,255,0.02); }
        .committee-tab.active { color: #C9A84C; border-left-color: #C9A84C; background: rgba(201,168,76,0.05); }

        .fee-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 24px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.25s;
        }
        .fee-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(201,168,76,0.25); }
        .fee-card.highlight { border-color: rgba(201,168,76,0.4); background: rgba(201,168,76,0.05); }

        .social-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 32px;
          text-align: center;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .social-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.05), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .social-card:hover::before { opacity: 1; }
        .social-card:hover { border-color: rgba(201,168,76,0.3); transform: translateY(-4px); }

        .divider-line {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #C9A84C, transparent);
          margin: 16px 0 24px;
        }

        .tag {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C9A84C;
          border: 1px solid rgba(201,168,76,0.3);
          padding: 4px 12px;
          margin-bottom: 20px;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          animation: float linear infinite;
        }
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { opacity: 0.2; }
          to { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
        }

        .contact-link {
          color: #9CA3AF;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .contact-link:hover { color: #C9A84C; }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .committee-layout { flex-direction: column !important; }
          .fees-layout { flex-direction: column !important; }
          .socials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 40px",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(8,12,20,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "32px", height: "32px",
            background: "linear-gradient(135deg, #C9A84C, #E8CC7A)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: 900, color: "#080C14",
            fontFamily: "'Playfair Display', serif",
          }}>G</div>
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
      </nav>

      {/* HERO */}
      <header id="top" style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background layers */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }} />
        <div className="hero-grid" />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(74,144,217,0.08) 0%, transparent 60%)",
        }} />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            background: i % 3 === 0 ? "#C9A84C" : "rgba(201,168,76,0.3)",
            left: `${8 + i * 7.5}%`,
            bottom: `${5 + (i * 13) % 40}%`,
            animationDuration: `${8 + i * 2.3}s`,
            animationDelay: `${i * 0.7}s`,
          }} />
        ))}

        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", width: "100%" }}>
          <div className="tag">24 April 2026 · Panjab University, Chandigarh</div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-2px",
            marginBottom: "28px",
            color: "#FFFFFF",
          }}>
            Global Youth<br />
            <span style={{
              background: "linear-gradient(135deg, #C9A84C 20%, #F0DC8C 50%, #C9A84C 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "italic",
            }}>Conclave 2.0</span>
          </h1>

          <p style={{
            color: "#9CA3AF",
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: "0 auto 48px",
            fontWeight: 300,
          }}>
            A two-day summit of diplomacy, debate, and discovery — where young minds 
            forge the resolutions of tomorrow.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "64px" }}>
            <a href="#committees" className="gold-btn">Explore Committees</a>
            <a href="#contact" className="ghost-btn">Register Now</a>
          </div>

          {/* Countdown */}
          <div style={{
            border: "1px solid rgba(201,168,76,0.2)",
            background: "rgba(201,168,76,0.03)",
            padding: "28px 40px",
            display: "inline-block",
          }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#6B7280", textTransform: "uppercase", marginBottom: "20px" }}>
              Conference Begins In
            </div>
            <CountdownTimer />
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          animation: "float 2s ease-in-out infinite",
        }}>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #C9A84C, transparent)" }} />
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="fees-layout">
            <div>
              <div className="tag">About GYC</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#FFFFFF",
                marginBottom: "24px",
              }}>
                Where Youth Shape the<br />
                <span style={{ color: "#C9A84C", fontStyle: "italic" }}>World's Agenda</span>
              </h2>
              <div className="divider-line" />
              <p style={{ color: "#9CA3AF", lineHeight: 1.8, marginBottom: "20px", fontWeight: 300 }}>
                Model United Nations is more than an academic exercise — it is a journey that shapes young minds into global citizens, articulate speakers, and empathetic leaders.
              </p>
              <p style={{ color: "#9CA3AF", lineHeight: 1.8, fontWeight: 300 }}>
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
                <div key={title} style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.02)",
                  borderLeft: "2px solid rgba(201,168,76,0.2)",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  transition: "all 0.25s",
                  cursor: "default",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = "#C9A84C";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,0.05)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = "rgba(201,168,76,0.2)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.2rem", marginTop: "2px", flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: "#E8E6E1", marginBottom: "6px", fontSize: "0.9rem", letterSpacing: "0.03em" }}>{title}</div>
                      <div style={{ color: "#6B7280", fontSize: "0.85rem", lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* COMMITTEES */}
      <section id="committees" style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <AnimatedSection style={{ maxWidth: "1100px", margin: "0 auto 56px", padding: "0 24px" }}>
          <div className="tag">Committees</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "#FFFFFF",
          }}>
            Seven Arenas of <span style={{ color: "#C9A84C", fontStyle: "italic" }}>Debate</span>
          </h2>
        </AnimatedSection>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <div className="committee-layout" style={{ display: "flex", gap: "0" }}>
            {/* Tabs */}
            <div style={{
              width: "260px",
              flexShrink: 0,
              borderRight: "1px solid rgba(255,255,255,0.07)",
            }}>
              {COMMITTEES.map((com, i) => (
                <button
                  key={i}
                  className={`committee-tab ${activeCommittee === i ? "active" : ""}`}
                  onClick={() => setActiveCommittee(i)}
                >
                  <span style={{ fontSize: "1rem" }}>{com.icon}</span>
                  <span style={{ fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.02em" }}>{com.abbr}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{
              flex: 1,
              padding: "40px 48px",
              background: "rgba(255,255,255,0.015)",
              position: "relative",
              overflow: "hidden",
              minHeight: "400px",
            }}>
              {/* Accent circle */}
              <div style={{
                position: "absolute",
                top: "-80px",
                right: "-80px",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${c.color}15, transparent 70%)`,
                pointerEvents: "none",
                transition: "background 0.4s",
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: c.color,
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  transition: "color 0.3s",
                }}>
                  {c.abbr}
                </div>

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "20px",
                  lineHeight: 1.2,
                }}>
                  {c.name}
                </h3>

                <p style={{
                  color: "#9CA3AF",
                  lineHeight: 1.8,
                  marginBottom: "36px",
                  fontWeight: 300,
                  fontSize: "0.95rem",
                  maxWidth: "560px",
                }}>
                  {c.description}
                </p>

                <div style={{
                  borderLeft: `3px solid ${c.color}`,
                  paddingLeft: "20px",
                }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    color: "#6B7280",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}>
                    Official Agenda
                  </div>
                  <div style={{
                    color: "#E8E6E1",
                    fontWeight: 500,
                    fontSize: "1rem",
                    lineHeight: 1.5,
                  }}>
                    {c.agenda}
                  </div>
                </div>

                {/* Committee index */}
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "8rem",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.025)",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}>
                  {String(activeCommittee + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEES */}
      <section id="fees" style={{ padding: "100px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <div className="fees-layout" style={{ display: "flex", gap: "80px", alignItems: "flex-start" }}>
              {/* Fees */}
              <div style={{ flex: 1 }}>
                <div className="tag">Registration</div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "8px",
                }}>
                  Fees & <span style={{ color: "#C9A84C", fontStyle: "italic" }}>Inclusions</span>
                </h2>
                <div className="divider-line" />
                <p style={{ color: "#6B7280", fontSize: "0.8rem", marginBottom: "32px", fontWeight: 300 }}>
                  All fees include conference materials & meals. Accommodation is extra. A delegation = group of 5.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {FEES.map(({ label, price, note, highlight }) => (
                    <div key={label} className={`fee-card ${highlight ? "highlight" : ""}`}>
                      <div>
                        <div style={{
                          fontWeight: 600,
                          color: highlight ? "#E8CC7A" : "#E8E6E1",
                          marginBottom: "2px",
                          fontSize: "0.9rem",
                        }}>
                          {label}
  
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{note}</div>
                      </div>
                      <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: highlight ? "#C9A84C" : "#E8E6E1",
                      }}>
                        {price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extras */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Prize pool */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.03) 100%)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  padding: "36px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: "-20px", right: "-20px",
                    fontSize: "6rem", opacity: 0.06, lineHeight: 1,
                  }}>🏆</div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "#C9A84C",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}>₹5 Lakhs</div>
                  <div style={{ color: "#E8E6E1", fontWeight: 600, marginBottom: "8px" }}>in Awards & Cash Prizes</div>
                  <div style={{ color: "#6B7280", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6 }}>
                    Recognizing exceptional performances in debate, resolution drafting, and diplomatic excellence.
                  </div>
                </div>

                {/* Campus Ambassador */}
                <div style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "32px",
                }}>
                  <div style={{ fontWeight: 700, color: "#E8E6E1", marginBottom: "8px", fontSize: "1rem" }}>
                    🎓 Campus Ambassador
                  </div>
                  <div style={{ color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 300, marginBottom: "16px" }}>
                    Bring 7+ delegates and earn free participation, all meals, a certificate, trophy, and a cash prize. Delegates under your batch get ₹1,800 rate.
                  </div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#C9A84C",
                    letterSpacing: "0.1em",
                  }}>
                    → Eligibility: 7+ delegates (excluding self)
                  </div>
                </div>

                {/* Socials */}
                <div style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "32px",
                }}>
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

      {/* CONTACT / REGISTER */}
      <section id="contact" style={{
        padding: "100px 24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "linear-gradient(to bottom, rgba(201,168,76,0.02), transparent)",
        textAlign: "center",
      }}>
        <AnimatedSection>
          <div className="tag" style={{ display: "inline-block" }}>Join GYC 2.0</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 900,
            color: "#FFFFFF",
            marginBottom: "20px",
            lineHeight: 1.1,
          }}>
            Ready to Make<br />
            <span style={{ color: "#C9A84C", fontStyle: "italic" }}>History?</span>
          </h2>
          <p style={{ color: "#9CA3AF", maxWidth: "480px", margin: "0 auto 48px", lineHeight: 1.7, fontWeight: 300 }}>
            Join hundreds of delegates from across India for two days of diplomacy, debate, and transformation at Panjab University.
          </p>

          <a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn"
            style={{ fontSize: "0.85rem", padding: "18px 48px" }}
          >
            Register via Google Form
          </a>

          <div style={{
            marginTop: "72px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            maxWidth: "700px",
            margin: "72px auto 0",
            border: "1px solid rgba(255,255,255,0.07)",
          }}>
            {[
              { icon: "📧", label: "Email", value: "globalyouthconclave@gmail.com", href: "mailto:globalyouthconclave@gmail.com" },
              { icon: "📱", label: "WhatsApp", value: "+91 63974 29749", href: "tel:+916397429749" },
              { icon: "📸", label: "Instagram", value: "@globalyouthconclavegyc", href: "https://instagram.com/globalyouthconclavegyc" },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{
                padding: "28px 20px",
                background: "rgba(255,255,255,0.02)",
                borderRight: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "8px" }}>{icon}</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#6B7280", textTransform: "uppercase", marginBottom: "6px" }}>{label}</div>
                <a href={href} className="contact-link" style={{ fontSize: "0.8rem" }}>{value}</a>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "32px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "24px", height: "24px",
            background: "linear-gradient(135deg, #C9A84C, #E8CC7A)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: 900, color: "#080C14",
            fontFamily: "'Playfair Display', serif",
          }}>G</div>
          <span style={{ color: "#6B7280", fontSize: "0.8rem" }}>
            Global Youth Conclave 2.0 — Panjab University, 2026
          </span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["about", "committees", "fees", "contact"].map(s => (
            <a key={s} href={`#${s}`} className="nav-link" style={{ fontSize: "0.72rem" }}>{s}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}
