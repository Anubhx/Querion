# Querion — AI Coding Agent Instructions

## Project
Querion = AI Data Analyst
Natural Language → SQL → Results → Charts → Insights

---

## Design Source of Truth

You MUST strictly follow these files:

1. `/ai-data-analyst-screens.html`
   → Visual reference for all screens (layout, spacing, UI structure)

2. `/querion-ui-spec.html`
   → Detailed spec (components, states, microcopy, behavior)

DO NOT invent UI.
DO NOT change layout.
Follow design exactly.

---

## Development Strategy (VERY IMPORTANT)

Always build in this order:

1. Layout shell (sidebar + topbar)
2. Individual screens (one at a time)
3. Reusable components
4. Backend APIs
5. AI integration

Never generate full app at once.

---

## Frontend Rules

Tech:
- React
- Tailwind CSS
- Recharts

Rules:
- Pixel-accurate to design files
- Use reusable components (Card, Table, AskBar, etc.)
- Maintain spacing, colors, typography from design
- Include all states:
  - loading
  - empty
  - error
  - success

---

## Backend Rules

Tech:
- FastAPI
- PostgreSQL

Flow:
User Input → LLM → SQL → Validation → Execution → Response

Rules:
- Always validate SQL before execution
- Only allow SELECT queries
- Separate logic:
  - routes
  - services
  - db layer

---

## AI Rules

- Use free-tier APIs only
- Keep prompts short
- Minimize API calls
- Always include:
  - SQL output
  - explanation of query

---

## Output Rules (CRITICAL)

- If asked for UI → return ONLY React code
- If asked for backend → return ONLY Python code
- No long explanations
- Keep responses compact

---

## When generating UI

You MUST:
- Match structure from screens.html
- Match components from ui-spec.html
- Follow microcopy exactly
- Respect layout hierarchy 
- Have loading skeleton effects of scrrens 

---

## When unclear

Ask ONE short question.
Do not guess.

---

## Goal

Build a clean, working MVP of Querion that:
- Looks like a real SaaS product
- Works end-to-end
- Is demo-ready for recruiters

Do NOT overbuild.
Do NOT add unnecessary features.  
Codex will review this project ones completed 