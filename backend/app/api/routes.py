from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..schemas.query_schema import QueryRequest, QueryResponse
from ..services.llm_service import generate_sql
from ..services.sql_validator import is_safe_query, inject_limit
from ..services.query_service import execute_query
from ..utils.formatter import format_response

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
def handle_query(request: QueryRequest, db: Session = Depends(get_db)):
    # 1. NL -> SQL
    raw_sql = generate_sql(request.question)
    if not raw_sql:
        raise HTTPException(status_code=400, detail="Failed to generate SQL from question.")
        
    # 2. Validate SQL
    if not is_safe_query(raw_sql):
        raise HTTPException(
            status_code=400, 
            detail="Invalid SQL generated. Only safe SELECT queries are allowed."
        )
        
    # 3. Inject limit constraint if absent
    safe_sql = inject_limit(raw_sql, limit=100)
    
    # 4. Execute Query
    try:
        results = execute_query(db, safe_sql)
    except Exception as e:
        # DB execution error
        raise HTTPException(status_code=500, detail=f"Database execution error: {str(e)}")
        
    # 5. Empty Result handling (Empty State)
    # The formatter can handle empty results nicely.
    
    explanation = f"Generated results for: {request.question}"
        
    # 6. Format response
    response_data = format_response(safe_sql, results, explanation)
    
    return response_data
