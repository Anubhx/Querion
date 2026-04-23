<div align="center">

![Querion Banner](./assets/banner.png)

# Querion

**AI-powered data analyst platform — ask your database anything in plain English.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Compatible-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Groq](https://img.shields.io/badge/LLM-Groq%20%2F%20Llama%203.3-FF4500?style=flat-square)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Features](#-features) · [Screenshots](#-screenshots) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Architecture](#-architecture)

</div>

---

## ✨ What is Querion?

Querion is a full-stack **AI data analyst platform** that bridges the gap between your PostgreSQL database and business users who don't know SQL. Simply type a question in plain English — Querion uses a large language model to generate the SQL, validates and executes it safely, and renders the results as interactive tables, charts, or raw JSON — all in real-time.

> **"Show me top customers by total spending"** → Querion generates SQL → Executes on your DB → Displays an interactive bar chart in seconds.

---

## 📸 Screenshots

### Dashboard
The main dashboard gives you a bird's-eye view of your key metrics, a live revenue trend chart, AI-generated insights, and a panel of your most recent queries — all in one glance.

![Dashboard View](./assets/dashboard.png)

---

### Natural Language Query → Results Table
Type any business question. Querion generates the SQL, displays it transparently, executes it, and renders the data in a clean, exportable table.

![Query Results](./assets/query-results.png)

---

### Interactive Chart View
Switch to Chart view to visualize your query results as a bar, area, or line chart — rendered with Recharts and auto-configured from your query output.

![Chart View](./assets/chart-view.png)

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🧠 **Natural Language to SQL** | Powered by Groq's Llama 3.3 70B — converts any business question into a valid PostgreSQL query |
| 🛡️ **SQL Safety Validator** | Blocks all non-SELECT queries (INSERT, DROP, DELETE, etc.) with automatic `LIMIT` injection |
| 📊 **Multi-view Results** | Switch between Table, interactive Chart, and Raw JSON views for every query result |
| 📥 **CSV Export** | One-click export of any query result to a CSV file |
| 📈 **Live KPI Dashboard** | Pre-built metric cards for Revenue, Orders, AOV, and Churn — always visible |
| 🔁 **Query History** | Every query is logged with timestamp and row count; re-run any past query in one click |
| 📋 **Saved Reports** | Bookmark and name important queries for repeated access by your team |
| ⏰ **Scheduled Queries** | View and manage queries that run on a recurring schedule |
| 💡 **AI Insight Strip** | After every query, Querion surfaces a natural-language explanation of the result |
| 🔄 **Recent Queries Sidebar** | Quickly replay recent queries from the persistent sidebar panel |

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | React framework, SSR, routing |
| **TypeScript 5** | Type safety across all components |
| **Tailwind CSS 4** | Utility-first styling |
| **Recharts** | Area, bar, and line chart visualizations |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | High-performance Python REST API |
| **SQLAlchemy** | ORM and database session management |
| **PostgreSQL** | Primary data store |
| **Groq SDK** | LLM inference — Llama 3.3 70B Versatile |
| **Pydantic** | Request/response schema validation |
| **python-dotenv** | Environment variable management |

---

## 🗂️ Project Structure

```
Querion/
├── frontend/                   # Next.js 16 application
│   └── src/
│       ├── app/
│       │   ├── page.tsx        # Main dashboard & view router
│       │   ├── layout.tsx      # Root layout with sidebar
│       │   └── globals.css     # Global design tokens
│       ├── components/
│       │   ├── layout/         # Sidebar, TopBar
│       │   └── ui/             # AskBar, MetricCard, DataTable,
│       │                       # ChartViewer, InsightStrip, SQLBlock,
│       │                       # QueryHistory, SavedReports,
│       │                       # ScheduledQueries, ResultCard
│       └── lib/
│           ├── api.ts          # HTTP client for backend
│           └── NavContext.tsx  # Global navigation state
│
├── backend/                    # FastAPI application
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py       # POST /query endpoint
│   │   ├── services/
│   │   │   ├── llm_service.py  # Groq NL→SQL generation
│   │   │   ├── sql_validator.py# SQL safety checks
│   │   │   └── query_service.py# DB query execution
│   │   ├── db/
│   │   │   └── database.py     # SQLAlchemy engine & sessions
│   │   ├── schemas/
│   │   │   └── query_schema.py # Pydantic request/response models
│   │   └── utils/
│   │       └── formatter.py    # Response formatting
│   ├── seed.py                 # Sample data seeder
│   └── requirements.txt
│
└── assets/                     # README screenshots & banner
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **PostgreSQL** running locally (or a connection string)
- A **[Groq API key](https://console.groq.com/)** (free tier available)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Anubhx/Querion.git
cd Querion
```

---

### 2. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
```

Edit `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/querion
LLM_API_KEY=your_groq_api_key_here
```

```bash
# Seed the database with sample data
python seed.py

# Start the API server
uvicorn app.main:app --reload --port 8000
```

The backend will be available at **http://localhost:8000**

---

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start the dev server
npm run dev
```

Open **http://localhost:3000** in your browser. 🎉

---

## 🔌 API Reference

### `POST /query`

Accepts a natural language question and returns structured query results.

**Request Body**
```json
{
  "question": "Show top 5 customers by total order amount"
}
```

**Response**
```json
{
  "sql": "SELECT c.name, SUM(o.amount) AS total FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.name ORDER BY total DESC LIMIT 5",
  "data": [
    { "name": "Alice Smith", "total": 12400 },
    { "name": "Bob Johnson", "total": 9800 }
  ],
  "chart": {
    "labels": ["Alice Smith", "Bob Johnson"],
    "values": [12400, 9800]
  },
  "explanation": "Generated results for: Show top 5 customers by total order amount"
}
```

**Error Responses**

| Status | Meaning |
|---|---|
| `400` | Invalid or unsafe SQL generated |
| `500` | Database execution error |

---

## 🧠 How It Works

```
User types a question
        │
        ▼
  [Frontend AskBar]
        │  HTTP POST /query
        ▼
  [FastAPI Route]
        │
        ├─► [LLM Service] ──► Groq Llama 3.3 70B
        │       │  Returns raw SQL
        │       ▼
        ├─► [SQL Validator] ── Block non-SELECT, inject LIMIT
        │
        ├─► [Query Service] ── Execute on PostgreSQL via SQLAlchemy
        │
        └─► [Formatter] ──────► JSON response with data + chart hints
                                        │
                                        ▼
                          [Frontend] renders Table / Chart / JSON
```

---

## 🛡️ Security

- **Read-only enforcement** — only `SELECT` statements are permitted; any DML or DDL raises a `400` immediately.
- **Automatic LIMIT injection** — every query is capped at 100 rows to prevent runaway queries.
- **No raw user input reaches the DB** — all SQL is LLM-generated and validator-checked before execution.

---

## 🗺️ Roadmap

- [ ] Multi-database support (MySQL, SQLite, BigQuery)
- [ ] User authentication & team workspaces
- [ ] Shareable report links
- [ ] Slack / email delivery for scheduled queries
- [ ] Fine-tuned SQL model for domain-specific schemas
- [ ] Natural language chart customization ("make this a pie chart")

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by [Anubhx](https://github.com/Anubhx)

⭐ **Star this repo if you found it useful!** ⭐

</div>
