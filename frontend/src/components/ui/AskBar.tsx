'use client';

import { useState, useRef, useEffect } from 'react';

interface AskBarProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
  compact?: boolean;
  placeholder?: string;
}

const DB_CHIPS = ['sales_db', 'marketing_db', 'inventory_db'];

export function AskBar({ onSubmit, isLoading = false, compact = false, placeholder }: AskBarProps) {
  const [query, setQuery] = useState('');
  const [activeDb, setActiveDb] = useState('sales_db');
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 96) + 'px';
  }, [query]);

  const handleSubmit = () => {
    if (!query.trim() || isLoading) return;
    onSubmit(query.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const borderClass = isLoading
    ? 'border-border-strong'
    : focused
    ? 'border-primary shadow-[0_0_0_3px_rgba(37,99,235,0.08),0_4px_12px_rgba(0,0,0,0.08)]'
    : 'border-border-strong shadow-[0_4px_12px_rgba(0,0,0,0.08)]';

  return (
    <div className={`bg-surface border-[1.5px] ${borderClass} rounded-[14px] ${compact ? 'p-2.5 px-3' : 'p-3.5 px-4'} flex items-start gap-3 transition-all duration-150`}>
      {/* Icon */}
      <div className={`${compact ? 'w-[26px] h-[26px] rounded-[6px]' : 'w-8 h-8 rounded-[8px]'} bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shrink-0 mt-0.5`}>
        <svg width={compact ? 14 : 18} height={compact ? 14 : 18} viewBox="0 0 20 20" fill="none">
          <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="#2563EB" strokeWidth="1.5"/>
          <path d="M7 8.5c.5-1.5 2-2 3-1.5 1 .5 1.5 2 .5 3L10 12" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="14.5" r=".75" fill="#2563EB"/>
        </svg>
      </div>

      {/* Input area */}
      <div className="flex-1 min-w-0">
        {!compact && (
          <div className="text-[11px] font-semibold text-primary tracking-[0.04em] mb-1">
            ASK YOUR DATA ANYTHING
          </div>
        )}
        <textarea
          ref={textareaRef}
          rows={1}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder={placeholder ?? (compact
            ? 'Ask a follow-up… e.g. Show only Electronics category'
            : 'Ask a question about your data… e.g. What are my top 10 products by revenue this quarter?'
          )}
          className={`w-full bg-transparent border-none outline-none resize-none leading-[1.5] text-text-main placeholder:text-muted disabled:opacity-50 ${compact ? 'text-[13px]' : 'text-[15px]'} font-sans`}
          style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
        />

        {!compact && (
          <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-border-subtle">
            {/* DB chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {DB_CHIPS.map(db => (
                <button
                  key={db}
                  onClick={() => setActiveDb(db)}
                  className={`text-[11px] font-medium rounded-[20px] px-2.5 py-[3px] border transition-colors cursor-pointer ${
                    activeDb === db
                      ? 'bg-blue-50 text-primary border-blue-200'
                      : 'bg-app-bg text-text-3 border-border-strong hover:border-primary/40'
                  }`}
                >
                  {db}
                </button>
              ))}
            </div>

            {/* Run button */}
            <button
              onClick={handleSubmit}
              disabled={!query.trim() || isLoading}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-h disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-medium px-3.5 py-[7px] rounded-[8px] transition-colors cursor-pointer shrink-0"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-3 h-3" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/><path d="M6 1.5A4.5 4.5 0 0110.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  Running…
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Run query
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Compact submit */}
      {compact && (
        <button
          onClick={handleSubmit}
          disabled={!query.trim() || isLoading}
          className="flex items-center gap-1 bg-primary hover:bg-primary-h disabled:opacity-40 disabled:cursor-not-allowed text-white text-[12px] font-medium px-3 py-[6px] rounded-[7px] transition-colors cursor-pointer shrink-0 self-center"
        >
          {isLoading ? (
            <svg className="animate-spin w-3 h-3" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/><path d="M6 1.5A4.5 4.5 0 0110.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          ) : 'Ask'}
        </button>
      )}
    </div>
  );
}
