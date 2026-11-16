import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import {
  QrCode,
  ArrowRight,
  Sparkles,
  Smartphone,
  Printer,
  Check,
  Coffee,
  Info,
  ExternalLink,
  Copy,
  Globe,
} from 'lucide-react';

export const WebsiteTableQR: React.FC = () => {
  const {
    currentTable,
    setCurrentTable,
    tables,
    setCustomerScreen,
    showNotification,
  } = useCafe();

  const [selectedSection, setSelectedSection] = useState<'All' | 'Indoor' | 'Outdoor'>('All');
  const [copied, setCopied] = useState(false);

  // Determine current active origin or fall back to production Cloud Run URL
  const currentOrigin =
    typeof window !== 'undefined' && window.location.origin.startsWith('http')
      ? window.location.origin
      : 'https://ais-pre-tb2buobl4qp4unaxmyll76-939754429146.asia-southeast1.run.app';

  const tableCode = currentTable.replace(/^Table\s+/i, '');
  const realTableUrl = `${currentOrigin}?table=${encodeURIComponent(tableCode)}`;

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(realTableUrl);
      setCopied(true);
      showNotification(`Link pemesanan ${currentTable} disalin ke clipboard!`, 'success');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const activeTableObj = tables.find((t) => t.name === currentTable) || tables[0];

  const filteredTables = tables.filter((t) => {
    if (selectedSection === 'All') return true;
    return t.section === selectedSection;
  });

  const handleStartOrder = () => {
    showNotification(`Terhubung ke ${currentTable}. Silakan pilih menu!`, 'success');
    setCustomerScreen('menu');
  };

  const handleOpenMobileView = () => {
    setCustomerScreen('welcome');
  };

  return (
    <div className="flex-1 bg-[#FAF7F2] text-[#1C1917] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE3D5] text-[#8C6A4B] text-xs font-bold uppercase tracking-wider mb-3">
            <QrCode className="w-3.5 h-3.5" />
            <span>Simulasi QR Code Meja</span>
          </div>
          <h1 className="font-serif-cafe text-3xl sm:text-4xl font-bold text-[#1C1917]">
            Pesan Langsung dari Meja Tamu
          </h1>
          <p className="text-xs sm:text-sm text-[#705844] mt-2 leading-relaxed">
            Setiap meja di Arundary Cafe and Space dilengkapi stand akrilik dengan QR code unik.
            Pilih nomor meja di bawah ini untuk mensimulasikan pengalaman tamu di meja tersebut.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Realistic Acrylic Stand QR Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-sm bg-white rounded-3xl p-7 shadow-2xl border-2 border-[#E8DDD0] relative overflow-hidden text-center group">
              {/* Acrylic Top Gloss Effect */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#8C6A4B]/40 to-transparent" />

              {/* Logo */}
              <div className="flex justify-center mb-3">
                <ArundaryLogo size={56} variant="circular" />
              </div>

              <h2 className="font-serif-cafe font-bold text-lg text-[#1C1917] tracking-wider">
                ARUNDARY
              </h2>
              <p className="text-[10px] text-[#8C6A4B] font-bold uppercase tracking-widest mb-4">
                Cafe & Creative Space
              </p>

              {/* Table Name Badge */}
              <div className="bg-[#2D241E] text-white py-2 px-4 rounded-2xl mb-5 shadow-sm">
                <p className="text-[10px] text-[#C7B5A3] font-semibold uppercase tracking-wider">
                  Nomor Meja Tamu
                </p>
                <p className="text-2xl font-serif-cafe font-bold tracking-wide">
                  {currentTable}
                </p>
                <span className="inline-block mt-0.5 text-[10px] text-amber-300 font-semibold">
                  Area: {activeTableObj.section}
                </span>
              </div>

              {/* Big High-Quality QR Code Graphic with Real Working URL */}
              <div className="relative mx-auto w-48 h-48 bg-[#FAF7F2] rounded-2xl p-3 border-2 border-[#E0D4C5] shadow-inner flex items-center justify-center mb-5">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                    realTableUrl
                  )}&color=2D241E&bgcolor=FAF7F2`}
                  alt={`QR Code ${currentTable}`}
                  className="w-full h-full object-contain"
                />
                {/* Center logo watermark in QR */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-white shadow-md border border-[#E8DDD0] flex items-center justify-center">
                    <span className="font-serif-cafe font-black text-[9px] text-[#8C6A4B]">ARD</span>
                  </div>
                </div>
              </div>

              {/* Live Direct URL Snippet with Copy */}
              <div className="mb-4 bg-[#FAF7F2] border border-[#E8DDD0] rounded-xl p-2 text-left">
                <div className="flex items-center justify-between text-[10px] text-[#8C6A4B] font-bold mb-1">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#8C6A4B]" />
                    <span>Link Live Meja Ini:</span>
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="text-[#8C6A4B] hover:text-[#5C422C] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Tersalin!' : 'Salin'}</span>
                  </button>
                </div>
                <p className="text-[10px] font-mono text-[#574536] truncate bg-white px-2 py-1 rounded border border-[#E8DDD0]">
                  {realTableUrl}
                </p>
              </div>

              {/* Instructions on Stand */}
              <div className="space-y-1 mb-5 text-xs text-[#574536]">
                <p className="font-bold text-[#1C1917]">Scan QR via Kamera HP untuk Memesan</p>
                <p className="text-[11px] text-[#8A7B70]">
                  Dapat langsung discan dari smartphone • Tanpa perlu unduh aplikasi
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleStartOrder}
                  className="w-full py-3.5 rounded-xl bg-[#8C6A4B] hover:bg-[#77583D] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Buka Menu Meja ({currentTable})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2E8DC] text-[#2D241E] border border-[#E8DDD0] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#8C6A4B]" />}
                    <span>{copied ? 'Tersalin' : 'Salin Link'}</span>
                  </button>

                  <a
                    href={realTableUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2E8DC] text-[#2D241E] border border-[#E8DDD0] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#8C6A4B]" />
                    <span>Buka Tab Baru</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Acrylic Base Stand Indicator */}
            <div className="w-64 h-3 bg-gradient-to-r from-[#D9C8B5] via-[#ECE2D5] to-[#D9C8B5] rounded-full shadow-lg -mt-1.5 border border-[#C5B39E]" />
          </div>

          {/* Right Column: Table Selector & Guide */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD0] shadow-sm space-y-6">
              <div>
                <h3 className="font-serif-cafe text-xl font-bold text-[#1C1917]">
                  Pilih Meja Lain untuk Diuji
                </h3>
                <p className="text-xs text-[#705844] mt-1">
                  Pilih nomor meja di bawah ini untuk mengganti identitas meja yang aktif saat ini.
                </p>
              </div>

              {/* Section Filters */}
              <div className="flex items-center gap-2">
                {(['All', 'Indoor', 'Outdoor'] as const).map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSection(sec)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      selectedSection === sec
                        ? 'bg-[#2D241E] text-white'
                        : 'bg-[#FAF7F2] text-[#705844] hover:bg-[#F2E8DC]'
                    }`}
                  >
                    {sec === 'All' ? 'Semua Area' : `${sec} Area`}
                  </button>
                ))}
              </div>

              {/* Table Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredTables.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentTable(t.name);
                      showNotification(`Beralih ke ${t.name} (${t.section})`, 'info');
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                      currentTable === t.name
                        ? 'bg-[#2D241E] text-white border-[#2D241E] shadow-md scale-[1.02]'
                        : 'bg-[#FAF7F2] hover:bg-white text-[#2D241E] border-[#E8DDD0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{t.name}</span>
                      {currentTable === t.name ? (
                        <Check className="w-4 h-4 text-amber-300" />
                      ) : (
                        <span
                          className={`w-2 h-2 rounded-full ${
                            t.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                      )}
                    </div>
                    <p className={`text-[11px] ${currentTable === t.name ? 'text-[#C7B5A3]' : 'text-[#8A7B70]'}`}>
                      {t.section} • {t.capacity} Orang
                    </p>
                  </button>
                ))}
              </div>

              {/* Information Notice */}
              <div className="p-4 rounded-2xl bg-[#F5EBE1] border border-[#E8DDD0] flex items-start gap-3 text-xs text-[#574536]">
                <Info className="w-4 h-4 text-[#8C6A4B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1C1917]">Tentang Nomor Meja</p>
                  <p className="text-[11px] text-[#705844] mt-0.5 leading-relaxed">
                    Pesanan yang Anda buat melalui website ini otomatis terhubung dengan Kitchen Display
                    dan Barista Bar dengan label meja yang dipilih ({currentTable}). Anda juga dapat
                    mencoba peran Staff Kitchen untuk melihat pesanan masuk secara real-time!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
