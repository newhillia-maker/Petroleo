import React from 'react';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Industrial Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-industrial-overlay relative flex-col justify-between p-16">
        <div className="z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl shadow-2xl shadow-primary/40">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter font-headline">Industrial Integrity</h1>
          </div>
          <h2 className="text-6xl font-black text-white leading-[0.9] tracking-tighter mb-6 font-headline">
            OPERATIONAL<br />INTELLIGENCE<br />SYSTEM
          </h2>
          <p className="text-zinc-400 max-w-md font-medium leading-relaxed">
            Enterprise-grade fuel traceability and logistics verification powered by immutable ledger technology.
          </p>
        </div>

        <div className="z-10 flex items-center gap-12">
          <div>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-white font-mono uppercase tracking-widest">Network Online</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-2">Node Location</p>
            <p className="text-xs text-white font-mono uppercase tracking-widest">Rotterdam_Hub_04</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-container-lowest">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mb-4">Secure Gateway</p>
            <h3 className="text-4xl font-black font-headline tracking-tighter text-on-surface mb-2">SYSTEM AUTHENTICATION</h3>
            <p className="text-zinc-500 text-sm">Enter your credentials to access the Industrial Integrity network.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Operator ID</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="text" 
                  className="w-full bg-surface-container-low border-none pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-primary transition-all font-medium" 
                  placeholder="e.g. OP_ROT_482"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Secure Passkey</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-surface-container-low border-none pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-primary transition-all font-medium" 
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary" />
                <span className="text-xs text-zinc-500 group-hover:text-on-surface transition-colors">Remember this node</span>
              </label>
              <a href="#" className="text-xs text-primary font-bold hover:underline">Forgot Access?</a>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-headline font-extrabold text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-3"
            >
              Initialize Session
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-outline-variant/30 text-center">
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">
              This system is restricted to authorized personnel only.<br />
              All access attempts are logged on the immutable ledger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
