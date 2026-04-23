'use client';

import { useState } from 'react';

interface SQLBlockProps {
  sql: string;
}

// Tokenizer — turns raw SQL string into colored spans
function tokenize(sql: string): React.ReactNode[] {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP BY', 'ORDER BY', 'LIMIT', 'AS', 'AND', 'OR', 'IN', 'BETWEEN', 'NOT', 'NULL', 'DISTINCT', 'HAVING', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'WITH', 'BY'];
  const functions = ['COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'DATE_TRUNC', 'COALESCE', 'FIRST_VALUE', 'OVER', 'PARTITION'];

  // Simple token pass — highlight keywords inline
  const parts: React.ReactNode[] = [];
  let remaining = sql;
  let key = 0;

  // Regex alternation: strings, keywords, functions, rest
  const tokenRegex = /('(?:[^']|'')*')|(--.+)|(\b(?:SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP\s+BY|ORDER\s+BY|LIMIT|HAVING|AS|AND|OR|IN|BETWEEN|NOT|NULL|DISTINCT|WITH)\b)|(\b(?:COUNT|SUM|AVG|MAX|MIN|DATE_TRUNC|COALESCE|FIRST_VALUE|OVER|PARTITION\s+BY)\b)|([a-zA-Z_][a-zA-Z0-9_]*)|(\d+)/gi;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(sql)) !== null) {
    // Plain text before match
    if (match.index > lastIndex) {
      parts.push(<span key={key++} className="text-[#E2E8F0]">{sql.slice(lastIndex, match.index)}</span>);
    }

    const [full, str, comment, kw, fn, ident] = match;

    if (str) {
      parts.push(<span key={key++} className="text-[#FCD34D]">{str}</span>); // amber — string
    } else if (comment) {
      parts.push(<span key={key++} className="text-[#64748B]">{comment}</span>); // gray — comment
    } else if (kw) {
      parts.push(<span key={key++} className="text-[#7DD3FC]">{kw}</span>); // blue — keyword
    } else if (fn) {
      parts.push(<span key={key++} className="text-[#A78BFA]">{fn}</span>); // violet — function
    } else {
      parts.push(<span key={key++} className="text-[#6EE7B7]">{full}</span>); // teal — identifiers/numbers
    }

    lastIndex = match.index + full.length;
  }

  // Trailing text
  if (lastIndex < sql.length) {
    parts.push(<span key={key++} className="text-[#E2E8F0]">{sql.slice(lastIndex)}</span>);
  }

  return parts;
}

export function SQLBlock({ sql }: SQLBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-[12px] bg-[#0F172A] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1E293B]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28CA41]" />
          </div>
          <span className="text-[10px] font-semibold text-[#475569] uppercase tracking-[0.08em] ml-1.5">Generated SQL</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-[11px] font-medium text-[#475569] hover:text-[#94A3B8] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-success">Copied!</span>
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><rect x="4" y="1" width="7" height="8" rx="1.5" stroke="#475569" strokeWidth="1.2"/><rect x="1" y="3" width="7" height="8" rx="1.5" stroke="#475569" strokeWidth="1.2"/></svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* SQL content */}
      <div className="p-4 overflow-x-auto">
        <pre
          className="text-[12.5px] leading-[1.75] m-0 font-mono whitespace-pre-wrap break-words"
          style={{ fontFamily: 'var(--font-ibm-plex-mono, "IBM Plex Mono", monospace)' }}
        >
          {tokenize(sql)}
        </pre>
      </div>
    </div>
  );
}
