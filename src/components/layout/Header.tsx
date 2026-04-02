// Dev by M. Ravikumar Naik

import { Menu, Eye, Shield, Bell, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onToggleSidebar: () => void;
}

export function Header({ currentPage, onToggleSidebar }: HeaderProps) {
  const { state, setRole } = useApp();
  const [showNotif, setShowNotif] = useState(false);

  const pageConfig: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'Dashboard', subtitle: 'Financial overview & key metrics' },
    transactions: { title: 'Transactions', subtitle: 'Manage your financial records' },
    insights: { title: 'Insights', subtitle: 'Analytics & spending patterns' },
  };

  const current = pageConfig[currentPage] || pageConfig.dashboard;

  return (
    <header
      id="app-header"
      className="sticky top-0 z-30 bg-white/70 backdrop-blur-2xl border-b border-surface-200/50"
    >
      <div className="flex items-center justify-between h-[68px] px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            id="mobile-menu-toggle"
            className="p-2 rounded-xl text-navy-400 hover:text-navy-700 hover:bg-surface-100 lg:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-navy-900 tracking-tight">
              {current.title}
            </h2>
            <p className="text-xs text-navy-400 hidden sm:block">
              {current.subtitle}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Switcher */}
          <div
            id="role-switcher"
            className="flex items-center bg-surface-50 border border-surface-200/60 rounded-xl p-1"
          >
            {([
              { role: 'viewer' as Role, label: 'Viewer', icon: Eye },
              { role: 'admin' as Role, label: 'Admin', icon: Shield },
            ]).map(({ role, label, icon: Icon }) => (
              <button
                key={role}
                id={`role-${role}`}
                onClick={() => setRole(role)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                  transition-all duration-300 ease-out
                  ${state.currentRole === role
                    ? 'bg-white text-iris-700 shadow-sm border border-surface-200/50'
                    : 'text-navy-400 hover:text-navy-600'
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              id="notifications-btn"
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2.5 rounded-xl text-navy-400 hover:text-navy-700 hover:bg-surface-100 transition-all duration-200"
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-coral-500 ring-2 ring-white" />
            </button>

            {/* Notification dropdown */}
            {showNotif && (
              <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-elevated border border-surface-200/50 p-4 animate-scale-in z-50">
                <p className="text-sm font-semibold text-navy-900 mb-3">Notifications</p>
                <div className="space-y-2.5">
                  {[
                    { text: 'Monthly report is ready', time: '2m ago', dot: 'bg-iris-500' },
                    { text: 'Budget limit reached — Shopping', time: '1h ago', dot: 'bg-coral-500' },
                    { text: 'Salary credited $8,500', time: '2d ago', dot: 'bg-mint-500' },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-surface-50 transition-colors cursor-pointer"
                    >
                      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`} />
                      <div>
                        <p className="text-sm text-navy-800 leading-snug">{n.text}</p>
                        <p className="text-[11px] text-navy-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowNotif(false)}
                  className="w-full mt-3 pt-3 border-t border-surface-200 text-xs font-semibold text-iris-600 hover:text-iris-700 transition-colors"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="relative group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-iris-500 to-iris-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:shadow-glow-iris transition-shadow duration-300">
              R
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-mint-500 border-2 border-white" />
          </div>
        </div>
      </div>
    </header>
  );
}