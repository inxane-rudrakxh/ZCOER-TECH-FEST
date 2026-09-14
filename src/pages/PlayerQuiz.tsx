import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const PlayerQuiz = () => {
  const { playerToken } = useParams<{ playerToken: string }>();
  const navigate = useNavigate();

  const [participant, setParticipant] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        if (!playerToken) throw new Error("No token provided");

        // Fetch participant
        const { data: pData, error: pError } = await supabase
          .from("participants")
          .select("*")
          .eq("secure_token", playerToken)
          .single();

        if (pError || !pData) throw new Error("Invalid or expired access link.");
        if (!pData.is_verified) throw new Error("Participant not verified.");
        setParticipant(pData);

        // Fetch quiz game ID
        const { data: gameData } = await supabase.from("games").select("id, status").eq("slug", "quiz").single();
        if (!gameData || gameData.status !== 'LIVE') throw new Error("Quiz is not currently LIVE.");

        // Fetch active quiz
        const { data: quizData } = await supabase.from("quizzes").select("*").eq("game_id", gameData.id).eq("status", "LIVE").single();
        if (!quizData) throw new Error("No active quiz found.");
        setQuiz(quizData);
        setTimeLeft(quizData.duration_minutes * 60);

        // Fetch questions and options
        const { data: qData } = await supabase.from("quiz_questions").select("*, quiz_options(*)").eq("quiz_id", quizData.id);
        if (qData) {
          // Shuffle questions
          const shuffledQuestions = [...qData].sort(() => Math.random() - 0.5);
          setQuestions(shuffledQuestions);
        }

        // Check if already submitted
        const { data: attemptData } = await supabase.from("quiz_attempts").select("*").eq("quiz_id", quizData.id).eq("participant_id", pData.id).single();
        if (attemptData && attemptData.status === 'COMPLETED') {
          setSubmitted(true);
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [playerToken]);

  useEffect(() => {
    if (timeLeft <= 0 || submitted || loading || error) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, loading, error]);

  const handleSelect = (questionId: string, optionId: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    if (submitted || submitting) return;
    setSubmitting(true);
    
    try {
      // Calculate score
      let calculatedScore = 0;
      const answerInserts = [];
      
      for (const q of questions) {
        const selectedOpt = answers[q.id];
        const isCorrect = selectedOpt === q.correct_option_id;
        if (isCorrect) calculatedScore += q.marks;
        
        if (selectedOpt) {
          answerInserts.push({
            question_id: q.id,
            selected_option_id: selectedOpt,
            is_correct: isCorrect
          });
        }
      }

      // Insert attempt
      const { error: attemptError } = await supabase.from("quiz_attempts").upsert({
        quiz_id: quiz.id,
        participant_id: participant.id,
        score: calculatedScore,
        status: 'COMPLETED',
        end_time: new Date().toISOString()
      }, { onConflict: 'quiz_id, participant_id' }).select().single();

      if (attemptError) throw attemptError;

      // Update global scores
      await supabase.from("scores").upsert({
        participant_id: participant.id,
        game_id: quiz.game_id,
        score: calculatedScore,
        time_taken_seconds: (quiz.duration_minutes * 60) - timeLeft
      }, { onConflict: 'participant_id, game_id' });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz!");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center font-label-code">LOADING...</div>;
  if (error) return <div className="min-h-screen bg-surface flex items-center justify-center font-label-code text-error">{error}</div>;

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
        <div className="bg-surface-container-lowest border-[4px] border-secondary p-10 text-center shadow-[8px_8px_0px_0px_#1c1b1b] rounded-2xl max-w-lg w-full">
          <span className="material-symbols-outlined text-secondary text-6xl mb-4">task_alt</span>
          <h1 className="font-headline-xl text-on-surface uppercase mb-2">QUIZ COMPLETED</h1>
          <div className="bg-primary-container p-6 rounded-xl border-[2px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] text-center mb-6">
            <span className="material-symbols-outlined text-4xl text-on-surface mb-2">verified</span>
            <h2 className="font-headline-lg text-2xl uppercase text-on-surface mb-2">Quiz Submitted Successfully</h2>
            <div className="font-body-md text-on-surface-variant">
              Awaiting Leaderboard Reveal. Keep an eye on the main arena!
            </div>
          </div>
          <button onClick={() => navigate(`/player/${playerToken}`)} className="bg-primary-container text-on-surface font-headline-md px-6 py-3 border-[2px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-1 transition-all uppercase">
            RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-28 flex-grow flex flex-col">
        <section className="w-full bg-surface-container border-b-[3px] border-on-surface py-3 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-headline-md text-[18px] uppercase tracking-wider text-on-surface">ROUND 01: QUIZ</span>
              <span className="bg-error text-on-error px-2 py-0.5 font-bold uppercase text-xs rounded animate-pulse">LIVE</span>
            </div>
            <div className="flex items-center gap-2 bg-on-surface text-surface px-4 py-1.5 rounded-full shadow-[3px_3px_0px_0px_#1c1b1b]">
              <span className="material-symbols-outlined text-[18px]">timer</span>
              <span className="font-label-code font-bold tracking-widest uppercase">{formatTime(timeLeft)} REMAINING</span>
            </div>
          </div>
        </section>

        <section className="w-full px-4 py-8 max-w-4xl mx-auto space-y-12">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 shadow-[8px_8px_0px_0px_#1c1b1b]">
              <div className="flex justify-between items-start mb-4 border-b-[2px] border-on-surface pb-4">
                <span className="font-label-badge font-bold uppercase text-secondary">QUESTION {idx + 1}</span>
                <span className="font-label-code font-bold">{q.marks} PTS</span>
              </div>
              <h2 className="font-headline-lg text-xl mb-6">{q.question_text}</h2>
              <div className="grid grid-cols-1 gap-3">
                {q.quiz_options.map((opt: any) => {
                  const isSelected = answers[q.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      className={`text-left p-4 rounded-xl border-[2px] transition-all font-body-lg flex items-center gap-3 ${
                        isSelected 
                          ? 'border-secondary bg-secondary-fixed/20 shadow-[4px_4px_0px_0px_#1c1b1b] translate-x-1 -translate-y-1' 
                          : 'border-on-surface bg-surface hover:bg-surface-container'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-[2px] flex items-center justify-center ${isSelected ? 'border-secondary' : 'border-on-surface-variant'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>}
                      </div>
                      {opt.option_text}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          
          <div className="flex justify-end pb-20">
            <button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="bg-secondary text-on-secondary font-headline-lg text-xl uppercase px-8 py-4 border-[4px] border-on-surface shadow-[6px_6px_0px_0px_#1c1b1b] hover:-translate-y-1 active:translate-y-1 transition-all disabled:opacity-50"
            >
              {submitting ? 'SUBMITTING...' : 'SUBMIT QUIZ'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlayerQuiz;
