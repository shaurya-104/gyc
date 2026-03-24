/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";

// --- ADD YOUR IMAGE FILE NAMES HERE LATER ---
// Put your future images in the public/gallery/ folder
const GALLERY_IMAGES = [
  { id: 1, src: "/gallery/pic1.jpg", alt: "GYC Moment 1" },
  { id: 2, src: "/gallery/pic2.jpg", alt: "GYC Moment 2" },
  { id: 3, src: "/gallery/pic3.jpg", alt: "GYC Moment 3" },
  { id: 4, src: "/gallery/pic4.jpg", alt: "GYC Moment 4" },
  { id: 5, src: "/gallery/pic5.jpg", alt: "GYC Moment 5" },
  { id: 6, src: "/gallery/pic6.jpg", alt: "GYC Moment 6" },
  { id: 7, src: "/gallery/pic7.jpg", alt: "GYC Moment 7" },
  { id: 8, src: "/gallery/pic8.jpg", alt: "GYC Moment 8" },
  { id: 9, src: "/gallery/pic9.jpg", alt: "GYC Moment 9" },
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

export default function GalleryPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main style={{ background: "#080C14", color: "#E8E6E1", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
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

        .tag { display: inline-block; font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #C9A84C; border: 1px solid rgba(201,168,76,0.3); padding: 4px 12px; margin-bottom: 20px; }

        /* Gallery Grid Styles */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .gallery-item {
          aspect-ratio: 4/3;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          overflow: hidden;
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease, filter 0.5s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .gallery-item:hover {
          border-color: rgba(201,168,76,0.3);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .mobile-menu { position: fixed; inset: 0; top: 70px; background: rgba(8,12,20,0.98); backdrop-filter: blur(20px); z-index: 99; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
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
        background: scrolled || menuOpen ? "rgba(8,12,20,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "1px solid transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img 
            src="/gyc-logo.png.jpeg" 
            alt="GYC" 
            style={{ width: "36px", height: "36px", objectFit: "contain", flexShrink: 0 }} 
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }} 
          />
          <span style={{ display: "none", width: "36px", height: "36px", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,0.15)", borderRadius: "6px", fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.05em" }}>
            GYC
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", letterSpacing: "0.05em", color: "#E8E6E1" }}>
            GYC <span style={{ color: "#C9A84C" }}>2.0</span>
          </span>
        </a>

        <div className="hide-mobile" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {["about", "committees", "fees", "contact"].map(s => (
            <a key={s} href={`/#${s}`} className="nav-link">{s}</a>
          ))}
          <a href="/gallery" className="nav-link" style={{ color: "#C9A84C" }}>Gallery</a>
          <a href="/speakers" className="nav-link">Speakers</a>
          <a href="https://linktr.ee/GlobalYouthConclave" target="_blank" rel="noopener noreferrer" className="gold-btn" style={{ padding: "10px 24px", fontSize: "0.75rem" }}>Register</a>
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
            <a key={s} href={`/#${s}`} className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em" }} onClick={() => setMenuOpen(false)}>{s}</a>
          ))}
          <a href="/gallery" className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em", color: "#C9A84C" }} onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="/speakers" className="nav-link" style={{ fontSize: "1.1rem", letterSpacing: "0.2em" }} onClick={() => setMenuOpen(false)}>Speakers</a>
          <a href="https://linktr.ee/GlobalYouthConclave" target="_blank" rel="noopener noreferrer" className="gold-btn" onClick={() => setMenuOpen(false)}>Register</a>
        </div>
      )}

      {/* HEADER */}
      <header style={{ paddingTop: "160px", paddingBottom: "60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <AnimatedSection>
          <div className="tag">Moments in Time</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, color: "#FFFFFF", marginBottom: "16px", lineHeight: 1.1 }}>
            The GYC <span style={{ color: "#C9A84C", fontStyle: "italic" }}>Gallery</span>
          </h1>
          <p style={{ color: "#9CA3AF", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7, fontWeight: 300, fontSize: "clamp(0.9rem, 2vw, 1.05rem)", padding: "0 20px" }}>
            A glimpse into the diplomacy, debate, and memories forged at past Global Youth Conclaves.
          </p>
        </AnimatedSection>
      </header>

      {/* GALLERY GRID */}
      <section style={{ padding: "40px clamp(20px, 5vw, 48px)", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="gallery-grid">
          {GALLERY_IMAGES.map((img, index) => (
            <AnimatedSection key={img.id} delay={`${(index % 3) * 0.15}s`}>
              <div className="gallery-item">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div style={{ display: "none", flexDirection: "column", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.2)" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em" }}>IMAGE PENDING</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "24px clamp(20px, 5vw, 48px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", maxWidth: "1100px", margin: "0 auto", marginTop: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img 
            src="/gyc-logo.png.jpeg" 
            alt="GYC" 
            style={{ width: "28px", height: "28px", objectFit: "contain" }} 
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }} 
          />
          <span style={{ display: "none", width: "28px", height: "28px", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,0.15)", borderRadius: "4px", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", fontWeight: 700, color: "#C9A84C" }}>
            GYC
          </span>
          <span style={{ color: "#6B7280", fontSize: "0.78rem" }}>Global Youth Conclave 2.0 — 2026</span>
        </div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {["about", "committees", "fees", "contact"].map(s => (
            <a key={s} href={`/#${s}`} className="nav-link" style={{ fontSize: "0.7rem" }}>{s}</a>
          ))}
          <a href="/gallery" className="nav-link" style={{ fontSize: "0.7rem" }}>Gallery</a>
          <a href="/speakers" className="nav-link" style={{ fontSize: "0.7rem" }}>Speakers</a>
        </div>
      </footer>
    </main>
  );
}