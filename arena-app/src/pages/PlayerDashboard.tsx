import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const PlayerDashboard = () => {
  const { playerToken } = useParams<{ playerToken: string }>();
  const navigate = useNavigate();
  
  const [participant, setParticipant] = useState<any>(null);
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (!playerToken) throw new Error("No token provided");

        // Fetch participant
        const { data: pData, error: pError } = await supabase
          .from("participants")
          .select("*, registration_campaigns(name)")
          .eq("secure_token", playerToken)
          .single();

        if (pError || !pData) {
          throw new Error("Invalid or expired access link.");
        }
        setParticipant(pData);

        // Fetch games for this campaign
        // First get the campaign_games mapping
        const { data: cgData } = await supabase
          .from("registration_campaign_games")
          .select("game_id")
          .eq("campaign_id", pData.registered_via_campaign);

        if (cgData && cgData.length > 0) {
          const gameIds = cgData.map((cg) => cg.game_id);
          const { data: gData } = await supabase
            .from("games")
            .select("*")
            .in("id", gameIds)
            .order("created_at", { ascending: true });
          
          if (gData) {
            setGames(gData);
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [playerToken]);

  const getGameNumberText = (slug: string) => {
    if (slug === 'quiz') return '01 THINK';
    if (slug === 'debug') return '02 DEBUG';
    if (slug === 'ai') return '03 CREATE';
    return 'ROUND';
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "LIVE": return { text: "LIVE", color: "bg-error text-on-error animate-pulse", icon: "sensors" };
      case "COMPLETED": return { text: "COMPLETED", color: "bg-primary-container text-on-surface", icon: "task_alt" };
      default: return { text: "LOCKED", color: "bg-surface-container-highest text-on-surface-variant", icon: "lock" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center font-label-code text-on-surface-variant">
        AUTHENTICATING SECURE TOKEN...
      </div>
    );
  }

  if (error || !participant) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
        <div className="bg-surface-container-lowest border-[4px] border-error p-10 text-center shadow-[8px_8px_0px_0px_#1c1b1b] rounded-2xl max-w-lg w-full">
          <span className="material-symbols-outlined text-error text-6xl mb-4">block</span>
          <h1 className="font-headline-xl text-error uppercase mb-2">ACCESS DENIED</h1>
          <p className="font-body-lg text-on-surface-variant">{error}</p>
        </div>
      </div>
    );
  }

  if (!participant.is_verified) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
        <div className="bg-surface-container-lowest border-[4px] border-secondary p-10 text-center shadow-[8px_8px_0px_0px_#1c1b1b] rounded-2xl max-w-lg w-full">
          <span className="material-symbols-outlined text-secondary animate-spin text-6xl mb-4">hourglass_empty</span>
          <h1 className="font-headline-xl text-secondary uppercase mb-2">VERIFICATION PENDING</h1>
          <p className="font-body-lg text-on-surface-variant">Please wait while the administrator verifies your identity. Your dashboard will unlock automatically once verified.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      {/* Top Warning Strip */}
      <div className="w-full bg-error text-on-error py-2 px-4 text-center font-label-badge text-xs uppercase tracking-widest font-bold">
        PRIVATE DASHBOARD • DO NOT SHARE THIS LINK
      </div>

      <main className="w-full flex-grow flex flex-col max-w-4xl mx-auto px-margin lg:px-margin-lg pt-10 pb-20 gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 bg-primary-container text-on-surface px-3 py-1 w-fit border border-on-surface">
            <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
            <span className="font-label-code text-xs font-bold uppercase">SECURE CONNECTION ESTABLISHED</span>
          </div>
          <h1 className="font-display-hero text-headline-xl sm:text-display-hero uppercase tracking-tighter text-on-surface leading-none mt-2">
            BATTLE TERMINAL
          </h1>
        </div>

        {/* Player Identity Card */}
        <div className="bg-surface-container-lowest border-[3px] border-on-surface shadow-[6px_6px_0px_0px_#1c1b1b] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <div className="font-label-badge text-xs uppercase text-on-surface-variant font-bold">OPERATOR IDENTITY</div>
            <div className="font-headline-lg text-2xl uppercase text-on-surface">{participant.full_name}</div>
            <div className="font-label-code text-sm text-secondary font-bold">ID: {participant.player_id}</div>
          </div>
          <div className="flex flex-col gap-1 sm:text-right">
            <div className="font-label-badge text-xs uppercase text-on-surface-variant font-bold">CAMPAIGN DEPLOYMENT</div>
            <div className="font-body-md text-on-surface font-semibold">{participant.registration_campaigns?.name || 'General Access'}</div>
          </div>
        </div>

        {/* Assigned Games / Arena Section */}
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="font-headline-md text-xl uppercase text-on-surface border-b-2 border-on-surface pb-2">
            ASSIGNED ARENAS
          </h2>

          <div className="grid grid-cols-1 gap-6 mt-2">
            {games.length === 0 ? (
              <div className="bg-surface-container p-8 text-center border-2 border-on-surface border-dashed text-on-surface-variant font-label-code">
                NO ARENAS ASSIGNED TO THIS CAMPAIGN.
              </div>
            ) : (
              games.map((game) => {
                const status = getStatusDisplay(game.status);
                const isLive = game.status === 'LIVE';

                return (
                  <div key={game.id} className="bg-surface-container-lowest border-[3px] border-on-surface shadow-[6px_6px_0px_0px_#1c1b1b] p-6 flex flex-col md:flex-row gap-6 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-label-badge text-sm font-black uppercase text-secondary">
                          {getGameNumberText(game.slug)}
                        </span>
                        <span className={`flex items-center gap-1 px-3 py-1 font-label-badge text-[10px] font-bold uppercase border border-on-surface ${status.color}`}>
                          <span className="material-symbols-outlined text-[14px]">{status.icon}</span>
                          {status.text}
                        </span>
                      </div>
                      <h3 className="font-headline-lg text-2xl uppercase text-on-surface">
                        {game.name}
                      </h3>
                      <p className="font-body-md text-on-surface-variant max-w-lg line-clamp-2">
                        {game.description}
                      </p>
                    </div>

                    <div className="flex flex-col justify-end min-w-[200px]">
                      {isLive ? (
                        <button
                          onClick={() => navigate(`/player/${playerToken}/${game.slug}`)}
                          className="w-full py-4 bg-error text-on-error font-headline-md text-[16px] uppercase tracking-wider border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1b1b] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
                        >
                          <span>ENTER ARENA</span>
                          <span className="material-symbols-outlined text-[20px]">login</span>
                        </button>
                      ) : (
                        <div className="w-full py-4 bg-surface-container-highest text-on-surface-variant font-headline-md text-[14px] uppercase tracking-wider border-[3px] border-on-surface/50 text-center flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">
                            {game.status === 'COMPLETED' ? 'emoji_events' : 'lock_clock'}
                          </span>
                          {game.status === 'COMPLETED' ? 'SCORE: VIEW LEADERBOARD' : 'WAITING FOR ADMIN...'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default PlayerDashboard;
