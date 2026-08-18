"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { demoReducer, seedState, type Action, type DemoState } from "../lib/demo";

const STORAGE_KEY = "trustible-demo-v2";
const DemoContext = createContext<{ state: DemoState; dispatch: React.Dispatch<Action> } | null>(null);

function migrate(raw: string | null): DemoState {
  if (!raw) return seedState;
  try {
    const parsed = JSON.parse(raw) as Partial<DemoState>;
    if (parsed.version === 2) return { ...seedState, ...parsed, version: 2 } as DemoState;
    return { ...seedState, shortlisted: Array.isArray((parsed as { shortlisted?: string[] }).shortlisted) ? (parsed as { shortlisted: string[] }).shortlisted : seedState.shortlisted, lastAction: "Migrated MVP demo data" };
  } catch { return seedState; }
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, seedState);
  useEffect(() => {
    const migrated = migrate(window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem("trustible-demo"));
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

