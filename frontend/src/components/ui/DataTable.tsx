interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'badge' | 'rank';
  badgeColor?: 'blue' | 'teal' | 'violet' | 'gray' | 'green';
}

interface Row {
  [key: string]: string | number;
}

interface DataTableProps {
  columns: Column[];
  rows: Row[];
  loading?: boolean;
  error?: string;
  totalRows?: number;
}

const RANK_STYLES: Record<number, string> = {
  1: 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]',
  2: 'bg-[#F8FAFC] border-border-strong text-slate',
  3: 'bg-[#FFF7ED] border-[#FED7AA] text-[#9A3412]',
};

const BADGE_STYLES: Record<string, string> = {
  blue:   'bg-[#EFF6FF] text-[#1D4ED8]',
  teal:   'bg-[#F0FDFA] text-[#0F766E]',
  violet: 'bg-[#F5F3FF] text-[#6D28D9]',
  gray:   'bg-app-bg text-slate border border-border-subtle',
  green:  'bg-[#F0FDF4] text-success',
};

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-3 py-[9px] border-b border-border-subtle">
          <div className="h-[12px] rounded-[4px] skeleton" style={{ width: `${50 + Math.random() * 40}%` }} />
        </td>
      ))}
    </tr>
  );
}

export function DataTable({ columns, rows, loading, error, totalRows }: DataTableProps) {
  if (error) {
    return (
      <div className="rounded-[8px] border border-danger/30 bg-[#FFF5F5] px-4 py-3 text-[13px] text-danger">
        <span className="font-semibold">DB Error: </span>{error}
        <span className="text-danger/70 ml-1">— Edit the SQL above to fix.</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className={`text-left text-[11px] font-semibold text-muted uppercase tracking-[0.05em] px-3 py-2 border-b border-border-subtle bg-app-bg ${col.type === 'number' || col.type === 'rank' ? 'text-right' : ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={columns.length} />)
            : rows.length === 0
            ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-text-3 text-[13px]">
                  Query ran successfully but returned no results. Try adjusting your date range or filters.
                </td>
              </tr>
            )
            : rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-app-bg transition-colors">
                {columns.map(col => {
                  const val = row[col.key];
                  if (col.type === 'rank') {
                    const rank = rowIdx + 1;
                    return (
                      <td key={col.key} className="px-3 py-[9px] border-b border-border-subtle text-right">
                        <span className={`inline-flex items-center justify-center w-5 h-5 border rounded-[5px] text-[11px] font-semibold ${RANK_STYLES[rank] ?? 'bg-app-bg border-border-subtle text-text-3'}`}>
                          {rank}
                        </span>
                      </td>
                    );
                  }
                  if (col.type === 'badge') {
                    return (
                      <td key={col.key} className="px-3 py-[9px] border-b border-border-subtle">
                        <span className={`text-[11px] font-medium px-2 py-[3px] rounded-[20px] ${BADGE_STYLES[col.badgeColor ?? 'gray']}`}>
                          {val}
                        </span>
                      </td>
                    );
                  }
                  if (col.type === 'number') {
                    return (
                      <td key={col.key} className="px-3 py-[9px] border-b border-border-subtle text-right text-text-2 font-medium tabular-nums">
                        {val}
                      </td>
                    );
                  }
                  return (
                    <td key={col.key} className="px-3 py-[9px] border-b border-border-subtle text-text-2 font-medium">
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))
          }
        </tbody>
      </table>

      {/* Footer pagination */}
      {!loading && rows.length > 0 && (
        <div className="px-4 py-2 border-t border-border-subtle flex items-center justify-between">
          <span className="text-[11px] text-muted">
            Showing {rows.length}{totalRows && totalRows > rows.length ? ` of ${totalRows}` : ''} results
          </span>
          {totalRows && totalRows > rows.length && (
            <div className="flex gap-1.5">
              <button className="bg-surface text-text-2 border border-border-strong text-[12px] font-medium px-2.5 py-[5px] rounded-[7px] cursor-pointer hover:bg-gray-50 transition-colors">← Prev</button>
              <button className="bg-surface text-text-2 border border-border-strong text-[12px] font-medium px-2.5 py-[5px] rounded-[7px] cursor-pointer hover:bg-gray-50 transition-colors">Next →</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
