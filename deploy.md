# Querion — Deployment & Production Setup Directive

## Context

Querion is now fully functional locally:

* Frontend (Next.js) ✅
* Backend (FastAPI) ✅
* NL → SQL → Validation → Execution → Charts ✅
* Navigation + Query History ✅

Goal:
Make the app **fully live on the internet** using free-tier services.

---

## Deployment Architecture

Frontend → Vercel
Backend → Render
Database → Neon (PostgreSQL)

---

## Tasks to Perform

### 1. Prepare Backend for Production

* Ensure `requirements.txt` is complete

* Add `.env.example` with:

  * DATABASE_URL
  * LLM_API_KEY

* Update FastAPI app:

  * Add CORS middleware
  * Allow only frontend domain (not "*")

Example:

```python
allow_origins=["https://your-vercel-domain.vercel.app"]
```

* Ensure server runs with:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 10000
```

---

### 2. Deploy Backend on Render

* Create new Web Service
* Connect GitHub repo
* Root directory: `/backend`

Settings:

* Build Command: `pip install -r requirements.txt`
* Start Command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`

Environment Variables:

* DATABASE_URL (from Neon)
* LLM_API_KEY

Ensure backend URL is publicly accessible.

---

### 3. Setup PostgreSQL (Neon)

* Create new project
* Copy connection string
* Use it in backend `.env`

Ensure:

* Tables exist (customers, orders)
* Seed with sample data

---

### 4. Deploy Frontend on Vercel

* Import GitHub repo
* Select `/frontend` directory

Set environment variable:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

### 5. Connect Frontend to Backend

* Replace local API URL with production URL
* Ensure all API calls use:

```js
process.env.NEXT_PUBLIC_API_URL
```

---

## Required Fixes Before Deployment

### 1. Persist Query History

Use localStorage:

* Save history on update
* Load history on app start

---

### 2. Error Handling

Add UI handling for:

* API failure
* Invalid SQL
* Empty results

---

### 3. Loading States

* Disable query input while loading
* Show spinner or skeleton UI

---

### 4. Empty States

* Chart: "No data available"
* History: "No query history yet"

---

### 5. CORS Security

* Do NOT use `"*"` in production
* Restrict to Vercel domain

---

## Testing After Deployment

1. Open live frontend URL
2. Enter query:
   "Show top customers by revenue"

Verify:

* SQL is generated
* Data is returned
* Chart renders
* Query history updates
* Clicking history re-runs query

---

## Final Step — Production Review Mode

Perform final review:

* No console errors
* No broken links
* Navigation works
* API calls succeed
* UI is responsive
* Environment variables are secure

---

## Output Requirements

* Provide:

  1. Live frontend URL
  2. Live backend URL
  3. Confirmation all features work

---

## Goal

Deploy Querion as a **fully working SaaS-style AI tool** that:

* Runs in production
* Is shareable via link
* Is ready for portfolio and recruiter demos

Do NOT overbuild.
Focus on stability and completeness.
