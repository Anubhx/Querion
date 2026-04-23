# Querion — Backend Plan (plan.md)

## 1. Overview

Querion backend is responsible for:

* Converting natural language → SQL
* Validating SQL queries (safety layer)
* Executing queries on PostgreSQL
* Returning structured results for UI (table + chart + explanation)

This backend is designed as a **lightweight, production-ready MVP** using:

* FastAPI
* PostgreSQL
* Free-tier LLM APIs

---

## 2. Goals

* Reliable NL → SQL conversion
* Safe query execution (no destructive queries)
* Fast API response (<2–3 seconds)
* Clean and modular architecture
* Easy integration with React frontend

Success = User can type a question and instantly see:

* SQL
* Data table
* Chart-ready data
* Explanation

---

## 3. Core Features

1. Natural Language → SQL generation
2. SQL validation layer (critical feature)
3. Query execution engine
4. Structured API response
5. Chart data formatting
6. Basic query explanation

---

## 4. User Flow (Backend Perspective)

1. User sends question → `/query`
2. Backend calls LLM → generates SQL
3. SQL passes through validator
4. Valid SQL executes on PostgreSQL
5. Results are formatted
6. API returns:

   * SQL
   * Data
   * Chart structure
   * Explanation

---

## 5. System Architecture

```
Client (React)
     ↓
FastAPI (routes)
     ↓
Services Layer
 ├── LLM Service (NL → SQL)
 ├── SQL Validator (safety)
 ├── Query Service (DB execution)
 └── Formatter (response shaping)
     ↓
PostgreSQL Database
```

---

## 6. Folder Structure

```
backend/
│
├── app/
│   ├── main.py
│   ├── api/
│   │   └── routes.py
│   │
│   ├── services/
│   │   ├── llm_service.py
│   │   ├── sql_validator.py
│   │   ├── query_service.py
│   │
│   ├── db/
│   │   ├── database.py
│   │   └── models.py
│   │
│   ├── schemas/
│   │   └── query_schema.py
│   │
│   └── utils/
│       └── formatter.py
│
└── requirements.txt
```

---

## 7. Database Design (MVP)

### Tables:

**customers**

* id (PK)
* name
* city

**orders**

* id (PK)
* customer_id (FK)
* amount
* created_at

---

## 8. API Design

### POST `/query`

**Request:**

```
{
  "question": "Show top 5 customers by revenue last month"
}
```

**Response:**

```
{
  "sql": "SELECT ...",
  "data": [...],
  "chart": {
    "labels": [],
    "values": []
  },
  "explanation": "Top customers by revenue last month"
}
```

---

## 9. AI Workflow

1. Input: user question
2. Prompt LLM → generate SQL
3. Validate SQL:

   * Only SELECT allowed
   * No DROP / DELETE / UPDATE
4. Execute SQL
5. Format response

---

## 10. SQL Validation Strategy (Key Feature)

Rules:

* Allow only SELECT queries
* Block:

  * DELETE
  * DROP
  * UPDATE
  * INSERT
* Limit query complexity (optional)
* Reject malformed queries

If invalid:
→ return error message

---

## 11. Response Formatting

Backend converts raw DB result into:

* Table format (rows + columns)
* Chart format:

  * labels (x-axis)
  * values (y-axis)
* Short explanation

---

## 12. Development Phases

### Phase 1 — Setup

* FastAPI app
* PostgreSQL connection

### Phase 2 — Core Logic

* LLM → SQL
* SQL validation
* Query execution

### Phase 3 — Response Layer

* Formatter
* API response structure

### Phase 4 — Integration

* Connect frontend
* Handle loading/error states

---

## 13. Risks & Edge Cases

* Invalid SQL from LLM
* Empty query results
* Slow queries
* Ambiguous user input
* Incorrect table/column names

Mitigation:

* Validator layer
* Fallback error handling
* Simple schema prompts

---

## 14. Constraints

* Use only free-tier APIs
* Keep architecture minimal
* Avoid overengineering
* Focus on working MVP

---

## 15. Future Enhancements

* Query history storage
* Saved reports
* Multi-database support
* Authentication
* Caching frequent queries
* Better chart intelligence
* Fine-tuned SQL model

---

## 16. Definition of Done

Backend is complete when:

* `/query` works end-to-end
* SQL is validated safely
* Data returns correctly
* Frontend displays results without issues
* Response time is acceptable

---

## 17. Key Differentiator

The most important feature:

**SQL Validation Layer**

This ensures:

* Safety
* Reliability
* Real-world usability

This is what makes Querion stand out from basic AI projects.
