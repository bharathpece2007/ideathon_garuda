import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Truck,
  Store,
  HeartHandshake,
  Mail,
  Settings,
  HelpCircle,
  LogOut,
  Snowflake,
  ShieldAlert,
} from 'lucide-react';

export function Sidebar({ activeTab, onSelectTab, pendingCount = 0, anomalyCount = 0 }) {
  const navItems = [
    { id: 'dashboard', label: 'Fleet Overview', icon: LayoutDashboard },
    { id: 'distributor', label: 'Distributor Telemetry & Quality Gate', icon: Truck, badge: anomalyCount > 0 ? anomalyCount : null, badgeColor: 'bg-rose-500' },
    { id: 'manufacturer', label: 'Manufacturer Hub', icon: Building2, badge: pendingCount > 0 ? pendingCount : null, badgeColor: 'bg-amber-500' },
    { id: 'retailer', label: 'Retailer Marketplace', icon: Store },
    { id: 'rescue', label: 'NGO & Rescue Network', icon: HeartHandshake },
    { id: 'notifications', label: 'Alerts & Messages', icon: Mail },
    { id: 'settings', label: 'Settings & ML Config', icon: Settings },
    { id: 'help', label: 'Knowledge Base', icon: HelpCircle },
  ];

  return (
    <aside className="w-16 md:w-20 bg-[#17113a] shrink-0 flex flex-col items-center justify-between py-6 rounded-l-[32px] md:rounded-l-[40px] text-white select-none z-20">
      {/* Brand Icon at Top */}
      <div className="flex flex-col items-center gap-6">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-900/50 cursor-pointer hover:scale-105 transition group" title="Garuda Cold-Chain Intelligence">
          <div className="relative">
            <Snowflake className="w-6 h-6 text-white group-hover:rotate-45 transition duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sky-300 rounded-full animate-ping" />
          </div>
        </div>

        {/* Navigation Items (Matching the vertical icon pill styling in reference image) */}
        <nav className="flex flex-col items-center gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative w-10 h-10 md:w-11 md:h-11 rounded-2xl flex items-center justify-center transition-all duration-200 group ${
                  isActive
                    ? 'bg-white/15 text-white shadow-inner ring-1 ring-white/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />

                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute left-1 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}

                {/* Notification Badge */}
                {item.badge && (
                  <span
                    className={`absolute -top-1 -right-1 w-4 h-4 ${item.badgeColor} text-[10px] font-bold rounded-full flex items-center justify-center text-white ring-2 ring-[#17113a]`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout / Switch Fleet Node at Bottom */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onSelectTab('settings')}
          className="w-10 h-10 md:w-11 md:h-11 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition group"
          title="Sign Out / Switch Node"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-0.5 transition" />
        </button>
      </div>
    </aside>
  );
}
