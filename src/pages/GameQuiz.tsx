import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

const GameQuiz = () => {
  const [gameStatus, setGameStatus] = useState("LOADING...");

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await supabase.from("games").select("status").eq("slug", "quiz").single();
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
                ROUND 01
              </span>
              <span className="font-label-code text-xs text-on-surface-variant uppercase">
                SCREENING QUALIFIER
              </span>
            </div>

            <h1 className="font-display-hero text-headline-xl lg:text-display-hero uppercase tracking-tighter text-on-surface leading-none mb-6">
              TECHNICAL QUIZ
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Rapid-fire multiple choice test spanning Data Structures, Machine Learning foundations, Neural Architectures, and Algorithmic Complexity. Speed and accuracy determine your arena seed ranking.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-label-code text-xs mb-8">
              <div className="p-4 bg-surface-container rounded-lg border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant mb-1">STATUS</div>
                <div className="font-bold text-secondary text-sm">{gameStatus}</div>
              </div>
              <div className="p-4 bg-surface-container rounded-lg border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant mb-1">DURATION</div>
                <div className="font-bold text-on-surface text-sm">10 MINUTES</div>
              </div>
              <div className="p-4 bg-surface-container rounded-lg border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant mb-1">QUESTIONS</div>
                <div className="font-bold text-on-surface text-sm">20 MCQs</div>
              </div>
              <div className="p-4 bg-surface-container rounded-lg border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant mb-1">SCORING</div>
                <div className="font-bold text-error text-sm">+1 / -0.25</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-headline-md text-xl uppercase text-on-surface border-b-2 border-on-surface/20 pb-2">
                RULES & DIRECTIVES
              </h3>
              <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
                  <span>Automated anti-tab switch detection is active during the entire quiz window. Navigating away will submit your attempt immediately.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
                  <span>Negative marking of -0.25 is applied for every incorrect answer. Unattempted questions yield 0 points.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
                  <span>Tie-breakers are strictly decided by the total completion time (down to the millisecond telemetry).</span>
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

export default GameQuiz;
