import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const PlayerAi = () => {
  const { playerToken } = useParams<{ playerToken: string }>();
  const navigate = useNavigate();

  const [participant, setParticipant] = useState<any>(null);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  
  const [prompts, setPrompts] = useState<Record<string, string>>({});
  const [accumulatedScore, setAccumulatedScore] = useState(0);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cheated, setCheated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);

  useEffect(() => {
    const fetchAiData = async () => {
      try {
        if (!playerToken) throw new Error("No token provided");

        const { data: pData, error: pError } = await supabase
          .from("participants")
          .select("*")
          .eq("secure_token", playerToken)
          .single();

        if (pError || !pData) throw new Error("Invalid or expired access link.");
        if (!pData.is_verified) throw new Error("Participant not verified.");
        setParticipant(pData);

        const { data: gameData } = await supabase.from("games").select("id, status").eq("slug", "ai").single();
        if (!gameData || gameData.status !== 'LIVE') throw new Error("AI Challenge is not currently LIVE.");

        const { data: challengeData } = await supabase.from("ai_challenges").select("*").eq("game_id", gameData.id).eq("status", "LIVE");
        if (!challengeData || challengeData.length === 0) throw new Error("No active AI challenges found.");
        
        const uuidToSeed = (uuid: string) => {
          let hash = 0;
          for (let i = 0; i < uuid.length; i++) {
            hash = (hash << 5) - hash + uuid.charCodeAt(i);
            hash |= 0;
          }
          return Math.abs(hash);
        };
        
        const N = uuidToSeed(pData.id);
        const easyChallenges = challengeData.filter(c => c.difficulty === 'easy');
        const mediumChallenges = challengeData.filter(c => c.difficulty === 'medium');
        const hardChallenges = challengeData.filter(c => c.difficulty === 'hard');

        if (easyChallenges.length === 0 || mediumChallenges.length === 0 || hardChallenges.length === 0) {
           throw new Error("Missing challenges for one or more difficulties.");
        }

        const selectedEasy = easyChallenges[N % easyChallenges.length];
        const selectedMedium = mediumChallenges[N % mediumChallenges.length];
        const selectedHard = hardChallenges[N % hardChallenges.length];

        const sortedChallenges = [selectedEasy, selectedMedium, selectedHard];
        setChallenges(sortedChallenges);

        // Fetch submissions
        const { data: attempts } = await supabase.from("ai_submissions").select("*").eq("participant_id", pData.id);
        
        let initialScore = 0;
        let startIndex = 0;
        let unsubmittedIndex = -1;

        if (attempts && attempts.length > 0) {
          const submittedChallengeIds = attempts.map(a => a.challenge_id);
          unsubmittedIndex = sortedChallenges.findIndex(c => !submittedChallengeIds.includes(c.id));
          
          initialScore = attempts.reduce((acc, curr) => acc + Number(curr.score), 0);

          if (unsubmittedIndex === -1) {
            setSubmitted(true);
            startIndex = sortedChallenges.length - 1;
          } else {
            startIndex = unsubmittedIndex;
          }
        }

        setAccumulatedScore(initialScore);
        setCurrentChallengeIndex(startIndex);
        
        if (unsubmittedIndex !== -1 && !submitted) {
           setTimeLeft(sortedChallenges[startIndex].time_limit_minutes * 60);
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
  }, [timeLeft, submitted, loading, error, prompts, cheated, currentChallengeIndex]);

  useEffect(() => {
    if (submitted || cheated || loading || error || challenges.length === 0 || !participant) return;

    window.history.pushState(null, "", window.location.href);

    const handleCheatTrigger = () => {
      setCheated(true);
      handleCheatSubmit();
    };

    const handleVisibilityChange = (e?: Event) => {
      if (document.hidden || e?.type === 'blur') {
        handleCheatTrigger();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleVisibilityChange);
    window.addEventListener("popstate", handleCheatTrigger);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleVisibilityChange);
      window.removeEventListener("popstate", handleCheatTrigger);
    };
  }, [submitted, cheated, loading, error, challenges, participant]);

  const handleCheatSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const currentChallenge = challenges[currentChallengeIndex];
      await supabase.from("ai_submissions").upsert({
        challenge_id: currentChallenge.id,
        participant_id: participant.id,
        prompt_used: 'CHEATED_NO_PROMPT',
        score: 0,
        status: 'EVALUATED'
      }, { onConflict: 'challenge_id, participant_id' });
      await supabase.from("scores").upsert({
        participant_id: participant.id,
        game_id: currentChallenge.game_id,
        score: 0,
        time_taken_seconds: 9999
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
      const currentChallenge = challenges[currentChallengeIndex];
      const currentPrompt = prompts[currentChallenge.id] || "";
      const timeTakenForThis = (currentChallenge.time_limit_minutes * 60) - timeLeft;
      const newTotalTime = totalTimeTaken + timeTakenForThis;
      setTotalTimeTaken(newTotalTime);

      let score = 0;
      const apiKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
      
      if (apiKey && currentPrompt.trim().length > 0) {
        const systemInstruction = `You are an expert technical judge evaluating a student's prompt. 
The scenario is: "${currentChallenge.scenario_description}". 
Evaluate the student's prompt based on how well it solves the scenario.
Return ONLY a valid JSON object in this exact format:
{ "score": [an integer between 0 and 100], "feedback": "[a short 1-sentence explanation]" }`;

        const response = await fetch(`https://ai-examiner-openai.openai.azure.com/openai/deployments/gpt41mini-examiner/chat/completions?api-version=2024-02-15-preview`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'api-key': apiKey
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: systemInstruction },
              { role: "user", content: currentPrompt }
            ],
            response_format: { type: "json_object" }
          })
        });

        const data = await response.json();
        try {
          const resultText = data.choices[0].message.content;
          const resultJson = JSON.parse(resultText);
          score = resultJson.score || 0;
          console.log("AI Feedback:", resultJson.feedback);
        } catch (e) {
          console.error("Failed to parse Azure OpenAI response", e, data);
        }
      }

      const { error: attemptError } = await supabase.from("ai_submissions").upsert({
        challenge_id: currentChallenge.id,
        participant_id: participant.id,
        prompt_used: currentPrompt,
        score: score,
        status: 'EVALUATED'
      }, { onConflict: 'challenge_id, participant_id' });

      if (attemptError) throw attemptError;
      
      const newAccumulatedScore = accumulatedScore + score;
      setAccumulatedScore(newAccumulatedScore);

      if (currentChallengeIndex < challenges.length - 1) {
        // Move to next challenge
        const nextIndex = currentChallengeIndex + 1;
        setCurrentChallengeIndex(nextIndex);
        setTimeLeft(challenges[nextIndex].time_limit_minutes * 60);
        setSubmitting(false);
      } else {
        // Final challenge submitted
        await supabase.from("scores").upsert({
          participant_id: participant.id,
          game_id: currentChallenge.game_id,
          score: newAccumulatedScore,
          time_taken_seconds: newTotalTime
        }, { onConflict: 'participant_id, game_id' });

        setSubmitted(true);
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting prompt!");
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
          <span className="material-symbols-outlined text-secondary text-6xl mb-4">robot_2</span>
          <h1 className="font-headline-xl text-on-surface uppercase mb-2">AI CHALLENGES COMPLETED</h1>
          <div className="bg-primary-container p-6 rounded-xl border-[2px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] text-center mb-6">
            <span className="material-symbols-outlined text-4xl text-on-surface mb-2">memory</span>
            <h2 className="font-headline-lg text-2xl uppercase text-on-surface mb-2">Auto-Grading Complete</h2>
            <div className="font-body-md text-on-surface-variant">
              Your final score across all 3 AI puzzles has been logged!
            </div>
          </div>
          <button onClick={() => navigate(`/player/${playerToken}`)} className="bg-primary-container text-on-surface font-headline-md px-6 py-3 border-[2px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-1 transition-all uppercase">
            RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  const currentChallenge = challenges[currentChallengeIndex];
  const currentPrompt = prompts[currentChallenge.id] || "";

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-28 flex-grow flex flex-col">
        <section className="w-full bg-surface-container border-b-[3px] border-on-surface py-3 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-headline-md text-[18px] uppercase tracking-wider text-on-surface">
                ROUND 03: {currentChallenge.title} ({currentChallengeIndex + 1}/{challenges.length})
              </span>
              <span className="bg-error text-on-error px-2 py-0.5 font-bold uppercase text-xs rounded animate-pulse">LIVE</span>
            </div>
            <div className="flex items-center gap-2 bg-on-surface text-surface px-4 py-1.5 rounded-full shadow-[3px_3px_0px_0px_#1c1b1b]">
              <span className="material-symbols-outlined text-[18px]">timer</span>
              <span className="font-label-code font-bold tracking-widest uppercase">{formatTime(timeLeft)} REMAINING</span>
            </div>
          </div>
        </section>

        <section className="w-full px-4 py-8 max-w-4xl mx-auto flex flex-col gap-6 flex-grow">
          <div className="bg-surface-container-lowest border-[4px] border-on-surface p-6 rounded-2xl shadow-[8px_8px_0px_0px_#1c1b1b]">
            <h2 className="font-headline-lg text-2xl uppercase mb-4 text-primary">SCENARIO:</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              {currentChallenge.scenario_description}
            </p>
          </div>

          <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl shadow-[8px_8px_0px_0px_#1c1b1b] flex-grow flex flex-col overflow-hidden">
            <div className="bg-primary px-4 py-3 border-b-[4px] border-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-on-primary">terminal</span>
              <span className="font-label-code font-bold uppercase tracking-wider text-on-primary">System Prompt Input</span>
            </div>
            <textarea 
              value={currentPrompt}
              onChange={(e) => setPrompts(prev => ({ ...prev, [currentChallenge.id]: e.target.value }))}
              placeholder="Write your bulletproof prompt here..."
              className="w-full h-64 p-6 bg-transparent resize-none focus:outline-none font-body-lg"
              disabled={submitting}
            />
          </div>

          <div className="flex justify-end pb-12">
            <button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="bg-secondary text-on-secondary font-headline-lg text-xl uppercase px-8 py-4 border-[4px] border-on-surface shadow-[6px_6px_0px_0px_#1c1b1b] hover:-translate-y-1 active:translate-y-1 transition-all disabled:opacity-50"
            >
              {submitting ? 'EVALUATING...' : (currentChallengeIndex === challenges.length - 1 ? 'SUBMIT FINAL PROMPT' : 'SUBMIT & NEXT')}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlayerAi;
