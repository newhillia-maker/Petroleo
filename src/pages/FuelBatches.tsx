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
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const batches = [
  { id: 'B-9281', name: 'High Octane Unleaded', volume: '450,000 m³', status: 'Verified', stage: 'Loading Port', hash: '0x8f2a...e91c', lastUpdate: '2m ago' },
  { id: 'B-9282', name: 'Ultra Low Sulfur Diesel', volume: '280,000 m³', status: 'Flagged', stage: 'Storage Terminal', hash: '0x3d1b...a2f8', lastUpdate: '15m ago' },
  { id: 'B-9283', name: 'Aviation Turbine Fuel', volume: '120,000 m³', status: 'Verified', stage: 'Refining Facility', hash: '0x7c4e...b9d2', lastUpdate: '42m ago' },
  { id: 'B-9284', name: 'Marine Gas Oil', volume: '600,000 m³', status: 'Verified', stage: 'Extraction Point', hash: '0x1a9f...c3e5', lastUpdate: '1h ago' },
  { id: 'B-9285', name: 'Bio-Ethanol Blend', volume: '85,000 m³', status: 'Verified', stage: 'Destination Hub', hash: '0x9d2b...f1a4', lastUpdate: '3h ago' },
  { id: 'B-9286', name: 'Crude Oil Grade A', volume: '1,200,000 m³', status: 'Verified', stage: 'Extraction Point', hash: '0x5e3c...d8b1', lastUpdate: '5h ago' },
];

export function FuelBatches() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mb-2">Registry Management</p>
          <h2 className="text-4xl font-black font-headline tracking-tighter text-on-surface uppercase">Fuel Batch Registry</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-surface-container-high p-3 rounded-xl hover:bg-surface-container-highest transition-colors">
            <Filter size={20} className="text-zinc-600" />
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-headline font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus size={16} />
            Register New Batch
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/10 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            className="w-full bg-surface-container-low border-none pl-12 pr-4 py-3 text-sm font-medium rounded-xl focus:ring-1 focus:ring-primary" 
            placeholder="Filter by Batch ID, Name, or Ledger Hash..."
          />
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-surface-container-low border-none text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary">
            <option>All Status</option>
            <option>Verified</option>
            <option>Flagged</option>
          </select>
          <select className="bg-surface-container-low border-none text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary">
            <option>Sort by Date</option>
            <option>Sort by Volume</option>
          </select>
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Batch ID</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Fuel Type / Name</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Volume</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Current Stage</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Integrity</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Ledger Hash</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-8 py-6">
                    <Link to={`/traceability/${batch.id}`} className="text-sm font-black font-headline text-primary hover:underline">
                      {batch.id}
                    </Link>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-on-surface">{batch.name}</p>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">Updated {batch.lastUpdate}</p>
                  </td>
                  <td className="px-8 py-6 font-mono text-xs font-bold text-on-surface">{batch.volume}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-zinc-400" />
                      <span className="text-xs font-bold text-zinc-600">{batch.stage}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
                      batch.status === 'Verified' ? "bg-emerald-50 text-emerald-600" : "bg-primary/5 text-primary"
                    )}>
                      {batch.status === 'Verified' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                      <span className="text-[10px] font-bold uppercase tracking-widest">{batch.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-mono text-[10px] text-zinc-400">{batch.hash}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors text-zinc-400 hover:text-primary">
                        <Download size={16} />
                      </button>
                      <button className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors text-zinc-400">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-surface-container-low border-t border-outline-variant/10 flex justify-between items-center">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Showing 6 of 1,284 batches</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-outline-variant/20 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors">Previous</button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
