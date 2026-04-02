// Developed by M. Ravikumar Naik

import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface SummaryCardData {
  title: string;
  value: string;
  change: number;
  icon: typeof Wallet;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  glowClass: string;
  iconBg: string;
}

export function SummaryCards() {
  const { summary } = useApp();

  const cards: SummaryCardData[] = [
    {
      title: 'Total Balance',
      value: formatCurrency(summary.totalBalance),
      change: summary.balanceChange,
      icon: Wallet,
      accentColor: 'text-iris-600',
      gradientFrom: 'from-iris-500',
      gradientTo: 'to-iris-600',
      glowClass: 'shadow-glow-iris',
      iconBg: 'bg-iris-50',
    },
    {
      title: 'Total Income',
      value: formatCurrency(summary.totalIncome),
      change: summary.incomeChange,
      icon: TrendingUp,
      accentColor: 'text-mint-600',
      gradientFrom: 'from-mint-500',
      gradientTo: 'to-mint-600',
      glowClass: 'shadow-glow-mint',
      iconBg: 'bg-mint-50',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(summary.totalExpenses),
      change: summary.expenseChange,
      icon: TrendingDown,
      accentColor: 'text-coral-600',
      gradientFrom: 'from-coral-500',
      gradientTo: 'to-coral-600',
      glowClass: 'shadow-glow-coral',
      iconBg: 'bg-coral-50',
    },
    {
      title: 'Savings Rate',
      value: `${summary.savingsRate.toFixed(1)}%`,
      change: 5.2,
      icon: PiggyBank,
      accentColor: 'text-amber-600',
      gradientFrom: 'from-amber-500',
      gradientTo: 'to-amber-600',
      glowClass: '',
      iconBg: 'bg-amber-50',
    },
  ];

  return (
    <div id="summary-cards" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isPositive = card.change >= 0;

        return (
          <div
            key={card.title}
            id={`summary-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
            className={`
              group relative bg-white rounded-2xl border border-surface-200/40
              p-5 sm:p-6 overflow-hidden
              transition-all duration-300 ease-out
              hover:-translate-y-1 hover:shadow-card-hover hover:border-surface-200
              animate-slide-up
            `}
            style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'backwards' }}
          >
            {/* Decorative gradient corner */}
            <div className={`
              absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-[0.06]
              bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo}
              group-hover:opacity-[0.1] group-hover:scale-110
              transition-all duration-500
            `} />

            {/* Top row: Icon + Trend */}
            <div className="relative flex items-center justify-between mb-5">
              <div className={`
                w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center
                group-hover:scale-105 transition-transform duration-300
              `}>
                <Icon className={`w-5 h-5 ${card.accentColor}`} />
              </div>

              <span
                className={`
                  inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold
                   ${isPositive
                    ? 'bg-mint-50 text-mint-700'
                    : 'bg-coral-50 text-coral-700'
                  }
                `}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {formatPercentage(card.change)}
              </span>
            </div>

            {/* Value row */}
            <div className="relative">
              <p className="text-xs font-medium text-navy-400 uppercase tracking-wider mb-1.5">
                {card.title}
              </p>
              <p className="metric-value text-[22px] sm:text-2xl">
                {card.value}
              </p>
              <p className="text-[11px] text-navy-400 mt-1.5">vs last month</p>
            </div>

            {/* Bottom accent bar */}
            <div className={`
              absolute bottom-0 left-0 right-0 h-[2px]
              bg-gradient-to-r ${card.gradientFrom} ${card.gradientTo}
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
            `} />
          </div>
        );
      })}
    </div>
  );
}