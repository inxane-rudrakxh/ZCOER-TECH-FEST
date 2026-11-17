import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { OOPS_QUESTIONS } from "../data/oopsQuestions";

const OopsHub = () => {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />

      <main className="w-full pt-28 pb-space-xxl flex-grow">
        <section className="max-w-6xl mx-auto px-4 lg:px-8 pt-8">
          
          {/* Header Banner */}
          <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 lg:p-10 shadow-[8px_8px_0px_0px_#1c1b1b] relative overflow-hidden mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3.5 py-1 bg-primary-container text-on-surface font-label-badge text-xs uppercase font-bold rounded border border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                S.Y. B.Tech (AI &amp; DS)
              </span>
              <span className="px-3.5 py-1 bg-secondary text-on-secondary font-label-badge text-xs uppercase font-bold rounded border border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                SUBJECT: OOPS IN C++
              </span>
              <span className="font-label-code text-xs text-on-surface-variant uppercase font-bold ml-auto">
                ZEAL COLLEGE OF ENGINEERING &amp; RESEARCH
              </span>
            </div>

            <h1 className="font-display-hero text-3xl sm:text-5xl uppercase tracking-tighter text-on-surface leading-tight mb-4">
              OBJECT ORIENTED PROGRAMMING IN C++
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-8">
              Official assessment and interactive logic arena covering core Object-Oriented paradigms: 
              <strong> Single/Multiple/Diamond Inheritance</strong>, <strong>Virtual Base Classes</strong>, 
              <strong> Compile-Time Overloading</strong>, <strong>Runtime Dynamic Dispatch (vtable)</strong>, 
              and <strong>Pure Virtual Contracts</strong>.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-label-code text-xs">
              <div className="p-4 bg-surface-container rounded-xl border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant uppercase mb-1">TOTAL MCQS</div>
                <div className="font-bold text-secondary text-lg">20 QUESTIONS</div>
              </div>
              <div className="p-4 bg-surface-container rounded-xl border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant uppercase mb-1">PUZZLE LEVELS</div>
                <div className="font-bold text-on-surface text-lg">4 ARCHITECTURES</div>
              </div>
              <div className="p-4 bg-surface-container rounded-xl border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant uppercase mb-1">AGGREGATE MARKS</div>
                <div className="font-bold text-on-surface text-lg">40 MARKS TOTAL</div>
              </div>
              <div className="p-4 bg-surface-container rounded-xl border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="text-on-surface-variant uppercase mb-1">EXPORT FORMATS</div>
                <div className="font-bold text-error text-lg">PDF &amp; CSV (EXCEL)</div>
              </div>
            </div>
          </div>

          {/* 2 Main Test Tracks: Quiz & Puzzle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Card 1: Quiz */}
            <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1c1b1b] flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center font-headline-md text-xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                    01
                  </span>
                  <span className="bg-primary-container px-3 py-1 rounded font-label-badge text-xs uppercase font-bold border border-on-surface">
                    15 MINS • 20 MARKS
                  </span>
                </div>

                <h2 className="font-headline-xl text-2xl sm:text-3xl uppercase tracking-tight text-on-surface mb-3">
                  OOPS IN C++ MCQ QUIZ
                </h2>

                <p className="font-body-md text-on-surface-variant mb-6">
                  20 rigorously vetted questions directly from the syllabus:
                  10 questions on <strong>Inheritance</strong> (Access specifiers, Constructor order, Diamond inheritance, Friend &amp; Nested classes) + 
                  10 questions on <strong>Polymorphism</strong> (Function &amp; Operator overloading, Virtual functions, vtable &amp; Virtual destructors).
                </p>

                <div className="space-y-2 mb-6 font-label-code text-xs text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    <span>Instant grading with question-by-question explanations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    <span>One-click downloadable Marksheet (PDF)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    <span>Spreadsheet compatible results export (CSV)</span>
                  </div>
                </div>
              </div>

              <Link
                to="/oops/quiz"
                className="w-full py-4 bg-secondary text-on-secondary font-headline-md text-base uppercase tracking-wider border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 text-center block rounded-xl"
              >
                LAUNCH OOPS QUIZ →
              </Link>
            </div>

            {/* Card 2: Puzzle */}
            <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1c1b1b] flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-error text-on-error flex items-center justify-center font-headline-md text-xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                    02
                  </span>
                  <span className="bg-primary-container px-3 py-1 rounded font-label-badge text-xs uppercase font-bold border border-on-surface">
                    HANDS-ON • 20 MARKS
                  </span>
                </div>

                <h2 className="font-headline-xl text-2xl sm:text-3xl uppercase tracking-tight text-on-surface mb-3">
                  OOPS IN C++ LOGIC PUZZLE
                </h2>

                <p className="font-body-md text-on-surface-variant mb-6">
                  Interactive multi-stage architectural challenge:
                  Resolve the <strong>Diamond of Death</strong> using virtual base classes, sequence <strong>VTable dispatch &amp; destructor cleanup</strong>, assemble <strong>unary operator++ overload syntax</strong>, and enforce <strong>pure virtual contracts</strong>.
                </p>

                <div className="space-y-2 mb-6 font-label-code text-xs text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-error text-base">check_circle</span>
                    <span>Level 1: Diamond Inheritance Fixer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-error text-base">check_circle</span>
                    <span>Level 2: VTable Execution Order Tracer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-error text-base">check_circle</span>
                    <span>Level 3: Operator Overload Token Assembler</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-error text-base">check_circle</span>
                    <span>Level 4: Abstract Class Pure Virtual Patch</span>
                  </div>
                </div>
              </div>

              <Link
                to="/oops/puzzle"
                className="w-full py-4 bg-error text-on-error font-headline-md text-base uppercase tracking-wider border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 text-center block rounded-xl"
              >
                ENTER PUZZLE ARENA →
              </Link>
            </div>

          </div>

          {/* Curriculum Syllabus & Question Bank Summary */}
          <div className="bg-surface-container-lowest border-[3px] border-on-surface rounded-2xl p-6 lg:p-8 shadow-[6px_6px_0px_0px_#1c1b1b]">
            <h3 className="font-headline-md text-xl uppercase mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">menu_book</span>
              OOPS IN C++ QUESTION BANK DIRECTORY
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-headline-sm uppercase text-sm font-bold border-b border-on-surface/30 pb-2 mb-3 text-secondary">
                  PART A: INHERITANCE (QUESTIONS 1 - 10)
                </h4>
                <ul className="space-y-2 text-xs font-label-code text-on-surface-variant">
                  {OOPS_QUESTIONS.slice(0, 10).map(q => (
                    <li key={q.id} className="flex items-start gap-2">
                      <span className="font-bold text-on-surface shrink-0">Q{q.questionNumber}.</span>
                      <span>{q.conceptTag}: {q.questionText}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-headline-sm uppercase text-sm font-bold border-b border-on-surface/30 pb-2 mb-3 text-secondary">
                  PART B: POLYMORPHISM (QUESTIONS 11 - 20)
                </h4>
                <ul className="space-y-2 text-xs font-label-code text-on-surface-variant">
                  {OOPS_QUESTIONS.slice(10, 20).map(q => (
                    <li key={q.id} className="flex items-start gap-2">
                      <span className="font-bold text-on-surface shrink-0">Q{q.questionNumber}.</span>
                      <span>{q.conceptTag}: {q.questionText}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OopsHub;

