"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  childProfiles as initialChildProfiles,
  getGenerationLabel,
} from "@/lib/mock-data";
import type {
  ChildGender,
  ChildProfile,
  GenerationHistoryItem,
  GenerationType,
} from "@/lib/types";

const CHILDREN_STORAGE_KEY = "kindergarten-ai-assistant.children";
const HISTORY_STORAGE_KEY = "kindergarten-ai-assistant.generation-history";

type NewChildProfileInput = {
  name: string;
  gender: ChildGender;
  age: number;
  className: string;
  parentContact: string;
  tags: string[];
  recentObservation: string;
};

type NewGenerationHistoryInput = {
  generationType: GenerationType;
  child: ChildProfile;
  observation: string;
  result: string;
};

type WorkspaceContextValue = {
  childProfiles: ChildProfile[];
  generationHistory: GenerationHistoryItem[];
  addChildProfile: (input: NewChildProfileInput) => ChildProfile;
  addGenerationHistory: (input: NewGenerationHistoryInput) => GenerationHistoryItem;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [childProfiles, setChildProfiles] =
    useState<ChildProfile[]>(initialChildProfiles);
  const [generationHistory, setGenerationHistory] = useState<GenerationHistoryItem[]>(
    []
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setChildProfiles(readStoredValue(CHILDREN_STORAGE_KEY, initialChildProfiles));
    setGenerationHistory(
      readStoredValue(HISTORY_STORAGE_KEY, createInitialGenerationHistory())
    );
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(CHILDREN_STORAGE_KEY, JSON.stringify(childProfiles));
  }, [childProfiles, hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(generationHistory));
  }, [generationHistory, hydrated]);

  const addChildProfile = useCallback((input: NewChildProfileInput) => {
    const now = new Date();
    const profile: ChildProfile = {
      id: `c-${now.getTime()}`,
      name: input.name,
      gender: input.gender,
      age: input.age,
      className: input.className,
      status: "新建档案",
      tags: input.tags,
      recentObservation: input.recentObservation,
      parentContact: input.parentContact,
      updatedAt: formatDateOnly(now),
    };

    setChildProfiles((current) => [profile, ...current]);
    return profile;
  }, []);

  const addGenerationHistory = useCallback((input: NewGenerationHistoryInput) => {
    const now = new Date();
    const type = getGenerationLabel(input.generationType);
    const item: GenerationHistoryItem = {
      id: `g-${now.getTime()}`,
      generationType: input.generationType,
      type,
      childId: input.child.id,
      childName: input.child.name,
      childClassName: input.child.className,
      childAge: input.child.age,
      childStatus: input.child.status,
      observation: input.observation,
      result: input.result,
      summary: `围绕${input.child.name}的观察内容生成${type}。`,
      createdAt: now.toISOString(),
    };

    setGenerationHistory((current) => [item, ...current]);
    return item;
  }, []);

  const value = useMemo(
    () => ({
      childProfiles,
      generationHistory,
      addChildProfile,
      addGenerationHistory,
    }),
    [addChildProfile, addGenerationHistory, childProfiles, generationHistory]
  );

  return (
    <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }

  return context;
}

function readStoredValue<T>(key: string, fallback: T): T {
  try {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return fallback;
    }

    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

function createInitialGenerationHistory(): GenerationHistoryItem[] {
  const now = new Date();
  const entries = [
    {
      generationType: "parentMessage" as const,
      child: initialChildProfiles[1],
      observation: "午睡前需要教师陪伴，听到熟悉的故事后能逐步安静下来。",
      result: "亲爱的家长，您好：今天乐乐午睡前仍需要一些陪伴，我们会继续给予稳定支持。",
      minutesAgo: 56,
    },
    {
      generationType: "dailyObservation" as const,
      child: initialChildProfiles[0],
      observation: "区域活动时主动邀请同伴搭建积木，并能说明自己的想法。",
      result: "【每日观察记录】安安今天在区域活动中主动邀请同伴合作搭建，表达较清晰。",
      minutesAgo: 138,
    },
  ];

  return entries.map((entry, index) => {
    const createdAt = new Date(now.getTime() - entry.minutesAgo * 60 * 1000);
    const type = getGenerationLabel(entry.generationType);

    return {
      id: `g-seed-${index + 1}`,
      generationType: entry.generationType,
      type,
      childId: entry.child.id,
      childName: entry.child.name,
      childClassName: entry.child.className,
      childAge: entry.child.age,
      childStatus: entry.child.status,
      observation: entry.observation,
      result: entry.result,
      summary: `围绕${entry.child.name}的观察内容生成${type}。`,
      createdAt: createdAt.toISOString(),
    };
  });
}

function formatDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}
