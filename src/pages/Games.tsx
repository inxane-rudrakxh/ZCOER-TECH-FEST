import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

const Games = () => {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data, error } = await supabase
          .from("games")
          .select("*")
          .order("created_at", { ascending: true });
        
        if (error) throw error;
        if (data) {
          setGames(data);
        }
      } catch (err) {
        console.error("Error fetching games:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "LIVE": return "bg-error text-on-error animate-pulse";
      case "AVAILABLE": return "bg-primary-container text-on-surface";
      case "COMING SOON": return "bg-surface-variant text-on-surface-variant";
      case "CLOSED": return "bg-surface-container-highest text-on-surface";
      default: return "bg-surface-variant text-on-surface-variant";
    }
  };

  const getGameNumberText = (slug: string) => {
    if (slug === 'quiz') return '01 THINK';
    if (slug === 'debug') return '02 DEBUG';
    if (slug === 'ai') return '03 CREATE';
    return 'XX PLAY';
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-28 pb-space-xxl flex-grow">
        <section className="max-w-7xl mx-auto px-margin lg:px-margin-lg pt-space-lg">
          <div className="flex flex-col items-start gap-4 mb-space-xl">
            <h1 className="font-display-hero text-display-hero uppercase tracking-tighter text-on-surface leading-none">
              ARENA <br />
              <span className="inline-block bg-primary-container px-4 py-1 rounded-xl shadow-md rotate-[-1deg] mt-2">
                STAGEFLOW.
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Three independent arenas of technical combat. Select a game to view its format, rules, and current availability status.
            </p>
          </div>

          {loading ? (
            <div className="w-full h-64 flex items-center justify-center font-label-code text-on-surface-variant">
              LOADING ARENAS...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {games.map((game) => (
                <div key={game.id} className="bg-surface-container-lowest border-[4px] border-on-surface rounded-2xl p-6 shadow-[8px_8px_0px_0px_#1c1b1b] flex flex-col justify-between hover:-translate-y-1 transition-transform h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-label-badge text-label-badge font-black uppercase text-secondary">
                        {getGameNumberText(game.slug)}
                      </span>
                      <span className={`px-3 py-1 rounded-full font-label-code text-[11px] font-bold border border-on-surface uppercase ${getStatusColor(game.status)}`}>
                        {game.status}
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg uppercase mb-3 text-on-surface">
                      {game.name}
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">
                      {game.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 border-t-2 border-on-surface/20">
                    <Link
                      to={`/games/${game.slug}`}
                      className="w-full py-3 rounded-xl bg-surface-container text-on-surface font-headline-md text-[14px] uppercase tracking-wider border-[3px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] hover:bg-primary-container active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                      <span>VIEW GAME</span>
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Games;
