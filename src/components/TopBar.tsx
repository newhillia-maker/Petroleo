import React from 'react';
import { Search, Bell, Database, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 flex justify-between items-center w-full px-8 h-16 bg-surface shadow-[0_32px_48px_-4px_rgba(27,28,28,0.06)]">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            className="w-full bg-surface-container-low border-none pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary rounded-lg transition-all" 
            placeholder="Search registry by Hash or Batch ID..."
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 border-r border-outline-variant pr-6">
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-zinc-600 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <Link to="/admin/users" className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-zinc-600">
            <Database size={20} />
          </Link>
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-zinc-600">
            <ShieldCheck size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right">
            <p className="text-sm font-bold font-headline text-on-surface">Admin_Node_04</p>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Verified Auth</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
            alt="Admin" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
