'use client';

import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Natural Language → SQL',
    desc: 'Type any business question in plain English. Querion uses Llama 3.3 70B to generate precise PostgreSQL queries instantly.',
    color: 'from-blue-500/10 to-blue-600/5 border-blue-200/60',
    iconColor: 'text-blue-600 bg-blue-50',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Interactive Charts',
    desc: 'Results auto-render as bar, area, or line charts. Switch between Table, Chart, and Raw JSON views with a single click.',
    color: 'from-violet-500/10 to-violet-600/5 border-violet-200/60',
    iconColor: 'text-violet-600 bg-violet-50',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Query History',
    desc: 'Every query is saved with timestamps and row counts. Re-run any past query in one click. History persists across sessions.',
    color: 'from-teal-500/10 to-teal-600/5 border-teal-200/60',
    iconColor: 'text-teal-600 bg-teal-50',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L3 8l9 5 9-5-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 12l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'AI Insights',
    desc: 'After every query, Querion surfaces a natural-language explanation of the data — trends, anomalies, and recommendations.',
    color: 'from-orange-500/10 to-orange-600/5 border-orange-200/60',
    iconColor: 'text-orange-600 bg-orange-50',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h10M4 17h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Saved Reports',
    desc: 'Bookmark important queries as reports, name them, and access them instantly from the sidebar. Share with your team.',
    color: 'from-indigo-500/10 to-indigo-600/5 border-indigo-200/60',
    iconColor: 'text-indigo-600 bg-indigo-50',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 4v2M17 4v2M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Safe by Design',
    desc: 'Only SELECT queries are permitted. All SQL is validated before execution. Automatic row limits prevent runaway queries.',
    color: 'from-green-500/10 to-green-600/5 border-green-200/60',
    iconColor: 'text-green-600 bg-green-50',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Connect your database',
    desc: 'Point Querion at your PostgreSQL database. Your schema is automatically detected.',
  },
  {
    num: '02',
    title: 'Ask in plain English',
    desc: 'Type questions like "Show me top 10 customers by revenue this quarter" — no SQL needed.',
  },
  {
    num: '03',
    title: 'Get instant answers',
    desc: 'See the generated SQL, a clean data table, interactive charts, and an AI explanation — all in seconds.',
  },
];

const STATS = [
  { value: 'Llama 3.3', label: '70B model powering SQL generation' },
  { value: '100%', label: 'read-only — your data is safe' },
  { value: '<2s', label: 'average query response time' },
  { value: '∞', label: 'questions you can ask' },
];

// ─── Landing Page ─────────────────────────────────────────────────────────────
export default function LandingPage() {
  const { isSignedIn } = useAuth();
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white font-sans overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.07] bg-[#0A0F1C]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#2563EB] rounded-[8px] flex items-center justify-center shadow-lg shadow-blue-900/40">
              <svg className="w-4.5 h-4.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="5" stroke="#fff" strokeWidth="1.5" />
                <path d="M5 8h6M8 5v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight">Querion</span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          {/* Auth CTA */}
          <div className="flex items-center gap-3">
            {!isSignedIn ? (
              <>
                <Link
                  href="/sign-in"
                  className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="text-[13px] font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-[8px] transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-800/40"
                >
                  Get started free
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-[13px] font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-[8px] transition-all"
                >
                  Go to Dashboard →
                </Link>
                <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-40 left-1/4 w-[400px] h-[300px] bg-indigo-600/8 rounded-full blur-[80px]" />
          <div className="absolute top-20 right-1/4 w-[350px] h-[250px] bg-violet-600/8 rounded-full blur-[80px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-[12px] font-medium text-blue-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Powered by Llama 3.3 70B · Free to get started
          </div>

          {/* Headline */}
          <h1 className="text-[52px] md:text-[72px] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
            Ask your data{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#A78BFA] bg-clip-text text-transparent">
                anything
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full opacity-40" />
            </span>
            {' '}in plain English
          </h1>

          {/* Subheadline */}
          <p className="text-[18px] md:text-[20px] text-slate-400 max-w-[640px] mx-auto leading-relaxed mb-10">
            Querion converts natural language to SQL, executes it on your database, and renders{' '}
            <span className="text-slate-300 font-medium">interactive charts and AI insights</span> — in seconds, no SQL skills required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {!isSignedIn ? (
              <>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-8 py-3.5 rounded-[10px] text-[15px] transition-all shadow-2xl shadow-blue-900/40 hover:shadow-blue-800/50 hover:-translate-y-0.5"
                >
                  Start for free
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-white font-medium px-8 py-3.5 rounded-[10px] text-[15px] transition-all"
                >
                  Sign in to dashboard
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-8 py-3.5 rounded-[10px] text-[15px] transition-all shadow-2xl shadow-blue-900/40"
              >
                Go to your dashboard
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}
          </div>

          {/* Mock UI preview card */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-violet-600/10 rounded-2xl blur-3xl scale-105 opacity-50" />
            <div className="relative bg-[#111827] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-[#0D1524]">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <div className="flex-1 mx-4 bg-white/[0.06] rounded-[6px] h-7 text-[11px] text-slate-500 flex items-center px-3">
                  app.querion.ai/dashboard
                </div>
              </div>
              {/* Mock dashboard content */}
              <div className="flex h-[340px]">
                {/* Sidebar strip */}
                <div className="w-40 border-r border-white/[0.06] bg-[#0D1524] p-3 flex flex-col gap-1.5">
                  <div className="h-7 bg-blue-500/20 rounded-[6px] flex items-center gap-2 px-2">
                    <div className="w-2.5 h-2.5 rounded-sm bg-blue-400/60" />
                    <div className="h-2 w-16 bg-blue-400/30 rounded" />
                  </div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-7 rounded-[6px] flex items-center gap-2 px-2">
                      <div className="w-2.5 h-2.5 rounded-sm bg-white/10" />
                      <div className="h-2 w-12 bg-white/10 rounded" />
                    </div>
                  ))}
                </div>
                {/* Main area */}
                <div className="flex-1 p-4 flex flex-col gap-3">
                  {/* Ask bar */}
                  <div className="bg-[#1a2744] border border-blue-500/30 rounded-[10px] px-4 py-3 flex items-center gap-3">
                    <div className="w-5 h-5 rounded-[5px] bg-blue-500/30 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full border border-blue-400/50" />
                    </div>
                    <div className="flex-1 h-2.5 bg-white/5 rounded" />
                    <div className="w-16 h-6 bg-blue-500/40 rounded-[6px]" />
                  </div>
                  {/* Metric cards */}
                  <div className="grid grid-cols-4 gap-2">
                    {['$2.4M', '8,341', '$287', '3.2%'].map((v, i) => (
                      <div key={i} className="bg-[#111827] border border-white/[0.07] rounded-[8px] p-2.5">
                        <div className="h-1.5 w-10 bg-white/10 rounded mb-1.5" />
                        <div className="text-[13px] font-bold text-white/80">{v}</div>
                        <div className="h-1.5 w-8 bg-green-500/30 rounded mt-1" />
                      </div>
                    ))}
                  </div>
                  {/* Chart area */}
                  <div className="flex-1 bg-[#111827] border border-white/[0.07] rounded-[8px] p-3 flex items-end gap-1.5 overflow-hidden">
                    {[40, 55, 47, 62, 75, 70, 85, 80, 90, 95, 100, 110].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${h * 0.9}%`,
                          background: `linear-gradient(to top, #2563EB${i % 2 === 0 ? 'ff' : '99'}, #818CF8${i % 2 === 0 ? '40' : '20'})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-[28px] font-extrabold text-white mb-1">{s.value}</div>
              <div className="text-[12px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-[11px] font-semibold text-blue-400 uppercase tracking-[0.08em] mb-4">
              Features
            </div>
            <h2 className="text-[38px] md:text-[48px] font-extrabold text-white leading-tight mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                query smarter
              </span>
            </h2>
            <p className="text-[16px] text-slate-400 max-w-[520px] mx-auto leading-relaxed">
              No SQL knowledge required. Querion handles the technical complexity so you can focus on insights.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`bg-gradient-to-br ${f.color} border rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-200`}
              >
                <div className={`w-11 h-11 ${f.iconColor} rounded-[12px] flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
                <h3 className="text-[15px] font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[13px] text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 px-6 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 text-[11px] font-semibold text-violet-400 uppercase tracking-[0.08em] mb-4">
              How it works
            </div>
            <h2 className="text-[38px] md:text-[48px] font-extrabold text-white leading-tight">
              From question to insight{' '}
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                in three steps
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[calc(16.66%-16px)] right-[calc(16.66%-16px)] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {STEPS.map((step, i) => (
              <div key={step.num} className="relative text-center px-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-violet-600/10 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10">
                  <span className="text-[22px] font-black bg-gradient-to-br from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold text-white mb-2">{step.title}</h3>
                <p className="text-[13px] text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="pricing" className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-[42px] md:text-[52px] font-extrabold text-white leading-tight mb-4">
            Start querying your data today
          </h2>
          <p className="text-[16px] text-slate-400 mb-10 leading-relaxed">
            Free to get started. No credit card required. Connect your database and run your first query in under 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isSignedIn ? (
              <>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-8 py-4 rounded-[10px] text-[16px] transition-all shadow-2xl shadow-blue-900/40 hover:-translate-y-0.5"
                >
                  Create free account
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-white font-medium px-8 py-4 rounded-[10px] text-[16px] transition-all"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-8 py-4 rounded-[10px] text-[16px] transition-all shadow-2xl shadow-blue-900/40"
              >
                Open dashboard →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#2563EB] rounded-[7px] flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="5" stroke="#fff" strokeWidth="1.5" />
                <path d="M5 8h6M8 5v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[14px] font-bold text-white">Querion</span>
          </div>
          <p className="text-[12px] text-slate-600">
            © {new Date().getFullYear()} Querion. Built with Next.js, FastAPI & Groq.
          </p>
          <div className="flex items-center gap-5 text-[12px] text-slate-500">
            <a href="https://github.com/Anubhx/Querion" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
