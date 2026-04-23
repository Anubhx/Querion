import os
import logging
from dotenv import load_dotenv

load_dotenv()

from groq import Groq

def _make_client():
    api_key = os.getenv("LLM_API_KEY", "")
    if api_key and api_key != "your_key_here":
        try:
            logging.info("Groq client initialised ✅")
            return Groq(api_key=api_key)
        except Exception as e:
            logging.error(f"Failed to initialize Groq client: {e}")
    logging.warning("No valid LLM_API_KEY — fallback mode active.")
    return None

client = _make_client()

def generate_sql(question: str) -> str:
    """
    Converts a natural language question into a PostgreSQL SELECT query.
    Falls back to a safe default query if no API key is configured.
    """
    if not client:
        return "SELECT * FROM customers LIMIT 5"

    prompt = f"""Convert the user question into a PostgreSQL SQL query.

Schema:
- customers(id, name, city)
- orders(id, customer_id, amount, created_at)

Rules:
- Only SELECT queries allowed
- No explanations, output SQL only

Question: {question}

SQL:"""

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a PostgreSQL expert. "
                        "Output ONLY valid SQL — no markdown, no backticks, no commentary."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.1,
            max_tokens=256,
        )
        sql = completion.choices[0].message.content.strip()

        # Strip accidental markdown fences
        for fence in ("```sql", "```"):
            if sql.startswith(fence):
                sql = sql[len(fence):]
            if sql.endswith("```"):
                sql = sql[:-3]

        return sql.strip()

    except Exception as e:
        logging.error(f"Groq API error: {e}")
        return "SELECT * FROM customers LIMIT 5"
