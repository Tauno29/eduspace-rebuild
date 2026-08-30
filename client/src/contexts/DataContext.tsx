/* EduSpace live-data boundary: route all records through one explicit source and show a clear state when the source is unavailable. */

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { EduSpaceData, loadEduSpaceData } from "@/data/source";

type DataState = { status: "loading" | "ready" | "missing" | "error"; data: EduSpaceData | null; error: string | null };
type DataContextValue = DataState & { reload: () => void };
const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [reloadKey, setReloadKey] = useState(0);
  const [state, setState] = useState<DataState>({ status: "loading", data: null, error: null });
  useEffect(() => {
    let active = true;
    setState({ status: "loading", data: null, error: null });
    loadEduSpaceData().then((data) => {
      if (active) setState({ status: "ready", data, error: null });
    }).catch((error: unknown) => {
      if (!active) return;
      const message = error instanceof Error ? error.message : "Unable to load EduSpace data.";
      setState({ status: message.includes("not configured") ? "missing" : "error", data: null, error: message });
    });
    return () => { active = false; };
  }, [reloadKey]);
  const value = useMemo(() => ({ ...state, reload: () => setReloadKey((current) => current + 1) }), [state]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useEduSpaceData() {
  const value = useContext(DataContext);
  if (!value) throw new Error("useEduSpaceData must be used inside DataProvider");
  return value;
}
