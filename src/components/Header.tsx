import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname + location.hash;

  const getLinkClass = (path: string) => {
    const isActive = currentPath === path || (path === "/" && currentPath === "");
    if (isActive) {
      return "px-3.5 py-2 uppercase tracking-wider transition-all bg-primary-container text-on-surface font-bold border-[3px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] rounded-xl";
    }
    return "px-3.5 py-2 font-headline-md text-[14px] uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-all rounded-lg";
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b-[3px] border-on-surface">
      <div className="bg-on-surface text-primary-container border-b-[3px] border-on-surface overflow-hidden py-1.5 selection:bg-primary-container selection:text-on-surface">
        <div className="animate-marquee whitespace-nowrap font-label-ticker text-label-ticker uppercase tracking-widest">
          <span className="mx-4 flex items-center gap-3">
            <span>✦</span> TECHNICAL GAME ARENA <span>✦</span> ENGINEERING DAY
            2026 <span>✦</span> AIDS &amp; AIML DEPARTMENT <span>✦</span> THINK
            • BUILD • DEBUG • CREATE <span>✦</span> 3 BATTLES: QUIZ • CODE DEBUG
            • AI PROMPT BATTLE <span>✦</span> LIVE MATCH TELEMETRY ACTIVE
          </span>
          <span className="mx-4 flex items-center gap-3">
            <span>✦</span> TECHNICAL GAME ARENA <span>✦</span> ENGINEERING DAY
            2026 <span>✦</span> AIDS &amp; AIML DEPARTMENT <span>✦</span> THINK
            • BUILD • DEBUG • CREATE <span>✦</span> 3 BATTLES: QUIZ • CODE DEBUG
            • AI PROMPT BATTLE <span>✦</span> LIVE MATCH TELEMETRY ACTIVE
          </span>
        </div>
      </div>
      <div className="h-20 w-full px-margin lg:px-margin-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white border-[3px] border-on-surface rounded-xl shadow-[3px_3px_0px_0px_#1c1b1b] flex items-center justify-center select-none overflow-hidden p-0.5">
              <img src="/ZCOER-Logo-1-scaled.jpg" alt="ZCOER" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-headline-md text-[12px] sm:text-[16px] xl:text-[18px] tracking-tight uppercase leading-tight text-on-surface w-[200px] sm:max-w-[300px] xl:max-w-none text-wrap sm:truncate">
                Zeal College Of Engineering & Research
              </div>
              <div className="font-label-badge text-label-badge text-on-surface-variant font-bold tracking-wider mt-0.5">
                AIDS &amp; AIML DEPTS
              </div>
            </div>
          </div>
          <div className="hidden xl:flex items-center gap-2 bg-secondary-fixed border-[2px] border-on-surface px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1c1b1b]">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
            <span className="font-label-badge text-label-badge text-on-secondary-fixed font-bold uppercase tracking-wider">
              ENG DAY 2026
            </span>
          </div>
        </div>
        <nav
          className="hidden lg:flex items-center gap-2 p-1.5 bg-surface-container border-[3px] border-on-surface rounded-xl shadow-[3px_3px_0px_0px_#1c1b1b]"
          data-active-classes="bg-primary-container text-on-surface font-bold border-[3px] border-on-surface shadow-[3px_3px_0px_0px_#1c1b1b] rounded-xl"
        >
          <Link
            className={getLinkClass("/")}
            to="/"
          >
            Home
          </Link>
          <Link
            className={getLinkClass("/games")}
            to="/games"
          >
            Arena Stage Flow
          </Link>
          <Link
            className={getLinkClass("/leaderboard")}
            to="/leaderboard"
          >
            Live Leaderboard
          </Link>
          <Link
            className={getLinkClass("/rules")}
            to="/rules"
          >
            Rules
          </Link>

          <Link
            className={getLinkClass("/admin")}
            to="/admin"
          >
            Admin
          </Link>
        </nav>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/leaderboard"
            className="flex lg:hidden w-8 h-8 rounded-full bg-secondary items-center justify-center border-2 border-on-surface shadow-[2px_2px_0px_0px_#1c1b1b]"
            title="View Leaderboard"
          >
            <span className="material-symbols-outlined text-on-secondary text-[16px]">
              leaderboard
            </span>
          </Link>
          <div className="hidden sm:flex w-8 h-8 rounded-full bg-primary items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
