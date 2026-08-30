/* EduSpace directory metadata: these are the 14 canonical Namibian region containers, not school counts or availability claims. */

import type { Region } from "./eduspace";

const directory = [
  ["erongo", "Erongo", "✦", "pink"],
  ["hardap", "Hardap", "◈", "yellow"],
  ["karas", "//Karas", "⌖", "blue"],
  ["kavango-east", "Kavango East", "✺", "mint"],
  ["kavango-west", "Kavango West", "◌", "pink"],
  ["khomas", "Khomas", "⌂", "lilac"],
  ["kunene", "Kunene", "◇", "yellow"],
  ["ohangwena", "Ohangwena", "✧", "blue"],
  ["omaheke", "Omaheke", "✦", "pink"],
  ["omusati", "Omusati", "◈", "mint"],
  ["oshana", "Oshana", "⌁", "lilac"],
  ["oshikoto", "Oshikoto", "✺", "yellow"],
  ["otjozondjupa", "Otjozondjupa", "◇", "blue"],
  ["zambezi", "Zambezi", "⌖", "pink"],
] as const;

export const canonicalRegions: Region[] = directory.map(([id, name, icon, tone]) => ({ id, name, icon, tone, schools: 0, available: 0 }));

export function mergeCanonicalRegions(liveRegions: Region[]): Region[] {
  const byId = new Map(liveRegions.map((region) => [region.id.toLowerCase(), region]));
  return canonicalRegions.map((region) => {
    const live = byId.get(region.id.toLowerCase()) || liveRegions.find((item) => item.name.toLowerCase() === region.name.toLowerCase());
    return live ? { ...region, ...live, id: region.id, name: region.name } : region;
  });
}
