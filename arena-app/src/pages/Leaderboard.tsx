import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data: scoresData, error: scoresError } = await supabase
          .from("scores")
          .select("score, time_taken_seconds, participant_id, participants(full_name, player_id)");

        if (scoresError) throw scoresError;

        if (scoresData) {
          // Aggregate scores by participant
          const aggregated: Record<string, any> = {};
          
          scoresData.forEach(entry => {
            const pid = entry.participant_id;
            if (!aggregated[pid]) {
              aggregated[pid] = {
                participant_id: pid,
                full_name: entry.participants?.full_name || "Unknown Agent",
                player_id: entry.participants?.player_id || "UNK-000",
                total_score: 0,
                total_time: 0,
                games_played: 0
              };
            }
            aggregated[pid].total_score += parseFloat(entry.score);
            aggregated[pid].total_time += entry.time_taken_seconds || 0;
            aggregated[pid].games_played += 1;
          });

          // Convert to array and sort
          const sorted = Object.values(aggregated).sort((a, b) => {
            // Sort by score descending, then by time ascending
            if (b.total_score !== a.total_score) {
              return b.total_score - a.total_score;
            }
            return a.total_time - b.total_time;
          });

          setLeaderboard(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();

    // Subscribe to realtime changes in scores
    const channel = supabase.channel('scores-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'scores' },
        () => {
          fetchLeaderboard(); // Refetch on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-28 pb-space-xxl flex-grow">
        <section className="max-w-5xl mx-auto px-margin lg:px-margin-lg pt-space-lg">
          <div className="flex flex-col items-center text-center gap-4 mb-space-xl">
            <h1 className="font-display-hero text-headline-xl lg:text-display-hero uppercase tracking-tighter text-on-surface leading-none">
              GLOBAL RANKINGS
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Real-time telemetry from all active arenas. Scores are aggregated across Quiz, Debug, and AI rounds.
            </p>
          </div>

          <div className="bg-surface-container border-[4px] border-on-surface p-2 rounded-2xl shadow-[8px_8px_0px_0px_#1c1b1b] overflow-hidden">
            <div className="bg-inverse-surface text-inverse-on-surface p-4 rounded-xl">
              <div className="flex items-center justify-between mb-4 border-b border-surface-variant/30 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error animate-pulse"></span>
                  <span className="font-label-code text-xs tracking-widest uppercase text-surface-variant">
                    LIVE CONNECTION ACTIVE
                  </span>
                </div>
                <div className="font-label-code text-xs text-secondary-fixed">
                  LAST UPDATED: {new Date().toLocaleTimeString()}
                </div>
              </div>

              {loading ? (
                <div className="py-20 text-center font-label-code text-surface-variant animate-pulse">
                  AGGREGATING NEURAL SCORES...
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="py-20 text-center font-label-code text-surface-variant">
                  NO SCORES RECORDED YET. AWAITING INITIAL TELEMETRY.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-body-md">
                    <thead>
                      <tr className="font-label-code text-xs text-surface-variant uppercase tracking-wider border-b border-surface-variant/30">
                        <th className="py-3 px-4 w-20 text-center">RANK</th>
                        <th className="py-3 px-4">PLAYER ID</th>
                        <th className="py-3 px-4">AGENT NAME</th>
                        <th className="py-3 px-4 text-right">GAMES</th>
                        <th className="py-3 px-4 text-right">SCORE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((player, index) => (
                        <tr 
                          key={player.participant_id}
                          className="border-b border-surface-variant/10 hover:bg-surface-variant/10 transition-colors"
                        >
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-block font-label-badge text-sm font-black w-8 h-8 leading-8 rounded-full ${
                              index === 0 ? 'bg-secondary text-on-secondary' : 
                              index === 1 ? 'bg-surface-bright text-on-surface' :
                              index === 2 ? 'bg-primary-container text-on-surface' :
                              'text-surface-variant'
                            }`}>
                              #{index + 1}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-label-code text-primary-fixed font-bold tracking-widest">
                            {player.player_id}
                          </td>
                          <td className="py-4 px-4 font-bold">
                            {player.full_name}
                          </td>
                          <td className="py-4 px-4 text-right font-label-code">
                            {player.games_played} / 3
                          </td>
                          <td className="py-4 px-4 text-right font-headline-md text-secondary-fixed">
                            {player.total_score.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
