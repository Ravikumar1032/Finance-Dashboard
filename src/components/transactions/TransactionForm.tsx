// Developed by M. Ravikumar Naik

import { useState } from 'react';
import { X, Calendar, DollarSign, FileText, Tag } from 'lucide-react';
import { Transaction, Category, TransactionType } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useApp } from '../../context/AppContext';

interface TransactionFormProps {
  transaction?: Transaction | null;
  onClose: () => void;
}

const categories: { value: Category; label: string; emoji: string }[] = [
  { value: 'Food & Dining', label: 'Food & Dining', emoji: '🍽' },
  { value: 'Transport', label: 'Transport', emoji: '🚗' },
  { value: 'Shopping', label: 'Shopping', emoji: '🛍' },
  { value: 'Bills & Utilities', label: 'Bills & Utilities', emoji: '📄' },
  { value: 'Entertainment', label: 'Entertainment', emoji: '🎬' },
  { value: 'Salary', label: 'Salary', emoji: '💼' },
  { value: 'Investment', label: 'Investment', emoji: '📈' },
  { value: 'Other', label: 'Other', emoji: '📌' },
];

export function TransactionForm({ transaction, onClose }: TransactionFormProps) {
  const { addTransaction, updateTransaction } = useApp();
  const isEditing = !!transaction;

  const [formData, setFormData] = useState({
    description: transaction?.description || '',
    amount: transaction?.amount?.toString() || '',
    category: transaction?.category || ('Food & Dining' as Category),
    type: transaction?.type || ('expense' as TransactionType),
    date: transaction?.date || new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Amount must be positive';
    if (!formData.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const data = {
        description: formData.description.trim(),
        amount: parseFloat(formData.amount),
        category: formData.category as Category,
        type: formData.type,
        date: formData.date,
      };

      if (isEditing) {
        await updateTransaction(transaction.id, data);
      } else {
        await addTransaction(data);
      }
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="transaction-form-modal">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-float w-full max-w-md animate-scale-in overflow-hidden">
        {/* Header with gradient */}
        <div className={`
          px-6 py-5 border-b border-surface-200/50
          ${formData.type === 'income'
            ? 'bg-gradient-to-r from-mint-50/80 to-transparent'
            : 'bg-gradient-to-r from-coral-50/60 to-transparent'
          }
        `}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-navy-900">
                {isEditing ? 'Edit Transaction' : 'New Transaction'}
              </h3>
              <p className="text-xs text-navy-400 mt-0.5">
                {isEditing ? 'Update the transaction details' : 'Add a new financial record'}
              </p>
            </div>
            <button
              onClick={onClose}
              id="close-form-modal"
              className="p-2 rounded-xl text-navy-400 hover:text-navy-600 hover:bg-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5" id="transaction-form">
          {/* Type toggle */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['expense', 'income'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  id={`type-${type}`}
                  onClick={() => setFormData({ ...formData, type })}
                  className={`
                    py-3 rounded-xl text-sm font-semibold capitalize
                    transition-all duration-300 border-2
                    ${formData.type === type
                      ? type === 'income'
                        ? 'bg-mint-500 text-white border-mint-500 shadow-sm shadow-mint-500/25'
                        : 'bg-coral-500 text-white border-coral-500 shadow-sm shadow-coral-500/25'
                      : 'bg-white text-navy-500 border-surface-200 hover:border-navy-200'
                    }
                  `}
                >
                  {type === 'income' ? '↗ ' : '↘ '}
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <Input
            id="form-description"
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="e.g., Grocery shopping"
            icon={<FileText className="w-4 h-4" />}
            error={errors.description}
          />

          {/* Amount */}
          <Input
            id="form-amount"
            label="Amount"
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="0.00"
            icon={<DollarSign className="w-4 h-4" />}
            error={errors.amount}
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                Category
              </span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.value })}
                  className={`
                    flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left
                    transition-all duration-200 border
                    ${formData.category === cat.value
                      ? 'bg-iris-50 text-iris-700 border-iris-200'
                      : 'bg-white text-navy-600 border-surface-200 hover:bg-surface-50 hover:border-navy-200'
                    }
                  `}
                >
                  <span className="text-base">{cat.emoji}</span>
                  <span className="truncate text-xs">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <Input
            id="form-date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            icon={<Calendar className="w-4 h-4" />}
            error={errors.date}
          />

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
              id="form-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              className="flex-1"
              id="form-submit"
            >
              {isEditing ? 'Save Changes' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}