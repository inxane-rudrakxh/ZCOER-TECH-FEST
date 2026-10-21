import React, { useEffect, useState } from 'react';

const DesktopOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkIsDesktop = () => {
      // Basic check for mobile user agents or small screens
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|ipad|playbook|silk|blackBerry|iemobile|windows phone|kindle|mobi|webos/i.test(userAgent.toLowerCase());
      
      // Also check screen width just in case
      const isSmallScreen = window.innerWidth <= 768;
      
      setIsDesktop(!isMobileDevice && !isSmallScreen);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  if (!isDesktop) {
    return (
      <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex items-center justify-center p-6 text-center">
        <div className="bg-surface-container-high p-8 rounded-2xl max-w-md shadow-xl border border-outline">
          <span className="material-symbols-outlined text-[64px] text-error mb-4 block mx-auto">
            desktop_windows
          </span>
          <h1 className="font-headline-lg text-2xl font-bold uppercase mb-2">Desktop Only Experience</h1>
          <p className="text-on-surface-variant font-body-lg">
            The Admin Matrix is restricted to PC devices only. Please open this panel on a computer to continue.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default DesktopOnly;
