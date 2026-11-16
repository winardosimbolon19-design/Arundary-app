import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import { CustomerScreen } from '../../types';
import {
  ShoppingBag,
  Clock,
  MapPin,
  Coffee,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  QrCode,
  ShieldCheck,
  ChefHat,
  Compass,
  ArrowRight,
  Check,
} from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';

interface WebsiteNavbarProps {
  onOpenMobileFrameToggle?: () => void;
}

export const WebsiteNavbar: React.FC<WebsiteNavbarProps> = () => {
  const {
    customerScreen,
    setCustomerScreen,
    currentTable,
    setCurrentTable,
    tables,
    cartItemCount,
    cartTotal,
    activeOrder,
    setRole,
  } = useCafe();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tableDropdownOpen, setTableDropdownOpen] = useState(false);

  const navLinks: { id: CustomerScreen; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Beranda' },
    { id: 'menu', label: 'Menu & Pesan' },
    { id: 'space', label: 'Suasana & Space' },
    { id: 'table_qr', label: 'Pesan QR Meja' },
    { id: 'location', label: 'Lokasi & Kontak' },
  ];

  const handleNavClick = (screen: CustomerScreen) => {
    setCustomerScreen(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DDD0] shadow-sm transition-all">
      {/* Top Banner Alert / Active Order Notification */}
      {activeOrder && activeOrder.status !== 'SELESAI' && (
        <div className="bg-[#2D241E] text-white px-4 py-1.5 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-semibold text-[#E8DDD0]">Pesanan Aktif:</span>
              <span className="font-bold text-white">{activeOrder.id}</span>
              <span className="hidden sm:inline text-xs text-[#C7B5A3]">
                ({currentTable} • {activeOrder.items.length} item)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8C6A4B] text-white">
                {activeOrder.status}
              </span>
            </div>
            <button
              onClick={() => handleNavClick('monitoring')}
              className="text-xs text-amber-300 hover:text-white font-bold underline flex items-center gap-1 cursor-pointer shrink-0 ml-2"
            >
              <span>Pantau Status</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <ArundaryLogo size={42} variant="circular" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-cafe font-bold text-lg sm:text-xl tracking-wider text-[#1C1917] group-hover:text-[#8C6A4B] transition-colors">
                  ARUNDARY
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold tracking-widest text-[#8C6A4B] bg-[#F5EBE1] px-2 py-0.5 rounded-full border border-[#E3D3C2]">
                  CAFE & SPACE
                </span>
              </div>
              <p className="text-[11px] text-[#705844] hidden md:block">
                Specialty Coffee • Eatery • Creative Co-Working Space
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  customerScreen === link.id
                    ? 'bg-[#2D241E] text-white shadow-sm'
                    : 'text-[#4A3B31] hover:text-[#1C1917] hover:bg-[#F2E8DC]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Table Badge Selector */}
            <div className="relative">
              <button
                onClick={() => setTableDropdownOpen(!tableDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8DDD0] hover:border-[#8C6A4B] text-xs font-bold text-[#2D241E] shadow-sm transition-all cursor-pointer"
                title="Pilih nomor meja"
              >
                <QrCode className="w-3.5 h-3.5 text-[#8C6A4B]" />
                <span className="text-[11px] sm:text-xs">{currentTable}</span>
                <ChevronDown className="w-3 h-3 text-[#A89A8E]" />
              </button>

              {tableDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E8DDD0] p-2 z-50 animate-scale-in">
                  <div className="px-3 py-1.5 border-b border-[#F0E6D8] mb-1">
                    <p className="text-[10px] font-bold text-[#8C6A4B] uppercase tracking-wider">
                      Simulasi Meja QR
                    </p>
                    <p className="text-[11px] text-[#7A6A5E]">Pilih meja saat ini:</p>
                  </div>
                  <div className="max-h-52 overflow-y-auto space-y-0.5">
                    {tables.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setCurrentTable(t.name);
                          setTableDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                          currentTable === t.name
                            ? 'bg-[#2D241E] text-white font-bold'
                            : 'text-[#3E3228] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              t.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                          <span>{t.name}</span>
                        </div>
                        <span className="text-[10px] opacity-75">{t.section}</span>
                      </button>
                    ))}
                  </div>
                  <div className="pt-1.5 mt-1 border-t border-[#F0E6D8]">
                    <button
                      onClick={() => {
                        setTableDropdownOpen(false);
                        handleNavClick('table_qr');
                      }}
                      className="w-full text-center py-1.5 text-[11px] text-[#8C6A4B] hover:text-[#5F4630] font-bold cursor-pointer"
                    >
                      Buka Tampilan Stand Meja →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button with Count and Total */}
            <button
              onClick={() => handleNavClick('cart')}
              className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-bold transition-all shadow-sm cursor-pointer ${
                cartItemCount > 0
                  ? 'bg-[#8C6A4B] hover:bg-[#77583D] text-white'
                  : 'bg-white hover:bg-[#F5EBE1] border border-[#E8DDD0] text-[#2D241E]'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-[#8C6A4B] text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-xs hidden sm:inline">
                {cartItemCount > 0 ? formatRupiah(cartTotal) : 'Keranjang'}
              </span>
            </button>

            {/* Quick Staff / Admin Switcher Shortcut */}
            <div className="hidden md:flex items-center gap-1 border-l border-[#E0D4C5] pl-3 ml-1">
              <button
                onClick={() => setRole('staff')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#705844] hover:text-[#1C1917] hover:bg-[#EFE4D6] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Masuk ke Layar Kitchen Bar"
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span className="text-[11px]">Kitchen</span>
              </button>
              <button
                onClick={() => setRole('admin')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#705844] hover:text-[#1C1917] hover:bg-[#EFE4D6] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Masuk ke Admin POS"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[11px]">Admin</span>
              </button>
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-[#E8DDD0] text-[#2D241E] hover:bg-[#F2E8DC] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DDD0] px-4 pt-3 pb-5 space-y-2 shadow-lg animate-fade-in">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                  customerScreen === link.id
                    ? 'bg-[#2D241E] text-white'
                    : 'text-[#4A3B31] hover:bg-[#EFE4D6]'
                }`}
              >
                <span>{link.label}</span>
                {customerScreen === link.id && <Check className="w-4 h-4 text-[#C9A98A]" />}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8DDD0] grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setRole('staff');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#EFE3D5] text-[#2D241E] font-bold hover:bg-[#E2D2C0] cursor-pointer"
            >
              <ChefHat className="w-4 h-4" />
              <span>Portal Kitchen</span>
            </button>
            <button
              onClick={() => {
                setRole('admin');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2D241E] text-white font-bold hover:bg-black cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin POS</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
