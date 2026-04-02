// Developed by M. Ravikumar Naik

import { SummaryCards } from '../components/dashboard/SummaryCards';
import { BalanceChart } from '../components/dashboard/BalanceChart';
import { SpendingChart } from '../components/dashboard/SpendingChart';
import { Insights } from '../components/dashboard/Insights';
import { useApp } from '../context/AppContext';

export function Dashboard() {
  const { state } = useApp();

  return (
    <div className="space-y-6 sm:space-y-8" id="dashboard-page">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-iris-600 via-iris-500 to-iris-700 px-6 py-6 sm:py-8 animate-fade-in">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-iris-400/20 rounded-full blur-2xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, Ravikumar 👋
            </h1>
            <p className="text-iris-100 text-sm">
              Here's what's happening with your finances today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
              <span className="text-iris-200 text-xs block">Role</span>
              <span className="capitalize font-semibold">{state.currentRole}</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
              <span className="text-iris-200 text-xs block">Records</span>
              <span className="font-semibold font-mono">{state.transactions.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Section — asymmetric grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
        <div className="lg:col-span-3">
          <BalanceChart />
        </div>
        <div className="lg:col-span-2">
          <SpendingChart />
        </div>
      </div>

      {/* Insights Section */}
      <Insights />
    </div>
  );
}