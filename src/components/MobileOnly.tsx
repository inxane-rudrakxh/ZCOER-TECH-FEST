import React, { useEffect, useState } from 'react';

const MobileOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      // Basic check for mobile user agents or small screens
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|ipad|playbook|silk|blackBerry|iemobile|windows phone|kindle|mobi|webos/i.test(userAgent.toLowerCase());
      
      // Also check screen width just in case
      const isSmallScreen = window.innerWidth <= 768;
      
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (!isMobile) {
    return (
      <div className="bg-surface font-body-md text-on-surface antialiased w-full min-h-screen flex items-center justify-center p-6 text-center">
        <div className="bg-surface-container-high p-8 rounded-2xl max-w-md shadow-xl border border-outline">
          <span className="material-symbols-outlined text-[64px] text-error mb-4 block mx-auto">
            phone_iphone
          </span>
          <h1 className="font-headline-lg text-2xl font-bold uppercase mb-2">Mobile Only Experience</h1>
          <p className="text-on-surface-variant font-body-lg">
            This part of the arena is designed strictly for mobile devices. Please open this link on your smartphone to continue.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MobileOnly;
