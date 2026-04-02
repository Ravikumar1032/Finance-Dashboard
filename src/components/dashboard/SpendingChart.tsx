// Developed by M. Ravikumar Naik

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { Card } from '../common/Card';
import { calculateCategoryBreakdown } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';
import { PieChart as PieIcon } from 'lucide-react';
import { useState, useCallback } from 'react';

const RADIAN = Math.PI / 180;

const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value,
  } = props;

  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#0E101D" fontSize={14} fontWeight={700} fontFamily="JetBrains Mono">
        {`$${value.toLocaleString()}`}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#696FA6" fontSize={11}>
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={innerRadius - 1}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.4}
      />
    </g>
  );
};

export function SpendingChart() {
  const { state } = useApp();
  const categoryData = calculateCategoryBreakdown(state.transactions);
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);

  const totalExpenses = categoryData.reduce((sum, d) => sum + d.amount, 0);

  return (
    <Card
      id="spending-chart"
      className="animate-slide-up animation-delay-150 h-full"
      variant="gradient"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-coral-50 flex items-center justify-center">
          <PieIcon className="w-4 h-4 text-coral-600" />
        </div>
        <div>
          <h3 className="section-title">Spending Breakdown</h3>
          <p className="section-subtitle">By category this period</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Donut Chart with active shape */}
        <div className="w-[220px] h-[220px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={64}
                outerRadius={90}
                paddingAngle={3}
                dataKey="amount"
                nameKey="category"
                onMouseEnter={onPieEnter}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category list */}
        <div className="w-full space-y-1.5">
          {categoryData.slice(0, 6).map((item, index) => (
            <div
              key={item.category}
              onMouseEnter={() => setActiveIndex(index)}
              className={`
                flex items-center justify-between p-2.5 rounded-xl
                transition-all duration-200 cursor-pointer
                ${activeIndex === index
                  ? 'bg-surface-50 border border-surface-200/50'
                  : 'hover:bg-surface-50/50 border border-transparent'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2.5 h-8 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <span className="text-sm font-medium text-navy-800">
                    {item.category}
                  </span>
                  <div className="w-full bg-surface-100 rounded-full h-1 mt-1.5" style={{ width: '80px' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-semibold text-navy-900">
                  {formatCurrency(item.amount)}
                </p>
                <p className="text-[11px] text-navy-400">
                  {item.percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}