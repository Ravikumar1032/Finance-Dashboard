// Developed by M. Ravikumar Naik

import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { Transaction } from '../types';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionList } from '../components/transactions/TransactionList';
import { TransactionForm } from '../components/transactions/TransactionForm';

export function Transactions() {
  const { state, summary } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleEdit = (tx: Transaction) => {
    setEditingTransaction(tx);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in" id="transactions-page">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-navy-900 tracking-tight">
            All Transactions
          </h3>
          <p className="text-sm text-navy-400 mt-0.5">
            {state.transactions.length} records · Manage and track your finances
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export button */}
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            id="export-btn"
            onClick={() => {
              const csv = state.transactions
                .map(t => `${t.date},${t.description},${t.category},${t.type},${t.amount}`)
                .join('\n');
              const blob = new Blob([`Date,Description,Category,Type,Amount\n${csv}`], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'transactions.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export
          </Button>

          {/* Add transaction (admin only) */}
          {state.currentRole === 'admin' && (
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsFormOpen(true)}
              id="add-transaction-btn"
            >
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: 'Income',
            value: `$${(summary.totalIncome / 1000).toFixed(1)}K`,
            color: 'text-mint-600',
            bg: 'bg-mint-50',
            border: 'border-mint-100',
          },
          {
            label: 'Expenses',
            value: `$${(summary.totalExpenses / 1000).toFixed(1)}K`,
            color: 'text-coral-600',
            bg: 'bg-coral-50',
            border: 'border-coral-100',
          },
          {
            label: 'Net',
            value: `$${((summary.totalIncome - summary.totalExpenses) / 1000).toFixed(1)}K`,
            color: 'text-iris-600',
            bg: 'bg-iris-50',
            border: 'border-iris-100',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} border ${stat.border} rounded-xl px-4 py-3 text-center`}
          >
            <p className="text-[11px] font-semibold text-navy-400 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className={`text-lg font-mono font-bold ${stat.color} mt-0.5`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Transaction List */}
      <TransactionList onEdit={handleEdit} />

      {/* Form Modal */}
      {isFormOpen && (
        <TransactionForm
          transaction={editingTransaction}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}