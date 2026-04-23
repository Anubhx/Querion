'use client';

import { useNav, View } from '@/lib/NavContext';

interface NavItem {
  id: View | null;
  label: string;
  badge?: string;
  icon: React.ReactNode;
}

const WORKSPACE_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: 'history',
    label: 'Query History',
    badge: '12',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'reports',
    label: 'Saved Reports',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
        <path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'scheduled',
    label: 'Scheduled Queries',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="2.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 2.5V5M11 2.5V5M1.5 7h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const DATA_ITEMS: NavItem[] = [
  {
    id: null,
    label: 'Connections',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
        <ellipse cx="8" cy="5" rx="5.5" ry="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2.5 5v6c0 1.38 2.46 2.5 5.5 2.5s5.5-1.12 5.5-2.5V5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2.5 8c0 1.38 2.46 2.5 5.5 2.5S13.5 9.38 13.5 8" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: null,
    label: 'Schema Browser',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
        <path d="M14 3L6 11l-4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const { activeView, setActiveView } = useNav();

  return (
    <nav className="w-[220px] h-full bg-surface border-r border-border-subtle flex flex-col shrink-0 relative z-10">
      {/* Logo */}
      <div className="p-5 pb-4 border-b border-border-subtle flex items-center gap-2">
        <div className="w-7 h-7 bg-primary rounded-[7px] flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="5" stroke="#fff" strokeWidth="1.5" />
            <path d="M5 8h6M8 5v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="text-[13px] font-bold text-text-main leading-[1.2]">Querion</div>
          <div className="text-[10px] text-muted">Data Analyst</div>
        </div>
      </div>

      {/* Nav */}
      <div className="p-3 flex-1 flex flex-col gap-1 overflow-y-auto">
        <div className="text-[10px] font-semibold tracking-[0.08em] uppercase text-muted py-2 px-2.5">
          Workspace
        </div>

        {WORKSPACE_ITEMS.map((item) => {
          const isActive = item.id !== null && activeView === item.id;
          return (
            <button
              key={item.label}
              onClick={() => item.id && setActiveView(item.id)}
              className={`w-full flex items-center gap-2 py-[7px] px-2.5 rounded-[8px] text-[13px] font-medium cursor-pointer text-left transition-all border-none bg-transparent
                ${isActive
                  ? 'bg-blue-50 text-primary'
                  : 'text-slate hover:bg-gray-50 hover:text-text-main'
                }`}
            >
              <span className={isActive ? 'opacity-100' : 'opacity-70'}>{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className={`ml-auto text-[10px] font-semibold py-[1px] px-1.5 rounded-[10px] ${isActive ? 'bg-white text-primary' : 'bg-blue-50 text-primary'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="mt-2 text-[10px] font-semibold tracking-[0.08em] uppercase text-muted py-2 px-2.5">
          Data
        </div>

        {DATA_ITEMS.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-2 py-[7px] px-2.5 rounded-[8px] text-[13px] font-medium text-slate cursor-pointer hover:bg-gray-50 hover:text-text-main text-left transition-all border-none bg-transparent"
          >
            <span className="opacity-70">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Footer / User */}
      <div className="p-3 border-t border-border-subtle">
        <div className="flex items-center gap-2 p-1.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-violet flex items-center justify-center text-[11px] font-bold text-white shrink-0">
            SR
          </div>
          <div>
            <div className="text-[12px] font-medium text-text-main">Sneha Roy</div>
            <div className="text-[10px] text-muted">Analytics Lead</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
