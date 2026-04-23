

# ⚙️ BACKEND ARCHITECTURE (Querion)

Flow:

```
User Query
   ↓
LLM (NL → SQL)
   ↓
SQL Validator (safety layer)
   ↓
PostgreSQL Execution
   ↓
Response Formatter (table + chart + explanation)
   ↓
Frontend
```

---

# 📁 FOLDER STRUCTURE (important)

Create this:

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

# 🧠 STEP-BY-STEP CLAUDE PROMPTS (IMPORTANT)

Use these **one by one** (don’t combine)

---

## 🔹 1. FastAPI Base Setup

```txt
Follow agent.md.

Generate FastAPI app structure:

- main.py
- basic router setup
- CORS enabled

Keep it minimal and production-ready.
Return only code.
```

---

## 🔹 2. Database Connection (PostgreSQL)

```txt
Follow agent.md.

Generate PostgreSQL connection using SQLAlchemy.

Include:
- connection setup
- session management

Keep it simple.
Return only code.
```

---

## 🔹 3. Query API Route

```txt
Follow agent.md.

Create POST endpoint:

/query

Input:
{
  "question": "string"
}

Flow:
- call LLM service
- validate SQL
- execute query
- return result

Return only code.
```

---

## 🔹 4. LLM SERVICE (NL → SQL)

⚠️ Keep prompt short (token saving)

```txt
Follow agent.md.

Create llm_service.py:

Function:
generate_sql(question: str)

Use free API (placeholder function allowed).

Prompt should:
- convert NL to SQL
- only SELECT queries

Return SQL string.

Return only code.
```

---

## 🔹 5. SQL VALIDATOR (CRITICAL FEATURE)

```txt
Follow agent.md.

Create sql_validator.py:

Rules:
- allow only SELECT
- block DELETE, DROP, UPDATE, INSERT
- basic syntax check

If invalid → raise error

Return only code.
```

---

## 🔹 6. QUERY EXECUTION SERVICE

```txt
Follow agent.md.

Create query_service.py:

Function:
execute_query(sql: str)

- run query on PostgreSQL
- return rows + columns

Return only code.
```

---

## 🔹 7. RESPONSE FORMATTER (for charts)

```txt
Follow agent.md.

Create formatter.py:

Convert SQL result into:
{
  "table": [],
  "chart": { labels, values },
  "summary": "text"
}

Keep logic simple.

Return only code.
```

---

# 🛡️ IMPORTANT: LLM PROMPT (use inside code)

Use this minimal prompt:

```txt
Convert the user question into a PostgreSQL SQL query.

Rules:
- Only SELECT queries
- Use table names: customers, orders
- No explanations

Question:
{user_input}

SQL:
```

---

# 🧪 SAMPLE DB (you should create)

Use this schema:

```sql
customers(id, name, city)
orders(id, customer_id, amount, created_at)
```

---

# 🚀 RESPONSE FORMAT (final API output)

Your API should return:

```json
{
  "sql": "SELECT ...",
  "data": [...],
  "chart": {
    "labels": ["A", "B"],
    "values": [100, 200]
  },
  "explanation": "Top customers by revenue last month"
}
```


---

# ⚡ NEXT STEP (after this)

Once backend works:

* connect frontend API
* show real data in table + charts
* add loading + error states

