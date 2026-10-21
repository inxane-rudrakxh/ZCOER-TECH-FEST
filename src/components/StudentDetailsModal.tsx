import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface StudentDetailsModalProps {
  participantId: string;
  onClose: () => void;
}

const StudentDetailsModal = ({ participantId, onClose }: StudentDetailsModalProps) => {
  const [loading, setLoading] = useState(true);
  const [participant, setParticipant] = useState<any>(null);
  const [scores, setScores] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        // Fetch participant details
        const { data: pData } = await supabase
          .from("participants")
          .select("*, registration_campaigns(name)")
          .eq("id", participantId)
          .single();
        setParticipant(pData);

        // Fetch scores with game names
        const { data: sData } = await supabase
          .from("scores")
          .select("*, games(name)")
          .eq("participant_id", participantId);
        setScores(sData || []);

        // Fetch submissions (Debug and AI) to see status
        const { data: debugSubs } = await supabase
          .from("debug_submissions")
          .select("*, debug_challenges(title, game_id)")
          .eq("participant_id", participantId);
          
        const { data: aiSubs } = await supabase
          .from("ai_submissions")
          .select("*, ai_challenges(title, game_id)")
          .eq("participant_id", participantId);

        const allSubs: any[] = [];
        if (debugSubs) allSubs.push(...debugSubs.map(s => ({ type: 'Debug', title: s.debug_challenges?.title, score: s.score, status: s.status, time: s.created_at })));
        if (aiSubs) allSubs.push(...aiSubs.map(s => ({ type: 'AI', title: s.ai_challenges?.title, score: s.score, status: s.status, time: s.created_at })));
        
        setSubmissions(allSubs.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()));

      } catch (err) {
        console.error("Error fetching student details", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (participantId) fetchDetails();
  }, [participantId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface border-[4px] border-on-surface shadow-[8px_8px_0px_0px_#1c1b1b] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-primary-container p-4 border-b-[4px] border-on-surface flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-on-surface">account_box</span>
            <h2 className="font-headline-lg uppercase text-xl">Operator File</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-on-surface hover:bg-surface-container p-1 rounded transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-6">
          {loading ? (
            <div className="text-center font-label-code py-10">DECRYPTING FILE...</div>
          ) : !participant ? (
            <div className="text-center font-label-code py-10 text-error">ERROR LOADING OPERATOR</div>
          ) : (
            <>
              {/* Profile Card */}
              <div className="bg-surface-container-lowest p-5 rounded-xl border-[2px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] flex flex-wrap justify-between gap-4">
                <div>
                  <div className="font-label-badge text-xs uppercase text-on-surface-variant font-bold">NAME</div>
                  <div className="font-headline-md text-2xl uppercase">{participant.full_name}</div>
                  <div className="font-label-code text-secondary font-bold mt-1">ID: {participant.player_id}</div>
                </div>
                <div className="text-right">
                  <div className="font-label-badge text-xs uppercase text-on-surface-variant font-bold">CAMPAIGN / DEPT</div>
                  <div className="font-headline-sm uppercase">{participant.registration_campaigns?.name || 'General'}</div>
                  <div className="font-body-sm mt-1">{participant.department}</div>
                </div>
              </div>

              {/* Scores Section */}
              <div>
                <h3 className="font-headline-sm uppercase border-b-2 border-on-surface pb-2 mb-3">Arena Scores</h3>
                {scores.length === 0 ? (
                  <div className="font-label-code text-on-surface-variant">NO SCORES RECORDED.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {scores.map(s => (
                      <div key={s.id} className="bg-surface p-4 border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] rounded text-center">
                        <div className="font-label-badge font-bold uppercase text-on-surface-variant mb-1 line-clamp-1">{s.games?.name}</div>
                        <div className="font-headline-lg text-secondary text-3xl">{s.score}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submissions Section */}
              <div>
                <h3 className="font-headline-sm uppercase border-b-2 border-on-surface pb-2 mb-3">Recent Submissions</h3>
                {submissions.length === 0 ? (
                  <div className="font-label-code text-on-surface-variant">NO SUBMISSIONS FOUND.</div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {submissions.map((sub, i) => (
                      <div key={i} className="flex justify-between items-center bg-surface-container p-3 border border-on-surface rounded">
                        <div>
                          <div className="font-label-code text-xs font-bold uppercase text-secondary">{sub.type} CHALLENGE</div>
                          <div className="font-headline-sm uppercase text-sm mt-0.5">{sub.title}</div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <span className={`font-label-badge font-bold px-2 py-0.5 rounded text-[10px] uppercase ${sub.status === 'GRADED' ? 'bg-primary-container text-on-surface' : 'bg-surface-variant text-on-surface-variant'}`}>
                            {sub.status}
                          </span>
                          {sub.status === 'GRADED' && (
                            <span className="font-label-code mt-1 font-bold text-sm">PTS: {sub.score}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
