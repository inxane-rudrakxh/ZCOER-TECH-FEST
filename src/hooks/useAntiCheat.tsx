import { useState, useEffect, useRef } from "react";
import { playSound } from "../lib/audio";

interface AntiCheatOptions {
  isActive: boolean;
  participantId: string;
  gameId: string;
  maxWarnings?: number;
  onDisqualify: () => void;
}

export function useAntiCheat({
  isActive,
  participantId,
  gameId,
  maxWarnings = 3,
  onDisqualify
}: AntiCheatOptions) {
  const storageKey = `anticheat_${participantId}_${gameId}`;
  
  const [warnings, setWarnings] = useState<number>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [showWarning, setShowWarning] = useState(false);
  const disqualifiedRef = useRef(false);

  useEffect(() => {
    localStorage.setItem(storageKey, warnings.toString());
    
    if (warnings >= maxWarnings && !disqualifiedRef.current) {
      disqualifiedRef.current = true;
      onDisqualify();
    }
  }, [warnings, storageKey, maxWarnings, onDisqualify]);

  useEffect(() => {
    if (!isActive || disqualifiedRef.current) return;

    const handleViolation = () => {
      // If a warning is already showing, don't increment multiple times instantly
      if (showWarning) return;
      
      setWarnings(w => w + 1);
      setShowWarning(true);
      playSound('warning');
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation();
      }
    };

    const handleBlur = () => {
      handleViolation();
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("paste", handleCopyPaste);
    document.addEventListener("cut", handleCopyPaste);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("paste", handleCopyPaste);
      document.removeEventListener("cut", handleCopyPaste);
    };
  }, [isActive, showWarning]);

  const dismissWarning = () => {
    setShowWarning(false);
  };

  const overlay = showWarning ? (
    <div className="fixed inset-0 z-50 bg-error/95 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
      <span className="material-symbols-outlined text-[80px] text-on-error mb-4 animate-bounce">warning</span>
      <h1 className="font-headline-xl text-on-error text-4xl sm:text-6xl mb-4 uppercase shadow-sm">
        SUSPICIOUS ACTIVITY DETECTED
      </h1>
      <p className="font-body-lg text-on-error max-w-2xl text-xl mb-6 font-bold tracking-wide bg-error-container text-on-error-container p-4 border-[3px] border-on-error shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
        You have switched tabs, minimized the window, or received a notification popup. 
        This is a strict violation of the arena rules.
      </p>
      <div className="flex flex-col gap-2 items-center">
        <span className="font-label-code text-on-error text-lg bg-black/30 px-4 py-2 rounded-full mb-6 uppercase tracking-widest border border-on-error/30">
          WARNING {warnings} OF {maxWarnings}
        </span>
        {warnings < maxWarnings ? (
          <button 
            onClick={dismissWarning}
            className="px-8 py-4 bg-on-error text-error font-headline-md text-xl uppercase tracking-wider border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1c1b1b] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1b1b] active:translate-y-[4px] active:shadow-none transition-all"
          >
            I UNDERSTAND, RETURN TO ARENA
          </button>
        ) : (
          <div className="px-8 py-4 bg-black text-error font-headline-md text-xl uppercase tracking-wider border-[3px] border-on-surface animate-pulse">
            DISQUALIFYING...
          </div>
        )}
      </div>
    </div>
  ) : null;

  return { overlay, warnings };
}
