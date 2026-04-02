// Developed by M. Ravikumar Naik

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../common/Card';
import { monthlyData } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';
import { Activity } from 'lucide-react';

type ChartView = 'all' | 'balance' | 'income' | 'expenses';

export function BalanceChart() {
  const [activeView, setActiveView] = useState<ChartView>('all');

  const views: { id: ChartView; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'balance', label: 'Balance' },
    { id: 'income', label: 'Income' },
    { id: 'expenses', label: 'Expenses' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-xl shadow-elevated border border-surface-200/50 p-3.5 min-w-[160px]">
          <p className="text-xs font-semibold text-navy-900 mb-2 pb-2 border-b border-surface-100">
            {label}
          </p>
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex items-center justify-between gap-4 py-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-navy-500 capitalize">{entry.name}</span>
              </div>
              <span className="text-xs font-mono font-semibold text-navy-900">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const showArea = (key: string) => {
    if (activeView === 'all') return true;
    return activeView === key;
  };

  return (
    <Card
      id="balance-chart"
      className="animate-slide-up h-full"
      variant="gradient"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-iris-50 flex items-center justify-center">
            <Activity className="w-4 h-4 text-iris-600" />
          </div>
          <div>
            <h3 className="section-title">Balance Trend</h3>
            <p className="section-subtitle">Last 4 months performance</p>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center bg-surface-50 border border-surface-200/50 rounded-lg p-0.5">
          {views.map((v) => (
            <button
              key={v.id}
              id={`chart-view-${v.id}`}
              onClick={() => setActiveView(v.id)}
              className={`
                px-3 py-1.5 rounded-md text-[11px] font-semibold
                transition-all duration-200
                ${activeView === v.id
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-navy-400 hover:text-navy-600'
                }
              `}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6C4FEF" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#6C4FEF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FA5252" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#FA5252" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#EBEEF8"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: '#696FA6', fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: '#EBEEF8' }}
            />
            <YAxis
              tick={{ fill: '#696FA6', fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            {showArea('balance') && (
              <Area
                type="monotone"
                dataKey="balance"
                name="Balance"
                stroke="#6C4FEF"
                strokeWidth={2.5}
                fill="url(#gradBalance)"
                dot={{ fill: '#6C4FEF', r: 3, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 5, stroke: '#6C4FEF', strokeWidth: 2, fill: '#fff' }}
              />
            )}
            {showArea('income') && (
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#gradIncome)"
                dot={{ fill: '#10B981', r: 3, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 5, stroke: '#10B981', strokeWidth: 2, fill: '#fff' }}
              />
            )}
            {showArea('expenses') && (
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#FA5252"
                strokeWidth={2}
                fill="url(#gradExpenses)"
                dot={{ fill: '#FA5252', r: 3, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 5, stroke: '#FA5252', strokeWidth: 2, fill: '#fff' }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-4 pt-4 border-t border-surface-200/50">
        {[
          { name: 'Balance', color: '#6C4FEF' },
          { name: 'Income', color: '#10B981' },
          { name: 'Expenses', color: '#FA5252' },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveView(item.name.toLowerCase() as ChartView)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div
              className="w-2.5 h-2.5 rounded-full ring-2 ring-offset-1 ring-transparent group-hover:ring-current transition-all"
              style={{ backgroundColor: item.color, color: item.color }}
            />
            <span className="text-xs font-medium text-navy-500 group-hover:text-navy-700 transition-colors">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}