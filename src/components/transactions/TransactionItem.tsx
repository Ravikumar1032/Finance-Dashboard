// Developed by M. Ravikumar Naik

import { Edit2, Trash2, Utensils, Car, ShoppingBag, Receipt, Film, Briefcase, TrendingUp, MoreHorizontal } from 'lucide-react';
import { Transaction, Category } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatRelativeDate } from '../../utils/formatters';
import { Badge } from '../common/Badge';
import { categoryColors } from '../../data/mockData';

const categoryIcons: Record<Category, typeof Utensils> = {
  'Food & Dining': Utensils,
  'Transport': Car,
  'Shopping': ShoppingBag,
  'Bills & Utilities': Receipt,
  'Entertainment': Film,
  'Salary': Briefcase,
  'Investment': TrendingUp,
  'Other': MoreHorizontal,
};

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (tx: Transaction) => void;
  index: number;
}

export function TransactionItem({ transaction, onEdit, index }: TransactionItemProps) {
  const { state, deleteTransaction } = useApp();
  const Icon = categoryIcons[transaction.category];
  const color = categoryColors[transaction.category];
  const isIncome = transaction.type === 'income';

  return (
    <div
      className="group flex items-center gap-3 sm:gap-4 px-4 py-3.5 hover:bg-surface-50/60 transition-all duration-200 animate-fade-in"
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'backwards' }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: `${color}10` }}
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color }} />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-navy-800 truncate group-hover:text-navy-900 transition-colors">
          {transaction.description}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant={isIncome ? 'success' : 'default'}
            size="sm"
          >
            {transaction.category}
          </Badge>
          <span className="text-[11px] text-navy-400 hidden sm:inline">
            {formatRelativeDate(transaction.date)}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <p
          className={`text-sm sm:text-base font-mono font-semibold ${isIncome ? 'text-mint-600' : 'text-navy-900'
            }`}
        >
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>
        <span className="text-[11px] text-navy-400 sm:hidden">
          {formatRelativeDate(transaction.date)}
        </span>
      </div>

      {/* Actions */}
      {state.currentRole === 'admin' && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0">
          <button
            onClick={() => onEdit(transaction)}
            id={`edit-tx-${transaction.id}`}
            className="p-2 rounded-lg text-navy-300 hover:text-iris-600 hover:bg-iris-50 transition-colors"
            title="Edit transaction"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => deleteTransaction(transaction.id)}
            id={`delete-tx-${transaction.id}`}
            className="p-2 rounded-lg text-navy-300 hover:text-coral-600 hover:bg-coral-50 transition-colors"
            title="Delete transaction"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}