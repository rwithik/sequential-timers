import Button from "../../Shared/Button.tsx";
import { formatMs } from "../../utils.ts";
import useTimerContext from "../../context/TimerProvider.tsx";

type Props = {
  durationInSeconds: number;
};

export default function PresetTimerButton({ durationInSeconds }: Props) {
  const { addTimer } = useTimerContext();
  return (
    <Button onClick={() => addTimer(durationInSeconds)}>
      {formatMs(durationInSeconds * 1000, { showMs: false })}
    </Button>
  );
}
