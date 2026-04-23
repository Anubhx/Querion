# Querion: Project Plan

## 1. Project Overview
Querion is an AI-powered data analyst MVP. It takes natural language questions from users, securely translates them into executable PostgreSQL queries using an LLM, and returns the query results accompanied by intuitive charts and an easily understandable explanation.

## 2. Goals
- Build a fully functional MVP end-to-end (Frontend to Database to LLM).
- Replicate the exact design from `ai-data-analyst-screens.html` and `querion-ui-spec.html`.
- Maintain a highly secure, read-only SQL execution pipeline.
- Ensure the project is optimized for free-tier usage (minimizing API calls and hosting costs).

## 3. Core Features
- **Natural Language to SQL Generation:** Convert user questions to precise SQL.
- **Strict SQL Validation Layer:** Intercept and validate queries to prevent destructive changes.
- **Dynamic Data Visualization:** Render Recharts graphics tailored to the query payload.
- **AI-Powered Explanations:** Display the generated SQL and a plain-English explanation of how it works.
- **Design-Accurate MVP Dashboard:** Provide a polished user interface reflecting a robust SaaS product.

## 4. User Flow
1. **Input:** User submits a natural language question via the AskBar component.
2. **Translation:** Frontend requests the backend to translate the text to SQL using the LLM.
3. **Validation:** Backend strictly validates the SQL (blocks non-SELECT queries).
4. **Execution:** Valid query hits the PostgreSQL database.
5. **Explanation:** Data and original intent are used to generate a brief, plain-English summary.
6. **Rendering:** Frontend renders the data table, the relevant chart, and the AI explanation.

## 5. System Architecture
- **Frontend (Client):** React, Tailwind CSS, Recharts. Hosted on Vercel.
- **Backend (API):** Python FastAPI handling routes, LLM calls, and data fetching.
- **Database:** PostgreSQL (with a separate read-only role or validation layer).
- **AI Integration:** Free-tier LLM API (e.g., Gemini Free API) for natural language reasoning.

## 6. Database Design
A basic e-commerce schema suitable for analytical queries:
- **`customers`**: `id`, `name`, `email`, `joined_date`, `status`
- **`orders`**: `id`, `customer_id`, `amount`, `order_date`, `status`
- **`products`**: `id`, `name`, `category`, `price`
- **`order_items`**: `id`, `order_id`, `product_id`, `quantity`, `price`

## 7. API Design
*Base URL: `/api/v1`*
- `POST /query`
  - **Body:** `{ "query": "string" }`
  - **Response:** `{ "sql": "string", "explanation": "string", "columns": [], "rows": [], "chart_type": "string" }`
- `GET /schema`
  - **Response:** `{ "tables": { "table_name": ["column1", "column2"] } }`

## 8. Frontend Structure
- **Pages**:
  - `Dashboard`: The main application view.
- **Components** (Following ui-spec closely):
  - `Layout` (Sidebar + Topbar)
  - `AskBar` (Input component)
  - `DataTable` (Results grid)
  - `ChartViewer` (Recharts integration)
  - `ResultCard` (Wrapper for UI states: loading, empty, error, success)

## 9. AI Workflow
1. **Prompt Compilation:** Include database schema, user query, and strict output instructions into a single prompt.
2. **SQL Generation:** LLM outputs raw SQL.
3. **Backend Validation:** Python regex/AST confirms `SELECT` only; limits appended (e.g., `LIMIT 100`).
4. **Data Fetching:** Run the SQL against Postgres.
5. **Explanation Generation:** LLM interprets the result and generates a 1-2 sentence explanation.
6. **Return Payload:** Send the structured JSON to the React frontend.

## 10. Development Phases
- **Phase 1:** Layout shell (sidebar + topbar) based precisely on design files.
- **Phase 2:** Individual components (AskBar, Table, Chart) and UI states (loading, error, empty).
- **Phase 3:** Backend setup (FastAPI + PostgreSQL schema and dummy data).
- **Phase 4:** AI integration and query validation layer (NL → SQL → Data).
- **Phase 5:** End-to-end connection (API to Frontend) and final refinement.

## 11. Risks & Edge Cases
- **Malicious Queries:** Preventable via validation layer blocking `DROP/UPDATE/INSERT/DELETE`/etc.
- **Hallucinated Complex SQL:** Add robust backend `try/catch` and user-friendly error boundaries on the UI.
- **Large Result Sets:** Hardcode `LIMIT` statements to query execution to prevent UI freezes.

## 12. Future Enhancements
- Save and favorite query history.
- Multiple chart type toggles (Bar, Line, Pie, Area).
- Automated CSV/Excel query export.