// @ts-nocheck
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const Home = () => {
  const [activeTab, setActiveTab] = useState("round-1");
  const [playerCount, setPlayerCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { count } = await supabase
          .from("participants")
          .select("*", { count: "exact", head: true });
        
        if (count !== null) setPlayerCount(count);
      } catch (err) {
        console.error("Error fetching telemetry:", err);
      }
    };

    fetchCount();

    const channel = supabase.channel('realtime-telemetry')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'participants' },
        () => {
          setPlayerCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen">
      <Header />
      <main className="w-full pt-28 bg-surface">
        <div className="flex flex-col w-full">
          {/* MINI TOP TICKER RIBBON */}
          <div className="w-full bg-primary-container text-on-surface py-2.5 overflow-hidden shadow-md">
            <div className="animate-marquee whitespace-nowrap font-label-ticker text-label-ticker uppercase tracking-widest font-extrabold">
              <span className="mx-6 flex items-center gap-4">
                <span>✦</span> TECHNICAL GAME ARENA <span>✦</span> ENGINEERING
                DAY 2026 <span>✦</span> AIDS &amp; AIML DEPARTMENT{" "}
                <span>✦</span> THINK • BUILD • DEBUG • CREATE <span>✦</span>{" "}
                HIGH OCTANE ALGORITHMIC CLASH <span>✦</span> {playerCount} SQUADS ACTIVE
              </span>
              <span className="mx-6 flex items-center gap-4">
                <span>✦</span> TECHNICAL GAME ARENA <span>✦</span> ENGINEERING
                DAY 2026 <span>✦</span> AIDS &amp; AIML DEPARTMENT{" "}
                <span>✦</span> THINK • BUILD • DEBUG • CREATE <span>✦</span>{" "}
                HIGH OCTANE ALGORITHMIC CLASH <span>✦</span> {playerCount} SQUADS ACTIVE
              </span>
            </div>
          </div>
          {/* HERO SECTION */}
          <section className="w-full px-margin lg:px-margin-lg py-space-xl lg:py-space-xxl relative overflow-hidden bg-surface">
            {/* Ambient Accent Gradients */}
            <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-primary-container/30 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-4 left-1/4 w-80 h-80 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
              {/* Left Column: Typographic Powerhouse */}
              <div className="lg:col-span-7 flex flex-col items-start gap-space-md z-10">
                {/* Badge row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container text-on-surface font-label-badge text-label-badge uppercase shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                    ARENA ENROLLMENT CLOSING IN 04H : 12M
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-badge text-label-badge uppercase">
                    <span className="material-symbols-outlined text-[16px]">
                      terminal
                    </span>
                    CAMPUS BLK 4 LABS
                  </span>
                </div>
                {/* Giant Poster Headline */}
                <div className="flex flex-col">
                  <h1 className="font-display-hero text-display-hero text-on-surface uppercase tracking-tighter leading-none select-none">
                    <span className="inline-block bg-primary-container text-on-surface px-3 py-1 rounded-xl shadow-md rotate-[-1deg] mb-2 mt-2">
                      THINK.
                    </span>
                    <br />
                    <span className="inline-block bg-secondary text-on-secondary px-3 py-1 rounded-xl shadow-md rotate-[1.5deg] mb-2">
                      DEBUG.
                    </span>
                    <br />
                    <span className="text-on-surface inline-block">CREATE.</span>
                  </h1>
                </div>
                {/* Subheading */}
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  One technical game. Three independent challenges: Quiz, Code
                  Debugging, and AI Prompt Challenge. Orchestrated exclusively
                  by the{" "}
                  <strong className="text-on-surface">
                    AIDS &amp; AIML Student Guild
                  </strong>
                  .
                </p>
                {/* CTA Action Cluster */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-inverse-surface text-inverse-on-surface font-headline-md text-[18px] uppercase tracking-wider rounded-xl shadow-[6px_6px_0px_0px_var(--tw-colors-secondary)] hover:-translate-y-1 active:translate-y-1 transition-all border-[3px] border-on-surface relative overflow-hidden"
                    href="#pipeline"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:animate-pulse pointer-events-none"></div>
                    <span className="w-3 h-3 rounded-full bg-error animate-ping"></span>
                    <span className="relative z-10">INITIALIZE SEQUENCE</span>
                    <span className="material-symbols-outlined font-black text-2xl group-hover:rotate-90 transition-transform relative z-10">
                      arrow_forward
                    </span>
                  </a>
                  <Link
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-secondary text-on-secondary font-headline-md text-[16px] uppercase tracking-wider rounded-xl shadow-md hover:-translate-y-0.5 active:translate-y-0.5 transition-all border-[3px] border-on-surface"
                    to="/leaderboard"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      leaderboard
                    </span>
                    <span>VIEW LEADERBOARD</span>
                  </Link>
                </div>
                {/* Metric micro-strip */}
                <div className="flex flex-wrap items-center gap-6 pt-3 font-label-code text-label-code text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      verified
                    </span>
                    <span>COLLEGE-WIDE RECOGNIZED</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      bolt
                    </span>
                    <span>INSTANT LEADERBOARD SYNC</span>
                  </div>
                </div>
              </div>
              {/* Right Column: Neo-brutalist Retro Tech Composition */}
              <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
                {/* Floating Sticker Badges */}
                <div className="absolute -top-4 right-6 z-20 bg-secondary text-on-secondary px-4 py-2 rounded-xl shadow-xl rotate-12 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">
                    military_tech
                  </span>
                  <span className="font-label-badge text-label-badge uppercase tracking-wider font-extrabold">
                    RANK #01 AWAITS
                  </span>
                </div>
                <div className="absolute bottom-4 -left-4 z-20 bg-primary-container text-on-surface px-4 py-2 rounded-xl shadow-xl -rotate-6 flex items-center gap-2">
                  <span className="font-label-code text-label-code font-extrabold">
                    {"{ ; }"} CODE READY
                  </span>
                </div>
                {/* Main Arcade Terminal Canvas */}
                <div className="w-full bg-inverse-surface text-inverse-on-surface rounded-2xl shadow-xl p-6 relative overflow-hidden">
                  {/* CRT Screen Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 bg-inverse-surface/80 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-error inline-block"></span>
                      <span className="w-3.5 h-3.5 rounded-full bg-primary-container inline-block"></span>
                      <span className="w-3.5 h-3.5 rounded-full bg-secondary-container inline-block"></span>
                      <span className="ml-2 font-label-code text-xs uppercase tracking-widest text-surface-variant">
                        TERMINAL://ENG-ARENA-V4
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-container-highest/20 font-label-badge text-[11px] text-primary-container">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
                      MATCH ONLINE
                    </div>
                  </div>
                  {/* Screen Core Art */}
                  <div className="bg-black/60 rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    {/* Scanlines overlay effect via pure SVG */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          height="4"
                          id="scanlines"
                          patternUnits="userSpaceOnUse"
                          width="100"
                        >
                          <line
                            className="text-primary-container"
                            stroke="currentColor"
                            stroke-width="2"
                            x1="0"
                            x2="100"
                            y1="0"
                            y2="0"
                          />
                        </pattern>
                      </defs>
                      <rect fill="url(#scanlines)" height="100%" width="100%" />
                    </svg>
                    {/* Retro Computer Monitor Face */}
                    <div className="relative mb-4">
                      <div className="w-28 h-28 rounded-2xl bg-surface-container flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                        <span className="font-display-hero text-headline-xl text-on-surface leading-none select-none">
                          ◕‿◕
                        </span>
                        <span className="font-label-badge text-[10px] text-secondary font-black uppercase mt-1">
                          SYS: READY
                        </span>
                      </div>
                      {/* Floating Question Marks */}
                      <span className="absolute -top-2 -right-3 text-primary-container font-headline-lg animate-bounce select-none">
                        ?
                      </span>
                      <span className="absolute -bottom-1 -left-3 text-secondary-fixed font-headline-md animate-pulse select-none">
                        !
                      </span>
                    </div>
                    {/* Monospaced Code Telemetry */}
                    <div className="w-full bg-surface-container-highest/10 rounded-lg p-3 text-left font-label-code text-xs space-y-1 text-surface-variant">
                      <p className="text-primary-container">
                        <span className="text-secondary-fixed">&gt;&gt;</span>{" "}
                        arena.init(rounds=3, teams=64)
                      </p>
                      <p className="text-surface-bright">
                        <span className="text-secondary-fixed">&gt;&gt;</span>{" "}
                        status: {playerCount} players waiting in lobby
                      </p>
                      <p className="text-secondary-fixed-dim">
                        <span className="text-secondary-fixed">&gt;&gt;</span>{" "}
                        neural_evaluator: READY
                      </p>
                      <p className="text-primary-fixed-dim">
                        <span className="text-secondary-fixed">&gt;&gt;</span>{" "}
                        prompt_battle_matrix: ACTIVE
                      </p>
                    </div>
                    {/* Arcade Joystick Glyph / Trophy Starburst */}
                    <div className="mt-4 flex items-center justify-center gap-4 text-on-surface">
                      <span className="px-3 py-1 rounded bg-primary-container text-on-primary-fixed font-label-badge text-xs uppercase font-bold">
                        ⚡ 120 FPS TELEMETRY
                      </span>
                      <span className="px-3 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-badge text-xs uppercase font-bold">
                        🏆 TOP 3 CERTIFICATES
                      </span>
                    </div>
                  </div>
                  {/* Bottom Footer Bar of Terminal */}
                  <div className="mt-4 flex items-center justify-between font-label-code text-xs text-surface-variant">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-primary-container">
                        memory
                      </span>
                      LATENCY: 12MS
                    </span>
                    <span className="text-primary-container font-bold">
                      HOSTED BY AIDS &amp; AIML
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* QUICK HIGHLIGHTS GRID */}
          <section className="w-full px-margin lg:px-margin-lg py-space-lg bg-surface-container-low">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Card 1: Live Players Ready (Yellow block) */}
              <div className="p-space-lg rounded-2xl bg-primary-container text-on-surface shadow-lg flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-on-surface text-primary-container font-label-badge text-label-badge uppercase">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
                    LIVE LOBBY
                  </span>
                  <span className="material-symbols-outlined text-3xl">
                    group
                  </span>
                </div>
                <div>
                  <div className="font-display-hero text-headline-xl text-on-surface tracking-tight leading-none mb-1">
                    {playerCount || 0}
                  </div>
                  <p className="font-headline-md text-headline-md uppercase text-on-surface leading-tight">
                    PLAYERS REGISTERED
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                    Slots filling rapidly across first, second, and third year
                    cohorts. Multi-department entry.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-on-surface/20 flex items-center justify-between font-label-code text-xs">
                  <span>CAPACITY: 500 MAX</span>
                  <span className="font-bold uppercase">85% BOOKED</span>
                </div>
              </div>
              {/* Card 2: Prize Pool & Trophies (Blue block) */}
              <div className="p-space-lg rounded-2xl bg-secondary text-on-secondary shadow-lg flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-secondary text-secondary font-label-badge text-label-badge uppercase font-bold">
                    <span className="material-symbols-outlined text-[16px]">
                      military_tech
                    </span>
                    OFFICIAL BOUNTY
                  </span>
                  <span className="material-symbols-outlined text-3xl">
                    emoji_events
                  </span>
                </div>
                <div>
                  <div className="font-display-hero text-headline-xl tracking-tight leading-none mb-1 text-primary-container">
                    CERTIFICATE
                  </div>
                  <p className="font-headline-md text-headline-md uppercase text-on-secondary leading-tight">
                    FOR TOP 3 WINNERS
                  </p>
                  <p className="font-body-md text-body-md text-on-secondary-container mt-2">
                    Exclusive verified merit certificates for the top 3 grand stage finalists.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-on-secondary/20 flex items-center justify-between font-label-code text-xs">
                  <span>STAGE CASH BONUSES</span>
                  <span className="font-bold text-primary-container uppercase">
                    CERTIFICATES FOR ALL
                  </span>
                </div>
              </div>
              {/* Card 3: Organizer & Host (White block) */}
              <div className="p-space-lg rounded-2xl bg-surface-container-lowest text-on-surface shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-badge text-label-badge uppercase font-bold">
                    <span className="material-symbols-outlined text-[16px]">
                      school
                    </span>
                    ACADEMIC ARENA
                  </span>
                  <span className="material-symbols-outlined text-3xl text-secondary">
                    hub
                  </span>
                </div>
                <div>
                  <div className="font-label-badge text-label-badge uppercase tracking-wider text-secondary font-bold mb-1">
                    ENGINEERING DAY 2026
                  </div>
                  <p className="font-headline-md text-headline-md uppercase text-on-surface leading-tight">
                    DEPT OF AIDS &amp; AIML
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                    Curated by departmental faculty convenors &amp; student
                    guild leads. Sandboxed high-spec computing labs.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-outline-variant flex items-center justify-between font-label-code text-xs text-on-surface-variant">
                  <span>BLOCK 04 • LAB MATRIX</span>
                  <span className="font-bold text-on-surface uppercase">
                    OCT 15 • 09:00 AM
                  </span>
                </div>
              </div>
            </div>
          </section>
          {/* PERSISTENT STAGE PIPELINE STRIP */}
          <section
            className="w-full bg-surface-container py-space-xl px-margin lg:px-margin-lg"
            id="pipeline"
          >
            <div className="max-w-7xl mx-auto space-y-space-md">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="font-label-badge text-label-badge uppercase tracking-widest text-secondary font-bold">
                    COMPETITION BLUEPRINT
                  </span>
                  <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl uppercase text-on-surface leading-none mt-1">
                    STAGE PIPELINE
                  </h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                  Elimination rounds flow sequentially across 3 independent
                  challenges. Clear each stage checkpoint within the time
                  ceiling to qualify for subsequent rounds.
                </p>
              </div>
              {/* Pipeline Horizontal Sequence Strip (4 stages total + Grand Winner) */}
              <div className="w-full overflow-x-auto pb-4">
                <div className="min-w-[850px] flex items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl shadow-md">
                  {/* Stage 01 */}
                  <div className="flex-1 bg-primary-container text-on-surface p-4 rounded-xl shadow-sm relative">
                    <span className="font-label-badge text-[11px] font-black uppercase text-on-primary-container">
                      STAGE 01
                    </span>
                    <div className="font-headline-md text-[16px] uppercase leading-tight mt-1">
                      REGISTRATION
                    </div>
                    <div className="inline-flex items-center gap-1 font-label-code text-[11px] font-bold text-on-surface mt-2 bg-on-surface/10 px-2 py-0.5 rounded">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                      PORTAL OPEN
                    </div>
                  </div>
                  <span className="font-headline-md text-on-surface-variant text-xl">
                    ➔
                  </span>
                  {/* Stage 02 */}
                  <div className="flex-1 bg-surface-container-high text-on-surface p-4 rounded-xl shadow-sm">
                    <span className="font-label-badge text-[11px] font-black uppercase text-on-surface-variant">
                      STAGE 02
                    </span>
                    <div className="font-headline-md text-[16px] uppercase leading-tight mt-1">
                      ROUND 01: TECH QUIZ
                    </div>
                    <div className="font-label-code text-[11px] text-on-surface-variant mt-2">
                      20 Questions • 10 Min
                    </div>
                  </div>
                  <span className="font-headline-md text-on-surface-variant text-xl">
                    ➔
                  </span>
                  {/* Stage 03 */}
                  <div className="flex-1 bg-surface-container-high text-on-surface p-4 rounded-xl shadow-sm">
                    <span className="font-label-badge text-[11px] font-black uppercase text-on-surface-variant">
                      STAGE 03
                    </span>
                    <div className="font-headline-md text-[16px] uppercase leading-tight mt-1">
                      ROUND 02: CODE DEBUG
                    </div>
                    <div className="font-label-code text-[11px] text-on-surface-variant mt-2">
                      Web IDE • Tensor &amp; Syntax • 20 Min
                    </div>
                  </div>
                  <span className="font-headline-md text-on-surface-variant text-xl">
                    ➔
                  </span>
                  {/* Stage 04 */}
                  <div className="flex-1 bg-surface-container-high text-on-surface p-4 rounded-xl shadow-sm">
                    <span className="font-label-badge text-[11px] font-black uppercase text-on-surface-variant">
                      STAGE 04
                    </span>
                    <div className="font-headline-md text-[16px] uppercase leading-tight mt-1">
                      ROUND 03: AI PROMPT
                    </div>
                    <div className="font-label-code text-[11px] text-on-surface-variant mt-2">
                      Image &amp; Video Synthesis • Final Arena
                    </div>
                  </div>
                  <span className="font-headline-md text-on-surface-variant text-xl">
                    ➔
                  </span>
                  {/* Grand Winner */}
                  <div className="flex-1 bg-secondary text-on-secondary p-4 rounded-xl shadow-sm">
                    <span className="font-label-badge text-[11px] font-black uppercase text-primary-container">
                      FINAL PODIUM
                    </span>
                    <div className="font-headline-md text-[16px] uppercase leading-tight mt-1">
                      GRAND WINNER
                    </div>
                    <div className="font-label-code text-[11px] text-on-secondary-container mt-2">
                      Certificate of Merit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* INTERACTIVE STAGE SELECTOR PREVIEW TABS */}
          <section
            className="w-full px-margin lg:px-margin-lg py-space-xxl bg-surface"
            id="rounds"
          >
            <div className="max-w-7xl mx-auto space-y-space-xl">
              {/* Section Header */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="inline-block px-4 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-label-badge uppercase font-bold">
                  MISSION BRIEFING // 3 INDEPENDENT BATTLES
                </span>
                <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl uppercase text-on-surface leading-tight">
                  EXPLORE THE 3 ARENA GAMES
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Click each battle selector below to inspect rules, challenge
                  parameters, telemetry formats, and scoring matrices.
                </p>
              </div>
              {/* Tab Buttons Navigation Strip (3 Battles Only) */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  className={`stage-tab-btn px-6 py-3.5 rounded-xl font-headline-md text-[15px] uppercase tracking-wider border-[2px] border-on-surface transition-all ${activeTab === "round-1" ? "bg-primary-container text-on-surface shadow-md" : "bg-surface-container text-on-surface shadow-sm hover:-translate-y-0.5"}`}
                  id="tab-btn-round-1"
                  onClick={() => setActiveTab("round-1")}
                >
                  ROUND 01: TECH QUIZ
                </button>
                <button
                  className={`stage-tab-btn px-6 py-3.5 rounded-xl font-headline-md text-[15px] uppercase tracking-wider border-[2px] border-on-surface transition-all ${activeTab === "round-3" ? "bg-primary-container text-on-surface shadow-md" : "bg-surface-container text-on-surface shadow-sm hover:-translate-y-0.5"}`}
                  id="tab-btn-round-3"
                  onClick={() => setActiveTab("round-3")}
                >
                  ROUND 02: CODE DEBUGGING
                </button>
                <button
                  className={`stage-tab-btn px-6 py-3.5 rounded-xl font-headline-md text-[15px] uppercase tracking-wider border-[2px] border-on-surface transition-all ${activeTab === "round-4" ? "bg-primary-container text-on-surface shadow-md" : "bg-surface-container text-on-surface shadow-sm hover:-translate-y-0.5"}`}
                  id="tab-btn-round-4"
                  onClick={() => setActiveTab("round-4")}
                >
                  ROUND 03: AI PROMPT BATTLE
                </button>
              </div>
              {/* Tab Contents Container */}
              <div className="w-full grid">
                {/* TAB 1: TECH QUIZ */}
                <div
                  className={`stage-content-panel col-start-1 row-start-1 transition-all duration-500 ease-out ${activeTab === "round-1" ? "opacity-100 translate-y-0 z-10 pointer-events-auto" : "opacity-0 translate-y-8 z-0 pointer-events-none"}`}
                  id="round-1"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter rounded-2xl bg-surface-container-lowest p-space-lg lg:p-space-xl shadow-lg border-[3px] border-on-surface">
                    <div className="lg:col-span-7 space-y-space-md">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-primary-container text-on-surface font-label-badge text-xs uppercase font-bold rounded border border-on-surface">
                          ROUND 01
                        </span>
                        <span className="font-label-code text-xs text-on-surface-variant uppercase">
                          SCREENING QUALIFIER
                        </span>
                      </div>
                      <h3 className="font-headline-lg text-headline-lg uppercase text-on-surface">
                        NEURAL SPEED QUIZ: 20 QUESTIONS
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Rapid-fire multiple choice test spanning Data
                        Structures, Machine Learning foundations, Neural
                        Architectures, and Algorithmic Complexity. Speed and
                        accuracy determine your arena seed ranking.
                      </p>
                      {/* Specs list */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-label-code text-xs">
                        <div className="p-3 bg-surface-container rounded-lg border border-on-surface">
                          <div className="text-on-surface-variant">
                            DURATION
                          </div>
                          <div className="font-bold text-on-surface text-sm mt-0.5">
                            10 MINUTES
                          </div>
                        </div>
                        <div className="p-3 bg-surface-container rounded-lg border border-on-surface">
                          <div className="text-on-surface-variant">
                            QUESTION COUNT
                          </div>
                          <div className="font-bold text-on-surface text-sm mt-0.5">
                            20 MCQs
                          </div>
                        </div>
                        <div className="p-3 bg-surface-container rounded-lg border border-on-surface">
                          <div className="text-on-surface-variant">
                            NEGATIVE MARKING
                          </div>
                          <div className="font-bold text-error text-sm mt-0.5">
                            -0.25 PER WRONG
                          </div>
                        </div>
                      </div>
                      {/* Rules & checklist */}
                      <div className="space-y-2 pt-2">
                        <div className="font-headline-md text-[14px] uppercase text-on-surface">
                          ROUND DIRECTIVES:
                        </div>
                        <ul className="space-y-1.5 font-body-md text-body-md text-on-surface-variant">
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[18px]">
                              check_circle
                            </span>
                            Automated anti-tab switch detection active during
                            the entire window.
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[18px]">
                              check_circle
                            </span>
                            Top 24 squads with the highest percentile advance to
                            Round 02 Code Debugging.
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[18px]">
                              check_circle
                            </span>
                            Tie-breaker decided by completion timestamp down to
                            millisecond telemetry.
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* Quiz Simulator Mini-card */}
                    <div className="lg:col-span-5 bg-surface-container rounded-xl p-space-md shadow-sm border border-on-surface flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-outline-variant font-label-code text-xs">
                          <span className="text-secondary font-bold">
                            PREVIEW QUESTION #07
                          </span>
                          <span className="bg-primary-container px-2 py-0.5 rounded text-on-surface font-bold border border-on-surface">
                            TIMER: 00:42
                          </span>
                        </div>
                        <div className="mt-4 font-body-lg text-on-surface font-semibold">
                          What is the computational complexity of
                          backpropagation per training sample in a fully
                          connected MLP layer with \(d_1\) inputs and \(d_2\)
                          outputs?
                        </div>
                        <div className="mt-4 space-y-2 font-label-code text-xs">
                          <div className="p-2.5 rounded-lg bg-surface-container-lowest hover:bg-primary-container/30 transition-colors cursor-pointer flex items-center justify-between border border-on-surface/20">
                            <span>A. O(d₁ × d₂)</span>
                            <span className="text-secondary font-bold">
                              ✓ CORRECT
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-surface-container-lowest hover:bg-primary-container/30 transition-colors cursor-pointer border border-on-surface/20">
                            <span>B. O(d₁² + d₂²)</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-surface-container-lowest hover:bg-primary-container/30 transition-colors cursor-pointer border border-on-surface/20">
                            <span>C. O(log(d₁ × d₂))</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 p-3 bg-secondary-fixed text-on-secondary-fixed rounded-lg font-label-badge text-xs border border-on-surface">
                        ✦ 24 Teams will survive this cut to Code Debugging
                      </div>
                    </div>
                  </div>
                </div>
                {/* TAB 2: CODE DEBUGGING */}
                <div
                  className={`stage-content-panel col-start-1 row-start-1 transition-all duration-500 ease-out ${activeTab === "round-3" ? "opacity-100 translate-y-0 z-10 pointer-events-auto" : "opacity-0 translate-y-8 z-0 pointer-events-none"}`}
                  id="round-3"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter rounded-2xl bg-surface-container-lowest p-space-lg lg:p-space-xl shadow-lg border-[3px] border-on-surface">
                    <div className="lg:col-span-7 space-y-space-md">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-primary-container text-on-surface font-label-badge text-xs uppercase font-bold rounded border border-on-surface">
                          ROUND 02
                        </span>
                        <span className="font-label-code text-xs text-on-surface-variant uppercase">
                          HARDCORE PROGRAMMING
                        </span>
                      </div>
                      <h3 className="font-headline-lg text-headline-lg uppercase text-on-surface">
                        SANDBOX CODE DEBUG COMBAT
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Live in-browser IDE sandbox. Three intentionally broken
                        codebases (Python PyTorch tensor shape mismatch, C++
                        memory leak, and SQL recursive CTE deadlock). Squash all
                        runtime anomalies and unit-test failures against the
                        clock.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-label-code text-xs">
                        <div className="p-3 bg-surface-container rounded-lg border border-on-surface">
                          <div className="text-on-surface-variant">
                            DURATION
                          </div>
                          <div className="font-bold text-on-surface text-sm mt-0.5">
                            20 MINUTES
                          </div>
                        </div>
                        <div className="p-3 bg-surface-container rounded-lg border border-on-surface">
                          <div className="text-on-surface-variant">
                            LANGUAGES
                          </div>
                          <div className="font-bold text-on-surface text-sm mt-0.5">
                            PYTHON / C++ / SQL
                          </div>
                        </div>
                        <div className="p-3 bg-surface-container rounded-lg border border-on-surface">
                          <div className="text-on-surface-variant">
                            FINALISTS CUT
                          </div>
                          <div className="font-bold text-secondary text-sm mt-0.5">
                            TOP 8 FINALISTS
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 pt-2">
                        <div className="font-headline-md text-[14px] uppercase text-on-surface">
                          ROUND DIRECTIVES:
                        </div>
                        <ul className="space-y-1.5 font-body-md text-body-md text-on-surface-variant">
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[18px]">
                              check_circle
                            </span>
                            Dockerized sandbox containers with real-time PyTest
                            execution feedback.
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[18px]">
                              check_circle
                            </span>
                            Points awarded dynamically for passing both public
                            &amp; hidden assertions.
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[18px]">
                              check_circle
                            </span>
                            Only top 8 squads secure seats on the Arena Finalist
                            Stage.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="lg:col-span-5 bg-inverse-surface text-inverse-on-surface rounded-xl p-space-md shadow-sm border border-on-surface flex flex-col justify-between font-label-code">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest/20 text-xs">
                          <span className="text-error font-bold">
                            ● BUG #02: TENSOR DIM MISMATCH
                          </span>
                          <span className="text-surface-variant">model.py</span>
                        </div>
                        <div className="mt-4 p-3 bg-black/50 rounded-lg text-xs space-y-1.5">
                          <p className="text-surface-variant">
                            # Tensor shape mismatch during backward pass
                          </p>
                          <p className="text-error">
                            12 - loss = criterion(outputs, targets.squeeze())
                          </p>
                          <p className="text-primary-container">
                            13 + loss = criterion(outputs.view(-1, C), targets)
                          </p>
                          <p className="text-surface-variant">
                            14 loss.backward()
                          </p>
                          <p className="text-secondary-fixed">
                            15 optimizer.step()
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs">
                          <span className="text-error font-bold">
                            RuntimeError:
                          </span>
                          <span className="text-surface-variant">
                            Expected target size [32, 10], got [32]
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 p-3 bg-error text-on-error rounded-lg text-xs font-bold text-center border border-on-surface">
                        ✦ 8 ELITE CODERS ADVANCE TO PROMPT CLASH
                      </div>
                    </div>
                  </div>
                </div>
                {/* TAB 3: AI PROMPT BATTLE */}
                <div
                  className={`stage-content-panel col-start-1 row-start-1 transition-all duration-500 ease-out ${activeTab === "round-4" ? "opacity-100 translate-y-0 z-10 pointer-events-auto" : "opacity-0 translate-y-8 z-0 pointer-events-none"}`}
                  id="round-4"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter rounded-2xl bg-surface-container-lowest p-space-lg lg:p-space-xl shadow-lg border-[3px] border-on-surface">
                    <div className="lg:col-span-7 space-y-space-md">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-secondary text-on-secondary font-label-badge text-xs uppercase font-bold rounded border border-on-surface">
                          ROUND 03 • FINALS
                        </span>
                        <span className="font-label-code text-xs text-secondary font-bold uppercase">
                          THE ULTIMATE CLASH
                        </span>
                      </div>
                      <h3 className="font-headline-lg text-headline-lg uppercase text-on-surface">
                        GENERATIVE AI PROMPT CLASH
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        The pinnacle finale. The 8 surviving finalist teams face
                        off on the main auditorium stage. Synthesize
                        high-fidelity multimodal prompts (Image &amp; Video
                        diffusion models) to recreate target reference art and
                        solve neural constraints in real time.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-label-code text-xs">
                        <div className="p-3 bg-surface-container rounded-lg border border-on-surface">
                          <div className="text-on-surface-variant">STAGE</div>
                          <div className="font-bold text-on-surface text-sm mt-0.5">
                            MAIN AUDITORIUM
                          </div>
                        </div>
                        <div className="p-3 bg-surface-container rounded-lg border border-on-surface">
                          <div className="text-on-surface-variant">
                            EVALUATION
                          </div>
                          <div className="font-bold text-on-surface text-sm mt-0.5">
                            CLIP SCORE + JURY
                          </div>
                        </div>
                        <div className="p-3 bg-surface-container rounded-lg border border-on-surface">
                          <div className="text-on-surface-variant">STAKES</div>
                          <div className="font-bold text-secondary text-sm mt-0.5">
                            ₹25K + TROPHY
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 pt-2">
                        <div className="font-headline-md text-[14px] uppercase text-on-surface">
                          ROUND DIRECTIVES:
                        </div>
                        <ul className="space-y-1.5 font-body-md text-body-md text-on-surface-variant">
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[18px]">
                              check_circle
                            </span>
                            Dual arena screens broadcasting real-time diffusion
                            denoising steps.
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[18px]">
                              check_circle
                            </span>
                            Strict prompt token budget (max 75 CLIP tokens).
                            Negative prompt permitted.
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[18px]">
                              check_circle
                            </span>
                            Live audience reaction meter counts towards 15%
                            bonus multiplier.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="lg:col-span-5 bg-surface-container rounded-xl p-space-md shadow-sm border border-on-surface flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-outline-variant font-label-code text-xs">
                          <span className="text-secondary font-bold">
                            TARGET GENERATION MATCH
                          </span>
                          <span className="bg-primary-container px-2 py-0.5 rounded font-bold text-on-surface border border-on-surface">
                            SIMILARITY: 94.2%
                          </span>
                        </div>
                        <div className="mt-4 rounded-lg overflow-hidden relative shadow-inner border border-on-surface">
                          <img
                            className="w-full h-44 object-cover"
                            data-alt="Futuristic neon cybernetic engineering robot competing in an arcade tournament, bright primary yellow and electric cobalt blue lighting, hyper-detailed mechanical joints, retro CRT monitor reflections, digital poster aesthetics with high contrast shadows"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs17ADGkkqbsNneAja01F0Mrzu9VSPvaqmWlsPSNkhX7S8wTGIZgbkVFO5pbaJ7mr624KzawwC3G29hr_e8HeYezUh17zu4hRcZ335yQayl0tOc4jLZoXmkjLQ3Kwj4xGfZ22-WTHgEixgr-ifG0Yf2VXNE1TnZO5YIpxRG7zu3FXyAgUXi-vNwKM44OThx8jVzWqo0ZMUkGMfr4AH2nMjF7OTVj2PexiPHvXpWvyUjbiVEw6ZsAnt"
                          />
                          <div className="absolute bottom-2 left-2 bg-on-surface/80 backdrop-blur-sm text-primary-container px-2.5 py-1 rounded font-label-badge text-[11px]">
                            DIFFUSION STEPS: 35/35
                          </div>
                        </div>
                        <p className="font-label-code text-xs text-on-surface-variant mt-3">
                          Prompt: "Isometric brutalist laboratory, cybernetic
                          robot typing at glowing keyboard, volumetric yellow
                          spotlight, high contrast..."
                        </p>
                      </div>
                      <div className="mt-6 p-3 bg-secondary text-on-secondary rounded-lg font-label-badge text-xs font-bold text-center border border-on-surface">
                        ✦ 1 GRAND CHAMPION CROWNED
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTION SCRIPT FOR STAGE SELECTOR & REGISTRATION */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
