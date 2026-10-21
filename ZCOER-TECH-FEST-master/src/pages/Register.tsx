import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";
import { useParams, Link } from "react-router-dom";

const Register = () => {
  const { registrationToken } = useParams<{ registrationToken: string }>();
  const [campaign, setCampaign] = useState<any>(null);
  const [campaignGames, setCampaignGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    college: "Zeal College of Engineering and Research(Off Campus)",
    department: "CSE - A",
    academicYear: "1st Year",
    rollNo: "",
    mobile: "",
    selectedGameIds: [] as string[],
  });
  const [collegeType, setCollegeType] = useState("Zeal College of Engineering and Research(Off Campus)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ playerId: string; secureToken: string } | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!registrationToken) {
        setError("Missing registration token.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("registration_campaigns")
          .select("*")
          .eq("token", registrationToken)
          .single();

        if (error || !data) {
          setError("Invalid or expired registration link.");
        } else if (data.status !== 'OPEN') {
          setError(`Registration is currently ${data.status.toLowerCase()}.`);
        } else {
          setCampaign(data);
          
          // Fetch available games for this campaign
          const { data: cgData } = await supabase
            .from("registration_campaign_games")
            .select("game_id, games(*)")
            .eq("campaign_id", data.id);
            
          if (cgData && cgData.length > 0) {
            const gamesList = cgData.map((cg: any) => cg.games).filter(g => g !== null);
            setCampaignGames(gamesList);
            // By default select all available games
            if (gamesList.length > 0) {
              setFormData(prev => ({ ...prev, selectedGameIds: gamesList.map((g: any) => g.id) }));
            }
          }
        }
      } catch (err: any) {
        setError("Error validating registration link.");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [registrationToken]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateRandomString = (length: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const playerId = `ZCOER-${Math.floor(1000 + Math.random() * 9000)}`;
    const secureToken = generateRandomString(32);
    try {
      const { data, error } = await supabase
        .from("participants")
        .insert([
          {
            full_name: formData.fullName,
            college: formData.college,
            department: formData.department,
            academic_year: formData.academicYear,
            roll_number: formData.rollNo,
            mobile_number: formData.mobile,
            player_id: playerId,
            secure_token: secureToken,
            registered_via_campaign: campaign.id,
            is_verified: true
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (formData.selectedGameIds.length > 0 && data) {
        const insertRows = formData.selectedGameIds.map(gameId => ({
          participant_id: data.id,
          game_id: gameId
        }));
        
        const { error: gameError } = await supabase
          .from("game_participants")
          .insert(insertRows);
        
        if (gameError) {
          console.error("Failed to assign game:", gameError);
        }
      }

      setSuccessData({ playerId, secureToken });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during registration. You might already be registered.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-28 pb-10 flex justify-center flex-grow">
        <div className="w-full max-w-3xl px-margin lg:px-margin-lg">
          
          {loading ? (
            <div className="text-center py-20 font-label-code text-on-surface-variant uppercase">
              VALIDATING SECURE LINK...
            </div>
          ) : error && !successData ? (
            <div className="bg-surface-container-lowest border-[4px] border-error p-10 text-center shadow-[8px_8px_0px_0px_#1c1b1b] rounded-2xl">
              <span className="material-symbols-outlined text-error text-6xl mb-4">block</span>
              <h1 className="font-headline-xl text-error uppercase mb-2">ACCESS DENIED</h1>
              <p className="font-body-lg text-on-surface-variant">{error}</p>
            </div>
          ) : successData ? (
            <div className="bg-primary-container border-[4px] border-on-surface p-8 lg:p-12 text-center shadow-[8px_8px_0px_0px_#1c1b1b] rounded-2xl">
              <span className="material-symbols-outlined text-on-surface text-6xl mb-4">check_circle</span>
              <h1 className="font-display-hero text-4xl md:text-headline-xl uppercase mb-6 tracking-tight break-words">
                REGISTRATION SUCCESSFUL
              </h1>
              <div className="bg-surface-container-lowest p-6 rounded-xl border-[2px] border-on-surface mb-8">
                <div className="text-on-surface-variant font-label-badge text-xs uppercase font-bold mb-2">YOUR PLAYER ID</div>
                <div className="font-headline-xl text-4xl text-on-surface tracking-widest">{successData.playerId}</div>
              </div>

              <div className="bg-surface p-6 rounded-xl border-[2px] border-on-surface mb-8 text-left">
                <div className="flex items-start gap-3 mb-4">
                  <span className="material-symbols-outlined text-error mt-1">warning</span>
                  <div>
                    <h3 className="font-headline-md uppercase text-error">CRITICAL: SAVE YOUR ACCESS LINK</h3>
                    <p className="font-body-sm text-on-surface-variant mt-1">
                      This is the ONLY way you can access the game arena. Copy this link and save it somewhere safe. 
                      Do not share this link with anyone else.
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-low p-4 rounded border border-on-surface/20 break-all font-label-code text-sm select-all">
                  {window.location.origin}/player/{successData.secureToken}
                </div>
              </div>

              <Link
                to={`/player/${successData.secureToken}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 w-full bg-secondary text-on-secondary font-headline-md text-lg uppercase tracking-wider rounded-xl shadow-[4px_4px_0px_0px_#1c1b1b] border-[3px] border-on-surface hover:-translate-y-1 active:translate-y-1 transition-all"
              >
                <span>ENTER PLAYER DASHBOARD</span>
                <span className="material-symbols-outlined">login</span>
              </Link>
            </div>
          ) : (
            <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl shadow-[8px_8px_0px_0px_#1c1b1b] flex flex-col overflow-hidden">
              <div className="bg-secondary p-space-md border-b-[4px] border-on-surface">
                <h1 className="font-headline-xl uppercase text-on-secondary tracking-tight">
                  SECURE REGISTRATION
                </h1>
                <p className="font-body-md text-on-secondary/80 mt-1">
                  Via Campaign: <strong className="text-on-secondary">{campaign.name}</strong>
                </p>
              </div>

              <div className="p-space-lg">
                {error && (
                  <div className="bg-error p-4 mb-6 text-on-error font-bold border-2 border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] rounded-lg">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    <label className="font-label-badge uppercase text-on-surface font-bold mb-2">FULL NAME *</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-surface border-[2px] border-on-surface px-4 py-3 rounded-xl font-headline-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b]"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-label-badge uppercase text-on-surface font-bold mb-2">COLLEGE / INSTITUTE *</label>
                    <div className="relative">
                      <select
                        value={collegeType}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCollegeType(val);
                          if (val !== "Other") {
                            setFormData(prev => ({ ...prev, college: val }));
                          } else {
                            setFormData(prev => ({ ...prev, college: "" }));
                          }
                        }}
                        className="w-full appearance-none bg-surface border-[2px] border-on-surface px-4 py-3 pr-10 rounded-xl font-headline-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b] cursor-pointer"
                      >
                        <option value="Zeal College of Engineering and Research(Off Campus)">Zeal College of Engineering and Research(Off Campus)</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface">
                        <span className="material-symbols-outlined">expand_more</span>
                      </div>
                    </div>
                    {collegeType === "Other" && (
                      <input
                        required
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                        className="mt-3 bg-surface border-[2px] border-on-surface px-4 py-3 rounded-xl font-headline-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b]"
                        placeholder="Type your college name..."
                      />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="font-label-badge uppercase text-on-surface font-bold mb-2">DEPARTMENT *</label>
                    <div className="relative">
                      <select
                        required
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full appearance-none bg-surface border-[2px] border-on-surface px-4 py-3 pr-10 rounded-xl font-headline-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b] cursor-pointer"
                      >
                        <option value="CSE - A">CSE - A</option>
                        <option value="CSE - B">CSE - B</option>
                        <option value="AIDS - C">AIDS - C</option>
                        <option value="AIDS - D">AIDS - D</option>
                        <option value="ECE - E">ECE - E</option>
                        <option value="E&TC - F">E&TC - F</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface">
                        <span className="material-symbols-outlined">expand_more</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col">
                      <label className="font-label-badge uppercase text-on-surface font-bold mb-2">YEAR *</label>
                      <div className="relative">
                        <select
                          name="academicYear"
                          value={formData.academicYear}
                          onChange={handleInputChange}
                          className="w-full appearance-none bg-surface border-[2px] border-on-surface px-4 py-3 pr-10 rounded-xl font-headline-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b] cursor-pointer"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-label-badge uppercase text-on-surface font-bold mb-2">ROLL NUMBER *</label>
                      <input
                        required
                        type="text"
                        name="rollNo"
                        value={formData.rollNo}
                        onChange={handleInputChange}
                        className="bg-surface border-[2px] border-on-surface px-4 py-3 rounded-xl font-headline-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b]"
                        placeholder="e.g. 23AD042"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-label-badge uppercase text-on-surface font-bold mb-2">MOBILE *</label>
                    <input
                      required
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="bg-surface border-[2px] border-on-surface px-4 py-3 rounded-xl font-headline-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b]"
                      placeholder="10-digit number"
                    />
                  </div>

                  <div className="flex flex-col mt-2">
                    <label className="font-label-badge uppercase text-on-surface font-bold mb-2">SELECT ARENA ROUNDS *</label>
                    <div className="flex flex-col gap-3">
                      {campaignGames.map((game: any) => (
                        <label key={game.id} className="flex items-center gap-3 cursor-pointer bg-surface-container-lowest p-3 rounded-xl border-[2px] border-on-surface hover:bg-surface-container-low transition-colors">
                          <input 
                            type="checkbox"
                            className="w-5 h-5 accent-secondary"
                            checked={formData.selectedGameIds.includes(game.id)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setFormData(prev => ({
                                ...prev,
                                selectedGameIds: checked 
                                  ? [...prev.selectedGameIds, game.id]
                                  : prev.selectedGameIds.filter(id => id !== game.id)
                              }));
                            }}
                          />
                          <span className="font-headline-md text-on-surface text-[16px] uppercase tracking-wide">{game.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-4 rounded-xl bg-primary-container text-on-surface font-headline-md text-[18px] uppercase tracking-wider shadow-[4px_4px_0px_0px_#1c1b1b] border-[3px] border-on-surface hover:-translate-y-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "TRANSMITTING..."
                    ) : (
                      <>
                        CONFIRM REGISTRATION
                        <span className="material-symbols-outlined text-[24px]">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
