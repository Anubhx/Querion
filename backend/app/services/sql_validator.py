import re

def is_safe_query(sql: str) -> bool:
    """
    Validates the SQL query to ensure it is a safe SELECT statement.
    Rules:
    - Must start with SELECT
    - Block semicolons to avoid multi-queries
    - Block keywords: DROP, DELETE, UPDATE, INSERT, ALTER, TRUNCATE, EXEC
    """
    sql_clean = sql.strip()
    if not sql_clean:
        return False
        
    # Check if it starts with SELECT
    if not re.match(r'(?i)^\s*SELECT', sql_clean):
        return False
        
    # Block semicolons to prevent multi-statements
    if ';' in sql_clean and not sql_clean.endswith(';'):
        # Allow trailing semicolon, but not one in the middle
        parts = [p.strip() for p in sql_clean.split(';') if p.strip()]
        if len(parts) > 1:
            return False

    # Block destructive keywords
    blocked_keywords = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'TRUNCATE', 'EXEC']
    pattern = r'\b(' + '|'.join(blocked_keywords) + r')\b'
    if re.search(pattern, sql_clean, re.IGNORECASE):
        return False
        
    return True

def inject_limit(sql: str, limit: int = 100) -> str:
    """
    Injects a LIMIT clause if one is missing.
    """
    sql_clean = sql.strip()
    if sql_clean.endswith(';'):
        sql_clean = sql_clean[:-1].strip()
        
    if not re.search(r'(?i)\bLIMIT\b', sql_clean):
        sql_clean = f"{sql_clean} LIMIT {limit}"
        
    return sql_clean
