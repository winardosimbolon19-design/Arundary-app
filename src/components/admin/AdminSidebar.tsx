import React from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import { AdminTab } from '../../types';
import {
  LayoutDashboard,
  ClipboardList,
  Coffee,
  FolderTree,
  Boxes,
  QrCode,
  BarChart3,
  Users2,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const { setRole, orders } = useCafe();

  const newOrdersCount = orders.filter((o) => o.status === 'PESANAN DITERIMA').length;

  const navItems: { tab: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { tab: 'orders', label: 'Pesanan Masuk', icon: ClipboardList, badge: newOrdersCount },
    { tab: 'menu', label: 'Kelola Menu', icon: Coffee },
    { tab: 'categories', label: 'Kategori Menu', icon: FolderTree },
    { tab: 'stock', label: 'Kelola Stok', icon: Boxes },
    { tab: 'tables', label: 'Meja & QR Code', icon: QrCode },
    { tab: 'reports', label: 'Laporan Penjualan', icon: BarChart3 },
    { tab: 'staff', label: 'Kelola Karyawan', icon: Users2 },
    { tab: 'settings', label: 'Pengaturan Cafe', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#1C1917] text-white flex flex-col justify-between shrink-0 min-h-screen border-r border-[#332A24]">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-[#332A24]">
          <div className="flex items-center gap-3">
            <ArundaryLogo size={46} variant="circular" color="white" />
            <div>
              <h2 className="font-serif-cafe font-bold text-base tracking-wider text-white">
                ARUNDARY
              </h2>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-[#8C6A4B] uppercase">
                Admin Management
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#786C62] px-3 py-2">
            Sistem Manajemen
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
                    : 'text-[#D6CBBF] hover:bg-[#2A2420] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-[#1C1917]' : 'bg-[#8C6A4B] text-white'
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

      {/* Admin Profile & Logout */}
      <div className="p-4 border-t border-[#332A24] space-y-3">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-full bg-[#8C6A4B] flex items-center justify-center text-white text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Administrator</p>
            <p className="text-[10px] text-[#8C6A4B] truncate">General Manager</p>
          </div>
        </div>

        <button
          onClick={() => setRole('customer')}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-rose-950/40 hover:text-rose-300 text-xs font-semibold text-[#D6CBBF] transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar ke Mode Tamu</span>
        </button>
      </div>
    </aside>
  );
};
