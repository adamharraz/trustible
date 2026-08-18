"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { demoReducer, seedState, type Action, type DemoState } from "../lib/demo";

const STORAGE_KEY = "trustible-demo-v3";
const DemoContext = createContext<{ state: DemoState; dispatch: React.Dispatch<Action> } | null>(null);

function migrate(raw: string | null): DemoState {
  if (!raw) return seedState;
  try {
    const parsed = JSON.parse(raw) as Partial<DemoState> & { version?: number };
    const savedInspirationIds = Array.isArray(parsed.savedInspirationIds) ? parsed.savedInspirationIds.filter((id): id is string => typeof id === "string") : [];
    const shortlisted = Array.isArray(parsed.shortlisted) ? parsed.shortlisted.filter((id): id is string => typeof id === "string") : seedState.shortlisted;
    if (parsed.version === 3) {
      return { ...seedState, ...parsed, version: 3, savedInspirationIds, shortlisted } as DemoState;
    }
    if (parsed.version === 2) {
      return { ...seedState, ...parsed, version: 3, savedInspirationIds, shortlisted, lastAction: "Migrated MVP demo data" } as DemoState;
    }
    return { ...seedState, shortlisted, savedInspirationIds, lastAction: "Migrated MVP demo data" };
  } catch {
    return seedState;
  }
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, seedState);
  useEffect(() => {
    const migrated = migrate(window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem("trustible-demo-v2") ?? window.localStorage.getItem("trustible-demo"));
    if (migrated !== seedState) dispatch({ type: "hydrate", state: migrated });
  }, []);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state]);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("useDemo must be used inside DemoProvider");
  return value;
}