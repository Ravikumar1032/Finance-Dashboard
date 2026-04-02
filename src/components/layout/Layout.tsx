// Developed by M. Ravikumar Naik

import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-0" id="app-layout">
      {/* Decorative background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-iris-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-mint-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/[0.02] rounded-full blur-3xl" />
      </div>

      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      <div className="lg:pl-[272px] relative">
        <Header
          currentPage={currentPage}
          onToggleSidebar={() => setIsMobileOpen(!isMobileOpen)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">
          {children}
        </main>
      </div>
    </div>
  );
}