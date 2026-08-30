/* EduSpace recovery style: keep profile identity consistent across the portrait app while storing only user-entered values in local storage. */

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type EduSpaceProfile = {
  name: string;
  region: string;
  town: string;
};

const STORAGE_KEY = "eduspace-profile";
const EMPTY_PROFILE: EduSpaceProfile = { name: "", region: "", town: "" };

function readProfile(): EduSpaceProfile {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...EMPTY_PROFILE, ...JSON.parse(stored) };
    window.localStorage.removeItem("eduspace-user-name");
    window.localStorage.removeItem("eduspace-user-region");
    window.localStorage.removeItem("eduspace-user-town");
    return EMPTY_PROFILE;
  } catch {
    return EMPTY_PROFILE;
  }
}

type ProfileContextValue = {
  profile: EduSpaceProfile;
  saveProfile: (next: EduSpaceProfile) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<EduSpaceProfile>(() => readProfile());
  const value = useMemo(() => ({
    profile,
    saveProfile: (next: EduSpaceProfile) => {
      const clean = { name: next.name.trim(), region: next.region.trim(), town: next.town.trim() };
      setProfile(clean);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));

    },
  }), [profile]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error("useProfile must be used inside ProfileProvider");
  return value;
}
