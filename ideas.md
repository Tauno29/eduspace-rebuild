# EduSpace Reconstruction Design Specification

## Reference ground truth

This is a **reconstruction task, not a redesign**. The supplied EduSpace screenshot composites are the authoritative visual specification. The implementation must preserve the visible product identity, screen hierarchy, mobile-first proportions, lavender/white surfaces, indigo-purple accent, mint availability cues, persistent rounded bottom navigation, compact typography, and the simple education-focused tone. Any uncertainty should be resolved by favoring the screenshots over contemporary dashboard conventions.

The recovered screen map is: opening onboarding; Home; Search; Saved; Alerts; Profile; region selection; region detail with school list; School Profile; Availability; expanded grade vacancy state; and Hostel Statistics modal sheet. The persistent navigation contains Home, Search, Saved, Alerts, and Profile. The primary flow is onboarding → Home → region → school → availability or hostel details, with Search and Saved providing parallel discovery paths.

## Chosen approach: Screenshot-faithful mobile app recovery

### Design Movement

The visual language follows **soft mobile utility UI with light neumorphic influence**, characteristic of compact education and civic-information apps: pale lavender canvas, white raised cards, low-contrast borders, soft shadows, rounded touch targets, and vivid indigo controls. This movement is used only to reproduce the references, not to modernize them.

### Core Principles

1. **Reference before preference:** layout, spacing, copy hierarchy, colors, and controls follow the screenshots wherever visible.
2. **Portrait-first composition:** build a centered app shell that mirrors the narrow device viewport, then adapt through an intentional responsive frame instead of simply shrinking a desktop page.
3. **Quiet surfaces, vivid actions:** lavender background and white content surfaces keep the interface calm; purple is reserved for selected states and primary actions, while mint marks availability and positive capacity.
4. **Functional fidelity:** every visible navigation target, filter, disclosure, heart, modal, back affordance, and CTA performs a believable local interaction.

### Color Philosophy

The palette communicates safety and clarity for parents searching for schools. A cool lavender background makes white cards feel elevated without heavy contrast. Indigo-purple signals action and selection, mint-green communicates seats and positive availability, and restrained pink, blue, yellow, and lilac icon fields distinguish categories without becoming decorative noise.

### Layout Paradigm

The application is a **portrait device stage** rather than a desktop dashboard. A compact status strip and title/header region sit above stacked cards, lists, metrics, and occasional 2-column grids. The bottom navigation floats above the page content as a persistent rounded dock. On larger screens the portrait canvas remains visually legible and centered inside an airy pale surround, while on mobile it fills the viewport.

### Signature Elements

The interface repeats three motifs: a softly raised white floating navigation dock with a purple selected pill; rounded white cards with subtle lavender depth and compact icon circles; and indigo-to-violet action controls paired with mint capacity signals. A small Edu Space / NAMIBIA wordmark lockup and circular initial avatar anchor the header and profile surfaces.

### Interaction Philosophy

Interactions should feel immediate and gentle. Tapping a nav item changes the active screen; search filters visible local data; region cards open region detail; school rows open School Profile; the heart toggles Saved; grade rows disclose class rows; tabs and filter pills switch state; and the hostel status opens a bottom sheet over a dimmed School Profile. No interaction should feel like a dead end, and unsupported actions should remain visually consistent with the reference.

### Animation

Motion stays restrained and short: selected nav pills and controls transition in approximately 160–220ms; search/filter changes update without page theatrics; disclosure rows expand with a subtle opacity/transform transition; and the hostel sheet rises from the bottom in approximately 240ms with a soft scrim fade. Respect reduced-motion preferences and avoid adding animation where the screenshots imply a static screen.

### Typography System

Use a rounded geometric sans family close to the reference, with **Poppins** for headings and **Nunito Sans** for body copy and labels. Headings are bold and compact, body text is medium and small, metadata is uppercase or semibold at reduced size, and bottom-nav labels remain tiny but readable. Avoid Inter and avoid editorial serif typography because they dilute the reference.

### Brand Essence

**EduSpace helps Namibian parents find, compare, and save schools through a calm, practical placement companion.** Personality: reassuring, clear, local.

### Brand Voice

Headlines are direct and warm; CTAs are action-first and specific; microcopy is concise and reassuring. Example lines: **“Find the perfect school for your child anywhere in Namibia.”** and **“You’re all caught up!”**

### Wordmark & Logo

The header uses a compact `Edu Space` wordmark with a tiny `NAMIBIA` descriptor. The app mark is a simple indigo graduation-cap symbol inside a soft lavender circle, reproduced as a clean symbol rather than relying on default text treatment. The mark appears in onboarding and the favicon/icon treatment.

### Signature Brand Color

**EduSpace Indigo — `#5846E8`**. This is the ownable action color for selected navigation, primary buttons, key icon accents, and links.

## Implementation guardrails

Do not replace the reference with a generic admin dashboard, add unrelated pages, introduce dark mode, add heavy gradients, or invent complicated backend behavior. Use realistic local data and local storage for the saved-school state. Preserve the screenshot copy and numeric structures where they are legible; document assumptions in the final reconstruction report.
