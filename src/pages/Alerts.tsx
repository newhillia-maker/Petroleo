import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Info, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  Loader2,
  Trash2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

type AlertType = 'Critical' | 'Warning' | 'Info';

interface SystemAlert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  batch_id: string | null;
  node_id: string | null;
  is_read: boolean;
  created_at: string;
}

export function Alerts() {
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('system_alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('system_alerts')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      setAlerts(alerts.map(a => a.id === id ? { ...a, is_read: true } : a));
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      const { error } = await supabase
        .from('system_alerts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setAlerts(alerts.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  const filteredAlerts = alerts.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.batch_id && a.batch_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (a.node_id && a.node_id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mb-2">Network Security</p>
          <h2 className="text-4xl font-black font-headline tracking-tighter text-on-surface uppercase">System Alerts</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Active Alerts</p>
            <p className="text-xs font-mono font-bold">{alerts.filter(a => !a.is_read).length} Unread</p>
          </div>
          <button 
            onClick={() => setAlerts(alerts.map(a => ({ ...a, is_read: true })))}
            className="bg-surface-container-high px-4 py-2 rounded-xl hover:bg-surface-container-highest transition-colors text-[10px] font-bold uppercase tracking-widest text-zinc-600"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-low border-none pl-12 pr-4 py-3 text-sm font-medium rounded-xl focus:ring-1 focus:ring-primary" 
            placeholder="Search by Title, Message, Batch or Node..."
          />
        </div>
        <button className="p-3 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors">
          <Filter size={20} className="text-zinc-600" />
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm">
            <Loader2 className="animate-spin text-primary" size={32} />
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Scanning Network for Anomalies...</p>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm">
            <ShieldCheck className="text-emerald-500" size={48} />
            <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">No active alerts detected</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={cn(
                "group relative bg-surface-container-lowest p-6 rounded-2xl border transition-all duration-300 flex gap-6 items-start",
                alert.is_read ? "border-outline-variant/10 opacity-70" : "border-primary/20 shadow-lg shadow-primary/5"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                alert.type === 'Critical' ? "bg-primary/10 text-primary" :
                alert.type === 'Warning' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
              )}>
                {alert.type === 'Critical' ? <ShieldAlert size={24} /> : 
                 alert.type === 'Warning' ? <ShieldAlert size={24} /> : <Info size={24} />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-black font-headline tracking-tight uppercase text-on-surface">{alert.title}</h3>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                      alert.type === 'Critical' ? "bg-primary text-white" :
                      alert.type === 'Warning' ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {alert.type}
                    </span>
                    {!alert.is_read && (
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!alert.is_read && (
                      <button 
                        onClick={() => markAsRead(alert.id)}
                        className="p-2 hover:bg-surface-container-high rounded-lg text-emerald-600 transition-colors"
                        title="Mark as Read"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteAlert(alert.id)}
                      className="p-2 hover:bg-surface-container-high rounded-lg text-zinc-400 hover:text-primary transition-colors"
                      title="Delete Alert"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-zinc-600 leading-relaxed max-w-3xl">{alert.message}</p>
                
                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  {alert.batch_id && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-low rounded-lg border border-outline-variant/5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Batch:</span>
                      <span className="text-[10px] font-mono font-bold text-primary">{alert.batch_id}</span>
                    </div>
                  )}
                  {alert.node_id && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-low rounded-lg border border-outline-variant/5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Node:</span>
                      <span className="text-[10px] font-mono font-bold text-on-surface">{alert.node_id}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-low rounded-lg border border-outline-variant/5">
                    <Clock size={12} className="text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-500">{new Date(alert.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
