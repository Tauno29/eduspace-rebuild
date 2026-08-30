/* EduSpace live-data boundary: only an explicitly configured source is accepted; no screenshot-derived or mock records are returned. */

import type { Region, School, VacancyRow } from "./eduspace";

export type EduSpaceData = {
  regions: Region[];
  schools: School[];
  vacancyRows: VacancyRow[];
};

export const configuredDataUrl = (import.meta.env.VITE_EDUSPACE_DATA_URL as string | undefined)?.trim() || "";

export async function loadEduSpaceData(): Promise<EduSpaceData> {
  if (!configuredDataUrl) {
    throw new Error("Live EduSpace data is not configured. Set VITE_EDUSPACE_DATA_URL before using data-driven screens.");
  }
  const response = await fetch(configuredDataUrl, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`EduSpace data source returned ${response.status}`);
  const payload = await response.json() as Partial<EduSpaceData>;
  if (!Array.isArray(payload.regions) || !Array.isArray(payload.schools) || !Array.isArray(payload.vacancyRows)) {
    throw new Error("EduSpace data source returned an invalid shape: regions, schools, and vacancyRows must be arrays.");
  }
  return payload as EduSpaceData;
}

export function getEligibleSchools(data: EduSpaceData): School[] {
  return data.schools
    .filter((school) => Number.isFinite(school.spaces) && school.spaces > 0)
    .sort((left, right) => right.spaces - left.spaces);
}
