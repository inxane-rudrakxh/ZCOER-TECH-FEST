import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { supabase } from "../lib/supabase";
import { QRCodeSVG } from "qrcode.react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview"); // overview, campaigns, stage
  const [participants, setParticipants] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [campaignGames, setCampaignGames] = useState<any[]>([]);
  const [debugSubmissions, setDebugSubmissions] = useState<any[]>([]);
  const [aiSubmissions, setAiSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [newCampaignName, setNewCampaignName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  
  const [qrToken, setQrToken] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [partsRes, campsRes, gamesRes, cgRes, debugRes, aiRes] = await Promise.all([
        supabase.from("participants").select("*, registration_campaigns(name)").order("created_at", { ascending: false }),
        supabase.from("registration_campaigns").select("*").order("created_at", { ascending: false }),
        supabase.from("games").select("*").order("created_at", { ascending: true }),
        supabase.from("registration_campaign_games").select("*"),
        supabase.from("debug_submissions").select("*, participants(full_name, player_id), debug_challenges(title)").order("created_at", { ascending: false }),
        supabase.from("ai_submissions").select("*, participants(full_name, player_id), ai_challenges(title)").order("created_at", { ascending: false })
      ]);
      
      if (partsRes.data) setParticipants(partsRes.data);
      if (campsRes.data) setCampaigns(campsRes.data);
      if (gamesRes.data) setGames(gamesRes.data);
      if (cgRes.data) setCampaignGames(cgRes.data);
      if (debugRes.data) setDebugSubmissions(debugRes.data);
      if (aiRes.data) setAiSubmissions(aiRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;
    setIsCreating(true);

    const token = newCampaignName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

    try {
      const { error } = await supabase.from("registration_campaigns").insert([
        { name: newCampaignName, token, status: "OPEN" }
      ]);
      if (!error) {
        setNewCampaignName("");
        fetchData();
      } else {
        alert("Failed to create campaign: " + error.message);
        console.error("Create campaign error:", error);
      }
    } catch (err: any) {
      alert("Exception creating campaign: " + err.message);
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const copyLink = (token: string) => {
    const link = `${window.location.origin}/register/${token}`;
    navigator.clipboard.writeText(link);
    alert("Registration Link Copied to Clipboard!");
  };

  const toggleCampaignStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'OPEN' ? 'CLOSED' : 'OPEN';
    const { error } = await supabase.from("registration_campaigns").update({ status: newStatus }).eq("id", id);
    if (!error) fetchData();
  };

  const toggleVerifyParticipant = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from("participants").update({ is_verified: !currentStatus }).eq("id", id);
    if (!error) fetchData();
  };

  const toggleCampaignGame = async (campaignId: string, gameId: string, isAssigned: boolean) => {
    if (isAssigned) {
      const { error } = await supabase.from("registration_campaign_games").delete().match({ campaign_id: campaignId, game_id: gameId });
      if (!error) fetchData();
    } else {
      const { error } = await supabase.from("registration_campaign_games").insert([{ campaign_id: campaignId, game_id: gameId }]);
      if (!error) fetchData();
    }
  };

  const updateGameStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("games").update({ status: newStatus }).eq("id", id);
    if (!error) fetchData();
  };

  const gradeSubmission = async (table: string, id: string, score: number, participantId: string, gameSlug: string) => {
    if (isNaN(score)) return;
    const { error } = await supabase.from(table).update({ score, status: 'GRADED' }).eq("id", id);
    if (!error) {
      const game = games.find((g: any) => g.slug === gameSlug);
      if (game) {
        await supabase.from("scores").upsert({
          participant_id: participantId,
          game_id: game.id,
          score: score,
          time_taken_seconds: 0
        }, { onConflict: 'participant_id, game_id' });
      }
      alert("Score saved!");
      fetchData();
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low border-r-[4px] border-on-surface z-50 flex flex-col justify-between p-margin pt-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-3 bg-primary-container border-[3px] border-on-surface rounded-xl shadow-[4px_4px_0px_0px_#1c1b1b]">
            <span className="w-4 h-4 bg-on-surface block"></span>
            <div>
              <div className="font-headline-md text-[18px] uppercase leading-none">
                ADMIN MATRIX
              </div>
              <div className="font-label-badge text-[11px] font-bold text-on-surface-variant uppercase mt-0.5">
                AIDS &amp; AIML OPS
              </div>
            </div>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 uppercase tracking-wider transition-all rounded-xl font-headline-md text-[13px] whitespace-nowrap overflow-hidden text-left ${
                activeTab === 'overview' 
                  ? 'bg-primary-container text-on-surface font-bold border-[3px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b]' 
                  : 'border-[3px] border-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface hover:-translate-y-0.5 active:translate-y-0.5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">dashboard</span>
              <span className="truncate">Overview Control</span>
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`w-full flex items-center gap-3 px-4 py-3 uppercase tracking-wider transition-all rounded-xl font-headline-md text-[13px] whitespace-nowrap overflow-hidden text-left ${
                activeTab === 'campaigns' 
                  ? 'bg-primary-container text-on-surface font-bold border-[3px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b]' 
                  : 'border-[3px] border-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface hover:-translate-y-0.5 active:translate-y-0.5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">campaign</span>
              <span className="truncate">Campaign Management</span>
            </button>
            <button
              onClick={() => setActiveTab('stage')}
              className={`w-full flex items-center gap-3 px-4 py-3 uppercase tracking-wider transition-all rounded-xl font-headline-md text-[13px] whitespace-nowrap overflow-hidden text-left ${
                activeTab === 'stage' 
                  ? 'bg-primary-container text-on-surface font-bold border-[3px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b]' 
                  : 'border-[3px] border-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface hover:-translate-y-0.5 active:translate-y-0.5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">tune</span>
              <span className="truncate">Stage Controls</span>
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`w-full flex items-center gap-3 px-4 py-3 uppercase tracking-wider transition-all rounded-xl font-headline-md text-[13px] whitespace-nowrap overflow-hidden text-left ${
                activeTab === 'submissions' 
                  ? 'bg-primary-container text-on-surface font-bold border-[3px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b]' 
                  : 'border-[3px] border-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface hover:-translate-y-0.5 active:translate-y-0.5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">grading</span>
              <span className="truncate">Submissions Review</span>
            </button>
          </nav>
        </div>
        <div className="p-3 bg-surface-container border-[3px] border-on-surface rounded-xl shadow-[3px_3px_0px_0px_#1c1b1b] space-y-2">
          <div className="flex items-center justify-between font-label-badge text-label-badge font-bold">
            <span>TELEMETRY FEED</span>
            <span className="text-secondary font-bold">SYNCED</span>
          </div>
          <div className="font-label-code text-label-code text-on-surface-variant leading-tight">
            SYS_CLOCK: LIVE NTP
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72 flex flex-col h-screen">
        <Header />
        
        <main className="flex-grow pt-28 bg-surface p-margin space-y-6 overflow-y-auto">
          {/* Top Admin Header */}
          <div className="bg-surface-container p-6 rounded-xl shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-label-badge text-label-badge text-on-primary-container bg-primary-container px-2.5 py-1 rounded">
                  PC ORCHESTRATOR
                </span>
                <span className="font-label-code text-label-code text-on-surface-variant font-bold">
                  NODE: PHOENIX-01
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight uppercase">
                TGA CONTROL ROOM <span className="text-secondary">✦</span> {activeTab.toUpperCase()}
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-surface-container-lowest p-4 rounded-xl shadow-sm border-2 border-on-surface">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-secondary"></span>
                </div>
                <div>
                  <div className="font-label-badge text-label-badge text-on-surface font-bold uppercase">
                    SYS TELEMETRY STATUS
                  </div>
                  <div className="font-label-code text-label-code text-secondary font-bold">
                    ● {loading ? 'SYNCING...' : `ALL SYSTEMS OPERATIONAL | ${participants.length} CONNECTIONS`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {activeTab === 'overview' && (
            <>
              {/* Quick Stats Metric Band */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-1 border-2 border-on-surface border-b-4 border-r-4">
                  <div className="font-label-badge text-label-badge text-on-surface-variant font-bold uppercase">
                    REGISTERED UNITS
                  </div>
                  <div className="font-headline-lg text-headline-lg text-on-surface font-bold">
                    {participants.length}
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-1 border-2 border-on-surface border-b-4 border-r-4">
                  <div className="font-label-badge text-label-badge text-secondary font-bold uppercase">
                    ACTIVE CAMPAIGNS
                  </div>
                  <div className="font-headline-lg text-headline-lg text-secondary font-bold">
                    {campaigns.filter(c => c.status === 'OPEN').length}
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-1 border-2 border-on-surface border-b-4 border-r-4">
                  <div className="font-label-badge text-label-badge text-error font-bold uppercase">
                    DISQUALIFIED
                  </div>
                  <div className="font-headline-lg text-headline-lg text-error font-bold">
                    0
                  </div>
                </div>
              </div>

              {/* Squad Telemetry Feed */}
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md space-y-6 border-2 border-on-surface border-b-[6px] border-r-[6px]">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">terminal</span> 
                    Squad Telemetry Feed
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                    Real-time registered participants stream.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-body-md border-collapse">
                    <thead>
                      <tr className="bg-surface-container font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider border-b-2 border-on-surface">
                        <th className="py-3.5 px-4">PLAYER ID</th>
                        <th className="py-3.5 px-4">NAME</th>
                        <th className="py-3.5 px-4">DEPT / YEAR</th>
                        <th className="py-3.5 px-4">CAMPAIGN</th>
                        <th className="py-3.5 px-4 text-center">STATUS</th>
                        <th className="py-3.5 px-4 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container font-label-code text-label-code text-on-surface">
                      {participants.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-on-surface-variant font-label-code">
                            NO SQUADS DETECTED IN MAINFRAME
                          </td>
                        </tr>
                      ) : (
                        participants.map(p => (
                          <tr key={p.id} className="hover:bg-surface-container-low transition-colors">
                            <td className="py-3.5 px-4">
                              <span className="bg-primary-container text-on-surface border border-on-surface px-2 py-1 rounded font-bold shadow-[2px_2px_0px_0px_#1c1b1b]">
                                {p.player_id}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-headline-md text-[16px] uppercase font-bold">
                              {p.full_name}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="bg-secondary-fixed text-on-secondary-fixed border border-on-surface px-2 py-0.5 rounded font-label-badge text-[11px] font-bold shadow-[2px_2px_0px_0px_#1c1b1b]">
                                {p.department} ({p.academic_year})
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              {p.registration_campaigns?.name || 'General'}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              {p.is_verified ? (
                                <span className="text-secondary flex items-center justify-center gap-1 font-bold text-xs"><span className="material-symbols-outlined text-[16px]">check_circle</span> VERIFIED</span>
                              ) : (
                                <span className="text-error flex items-center justify-center gap-1 font-bold text-xs"><span className="material-symbols-outlined text-[16px]">pending</span> PENDING</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button 
                                onClick={() => toggleVerifyParticipant(p.id, p.is_verified)}
                                className={`px-3 py-1 font-label-badge font-bold uppercase text-[10px] border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] ${p.is_verified ? 'bg-surface-variant text-on-surface-variant hover:bg-surface' : 'bg-secondary text-on-secondary hover:-translate-y-0.5 active:translate-y-0.5'}`}
                              >
                                {p.is_verified ? 'REVOKE' : 'VERIFY'}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              
              {/* Create Campaign Card */}
              <div className="bg-primary-container p-6 rounded-xl shadow-md border-[3px] border-on-surface border-b-[6px] border-r-[6px]">
                <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight mb-4">
                  Deploy New Campaign
                </h2>
                <form onSubmit={handleCreateCampaign} className="flex items-end gap-4">
                  <div className="flex-grow flex flex-col gap-2">
                    <label className="font-label-badge font-bold uppercase text-on-surface text-sm">Campaign Internal Name</label>
                    <input 
                      type="text" 
                      value={newCampaignName}
                      onChange={e => setNewCampaignName(e.target.value)}
                      placeholder="e.g. Day 1 VIP Access"
                      className="w-full bg-surface text-on-surface border-[2px] border-on-surface px-4 py-2 font-headline-md text-[16px] shadow-[3px_3px_0px_0px_#1c1b1b] focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                  <button 
                    disabled={isCreating}
                    className="bg-secondary text-on-secondary px-6 py-2.5 font-headline-md uppercase text-[16px] shadow-[3px_3px_0px_0px_#1c1b1b] border-[2px] border-on-surface hover:-translate-y-1 active:translate-y-1 transition-all disabled:opacity-50"
                  >
                    {isCreating ? 'Deploying...' : 'Deploy'}
                  </button>
                </form>
              </div>

              {/* Campaigns List */}
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border-[2px] border-on-surface border-b-[6px] border-r-[6px]">
                <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight mb-4">
                  Active Campaign Links
                </h2>
                
                <div className="grid grid-cols-1 gap-4">
                  {campaigns.length === 0 ? (
                    <div className="text-center py-8 font-label-code text-on-surface-variant border-2 border-dashed border-on-surface">
                      NO CAMPAIGNS DEPLOYED.
                    </div>
                  ) : (
                    campaigns.map(c => {
                      const campaignGameIds = campaignGames.filter(cg => cg.campaign_id === c.id).map(cg => cg.game_id);
                      return (
                        <div key={c.id} className={`flex flex-col p-4 border-[2px] border-on-surface rounded-xl shadow-[4px_4px_0px_0px_#1c1b1b] ${c.status === 'OPEN' ? 'bg-surface' : 'bg-surface-container-high opacity-70'}`}>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-3">
                                <span className="font-headline-md uppercase text-[18px] font-bold">{c.name}</span>
                                <span className={`px-2 py-0.5 rounded font-label-badge text-[10px] font-bold uppercase border border-on-surface ${c.status === 'OPEN' ? 'bg-error text-on-error animate-pulse' : 'bg-surface-variant text-on-surface-variant'}`}>
                                  {c.status}
                                </span>
                              </div>
                              <div className="font-label-code text-secondary text-sm">
                                /register/{c.token}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                              <button 
                                onClick={() => setQrToken(c.token)}
                                className="bg-primary-container text-on-surface font-label-badge font-bold uppercase px-4 py-2 border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5"
                              >
                                Show QR
                              </button>
                              <button 
                                onClick={() => copyLink(c.token)}
                                className="bg-primary-container text-on-surface font-label-badge font-bold uppercase px-4 py-2 border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5"
                              >
                                Copy Link
                              </button>
                              <button 
                                onClick={() => toggleCampaignStatus(c.id, c.status)}
                                className="bg-surface-container-highest text-on-surface font-label-badge font-bold uppercase px-4 py-2 border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5"
                              >
                                {c.status === 'OPEN' ? 'Close' : 'Open'}
                              </button>
                            </div>
                          </div>
                          {/* Game Assignments */}
                          <div className="mt-4 pt-4 border-t-2 border-on-surface/20 flex flex-wrap gap-2">
                            <span className="font-label-badge font-bold uppercase text-on-surface-variant text-xs w-full mb-1">Assigned Games:</span>
                            {games.map(g => {
                              const isAssigned = campaignGameIds.includes(g.id);
                              return (
                                <button
                                  key={g.id}
                                  onClick={() => toggleCampaignGame(c.id, g.id, isAssigned)}
                                  className={`flex items-center gap-1.5 px-3 py-1 font-label-badge font-bold uppercase text-[11px] border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] hover:-translate-y-[1px] active:translate-y-[1px] transition-all ${isAssigned ? 'bg-secondary text-on-secondary' : 'bg-surface text-on-surface-variant'}`}
                                >
                                  <span className="material-symbols-outlined text-[14px]">
                                    {isAssigned ? 'check_box' : 'check_box_outline_blank'}
                                  </span>
                                  {g.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'stage' && (
            <div className="space-y-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border-[2px] border-on-surface border-b-[6px] border-r-[6px]">
                <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">tune</span>
                  Global Stage Controls
                </h2>
                <p className="font-body-md text-on-surface-variant mb-6">
                  Set the live status for each game. When a game is set to LIVE, all verified players assigned to that game can enter it.
                </p>
                <div className="grid grid-cols-1 gap-6">
                  {games.map(g => (
                    <div key={g.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border-[3px] border-on-surface bg-surface rounded-xl shadow-[4px_4px_0px_0px_#1c1b1b]">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="font-headline-lg uppercase text-2xl font-black">{g.name}</span>
                          <span className={`px-3 py-1 rounded font-label-badge text-[12px] font-bold uppercase border border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] ${g.status === 'LIVE' ? 'bg-error text-on-error animate-pulse' : g.status === 'COMPLETED' ? 'bg-primary-container text-on-surface' : 'bg-surface-variant text-on-surface-variant'}`}>
                            {g.status}
                          </span>
                        </div>
                        <div className="font-body-md text-on-surface-variant max-w-lg">
                          {g.description}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-0">
                        {['AVAILABLE', 'LIVE', 'PAUSED', 'COMPLETED'].map(status => (
                          <button 
                            key={status}
                            onClick={() => updateGameStatus(g.id, status)}
                            disabled={g.status === status}
                            className={`px-4 py-2 font-label-badge font-bold uppercase text-[12px] border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] transition-all ${
                              g.status === status 
                                ? 'bg-surface-variant text-on-surface-variant opacity-50 cursor-not-allowed' 
                                : status === 'LIVE' ? 'bg-error text-on-error hover:-translate-y-0.5 active:translate-y-0.5' 
                                : 'bg-primary-container text-on-surface hover:-translate-y-0.5 active:translate-y-0.5'
                            }`}
                          >
                            SET {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border-[2px] border-on-surface border-b-[6px] border-r-[6px]">
                <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">grading</span>
                  AI Prompt Submissions
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {aiSubmissions.length === 0 && <p className="text-on-surface-variant font-label-code">No AI submissions yet.</p>}
                  {aiSubmissions.map(sub => (
                    <div key={sub.id} className="border-[2px] border-on-surface p-4 bg-surface rounded-xl flex flex-col md:flex-row gap-4 shadow-[4px_4px_0px_0px_#1c1b1b]">
                      <div className="flex-grow">
                        <div className="font-label-badge font-bold uppercase mb-1">
                          {sub.participants?.full_name} ({sub.participants?.player_id}) - {sub.ai_challenges?.title}
                        </div>
                        <div className="bg-surface-container p-3 rounded font-body-md border-[2px] border-on-surface whitespace-pre-wrap">
                          {sub.prompt_used}
                        </div>
                      </div>
                      <div className="w-full md:w-48 flex flex-col gap-2 justify-center shrink-0">
                        <input 
                          type="number" 
                          placeholder="Score (0-100)" 
                          defaultValue={sub.score} 
                          id={`score-ai-${sub.id}`}
                          className="w-full bg-surface text-on-surface border-[2px] border-on-surface px-3 py-2 font-headline-md shadow-[2px_2px_0px_0px_#1c1b1b]" 
                        />
                        <button 
                          onClick={() => {
                            const val = parseInt((document.getElementById(`score-ai-${sub.id}`) as HTMLInputElement).value);
                            gradeSubmission('ai_submissions', sub.id, val, sub.participant_id, 'ai');
                          }}
                          className="w-full bg-secondary text-on-secondary font-headline-md uppercase px-4 py-2 border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5"
                        >
                          {sub.status === 'GRADED' ? 'UPDATE' : 'GRADE'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border-[2px] border-on-surface border-b-[6px] border-r-[6px]">
                <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">code</span>
                  Debug Submissions
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {debugSubmissions.length === 0 && <p className="text-on-surface-variant font-label-code">No debug submissions yet.</p>}
                  {debugSubmissions.map(sub => (
                    <div key={sub.id} className="border-[2px] border-on-surface p-4 bg-surface rounded-xl flex flex-col gap-4 shadow-[4px_4px_0px_0px_#1c1b1b]">
                      <div>
                        <div className="font-label-badge font-bold uppercase mb-1">
                          {sub.participants?.full_name} ({sub.participants?.player_id}) - {sub.debug_challenges?.title}
                        </div>
                        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded font-label-code text-sm border-[2px] border-on-surface overflow-x-auto">
                          {sub.submitted_code}
                        </pre>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <input 
                          type="number" 
                          placeholder="Score (0-100)" 
                          defaultValue={sub.score} 
                          id={`score-debug-${sub.id}`}
                          className="w-32 bg-surface text-on-surface border-[2px] border-on-surface px-3 py-2 font-headline-md shadow-[2px_2px_0px_0px_#1c1b1b]" 
                        />
                        <button 
                          onClick={() => {
                            const val = parseInt((document.getElementById(`score-debug-${sub.id}`) as HTMLInputElement).value);
                            gradeSubmission('debug_submissions', sub.id, val, sub.participant_id, 'debug');
                          }}
                          className="bg-secondary text-on-secondary font-headline-md uppercase px-6 py-2 border-[2px] border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] hover:-translate-y-0.5 active:translate-y-0.5"
                        >
                          {sub.status === 'GRADED' ? 'UPDATE SCORE' : 'SAVE SCORE'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* QR Code Modal */}
      {qrToken && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface/80 backdrop-blur-sm p-4">
          <div className="bg-surface-container p-8 rounded-2xl shadow-2xl border-[4px] border-on-surface max-w-sm w-full flex flex-col items-center">
            <h2 className="font-headline-lg text-2xl uppercase mb-6 text-center text-on-surface">Scan to Register</h2>
            <div className="bg-white p-4 rounded-xl border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] mb-6">
              <QRCodeSVG 
                value={`${window.location.origin}/register/${qrToken}`} 
                size={220} 
                level="M" 
                includeMargin={false}
              />
            </div>
            <div className="font-label-code text-secondary text-sm mb-6 text-center break-all">
              {window.location.origin}/register/{qrToken}
            </div>
            <button
              onClick={() => setQrToken(null)}
              className="w-full bg-error text-on-error font-headline-md uppercase px-6 py-3 border-[3px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] hover:-translate-y-1 active:translate-y-1 transition-all"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
