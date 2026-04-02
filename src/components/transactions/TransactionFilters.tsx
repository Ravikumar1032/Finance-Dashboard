// Developed by M. Ravikumar Naik

import { Search, X, ArrowUpDown, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { Category, TransactionType } from '../../types';

const categories: Category[] = [
  'Food & Dining',
  'Transport',
  'Shopping',
  'Bills & Utilities',
  'Entertainment',
  'Salary',
  'Investment',
  'Other',
];

export function TransactionFilters() {
  const { state, setFilters, resetFilters, totalFiltered } = useApp();
  const { filters } = state;

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.type ||
    filters.dateRange;

  const totalPages = Math.ceil(totalFiltered / filters.limit);

  return (
    <div className="space-y-4" id="transaction-filters">
      {/* Filter row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex-1">
          <Input
            id="search-transactions"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        {/* Category filter */}
        <div className="relative group">
          <select
            id="filter-category"
            value={filters.category || ''}
            onChange={(e) =>
              setFilters({ category: (e.target.value as Category) || null })
            }
            className="
              appearance-none px-4 py-2.5 pr-9 rounded-xl border border-surface-200 bg-white
              text-navy-900 text-sm font-medium
              hover:border-navy-200
              focus:outline-none focus:ring-2 focus:ring-iris-500/15 focus:border-iris-400
              cursor-pointer transition-all duration-200
            "
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-navy-300 pointer-events-none" />
        </div>

        {/* Type filter - segmented control */}
        <div
          id="filter-type"
          className="flex items-center bg-surface-50 border border-surface-200/50 rounded-xl p-0.5"
        >
          {(['all', 'income', 'expense'] as const).map((type) => {
            const isActive = (type === 'all' && !filters.type) || filters.type === type;
            return (
              <button
                key={type}
                id={`filter-type-${type}`}
                onClick={() =>
                  setFilters({ type: type === 'all' ? null : (type as TransactionType) })
                }
                className={`
                  px-3.5 py-2 rounded-lg text-xs font-semibold capitalize
                  transition-all duration-200
                  ${isActive
                    ? 'bg-white text-navy-900 shadow-sm border border-surface-200/50'
                    : 'text-navy-400 hover:text-navy-600'
                  }
                `}
              >
                {type === 'income' && '↗ '}
                {type === 'expense' && '↘ '}
                {type}
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <button
          id="sort-toggle"
          onClick={() =>
            setFilters({
              sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
            })
          }
          className="
            flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200 bg-white
            text-navy-600 text-sm font-medium
            hover:bg-surface-50 hover:border-navy-200
            transition-all duration-200 whitespace-nowrap
          "
        >
          <ArrowUpDown className="w-4 h-4" />
          <span className="hidden sm:inline capitalize">
            {filters.sortBy} · {filters.sortOrder === 'asc' ? 'Asc' : 'Desc'}
          </span>
        </button>

        {/* Clear filters */}
        {hasActiveFilters && (
          <Button
            id="clear-filters"
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            icon={<X className="w-3.5 h-3.5" />}
            className="text-navy-500"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Results and pagination */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-navy-400">
          Showing{' '}
          <span className="font-semibold text-navy-700">
            {Math.min((filters.page - 1) * filters.limit + 1, totalFiltered)}–
            {Math.min(filters.page * filters.limit, totalFiltered)}
          </span>{' '}
          of <span className="font-semibold text-navy-700">{totalFiltered}</span> results
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              id="pagination-prev"
              onClick={() => setFilters({ page: filters.page - 1 })}
              disabled={filters.page === 1}
              className="p-2 rounded-lg text-navy-400 hover:text-navy-700 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setFilters({ page })}
                  className={`
                    w-8 h-8 rounded-lg text-xs font-semibold
                    transition-all duration-200
                    ${filters.page === page
                      ? 'bg-iris-500 text-white shadow-sm'
                      : 'text-navy-500 hover:bg-surface-100'
                    }
                  `}
                >
                  {page}
                </button>
              );
            })}

            <button
              id="pagination-next"
              onClick={() => setFilters({ page: filters.page + 1 })}
              disabled={filters.page === totalPages}
              className="p-2 rounded-lg text-navy-400 hover:text-navy-700 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}