'use client';

interface HistoryEntry {
  question: string;
  time: string;
  rowCount: number | null;
}

interface QueryHistoryProps {
  entries: HistoryEntry[];
  onRerun: (question: string) => void;
}

export function QueryHistory({ entries, onRerun }: QueryHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-[#F0FDF4] border border-blue-100 rounded-[14px] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="#2563EB" strokeWidth="1.6" />
            <path d="M12 8v4l2.5 2.5" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        <div className="text-[15px] font-semibold text-text-main">No query history yet</div>
        <div className="text-[13px] text-text-3 text-center max-w-[320px] leading-[1.6]">
          Run a query from the Dashboard and it will appear here.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-text-main">Query History</h1>
          <p className="text-[13px] text-text-3 mt-0.5">{entries.length} queries in this session</p>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-muted bg-surface border border-border-subtle rounded-[8px] px-3 py-1.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="#94A3B8" strokeWidth="1.3" />
            <path d="M6.5 4v2.5l1.5 1.5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Session history
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {entries.map((entry, i) => (
          <div
            key={i}
            onClick={() => onRerun(entry.question)}
            className="group bg-surface border border-border-subtle rounded-[12px] px-4 py-3.5 cursor-pointer hover:border-primary hover:shadow-[0_2px_12px_rgba(37,99,235,.07)] transition-all"
          >
            <div className="flex items-start gap-3">
              {/* Index badge */}
              <div className="w-6 h-6 rounded-[6px] bg-blue-50 border border-blue-100 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 mt-0.5">
                {entries.length - i}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-text-main group-hover:text-primary transition-colors truncate">
                  {entry.question}
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted">
                  <span>{entry.time}</span>
                  {entry.rowCount !== null && (
                    <>
                      <span className="w-[3px] h-[3px] rounded-full bg-border-subtle inline-block" />
                      <span className="bg-[#F0FDFA] text-[#0F766E] text-[10px] font-medium px-1.5 py-[2px] rounded-[10px]">
                        {entry.rowCount} row{entry.rowCount !== 1 ? 's' : ''}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Re-run hint */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-medium text-primary shrink-0">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6a4 4 0 1 1 4 4H4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M4 8l-2 2 2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Re-run
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
