# EduSpace Reconstruction Report

## Project summary

EduSpace has been reconstructed as a frontend-only React application from the four supplied screenshot composites. The screenshots were treated as the primary design specification. The implementation keeps the original portrait mobile-app composition, pale lavender canvas, rounded white surfaces, indigo-purple action color, mint availability cues, small rounded typography, and persistent floating bottom navigation.

## Screens identified from the references

The supplied images reveal the following screens and states:

| Screen | Reconstructed route | Notes |
|---|---|---|
| Opening slide | `/` | Onboarding welcome state with Skip, pager dots, logo mark, copy, and Continue CTA. |
| Homepage | `/home` | Edu Space header, notifications/profile controls, search shortcut, greeting, and four region cards. |
| Search | `/search` | Search field, four filter controls, four browse-by-category cards, and local result feedback. |
| Saved | `/saved` | Search field and saved-school card with thumbnail, availability metadata, and heart toggle. |
| Alerts | `/alerts` | Search field, alert category pills, and “You’re all caught up!” empty state. |
| Profile | `/profile` | Account card, Personal Info/Favourites shortcuts, activity counts, and support list. |
| Region selection | `/regions` | Expanded 2-column region card grid matching the supplied selection state. |
| Region detail / school selection | `/region/:id` | Region metrics, analytics bars, category stats, filters, and school list row. |
| School Profile | `/school/:id` | Classroom hero image, favorite control, availability/hostel cards, Overview/Academics tabs, and school copy. |
| Availability | `/availability` | Seat-allocation ring, capacity summary, vacancy breakdown, and expandable grade streams. |
| Hostel Statistics | `/school/nuyoma?hostel=1` | Bottom-sheet modal over a dimmed School Profile with Boys/Girls Hostel statistics. |
| Expanded Grade 8 state | `/availability?grade=8` | Grade 8 disclosure state with individual class/stream rows. |

## Features reconstructed

The application includes functional client-side navigation across all identified screens. The persistent five-item dock routes to Home, Search, Saved, Alerts, and Profile. Region cards open region details, the school list opens School Profile, the school heart updates the Saved screen, category and filter controls update local UI state, the Overview and Academics tabs switch content, the availability card opens seat details, the hostel card opens and closes the statistics sheet, and vacancy rows expand or collapse their stream details.

The Saved state uses local storage so the saved-school interaction persists between page visits. The application uses realistic local sample data for Namibia regions, one recovered school profile, occupancy metrics, grade vacancies, and hostel statistics. No backend or external API behavior was inferred where it could not be supported by the screenshots.

## Assumptions made

The archive contains screenshot composites rather than isolated original screen exports, and several text values are too small to read with certainty. Where exact strings were unclear, the closest visible wording or an internally consistent equivalent was used. The original classroom photograph was not separately available, so a visually similar classroom hero asset was generated for the School Profile. Icons were recreated with lightweight vector icons and small symbol treatments instead of attempting to infer proprietary icon files.

The references appear to depict a roughly 320–390px portrait viewport. The reconstruction uses a centered portrait device stage on desktop and fills the viewport on narrow screens. The screenshot status-bar time is represented as a static visual detail rather than a live device clock.

## Functionality that could not be determined

The screenshots do not reveal authentication, real school-search APIs, server persistence, account editing, notification delivery, exact school data provenance, or the behavior of unavailable filters beyond their visible controls. These areas remain intentionally local and lightweight so the frontend can later connect to a real backend without adding unsupported product behavior.

## How to run

From the project directory:

```bash
pnpm install
pnpm dev
```

For validation and a production build:

```bash
pnpm check
pnpm build
```

The application is a static frontend and does not require environment-specific backend setup. Use `/` to view onboarding on a fresh browser session. After selecting Continue or Skip, the app stores the onboarding state locally and opens Home. To return to onboarding during testing, clear the browser local-storage key `eduspace-onboarded`.

## Visual verification notes

The implementation was checked at desktop preview dimensions and a 390×844 mobile viewport. Representative screenshots were captured for onboarding, Home, Search, Regions, Region detail, School Profile, Availability, Saved, Alerts, and Profile, plus the Hostel Statistics and expanded Grade 8 states. TypeScript validation and the production build both pass.
