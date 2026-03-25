# v0.0.7 Design Spec — A King's Lifestyle

## Overview
Restructure the site from a single-page public/private hybrid into a clean public landing + dedicated private dashboard with 8 "Royal Campuses." Add new Temple Care campus (12 lessons), upgrade nourishment to hybrid learning format, modernize navigation.

## Architecture

### Page Routing
- `index.html` — Public landing only. Hero, description, Calyvent branding, auth buttons. Zero private content.
- `dashboard.html` — **NEW.** Private hub. Streak, mastery %, daily verse, ritual recommendation, quick journal, 8-campus grid.
- Campus pages — Each behind `requireAuth()`. Unique header accent per campus.
- Auth flow: login/register → `localStorage` auth → redirect to `dashboard.html`.

### Navigation (shared.js)
Replace 11-item flat nav with structured layout:
- Logo + "Dashboard" link + "Campuses" dropdown (8 items) + "Journal" + "Settings" + streak + sign out
- Mobile: hamburger with same structure
- NAV_LINKS array updated to reflect new structure

### The 8 Campuses
| # | Name | Accent Color | File | Lessons |
|---|------|-------------|------|---------|
| I | Nourishment | `#A38255` gold | nourishment.html | 25 (existing, hybrid upgrade) |
| II | Attire | `#8B7D6B` taupe | attire.html | placeholder |
| III | Mentality | `#3D4F2F` olive | mentality.html | placeholder |
| IV | Treasury | `#7A6542` bronze | treasury.html | placeholder |
| V | Temple Care | `#6B5B4E` stone | templecare.html | 12 (new) |
| VI | Presence | `#3A3A3A` charcoal | presence.html | placeholder |
| VII | Speech | `#4A5568` slate | speech.html | placeholder |
| + | Legacy | `#571641` plum | legacy.html | placeholder |

### Hybrid Learning Format (Nourishment + Temple Care)
Layered on top of existing Professor lesson structure:
1. **Royal Decree** — gold-bordered pull-quote box per lesson
2. **Expandable verses** — `<details>` elements for deeper cross-references
3. **Quest panel** — end-of-lesson actionable challenge with checkbox + localStorage tracking
4. **Audio placeholder** — "Play Royal Briefing" button (disabled, future-ready)
5. **Video lore** — YouTube embed or placeholder per lesson
6. **Interactive checkpoint** — mid-lesson journal prompt

### Temple Care Campus — 12 Lessons
All written in Lead Professor of Biblical Nutrition voice (adapted to grooming/body stewardship).
Scripture-grounded, 2026 Aurora/Colorado practical, Hebrew/Greek roots.

1. The Temple Mandate — 1 Corinthians 6:19-20 foundation
2. Hairstyles for a King — short fade, textured crop, Caesar cut (1 Cor 11:14, Ezek 44:20)
3. Beard & Facial Mastery — trimmed, not marred (Lev 19:27)
4. Daily Shower Protocol — Isaiah 1:16, Levitical washing
5. Shampoo & Scalp Stewardship — Dr. Bronner's, natural formulas
6. Teeth & Oral Care — temple maintenance
7. Deodorant & Cologne — Native, Jack Henry, modest not vain
8. Skin Care for Kings — face wash, sunscreen, dignity
9. Hand & Nail Discipline — first-impression details
10. Full Temple Routine — morning + evening rituals
11. Travel Grooming Kits — I-70 & DEN airport ready
12. Fitness as Worship — exercise (migrated from old Body campus)

### shared.js Changes
- Update `NAV_LINKS` to new campus structure
- Add `CAMPUS_DATA` array with accent colors, icons, descriptions
- Update `buildNav()` for campuses dropdown
- Add `buildDashboard()` helper for dashboard widgets
- Update `signOut()` and auth redirect to use `dashboard.html`
- Add quest/checkpoint localStorage functions
- Bump version references

### File Operations
- **Create:** dashboard.html, templecare.html
- **Delete:** body.html (content migrates to templecare lesson 12)
- **Major edit:** index.html, shared.js, nourishment.html, pillar-template.js, sw.js, sitemap.xml
- **Minor edit:** attire.html, mentality.html, treasury.html, presence.html, speech.html, legacy.html, journal.html, settings.html, onboarding.html, privacy.html, terms.html, manifest.json, robots.txt

### Build Sequence
1. shared.js — core refactor (nav, campuses, auth redirect, quest functions)
2. pillar-template.js — add hybrid learning interactivity (quests, checkpoints, audio, decrees)
3. index.html — strip to public-only
4. dashboard.html — new private hub
5. templecare.html — 12 full lessons
6. nourishment.html — add hybrid elements to existing 25 lessons
7. All other campus pages — nav update, version bump, accent colors
8. Support pages — journal, settings, onboarding, privacy, terms
9. Config — sw.js, sitemap.xml, manifest.json
10. Git — commit, merge, push
11. Remotion — Temple Care Lesson 01 video component
