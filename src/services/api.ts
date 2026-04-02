// Developed by M. Ravikumar Naik

import { Transaction } from '../types';
import { mockTransactions } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory store
let transactions = [...mockTransactions];

export const api = {
  async getTransactions(): Promise<Transaction[]> {
    await delay(300);
    return [...transactions];
  },

  async createTransaction(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    await delay(400);
    const newTransaction: Transaction = {
      ...data,
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    transactions = [newTransaction, ...transactions];
    return newTransaction;
  },

  async updateTransaction(id: string, data: Partial<Transaction>): Promise<Transaction> {
    await delay(400);
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Transaction not found');

    const updated: Transaction = {
      ...transactions[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    transactions[index] = updated;
    return updated;
  },

  async deleteTransaction(id: string): Promise<void> {
    await delay(300);
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Transaction not found');
    transactions = transactions.filter((t) => t.id !== id);
  },
};