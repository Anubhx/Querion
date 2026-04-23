import React from 'react';

type ResultState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

interface ResultCardProps {
  state: ResultState;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  errorMessage?: string;
  padded?: boolean;
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="h-3 w-3/4 rounded skeleton" />
      <div className="h-3 w-1/2 rounded skeleton" />
      <div className="h-[120px] w-full rounded-[8px] skeleton mt-2" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-8 text-center gap-3">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-[#F0FDF4] border border-blue-100 rounded-[16px] flex items-center justify-center mb-1">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" stroke="#2563EB" strokeWidth="1.6"/>
          <path d="M10 14h8M14 10v8" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="text-[17px] font-bold text-text-main">Ask your data anything</div>
      <div className="text-[14px] text-text-3 max-w-[360px] leading-[1.6]">
        Type a question in plain English above and Querion will generate SQL, run it, and show you the results.
      </div>
      <div className="grid grid-cols-3 gap-2.5 w-full max-w-[520px] mt-1">
        {[
          { icon: '📈', text: 'Top 10 products by revenue this quarter' },
          { icon: '📉', text: 'Monthly churn rate for the last 12 months' },
          { icon: '🕐', text: 'Orders pending \u003e 7 days by region' },
        ].map((s, i) => (
          <div key={i} className="bg-surface border border-border-subtle rounded-[12px] p-3.5 text-left cursor-pointer hover:border-primary transition-colors">
            <div className="w-7 h-7 rounded-[7px] bg-blue-50 flex items-center justify-center mb-2 text-base">{s.icon}</div>
            <div className="text-[12px] font-medium text-text-2 leading-[1.4]">{s.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-8 text-center gap-2">
      <div className="w-12 h-12 bg-[#FFF5F5] border border-danger/20 rounded-[12px] flex items-center justify-center mb-1">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke="#DC2626" strokeWidth="1.6"/><path d="M11 7v4.5M11 14v.5" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round"/></svg>
      </div>
      <div className="text-[14px] font-semibold text-danger">Something went wrong</div>
      <div className="text-[13px] text-text-3 max-w-[380px]">{message ?? 'An unexpected error occurred. Please try again.'}</div>
    </div>
  );
}

export function ResultCard({ state, children, errorMessage, padded = true }: ResultCardProps) {
  return (
    <div className={`bg-surface border border-border-subtle rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,.06)] overflow-hidden ${padded ? '' : ''}`}>
      {state === 'loading' && <LoadingSkeleton />}
      {state === 'empty' && <EmptyState />}
      {state === 'error' && <ErrorState message={errorMessage} />}
      {(state === 'success' || state === 'idle') && children}
    </div>
  );
}
