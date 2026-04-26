'use client';

import { useState, useCallback, useEffect } from 'react';
import { useNav } from '@/lib/NavContext';
import { AskBar } from '@/components/ui/AskBar';
import { MetricCard } from '@/components/ui/MetricCard';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ChartViewer } from '@/components/ui/ChartViewer';
import { InsightStrip } from '@/components/ui/InsightStrip';
import { SQLBlock } from '@/components/ui/SQLBlock';
import { QueryHistory } from '@/components/ui/QueryHistory';
import { SavedReports } from '@/components/ui/SavedReports';
import { ScheduledQueries } from '@/components/ui/ScheduledQueries';
import { runQuery, QueryResponse } from '@/lib/api';

// ─── Static data ─────────────────────────────────────────────────────────────
const METRICS = [
  { label: 'Total Revenue', value: '$2.4M', delta: '18.2%', deltaType: 'up' as const, deltaLabel: 'vs last month' },
  { label: 'Active Orders', value: '8,341', delta: '4.5%', deltaType: 'up' as const, deltaLabel: 'vs last month' },
  { label: 'Avg. Order Value', value: '$287', delta: '2.1%', deltaType: 'down' as const, deltaLabel: 'vs last month' },
  { label: 'Customer Churn', value: '3.2%', delta: 'improved 0.4%', deltaType: 'up' as const },
];

const REVENUE_CHART_DATA = [
  { month: 'Apr', revenue: 180000 }, { month: 'May', revenue: 210000 },
  { month: 'Jun', revenue: 195000 }, { month: 'Jul', revenue: 230000 },
  { month: 'Aug', revenue: 260000 }, { month: 'Sep', revenue: 290000 },
  { month: 'Oct', revenue: 275000 }, { month: 'Nov', revenue: 310000 },
  { month: 'Dec', revenue: 340000 }, { month: 'Jan', revenue: 355000 },
  { month: 'Feb', revenue: 370000 }, { month: 'Mar', revenue: 400000 },
];

const TAG_STYLES: Record<string, string> = {
  teal:   'bg-[#F0FDFA] text-[#0F766E]',
  blue:   'bg-[#EFF6FF] text-[#1D4ED8]',
  gray:   'bg-app-bg text-slate border border-border-subtle',
  violet: 'bg-[#F5F3FF] text-[#6D28D9]',
};

// ─── Types ────────────────────────────────────────────────────────────────────
type PageState = 'idle' | 'loading' | 'success' | 'error';
type ResultTab = 'Table' | 'Chart' | 'Raw JSON';

interface HistoryEntry {
  question: string;
  time: string;
  rowCount: number | null;
}

interface RecentQuery {
  q: string;
  time: string;
  tag: string;
  tagColor: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function deriveColumns(data: Record<string, string | number>[]) {
  if (!data.length) return [];
  return Object.keys(data[0]).map(key => ({
    key,
    label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    type: typeof data[0][key] === 'number' ? 'number' as const : 'text' as const,
  }));
}

function deriveChartInfo(
  data: Record<string, string | number>[],
  apiChart: QueryResponse['chart']
): { chartData: typeof data; xKey: string; yKey: string } | null {
  if (!apiChart.labels.length || !apiChart.values.length || !data.length) return null;
  const cols = Object.keys(data[0]);
  if (cols.length < 2) return null;
  const labelKey = cols.find(k => typeof data[0][k] === 'string') ?? cols[0];
  const valueKey = cols.find(k => typeof data[0][k] === 'number') ?? cols[1];
  return { chartData: data, xKey: labelKey, yKey: valueKey };
}

const INITIAL_RECENT: RecentQuery[] = [
  { q: 'Show all customers', time: '2m ago', tag: '3 rows', tagColor: 'teal' },
  { q: 'What is the total order amount?', time: '5m ago', tag: 'chart', tagColor: 'blue' },
  { q: 'Show orders from New York customers', time: '12m ago', tag: '2 rows', tagColor: 'gray' },
  { q: 'Top customers by total spending', time: '1h ago', tag: 'chart', tagColor: 'violet' },
];

// ─── Root page ────────────────────────────────────────────────────────────────
export default function Page() {
  const { activeView, setActiveView } = useNav();

  // ── Shared query state (survives view switches) ───────────────────────────
  const [pageState, setPageState] = useState<PageState>('idle');
  const [result, setResult] = useState<QueryResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<ResultTab>('Table');
  const [recentQueries, setRecentQueries] = useState<RecentQuery[]>(INITIAL_RECENT);
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  // ── Load history from localStorage ───────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem('querionHistory');
      if (saved) {
        setHistoryEntries(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to load history from local storage", e);
    } finally {
      setIsHistoryLoaded(true);
    }
  }, []);

  // ── Save history to localStorage ───────────────────────────────────────
  useEffect(() => {
    if (!isHistoryLoaded) return;
    try {
      localStorage.setItem('querionHistory', JSON.stringify(historyEntries));
    } catch (e) {
      console.warn("Failed to save history to local storage", e);
    }
  }, [historyEntries, isHistoryLoaded]);

  // ── Run query (callable from any view) ───────────────────────────────────
  const handleQuery = useCallback(async (question: string) => {
    // Always switch to dashboard to show results
    setActiveView('dashboard');
    setPageState('loading');
    setActiveTab('Table');
    setResult(null);
    setErrorMsg('');

    try {
      const data = await runQuery(question);
      setResult(data);
      setPageState('success');

      const tag = data.data.length > 0
        ? `${data.data.length} row${data.data.length !== 1 ? 's' : ''}`
        : 'empty';

      // Prepend to sidebar recent list
      setRecentQueries(prev => [
        { q: question, time: 'Just now', tag, tagColor: 'teal' },
        ...prev.slice(0, 3),
      ]);

      // Prepend to full history
      setHistoryEntries(prev => [
        { question, time: 'Just now', rowCount: data.data.length },
        ...prev,
      ]);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to run query');
      setPageState('error');
    }
  }, [setActiveView]);

  // ── Derived chart / column info ───────────────────────────────────────────
  const chartInfo = result ? deriveChartInfo(result.data, result.chart) : null;
  const columns = result ? deriveColumns(result.data) : [];

  // ── View router ───────────────────────────────────────────────────────────
  if (activeView === 'history') {
    return (
      <div className="animate-fade-in">
        <QueryHistory entries={historyEntries} onRerun={handleQuery} />
      </div>
    );
  }

  if (activeView === 'reports') {
    return (
      <div className="animate-fade-in">
        <SavedReports />
      </div>
    );
  }

  if (activeView === 'scheduled') {
    return (
      <div className="animate-fade-in">
        <ScheduledQueries />
      </div>
    );
  }

  // ── Dashboard view ────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-5 animate-fade-in">

      {/* Ask Bar */}
      <AskBar onSubmit={handleQuery} isLoading={pageState === 'loading'} />

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3">
        {METRICS.map((m, i) => <MetricCard key={i} {...m} />)}
      </div>

      {/* Chart + Recent Queries */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 380px' }}>

        <div className="bg-surface border border-border-subtle rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,.06)] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[13px] font-semibold text-text-main">Revenue over time</div>
              <div className="text-[12px] text-muted mt-0.5">Monthly · Apr 2024 – Mar 2025</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-text-3">
                <span className="w-2.5 h-[3px] bg-teal rounded-full inline-block" />Actual
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-text-3">
                <span className="w-2.5 h-[3px] bg-violet rounded-full inline-block" />AI Forecast
              </div>
            </div>
          </div>
          <ChartViewer type="area" data={REVENUE_CHART_DATA} xKey="month" yKey="revenue" />
        </div>

        {/* Recent Queries panel */}
        <div className="bg-surface border border-border-subtle rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,.06)] overflow-hidden">
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-semibold text-text-main">Recent queries</div>
              <button
                onClick={() => setActiveView('history')}
                className="text-[11px] text-text-3 hover:text-primary bg-transparent border-none cursor-pointer font-medium transition-colors"
              >
                View all →
              </button>
            </div>
          </div>
          <div className="flex border-b border-border-subtle px-4">
            {['Mine', 'Team', 'Saved'].map((t, i) => (
              <div key={t} className={`text-[13px] font-medium py-2.5 px-4 border-b-2 -mb-px cursor-pointer transition-colors ${i === 0 ? 'text-primary border-primary' : 'text-text-3 border-transparent hover:text-text-2'}`}>
                {t}
              </div>
            ))}
          </div>
          <div className="p-3 flex flex-col gap-1.5">
            {recentQueries.map((q, i) => (
              <div
                key={i}
                onClick={() => handleQuery(q.q)}
                className="p-2.5 px-3 border border-border-subtle rounded-[8px] bg-surface cursor-pointer hover:border-primary hover:bg-blue-50/30 transition-all group"
              >
                <div className="text-[13px] font-medium text-text-main mb-1 truncate group-hover:text-primary transition-colors">{q.q}</div>
                <div className="flex items-center gap-2 text-[11px] text-muted">
                  <span>{q.time}</span>
                  <span className={`text-[10px] font-medium px-1.5 py-[2px] rounded-[10px] ${TAG_STYLES[q.tagColor]}`}>{q.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insight */}
      {pageState === 'success' && result?.explanation ? (
        <InsightStrip text={result.explanation} />
      ) : pageState !== 'success' && (
        <InsightStrip
          text={
            <>
              <strong className="font-semibold not-italic text-primary">Revenue is up 18.2% month-over-month,</strong>{' '}
              primarily driven by Electronics (+34%) and Home &amp; Garden (+22%). Your top-performing region is South-East.
              Consider investigating the 2.1% decline in Avg. Order Value —{' '}
              <strong className="font-semibold not-italic text-primary">bundle offers</strong> may help reverse this trend.
            </>
          }
        />
      )}

      {/* Results area */}
      {pageState === 'idle' && <IdleResultCard />}
      {pageState === 'loading' && <ResultCard state="loading" />}
      {pageState === 'error' && <ResultCard state="error" errorMessage={errorMsg} />}

      {pageState === 'success' && result && (
        <div className="flex flex-col gap-4">
          <SQLBlock sql={result.sql} />

          <ResultCard state="success">
            <div className="flex items-center justify-between border-b border-border-subtle p-3.5 px-4">
              <div className="flex">
                {(['Table', 'Chart', 'Raw JSON'] as ResultTab[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`text-[13px] font-medium py-2 px-4 border-b-2 -mb-[1px] cursor-pointer transition-colors bg-transparent border-l-0 border-r-0 border-t-0 ${
                      activeTab === t ? 'text-primary border-primary' : 'text-text-3 border-transparent hover:text-text-2'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-muted">{result.data.length} row{result.data.length !== 1 ? 's' : ''}</span>
                <button
                  onClick={() => {
                    const csv = [
                      columns.map(c => c.label).join(','),
                      ...result.data.map(row => columns.map(c => row[c.key] ?? '').join(','))
                    ].join('\n');
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
                    a.download = 'querion_result.csv';
                    a.click();
                  }}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-text-3 hover:text-primary cursor-pointer bg-transparent border-none transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v7M3 6l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Export CSV
                </button>
              </div>
            </div>

            {activeTab === 'Table' && (
              result.data.length > 0 ? (
                <DataTable columns={columns} rows={result.data} totalRows={result.data.length} />
              ) : (
                <div className="h-36 flex items-center justify-center text-[13px] text-text-3">
                  No results found for this query.
                </div>
              )
            )}

            {activeTab === 'Chart' && (
              <div className="p-4">
                {result.data.length === 0 ? (
                  <div className="h-36 flex items-center justify-center text-[13px] text-text-3">
                    No data available to visualize.
                  </div>
                ) : chartInfo ? (
                  <ChartViewer type="bar" data={chartInfo.chartData} xKey={chartInfo.xKey} yKey={chartInfo.yKey} title="Query Result Chart" />
                ) : (
                  <div className="h-36 flex items-center justify-center text-[13px] text-text-3">
                    This result can&apos;t be visualized automatically — switch to Table view.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Raw JSON' && (
              <pre className="p-4 text-[12px] font-mono text-text-2 bg-app-bg overflow-x-auto rounded-b-[12px] leading-[1.75]">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
          </ResultCard>
        </div>
      )}
    </div>
  );
}

// ─── Idle result card ─────────────────────────────────────────────────────────
function IdleResultCard() {
  return (
    <div className="bg-surface border border-border-subtle rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,.06)] overflow-hidden">
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
        <div className="flex">
          {['Table', 'Chart', 'Raw JSON'].map((t, i) => (
            <div key={t} className={`text-[13px] font-medium py-2 px-4 border-b-2 -mb-[1px] cursor-pointer transition-colors ${i === 0 ? 'text-primary border-primary' : 'text-text-3 border-transparent'}`}>
              {t}
            </div>
          ))}
        </div>
        <span className="text-[11px] text-muted italic">Run a query to see results</span>
      </div>

      <div className="flex flex-col items-center justify-center py-12 px-8 text-center gap-3">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-[#F0FDF4] border border-blue-100 rounded-[14px] flex items-center justify-center mb-1">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="9" stroke="#2563EB" strokeWidth="1.6" />
            <path d="M9 13h8M13 9v8" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        <div className="text-[16px] font-bold text-text-main">Ask your data anything</div>
        <div className="text-[13px] text-text-3 max-w-[380px] leading-[1.6]">
          Type a natural language question above and Querion will generate SQL, run it, and show results instantly.
        </div>
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-[560px] mt-3">
          {[
            { icon: '👥', text: 'Show all customers', sub: 'List from customers table' },
            { icon: '💰', text: 'Show all orders', sub: 'Browse orders table' },
            { icon: '📊', text: 'Top customers by spending', sub: 'Aggregate query' },
          ].map((s) => (
            <div
              key={s.text}
              className="bg-surface border border-border-subtle rounded-[12px] p-3.5 text-left group cursor-pointer hover:border-primary hover:shadow-[0_2px_12px_rgba(37,99,235,.08)] transition-all"
            >
              <div className="w-7 h-7 rounded-[7px] bg-blue-50 flex items-center justify-center mb-2 text-base group-hover:bg-blue-100 transition-colors">{s.icon}</div>
              <div className="text-[12px] font-semibold text-text-main">{s.text}</div>
              <div className="text-[11px] text-muted mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
