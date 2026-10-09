import React from 'react';
import {
  ArrowDownToLine,
  Warehouse,
  Store,
  Columns,
  Snowflake,
  RotateCcw,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';

export function LeftTabNavigation({
  activeTab,
  onSelectTab,
  inboundCount,
  warehouseCount,
  retailOrdersCount,
  rescuedCount,
  onResetDemo,
}) {
  const tabs = [
    {
      id: 'BUY',
      number: '1',
      title: 'Inbound Feed',
      subtitle: 'BUY FROM SUPPLIERS',
      icon: ArrowDownToLine,
      count: inboundCount,
      badgeColor: 'bg-blue-100 text-blue-800',
      activeRing: 'border-blue-500 bg-blue-50/50',
      activeIndicator: 'bg-blue-600',
    },
    {
      id: 'MONITOR',
      number: '2',
      title: 'Warehouse Vault',
      subtitle: 'MONITOR & PREDICT RSL',
      icon: Warehouse,
      count: warehouseCount,
      badgeColor: 'bg-amber-100 text-amber-800',
      activeRing: 'border-amber-500 bg-amber-50/50',
      activeIndicator: 'bg-amber-500',
    },
    {
      id: 'SELL',
      number: '3',
      title: 'Retailer Demand',
      subtitle: 'SELL & FULFILL ORDERS',
      icon: Store,
      count: retailOrdersCount,
      badgeColor: 'bg-emerald-100 text-emerald-800',
      activeRing: 'border-emerald-500 bg-emerald-50/50',
      activeIndicator: 'bg-emerald-600',
    },
    {
      id: 'ALL',
      number: '✦',
      title: '3-Phase Pipeline',
      subtitle: 'ALL COLUMNS VIEW',
      icon: Columns,
      count: 'Overview',
      badgeColor: 'bg-slate-200 text-slate-700',
      activeRing: 'border-indigo-500 bg-indigo-50/50',
      activeIndicator: 'bg-indigo-600',
    },
  ];

  return (
    <aside className="w-full md:w-72 lg:w-80 bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 shrink-0 flex flex-col justify-between self-start">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-5 mb-5 border-b border-slate-100">
          <div className="w-11 h-11 rounded-2xl bg-[#17113a] text-white flex items-center justify-center shadow-md shadow-indigo-950/20 shrink-0">
            <Snowflake className="w-6 h-6 text-sky-300 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight truncate">
                Garuda Cold-Chain
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Distributor Hub Operations</p>
          </div>
        </div>

        {/* Section Label */}
        <div className="px-1 mb-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Navigation Stages:
          </span>
        </div>

        {/* Vertical Tabs List on the Left */}
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group relative ${
                  isActive
                    ? `bg-white shadow-md ${tab.activeRing} ring-2 ring-indigo-500/10`
                    : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200/60 text-slate-700'
                }`}
              >
                {/* Left Active Line Indicator */}
                {isActive && (
                  <span
                    className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full ${tab.activeIndicator}`}
                  />
                )}

                <div className="flex items-center gap-3 min-w-0 pl-1">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                      isActive
                        ? 'bg-[#17113a] text-white shadow-xs scale-105'
                        : 'bg-white text-slate-500 border border-slate-200 group-hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-slate-900 truncate">
                        {tab.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 block tracking-wider">
                      {tab.subtitle}
                    </span>
                  </div>
                </div>

                {/* Badge Count */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${tab.badgeColor}`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Summary & Reset Section */}
      <div className="mt-8 pt-5 border-t border-slate-100 space-y-3">
        {/* Quick Operations Metric Box */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-500">
            <span className="flex items-center gap-1.5 text-[11px]">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
              <span>Rescued Batches:</span>
            </span>
            <strong className="text-slate-800 font-bold">{rescuedCount}</strong>
          </div>

          <div className="flex items-center justify-between text-slate-500">
            <span className="flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safety SLA:</span>
            </span>
            <strong className="text-emerald-700 font-bold">8.0°C Limit</strong>
          </div>
        </div>

        {/* Reset Mock Data Action */}
        <button
          onClick={onResetDemo}
          className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 text-[11px] font-semibold transition flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample Batches</span>
        </button>
      </div>
    </aside>
  );
}
