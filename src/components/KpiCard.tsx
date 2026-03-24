import React from 'react';
import { cn } from '../lib/utils';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export function KpiCard({ icon: Icon, label, value, trend, trendType = 'neutral', className }: KpiCardProps) {
  return (
    <div className={cn(
      "bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 flex flex-col justify-between shadow-sm",
      trendType === 'negative' && "bg-red-50 border-primary/20",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <Icon className={cn("text-primary", trendType === 'negative' && "text-primary")} size={24} />
        {trend && (
          <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full",
            trendType === 'positive' && "text-emerald-600 bg-emerald-50",
            trendType === 'negative' && "text-primary bg-primary/10",
            trendType === 'neutral' && "text-zinc-400 bg-zinc-50"
          )}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className={cn(
          "text-2xl font-black font-headline tracking-tighter",
          trendType === 'negative' && "text-primary"
        )}>
          {value}
        </p>
        <p className={cn(
          "text-xs font-bold uppercase tracking-widest",
          trendType === 'negative' ? "text-primary/70" : "text-zinc-500"
        )}>
          {label}
        </p>
      </div>
    </div>
  );
}
