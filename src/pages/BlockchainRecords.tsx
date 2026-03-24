import React from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  ArrowRight,
  Download,
  Database,
  ExternalLink,
  Lock,
  Hash
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const records = [
  { id: 'TX-48291', block: '829,102', batch: 'B-9281', type: 'Transfer', status: 'Verified', node: 'Rotterdam_Hub_04', hash: '0x8f2a...e91c', time: '2m ago' },
  { id: 'TX-48292', block: '829,101', batch: 'B-9282', type: 'Quality Check', status: 'Flagged', node: 'Singapore_Port', hash: '0x3d1b...a2f8', time: '15m ago' },
  { id: 'TX-48293', block: '829,100', batch: 'B-9283', type: 'Refining', status: 'Verified', node: 'Houston_Refinery', hash: '0x7c4e...b9d2', time: '42m ago' },
  { id: 'TX-48294', block: '829,099', batch: 'B-9284', type: 'Extraction', status: 'Verified', node: 'Dubai_Terminal', hash: '0x1a9f...c3e5', time: '1h ago' },
  { id: 'TX-48295', block: '829,098', batch: 'B-9285', type: 'Transfer', status: 'Verified', node: 'Antwerp_Hub', hash: '0x9d2b...f1a4', time: '3h ago' },
  { id: 'TX-48296', block: '829,097', batch: 'B-9286', type: 'Loading', status: 'Verified', node: 'Fujairah_Port', hash: '0x5e3c...d8b1', time: '5h ago' },
];

export function BlockchainRecords() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mb-2">Immutable Ledger</p>
          <h2 className="text-4xl font-black font-headline tracking-tighter text-on-surface uppercase">Blockchain Records</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-surface-container-high p-3 rounded-xl hover:bg-surface-container-highest transition-colors">
            <Download size={20} className="text-zinc-600" />
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Network Synchronized</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Total Blocks</p>
          <p className="text-2xl font-black font-headline tracking-tighter">829,102</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Avg. Block Time</p>
          <p className="text-2xl font-black font-headline tracking-tighter">12.4s</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Active Validators</p>
          <p className="text-2xl font-black font-headline tracking-tighter">142</p>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              className="w-full bg-surface-container-low border-none pl-12 pr-4 py-3 text-sm font-medium rounded-xl focus:ring-1 focus:ring-primary" 
              placeholder="Search by Block, Transaction ID or Hash..."
            />
          </div>
          <button className="p-3 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors">
            <Filter size={20} className="text-zinc-600" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Block</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Transaction ID</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Batch</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Type</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Validator Node</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Database size={14} className="text-primary" />
                      <span className="text-sm font-black font-headline text-on-surface">{record.block}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Link to={`/records/${record.id}`} className="text-xs font-mono font-bold text-primary hover:underline">
                      {record.id}
                    </Link>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-bold px-2 py-1 bg-zinc-100 rounded text-zinc-600 uppercase">{record.batch}</span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-zinc-600">{record.type}</td>
                  <td className="px-8 py-6 text-xs font-medium text-zinc-500">{record.node}</td>
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
                      record.status === 'Verified' ? "bg-emerald-50 text-emerald-600" : "bg-primary/5 text-primary"
                    )}>
                      {record.status === 'Verified' ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                      <span className="text-[10px] font-bold uppercase tracking-widest">{record.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs text-zinc-400 font-medium">{record.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
