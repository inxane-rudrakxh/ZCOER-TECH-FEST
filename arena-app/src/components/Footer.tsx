const Footer = () => {
  return (
    <footer className="w-full bg-surface-container-high border-t-[4px] border-on-surface text-on-surface mt-space-xxl">
      <div className="bg-secondary text-on-secondary border-b-[3px] border-on-surface py-3 px-margin lg:px-margin-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-label-code text-label-code uppercase">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 bg-on-secondary text-secondary font-bold px-2 py-0.5 rounded border border-on-surface">
              <span className="material-symbols-outlined text-[16px]">
                sensors
              </span>{" "}
              LIVE ARENA STATS
            </span>
            <span>ACTIVE SQUADS: 64</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">ARENA LATENCY: 12ms</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">RUNTIME: PYTORCH 2.4</span>
          </div>
          <div className="flex items-center gap-2 font-bold">
            <span>STAGE 01 / 03 ACTIVE</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-lg py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 font-headline-md text-headline-md uppercase">
              <span className="w-4 h-4 bg-primary-container border-[2px] border-on-surface inline-block"></span>
              ENGINEERING DAY 2026 ARENA
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Official competitive arena orchestrated by Artificial Intelligence
              &amp; Data Science (AIDS) and Artificial Intelligence &amp;
              Machine Learning (AIML) Departments. High-octane algorithmic
              battles, real-time code combat, and neural network challenges.
            </p>
            <div className="font-label-badge text-label-badge text-on-surface font-bold uppercase tracking-wider pt-2">
              Campus Tech Arena Block 4 • Main Lab Matrix
            </div>
          </div>
          <div className="md:col-span-4 space-y-2">
            <div className="font-headline-md text-[16px] uppercase tracking-wider mb-2">
              Stage Progression Track
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 bg-surface-container border-[2px] border-on-surface rounded-lg shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="font-label-badge text-[10px] text-on-surface-variant uppercase">
                  ROUND 01
                </div>
                <div className="font-headline-md text-[13px] uppercase">
                  Neural Quiz
                </div>
              </div>
              <div className="p-2.5 bg-surface-container border-[2px] border-on-surface rounded-lg shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="font-label-badge text-[10px] text-on-surface-variant uppercase">
                  ROUND 02
                </div>
                <div className="font-headline-md text-[13px] uppercase">
                  Code Debug
                </div>
              </div>
              <div className="p-2.5 bg-surface-container border-[2px] border-on-surface rounded-lg shadow-[2px_2px_0px_0px_#1c1b1b]">
                <div className="font-label-badge text-[10px] text-on-surface-variant uppercase">
                  ROUND 03
                </div>
                <div className="font-headline-md text-[13px] uppercase">
                  Prompt Clash
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 space-y-2">
            <div className="font-headline-md text-[16px] uppercase tracking-wider mb-2">
              Arena Directives
            </div>
            <ul className="space-y-1.5 font-label-code text-label-code text-on-surface-variant">
              <li>✦ Anti-cheat telemetry logged</li>
              <li>✦ Terminal sandboxes isolated</li>
              <li>✦ Timers synchronised by NTP</li>
              <li>✦ Final score jury certified</li>
            </ul>
          </div>
        </div>
        <div className="mt-space-xl pt-space-md border-t-[2px] border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4 font-label-badge text-label-badge text-on-surface-variant">
          <p>© 2026 AIDS &amp; AIML STUDENT GUILD. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 uppercase">
            <span className="text-on-surface font-bold">
              STATUS: BATTLEGROUND ONLINE
            </span>
            <span>VER 4.2.0-BRUTAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
