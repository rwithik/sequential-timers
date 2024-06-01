import useTimerContext from "../../context/TimerProvider.tsx";
import { MouseEvent, useState } from "react";

export default function AddCustomTimer() {
  const { addTimer } = useTimerContext();

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleAddTimer = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTimer(minutes * 60 + seconds);
  };

  return (
    <div className="flex gap-2">
      <input
        value={minutes}
        type="number"
        onChange={(e) => setMinutes(parseInt(e.target.value))}
        id="minutes"
        name="minutes"
      />
      <input
        value={seconds}
        type="number"
        onChange={(e) => setSeconds(parseInt(e.target.value))}
        id="seconds"
        name="seconds"
      />
      <button type="submit" onClick={handleAddTimer}>
        Add Timer
      </button>
    </div>
  );
}
