const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export interface ChartData {
  labels: (string | number)[];
  values: (string | number)[];
}

export interface QueryResponse {
  sql: string;
  data: Record<string, string | number>[];
  chart: ChartData;
  explanation: string;
}

export async function runQuery(question: string): Promise<QueryResponse> {
  const res = await fetch(`${API_BASE}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(err.detail ?? `HTTP ${res.status}`);
  }

  return res.json();
}
