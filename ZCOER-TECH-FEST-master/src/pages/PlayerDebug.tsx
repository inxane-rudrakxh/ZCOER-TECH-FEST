import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Editor from "@monaco-editor/react";
import { useAntiCheat } from "../hooks/useAntiCheat";

const PlayerDebug = () => {
  const { playerToken } = useParams<{ playerToken: string }>();
  const navigate = useNavigate();

  const [participant, setParticipant] = useState<any>(null);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  
  const [codes, setCodes] = useState<Record<string, string>>({});
  const [accumulatedScore, setAccumulatedScore] = useState(0);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cheated, setCheated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);

  useEffect(() => {
    const fetchDebugData = async () => {
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

        const { data: gameData } = await supabase.from("games").select("id, status").eq("slug", "debug").single();
        if (!gameData || gameData.status !== 'LIVE') throw new Error("Code Debugging is not currently LIVE.");

        const { data: challengeData } = await supabase.from("debug_challenges").select("*").eq("game_id", gameData.id).eq("status", "LIVE");
        if (!challengeData || challengeData.length === 0) throw new Error("No active debug challenges found.");
        
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

        if (easyChallenges.length < 3) {
           throw new Error("Missing easy challenges.");
        }

        const selectedEasy1 = easyChallenges[N % easyChallenges.length];
        const selectedEasy2 = easyChallenges[(N + 1) % easyChallenges.length];
        const selectedEasy3 = easyChallenges[(N + 2) % easyChallenges.length];

        const sortedChallenges = [selectedEasy1, selectedEasy2, selectedEasy3];
        setChallenges(sortedChallenges);

        // Fetch submissions
        const { data: attempts } = await supabase.from("debug_submissions").select("*").eq("participant_id", pData.id);
        
        let initialScore = 0;
        let startIndex = 0;
        let unsubmittedIndex = 0;
        let preloadedCodes: Record<string, string> = {};

        // Preload initial code for all challenges
        sortedChallenges.forEach(c => {
          preloadedCodes[c.id] = c.initial_code || "// Write your code here";
        });

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
          
          // Restore submitted code in state for historical purposes
          attempts.forEach(a => {
             preloadedCodes[a.challenge_id] = a.submitted_code;
          });
        }

        setCodes(preloadedCodes);
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

    fetchDebugData();
  }, [playerToken]);

  useEffect(() => {
    if (submitted || loading || error || cheated || timeLeft <= 0) return;
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
  }, [submitted, loading, error, cheated, currentChallengeIndex]);

  const { overlay: antiCheatOverlay } = useAntiCheat({
    isActive: !submitted && !loading && !error && challenges.length > 0 && !!participant,
    participantId: participant?.id || "",
    gameId: challenges[0]?.game_id || "",
    onDisqualify: () => {
      setCheated(true);
      handleCheatSubmit();
    }
  });

  const handleCheatSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const currentChallenge = challenges[currentChallengeIndex];
      await supabase.from("debug_submissions").upsert({
        challenge_id: currentChallenge.id,
        participant_id: participant.id,
        submitted_code: 'CHEATED_NO_CODE',
        score: 0,
        status: 'GRADED'
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
      const currentCode = codes[currentChallenge.id] || "";
      const timeTakenForThis = (currentChallenge.time_limit_minutes * 60) - timeLeft;
      const newTotalTime = totalTimeTaken + timeTakenForThis;
      setTotalTimeTaken(newTotalTime);

      let score = 0;
      
      const fnMatch = currentCode.match(/function\s+([a-zA-Z0-9_]+)/);
      let testScript = currentCode;
      
      if (fnMatch && currentChallenge.test_cases) {
        const fnName = fnMatch[1];
        testScript += `\n\n
const assert = require('assert');
const testCases = ${currentChallenge.test_cases};
let passed = 0;
for (let i = 0; i < testCases.length; i++) {
  const tc = testCases[i];
  const input = typeof tc.input === 'string' ? JSON.parse(tc.input) : tc.input;
  const expected = typeof tc.expected === 'string' ? JSON.parse(tc.expected) : tc.expected;
  const result = ${fnName}(input);
  try {
    assert.deepStrictEqual(result, expected);
    passed++;
  } catch (e) {
    console.error("Test failed on input:", tc.input);
  }
}
if (passed === testCases.length) {
  console.log("ALL_TESTS_PASSED");
}
`;
        
        // Call Piston API for Execution
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: "javascript",
            version: "18.15.0",
            files: [{ content: testScript }]
          })
        });
        
        const data = await response.json();
        const output = data.run?.stdout || "";
        const isPassed = output.includes("ALL_TESTS_PASSED");
        if (isPassed) {
          score = currentChallenge.max_score || 100;
        }
      }

      // Manual upsert for debug_submissions
      const { data: existingSub } = await supabase.from("debug_submissions")
        .select("id")
        .eq("challenge_id", currentChallenge.id)
        .eq("participant_id", participant.id)
        .single();

      let attemptError;
      if (existingSub) {
        const { error } = await supabase.from("debug_submissions").update({
          submitted_code: currentCode,
          score: score,
          status: 'GRADED'
        }).eq("id", existingSub.id);
        attemptError = error;
      } else {
        const { error } = await supabase.from("debug_submissions").insert({
          challenge_id: currentChallenge.id,
          participant_id: participant.id,
          submitted_code: currentCode,
          score: score,
          status: 'GRADED'
        });
        attemptError = error;
      }

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
      alert("Error submitting code!");
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
          <span className="material-symbols-outlined text-secondary text-6xl mb-4">terminal</span>
          <h1 className="font-headline-xl text-on-surface uppercase mb-2">CODE SUBMITTED</h1>
          <p className="font-body-lg text-on-surface-variant mb-6">Your code has been securely transmitted and auto-graded by our execution engine. Results will be posted to the global leaderboard.</p>
          <button onClick={() => navigate(`/player/${playerToken}`)} className="bg-primary-container text-on-surface font-headline-md px-6 py-3 border-[2px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:-translate-y-1 transition-all uppercase">
            RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  const currentChallenge = challenges[currentChallengeIndex];
  const currentCode = codes[currentChallenge.id] || "";

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full h-screen flex flex-col overflow-hidden">
      {antiCheatOverlay}
      <Header />
      <main className="w-full pt-20 flex-grow flex flex-col">
        <section className="w-full bg-surface-container border-b-[3px] border-on-surface py-3 px-4 flex-shrink-0">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-headline-md text-[18px] uppercase tracking-wider text-on-surface">
                ROUND 02: DEBUG ({currentChallengeIndex + 1}/{challenges.length})
              </span>
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
                {submitting ? 'SUBMITTING...' : (currentChallengeIndex === challenges.length - 1 ? 'FINAL SUBMIT' : 'SUBMIT & NEXT')}
              </button>
            </div>
          </div>
        </section>

        <section className="flex-grow flex flex-col lg:flex-row overflow-hidden border-b-[3px] border-on-surface max-w-7xl mx-auto w-full">
          {/* Left Panel: Problem Description */}
          <div className="w-full lg:w-1/3 bg-surface-container-lowest p-6 overflow-y-auto border-r-[3px] border-on-surface flex flex-col gap-4">
            <h2 className="font-headline-lg text-2xl uppercase border-b-[2px] border-on-surface pb-3">{currentChallenge.title}</h2>
            <div className="font-body-lg text-on-surface-variant whitespace-pre-wrap">
              {currentChallenge.description}
            </div>
            {currentChallenge.test_cases && (
              <div className="mt-4">
                <h3 className="font-label-badge font-bold uppercase mb-2">Expected Test Cases</h3>
                <pre className="bg-surface p-3 font-label-code text-sm border-[2px] border-on-surface rounded">
                  {currentChallenge.test_cases}
                </pre>
              </div>
            )}
          </div>
          
          {/* Right Panel: Editor */}
          <div className="w-full lg:w-2/3 h-full flex flex-col relative bg-[#1e1e1e]">
            <Editor
              height="100%"
              defaultLanguage={currentChallenge.language || "javascript"}
              theme="vs-dark"
              value={currentCode}
              onChange={(val) => setCodes(prev => ({ ...prev, [currentChallenge.id]: val || "" }))}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                lineNumbersMinChars: 3,
                folding: false,
                scrollBeyondLastLine: false,
                readOnly: submitting
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlayerDebug;
