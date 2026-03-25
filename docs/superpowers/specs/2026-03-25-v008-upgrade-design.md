# v0.0.8 Design Spec — A King's Lifestyle

## Core Feature: Daily Royal Codex
Unified mixed-topic daily lesson feed on dashboard. One lesson per day rotates across all 8 campuses. Users still deep-dive any campus. LLM enhancement button per lesson.

## New Content: 24 New Lessons
- Temple Care: +8 sleep lessons (13-20)
- Attire: +6 jewelry/adornment lessons (1-6)
- Mentality: +3 leadership lessons (1-3)
- Presence: +3 body language/influence lessons (1-3)
- Speech: +2 circumstantial speech lessons (1-2)
- Legacy: +2 multi-gen leadership lessons (1-2)
Total: 37 → 61 lessons across all campuses.

## Daily Codex Rotation
DAILY_LESSONS array pools all 61 lessons. getDailyLesson() uses day-of-year modulo to select one. Rotation designed to mix campuses (not sequential within one campus).

## LLM Enhancement
"Enhance with My Wisdom" button per lesson. Calls askLLM() with lesson context. Hidden if no LLM configured. Shows personalized Royal Insight paragraph.

## Build Sequence
1. shared.js — DAILY_LESSONS, getDailyLesson(), enhanceWithLLM(), updated CAMPUSES counts
2. dashboard.html — Daily Codex feed with inline lesson rendering
3. templecare.html — 8 new sleep lessons (13-20)
4. attire.html — 6 jewelry lessons (complete rewrite with full content)
5. mentality.html — 3 leadership lessons
6. presence.html — 3 influence lessons
7. speech.html — 2 circumstantial speech lessons
8. legacy.html — 2 multi-gen lessons
9. All other pages — version bump
10. Config — sw.js, sitemap.xml
11. Remotion — Daily Codex video
