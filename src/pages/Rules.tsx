import Header from "../components/Header";
import Footer from "../components/Footer";

const Rules = () => {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-28 pb-space-xxl flex-grow">
        <section className="max-w-4xl mx-auto px-margin lg:px-margin-lg pt-space-lg">
          <div className="flex flex-col items-center text-center gap-4 mb-space-xl">
            <h1 className="font-display-hero text-headline-xl lg:text-display-hero uppercase tracking-tighter text-on-surface leading-none">
              ARENA RULES & <br />
              <span className="inline-block bg-primary-container px-4 py-1 rounded-xl shadow-md rotate-[-1deg] mt-2">
                DIRECTIVES.
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Strict protocols govern the Technical Game Arena. Violations result in immediate disqualification.
            </p>
          </div>

          <div className="bg-surface-container border-[4px] border-on-surface rounded-2xl p-6 lg:p-10 shadow-[8px_8px_0px_0px_#1c1b1b] space-y-8">
            <div>
              <h2 className="font-headline-lg text-2xl uppercase text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">gavel</span>
                1. General Conduct
              </h2>
              <ul className="list-disc list-inside space-y-2 text-on-surface-variant ml-2">
                <li>No mobile phones, smartwatches, or external communication devices are permitted during active rounds.</li>
                <li>Players must not communicate with other participants unless explicitly allowed in team-based rounds.</li>
                <li>Any attempt to reverse-engineer, DDoS, or maliciously attack the Arena platform will result in a ban from the Tech Fest.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-headline-lg text-2xl uppercase text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">score</span>
                2. Scoring System
              </h2>
              <ul className="list-disc list-inside space-y-2 text-on-surface-variant ml-2">
                <li><strong>Quiz Round:</strong> +1 Point for correct answers, -0.25 for incorrect answers. Unanswered questions receive 0 points.</li>
                <li><strong>Debug Round:</strong> Scored manually out of 100 based on syntax accuracy, logic correction, and optimization.</li>
                <li><strong>AI Prompt Round:</strong> Scored manually out of 100 based on prompt creativity, constraint adherence, and injection prevention.</li>
                <li><strong>Total Score:</strong> Aggregated across all completed rounds. In the event of a tie, total completion time will be used as a tie-breaker.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-headline-lg text-2xl uppercase text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">warning</span>
                3. Anti-Cheat Protocols
              </h2>
              <ul className="list-disc list-inside space-y-2 text-on-surface-variant ml-2">
                <li>Automated tab-switch detection is active. Navigating away from the game screen will auto-submit your attempt.</li>
                <li>Plagiarism checks are enforced on Debug and AI prompt submissions. Copied code will receive a score of 0.</li>
                <li>Using generative AI (ChatGPT, Claude, etc.) outside of the explicitly provided AI round interfaces is strictly prohibited.</li>
              </ul>
            </div>
            
            <div className="pt-6 border-t-[2px] border-on-surface/20 flex items-center gap-4 bg-error/10 p-4 rounded-xl border-error border-l-4">
              <span className="material-symbols-outlined text-error text-3xl">policy</span>
              <p className="font-label-code text-sm text-error uppercase">
                The AIDS & AIML Student Guild reserves the right to make final and binding decisions on all disputes and scoring anomalies.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Rules;
