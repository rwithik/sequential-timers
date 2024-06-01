import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import { Timer } from "../types";
import { v4 as uuidV4 } from "uuid";

type Context = {
  addTimer: (duration: number) => void;
  removeTimerById: (tId: string) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  reset: () => void;
  timers: Timer[];
  globalTimerInMs: number;
  restart: () => void;
  saveTimers: () => void;
  loadTimers: () => void;
};

const TimerContext = createContext<Context | null>(null);

export function TimerProvider({ children }: PropsWithChildren) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [globalTimerInMs, setGlobalTimerInMs] = useState<number>(0);
  const globalTimerRef = useRef<number>(-1);

  const startTimer = () => {
    if (globalTimerRef.current !== -1) return;
    globalTimerRef.current = setInterval(() => {
      setGlobalTimerInMs((p) => p + 100);
    }, 100);
  };

  const pauseTimer = () => {
    clearInterval(globalTimerRef.current);
    globalTimerRef.current = -1;
  };

  const addTimer = (durationInSec: number) =>
    setTimers((p) => {
      return [...p, { id: uuidV4(), durationInMs: durationInSec * 1000 }];
    });

  const removeTimerById = (id: string) =>
    setTimers((p) => {
      return p.filter((s) => s.id !== id);
    });

  const reset = () => {
    setGlobalTimerInMs(0);
    setTimers([]);
    pauseTimer();
  };

  const restart = () => {
    setGlobalTimerInMs(0);
  };

  const saveTimers = () => {
    localStorage.setItem("sequential-timers.timers", JSON.stringify(timers));
  };

  const loadTimers = () => {
    let savedState = [];
    try {
      savedState = JSON.parse(
        localStorage.getItem("sequential-timers.timers") ?? "[]"
      );
    } catch {
      savedState = [];
    } finally {
      setTimers(savedState);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        timers,
        addTimer,
        pauseTimer,
        startTimer,
        removeTimerById,
        globalTimerInMs,
        reset,
        restart,
        saveTimers,
        loadTimers,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export default function useTimerContext() {
  const ctx = useContext(TimerContext);
  if (ctx === null) {
    throw new Error(
      "`useTimerProvider` returns can only be used inside `TimerContext`"
    );
  }
  return ctx;
}
