import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Network, 
  Cpu, 
  Activity, 
  ChevronRight,
  ArrowLeft,
  Share2,
  ExternalLink,
  Zap,
  Fingerprint
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function TransactionDetail() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-6">
          <Link to="/records" className="p-3 bg-surface-container-high rounded-xl hover:bg-surface-container-highest transition-colors">
            <ArrowLeft size={20} className="text-zinc-600" />
          </Link>
          <div>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mb-2">Forensic Transaction View</p>
            <h2 className="text-4xl font-black font-headline tracking-tighter text-on-surface uppercase">Block #829,102</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-surface-container-high p-3 rounded-xl hover:bg-surface-container-highest transition-colors">
            <Share2 size={20} className="text-zinc-600" />
          </button>
          <button className="bg-on-background text-white px-6 py-3 rounded-xl font-headline font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-on-background/20">
            <Fingerprint size={16} />
            Verify Signature
          </button>
        </div>
      </div>

      {/* Forensic Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Transaction Metadata */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
            <div className="flex justify-between items-start mb-10">
              <h3 className="text-lg font-black font-headline tracking-tight uppercase">Ledger Metadata</h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Immutable Record</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Transaction Hash</p>
                <p className="text-sm font-mono font-bold text-on-surface break-all">0x8f2a9c4b72e91c4b72e91c4b72e91c4b72e91c4b72e91c4b72e91c4b72e91c4b</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Previous Block Hash</p>
                <p className="text-sm font-mono font-bold text-zinc-400 break-all">0x3d1b2a8f9c4b72e91c4b72e91c4b72e91c4b72e91c4b72e91c4b72e91c4b72e</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Timestamp (UTC)</p>
                <p className="text-sm font-bold text-on-surface">2026-03-24 08:12:42.921</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Gas Consumed</p>
                <p className="text-sm font-bold text-on-surface">42,891 Units</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Smart Contract</p>
                <p className="text-sm font-bold text-primary flex items-center gap-2">
                  FuelTrace_Core_v4.sol <ExternalLink size={14} />
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Network Propagation</p>
                <p className="text-sm font-bold text-on-surface">142 Nodes (Global)</p>
              </div>
            </div>
          </div>

          {/* Multi-Signature Validation */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
            <h3 className="text-lg font-black font-headline tracking-tight uppercase mb-8">Multi-Signature Validation</h3>
            <div className="space-y-4">
              {[
                { node: 'Rotterdam_Hub_04', status: 'Signed', time: '08:12:41' },
                { node: 'Singapore_Port_Node', status: 'Signed', time: '08:12:42' },
                { node: 'Houston_Refinery_01', status: 'Signed', time: '08:12:42' },
                { node: 'Dubai_Terminal_A', status: 'Signed', time: '08:12:42' },
              ].map((sig, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-emerald-500 shadow-sm">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{sig.node}</p>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Validator Node</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-1">{sig.status}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{sig.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Forensic Sidebar */}
        <div className="space-y-8">
          {/* Smart Contract Rules */}
          <div className="bg-primary p-8 rounded-2xl shadow-xl shadow-primary/20">
            <div className="flex items-center gap-3 mb-8 text-white">
              <Cpu size={24} />
              <h3 className="text-lg font-black font-headline tracking-tight uppercase">Contract Rules</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <p className="text-xs font-medium">Verify batch origin certificate</p>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <p className="text-xs font-medium">Validate sulfur content &lt; 0.0015%</p>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <p className="text-xs font-medium">Check multi-sig quorum (3/4)</p>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <p className="text-xs font-medium">Trigger customs notification</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Execution Status</span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded">Success</span>
              </div>
            </div>
          </div>

          {/* Network Activity */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
            <h3 className="text-sm font-black font-headline tracking-tight uppercase mb-6">Network Propagation</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity size={16} className="text-primary" />
                  <span className="text-xs font-bold text-on-surface">Latency</span>
                </div>
                <span className="text-xs font-bold font-mono text-zinc-500">42ms</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database size={16} className="text-primary" />
                  <span className="text-xs font-bold text-on-surface">Block Size</span>
                </div>
                <span className="text-xs font-bold font-mono text-zinc-500">1.2 MB</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Network size={16} className="text-primary" />
                  <span className="text-xs font-bold text-on-surface">Consensus</span>
                </div>
                <span className="text-xs font-bold font-mono text-zinc-500">PoA v2</span>
              </div>
            </div>
            
            <div className="mt-8 h-24 flex items-end gap-1">
              {[40, 70, 45, 90, 65, 80, 50, 85, 40, 60, 75, 55].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-primary/10 rounded-t-sm hover:bg-primary transition-colors cursor-pointer" 
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <p className="text-[10px] text-center text-zinc-400 font-bold uppercase tracking-widest mt-4">Real-time Node Activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}
