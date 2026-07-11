---
name: Repurposing CSS tokens for a visual redesign
description: Strategy for restyling a site whose components already reference shared CSS custom properties / utility classes pervasively.
---

When a codebase already uses generic, non-brand-specific CSS variable names (e.g. `--blush`, `--ink`, `--bone`) and matching utility classes (e.g. `.serif-italic`) across many files (nav, footer, every route page), the lowest-risk way to deliver a visual redesign is to **repoint the token values and utility-class styles**, not rename them everywhere.

- Change what `--blush` *means* (its color value) rather than introducing a new variable and updating every usage site — this cascades a new look everywhere instantly with minimal file churn and near-zero risk of missing a usage.
- The same applies to a repurposed utility class like `.serif-italic`: keep the class name (so all existing usages keep working) but change its actual style (e.g. italic serif → bold upright grotesk) to match the new direction.
- Add net-new tokens (e.g. an accent color the old palette didn't have) via the same `@theme inline` mechanism so Tailwind utility classes (`bg-lime`, etc.) become available without touching consuming files.

**Why:** avoids a large, error-prone find-and-replace across a dozen+ files, and guarantees full visual consistency since every consumer automatically inherits the new token value.

**How to apply:** at the start of any "redesign the visual style" task — first inventory existing shared tokens/utility classes before deciding whether to repoint them vs. introduce new ones.
