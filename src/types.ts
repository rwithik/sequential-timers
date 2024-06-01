export type Timer = {
  id: string;
  durationInMs: number;
};

export type TimerStatus = "Complete" | "In Progress" | "Pending";
