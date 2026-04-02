// Dev by M. Ravikumar Naik

import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { Transaction, Role, FilterState, Summary, Insights } from '../types';
import { api } from '../services/api';
import { calculateSummary, calculateInsights } from '../utils/calculations';

// State types
interface AppState {
  currentRole: Role;
  transactions: Transaction[];
  isLoading: boolean;
  filters: FilterState;
}

type Action =
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'RESET_FILTERS' };

const defaultFilters: FilterState = {
  search: '',
  category: null,
  type: null,
  dateRange: null,
  sortBy: 'date',
  sortOrder: 'desc',
  page: 1,
  limit: 10,
};

const initialState: AppState = {
  currentRole: (localStorage.getItem('role') as Role) || 'viewer',
  transactions: [],
  isLoading: true,
  filters: defaultFilters,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ROLE':
      localStorage.setItem('role', action.payload);
      return { ...state, currentRole: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload, isLoading: false };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload, page: action.payload.page ?? 1 },
      };
    case 'RESET_FILTERS':
      return { ...state, filters: defaultFilters };
    default:
      return state;
  }
}

// Context type
interface AppContextValue {
  state: AppState;
  setRole: (role: Role) => void;
  addTransaction: (data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  filteredTransactions: Transaction[];
  paginatedTransactions: Transaction[];
  totalFiltered: number;
  summary: Summary;
  insights: Insights;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load transactions on mount
  useEffect(() => {
    api.getTransactions().then((data) => {
      dispatch({ type: 'SET_TRANSACTIONS', payload: data });
    });
  }, []);

  // Actions
  const setRole = useCallback((role: Role) => {
    dispatch({ type: 'SET_ROLE', payload: role });
  }, []);

  const addTransaction = useCallback(
    async (data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
      const tx = await api.createTransaction(data);
      dispatch({ type: 'ADD_TRANSACTION', payload: tx });
    },
    []
  );

  const updateTransaction = useCallback(async (id: string, data: Partial<Transaction>) => {
    const tx = await api.updateTransaction(id, data);
    dispatch({ type: 'UPDATE_TRANSACTION', payload: tx });
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    await api.deleteTransaction(id);
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  }, []);

  const setFilters = useCallback((filters: Partial<FilterState>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' });
  }, []);

  // Computed values
  const filteredTransactions = useMemo(() => {
    let result = [...state.transactions];

    // Search filter
    if (state.filters.search) {
      const search = state.filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(search) ||
          t.category.toLowerCase().includes(search)
      );
    }

    // Category filter
    if (state.filters.category) {
      result = result.filter((t) => t.category === state.filters.category);
    }

    // Type filter
    if (state.filters.type) {
      result = result.filter((t) => t.type === state.filters.type);
    }

    // Date range filter
    if (state.filters.dateRange) {
      result = result.filter((t) => {
        const date = new Date(t.date);
        return (
          date >= new Date(state.filters.dateRange!.start) &&
          date <= new Date(state.filters.dateRange!.end)
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      const order = state.filters.sortOrder === 'asc' ? 1 : -1;
      if (state.filters.sortBy === 'date') {
        return (new Date(b.date).getTime() - new Date(a.date).getTime()) * order;
      }
      return (b.amount - a.amount) * order;
    });

    return result;
  }, [state.transactions, state.filters]);

  const totalFiltered = filteredTransactions.length;

  const paginatedTransactions = useMemo(() => {
    const start = (state.filters.page - 1) * state.filters.limit;
    return filteredTransactions.slice(start, start + state.filters.limit);
  }, [filteredTransactions, state.filters.page, state.filters.limit]);

  const summary = useMemo(() => calculateSummary(state.transactions), [state.transactions]);
  const insights = useMemo(() => calculateInsights(state.transactions), [state.transactions]);

  const value = useMemo(
    () => ({
      state,
      setRole,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      setFilters,
      resetFilters,
      filteredTransactions,
      paginatedTransactions,
      totalFiltered,
      summary,
      insights,
    }),
    [state, setRole, addTransaction, updateTransaction, deleteTransaction, setFilters, resetFilters, filteredTransactions, paginatedTransactions, totalFiltered, summary, insights]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}