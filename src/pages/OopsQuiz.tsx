import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { OOPS_QUESTIONS, OopsQuestion } from "../data/oopsQuestions";
import { exportSingleStudentPDF, exportResultsCSV } from "../utils/exportUtils";
import { supabase } from "../lib/supabase";

const OopsQuiz = () => {

  // Student Identity
  const [studentName, setStudentName] = useState(() => localStorage.getItem("oops_student_name") || "");
  const [rollNo, setRollNo] = useState(() => localStorage.getItem("oops_student_roll") || "");
  const [branch, setBranch] = useState("S.Y. B.Tech (AI & DS)");
  const [hasStarted, setHasStarted] = useState(false);

  // Quiz State
  const [questions] = useState<OopsQuestion[]>(OOPS_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'Inheritance' | 'Polymorphism'>('ALL');

  // Timer: 15 minutes (900 seconds)
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Results State
  const [resultData, setResultData] = useState<any>(null);

  // Timer countdown
  useEffect(() => {
    if (!hasStarted || isFinished) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [hasStarted, isFinished, timeLeft]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !rollNo.trim()) {
      alert("Please provide both your Full Name and Roll No / Player ID.");
      return;
    }
    localStorage.setItem("oops_student_name", studentName);
    localStorage.setItem("oops_student_roll", rollNo);
    setHasStarted(true);
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const toggleFlag = (questionId: number) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);

    let inheritanceCorrect = 0;
    let polymorphismCorrect = 0;
    let totalScore = 0;

    const breakdown = questions.map(q => {
      const userSelected = selectedAnswers[q.id];
      const isCorrect = userSelected === q.correctOptionIndex;
      if (isCorrect) {
        totalScore += q.marks;
        if (q.topic === 'Inheritance') inheritanceCorrect += 1;
        if (q.topic === 'Polymorphism') polymorphismCorrect += 1;
      }
      return {
        questionNumber: q.questionNumber,
        topic: q.topic,
        isCorrect,
        userAnswer: userSelected !== undefined ? `${String.fromCharCode(65 + userSelected)}) ${q.options[userSelected]}` : "Unanswered",
        correctAnswer: `${q.correctOptionLetter}) ${q.options[q.correctOptionIndex]}`,
        explanation: q.explanation
      };
    });

    const timeSpent = (15 * 60) - Math.max(0, timeLeft);
    const percentage = (totalScore / 20) * 100;
    const status: 'PASS' | 'DISTINCTION' | 'NEEDS_IMPROVEMENT' = 
      percentage >= 75 ? 'DISTINCTION' : percentage >= 40 ? 'PASS' : 'NEEDS_IMPROVEMENT';

    const calculatedResult = {
      playerId: rollNo,
      fullName: studentName,
      department: branch,
      academicYear: "S.Y. B.Tech",
      quizScore: totalScore,
      maxQuizScore: 20,
      totalScore,
      maxTotalScore: 20,
      percentage,
      status,
      timeTakenSeconds: timeSpent,
      submittedAt: new Date().toISOString(),
      inheritanceCorrect,
      polymorphismCorrect,
      answersBreakdown: breakdown
    };

    setResultData(calculatedResult);
    setIsFinished(true);
    setIsSubmitting(false);

    // Save record to Supabase if possible (gracefully fallback if offline)
    try {
      // Check if participant with roll exists
      const { data: pData } = await supabase
        .from("participants")
        .select("id")
        .eq("player_id", rollNo)
        .maybeSingle();

      if (pData?.id) {
        // Record into quiz_attempts
        const { data: qz } = await supabase.from("quizzes").select("id, game_id").limit(1).single();
        if (qz) {
          await supabase.from("quiz_attempts").upsert({
            quiz_id: qz.id,
            participant_id: pData.id,
            score: totalScore,
            status: 'COMPLETED',
            end_time: new Date().toISOString()
          }, { onConflict: 'quiz_id, participant_id' });

          await supabase.from("scores").upsert({
            participant_id: pData.id,
            game_id: qz.game_id,
            score: totalScore,
            time_taken_seconds: timeSpent
          }, { onConflict: 'participant_id, game_id' });
        }
      }
    } catch (e) {
      console.warn("Telemetry upload saved locally:", e);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filtered Questions
  const filteredQuestions = questions.filter(q => {
    if (activeFilter === 'Inheritance') return q.topic === 'Inheritance';
    if (activeFilter === 'Polymorphism') return q.topic === 'Polymorphism';
    return true;
  });

  const currentQ = questions[currentIndex];
  const isAnswered = (qId: number) => selectedAnswers[qId] !== undefined;
  const isFlagged = (qId: number) => !!flaggedQuestions[qId];

  // If not started, show the Student Registration / Enter Assessment form
  if (!hasStarted) {
    return (
      <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
        <Header />
        <main className="w-full pt-28 pb-16 flex-grow flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl max-w-xl w-full p-6 sm:p-10 shadow-[8px_8px_0px_0px_#1c1b1b]">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary-container text-on-surface font-label-badge text-xs uppercase font-bold rounded border border-on-surface">
                S.Y. B.Tech (AI & DS)
              </span>
              <span className="font-label-code text-xs text-secondary font-bold uppercase">
                INTERNAL ASSESSMENT TEST
              </span>
            </div>

            <h1 className="font-display-hero text-3xl sm:text-4xl uppercase tracking-tighter text-on-surface mb-2">
              OOPS IN C++ QUIZ
            </h1>
            <p className="font-body-md text-on-surface-variant mb-6">
              Official assessment covering <strong>Inheritance</strong> (10 Questions) and <strong>Polymorphism</strong> (10 Questions) in C++. Max Marks: 20 | Time: 15 Mins.
            </p>

            <form onSubmit={handleStart} className="space-y-4">
              <div>
                <label className="block font-label-badge text-xs uppercase font-bold mb-1.5 text-on-surface">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-surface border-[2px] border-on-surface px-4 py-3 font-headline-md text-[16px] rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b]"
                />
              </div>

              <div>
                <label className="block font-label-badge text-xs uppercase font-bold mb-1.5 text-on-surface">
                  Roll No / Player ID *
                </label>
                <input
                  type="text"
                  required
                  value={rollNo}
                  onChange={e => setRollNo(e.target.value)}
                  placeholder="e.g. ZCOER-1024 or Roll 42"
                  className="w-full bg-surface border-[2px] border-on-surface px-4 py-3 font-headline-md text-[16px] rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b]"
                />
              </div>

              <div>
                <label className="block font-label-badge text-xs uppercase font-bold mb-1.5 text-on-surface">
                  Class / Branch
                </label>
                <input
                  type="text"
                  value={branch}
                  onChange={e => setBranch(e.target.value)}
                  className="w-full bg-surface-container border-[2px] border-on-surface px-4 py-3 font-headline-md text-[16px] rounded-xl focus:outline-none shadow-[2px_2px_0px_0px_#1c1b1b]"
                />
              </div>

              <div className="bg-surface-container p-4 rounded-xl border border-on-surface/30 font-label-code text-xs text-on-surface-variant space-y-1">
                <div className="font-bold text-on-surface">ASSESSMENT INSTRUCTIONS:</div>
                <div>• Total 20 Multiple Choice Questions (+1 Mark each, No negative marking).</div>
                <div>• Auto-submission will trigger when the 15:00 countdown concludes.</div>
                <div>• Results, detailed answer explanations, and Marksheet (PDF & CSV) will be provided immediately upon submission.</div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-secondary text-on-secondary font-headline-lg text-lg uppercase tracking-wider border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-1 active:translate-y-1 transition-all rounded-xl mt-4 flex items-center justify-center gap-2"
              >
                <span>START ASSESSMENT NOW</span>
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If Finished, show the Scorecard & Review
  if (isFinished && resultData) {
    return (
      <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
        <Header />
        <main className="w-full pt-28 pb-16 flex-grow max-w-5xl mx-auto px-4">
          <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_#1c1b1b] mb-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-on-surface pb-6 mb-6">
              <div>
                <span className="px-3 py-1 bg-primary-container text-on-surface font-label-badge text-xs uppercase font-bold rounded border border-on-surface">
                  ASSESSMENT COMPLETED
                </span>
                <h1 className="font-display-hero text-3xl sm:text-4xl uppercase tracking-tighter text-on-surface mt-2">
                  OOPS IN C++ RESULT
                </h1>
                <p className="font-body-md text-on-surface-variant">
                  Candidate: <strong>{resultData.fullName}</strong> | Roll No: <strong>{resultData.playerId}</strong> | Class: <strong>{resultData.department}</strong>
                </p>
              </div>

              {/* Status Badge */}
              <div className={`px-4 py-2 rounded-xl border-[3px] border-on-surface font-headline-md text-lg uppercase shadow-[4px_4px_0px_0px_#1c1b1b] ${
                resultData.status === 'DISTINCTION' ? 'bg-secondary text-on-secondary' :
                resultData.status === 'PASS' ? 'bg-primary-container text-on-surface' :
                'bg-error text-on-error'
              }`}>
                {resultData.status}
              </div>
            </div>

            {/* Score Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-surface-container p-4 rounded-xl border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="font-label-badge text-xs text-on-surface-variant uppercase font-bold">TOTAL SCORE</div>
                <div className="font-headline-xl text-3xl font-black text-secondary mt-1">
                  {resultData.totalScore} / 20
                </div>
                <div className="font-label-code text-xs text-on-surface-variant mt-1">
                  {resultData.percentage.toFixed(1)}% Score
                </div>
              </div>

              <div className="bg-surface-container p-4 rounded-xl border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="font-label-badge text-xs text-on-surface-variant uppercase font-bold">INHERITANCE</div>
                <div className="font-headline-xl text-3xl font-black text-on-surface mt-1">
                  {resultData.inheritanceCorrect} / 10
                </div>
                <div className="font-label-code text-xs text-on-surface-variant mt-1">
                  Questions 1 - 10
                </div>
              </div>

              <div className="bg-surface-container p-4 rounded-xl border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="font-label-badge text-xs text-on-surface-variant uppercase font-bold">POLYMORPHISM</div>
                <div className="font-headline-xl text-3xl font-black text-on-surface mt-1">
                  {resultData.polymorphismCorrect} / 10
                </div>
                <div className="font-label-code text-xs text-on-surface-variant mt-1">
                  Questions 11 - 20
                </div>
              </div>

              <div className="bg-surface-container p-4 rounded-xl border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="font-label-badge text-xs text-on-surface-variant uppercase font-bold">TIME TAKEN</div>
                <div className="font-headline-xl text-3xl font-black text-on-surface mt-1">
                  {formatTimer(resultData.timeTakenSeconds)}
                </div>
                <div className="font-label-code text-xs text-on-surface-variant mt-1">
                  Max: 15 Mins
                </div>
              </div>
            </div>

            {/* EXPORT ACTION BUTTONS */}
            <div className="bg-primary-container p-6 rounded-2xl border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <div>
                <h3 className="font-headline-md text-xl uppercase font-bold text-on-surface">
                  EXPORT MARKS &amp; OFFICIAL CERTIFICATE
                </h3>
                <p className="font-body-sm text-on-surface-variant mt-0.5">
                  Download your branded PDF Marksheet or export spreadsheet CSV for records.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => exportSingleStudentPDF(resultData)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-secondary text-on-secondary px-5 py-3 font-headline-md uppercase text-sm border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 transition-all rounded-xl"
                >
                  <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  EXPORT PDF
                </button>

                <button
                  onClick={() => exportResultsCSV([resultData], `OOPS_Result_${resultData.playerId}.csv`)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-surface text-on-surface px-5 py-3 font-headline-md uppercase text-sm border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 transition-all rounded-xl"
                >
                  <span className="material-symbols-outlined text-[18px]">table_chart</span>
                  EXPORT CSV (EXCEL)
                </button>

                <Link
                  to="/oops/puzzle"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-error text-on-error px-5 py-3 font-headline-md uppercase text-sm border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 transition-all rounded-xl"
                >
                  <span className="material-symbols-outlined text-[18px]">extension</span>
                  TAKE OOPS PUZZLE
                </Link>
              </div>
            </div>

            {/* In-depth Answer Key & Explanations */}
            <div className="space-y-4">
              <h2 className="font-headline-md text-2xl uppercase border-b-2 border-on-surface pb-3">
                DETAILED QUESTION REVIEW &amp; EXPLANATIONS
              </h2>

              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const userAnsIdx = selectedAnswers[q.id];
                  const isCorrect = userAnsIdx === q.correctOptionIndex;
                  const isSkipped = userAnsIdx === undefined;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] ${
                        isCorrect ? 'bg-secondary-fixed/15' : isSkipped ? 'bg-surface-container' : 'bg-error/10'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-label-badge font-bold text-xs uppercase px-2 py-0.5 rounded bg-surface border border-on-surface">
                            Q{idx + 1} • {q.topic}
                          </span>
                          <span className="font-label-code text-xs text-on-surface-variant font-semibold">
                            [{q.conceptTag}]
                          </span>
                        </div>
                        <span className={`font-label-badge font-bold text-xs uppercase px-2.5 py-1 rounded border border-on-surface ${
                          isCorrect ? 'bg-secondary text-on-secondary' : isSkipped ? 'bg-surface-variant text-on-surface-variant' : 'bg-error text-on-error'
                        }`}>
                          {isCorrect ? 'CORRECT (+1)' : isSkipped ? 'SKIPPED (0)' : 'INCORRECT (0)'}
                        </span>
                      </div>

                      <h4 className="font-headline-md text-lg mb-3">
                        {q.questionText}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {q.options.map((opt, optIdx) => {
                          const isOptCorrect = optIdx === q.correctOptionIndex;
                          const isOptChosen = optIdx === userAnsIdx;
                          return (
                            <div
                              key={optIdx}
                              className={`p-2.5 rounded-lg border text-sm flex items-center gap-2 ${
                                isOptCorrect 
                                  ? 'border-secondary bg-secondary/15 font-bold text-on-surface' 
                                  : isOptChosen 
                                  ? 'border-error bg-error/15 font-bold text-error' 
                                  : 'border-on-surface/30 bg-surface'
                              }`}
                            >
                              <span className="w-5 h-5 rounded-full border border-on-surface flex items-center justify-center text-xs font-bold shrink-0">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                              {isOptCorrect && <span className="material-symbols-outlined text-[16px] text-secondary ml-auto">check_circle</span>}
                              {isOptChosen && !isOptCorrect && <span className="material-symbols-outlined text-[16px] text-error ml-auto">cancel</span>}
                            </div>
                          );
                        })}
                      </div>

                      {/* Official Explanation from docx */}
                      <div className="bg-surface p-3 rounded-lg border border-on-surface/20 text-xs font-body-md text-on-surface-variant flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">lightbulb</span>
                        <div>
                          <strong className="text-on-surface">Explanation: </strong>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  setIsFinished(false);
                  setHasStarted(false);
                  setSelectedAnswers({});
                  setFlaggedQuestions({});
                  setTimeLeft(15 * 60);
                }}
                className="bg-primary-container text-on-surface font-headline-md px-8 py-3 rounded-xl border-[2px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-1 transition-all uppercase"
              >
                RETAKE TEST
              </button>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Active Assessment Interface
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />

      <main className="w-full pt-28 pb-16 flex-grow flex flex-col max-w-5xl mx-auto px-4">
        
        {/* Sticky Status Bar */}
        <div className="bg-surface-container-lowest border-[3px] border-on-surface rounded-2xl p-4 shadow-[4px_4px_0px_0px_#1c1b1b] mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-secondary text-on-secondary font-label-badge text-xs uppercase font-bold rounded">
              LIVE EXAM
            </span>
            <span className="font-headline-md text-base sm:text-lg uppercase">
              OOPS IN C++ ASSESSMENT
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Filter Tabs */}
            <div className="hidden sm:flex items-center gap-1 bg-surface-container p-1 rounded-lg border border-on-surface/30">
              <button
                onClick={() => setActiveFilter('ALL')}
                className={`px-3 py-1 text-xs font-label-badge font-bold uppercase rounded ${activeFilter === 'ALL' ? 'bg-primary-container text-on-surface' : 'text-on-surface-variant'}`}
              >
                ALL (20)
              </button>
              <button
                onClick={() => setActiveFilter('Inheritance')}
                className={`px-3 py-1 text-xs font-label-badge font-bold uppercase rounded ${activeFilter === 'Inheritance' ? 'bg-primary-container text-on-surface' : 'text-on-surface-variant'}`}
              >
                INHERITANCE (10)
              </button>
              <button
                onClick={() => setActiveFilter('Polymorphism')}
                className={`px-3 py-1 text-xs font-label-badge font-bold uppercase rounded ${activeFilter === 'Polymorphism' ? 'bg-primary-container text-on-surface' : 'text-on-surface-variant'}`}
              >
                POLYMORPHISM (10)
              </button>
            </div>

            {/* Timer Clock */}
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-[2px] border-on-surface font-label-code text-sm font-bold shadow-[2px_2px_0px_0px_#1c1b1b] ${
              timeLeft < 180 ? 'bg-error text-on-error animate-pulse' : 'bg-surface text-secondary'
            }`}>
              <span className="material-symbols-outlined text-[18px]">timer</span>
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Main Test Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
          
          {/* Left Column: Active Question */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1c1b1b] flex-grow flex flex-col">
              
              {/* Question Header */}
              <div className="flex items-center justify-between border-b-[2px] border-on-surface pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-label-badge font-black uppercase text-secondary">
                    QUESTION {currentIndex + 1} OF 20
                  </span>
                  <span className="text-xs uppercase font-label-code px-2 py-0.5 rounded bg-surface-container border border-on-surface/40">
                    {currentQ.topic}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg border font-label-badge text-xs uppercase font-bold transition-all ${
                      isFlagged(currentQ.id) 
                        ? 'bg-amber-400 text-on-surface border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]' 
                        : 'border-on-surface/30 text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isFlagged(currentQ.id) ? 'bookmark' : 'bookmark_border'}
                    </span>
                    {isFlagged(currentQ.id) ? 'FLAGGED' : 'REVIEW LATER'}
                  </button>
                  <span className="font-label-code font-bold text-sm bg-primary-container px-2 py-0.5 rounded border border-on-surface">
                    +1 MARK
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <div className="font-label-code text-xs text-on-surface-variant uppercase mb-1">
                  [{currentQ.conceptTag}]
                </div>
                <h2 className="font-headline-lg text-xl sm:text-2xl text-on-surface leading-snug">
                  {currentQ.questionText}
                </h2>
              </div>

              {/* Options List */}
              <div className="grid grid-cols-1 gap-3.5 mb-8 flex-grow">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      className={`text-left p-4 rounded-xl border-[2px] transition-all font-body-lg flex items-center gap-3.5 ${
                        isSelected 
                          ? 'border-secondary bg-secondary-fixed/25 shadow-[4px_4px_0px_0px_#1c1b1b] translate-x-1 -translate-y-1' 
                          : 'border-on-surface bg-surface hover:bg-surface-container'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full border-[2px] flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'border-secondary bg-secondary text-on-secondary' : 'border-on-surface-variant text-on-surface'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="text-on-surface leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t-[2px] border-on-surface/20">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="bg-surface text-on-surface font-headline-md px-5 py-2.5 rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase text-sm"
                >
                  PREVIOUS
                </button>

                <div className="flex items-center gap-2">
                  {currentIndex < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                      className="bg-primary-container text-on-surface font-headline-md px-6 py-2.5 rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase text-sm"
                    >
                      NEXT
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowConfirmModal(true)}
                      className="bg-secondary text-on-secondary font-headline-md px-6 py-2.5 rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase text-sm"
                    >
                      FINISH TEST
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Question Palette & Status */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="bg-surface-container-lowest border-[3px] border-on-surface rounded-2xl p-5 shadow-[6px_6px_0px_0px_#1c1b1b]">
              <h3 className="font-headline-md text-base uppercase mb-3 flex items-center justify-between">
                <span>QUESTION PALETTE</span>
                <span className="font-label-code text-xs text-secondary font-bold">
                  {Object.keys(selectedAnswers).length} / 20 ANSWERED
                </span>
              </h3>

              {/* Palette Buttons Grid */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {filteredQuestions.map((q) => {
                  const idx = questions.findIndex(orig => orig.id === q.id);
                  const answered = isAnswered(q.id);
                  const flagged = isFlagged(q.id);
                  const isCur = idx === currentIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-10 rounded-lg font-headline-md text-xs border-[2px] transition-all relative ${
                        isCur 
                          ? 'border-on-surface bg-primary-container ring-2 ring-secondary font-black shadow-[2px_2px_0px_0px_#1c1b1b]' 
                          : answered 
                          ? 'border-secondary bg-secondary-fixed/40 text-on-surface' 
                          : 'border-on-surface/40 bg-surface text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {idx + 1}
                      {flagged && (
                        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-amber-400"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-label-badge text-on-surface-variant border-t border-on-surface/20 pt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-secondary-fixed/40 border border-secondary"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-surface border border-on-surface/40"></div>
                  <span>Unanswered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-primary-container border border-on-surface"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-amber-400 border border-on-surface"></div>
                  <span>Flagged</span>
                </div>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full py-3 bg-secondary text-on-secondary font-headline-md text-sm uppercase rounded-xl border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
                >
                  SUBMIT ASSESSMENT
                </button>
              </div>
            </div>

            {/* Topic Info Box */}
            <div className="bg-surface-container p-4 rounded-xl border-[2px] border-on-surface/50 text-xs font-body-md text-on-surface-variant space-y-2">
              <div className="font-headline-md text-xs uppercase font-bold text-on-surface">TOPIC BREAKDOWN</div>
              <div className="flex justify-between">
                <span>Inheritance (Q1-10):</span>
                <span className="font-bold text-on-surface">
                  {questions.filter(q => q.topic === 'Inheritance' && isAnswered(q.id)).length} / 10
                </span>
              </div>
              <div className="flex justify-between">
                <span>Polymorphism (Q11-20):</span>
                <span className="font-bold text-on-surface">
                  {questions.filter(q => q.topic === 'Polymorphism' && isAnswered(q.id)).length} / 10
                </span>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-[8px_8px_0px_0px_#1c1b1b]">
            <h3 className="font-headline-lg text-2xl uppercase mb-2">
              CONFIRM SUBMISSION?
            </h3>
            <p className="font-body-md text-on-surface-variant mb-4">
              You have answered <strong>{Object.keys(selectedAnswers).length}</strong> out of <strong>20</strong> questions.
              {Object.keys(selectedAnswers).length < 20 && (
                <span className="text-error block mt-1 font-bold">
                  You still have {20 - Object.keys(selectedAnswers).length} unattempted questions!
                </span>
              )}
            </p>

            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 bg-surface text-on-surface font-headline-md text-sm uppercase rounded-xl border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]"
              >
                RETURN TO TEST
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-secondary text-on-secondary font-headline-md text-sm uppercase rounded-xl border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5"
              >
                {isSubmitting ? 'SUBMITTING...' : 'YES, SUBMIT NOW'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OopsQuiz;
