import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  History, 
  Network, 
  Truck, 
  Fuel, 
  ShieldAlert, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  Activity,
  ShieldCheck,
  Zap,
  LogOut,
  Users
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Network, label: 'Traceability', path: '/traceability' },
  { icon: Fuel, label: 'Fuel Batches', path: '/batches' },
  { icon: History, label: 'Blockchain Records', path: '/records' },
  { icon: Users, label: 'Administration', path: '/admin/users' },
  { icon: Truck, label: 'Shipments', path: '/shipments' },
  { icon: ShieldAlert, label: 'Alerts', path: '/alerts' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

interface SidebarProps {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 flex flex-col h-full py-6 w-72 bg-surface-container-low border-none z-50">
      <div className="px-8 mb-12">
        <h1 className="text-lg font-black text-primary uppercase tracking-tighter font-headline">Industrial Integrity</h1>
        <Link to="/admin/users" className="mt-4 flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/15 hover:border-primary/30 transition-colors group">
          <div className="w-10 h-10 bg-primary-container flex items-center justify-center rounded-lg text-white group-hover:bg-primary transition-colors">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="font-headline font-bold text-xs tracking-tight text-on-surface">FuelTrace Node</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Verified Ledger v4.2</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-lg group",
                isActive 
                  ? "bg-surface-container-lowest text-primary font-bold border-l-4 border-primary shadow-sm" 
                  : "text-zinc-600 hover:bg-surface-container-high hover:translate-x-1"
              )}
            >
              <item.icon size={20} className={cn(isActive ? "text-primary" : "text-zinc-500 group-hover:text-primary")} />
              <span className="font-sans text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-6 py-6 space-y-6">
        <button className="w-full bg-primary text-white py-3 rounded-xl font-headline font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Zap size={14} fill="currentColor" />
          Verify Block Hash
        </button>
        <div className="flex flex-col gap-2">
          <Link to="/help" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-primary transition-colors">
            <HelpCircle size={16} />
            Help Center
          </Link>
          <Link to="/status" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-primary transition-colors">
            <Activity size={16} />
            System Status
          </Link>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-xs text-primary font-bold hover:opacity-80 transition-opacity mt-2"
          >
            <LogOut size={16} />
            Terminate Session
          </button>
        </div>
      </div>
    </aside>
  );
}
