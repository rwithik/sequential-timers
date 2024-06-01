import useTimerContext from "./context/TimerProvider.tsx";
import Timer from "./features/Timer/Timer.tsx";
import { TimerStatus } from "./types.ts";
import AddCustomTimer from "./features/Timer/AddCustomTimer.tsx";
import PresetTimerButton from "./features/Timer/PresetTimerButton.tsx";
import { PRESET_TIMERS } from "./config.ts";

function App() {
  const {
    timers,
    startTimer,
    restart,
    globalTimerInMs,
    pauseTimer,
    reset,
    saveTimers,
    loadTimers,
  } = useTimerContext();

  const cumulativeTimes: number[] = [];

  let prevTime = 0,
    totalTime = 0;
  for (const timer of timers) {
    prevTime += timer.durationInMs;
    cumulativeTimes.push(prevTime);
    totalTime += timer.durationInMs;
  }

  if (globalTimerInMs > totalTime) pauseTimer();

  let remainingTimer = globalTimerInMs;

  return (
    <div className="flex flex-col gap-8 items-center p-16 w-screen h-screen">
      <h1>Sequential Timers</h1>
      <p>Set timers to run sequentially one after the other.</p>
      {globalTimerInMs}
      <div className="flex gap-2 ">
        <button
          onClick={() => {
            startTimer();
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            pauseTimer();
          }}
        >
          Stop
        </button>
        <button
          onClick={() => {
            restart();
          }}
        >
          Restart
        </button>
        <button
          onClick={() => {
            reset();
          }}
        >
          Clear All
        </button>
      </div>
      <div className="flex gap-2 ">
        <button
          onClick={() => {
            saveTimers();
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            loadTimers();
          }}
        >
          Load
        </button>
      </div>
      <AddCustomTimer />
      <div>Add preset timers.</div>
      <div className="flex gap-2">
        {PRESET_TIMERS.map((t) => (
          <PresetTimerButton key={t} durationInSeconds={t} />
        ))}
      </div>
      {timers.map((t, idx) => {
        let status: TimerStatus = "Pending";
        const rem = remainingTimer;
        remainingTimer -= t.durationInMs;
        if (globalTimerInMs === 0) status = "Pending";
        else if (globalTimerInMs >= cumulativeTimes[idx]) status = "Complete";
        else if (
          (globalTimerInMs > cumulativeTimes[Math.max(idx - 1, 0)] &&
            globalTimerInMs < cumulativeTimes[idx]) ||
          (idx === 0 && globalTimerInMs > 0)
        )
          status = "In Progress";
        return (
          <Timer key={t.id} timer={t} remainingTimeInMs={rem} status={status} />
        );
      })}
    </div>
  );
}

export default App;
