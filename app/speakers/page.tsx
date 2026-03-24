/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import ChromaGrid from "../../component/ChromaGrid";

// --- GYC 1.0 GUESTS DATA FOR CHROMA GRID ---
// Updated with premium slate-blue gradients to match the light theme!
const GUEST_ITEMS = [
  { image: "/speakers/prof-rakesh.png", title: "Prof. Rakesh Sinha", subtitle: "Former MP, Rajya Sabha", handle: "@rakeshsinha", borderColor: "#3B82F6", gradient: "linear-gradient(145deg, rgba(59,130,246,0.3), #0F172A)" },
  { image: "/speakers/sharad-sagar.png", title: "Sharad Vivek Sagar", subtitle: "CEO & Founder, Dexterity Global", handle: "@sharadsagar", borderColor: "#F59E0B", gradient: "linear-gradient(145deg, rgba(245,158,11,0.3), #0F172A)" },
  { image: "/speakers/shagun-parihar.jpg.JPG", title: "Shagun Parihar", subtitle: "MLA, Jammu & Kashmir", handle: "@shagunparihar", borderColor: "#0D9488", gradient: "linear-gradient(145deg, rgba(13,148,136,0.3), #0F172A)" },
  { image: "/speakers/rashmi-samant.jpg.JPG", title: "Rashmi Samant", subtitle: "Former President, Oxford SU", handle: "@rashmisamant", borderColor: "#DC2626", gradient: "linear-gradient(145deg, rgba(220,38,38,0.3), #0F172A)" },
  { image: "/speakers/gaurav-attri.jpg.JPG", title: "Gaurav Attri", subtitle: "North Zone Org. Sec., ABVP", handle: "@gauravattri", borderColor: "#D97706", gradient: "linear-gradient(145deg, rgba(217,119,6,0.3), #0F172A)" },
  { image: "/speakers/aditya-takiar.jpg.JPG", title: "Aditya Takiar", subtitle: "National Secretary, ABVP", handle: "@adityatakiar", borderColor: "#7C3AED", gradient: "linear-gradient(145deg, rgba(124,58,237,0.3), #0F172A)" },
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

function AnimatedSection({ children, className = "", style = {}, delay = "0s" }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function SpeakersPage() {
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

  return (
    <main style={{ background: "#FFFFFF", color: "#0F172A", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
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

        .blue-btn { background: linear-gradient(135deg, #1E3A8A, #3B82F6, #1E3A8A); background-size: 200%; color: #FFFFFF; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 14px 36px; border: none; cursor: pointer; transition: background-position 0.4s, transform 0.2s, box-shadow 0.2s; text-decoration: none; display: inline-block; border-radius: 4px; }
        .blue-btn:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(37,99,235,0.3); }

        .tag { display: inline-block; font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #2563EB; border: 1px solid rgba(37,99,235,0.2); background: rgba(37,99,235,0.05); padding: 6px 14px; margin-bottom: 20px; border-radius: 40px; font-weight: 600; }

        .mobile-menu { position: fixed; inset: 0; top: 70px; background: rgba(255,255,255,0.98); backdrop-filter: blur(20px); z-index: 99; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; border-top: 1px solid #E2E8F0; }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
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
          {["about", "committees", "fees", "contact"].map(s => (
            <a key={s} href={`/#${s}`} className="nav-link">{s}</a>
          ))}
          <a href="/gallery" className="nav-link">Gallery</a>
          <a href="/speakers" className="nav-link" style={{ color: "#2563EB" }}>Previous Speakers</a>
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
          {["about", "committees", "fees", "contact"].map(s => (
            <a key={s} href={`/#${s}`} className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em", color: "#0F172A" }} onClick={() => setMenuOpen(false)}>{s}</a>
          ))}
          <a href="/gallery" className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em", color: "#0F172A" }} onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="/speakers" className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em", color: "#2563EB" }} onClick={() => setMenuOpen(false)}>Previous Speakers</a>
          <a href="https://linktr.ee/GlobalYouthConclave" target="_blank" rel="noopener noreferrer" className="blue-btn" onClick={() => setMenuOpen(false)}>Register</a>
        </div>
      )}

      {/* HEADER */}
      <header style={{ paddingTop: "160px", paddingBottom: "20px", textAlign: "center", position: "relative", background: "linear-gradient(to bottom, #F8FAFC, #FFFFFF)" }}>
        <div style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <AnimatedSection>
          <div className="tag" style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>GYC Guests</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, color: "#0F172A", marginBottom: "16px", lineHeight: 1.1 }}>
            Voices That <span style={{ color: "#2563EB", fontStyle: "italic" }}>Inspired</span>
          </h1>
          <p style={{ color: "#475569", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7, fontWeight: 400, fontSize: "clamp(1rem, 2vw, 1.1rem)", padding: "0 20px" }}>
            The esteemed leaders, policymakers, and change-makers who shaped our conclave.
          </p>
        </AnimatedSection>
      </header>

      {/* SPEAKERS CHROMA GRID */}
      <section style={{ padding: "20px clamp(10px, 2vw, 20px)", maxWidth: "1200px", margin: "0 auto", display: 'flex', justifyContent: 'center' }}>
        <AnimatedSection delay="0.2s" style={{ width: '100%' }}>
          <div style={{ position: 'relative', minHeight: '850px' }}>
            <ChromaGrid 
              items={GUEST_ITEMS}
              radius={350}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </AnimatedSection>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E2E8F0", padding: "32px clamp(20px, 5vw, 48px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", maxWidth: "1200px", margin: "0 auto", background: "#FFFFFF", marginTop: "40px" }}>
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
          <a href="/gallery" className="nav-link" style={{ fontSize: "0.75rem" }}>Gallery</a>
          <a href="/speakers" className="nav-link" style={{ fontSize: "0.75rem" }}>Previous Speakers</a>
        </div>
      </footer>
    </main>
  );
}