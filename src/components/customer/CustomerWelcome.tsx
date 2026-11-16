import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import { UtensilsCrossed, QrCode, Sparkles, Coffee, ChevronDown, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const CustomerWelcome: React.FC = () => {
  const { currentTable, setCurrentTable, setCustomerScreen, tables, activeOrder } = useCafe();
  const [showTableSelect, setShowTableSelect] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-md mx-auto relative overflow-hidden">
      {/* Decorative Warm Background Blobs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#EFE3D5] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2E8DC] rounded-full blur-3xl opacity-70 pointer-events-none" />

      {/* Top Bar with Table Badge & Switcher */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-between pt-2"
      >
        <div className="relative">
          <button
            onClick={() => setShowTableSelect(!showTableSelect)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#E8DDD0] shadow-sm text-xs font-semibold text-[#2D241E] hover:bg-white transition-all cursor-pointer"
            title="Klik untuk simulasi meja lain"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">{currentTable}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8C6A4B]" />
          </button>

          {/* Table Switcher Dropdown */}
          {showTableSelect && (
            <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E8DDD0] p-2 z-50">
              <p className="text-[11px] font-bold text-[#8C6A4B] uppercase tracking-wider px-2.5 py-1">
                Pilih Meja (Simulasi QR):
              </p>
              <div className="max-h-48 overflow-y-auto space-y-1 mt-1">
                {tables.map((tbl) => (
                  <button
                    key={tbl.id}
                    onClick={() => {
                      setCurrentTable(tbl.name);
                      setShowTableSelect(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      tbl.name === currentTable
                        ? 'bg-[#2D241E] text-white'
                        : 'text-[#2D241E] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{tbl.name} ({tbl.section})</span>
                    {tbl.name === currentTable && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#8C6A4B] bg-[#F5EBE1] px-3 py-1 rounded-full border border-[#EAD9C8]">
          <QrCode className="w-3.5 h-3.5 text-[#8C6A4B]" />
          <span>QR Verified</span>
        </div>
      </motion.div>

      {/* Main Center Welcome Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="my-auto py-8 text-center relative z-10 flex flex-col items-center"
      >
        {/* Authentic Arundary Circular Logo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#E8DDD0]/50 rounded-full blur-xl scale-110" />
          <ArundaryLogo size={150} variant="circular" color="default" className="relative z-10 drop-shadow-sm" />
        </div>

        {/* Brand & Greetings */}
        <div className="space-y-2 mb-6 max-w-xs">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#8C6A4B] bg-[#F5EBE1] px-3.5 py-1 rounded-full border border-[#EAD9C8]">
            Cafe and Space
          </span>

          <h1 className="font-serif-cafe text-3xl font-bold text-[#1C1917] tracking-tight leading-tight">
            Welcome to Arundary
          </h1>

          <p className="text-sm font-medium text-[#574C43] leading-relaxed">
            Selamat datang di Arundary Cafe and Space
          </p>
        </div>

        {/* Table Indicator Card */}
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#E8DDD0] shadow-sm mb-6 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8DDD0] flex items-center justify-center text-[#8C6A4B]">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#8C6A4B] font-bold">
                Nomor Meja Anda
              </p>
              <p className="text-base font-bold text-[#1C1917]">
                {currentTable}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Meja Siap
          </span>
        </div>

        {/* Small Notice / Helper */}
        <p className="text-xs text-[#786C62] leading-relaxed max-w-xs px-2 mb-2">
          Scan, pesan, dan pantau pesananmu langsung dari meja tanpa harus antre di kasir.
        </p>

        {activeOrder && (
          <div className="w-full mt-4 p-3 rounded-2xl bg-amber-50/90 border border-amber-200 text-left flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Coffee className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-amber-900">
                  Pesanan Aktif ({activeOrder.id})
                </p>
                <p className="text-[10px] text-amber-700">
                  Status: {activeOrder.status}
                </p>
              </div>
            </div>
            <button
              onClick={() => setCustomerScreen('monitoring')}
              className="text-xs font-bold text-amber-900 underline hover:text-amber-800"
            >
              Pantau
            </button>
          </div>
        )}
      </motion.div>

      {/* Action Footer */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 pt-2 space-y-3"
      >
        <button
          onClick={() => setCustomerScreen('menu')}
          className="w-full py-4 px-6 rounded-2xl bg-[#2D241E] hover:bg-[#1C1917] active:scale-[0.99] text-white font-semibold text-base shadow-lg shadow-[#2D241E]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#D9C3B0]" />
          <span>Lihat Menu ({currentTable})</span>
        </button>

        <button
          onClick={() => setCustomerScreen('home')}
          className="w-full py-2.5 px-4 rounded-xl border border-[#E8DDD0] bg-white hover:bg-[#FAF7F2] text-xs font-bold text-[#574C43] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Jelajahi Profil Lengkap Website</span>
        </button>

        <p className="text-center text-[10px] text-[#A89A8E] tracking-wider uppercase">
          Arundary Ordering Experience • No Login Required
        </p>
      </motion.div>
    </div>
  );
};
