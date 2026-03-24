import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface LayoutProps {
  onLogout: () => void;
}

export function Layout({ onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={onLogout} />
      <div className="ml-72 min-h-screen flex flex-col">
        <TopBar />
        <main className="p-10 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
