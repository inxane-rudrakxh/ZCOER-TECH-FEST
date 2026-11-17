import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { exportSingleStudentPDF, exportResultsCSV } from "../utils/exportUtils";

interface PuzzleLevel {
  id: number;
  title: string;
  topic: string;
  conceptTag: string;
  scenario: string;
  points: number;
}

const PUZZLE_LEVELS: PuzzleLevel[] = [
  {
    id: 1,
    title: "THE DIAMOND AMBIGUITY",
    topic: "Inheritance",
    conceptTag: "Virtual Base Class Resolution",
    scenario: "SmartPhone inherits from Phone and Camera, both inheriting Device. Without virtual inheritance, Device is duplicated, throwing ambiguity errors.",
    points: 5
  },
  {
    id: 2,
    title: "VTABLE & DESTRUCTOR TRACER",
    topic: "Polymorphism",
    conceptTag: "Dynamic Dispatch & Virtual Destructors",
    scenario: "Trace the exact runtime execution sequence when instantiating and deleting a Derived object via a Base pointer with virtual dispatch.",
    points: 5
  },
  {
    id: 3,
    title: "OPERATOR OVERLOAD SCRAMBLE",
    topic: "Polymorphism",
    conceptTag: "Unary Prefix Operator Overloading",
    scenario: "Reconstruct the C++ unary operator++ overload function for a Counter class by placing tokens in correct syntactic order.",
    points: 5
  },
  {
    id: 4,
    title: "ABSTRACT CONTRACT ENFORCER",
    topic: "Inheritance & Polymorphism",
    conceptTag: "Pure Virtual Function Implementation",
    scenario: "Diagnose why instantiating the derived class fails compilation and provide the pure virtual override.",
    points: 5
  }
];

const OopsPuzzle = () => {
  const [studentName, setStudentName] = useState(() => localStorage.getItem("oops_student_name") || "");
  const [rollNo, setRollNo] = useState(() => localStorage.getItem("oops_student_roll") || "");
  const [hasStarted, setHasStarted] = useState(false);

  // Active Level
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levelScores, setLevelScores] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0, 3: 0 });
  const [levelCompleted, setLevelCompleted] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);

  // Level 1 State: Diamond Inheritance
  const [l1PhoneVirtual, setL1PhoneVirtual] = useState(false);
  const [l1CameraVirtual, setL1CameraVirtual] = useState(false);
  const [l1Feedback, setL1Feedback] = useState<string | null>(null);

  // Level 2 State: Execution Tracer
  // Correct Order: 
  // 1: Base Constructor
  // 2: Derived Constructor
  // 3: Derived::show() via vtable
  // 4: Derived Destructor
  // 5: Base Destructor
  const l2Items = [
    { id: 'derived_show', label: 'Derived::show() [Dynamic Dispatch]' },
    { id: 'base_ctor', label: 'Base Constructor' },
    { id: 'derived_dtor', label: 'Derived Destructor [Virtual Clean]' },
    { id: 'derived_ctor', label: 'Derived Constructor' },
    { id: 'base_dtor', label: 'Base Destructor' }
  ];
  const [l2Order, setL2Order] = useState<string[]>([]);
  const [l2Feedback, setL2Feedback] = useState<string | null>(null);

  // Level 3 State: Operator Overload Slots
  // Expected: Counter& operator++ () { ++count; return *this; }
  const l3Tokens = ["Counter&", "operator++", "()", "++count;", "return *this;"];
  const [l3Selected, setL3Selected] = useState<string[]>([]);
  const [l3Feedback, setL3Feedback] = useState<string | null>(null);

  // Level 4 State: Abstract contract
  const [l4Option, setL4Option] = useState<string | null>(null);
  const [l4Feedback, setL4Feedback] = useState<string | null>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !rollNo.trim()) {
      alert("Please provide both Name and Roll No.");
      return;
    }
    localStorage.setItem("oops_student_name", studentName);
    localStorage.setItem("oops_student_roll", rollNo);
    setHasStarted(true);
  };

  // --- Level 1 Verify ---
  const handleVerifyL1 = () => {
    if (l1PhoneVirtual && l1CameraVirtual) {
      setLevelScores(prev => ({ ...prev, 0: 5 }));
      setLevelCompleted(prev => ({ ...prev, 0: true }));
      setL1Feedback("SUCCESS! Both Phone and Camera inherit Device virtually. The C++ compiler resolves the Diamond problem and only one Device instance exists.");
    } else if (l1PhoneVirtual || l1CameraVirtual) {
      setL1Feedback("INCOMPLETE: Both intermediate branches (Phone AND Camera) must declare virtual inheritance to eliminate duplicate Device base subobjects.");
    } else {
      setL1Feedback("COMPILER ERROR: Request for member 'power' is ambiguous. SmartPhone inherits two distinct copies of Device.");
    }
  };

  // --- Level 2 Verify ---
  const handleAddToL2Order = (id: string) => {
    if (l2Order.includes(id)) return;
    setL2Order(prev => [...prev, id]);
  };

  const handleResetL2Order = () => {
    setL2Order([]);
    setL2Feedback(null);
  };

  const handleVerifyL2 = () => {
    const correctSeq = ['base_ctor', 'derived_ctor', 'derived_show', 'derived_dtor', 'base_dtor'];
    const isCorrect = l2Order.length === 5 && l2Order.every((val, idx) => val === correctSeq[idx]);
    if (isCorrect) {
      setLevelScores(prev => ({ ...prev, 1: 5 }));
      setLevelCompleted(prev => ({ ...prev, 1: true }));
      setL2Feedback("PERFECT! Constructor chain runs Base first -> Derived. Virtual table routes show() to Derived. Virtual destructor ensures Derived cleans up before Base!");
    } else {
      setL2Feedback("INCORRECT ORDER: Remember the rules: 1) Base ctor always precedes Derived ctor. 2) vtable dynamic dispatch calls Derived::show(). 3) Virtual destructors execute in reverse (Derived dtor first, then Base dtor).");
    }
  };

  // --- Level 3 Verify ---
  const handleAddL3Token = (t: string) => {
    if (l3Selected.includes(t)) return;
    setL3Selected(prev => [...prev, t]);
  };

  const handleResetL3 = () => {
    setL3Selected([]);
    setL3Feedback(null);
  };

  const handleVerifyL3 = () => {
    const expected = ["Counter&", "operator++", "()", "++count;", "return *this;"];
    const isCorrect = l3Selected.length === 5 && l3Selected.every((val, idx) => val === expected[idx]);
    if (isCorrect) {
      setLevelScores(prev => ({ ...prev, 2: 5 }));
      setLevelCompleted(prev => ({ ...prev, 2: true }));
      setL3Feedback("EXCELLENT! Unary prefix operator++ returns a reference (Counter&) to *this after incrementing the single operand.");
    } else {
      setL3Feedback("SYNTAX ERROR: Prefix operator++ requires: Return Type (Counter&) -> keyword & operator (operator++) -> parameter list () -> body increment (++count;) -> return reference (return *this;).");
    }
  };

  // --- Level 4 Verify ---
  const handleVerifyL4 = () => {
    if (l4Option === 'override_pure_virtual') {
      setLevelScores(prev => ({ ...prev, 3: 5 }));
      setLevelCompleted(prev => ({ ...prev, 3: true }));
      setL4Feedback("CORRECT! Because the base class contains pure virtual function 'virtual void start() = 0', derived class Car MUST provide a concrete implementation of start() to be instantiable.");
    } else {
      setL4Feedback("ERROR: Abstract base classes cannot be instantiated if pure virtual functions remain unimplemented in the derived class.");
    }
  };

  const handleFinishPuzzle = () => {
    setIsFinished(true);
  };

  const totalPuzzleScore = Object.values(levelScores).reduce((a, b) => a + b, 0);

  const puzzleResultRecord = {
    playerId: rollNo,
    fullName: studentName,
    department: "S.Y. B.Tech (AI & DS)",
    academicYear: "S.Y. B.Tech",
    quizScore: 0,
    maxQuizScore: 20,
    puzzleScore: totalPuzzleScore,
    maxPuzzleScore: 20,
    totalScore: totalPuzzleScore,
    maxTotalScore: 20,
    percentage: (totalPuzzleScore / 20) * 100,
    status: (totalPuzzleScore >= 15 ? 'DISTINCTION' : totalPuzzleScore >= 10 ? 'PASS' : 'NEEDS_IMPROVEMENT') as any,
    timeTakenSeconds: 300,
    submittedAt: new Date().toISOString()
  };

  if (!hasStarted) {
    return (
      <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
        <Header />
        <main className="w-full pt-28 pb-16 flex-grow flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl max-w-xl w-full p-6 sm:p-10 shadow-[8px_8px_0px_0px_#1c1b1b]">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-error text-on-error font-label-badge text-xs uppercase font-bold rounded">
                PUZZLE ARENA
              </span>
              <span className="font-label-code text-xs text-secondary font-bold uppercase">
                INTERACTIVE OOP CHALLENGES
              </span>
            </div>

            <h1 className="font-display-hero text-3xl sm:text-4xl uppercase tracking-tighter text-on-surface mb-2">
              OOPS IN C++ PUZZLE
            </h1>
            <p className="font-body-md text-on-surface-variant mb-6">
              Solve 4 hands-on architectural code puzzles: Diamond Inheritance, VTable &amp; Destructor Dispatch, Operator Overloading, and Pure Virtual Contracts.
            </p>

            <form onSubmit={handleStart} className="space-y-4">
              <div>
                <label className="block font-label-badge text-xs uppercase font-bold mb-1 text-on-surface">
                  Player Name *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="e.g. Aniket Patil"
                  className="w-full bg-surface border-[2px] border-on-surface px-4 py-3 font-headline-md text-[16px] rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b]"
                />
              </div>

              <div>
                <label className="block font-label-badge text-xs uppercase font-bold mb-1 text-on-surface">
                  Player ID / Roll No *
                </label>
                <input
                  type="text"
                  required
                  value={rollNo}
                  onChange={e => setRollNo(e.target.value)}
                  placeholder="e.g. ZCOER-4096"
                  className="w-full bg-surface border-[2px] border-on-surface px-4 py-3 font-headline-md text-[16px] rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-error text-on-error font-headline-lg text-lg uppercase tracking-wider border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-1 active:translate-y-1 transition-all rounded-xl mt-4 flex items-center justify-center gap-2"
              >
                <span>ENTER PUZZLE ARENA</span>
                <span className="material-symbols-outlined">extension</span>
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Finished Screen
  if (isFinished) {
    return (
      <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
        <Header />
        <main className="w-full pt-28 pb-16 flex-grow max-w-4xl mx-auto px-4">
          <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_#1c1b1b]">
            <div className="text-center max-w-lg mx-auto mb-8">
              <span className="material-symbols-outlined text-6xl text-secondary mb-2">military_tech</span>
              <h1 className="font-display-hero text-4xl uppercase tracking-tighter">
                PUZZLE ARENA CLEARED!
              </h1>
              <p className="font-body-md text-on-surface-variant mt-2">
                Operator <strong>{studentName}</strong> (ID: {rollNo}) has successfully navigated the C++ Object-Oriented Architecture trials.
              </p>
            </div>

            <div className="bg-surface-container p-6 rounded-2xl border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] text-center mb-8">
              <div className="font-label-badge text-xs uppercase font-bold text-on-surface-variant">
                FINAL PUZZLE SCORE
              </div>
              <div className="font-headline-xl text-5xl font-black text-secondary mt-1">
                {totalPuzzleScore} / 20 PTS
              </div>
              <div className="font-label-code text-sm text-on-surface-variant mt-1">
                {((totalPuzzleScore / 20) * 100).toFixed(0)}% Mastery Score
              </div>
            </div>

            {/* Badges Earned */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-surface rounded-xl border-2 border-on-surface text-center">
                <span className="material-symbols-outlined text-secondary text-3xl">diamond</span>
                <div className="font-headline-md text-xs uppercase font-bold mt-1">Diamond Slayer</div>
                <div className="font-label-code text-[10px] text-on-surface-variant">Virtual Base Class</div>
              </div>
              <div className="p-4 bg-surface rounded-xl border-2 border-on-surface text-center">
                <span className="material-symbols-outlined text-secondary text-3xl">schema</span>
                <div className="font-headline-md text-xs uppercase font-bold mt-1">VTable Architect</div>
                <div className="font-label-code text-[10px] text-on-surface-variant">Dynamic Dispatch</div>
              </div>
              <div className="p-4 bg-surface rounded-xl border-2 border-on-surface text-center">
                <span className="material-symbols-outlined text-secondary text-3xl">code</span>
                <div className="font-headline-md text-xs uppercase font-bold mt-1">Operator Pro</div>
                <div className="font-label-code text-[10px] text-on-surface-variant">Unary Overload</div>
              </div>
              <div className="p-4 bg-surface rounded-xl border-2 border-on-surface text-center">
                <span className="material-symbols-outlined text-secondary text-3xl">verified</span>
                <div className="font-headline-md text-xs uppercase font-bold mt-1">Contract Keeper</div>
                <div className="font-label-code text-[10px] text-on-surface-variant">Pure Virtual</div>
              </div>
            </div>

            {/* Exports */}
            <div className="bg-primary-container p-6 rounded-2xl border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-headline-md text-lg uppercase font-bold">
                  EXPORT PUZZLE MARKS
                </h3>
                <p className="font-body-sm text-on-surface-variant">
                  Generate official PDF certificate or spreadsheet CSV.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => exportSingleStudentPDF(puzzleResultRecord)}
                  className="flex items-center gap-2 bg-secondary text-on-secondary px-5 py-2.5 font-headline-md uppercase text-sm border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] rounded-xl hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  PDF MARKSHEET
                </button>
                <button
                  onClick={() => exportResultsCSV([puzzleResultRecord], `OOPS_Puzzle_${rollNo}.csv`)}
                  className="flex items-center gap-2 bg-surface text-on-surface px-5 py-2.5 font-headline-md uppercase text-sm border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] rounded-xl hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-[18px]">table_chart</span>
                  CSV / EXCEL
                </button>
                <Link
                  to="/oops/quiz"
                  className="flex items-center gap-2 bg-error text-on-error px-5 py-2.5 font-headline-md uppercase text-sm border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] rounded-xl hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-[18px]">quiz</span>
                  TAKE QUIZ
                </Link>
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const activeLevelData = PUZZLE_LEVELS[currentLevel];

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-28 pb-16 flex-grow max-w-5xl mx-auto px-4">
        
        {/* Level Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {PUZZLE_LEVELS.map((lvl, idx) => {
            const isCompleted = !!levelCompleted[idx];
            const isCurrent = currentLevel === idx;
            return (
              <button
                key={lvl.id}
                onClick={() => setCurrentLevel(idx)}
                className={`p-3.5 rounded-xl border-[2px] text-left transition-all ${
                  isCurrent 
                    ? 'border-on-surface bg-primary-container shadow-[4px_4px_0px_0px_#1c1b1b]' 
                    : isCompleted 
                    ? 'border-secondary bg-secondary-fixed/20' 
                    : 'border-on-surface/40 bg-surface'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-label-badge font-bold uppercase mb-1">
                  <span>LEVEL 0{idx + 1}</span>
                  {isCompleted && (
                    <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                  )}
                </div>
                <div className="font-headline-md text-xs truncate">
                  {lvl.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Puzzle Card */}
        <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_#1c1b1b]">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-on-surface pb-4 mb-6">
            <div>
              <span className="font-label-badge text-xs uppercase font-bold text-secondary">
                {activeLevelData.topic} • {activeLevelData.conceptTag}
              </span>
              <h2 className="font-display-hero text-2xl sm:text-3xl uppercase tracking-tighter text-on-surface mt-1">
                LEVEL 0{currentLevel + 1}: {activeLevelData.title}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-label-code text-sm font-bold bg-primary-container px-3 py-1 rounded border border-on-surface">
                POINTS: {levelScores[currentLevel]} / 5
              </span>
            </div>
          </div>

          <p className="font-body-md text-on-surface-variant mb-6">
            {activeLevelData.scenario}
          </p>

          {/* LEVEL 1: DIAMOND INHERITANCE */}
          {currentLevel === 0 && (
            <div className="space-y-6">
              <div className="bg-surface-container p-6 rounded-xl border-2 border-on-surface font-label-code text-sm">
                <div className="text-secondary font-bold mb-2">// C++ Diamond Inheritance Architecture</div>
                <div className="p-3 bg-surface rounded-lg mb-3 border">
                  class <strong>Device</strong> &#123; public: int power = 100; &#125;;
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div className="p-3 bg-surface rounded-lg border">
                    <div className="mb-2">class Phone :</div>
                    <button
                      onClick={() => setL1PhoneVirtual(!l1PhoneVirtual)}
                      className={`px-3 py-1.5 rounded font-bold uppercase text-xs border ${
                        l1PhoneVirtual ? 'bg-secondary text-on-secondary' : 'bg-surface-container text-on-surface'
                      }`}
                    >
                      {l1PhoneVirtual ? 'virtual public Device' : 'public Device'}
                    </button>
                    <span className="text-xs text-on-surface-variant ml-2">(Click to toggle virtual)</span>
                  </div>

                  <div className="p-3 bg-surface rounded-lg border">
                    <div className="mb-2">class Camera :</div>
                    <button
                      onClick={() => setL1CameraVirtual(!l1CameraVirtual)}
                      className={`px-3 py-1.5 rounded font-bold uppercase text-xs border ${
                        l1CameraVirtual ? 'bg-secondary text-on-secondary' : 'bg-surface-container text-on-surface'
                      }`}
                    >
                      {l1CameraVirtual ? 'virtual public Device' : 'public Device'}
                    </button>
                    <span className="text-xs text-on-surface-variant ml-2">(Click to toggle virtual)</span>
                  </div>
                </div>

                <div className="p-3 bg-surface rounded-lg border">
                  class <strong>SmartPhone</strong> : public Phone, public Camera &#123; ... &#125;;
                </div>
              </div>

              {l1Feedback && (
                <div className={`p-4 rounded-xl border-2 ${
                  levelCompleted[0] ? 'bg-secondary/15 border-secondary text-secondary' : 'bg-error/15 border-error text-error'
                } font-body-md text-sm font-semibold`}>
                  {l1Feedback}
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={handleVerifyL1}
                  className="bg-secondary text-on-secondary px-6 py-2.5 font-headline-md uppercase text-sm rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b]"
                >
                  COMPILE &amp; TEST HIERARCHY
                </button>
                {levelCompleted[0] && (
                  <button
                    onClick={() => setCurrentLevel(1)}
                    className="bg-primary-container text-on-surface px-6 py-2.5 font-headline-md uppercase text-sm rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b]"
                  >
                    NEXT LEVEL →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* LEVEL 2: VTABLE & DESTRUCTOR TRACER */}
          {currentLevel === 1 && (
            <div className="space-y-6">
              <div className="bg-surface-container p-4 rounded-xl border-2 border-on-surface font-label-code text-xs">
                <div className="text-secondary font-bold mb-1">// Polymorphic Execution Code:</div>
                <pre className="text-on-surface leading-relaxed">
{`Base* p = new Derived();
p->show();   // virtual void show() in Base overridden in Derived
delete p;    // Base has virtual ~Base()`}
                </pre>
              </div>

              <div>
                <div className="font-label-badge text-xs uppercase font-bold mb-2">
                  CLICK EVENTS IN CHRONOLOGICAL EXECUTION ORDER (1 to 5):
                </div>

                {/* Pool of Choices */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {l2Items.map(item => {
                    const isAdded = l2Order.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        disabled={isAdded}
                        onClick={() => handleAddToL2Order(item.id)}
                        className={`px-3 py-2 rounded-lg border font-body-sm font-bold text-xs ${
                          isAdded 
                            ? 'opacity-40 bg-surface-container-high border-on-surface/20 cursor-not-allowed' 
                            : 'bg-surface hover:bg-surface-container border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]'
                        }`}
                      >
                        + {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* Slotted Sequence */}
                <div className="bg-surface-container-high p-4 rounded-xl border-2 border-on-surface space-y-2">
                  <div className="font-label-badge text-xs text-on-surface-variant font-bold">
                    YOUR ORDERED EXECUTION TRACE:
                  </div>
                  {l2Order.length === 0 ? (
                    <div className="text-xs text-on-surface-variant italic py-2">
                      (No steps selected. Click buttons above to sequence events)
                    </div>
                  ) : (
                    l2Order.map((id, idx) => {
                      const item = l2Items.find(i => i.id === id);
                      return (
                        <div key={id} className="flex items-center gap-2 p-2 bg-surface rounded border text-xs font-bold font-label-code">
                          <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <span>{item?.label}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {l2Feedback && (
                <div className={`p-4 rounded-xl border-2 ${
                  levelCompleted[1] ? 'bg-secondary/15 border-secondary text-secondary' : 'bg-error/15 border-error text-error'
                } font-body-md text-sm font-semibold`}>
                  {l2Feedback}
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={handleVerifyL2}
                    className="bg-secondary text-on-secondary px-6 py-2.5 font-headline-md uppercase text-sm rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b]"
                  >
                    VERIFY TRACE
                  </button>
                  <button
                    onClick={handleResetL2Order}
                    className="bg-surface text-on-surface px-4 py-2.5 font-headline-md uppercase text-sm rounded-xl border-[2px] border-on-surface"
                  >
                    RESET
                  </button>
                </div>
                {levelCompleted[1] && (
                  <button
                    onClick={() => setCurrentLevel(2)}
                    className="bg-primary-container text-on-surface px-6 py-2.5 font-headline-md uppercase text-sm rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b]"
                  >
                    NEXT LEVEL →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* LEVEL 3: OPERATOR OVERLOAD SCRAMBLE */}
          {currentLevel === 2 && (
            <div className="space-y-6">
              <div className="bg-surface-container p-4 rounded-xl border-2 border-on-surface font-label-code text-xs">
                <div className="text-secondary font-bold mb-1">// Target: Overload Prefix Unary Operator (++c)</div>
                <div className="text-on-surface-variant">
                  Select and assemble the 5 tokens to produce the valid member operator signature and implementation.
                </div>
              </div>

              <div>
                <div className="font-label-badge text-xs uppercase font-bold mb-2">
                  AVAILABLE CODE TOKENS:
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {l3Tokens.map(tok => {
                    const isAdded = l3Selected.includes(tok);
                    return (
                      <button
                        key={tok}
                        disabled={isAdded}
                        onClick={() => handleAddL3Token(tok)}
                        className={`px-3 py-2 rounded-lg border font-label-code text-xs font-bold ${
                          isAdded 
                            ? 'opacity-40 bg-surface-container-high border-on-surface/20 cursor-not-allowed' 
                            : 'bg-surface hover:bg-surface-container border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]'
                        }`}
                      >
                        {tok}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-surface-container-high p-4 rounded-xl border-2 border-on-surface">
                  <div className="font-label-badge text-xs text-on-surface-variant font-bold mb-2">
                    ASSEMBLED METHOD:
                  </div>
                  <div className="p-3 bg-surface rounded border font-label-code text-sm flex flex-wrap gap-2 min-h-[48px] items-center">
                    {l3Selected.length === 0 ? (
                      <span className="text-on-surface-variant italic">(Select tokens above in correct order)</span>
                    ) : (
                      l3Selected.map((t, idx) => (
                        <span key={idx} className="bg-primary-container px-2 py-1 rounded border border-on-surface font-bold">
                          {t}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {l3Feedback && (
                <div className={`p-4 rounded-xl border-2 ${
                  levelCompleted[2] ? 'bg-secondary/15 border-secondary text-secondary' : 'bg-error/15 border-error text-error'
                } font-body-md text-sm font-semibold`}>
                  {l3Feedback}
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={handleVerifyL3}
                    className="bg-secondary text-on-secondary px-6 py-2.5 font-headline-md uppercase text-sm rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b]"
                  >
                    TEST OPERATOR
                  </button>
                  <button
                    onClick={handleResetL3}
                    className="bg-surface text-on-surface px-4 py-2.5 font-headline-md uppercase text-sm rounded-xl border-[2px] border-on-surface"
                  >
                    RESET
                  </button>
                </div>
                {levelCompleted[2] && (
                  <button
                    onClick={() => setCurrentLevel(3)}
                    className="bg-primary-container text-on-surface px-6 py-2.5 font-headline-md uppercase text-sm rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b]"
                  >
                    NEXT LEVEL →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* LEVEL 4: ABSTRACT CONTRACT ENFORCER */}
          {currentLevel === 3 && (
            <div className="space-y-6">
              <div className="bg-surface-container p-4 rounded-xl border-2 border-on-surface font-label-code text-xs">
                <pre className="text-on-surface leading-relaxed">
{`class Vehicle {
public:
  virtual void start() = 0; // Pure Virtual Function
};

class Car : public Vehicle {
  // MISSING IMPLEMENTATION!
};

int main() {
  Car c; // COMPILE ERROR: cannot allocate an object of abstract type 'Car'
}`}
                </pre>
              </div>

              <div>
                <div className="font-label-badge text-xs uppercase font-bold mb-3">
                  HOW MUST CLASS CAR BE PATCHED TO RESOLVE THE ABSTRACT ERROR?
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'make_constructor', text: 'Add a default constructor to class Car.' },
                    { id: 'override_pure_virtual', text: 'Provide a concrete override for start() in class Car: void start() override { ... }' },
                    { id: 'make_virtual_base', text: 'Inherit Vehicle using virtual public Vehicle.' },
                    { id: 'instantiate_pointer', text: 'Directly instantiate Vehicle* v = new Vehicle(); instead.' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setL4Option(opt.id)}
                      className={`w-full text-left p-3.5 rounded-xl border-[2px] font-body-md text-sm transition-all flex items-center gap-3 ${
                        l4Option === opt.id 
                          ? 'border-secondary bg-secondary-fixed/20 shadow-[3px_3px_0px_0px_#1c1b1b]' 
                          : 'border-on-surface bg-surface hover:bg-surface-container'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        l4Option === opt.id ? 'border-secondary bg-secondary' : 'border-on-surface'
                      }`}>
                        {l4Option === opt.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {l4Feedback && (
                <div className={`p-4 rounded-xl border-2 ${
                  levelCompleted[3] ? 'bg-secondary/15 border-secondary text-secondary' : 'bg-error/15 border-error text-error'
                } font-body-md text-sm font-semibold`}>
                  {l4Feedback}
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={handleVerifyL4}
                  className="bg-secondary text-on-secondary px-6 py-2.5 font-headline-md uppercase text-sm rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b]"
                >
                  APPLY PATCH
                </button>
                {levelCompleted[3] && (
                  <button
                    onClick={handleFinishPuzzle}
                    className="bg-error text-on-error px-6 py-2.5 font-headline-md uppercase text-sm rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] animate-bounce"
                  >
                    VIEW FINAL RESULTS 🏆
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </main>
      <Footer />
    </div>
  );
};

export default OopsPuzzle;

