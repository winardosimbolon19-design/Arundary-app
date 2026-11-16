import React from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import { StaffTab } from '../../types';
import {
  LayoutDashboard,
  ClipboardList,
  Columns3,
  Coffee,
  TableProperties,
  LogOut,
  UserCheck,
} from 'lucide-react';

interface StaffSidebarProps {
  currentTab: StaffTab;
  onSelectTab: (tab: StaffTab) => void;
}

export const StaffSidebar: React.FC<StaffSidebarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const { setRole, orders } = useCafe();

  const newOrdersCount = orders.filter((o) => o.status === 'PESANAN DITERIMA').length;
  const cookingOrdersCount = orders.filter(
    (o) => o.status === 'SEDANG DISIAPKAN' || o.status === 'SEDANG DIMASAK'
  ).length;

  const navItems: { tab: StaffTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { tab: 'orders', label: 'Pesanan Masuk', icon: ClipboardList, badge: newOrdersCount },
    { tab: 'kanban', label: 'Status Pesanan (Kanban)', icon: Columns3, badge: cookingOrdersCount },
    { tab: 'menu_stock', label: 'Menu & Stok', icon: Coffee },
    { tab: 'tables', label: 'Status Meja', icon: TableProperties },
  ];

  return (
    <aside className="w-64 bg-[#2D241E] text-white flex flex-col justify-between shrink-0 min-h-screen border-r border-[#4A3B31]">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-[#4A3B31]">
          <div className="flex items-center gap-3">
            <ArundaryLogo size={46} variant="circular" color="white" />
            <div>
              <h2 className="font-serif-cafe font-bold text-base tracking-wider text-white">
                ARUNDARY
              </h2>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-[#D9C3B0] uppercase">
                Staff & Kitchen Bar
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#A89A8E] px-3 py-2">
            Menu Operasional
          </p>

          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            const Icon = item.icon;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#8C6A4B] text-white shadow-md'
                    : 'text-[#E8DDD0] hover:bg-[#3D3129] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-[#2D241E]' : 'bg-[#8C6A4B] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Staff Profile & Logout */}
      <div className="p-4 border-t border-[#4A3B31] space-y-3">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-full bg-[#8C6A4B] flex items-center justify-center text-white text-xs font-bold">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Bayu Pratama</p>
            <p className="text-[10px] text-[#D9C3B0] truncate">Head Barista • Shift Pagi</p>
          </div>
        </div>

        <button
          onClick={() => setRole('customer')}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-rose-950/40 hover:text-rose-300 text-xs font-semibold text-[#D9C3B0] transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar ke Mode Tamu</span>
        </button>
      </div>
    </aside>
  );
};
