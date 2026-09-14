import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Editor from "@monaco-editor/react";

const PlayerDebug = () => {
  const { playerToken } = useParams<{ playerToken: string }>();
  const navigate = useNavigate();

  const [participant, setParticipant] = useState<any>(null);
  const [challenge, setChallenge] = useState<any>(null);
  
  const [code, setCode] = useState<string>("// Loading environment...");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchDebugData = async () => {
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

        // Fetch debug game ID
        const { data: gameData } = await supabase.from("games").select("id, status").eq("slug", "debug").single();
        if (!gameData || gameData.status !== 'LIVE') throw new Error("Code Debugging is not currently LIVE.");

        // Fetch active debug challenge
        const { data: challengeData } = await supabase.from("debug_challenges").select("*").eq("game_id", gameData.id).eq("status", "LIVE").single();
        if (!challengeData) throw new Error("No active challenge found.");
        setChallenge(challengeData);
        setTimeLeft(challengeData.time_limit_minutes * 60);

        // Check if already submitted
        const { data: attemptData } = await supabase.from("debug_submissions").select("*").eq("challenge_id", challengeData.id).eq("participant_id", pData.id).single();
        if (attemptData) {
          setSubmitted(true);
          setCode(attemptData.submitted_code);
        } else {
          setCode(challengeData.initial_code || "// Write your code here");
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDebugData();
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
  }, [timeLeft, submitted, loading, error, code]); // added code to dependencies so auto-submit gets latest code

  const handleSubmit = async () => {
    if (submitted || submitting) return;
    setSubmitting(true);
    
    try {
      const { error: attemptError } = await supabase.from("debug_submissions").upsert({
        challenge_id: challenge.id,
        participant_id: participant.id,
        submitted_code: code,
        status: 'SUBMITTED'
      }, { onConflict: 'challenge_id, participant_id' });

      if (attemptError) throw attemptError;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Error submitting code!");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center font-label-code">LOADING IDE...</div>;
  if (error) return <div className="min-h-screen bg-surface flex items-center justify-center font-label-code text-error">{error}</div>;

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
        <div className="bg-surface-container-lowest border-[4px] border-secondary p-10 text-center shadow-[8px_8px_0px_0px_#1c1b1b] rounded-2xl max-w-lg w-full">
          <span className="material-symbols-outlined text-secondary text-6xl mb-4">terminal</span>
          <h1 className="font-headline-xl text-on-surface uppercase mb-2">CODE SUBMITTED</h1>
          <p className="font-body-lg text-on-surface-variant mb-6">Your code is currently under review by the judging panel. Results will be posted to the global leaderboard.</p>
          <button onClick={() => navigate(`/player/${playerToken}`)} className="bg-primary-container text-on-surface font-headline-md px-6 py-3 border-[2px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-1 transition-all uppercase">
            RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="w-full pt-20 flex-grow flex flex-col">
        <section className="w-full bg-surface-container border-b-[3px] border-on-surface py-3 px-4 flex-shrink-0">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-headline-md text-[18px] uppercase tracking-wider text-on-surface">ROUND 02: DEBUG</span>
              <span className="bg-error text-on-error px-2 py-0.5 font-bold uppercase text-xs rounded animate-pulse">LIVE</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-on-surface text-surface px-4 py-1.5 rounded-full shadow-[3px_3px_0px_0px_#1c1b1b]">
                <span className="material-symbols-outlined text-[18px]">timer</span>
                <span className="font-label-code font-bold tracking-widest uppercase">{formatTime(timeLeft)} REMAINING</span>
              </div>
              <button 
                onClick={handleSubmit} 
                disabled={submitting}
                className="bg-secondary text-on-secondary font-headline-md px-6 py-1.5 border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 uppercase"
              >
                {submitting ? 'SUBMITTING...' : 'SUBMIT CODE'}
              </button>
            </div>
          </div>
        </section>

        <section className="flex-grow flex flex-col lg:flex-row overflow-hidden border-b-[3px] border-on-surface max-w-7xl mx-auto w-full">
          {/* Left Panel: Problem Description */}
          <div className="w-full lg:w-1/3 bg-surface-container-lowest p-6 overflow-y-auto border-r-[3px] border-on-surface flex flex-col gap-4">
            <h2 className="font-headline-lg text-2xl uppercase border-b-[2px] border-on-surface pb-3">{challenge.title}</h2>
            <div className="font-body-lg text-on-surface-variant whitespace-pre-wrap">
              {challenge.description}
            </div>
            {challenge.test_cases && (
              <div className="mt-4">
                <h3 className="font-label-badge font-bold uppercase mb-2">Expected Test Cases</h3>
                <pre className="bg-surface p-3 font-label-code text-sm border-[2px] border-on-surface rounded">
                  {challenge.test_cases}
                </pre>
              </div>
            )}
          </div>
          
          {/* Right Panel: Editor */}
          <div className="w-full lg:w-2/3 h-full flex flex-col relative bg-[#1e1e1e]">
            <Editor
              height="100%"
              defaultLanguage={challenge.language || "javascript"}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                fontFamily: 'monospace',
                padding: { top: 16 }
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlayerDebug;
