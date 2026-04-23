export function Topbar() {
  return (
    <div className="h-14 bg-surface border-b border-border-subtle flex items-center px-6 gap-4 shrink-0 relative z-10">
      <div className="text-[15px] font-semibold text-text-main">Dashboard</div>
      <div className="ml-auto flex items-center gap-2.5">
        <div className="bg-[#F0FDFA] text-[#0F766E] text-[11px] font-medium px-2 py-1 rounded-full flex items-center gap-1.5">
          <span className="w-[7px] h-[7px] rounded-full bg-success"></span>
          PostgreSQL · sales_db
        </div>
        <button className="bg-surface text-text-2 border border-border-strong hover:bg-gray-50 flex items-center gap-1.5 px-[14px] py-[7px] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer">
          <svg className="w-[13px] h-[13px]" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
          Last 30 days
        </button>
        <button className="bg-primary text-white border border-primary hover:bg-primary-h flex items-center gap-1.5 px-[14px] py-[7px] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer">
          <svg className="w-[13px] h-[13px]" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
          New Query
        </button>
      </div>
    </div>
  );
}
