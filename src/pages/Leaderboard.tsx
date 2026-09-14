import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("all");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const [scoresRes, campaignsRes] = await Promise.all([
          supabase.from("scores").select("score, time_taken_seconds, participant_id, participants(full_name, player_id, registered_via_campaign)"),
          supabase.from("registration_campaigns").select("id, name")
        ]);

        if (scoresRes.error) throw scoresRes.error;
        if (campaignsRes.data) setCampaigns(campaignsRes.data);

        const scoresData = scoresRes.data;

        if (scoresData) {
          // Aggregate scores by participant
          const aggregated: Record<string, any> = {};
          
          scoresData.forEach(entry => {
            const pid = entry.participant_id;
            if (!aggregated[pid]) {
              aggregated[pid] = {
                participant_id: pid,
                full_name: (entry.participants as any)?.full_name || "Unknown Agent",
                player_id: (entry.participants as any)?.player_id || "UNK-000",
                campaign_id: (entry.participants as any)?.registered_via_campaign,
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

  const filteredLeaderboard = selectedCampaignId === "all" 
    ? leaderboard 
    : leaderboard.filter(p => p.campaign_id === selectedCampaignId);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    const title = selectedCampaignId === "all" ? "Global Rankings" : `Rankings - ${campaigns.find(c => c.id === selectedCampaignId)?.name || 'Campaign'}`;
    doc.text(title, 14, 22);
    
    // Add date
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const tableData = filteredLeaderboard.map((player, index) => [
      `#${index + 1}`,
      player.player_id,
      player.full_name,
      `${player.games_played} / 3`,
      player.total_score.toFixed(2)
    ]);

    autoTable(doc, {
      startY: 35,
      head: [['Rank', 'Player ID', 'Name', 'Games', 'Score']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    doc.save(`leaderboard_${selectedCampaignId === 'all' ? 'global' : selectedCampaignId}.pdf`);
  };

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

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
                  <select 
                    value={selectedCampaignId}
                    onChange={(e) => setSelectedCampaignId(e.target.value)}
                    className="bg-surface text-on-surface border-[2px] border-on-surface px-4 py-2 font-headline-md uppercase text-sm shadow-[2px_2px_0px_0px_#1c1b1b] focus:outline-none w-full sm:w-auto"
                  >
                    <option value="all">ALL CAMPAIGNS (GLOBAL)</option>
                    {campaigns.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleExportPDF}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary text-on-secondary px-4 py-2 font-headline-md uppercase text-sm border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  EXPORT PDF
                </button>
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
                      {filteredLeaderboard.map((player, index) => (
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
