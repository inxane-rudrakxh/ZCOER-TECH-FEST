import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const PlayerAi = () => {
  const { playerToken } = useParams<{ playerToken: string }>();
  const navigate = useNavigate();

  const [participant, setParticipant] = useState<any>(null);
  const [challenge, setChallenge] = useState<any>(null);
  
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cheated, setCheated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchAiData = async () => {
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

        // Fetch AI game ID
        const { data: gameData } = await supabase.from("games").select("id, status").eq("slug", "ai").single();
        if (!gameData || gameData.status !== 'LIVE') throw new Error("AI Challenge is not currently LIVE.");

        // Fetch active AI challenge
        const { data: challengeData } = await supabase.from("ai_challenges").select("*").eq("game_id", gameData.id).eq("status", "LIVE").single();
        if (!challengeData) throw new Error("No active AI challenge found.");
        setChallenge(challengeData);
        setTimeLeft(30 * 60); // Default 30 minutes for AI

        // Check if already submitted
        const { data: attemptData } = await supabase.from("ai_submissions").select("*").eq("challenge_id", challengeData.id).eq("participant_id", pData.id).single();
        if (attemptData) {
          setSubmitted(true);
          setPrompt(attemptData.prompt_used || "");
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAiData();
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
  }, [timeLeft, submitted, loading, error, prompt, cheated]);

  useEffect(() => {
    if (submitted || cheated || loading || error || !challenge || !participant) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCheated(true);
        handleCheatSubmit();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleVisibilityChange);
    };
  }, [submitted, cheated, loading, error, challenge, participant]);

  const handleCheatSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await supabase.from("ai_submissions").upsert({
        challenge_id: challenge.id,
        participant_id: participant.id,
        prompt_used: 'CHEATED_NO_PROMPT',
        score: 0,
        status: 'EVALUATED'
      }, { onConflict: 'challenge_id, participant_id' });
      await supabase.from("scores").upsert({
        participant_id: participant.id,
        game_id: challenge.game_id,
        score: 0,
        time_taken_seconds: 30 * 60
      }, { onConflict: 'participant_id, game_id' });
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (submitted || submitting) return;
    setSubmitting(true);
    
    try {
      let score = 0;
      
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (apiKey) {
        const systemInstruction = `You are an expert technical judge evaluating a student's prompt. 
The scenario is: "${challenge.scenario_description}". 
Evaluate the student's prompt based on how well it solves the scenario.
Return ONLY a valid JSON object in this exact format:
{ "score": [an integer between 0 and 100], "feedback": "[a short 1-sentence explanation]" }`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        const data = await response.json();
        try {
          const resultText = data.candidates[0].content.parts[0].text;
          const resultJson = JSON.parse(resultText);
          score = resultJson.score || 0;
          console.log("AI Feedback:", resultJson.feedback);
        } catch (e) {
          console.error("Failed to parse Gemini response", e);
        }
      } else {
        console.warn("VITE_GEMINI_API_KEY is not set. Skipping auto-grading.");
      }

      const { error: attemptError } = await supabase.from("ai_submissions").upsert({
        challenge_id: challenge.id,
        participant_id: participant.id,
        prompt_used: prompt,
        score: score,
        status: 'EVALUATED'
      }, { onConflict: 'challenge_id, participant_id' });

      if (attemptError) throw attemptError;
      
      if (apiKey) {
        await supabase.from("scores").upsert({
          participant_id: participant.id,
          game_id: challenge.game_id,
          score: score,
          time_taken_seconds: 30 * 60 - timeLeft
        }, { onConflict: 'participant_id, game_id' });
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Error submitting prompt!");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center font-label-code">LOADING AI ENGINE...</div>;
  if (error) return <div className="min-h-screen bg-surface flex items-center justify-center font-label-code text-error">{error}</div>;

  if (cheated) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
        <div className="bg-surface-container-lowest border-[4px] border-error p-10 text-center shadow-[8px_8px_0px_0px_#b3261e] rounded-2xl max-w-lg w-full">
          <span className="material-symbols-outlined text-error text-6xl mb-4">gavel</span>
          <h1 className="font-headline-xl text-error uppercase mb-2">CHEATING DETECTED</h1>
          <p className="font-body-lg text-on-surface-variant mb-6">You left the arena during a live challenge. Your attempt has been forfeited and a score of 0 has been recorded.</p>
          <button onClick={() => navigate(`/player/${playerToken}`)} className="bg-primary-container text-on-surface font-headline-md px-6 py-3 border-[2px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-1 transition-all uppercase">
            RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
        <div className="bg-surface-container-lowest border-[4px] border-secondary p-10 text-center shadow-[8px_8px_0px_0px_#1c1b1b] rounded-2xl max-w-lg w-full">
          <span className="material-symbols-outlined text-secondary text-6xl mb-4">smart_toy</span>
          <h1 className="font-headline-xl text-on-surface uppercase mb-2">PROMPT SUBMITTED</h1>
          <p className="font-body-lg text-on-surface-variant mb-6">Your prompt has been auto-graded by our AI engine. Results will be posted to the global leaderboard.</p>
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
              <span className="font-headline-md text-[18px] uppercase tracking-wider text-on-surface">ROUND 03: AI PROMPT</span>
              <span className="bg-error text-on-error px-2 py-0.5 font-bold uppercase text-xs rounded animate-pulse">LIVE</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-on-surface text-surface px-4 py-1.5 rounded-full shadow-[3px_3px_0px_0px_#1c1b1b]">
                <span className="material-symbols-outlined text-[18px]">timer</span>
                <span className="font-label-code font-bold tracking-widest uppercase">{formatTime(timeLeft)} REMAINING</span>
              </div>
              <button 
                onClick={handleSubmit} 
                disabled={submitting || prompt.trim() === ""}
                className="bg-secondary text-on-secondary font-headline-md px-6 py-1.5 border-[2px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 uppercase"
              >
                {submitting ? 'SUBMITTING...' : 'SUBMIT PROMPT'}
              </button>
            </div>
          </div>
        </section>

        <section className="flex-grow flex flex-col lg:flex-row overflow-hidden border-b-[3px] border-on-surface max-w-7xl mx-auto w-full">
          {/* Left Panel: Scenario Description */}
          <div className="w-full lg:w-1/3 bg-surface-container-lowest p-6 overflow-y-auto border-r-[3px] border-on-surface flex flex-col gap-4">
            <h2 className="font-headline-lg text-2xl uppercase border-b-[2px] border-on-surface pb-3">{challenge.title}</h2>
            <div className="font-body-lg text-on-surface-variant whitespace-pre-wrap">
              {challenge.scenario_description}
            </div>
            <div className="mt-8 p-4 bg-primary-container text-on-surface border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]">
              <span className="font-label-badge font-bold uppercase flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-lg">info</span> Tip
              </span>
              <p className="text-sm font-label-code">Craft a precise, deterministic prompt that achieves the exact constraints specified in the scenario.</p>
            </div>
          </div>
          
          {/* Right Panel: Prompt Input */}
          <div className="w-full lg:w-2/3 h-full flex flex-col p-6 bg-surface-container">
            <h3 className="font-headline-md uppercase mb-4 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined">edit_document</span> 
              Your Master Prompt
            </h3>
            <textarea
              className="flex-grow w-full bg-surface-container-lowest border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] p-4 font-body-lg resize-none focus:outline-none focus:border-secondary"
              placeholder="Enter your AI prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlayerAi;
