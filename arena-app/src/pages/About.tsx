import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-28 pb-space-xxl flex-grow bg-surface">
        <section className="max-w-4xl mx-auto px-margin lg:px-margin-lg pt-space-lg">
          <div className="flex flex-col items-start gap-4 mb-space-xl">
            <h1 className="font-display-hero text-headline-xl lg:text-display-hero uppercase tracking-tighter text-on-surface leading-none">
              ABOUT THE <br />
              <span className="inline-block bg-primary-container px-4 py-1 rounded-xl shadow-md rotate-[-1deg] mt-2">
                ARENA.
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              The Technical Game Arena is the ultimate proving ground for aspiring engineers, developed for Engineering Day 2026.
            </p>
          </div>

          <div className="space-y-8">
            {/* Tech Fest Arena & Event Info */}
            <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 lg:p-10 shadow-[8px_8px_0px_0px_#1c1b1b]">
              <div className="flex flex-col md:flex-row gap-8 justify-between">
                <div className="flex-1">
                  <h2 className="font-headline-lg text-2xl uppercase text-on-surface mb-4">
                    ENGINEERING DAY 2026
                  </h2>
                  <p className="text-on-surface-variant mb-4">
                    Hosted by the AIDS & AIML Student Guild, the Tech Fest Arena is a high-octane algorithmic clash designed to test the limits of logic, coding prowess, and artificial intelligence understanding.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-secondary text-on-secondary font-label-badge text-xs uppercase px-3 py-1 font-bold border-2 border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                    <span className="material-symbols-outlined text-[14px]">event</span>
                    MARCH 2026 • OFFLINE EVENT
                  </div>
                </div>
                
                <div className="w-full md:w-64 flex-shrink-0 bg-primary-container p-6 border-[3px] border-on-surface rounded-xl shadow-[4px_4px_0px_0px_#1c1b1b] flex flex-col justify-center items-center text-center">
                  <span className="material-symbols-outlined text-5xl text-on-surface mb-2">memory</span>
                  <div className="font-headline-md text-xl uppercase font-bold text-on-surface leading-tight">
                    AIDS & AIML<br/>DEPARTMENT
                  </div>
                </div>
              </div>
            </div>

            {/* Games Breakdown */}
            <div className="bg-surface-container border-[4px] border-on-surface rounded-2xl p-6 lg:p-10 shadow-[8px_8px_0px_0px_#1c1b1b]">
              <h2 className="font-headline-lg text-2xl uppercase text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">extension</span>
                TECHNICAL GAMES
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Game 1 */}
                <div className="bg-surface border-[3px] border-on-surface rounded-xl p-5 shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-on-surface text-surface px-2 py-0.5 rounded font-label-badge font-bold uppercase text-xs">01</span>
                    <h3 className="font-headline-md uppercase text-on-surface">THINK</h3>
                  </div>
                  <h4 className="font-bold text-secondary mb-2">TECHNICAL QUIZ</h4>
                  <p className="text-sm text-on-surface-variant">
                    A rapid-fire multiple choice arena testing fundamental knowledge across algorithms, data structures, and tech trivia.
                  </p>
                </div>

                {/* Game 2 */}
                <div className="bg-surface border-[3px] border-on-surface rounded-xl p-5 shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-on-surface text-surface px-2 py-0.5 rounded font-label-badge font-bold uppercase text-xs">02</span>
                    <h3 className="font-headline-md uppercase text-on-surface">DEBUG</h3>
                  </div>
                  <h4 className="font-bold text-secondary mb-2">CODE DEBUGGING</h4>
                  <p className="text-sm text-on-surface-variant">
                    A live in-browser IDE sandbox where players must identify and resolve logical and syntactical flaws in broken programs.
                  </p>
                </div>

                {/* Game 3 */}
                <div className="bg-surface border-[3px] border-on-surface rounded-xl p-5 shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-on-surface text-surface px-2 py-0.5 rounded font-label-badge font-bold uppercase text-xs">03</span>
                    <h3 className="font-headline-md uppercase text-on-surface">CREATE</h3>
                  </div>
                  <h4 className="font-bold text-secondary mb-2">AI CHALLENGE</h4>
                  <p className="text-sm text-on-surface-variant">
                    A generative AI clash focusing on prompt engineering, constraint adherence, and creative problem solving with LLMs.
                  </p>
                </div>

              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-8">
              <Link
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-error text-on-error font-headline-md text-[18px] uppercase tracking-wider rounded-xl shadow-xl border-[3px] border-on-surface hover:-translate-y-1 active:translate-y-1 transition-all"
                to="/games"
              >
                <span>ENTER THE ARENA</span>
                <span className="material-symbols-outlined font-black text-2xl group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
            
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
