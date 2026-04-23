from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class QueryRequest(BaseModel):
    question: str

class ChartData(BaseModel):
    labels: List[Any]
    values: List[Any]

class QueryResponse(BaseModel):
    sql: str
    data: List[Dict[str, Any]]
    chart: ChartData
    explanation: str
