import React, { useState, useEffect } from 'react';
import { 
  Fuel, 
  ShieldCheck, 
  Truck, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  ExternalLink,
  MapPin,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KpiCard } from '../components/KpiCard';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const chartData = [
  { name: '06:00', flow: 420 },
  { name: '08:00', flow: 580 },
  { name: '10:00', flow: 890 },
  { name: '12:00', flow: 720 },
  { name: '14:00', flow: 650 },
  { name: '16:00', flow: 980 },
  { name: '18:00', flow: 840 },
];

const transactions = [
  { id: 'TX-48291', batch: 'B-9281', origin: 'Rotterdam Terminal', destination: 'Antwerp Hub', status: 'Verified', time: '2m ago' },
  { id: 'TX-48292', batch: 'B-9282', origin: 'Singapore Port', destination: 'Shanghai Port', status: 'Flagged', time: '15m ago' },
  { id: 'TX-48293', batch: 'B-9283', origin: 'Houston Refinery', destination: 'New Orleans', status: 'Verified', time: '42m ago' },
  { id: 'TX-48294', batch: 'B-9284', origin: 'Dubai Terminal', destination: 'Mumbai Port', status: 'Verified', time: '1h ago' },
];

export function Dashboard() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(true);

  useEffect(() => {
    fetchLatestAlerts();
  }, []);

  const fetchLatestAlerts = async () => {
    setIsLoadingAlerts(true);
    try {
      const { data, error } = await supabase
        .from('system_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2);

      if (error) throw error;
      if (data) setAlerts(data);
    } catch (error) {
      console.error('Error fetching dashboard alerts:', error);
    } finally {
      setIsLoadingAlerts(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mb-2">Operational Intelligence</p>
          <h2 className="text-4xl font-black font-headline tracking-tighter text-on-surface">NETWORK OVERVIEW</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Last Ledger Sync</p>
            <p className="text-xs font-mono font-bold">2026-03-24 09:59:32 UTC</p>
          </div>
          <button className="bg-surface-container-high p-3 rounded-xl hover:bg-surface-container-highest transition-colors">
            <MoreHorizontal size={20} className="text-zinc-600" />
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          icon={Fuel} 
          label="Active Fuel Batches" 
          value="1,284" 
          trend="+12.5%" 
          trendType="positive" 
        />
        <KpiCard 
          icon={ShieldCheck} 
          label="Verified Transactions" 
          value="48,921" 
          trend="+4.2%" 
          trendType="positive" 
        />
        <KpiCard 
          icon={Truck} 
          label="In-Transit Shipments" 
          value="342" 
          trend="-2.1%" 
          trendType="neutral" 
        />
        <KpiCard 
          icon={AlertTriangle} 
          label="System Discrepancies" 
          value="03" 
          trend="+1" 
          trendType="negative" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-black font-headline tracking-tight uppercase">Fuel Flow Trends</h3>
              <p className="text-xs text-zinc-500 font-medium">Real-time throughput across global nodes (m³/h)</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-sm"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Current Flow</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#a1a1aa' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#a1a1aa' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f6f3f2' }}
                  contentStyle={{ 
                    backgroundColor: '#1b1c1c', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                />
                <Bar dataKey="flow" fill="#98001b" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-primary p-8 rounded-2xl shadow-xl shadow-primary/20 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-lg font-black font-headline tracking-tight uppercase text-white">System Alerts</h3>
            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Live</span>
          </div>
          <div className="space-y-4 flex-1">
            {isLoadingAlerts ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Loader2 className="animate-spin text-white/40" size={24} />
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Syncing Alerts...</p>
              </div>
            ) : alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <ShieldCheck className="text-white/40" size={24} />
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">No Alerts</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <Link 
                  key={alert.id}
                  to="/alerts"
                  className="block p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 transition-colors cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                      {alert.batch_id || alert.node_id || 'System'}
                    </p>
                    <ArrowUpRight size={14} className="text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-white mb-1">{alert.title}</p>
                  <p className="text-xs text-white/60 leading-relaxed line-clamp-2">{alert.message}</p>
                </Link>
              ))
            )}
          </div>
          <Link 
            to="/alerts"
            className="mt-8 w-full py-3 bg-white text-primary font-headline font-black text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-100 transition-colors text-center"
          >
            View All Alerts
          </Link>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-black font-headline tracking-tight uppercase">Recent Ledger Transactions</h3>
            <p className="text-xs text-zinc-500 font-medium">Immutable audit log of global fuel movements</p>
          </div>
          <button className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 hover:underline">
            Export Ledger <ExternalLink size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Transaction ID</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Batch</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Origin / Destination</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Time</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-8 py-5 font-mono text-xs font-bold text-on-surface">
                    <Link to={`/records/${tx.id}`} className="text-primary hover:underline">
                      {tx.id}
                    </Link>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold px-2 py-1 bg-zinc-100 rounded text-zinc-600 uppercase">{tx.batch}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-on-surface">{tx.origin}</span>
                      <ArrowUpRight size={12} className="text-zinc-300" />
                      <span className="text-xs font-bold text-on-surface">{tx.destination}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        tx.status === 'Verified' ? "bg-emerald-500" : "bg-primary"
                      )}></div>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        tx.status === 'Verified' ? "text-emerald-600" : "text-primary"
                      )}>{tx.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs text-zinc-500 font-medium">{tx.time}</td>
                  <td className="px-8 py-5">
                    <Link to={`/records/${tx.id}`} className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors text-zinc-400 hover:text-primary inline-block">
                      <ExternalLink size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
