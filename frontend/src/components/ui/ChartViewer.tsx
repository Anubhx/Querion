'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from 'recharts';

interface ChartViewerProps {
  type: 'bar' | 'line' | 'area' | 'pie';
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  loading?: boolean;
  title?: string;
  subtitle?: string;
}

const COLORS = ['#0D9488', '#8B5CF6', '#2563EB', '#D97706', '#059669', '#DC2626'];

const CustomTooltip = ({ active, payload, label }: {active?: boolean; payload?: {value: number; name: string}[]; label?: string}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-text-main text-white rounded-[8px] px-3 py-2 text-[12px] shadow-[0_4px_12px_rgba(0,0,0,.2)]">
        <div className="font-medium text-[11px] text-white/70 mb-0.5">{label}</div>
        <div className="font-semibold">{payload[0].value?.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};

function SkeletonBars() {
  return (
    <div className="flex items-end gap-2 h-36 px-2">
      {[70, 90, 55, 80, 45, 65, 75].map((h, i) => (
        <div key={i} className="flex-1 rounded-t-[3px] skeleton" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

export function ChartViewer({ type, data, xKey, yKey, loading, title, subtitle }: ChartViewerProps) {
  if (loading) {
    return (
      <div>
        {title && (
          <div className="mb-4">
            <div className="text-[13px] font-semibold text-text-main">{title}</div>
            {subtitle && <div className="text-[12px] text-muted mt-0.5">{subtitle}</div>}
          </div>
        )}
        <SkeletonBars />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-36 flex items-center justify-center text-[13px] text-text-3">
        This result can&apos;t be visualized automatically.
      </div>
    );
  }

  return (
    <div>
      {title && (
        <div className="mb-4">
          <div className="text-[13px] font-semibold text-text-main">{title}</div>
          {subtitle && <div className="text-[12px] text-muted mt-0.5">{subtitle}</div>}
        </div>
      )}

      {type === 'bar' && (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
            <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
            <XAxis dataKey={xKey} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(226,232,240,0.5)' }} />
            <Bar dataKey={yKey} fill="#0D9488" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      )}

      {type === 'line' && (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="0" />
            <XAxis dataKey={xKey} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey={yKey} stroke="#0D9488" strokeWidth={2.5} dot={{ r: 4, fill: '#0D9488', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      )}

      {type === 'area' && (
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0D9488" stopOpacity={0.12}/>
                <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="0" />
            <XAxis dataKey={xKey} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey={yKey} stroke="#0D9488" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ r: 4, fill: '#0D9488', stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {type === 'pie' && (
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={data} dataKey={yKey} nameKey={xKey} cx="50%" cy="50%" outerRadius={70} paddingAngle={2}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', color: '#64748B' }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
