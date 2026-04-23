'use client';

export function SavedReports() {
  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-text-main">Saved Reports</h1>
          <p className="text-[13px] text-text-3 mt-0.5">Save queries as reusable reports</p>
        </div>
        <button
          disabled
          className="flex items-center gap-1.5 text-[13px] font-semibold text-white bg-primary px-3.5 py-2 rounded-[8px] opacity-50 cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          New Report
        </button>
      </div>

      {/* Empty state */}
      <div className="bg-surface border border-border-subtle rounded-[16px] flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-violet/10 to-blue-50 border border-violet/20 rounded-[16px] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M4 7h20M4 14h14M4 21h16" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div className="text-[16px] font-bold text-text-main">No saved reports yet</div>
        <div className="text-[13px] text-text-3 text-center max-w-[340px] leading-[1.7]">
          Run a query from the Dashboard, then save it as a report to quickly access it later.
        </div>

        <div className="mt-2 grid grid-cols-3 gap-3 w-full max-w-[560px]">
          {[
            { icon: '📊', title: 'Revenue Weekly', desc: 'Auto-refreshing', comingSoon: true },
            { icon: '👥', title: 'Customer Churn', desc: 'Monthly view', comingSoon: true },
            { icon: '📦', title: 'Order Summary', desc: 'Export-ready', comingSoon: true },
          ].map((card) => (
            <div key={card.title} className="bg-app-bg border border-border-subtle rounded-[12px] p-3.5 relative overflow-hidden opacity-50">
              <div className="text-xl mb-2">{card.icon}</div>
              <div className="text-[12px] font-semibold text-text-main">{card.title}</div>
              <div className="text-[11px] text-muted mt-0.5">{card.desc}</div>
              {card.comingSoon && (
                <span className="absolute top-2 right-2 text-[9px] font-bold tracking-wide bg-violet/10 text-violet px-1.5 py-[2px] rounded-full uppercase">
                  Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
