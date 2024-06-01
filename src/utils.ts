type FormatOptions = {
  showMs: boolean;
};

export function formatMs(
  ms: number,
  options: FormatOptions = { showMs: true },
) {
  const minutes = Math.floor(ms / 60000);
  let remaining = ms % 60000;
  const seconds = Math.floor(remaining / 1000);
  remaining = remaining % 1000;
  if (options.showMs)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${remaining.toString().padStart(3, "0")}`;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
