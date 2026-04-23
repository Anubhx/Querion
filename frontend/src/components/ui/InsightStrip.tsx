interface InsightStripProps {
  text: React.ReactNode;
}

export function InsightStrip({ text }: InsightStripProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-[#F0FDF4] border border-blue-200 rounded-[12px] p-3.5 px-4 flex items-start gap-2.5">
      <div className="w-7 h-7 bg-primary rounded-[7px] flex items-center justify-center shrink-0 mt-[1px]">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="8" cy="8" r="3" stroke="#fff" strokeWidth="1.4"/>
        </svg>
      </div>
      <div>
        <div className="text-[11px] font-semibold text-primary mb-0.5">AI INSIGHT</div>
        <div className="text-[13px] italic text-text-2 leading-[1.6]">{text}</div>
      </div>
    </div>
  );
}
