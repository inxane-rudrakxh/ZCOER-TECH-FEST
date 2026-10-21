import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

const GameDebug = () => {
  const [gameStatus, setGameStatus] = useState("LOADING...");

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await supabase.from("games").select("status").eq("slug", "debug").single();
      if (data) setGameStatus(data.status);
    };
    fetchStatus();
  }, []);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-28 pb-space-xxl flex-grow">
        <section className="max-w-4xl mx-auto px-margin lg:px-margin-lg pt-space-lg">
          <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 lg:p-10 shadow-[8px_8px_0px_0px_#1c1b1b] relative overflow-hidden">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary-container text-on-surface font-label-badge text-xs uppercase font-bold rounded border border-on-surface">
                ROUND 02
              </span>
              <span className="font-label-code text-xs text-on-surface-variant uppercase">
                ALGORITHMIC TRIALS
              </span>
            </div>

            <h1 className="font-display-hero text-headline-xl lg:text-display-hero uppercase tracking-tighter text-on-surface leading-none mb-6">
              CODE DEBUGGING
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Live in-browser IDE sandbox. You are provided with intentionally broken, highly-obfuscated algorithms. Find the bugs, patch the logic, and pass all hidden test cases.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-label-code text-xs mb-8">
              <div className="p-4 bg-surface-container rounded-lg border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant mb-1">STATUS</div>
                <div className="font-bold text-secondary text-sm">{gameStatus}</div>
              </div>
              <div className="p-4 bg-surface-container rounded-lg border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant mb-1">DURATION</div>
                <div className="font-bold text-on-surface text-sm">20 MINUTES</div>
              </div>
              <div className="p-4 bg-surface-container rounded-lg border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant mb-1">FORMAT</div>
                <div className="font-bold text-on-surface text-sm">3 SCRIPTS</div>
              </div>
              <div className="p-4 bg-surface-container rounded-lg border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant mb-1">SCORING</div>
                <div className="font-bold text-on-surface text-sm">100 PTS EACH</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-headline-md text-xl uppercase text-on-surface border-b-2 border-on-surface/20 pb-2">
                RULES & DIRECTIVES
              </h3>
              <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
                  <span>Supported languages: Python 3, JavaScript (Node.js), and C++. Select your environment when the round begins.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
                  <span>Your code will be run against up to 15 hidden test cases. Partial points are awarded based on the percentage of passed cases.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
                  <span>Do not change the function signature. You must return the expected types.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t-2 border-on-surface/20">
              <Link
                to="/leaderboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-secondary text-on-secondary font-headline-md text-[16px] uppercase tracking-wider rounded-xl shadow-[4px_4px_0px_0px_#1c1b1b] border-[3px] border-on-surface hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
              >
                <span className="material-symbols-outlined">leaderboard</span>
                <span>VIEW LEADERBOARD</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GameDebug;
