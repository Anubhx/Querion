# Querion — Fix & Completion Directive (fix.md)

## Context

The Querion app is fully functional end-to-end:

* NL → SQL generation ✅
* SQL validation ✅
* PostgreSQL execution ✅
* Chart rendering ✅
* Query history (data layer) ✅

However, several UI features are **visually present but not functional**.

---

## Goal

Fix navigation and complete missing UI flows to make Querion:

* Fully navigable
* Demo-ready
* Product-like (not just a prototype)

Do NOT rebuild existing working features.

---

## Issues to Fix

### 1. Navigation Not Working

The following buttons are clickable but not functional:

* Query History
* Saved Reports
* Scheduled Queries

Problem:
No routing or state-based navigation is implemented.

---

## Required Solution

Implement ONE of the following (prefer simple approach):

### Option A (Preferred)

State-based navigation inside dashboard

OR

### Option B

Next.js routing using separate pages

---

## Navigation Requirements

* Clicking sidebar buttons must switch views
* Active tab should be visually highlighted
* No page reload required (SPA behavior preferred)

---

## Views to Implement

### 1. Dashboard (Already Exists)

No changes required.

---

### 2. Query History View

Requirements:

* Display list of past queries
* Each item shows:

  * query text
  * timestamp (e.g., "Just now")
  * row count

Interaction:

* Clicking a query → re-run it
* Update dashboard with results

---

### 3. Saved Reports View

MVP version:

* Static placeholder UI

Content:

* Title: "Saved Reports"
* Message: "No saved reports yet"

Do NOT implement backend logic yet.

---

### 4. Scheduled Queries View

MVP version:

* Static placeholder UI

Content:

* Title: "Scheduled Queries"
* Message: "No scheduled queries yet"

---

## Component Structure

Create reusable components:

/components/

* QueryHistory.tsx
* SavedReports.tsx
* ScheduledQueries.tsx

Keep components clean and modular.

---

## State Management

Use simple React state:

* activeView (dashboard, history, reports, scheduled)
* queryHistory (already exists)

Do NOT introduce complex state libraries.

---

## UX Requirements

* Highlight active sidebar item
* Smooth transitions between views
* Proper empty states:

  * "No data available"
* Maintain existing design system

---

## Constraints

* Do NOT modify backend
* Do NOT change working query system
* Do NOT introduce new APIs
* Keep implementation minimal

---

## Acceptance Criteria

Feature is complete when:

* All sidebar buttons navigate correctly
* Query History is interactive (click → rerun query)
* Saved Reports & Scheduled Queries show placeholder UI
* No console errors
* UI remains consistent with existing design

---

## Final Step — Codex Review Mode

After implementation, perform a self-review:

1. Check for:

   * unused components
   * broken state flows
   * console warnings
   * inconsistent UI

2. Refactor:

   * simplify logic
   * remove redundancy
   * improve readability

3. Ensure:

   * code is clean and modular
   * components are reusable
   * naming is consistent

Output:
Return ONLY improved code changes.

---

## Goal Reminder

This is NOT feature expansion.

This is:
→ Stabilization
→ Navigation completion
→ Demo polish

Make Querion feel like a real SaaS product.
