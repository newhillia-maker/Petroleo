import React from 'react';
import { 
  Network, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Search, 
  Filter, 
  Download,
  ArrowRight,
  Database,
  Lock
} from 'lucide-react';
import { cn } from '../lib/utils';

const nodes = [
  { id: 1, name: 'Extraction Point', location: 'Dubai North Field', status: 'Completed', time: '2026-03-20', operator: 'Aramco_Node_01' },
  { id: 2, name: 'Refining Facility', location: 'Jebel Ali Refinery', status: 'Completed', time: '2026-03-21', operator: 'Refine_Node_04' },
  { id: 3, name: 'Storage Terminal', location: 'Fujairah Hub', status: 'Completed', time: '2026-03-22', operator: 'Store_Node_12' },
  { id: 4, name: 'Loading Port', location: 'Port of Fujairah', status: 'In Progress', time: '2026-03-24', operator: 'Port_Node_08' },
  { id: 5, name: 'Destination Hub', location: 'Rotterdam Terminal', status: 'Pending', time: '---', operator: '---' },
];

export function Traceability() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mb-2">Supply Chain Verification</p>
          <h2 className="text-4xl font-black font-headline tracking-tighter text-on-surface uppercase">End-to-End Traceability</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text" 
              className="bg-surface-container-low border-none pl-10 pr-4 py-2 text-xs font-bold rounded-lg w-64" 
              placeholder="Enter Batch ID (e.g. B-9281)"
            />
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-lg font-headline font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20">
            <Download size={14} />
            Export Audit
          </button>
        </div>
      </div>

      {/* Batch Header Card */}
      <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-wrap gap-12 items-center">
        <div>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Current Batch</p>
          <p className="text-2xl font-black font-headline tracking-tighter text-primary">B-9281_HIGH_OCTANE</p>
        </div>
        <div className="h-12 w-px bg-outline-variant/20 hidden md:block"></div>
        <div>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Ledger Hash</p>
          <p className="text-xs font-mono font-bold text-on-surface">0x8f2a...e91c4b72</p>
        </div>
        <div className="h-12 w-px bg-outline-variant/20 hidden md:block"></div>
        <div>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Volume</p>
          <p className="text-xs font-bold text-on-surface">450,000 m³</p>
        </div>
        <div className="h-12 w-px bg-outline-variant/20 hidden md:block"></div>
        <div>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Integrity Status</p>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Verified Integrity</span>
          </div>
        </div>
      </div>

      {/* Traceability Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
            <h3 className="text-lg font-black font-headline tracking-tight uppercase mb-10">Logistics Node Timeline</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-high -translate-y-1/2"></div>
              
              <div className="relative flex justify-between">
                {nodes.map((node, idx) => (
                  <div key={node.id} className="flex flex-col items-center group relative">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                      node.status === 'Completed' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" : 
                      node.status === 'In Progress' ? "bg-primary text-white shadow-lg shadow-primary/20 animate-pulse" : 
                      "bg-surface-container-high text-zinc-400"
                    )}>
                      {node.status === 'Completed' ? <ShieldCheck size={20} /> : <MapPin size={20} />}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{node.name}</p>
                      <p className="text-xs font-bold text-on-surface">{node.location}</p>
                      <p className="text-[10px] font-mono mt-1 text-zinc-500">{node.time}</p>
                    </div>
                    
                    {/* Tooltip-like info */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-on-surface text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-20">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Operator Node</p>
                      <p className="text-xs font-mono font-bold">{node.operator}</p>
                      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-on-surface rotate-45"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-surface-container-low h-[400px] rounded-2xl border border-outline-variant/10 relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop" 
              alt="Map" 
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/20">
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Live Tracking</p>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-bold text-on-surface">Vessel: MT_GLOBAL_CARRIER</p>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">ETA Rotterdam: 4d 12h 30m</p>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Sidebar */}
        <div className="space-y-6">
          <div className="bg-on-surface p-8 rounded-2xl shadow-xl">
            <h3 className="text-lg font-black font-headline tracking-tight uppercase text-white mb-6">Ledger Audit</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center shrink-0">
                  <Lock size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white mb-1">Block #829,102 Sealed</p>
                  <p className="text-[10px] text-white/40 leading-relaxed">Multi-sig validation completed by 4/4 nodes.</p>
                  <p className="text-[10px] font-mono text-primary mt-1">2026-03-24 08:12</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center shrink-0">
                  <Database size={16} className="text-white/60" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white mb-1">Quality Certificate Uploaded</p>
                  <p className="text-[10px] text-white/40 leading-relaxed">ASTM-D975 compliance verified by Inspector Node.</p>
                  <p className="text-[10px] font-mono text-primary mt-1">2026-03-23 14:45</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center shrink-0">
                  <Network size={16} className="text-white/60" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white mb-1">Smart Contract Triggered</p>
                  <p className="text-[10px] text-white/40 leading-relaxed">Automated customs clearance initiated for EU zone.</p>
                  <p className="text-[10px] font-mono text-primary mt-1">2026-03-23 09:30</p>
                </div>
              </div>
            </div>
            <button className="mt-8 w-full py-3 bg-primary text-white font-headline font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all">
              Full Ledger View
            </button>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
            <h3 className="text-sm font-black font-headline tracking-tight uppercase mb-4">Batch Composition</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 font-medium">Sulfur Content</span>
                <span className="text-xs font-bold font-mono">0.0012%</span>
              </div>
              <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[15%]"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 font-medium">Density @ 15°C</span>
                <span className="text-xs font-bold font-mono">842.4 kg/m³</span>
              </div>
              <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[85%]"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 font-medium">Flash Point</span>
                <span className="text-xs font-bold font-mono">64.5°C</span>
              </div>
              <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[65%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
