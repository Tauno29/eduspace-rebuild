# EduSpace

A screenshot-faithful frontend reconstruction of the lost EduSpace Namibia school-placement application.

## What is included

The project recreates the supplied mobile screen states: onboarding, Home, Search, Saved, Alerts, Profile, region selection, region detail, School Profile, Availability, expanded grade vacancies, and the Hostel Statistics bottom sheet. Navigation and visible interactions are implemented with React, Wouter, local component state, and local storage for the saved-school state.

The authoritative reconstruction notes and assumptions are in [`RECONSTRUCTION_REPORT.md`](./RECONSTRUCTION_REPORT.md). The screenshot-grounded design decisions are in [`ideas.md`](./ideas.md).

## Run locally

```bash
pnpm install
pnpm dev
```

The project is a static frontend. New users begin with the four onboarding slides, then complete `/setup` before reaching Home. Returning users with a completed local profile open `/home` directly. No mock or screenshot-derived school/region records are bundled into the live path; configure `VITE_EDUSPACE_DATA_URL` before using data-driven screens. Top Availability lists every configured school with `spaces > 0`, sorted highest first. To validate the code and create a production build:

```bash
pnpm check
pnpm build
```

Open `/` for onboarding. Selecting Continue or Skip stores the onboarding state and routes to `/home`. The screen map is available at these routes:

| Route | Screen |
|---|---|
| `/` | Onboarding entry |
| `/home` | Homepage and full 14-region grid |
| `/setup` | Profile setup after onboarding |
| `/search` | Search |
| `/search?modal=region` | Region selection modal |
| `/search?modal=grade` | Grade selection modal |
| `/search?modal=type` | School Type selection modal |
| `/saved` | Saved schools |
| `/alerts` | Alerts |
| `/profile` | Profile |
| `/personal-info` | Personal Information |
| `/support` | Help & Support |
| `/about` | About Edu Space |
| `/privacy` | Privacy Policy |
| `/regions` | Region selection |
| `/region/oshikoto` | Region detail |
| `/school/nuyoma` | School Profile |
| `/availability` | Availability |
| `/school/nuyoma?hostel=1` | Hostel Statistics sheet open |
| `/availability?grade=8` | Grade 8 expanded |

To reset onboarding during testing, clear the browser local-storage keys `eduspace-onboarded`, `eduspace-user-name`, and `eduspace-profile`. Saved-school state uses `eduspace-saved-{schoolId}`. Profile edits are persisted through the shared profile context and local storage. A typed real-data adapter, payload contract, and missing-source behavior are documented in [`DATA_SOURCE.md`](./DATA_SOURCE.md).
