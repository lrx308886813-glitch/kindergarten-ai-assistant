export type ChildGender = "男" | "女";

export type ChildProfile = {
  id: string;
  name: string;
  gender: ChildGender;
  age: number;
  className: string;
  status: string;
  tags: string[];
  recentObservation: string;
  parentContact: string;
  updatedAt: string;
};

export const generationTypes = [
  "dailyObservation",
  "parentMessage",
  "growthPortfolio",
  "activitySummary",
  "lessonDraft",
] as const;

export type GenerationType = (typeof generationTypes)[number];

export type GenerationOption = {
  value: GenerationType;
  label: string;
  description: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  helper: string;
  tone: "teal" | "amber" | "rose" | "slate";
};

export type RecentGeneration = {
  id: string;
  type: string;
  childName: string;
  createdAt: string;
  summary: string;
};

export type GenerationHistoryItem = {
  id: string;
  generationType: GenerationType;
  type: string;
  childId: string;
  childName: string;
  childClassName: string;
  childAge: number;
  childStatus: string;
  observation: string;
  result: string;
  summary: string;
  createdAt: string;
};
