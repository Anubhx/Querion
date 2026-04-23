interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaType?: 'up' | 'down';
  deltaLabel?: string;
  loading?: boolean;
}

export function MetricCard({ label, value, delta, deltaType = 'up', deltaLabel, loading }: MetricCardProps) {
  if (loading) {
    return (
      <div className="bg-surface border border-border-subtle rounded-[12px] p-4 px-[18px]">
        <div className="text-[11px] font-medium text-muted uppercase tracking-[0.06em] mb-1.5">{label}</div>
        <div className="h-7 w-24 rounded-[6px] mb-1.5 skeleton" />
        <div className="h-3 w-28 rounded-[4px] skeleton" />
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border-subtle rounded-[12px] p-4 px-[18px]">
      <div className="text-[11px] font-medium text-muted uppercase tracking-[0.06em]">{label}</div>
      <div className="text-[24px] font-bold text-text-main my-1.5 leading-none tabular-nums">{value}</div>
      {delta && (
        <div className={`text-[12px] font-medium flex items-center gap-1 ${deltaType === 'up' ? 'text-success' : 'text-danger'}`}>
          {deltaType === 'up' ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 9V3M3 6l3-3 3 3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 3v6M3 6l3 3 3-3" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
          {delta}
          {deltaLabel && (
            <span className={`text-[10px] font-semibold px-1.5 py-[1px] rounded-[4px] ml-0.5 ${deltaType === 'up' ? 'bg-[#F0FDF4] text-success' : 'bg-[#FFF5F5] text-danger'}`}>
              {deltaLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
