---
name: הראל אמיר – ניהול והפקת אירועים
description: A close, personal event-production brand told through deep espresso-charcoal darkness and warm champagne-gold light.
colors:
  champagne-gold: "#D9A44F"
  champagne-gold-bright: "#F2C572"
  espresso-charcoal: "#16110C"
  espresso-charcoal-mid: "#201810"
  espresso-charcoal-raised: "#291F14"
  espresso-charcoal-card: "#332819"
  cream-text: "#F8F0E0"
  warm-sand-text: "#DECBAE"
  muted-bronze-text: "#AC9977"
  ink-on-gold: "#1B140C"
  gold-border-subtle: "rgba(224, 179, 105, 0.16)"
  gold-border-strong: "rgba(224, 179, 105, 0.35)"
  gold-glow: "rgba(242, 197, 114, 0.35)"
typography:
  display:
    fontFamily: "Suez One, serif"
    fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  headline:
    fontFamily: "Suez One, serif"
    fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Suez One, serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Heebo, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "Heebo, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "10px"
  md: "14px"
  lg: "24px"
  card-lg: "20px"
  full: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "110px"
components:
  button-primary:
    backgroundColor: "{colors.champagne-gold}"
    textColor: "{colors.ink-on-gold}"
    rounded: "{rounded.full}"
    padding: "14px 30px"
  button-primary-hover:
    backgroundColor: "{colors.champagne-gold-bright}"
    textColor: "{colors.ink-on-gold}"
    rounded: "{rounded.full}"
    padding: "14px 30px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.champagne-gold-bright}"
    rounded: "{rounded.full}"
    padding: "14px 30px"
  card:
    backgroundColor: "{colors.espresso-charcoal-card}"
    rounded: "{rounded.md}"
    padding: "34px 26px"
  input:
    backgroundColor: "{colors.espresso-charcoal-mid}"
    textColor: "{colors.cream-text}"
    rounded: "{rounded.sm}"
    padding: "13px 16px"
---

# Design System: הראל אמיר – ניהול והפקת אירועים

## 1. Overview

**Creative North Star: "The Golden Hour Garden"**

The system reads as dusk settling over a garden wedding: near-black espresso-charcoal grounds every surface, and champagne-gold light picks out exactly the things that matter — a CTA, a hovering card, a number, a name in a testimonial. Nothing about it is loud. The gold never floods a surface; it rims, glows, and accents, the way real golden-hour light catches an edge rather than filling a room. That restraint is what makes the warmth read as personal and considered rather than as a generic "luxury dark mode."

This system explicitly rejects the pastel, blush, cursive-script wedding-industry cliché — there is no soft pink or rose-gold anywhere in the palette — and rejects the cold, corporate-agency look of flat white cards and blue accents. Warmth here comes from richness and depth (deep charcoal-browns, warm serif display type, soft glows), never from softness or cuteness.

**Key Characteristics:**
- Deep, warm-toned darkness (never pure black or cool gray) as the resting state of every section
- A single gold accent family that earns its rarity — glow and gold appear at moments of interaction or importance, not as constant surface color
- A serif display face (Frank Ruhl Libre) for anything that needs to feel considered or ceremonial, paired with a humanist sans (Assistant) for everything conversational
- Soft, generous rounding (pill buttons, 14–24px card radii) and diffuse shadows that feel tactile, not sharp or clinical
- RTL Hebrew layout throughout — spacing, borders, and directional cues (chevrons, underlines) all read right-to-left

## 2. Colors

A near-monochrome dark palette lit by a single warm gold accent; every other color is a tonal step of charcoal-brown or gold, never an unrelated hue.

### Primary
- **Champagne Gold** (`#D9A44F`): The one accent color in the system. Used for CTA button backgrounds, active/hover states, the accordion's open-state text, bullet markers, and the footer's top border. Its rarity is the point — it marks the things a visitor should act on or notice.
- **Champagne Gold Bright** (`#F2C572`): The lit, hover-state sibling of Champagne Gold. Used for CTA hover backgrounds, nav-link and testimonial-citation accents, and as the base of the glow effect. Reserve it for states, not resting surfaces.

### Neutral
- **Espresso Charcoal** (`#16110C`): The darkest tone — hero background, final-CTA section, footer. The system's true "black."
- **Espresso Charcoal Mid** (`#201810`): One step lighter — about section, testimonials section, form input backgrounds. Used to separate adjacent sections without ever feeling like a hard boundary.
- **Espresso Charcoal Raised** (`#291F14`): Service and gallery section backgrounds — a slightly more "raised" mid-tone that sits between Mid and Card.
- **Espresso Charcoal Card** (`#332819`): The lightest neutral — every card-like surface (service cards, accordion items, testimonial cards, the contact form) sits on this tone so it reads as physically raised off the section behind it.
- **Cream Text** (`#F8F0E0`): Headings and the highest-emphasis text (hero title, section titles, logo).
- **Warm Sand Text** (`#DECBAE`): Default body copy color — warm enough to feel intentional against the dark ground, never pure gray.
- **Muted Bronze Text** (`#AC9977`): Secondary/supporting text — subtitles, card body copy, dates, footer links.
- **Ink on Gold** (`#1B140C`): The only text color ever placed on a gold background (CTA button label) — near-black so it reads at full contrast against Champagne Gold.

### Named Rules
**The Rarity Rule.** Champagne Gold and Champagne Gold Bright never cover a resting surface — they appear only on CTAs, hover/active states, glows, and small marks (bullets, numerals, borders). If gold is filling more than a button or an icon at rest, it's being overused.

**The Warm-Never-Cool Rule.** Every neutral in this system is a brown-black, never a true gray or blue-black. If a new neutral doesn't read as "espresso" or "charcoal-brown" next to the existing four, it doesn't belong.

## 3. Typography

**Display Font:** Suez One (with serif fallback)
**Body Font:** Heebo (with sans-serif fallback)

**Character:** Suez One's blunt, single-weight serif carries anything that needs weight and occasion — the hero line, section titles, card headings — while the humanist Heebo sans handles everything conversational: body copy, labels, navigation, form fields. The pairing mirrors the brand itself: composed and considered where it matters, warm and plainspoken everywhere else. (Migrated from the original Frank Ruhl Libre / Assistant pairing as part of the "2a" layout redesign — Suez One ships one weight, so headings never carry a `font-weight` beyond 400; its own letterforms supply the weight.)

### Hierarchy
- **Display** (400, `clamp(2.2rem, 4.4vw, 3.6rem)`, line-height 1.2): The hero title only, in the split hero layout.
- **Headline** (400, `clamp(1.9rem, 3.4vw, 2.75rem)`, line-height 1.2): Section titles (About, Gallery, Service, Testimonials, Process, Final CTA).
- **Title** (400, `1.15rem`, line-height 1.3): Card/row-level headings — numbered service-row titles, accordion headers.
- **Body** (400, `1rem`, line-height 1.75): All paragraph copy. Kept to comfortable measure inside their containers (about text, service row copy, testimonial quote).
- **Label** (600, `0.85rem`, letter-spacing `0.08em`): The eyebrow line above each section title (e.g. "אודות", "מה מקבלים").

### Named Rules
**The Occasion Rule.** Suez One is reserved for headings and ceremonial moments (titles, service-row headings, the accordion, the testimonial quote and logo). It never appears in body copy, labels, or UI chrome — that boundary is what keeps the serif feeling special rather than decorative.

## 4. Elevation

The system is layered, not flat: depth comes from a combination of soft ambient shadows and a warm gold glow that appears specifically on interactive or "raised" elements (cards on hover, open accordion items, the floating WhatsApp button). At rest, cards sit on `shadow-soft`; on hover or open state, they upgrade to a larger shadow plus a gold glow, which is the system's primary way of signaling "this responded to you."

### Shadow Vocabulary
- **Soft** (`box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35)`): Resting-state depth for cards, the contact form, and gallery carousel items.
- **Soft Large** (`box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5)`): Hover/elevated state for cards and the floating WhatsApp button; also the contact form's resting shadow given its prominence.
- **Glow** (`box-shadow: 0 0 40px rgba(242, 197, 114, 0.15)`): A warm ambient gold halo layered under portrait imagery and open/hovered surfaces — this is what makes gold read as "light" rather than just "color."

### Named Rules
**The Respond-to-Touch Rule.** Nothing glows at rest. Gold glow is added only in response to hover, open, or focus state — it's the system's vocabulary for "this is alive," not a static decoration.

## 5. Components

Every component is tactile and warm: soft ambient shadows, generous rounding, and a gold glow that appears specifically when something is touched, hovered, or opened.

### Buttons
- **Shape:** Fully pill-shaped (`border-radius: 999px`) at every size.
- **Primary:** Champagne Gold background, Ink-on-Gold text, `14px 30px` padding (`17px 40px` for the large hero/final variant). Soft shadow at rest.
- **Hover / Focus:** Background shifts to Champagne Gold Bright, the button lifts 2px (`translateY(-2px)`), and the shadow upgrades to Soft Large plus a 26px Gold Glow halo. Transition: `0.25s ease` on transform, box-shadow, and background together.
- **Outline (secondary):** Transparent background, 1.5px Champagne Gold border, Champagne Gold Bright text. On hover, fills solid gold and switches text to Ink-on-Gold, picking up the same glow as the primary button.

### Cards / Containers
- **Corner Style:** 14px radius (`rounded.md`) for service cards and accordion items; 24px (`rounded.lg`) for the portrait image and the contact form.
- **Background:** Espresso Charcoal Card, one step lighter than whatever section it sits in, so it always reads as physically raised.
- **Shadow Strategy:** Flat/bordered at rest (a 1px `gold-border-subtle` hairline); on hover or open state, lifts with Soft Large shadow plus Gold Glow, and the border upgrades to `gold-border-strong`.
- **Border:** 1px hairline in translucent gold (`rgba(224, 179, 105, 0.16)` resting → `0.35` active/hover) rather than a solid neutral gray — even the structural lines carry the brand's warmth.
- **Internal Padding:** `34px 26px` for service cards; `24px 28px` for accordion body content; `40px 34px` for the contact form.

### Inputs / Fields
- **Style:** Espresso Charcoal Mid background, 1px `gold-border-subtle` border, 10px radius, Cream Text value color, Muted Bronze Text placeholder.
- **Focus:** Border shifts to solid Champagne Gold and the background darkens to Espresso Charcoal — a quiet, non-glowing focus state (glow is reserved for hover/open, not text-input focus).

### Navigation
- Sticky header, transparent-to-blurred: starts as `rgba(22, 17, 12, 0.75)` with a 12px backdrop blur, and solidifies to `rgba(22, 17, 12, 0.94)` with a shadow and a subtle-gold bottom border once the page scrolls past 12px.
- Nav order follows reading/scroll order: אודות → רגעים מהאירועים → השירות → המלצות → התהליך → צרו קשר.
- Scroll-spy driven: the link for the section currently at the top of the viewport gets Champagne Gold Bright text, 700 weight, and a solid Champagne Gold underline — no hover animation needed, since the active state is a function of scroll position, not the mouse.
- A 3px progress track sits directly under the header, filled left-to-right (document order, RTL) with a Champagne Gold → Champagne Gold Bright gradient tracking total page-scroll percentage.
- Mobile collapses to a hamburger (three bars morphing to an X) that opens a full-width dropdown panel in Espresso Charcoal, sliding open below the header.

### Signature Component: Fluid-Hover Gallery
A static row of 4 event photos (440px tall, `flex: 1` at rest) in the "רגעים מהאירועים" section. Hovering (or tapping, on touch) one photo grows it to `flex: 1.7` while its siblings shrink to `flex: 0.85` and dim to `brightness(0.85)`; the hovered photo also gets a subtle `scale(1.02)` and a modest shadow upgrade (`0 16px 36px rgba(0,0,0,.4)`, up from the resting `--shadow-soft`). The growth/scale/dim amounts are deliberately kept restrained — an earlier draft used `flex: 3.2`, `scale(1.04)`, and `brightness(0.72)`, which read as too aggressive a "pop" for this brand's restraint; the current values are the intentional, toned-down replacement. Replaces the previous infinite auto-scrolling marquee.

### Cursor-Follow Glow
A soft 420px Champagne Gold radial glow that trails the mouse cursor, scoped to the Hero + About region only (`.glow-region`). Disabled under `prefers-reduced-motion` and on coarse-pointer (touch) devices, since it depends on continuous mouse movement.

## 6. Do's and Don'ts

### Do:
- **Do** keep every neutral a warm charcoal-brown (Espresso Charcoal family) — never introduce a true gray or a cool/blue-black.
- **Do** reserve Champagne Gold and Champagne Gold Bright for CTAs, hover/active states, glows, and small marks — resting surfaces stay neutral.
- **Do** pair Frank Ruhl Libre with occasion — headings, card titles, testimonial citations — and keep it out of body copy and UI chrome.
- **Do** use the gold glow (`rgba(242, 197, 114, 0.35)`) as a response to interaction (hover, open, focus-adjacent), never as a static decoration.
- **Do** favor real event photography and named testimonials over stock imagery, generic icon grids, or invented social proof — this is a personal-relationship brand, and the imagery has to prove that.
- **Do** honor `prefers-reduced-motion` on every animated element (carousel, reveal-on-scroll) the way the current CSS already does.

### Don't:
- **Don't** use pastel, blush, or rose-gold tones anywhere — the warmth in this system comes from depth and richness, not softness. That's the generic wedding-industry look this brand is explicitly avoiding.
- **Don't** let the interface read as a cold corporate/agency tool — no flat white cards, no blue accents, no anonymous-team iconography. Every surface should feel like it belongs to one person's studio, not a department.
- **Don't** use a hard-edged, sharp-cornered treatment anywhere — the system's rounding (pill buttons, 14–24px card radii) is part of what keeps it feeling warm and human rather than corporate.
- **Don't** add a second, competing high-commitment CTA next to the WhatsApp button — the contact form is the only sanctioned fallback, and it hands off to WhatsApp itself. Don't introduce a third parallel path (e.g. a generic "Submit" that goes nowhere, or an email-first flow).
- **Don't** let gold flood a resting surface (a fully gold section background, a gold card fill) — that breaks the Rarity Rule and reads as gaudy rather than lit.
