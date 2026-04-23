from typing import List, Dict, Any

def format_response(sql: str, results: List[Dict[str, Any]], explanation: str = "") -> dict:
    """
    Formats the raw DB results into the API response format.
    Dynamically identifies chart format based on columns.
    If 2 columns -> use chart.
    If 1 numeric -> use values, 1 string -> use labels.
    """
    
    response = {
        "sql": sql,
        "data": results,
        "chart": {
            "labels": [],
            "values": []
        },
        "explanation": explanation
    }
    
    if not results:
        return response
        
    keys = list(results[0].keys())
    
    # Try to extract chart if there are exactly 2 columns
    if len(keys) == 2:
        val1 = results[0][keys[0]]
        val2 = results[0][keys[1]]
        
        # Identify which column is numeric and which is categorical
        label_col = None
        val_col = None
        
        if isinstance(val1, (int, float)) and not isinstance(val2, (int, float)):
            val_col, label_col = keys[0], keys[1]
        elif isinstance(val2, (int, float)) and not isinstance(val1, (int, float)):
            val_col, label_col = keys[1], keys[0]
        elif isinstance(val1, (int, float)) and isinstance(val2, (int, float)):
            # If both are numeric, assume the first is label (like year/id)
            label_col, val_col = keys[0], keys[1]
        
        if label_col and val_col:
            response["chart"]["labels"] = [str(row[label_col]) for row in results]
            response["chart"]["values"] = [row[val_col] for row in results]
            
    return response
