// Developed by M. Ravikumar Naik

import { Transaction, Summary, Insights, Category, CategoryData } from '../types';
import { categoryColors } from '../data/mockData';

export const calculateSummary = (transactions: Transaction[]): Summary => {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  // Calculate changes (simulated for demo)
  const incomeChange = 8.2;
  const expenseChange = -3.5;
  const balanceChange = 12.4;

  return {
    totalBalance,
    totalIncome,
    totalExpenses,
    savingsRate,
    incomeChange,
    expenseChange,
    balanceChange,
  };
};

export const calculateInsights = (transactions: Transaction[]): Insights => {
  const expenses = transactions.filter((t) => t.type === 'expense');

  // Group expenses by category
  const categoryTotals: Record<Category, number> = {
    'Food & Dining': 0,
    'Transport': 0,
    'Shopping': 0,
    'Bills & Utilities': 0,
    'Entertainment': 0,
    'Salary': 0,
    'Investment': 0,
    'Other': 0,
  };

  expenses.forEach((t) => {
    categoryTotals[t.category] += t.amount;
  });

  const totalExpenses = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  // Find highest spending category
  let highestCategory: Category = 'Other';
  let highestAmount = 0;

  Object.entries(categoryTotals).forEach(([cat, amount]) => {
    if (amount > highestAmount && cat !== 'Other') {
      highestCategory = cat as Category;
      highestAmount = amount;
    }
  });

  const highestPercentage = totalExpenses > 0 ? (highestAmount / totalExpenses) * 100 : 0;

  // Monthly comparison
  const currentMonthExpenses = expenses
    .filter((t) => t.date.startsWith('2024-01'))
    .reduce((sum, t) => sum + t.amount, 0);

  const previousMonthExpenses = expenses
    .filter((t) => t.date.startsWith('2023-12'))
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyChange = previousMonthExpenses > 0
    ? ((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100
    : 0;

  // Average daily spend (last 30 days)
  const averageDailySpend = currentMonthExpenses / 30;

  // Top transactions
  const topTransactions = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return {
    highestSpendingCategory: {
      category: highestCategory,
      amount: highestAmount,
      percentage: highestPercentage,
    },
    monthlyComparison: {
      current: currentMonthExpenses,
      previous: previousMonthExpenses,
      change: monthlyChange,
    },
    averageDailySpend,
    topTransactions,
  };
};

export const calculateCategoryBreakdown = (transactions: Transaction[]): CategoryData[] => {
  const expenses = transactions.filter((t) => t.type === 'expense');

  const categoryTotals: Partial<Record<Category, number>> = {};

  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const totalExpenses = Object.values(categoryTotals).reduce((sum, val) => (sum || 0) + (val || 0), 0) || 1;

  return Object.entries(categoryTotals)
    .map(([cat, amount]) => ({
      category: cat as Category,
      amount: amount || 0,
      percentage: ((amount || 0) / totalExpenses) * 100,
      color: categoryColors[cat as Category],
    }))
    .sort((a, b) => b.amount - a.amount);
};