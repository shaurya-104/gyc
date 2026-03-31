"use client";

import { useState } from "react";

// --- MOCK DATABASE ---
const techEvents = [
  {
    id: "astryx-hackathon-01",
    title: "Hackathon",
    date: "April 24-25 (TBA)",
    status: "Coming Soon",
    organizedBy: "Astryx Tech Club",
    shortDesc: "A high-octane coding sprint. Build, scale, and innovate alongside the brightest minds.",
    fullDesc: `Join us for the ultimate coding sprint brought to you by Astryx. Whether you are building a full-stack web app, training an ML model, or deploying a cloud-native solution, this is your battleground. 
    
    We are bringing together top developers, designers, and creators to solve real-world problems. Expect intense coding, mentorship, and massive networking opportunities.`,
    rules: [
      "Team size: 2-5 members",
      "All code must be written during the sprint",
      "Open to all years and branches",
      "Inter-college teams are highly encouraged",
    ],
    prizes: "Massive Prize Pool & Rewards (Revealing Soon!)",
    link: "https://docs.google.com/forms/d/1mqEere76J9nYFxMWopIBL3qv4uNxVs8u0p0sjt3ZCS0/edit"
  },
  // You can add more future tech events here
];

export default function TechEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const activeEvent = techEvents.find((e) => e.id === selectedEvent);

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#ededef] font-sans relative overflow-x-hidden">
      
      {/* Techy Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40" 
        style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)'
        }}
      ></div>

      {/* --- TOP NAVIGATION (HOME BUTTON) --- */}
      <nav className="relative z-50 w-full px-6 py-5 md:px-16 border-b border-slate-800/50 bg-[#0F172A]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center">
          <a 
            href="/" 
            className="text-slate-400 hover:text-blue-400 transition-colors font-mono text-sm tracking-widest uppercase flex items-center gap-2"
          >
            <span className="text-lg leading-none mb-1">←</span> GYC Home
          </a>
        </div>
      </nav>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="max-w-4xl mx-auto relative z-10 px-6 py-10 md:py-16">
        
        {/* --- VIEW 1: THE EVENT LIST --- */}
        {!selectedEvent && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-white">
              TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">EVENTS</span>
            </h1>
            <p className="text-slate-400 mb-10 md:mb-12 text-base md:text-lg font-light">
              Push your limits. Compete, build, and level up your stack.
            </p>

            <div className="grid gap-6">
              {techEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event.id)}
                  className="group cursor-pointer bg-[#1E293B]/80 backdrop-blur-md border border-[#334155] hover:border-blue-500/50 p-6 md:p-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* MOBILE & DESKTOP RESPONSIVE HEADER */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5 relative z-10">
                    
                    {/* Left Side: Badge + Title + Status */}
                    <div className="flex flex-col items-start gap-2">
                      <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap">
                        By {event.organizedBy}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                        {event.title}
                      </h2>
                      <p className="text-emerald-400 text-xs md:text-sm font-mono mt-1 flex items-center gap-2 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {event.status}
                      </p>
                    </div>

                    {/* Right Side: Date Badge */}
                    <span className="text-slate-300 font-mono text-xs md:text-sm bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700 whitespace-nowrap flex items-center gap-2">
                      📅 {event.date}
                    </span>
                  </div>

                  <p className="text-slate-400 relative z-10 text-sm md:text-base leading-relaxed">
                    {event.shortDesc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- VIEW 2: THE EVENT DETAILS --- */}
        {selectedEvent && activeEvent && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => setSelectedEvent(null)}
              className="mb-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-mono uppercase tracking-wider"
            >
              <span className="text-lg leading-none mb-1">←</span> Back to Events
            </button>

            <div className="bg-[#1E293B]/90 backdrop-blur-xl border border-[#334155] p-6 md:p-12 rounded-2xl relative overflow-hidden shadow-2xl">
              {/* Background glowing top border effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>

              {/* MOBILE & DESKTOP RESPONSIVE EVENT HERO */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
                <div className="flex flex-col items-start gap-3 w-full lg:w-auto">
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap">
                    Organized by {activeEvent.organizedBy}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    {activeEvent.title}
                  </h1>
                  <span className="text-emerald-400 font-mono text-xs md:text-sm tracking-wide bg-emerald-400/10 px-3 py-1.5 rounded-md border border-emerald-400/20 mt-1 flex items-center gap-2 whitespace-nowrap">
                    📅 {activeEvent.date}
                  </span>
                </div>
                
                {/* External Link to Google Form */}
                <a 
                  href={activeEvent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-slate-900 px-8 py-3.5 rounded-lg font-bold hover:bg-blue-50 transition-all duration-300 w-full lg:w-auto shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] text-center flex justify-center items-center tracking-wide uppercase text-sm flex-shrink-0"
                >
                  Register Now
                </a>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-sm font-mono text-slate-400 border-b border-slate-700 pb-3 mb-4 uppercase tracking-widest">
                    About the Event
                  </h3>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line font-light text-sm md:text-base">
                    {activeEvent.fullDesc}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-sm font-mono text-slate-400 border-b border-slate-700 pb-3 mb-4 uppercase tracking-widest">
                      Rules & Guidelines
                    </h3>
                    <ul className="text-slate-300 space-y-3 font-light text-sm md:text-base">
                      {activeEvent.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-mono text-slate-400 border-b border-slate-700 pb-3 mb-4 uppercase tracking-widest">
                      Perks & Rewards
                    </h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 font-bold text-xl md:text-2xl leading-snug">
                      {activeEvent.prizes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}