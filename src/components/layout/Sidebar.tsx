// Dev by M. Ravikumar Naik

import {
  LayoutDashboard,
  Receipt,
  TrendingUp,
  LogOut,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & metrics' },
  { id: 'transactions', label: 'Transactions', icon: Receipt, description: 'All records' },
  { id: 'insights', label: 'Insights', icon: TrendingUp, description: 'Analytics & trends' },
];

export function Sidebar({ currentPage, onNavigate, isMobileOpen, onCloseMobile }: SidebarProps) {
  const { state } = useApp();

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-navy-950/30 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
          id="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed top-0 left-0 h-full z-50
          transition-all duration-300 ease-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-[272px]
        `}
      >
        <div className="flex flex-col h-full bg-white border-r border-surface-200/60 relative">
          {/* Subtle gradient on sidebar */}
          <div className="absolute inset-0 bg-gradient-to-b from-iris-50/30 via-transparent to-transparent pointer-events-none" />

          {/* Logo */}
          <div className="relative p-6 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="RKDash Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight text-navy-900">
                  <span className="gradient-text">RavikumaR</span>
                </h1>
                <p className="text-[11px] text-navy-400 font-medium tracking-wide uppercase">
                  Finance Tracker
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 h-px bg-gradient-to-r from-transparent via-surface-200 to-transparent" />

          {/* Navigation */}
          <nav className="flex-1 p-4 pt-5 space-y-1 relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3.5 py-3 rounded-xl
                    transition-all duration-200 ease-out group relative
                    ${isActive
                      ? 'bg-iris-50/80 text-iris-700'
                      : 'text-navy-500 hover:bg-surface-50 hover:text-navy-800'
                    }
                  `}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-iris-500 to-iris-600 rounded-full" />
                  )}

                  <div className={`
                    w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                    transition-all duration-200
                    ${isActive
                      ? 'bg-iris-500/10'
                      : 'bg-transparent group-hover:bg-surface-100'
                    }
                  `}>
                    <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-iris-600' : ''}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-sm font-semibold block">{item.label}</span>
                    <span className={`text-[11px] ${isActive ? 'text-iris-500' : 'text-navy-400'}`}>
                      {item.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="relative p-4 space-y-3">
            {/* Divider */}
            <div className="mx-1 h-px bg-gradient-to-r from-transparent via-surface-200 to-transparent" />

            {/* Role badge */}
            <div className="mx-1 px-4 py-3 rounded-xl bg-gradient-to-br from-surface-50 to-surface-100 border border-surface-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-navy-400 font-semibold uppercase tracking-wider mb-0.5">
                    Current Role
                  </p>
                  <p className="text-sm font-bold text-navy-800 capitalize">
                    {state.currentRole}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${state.currentRole === 'admin'
                  ? 'bg-iris-100 text-iris-600'
                  : 'bg-sky-100 text-sky-600'
                  }`}>
                  {state.currentRole === 'admin' ? '⚡' : '👁'}
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              id="logout-btn"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-navy-500 hover:bg-coral-50 hover:text-coral-600 transition-all duration-200 group"
            >
              <LogOut className="w-[18px] h-[18px] group-hover:rotate-[-12deg] transition-transform" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={onCloseMobile}
          id="sidebar-close-mobile"
          className="absolute top-4 right-4 p-2 rounded-xl text-navy-400 hover:text-navy-600 hover:bg-surface-100 transition-colors lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </aside>
    </>
  );
}