/* EduSpace live-data boundary: route all records through one explicit source and show a clear state when the source is unavailable. */

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { EduSpaceData, configuredDataUrl, loadEduSpaceData } from "@/data/source";
import { canonicalRegions, mergeCanonicalRegions } from "@/data/regions";

type DataState = { status: "loading" | "ready" | "missing" | "error"; data: EduSpaceData | null; error: string | null };
type DataContextValue = DataState & { reload: () => void };
const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [reloadKey, setReloadKey] = useState(0);
  const [state, setState] = useState<DataState>({ status: "loading", data: null, error: null });
  useEffect(() => {
    let active = true;
    const refresh = (initial = false) => {
      if (initial) setState({ status: "loading", data: null, error: null });
      loadEduSpaceData().then((nextData) => {
        if (active) setState({ status: "ready", data: { ...nextData, regions: mergeCanonicalRegions(nextData.regions) }, error: null });
      }).catch((error: unknown) => {
        if (!active) return;
        const message = error instanceof Error ? error.message : "Unable to load EduSpace data.";
        setState((current) => ({ status: message.includes("not configured") ? "missing" : "error", data: message.includes("not configured") ? { regions: canonicalRegions, schools: [], vacancyRows: [] } : current.data, error: message }));
      });
    };
    refresh(true);
    const interval = configuredDataUrl ? window.setInterval(() => refresh(false), 60000) : undefined;
    return () => { active = false; if (interval) window.clearInterval(interval); };
  }, [reloadKey]);
  const value = useMemo(() => ({ ...state, reload: () => setReloadKey((current) => current + 1) }), [state]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useEduSpaceData() {
  const value = useContext(DataContext);
  if (!value) throw new Error("useEduSpaceData must be used inside DataProvider");
  return value;
}
