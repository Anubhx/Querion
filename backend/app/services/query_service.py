from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List, Dict, Any

def execute_query(db: Session, sql: str) -> List[Dict[str, Any]]:
    """
    Executes the validated SQL query on PostgreSQL and returns rows as dictionaries.
    Includes a statement timeout.
    """
    try:
        # Set timeout to 5 seconds
        db.execute(text("SET statement_timeout = 5000;"))
        result = db.execute(text(sql))
        
        # Determine column names
        keys = result.keys()
        
        # Convert to list of dicts
        rows = [dict(zip(keys, row)) for row in result.fetchall()]
        return rows
    except Exception as e:
        raise e
