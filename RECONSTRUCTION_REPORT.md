# EduSpace Reconstruction Report

## Project summary

EduSpace has been extended from the original four screenshot composites to the complete 23-image reference set supplied in the latest archive. The application remains a frontend-only React reconstruction, but it now covers the newly revealed onboarding sequence, profile setup, filter modals, account-management screens, Help & Support, Privacy Policy, About Edu Space, the six-card search category grid, and the full 14-region Home experience.

The supplied screenshots remain the authoritative design specification. The implementation preserves the portrait-first layout, pale lavender background, raised white cards, EduSpace Indigo action states, mint availability cues, large rounded surfaces, small rounded typography, and floating bottom navigation. It does not introduce a new dashboard design.

## Screens and states identified

| Screen or state | Route | Reconstruction status |
|---|---|---|
| Welcome onboarding slide | `/` | Implemented as slide 1 of 4 for new users. |
| Discover Schools slide | `/` | Implemented as slide 2 of 4. |
| Real-time Availability slide | `/` | Implemented as slide 3 of 4. |
| Stay Notified slide | `/` | Implemented as slide 4 of 4. |
| Profile setup | `/setup` | Implemented with required full-name field and local completion state. |
| Homepage / full region grid | `/home` | Implemented with Tauno / TA identity and all 14 regions. |
| Search | `/search` | Implemented with query field, four filters, reset behavior, and six browse categories. |
| Region modal | `/search?modal=region` | Implemented with All Regions and 14 regional options. |
| Grade modal | `/search?modal=grade` | Implemented with All Grades, Pre-primary, and Grades 1–12. |
| School Type modal | `/search?modal=type` | Implemented with All Types, Government, and Private. |
| Saved | `/saved` | Implemented with Nuyoma saved-school card and persistent heart state. |
| Alerts | `/alerts` | Implemented with alert tabs and empty state. |
| Profile | `/profile` | Implemented with Tauno account card, activity counts, and support links. |
| Personal Information | `/personal-info` | Implemented with editable name, region, town, and Save Changes action. |
| Help & Support | `/support` | Implemented with call/email cards and independent FAQ accordions. |
| About Edu Space | `/about` | Implemented with brand mark, version, description, and footer. |
| Privacy Policy | `/privacy` | Implemented with the four screenshot-visible policy sections. |
| Regions | `/regions` | Implemented with the complete region card grid. |
| Region detail | `/region/:id` | Implemented with metrics, analytics, filters, and school row. |
| School Profile | `/school/nuyoma` | Implemented with classroom hero, favorite action, availability, hostel, tabs, and copy. |
| Availability | `/availability` | Implemented with seat-allocation ring and grade vacancy rows. |
| Hostel Statistics sheet | `/school/nuyoma?hostel=1` | Implemented as a bottom-sheet modal over School Profile. |
| Expanded Grade 8 | `/availability?grade=8` | Implemented with stream-level vacancy rows. |

## Functional behavior

New users begin at the four onboarding slides. `Skip` and the final `Get Started` action lead to profile setup. The setup screen requires a name before writing the local profile completion state and opening Home. Returning users with a completed local profile open Home directly.

Navigation works across the persistent Home, Search, Saved, Alerts, and Profile dock. Search selection modals open and close through the scrim, option selection updates the visible filter control, and Reset all filters returns the controls to their initial state. Region cards, school rows, availability cards, and account links route to their corresponding screens. School favorites persist in local storage. The Help & Support FAQ rows expand independently, and the Hostel Statistics sheet can be dismissed from its close button or scrim.

## Data status and non-mock boundary

The application no longer bundles mock, sample, or screenshot-derived school and region records into its live data path. The typed adapter in `client/src/data/source.ts` requires `VITE_EDUSPACE_DATA_URL` and loads a JSON payload containing `regions`, `schools`, and `vacancyRows`. Missing configuration, endpoint failures, invalid payloads, and empty results render explicit states rather than silently showing invented records.

Top Availability calls `getEligibleSchools()`, includes every configured school whose numeric `spaces` value is greater than zero, sorts results from highest to lowest available spaces, and renders every eligible school. If the authoritative source returns no eligible schools, the screen says so. The source URL, authentication method, refresh policy, and final contract still need to be supplied before enabling live records; no unsupported live service was invented.

## Assumptions and unresolved areas

Several screenshots are composites or contain small text. Where exact copy was not reliably legible, the closest visible wording was retained or a conservative equivalent was used. Icons were recreated with vector icons and simple symbol treatments because original source assets were not present. The classroom hero uses a visually similar generated classroom asset because the exact source photograph was not separately supplied.

Authentication, true push notifications, real-time Ministry synchronization, account deletion, and server-side persistence cannot be recovered from screenshots alone. Profile edits now persist through a shared context and local storage across Home, Profile, and Personal Information; school records and availability remain dependent on the configured authoritative source.

## Verification

The completed routes were type-checked and production-built successfully. Mobile verification was performed at 390 × 844 for onboarding, setup, Home, Search, all three filter modals, Regions, School Profile, Hostel Statistics, Availability, Help & Support, Personal Information, About, and Privacy Policy. Desktop representative screens were also checked during the initial reconstruction pass.

## Running the application

```bash
pnpm install
pnpm dev
```

Validation and production build:

```bash
pnpm check
pnpm build
```

Clear `eduspace-onboarded`, `eduspace-user-name`, and `eduspace-profile` from local storage to replay onboarding. Saved-school state uses `eduspace-saved-{schoolId}`. Configure `VITE_EDUSPACE_DATA_URL` with the authoritative JSON endpoint before using live data screens. Additional direct verification routes are documented in `README.md`.
