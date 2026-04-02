// Developed by M. Ravikumar Naik

import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Zap,
  Target,
  Award,
} from 'lucide-react';
import { Card } from '../common/Card';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { categoryColors } from '../../data/mockData';

export function Insights() {
  const { insights } = useApp();

  const isSpendingUp = insights.monthlyComparison.change >= 0;

  const insightCards = [
    {
      title: 'Highest Spending',
      main: insights.highestSpendingCategory.category,
      value: formatCurrency(insights.highestSpendingCategory.amount),
      badge: `${insights.highestSpendingCategory.percentage.toFixed(1)}% of total`,
      color: categoryColors[insights.highestSpendingCategory.category],
      icon: Target,
      gradient: 'from-coral-500/10 to-amber-500/5',
      borderAccent: 'group-hover:border-coral-200',
    },
    {
      title: 'Monthly Change',
      main: formatPercentage(insights.monthlyComparison.change),
      value: formatCurrency(insights.monthlyComparison.current),
      badge: `vs ${formatCurrency(insights.monthlyComparison.previous)} last month`,
      icon: isSpendingUp ? ArrowUpRight : ArrowDownRight,
      color: isSpendingUp ? '#FA5252' : '#10B981',
      gradient: isSpendingUp ? 'from-coral-500/10 to-coral-500/0' : 'from-mint-500/10 to-mint-500/0',
      borderAccent: isSpendingUp ? 'group-hover:border-coral-200' : 'group-hover:border-mint-200',
    },
    {
      title: 'Daily Average',
      main: formatCurrency(insights.averageDailySpend),
      value: 'Per day spend',
      badge: 'Based on current month',
      icon: DollarSign,
      color: '#6C4FEF',
      gradient: 'from-iris-500/10 to-iris-500/0',
      borderAccent: 'group-hover:border-iris-200',
    },
  ];

  return (
    <div className="space-y-5" id="insights-section">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
          <Zap className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <h3 className="section-title">Quick Insights</h3>
          <p className="section-subtitle">Key financial indicators</p>
        </div>
      </div>

      {/* Insight cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insightCards.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.title}
              id={`insight-${insight.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={`
                group relative bg-white rounded-2xl border border-surface-200/40
                p-5 overflow-hidden
                transition-all duration-300 ease-out
                hover:-translate-y-0.5 hover:shadow-card-hover
                ${insight.borderAccent}
                animate-slide-up
              `}
              style={{ animationDelay: `${index * 100 + 300}ms`, animationFillMode: 'backwards' }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-60`} />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider">
                    {insight.title}
                  </p>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${insight.color}12` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: insight.color }} />
                  </div>
                </div>

                <p className="text-xl font-mono font-bold text-navy-900 mb-1">
                  {insight.main}
                </p>
                <p className="text-sm text-navy-600 mb-1">{insight.value}</p>
                <p className="text-[11px] text-navy-400">{insight.badge}</p>

                {/* Decorative accent */}
                <div
                  className="mt-4 h-[3px] rounded-full transition-all duration-500 group-hover:w-[60%]"
                  style={{
                    backgroundColor: insight.color,
                    width: '30%',
                    opacity: 0.25,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Transactions */}
      <Card
        id="largest-transactions"
        className="animate-slide-up animation-delay-525"
        variant="gradient"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-iris-50 flex items-center justify-center">
            <Award className="w-4 h-4 text-iris-600" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-navy-900">Largest Transactions</h4>
            <p className="text-xs text-navy-400">Top expense records</p>
          </div>
        </div>

        <div className="space-y-1">
          {insights.topTransactions.slice(0, 5).map((tx, i) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 transition-all duration-200 group/item"
            >
              <div className="flex items-center gap-3">
                {/* Rank */}
                <div className="w-7 h-7 rounded-lg bg-surface-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-navy-500">
                    #{i + 1}
                  </span>
                </div>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${categoryColors[tx.category]}12` }}
                >
                  <DollarSign className="w-4 h-4" style={{ color: categoryColors[tx.category] }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-navy-800 group-hover/item:text-navy-900 transition-colors">
                    {tx.description}
                  </p>
                  <p className="text-[11px] text-navy-400">{tx.category}</p>
                </div>
              </div>
              <p className="text-sm font-mono font-semibold text-coral-600">
                -{formatCurrency(tx.amount)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}