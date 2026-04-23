'use client';

const SCHEDULE_TYPES = [
  { label: 'Hourly', icon: '⚡', desc: 'Runs every hour' },
  { label: 'Daily', icon: '📅', desc: 'Runs at midnight UTC' },
  { label: 'Weekly', icon: '📆', desc: 'Runs every Monday' },
];

export function ScheduledQueries() {
  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-text-main">Scheduled Queries</h1>
          <p className="text-[13px] text-text-3 mt-0.5">Automate your recurring data pulls</p>
        </div>
        <button
          disabled
          className="flex items-center gap-1.5 text-[13px] font-semibold text-white bg-primary px-3.5 py-2 rounded-[8px] opacity-50 cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Schedule Query
        </button>
      </div>

      {/* Empty state */}
      <div className="bg-surface border border-border-subtle rounded-[16px] flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-teal/10 to-blue-50 border border-teal/20 rounded-[16px] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="3" y="4" width="22" height="20" rx="4" stroke="#0D9488" strokeWidth="1.8" />
            <path d="M9 4v4M19 4v4M3 12h22" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="14" cy="19" r="3.5" stroke="#0D9488" strokeWidth="1.6" />
            <path d="M14 17.5v1.5l1 1" stroke="#0D9488" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        <div className="text-[16px] font-bold text-text-main">No scheduled queries yet</div>
        <div className="text-[13px] text-text-3 text-center max-w-[340px] leading-[1.7]">
          Schedule any query to run automatically and get results delivered on time.
        </div>

        {/* Schedule type cards */}
        <div className="mt-2 grid grid-cols-3 gap-3 w-full max-w-[560px]">
          {SCHEDULE_TYPES.map((s) => (
            <div key={s.label} className="bg-app-bg border border-border-subtle rounded-[12px] p-3.5 text-center opacity-50">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-[12px] font-semibold text-text-main">{s.label}</div>
              <div className="text-[11px] text-muted mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="#94A3B8" strokeWidth="1.2" />
            <path d="M6 4v2.5l1.5 1" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Scheduling available in the next release
        </div>
      </div>
    </div>
  );
}
