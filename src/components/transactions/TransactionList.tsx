// Developed by M. Ravikumar Naik

import { Transaction } from '../../types';
import { Card } from '../common/Card';
import { TransactionItem } from './TransactionItem';
import { useApp } from '../../context/AppContext';
import { FileSearch } from 'lucide-react';

interface TransactionListProps {
  onEdit: (tx: Transaction) => void;
}

export function TransactionList({ onEdit }: TransactionListProps) {
  const { paginatedTransactions, state } = useApp();

  if (state.isLoading) {
    return (
      <Card id="transactions-loading">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="relative">
            <div className="w-10 h-10 border-[3px] border-surface-200 rounded-full" />
            <div className="absolute inset-0 w-10 h-10 border-[3px] border-iris-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-sm text-navy-400">Loading transactions...</p>
        </div>
      </Card>
    );
  }

  if (paginatedTransactions.length === 0) {
    return (
      <Card id="transactions-empty">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center mb-4">
            <FileSearch className="w-7 h-7 text-navy-300" />
          </div>
          <p className="text-base font-semibold text-navy-800 mb-1">No transactions found</p>
          <p className="text-sm text-navy-400 text-center max-w-xs">
            Try adjusting your filters or add a new transaction to get started
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      id="transactions-list"
      className="overflow-hidden"
      padding="sm"
    >
      {/* Table header */}
      <div className="flex items-center gap-4 px-4 py-2.5 border-b border-surface-200/50">
        <div className="w-11 flex-shrink-0" />
        <div className="flex-1">
          <span className="text-[11px] font-semibold text-navy-400 uppercase tracking-wider">
            Description
          </span>
        </div>
        <div className="text-right flex-shrink-0 pr-1">
          <span className="text-[11px] font-semibold text-navy-400 uppercase tracking-wider">
            Amount
          </span>
        </div>
        {state.currentRole === 'admin' && (
          <div className="w-[72px] flex-shrink-0" />
        )}
      </div>

      {/* Items */}
      <div className="divide-y divide-surface-200/30">
        {paginatedTransactions.map((tx, index) => (
          <TransactionItem
            key={tx.id}
            transaction={tx}
            onEdit={onEdit}
            index={index}
          />
        ))}
      </div>
    </Card>
  );
}