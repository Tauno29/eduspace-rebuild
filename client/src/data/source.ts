/* EduSpace recovery style: keep the current verified screenshot-derived data structure stable while making a real API source configurable for the next user-directed step. */

import { regions, schools, vacancyRows, Region, School } from "./eduspace";

export type EduSpaceData = {
  regions: Region[];
  schools: School[];
  vacancyRows: typeof vacancyRows;
};

export const configuredDataUrl = (import.meta.env.VITE_EDUSPACE_DATA_URL as string | undefined) || "";

export const verifiedReferenceData: EduSpaceData = { regions, schools, vacancyRows };

export async function loadEduSpaceData(): Promise<EduSpaceData> {
  if (!configuredDataUrl) return verifiedReferenceData;
  const response = await fetch(configuredDataUrl, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`EduSpace data source returned ${response.status}`);
  const payload = await response.json() as Partial<EduSpaceData>;
  if (!Array.isArray(payload.regions) || !Array.isArray(payload.schools) || !Array.isArray(payload.vacancyRows)) {
    throw new Error("EduSpace data source returned an invalid shape");
  }
  return payload as EduSpaceData;
}
