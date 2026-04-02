// Developed by M. Ravikumar Naik

export type Role = 'admin' | 'viewer';

export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Food & Dining'
  | 'Transport'
  | 'Shopping'
  | 'Bills & Utilities'
  | 'Entertainment'
  | 'Salary'
  | 'Investment'
  | 'Other';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  search: string;
  category: Category | null;
  type: TransactionType | null;
  dateRange: {
    start: string;
    end: string;
  } | null;
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface Summary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
  incomeChange: number;
  expenseChange: number;
  balanceChange: number;
}

export interface Insights {
  highestSpendingCategory: {
    category: Category;
    amount: number;
    percentage: number;
  };
  monthlyComparison: {
    current: number;
    previous: number;
    change: number;
  };
  averageDailySpend: number;
  topTransactions: Transaction[];
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryData {
  category: Category;
  amount: number;
  percentage: number;
  color: string;
}