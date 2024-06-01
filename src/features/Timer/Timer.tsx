import { Timer as TTimer, TimerStatus } from "../../types.ts";
import useTimerContext from "../../context/TimerProvider.tsx";
import { formatMs } from "../../utils.ts";
import { ComponentProps } from "react";

const COMMON_CLASS_NAMES =
  "relative border border-green-800 font-mono rounded w-4/5 sm:1/2 h-7 min-h-7 ";

function RemoveTimerIcon(props: ComponentProps<"span">) {
  return (
    <span
      onClick={props.onClick}
      className="absolute text-red-900 top-1/2 -translate-y-1/2 -right-8 cursor-pointer p-1"
    >
      ✖
    </span>
  );
}

export default function Timer({
  timer,
  status,
  remainingTimeInMs,
}: {
  timer: TTimer;
  status: TimerStatus;
  remainingTimeInMs: number;
}) {
  const { removeTimerById } = useTimerContext();

  const handleRemoveTimer = () => {
    removeTimerById(timer.id);
  };

  const formattedDuration = formatMs(timer.durationInMs);

  if (status === "Complete")
    return (
      <div className={COMMON_CLASS_NAMES + "bg-green-800"}>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference">
          {formattedDuration} {status}
        </span>
        <RemoveTimerIcon onClick={handleRemoveTimer} />
      </div>
    );
  if (status === "In Progress") {
    return (
      <div className={COMMON_CLASS_NAMES}>
        <span
          className="bg-green-800 duration-100 h-full inline-block"
          style={{
            width: `${(remainingTimeInMs * 100) / timer.durationInMs}%`,
          }}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference">
          {formatMs(remainingTimeInMs)} / {formattedDuration} {status}
        </span>{" "}
        <RemoveTimerIcon onClick={handleRemoveTimer} />
      </div>
    );
  }
  return (
    <div className={COMMON_CLASS_NAMES}>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference">
        {formattedDuration} {status}
      </span>{" "}
      <RemoveTimerIcon onClick={handleRemoveTimer} />
    </div>
  );
}
