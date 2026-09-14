import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [rollNo, setRollNo] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("participants")
        .select("secure_token")
        .eq("roll_number", rollNo.trim())
        .eq("mobile_number", mobile.trim())
        .single();

      if (fetchError || !data) {
        throw new Error("No registration found with this Roll Number and Mobile combination.");
      }

      // Successfully found, redirect to dashboard
      navigate(`/player/${data.secure_token}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-28 pb-10 flex justify-center flex-grow">
        <div className="w-full max-w-md px-margin lg:px-margin-lg">
          <div className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl shadow-[8px_8px_0px_0px_#1c1b1b] flex flex-col overflow-hidden">
            <div className="bg-secondary p-space-md border-b-[4px] border-on-surface">
              <h1 className="font-headline-xl uppercase text-on-secondary tracking-tight">
                STUDENT LOGIN
              </h1>
              <p className="font-body-md text-on-secondary/80 mt-1">
                Enter your details to access your Arena Dashboard
              </p>
            </div>

            <div className="p-space-lg">
              {error && (
                <div className="bg-error p-4 mb-6 text-on-error font-bold border-2 border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b] rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <label className="font-label-badge uppercase text-on-surface font-bold mb-2">ROLL NUMBER</label>
                  <input
                    required
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="bg-surface border-[2px] border-on-surface px-4 py-3 rounded-xl font-headline-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b]"
                    placeholder="e.g. 23AD042"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-label-badge uppercase text-on-surface font-bold mb-2">MOBILE NUMBER</label>
                  <input
                    required
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="bg-surface border-[2px] border-on-surface px-4 py-3 rounded-xl font-headline-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary shadow-[2px_2px_0px_0px_#1c1b1b]"
                    placeholder="10-digit number"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-4 rounded-xl bg-primary-container text-on-surface font-headline-md text-[18px] uppercase tracking-wider shadow-[4px_4px_0px_0px_#1c1b1b] border-[3px] border-on-surface hover:-translate-y-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    "AUTHENTICATING..."
                  ) : (
                    <>
                      ACCESS ARENA
                      <span className="material-symbols-outlined text-[24px]">
                        login
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentLogin;
