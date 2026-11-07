import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const DiwaliContext = createContext(null);

const DIWALI_START_KEY = "makzen_diwali_start_v1";
const DIWALI_MANUAL_STATE_KEY = "makzen_diwali_enabled_v1";
const DIWALI_LIT_COUNT_KEY = "makzen_diwali_lit_count_v1";

// 3 days in milliseconds: 3 * 24 * 60 * 60 * 1000 = 259,200,000 ms
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export function DiwaliProvider({ children }) {
  // Initialize start time: if none exists or if older than 30 days, set to now
  const [startTime, setStartTime] = useState(() => {
    try {
      const stored = localStorage.getItem(DIWALI_START_KEY);
      if (stored) {
        const val = parseInt(stored, 10);
        // If not expired or within reasonable test window, keep it; otherwise refresh
        if (!isNaN(val) && Date.now() - val < THREE_DAYS_MS + 24 * 60 * 60 * 1000) {
          return val;
        }
      }
      const now = Date.now();
      localStorage.setItem(DIWALI_START_KEY, now.toString());
      return now;
    } catch {
      return Date.now();
    }
  });

  const [isEnabled, setIsEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem(DIWALI_MANUAL_STATE_KEY);
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  const [litCount, setLitCount] = useState(() => {
    try {
      const stored = localStorage.getItem(DIWALI_LIT_COUNT_KEY);
      return stored ? parseInt(stored, 10) : 1008;
    } catch {
      return 1008;
    }
  });

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const endTime = startTime + THREE_DAYS_MS;
  const msRemaining = Math.max(0, endTime - now);
  const isDiwaliActive = isEnabled && msRemaining > 0;

  const days = Math.floor(msRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((msRemaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((msRemaining / (1000 * 60)) % 60);
  const seconds = Math.floor((msRemaining / 1000) % 60);

  const formattedTimer = useMemo(() => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
  }, [days, hours, minutes, seconds]);

  const lightDiya = useCallback(() => {
    setLitCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem(DIWALI_LIT_COUNT_KEY, next.toString());
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const resetDiwaliTimer = useCallback(() => {
    const newStart = Date.now();
    setStartTime(newStart);
    setIsEnabled(true);
    try {
      localStorage.setItem(DIWALI_START_KEY, newStart.toString());
      localStorage.setItem(DIWALI_MANUAL_STATE_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  const toggleDiwaliTheme = useCallback(() => {
    setIsEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(DIWALI_MANUAL_STATE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value = {
    isDiwaliActive,
    isEnabled,
    toggleDiwaliTheme,
    resetDiwaliTimer,
    countdown: { days, hours, minutes, seconds },
    formattedTimer,
    msRemaining,
    litCount,
    lightDiya,
  };

  return <DiwaliContext.Provider value={value}>{children}</DiwaliContext.Provider>;
}

export function useDiwali() {
  const context = useContext(DiwaliContext);
  if (!context) {
    throw new Error("useDiwali must be used within a DiwaliProvider");
  }
  return context;
}
