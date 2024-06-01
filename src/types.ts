export type Timer = {
  id: number;
  durationInMs: number;
};

export type TimerStatus = "Complete" | "In Progress" | "Pending";
