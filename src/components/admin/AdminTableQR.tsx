import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import { CafeTable } from '../../types';
import {
  QrCode,
  Eye,
  Download,
  RefreshCw,
  ExternalLink,
  Printer,
  X,
  Sparkles,
  UtensilsCrossed,
  Users,
  Copy,
  Check,
  Globe,
} from 'lucide-react';

export const AdminTableQR: React.FC = () => {
  const { tables, updateTableStatus, setCurrentTable, setRole, setCustomerScreen, showNotification } =
    useCafe();

  const [selectedTable, setSelectedTable] = useState<CafeTable | null>(null);
  const [filterSection, setFilterSection] = useState<'All' | 'Indoor' | 'Outdoor'>('All');
  const [copiedTable, setCopiedTable] = useState<string | null>(null);

  const currentOrigin =
    typeof window !== 'undefined' && window.location.origin.startsWith('http')
      ? window.location.origin
      : 'https://ais-pre-tb2buobl4qp4unaxmyll76-939754429146.asia-southeast1.run.app';

  const getTableUrl = (tableName: string) => {
    const code = tableName.replace(/^Table\s+/i, '');
    return `${currentOrigin}?table=${encodeURIComponent(code)}`;
  };

  const handleCopyTableUrl = (tableName: string) => {
    const url = getTableUrl(tableName);
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedTable(tableName);
      showNotification(`Link meja ${tableName} disalin: ${url}`, 'success');
      setTimeout(() => setCopiedTable(null), 2500);
    }
  };

  const filtered = tables.filter(
    (t) => filterSection === 'All' || t.section === filterSection
  );

  const handleOpenAsGuest = (table: CafeTable) => {
    setCurrentTable(table.name);
    setRole('customer');
    setCustomerScreen('welcome');
    showNotification(`Beralih ke mode tamu untuk ${table.name}`, 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQR = (tableName: string) => {
    showNotification(`File kartu QR meja ${tableName} berhasil diunduh untuk dicetak akrilik`, 'success');
  };

  const handleRegenerateQR = (tableName: string) => {
    showNotification(`Kode QR token baru untuk ${tableName} berhasil digenerate`, 'success');
  };

  // Generate authentic SVG QR code matrix visual
  const renderQRCodeGraphic = (seedText: string) => {
    return (
      <svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <rect width="180" height="180" fill="white" />
        {/* Outer Corner Finder Pattern Top-Left */}
        <rect x="15" y="15" width="45" height="45" fill="#1C1917" rx="6" />
        <rect x="23" y="23" width="29" height="29" fill="white" rx="4" />
        <rect x="29" y="29" width="17" height="17" fill="#8C6A4B" rx="3" />

        {/* Outer Corner Finder Pattern Top-Right */}
        <rect x="120" y="15" width="45" height="45" fill="#1C1917" rx="6" />
        <rect x="128" y="23" width="29" height="29" fill="white" rx="4" />
        <rect x="134" y="29" width="17" height="17" fill="#8C6A4B" rx="3" />

        {/* Outer Corner Finder Pattern Bottom-Left */}
        <rect x="15" y="120" width="45" height="45" fill="#1C1917" rx="6" />
        <rect x="23" y="128" width="29" height="29" fill="white" rx="4" />
        <rect x="29" y="134" width="17" height="17" fill="#8C6A4B" rx="3" />

        {/* Central Logo Stamp */}
        <rect x="70" y="70" width="40" height="40" fill="#FAF7F2" stroke="#8C6A4B" strokeWidth="2" rx="8" />
        <circle cx="90" cy="90" r="14" fill="#2D241E" />
        <text
          x="90"
          y="94"
          textAnchor="middle"
          fill="#FAF7F2"
          fontSize="10"
          fontFamily="Playfair Display, serif"
          fontWeight="bold"
        >
          ARD
        </text>

        {/* Decorative QR matrix blocks */}
        <g fill="#2D241E">
          {/* Top timing strip */}
          <rect x="70" y="20" width="6" height="6" rx="1" />
          <rect x="85" y="20" width="6" height="6" rx="1" />
          <rect x="100" y="20" width="6" height="6" rx="1" />
          {/* Left timing strip */}
          <rect x="20" y="70" width="6" height="6" rx="1" />
          <rect x="20" y="85" width="6" height="6" rx="1" />
          <rect x="20" y="100" width="6" height="6" rx="1" />

          {/* Random authentic-looking QR module dots */}
          <rect x="70" y="35" width="6" height="6" rx="1" fill="#8C6A4B" />
          <rect x="80" y="45" width="12" height="6" rx="1" />
          <rect x="100" y="35" width="6" height="12" rx="1" />
          <rect x="70" y="130" width="12" height="6" rx="1" />
          <rect x="85" y="145" width="6" height="12" rx="1" fill="#8C6A4B" />
          <rect x="100" y="125" width="12" height="6" rx="1" />
          <rect x="125" y="70" width="6" height="12" rx="1" />
          <rect x="140" y="80" width="12" height="6" rx="1" fill="#8C6A4B" />
          <rect x="130" y="100" width="6" height="6" rx="1" />
          <rect x="145" y="115" width="12" height="6" rx="1" />
          <rect x="130" y="135" width="6" height="12" rx="1" />
          <rect x="145" y="145" width="12" height="6" rx="1" />
          <rect x="35" y="75" width="12" height="6" rx="1" />
          <rect x="45" y="90" width="6" height="12" rx="1" fill="#8C6A4B" />
        </g>
      </svg>
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B]">
            Meja & Stand QR Code
          </span>
          <h1 className="font-serif-cafe text-2xl md:text-3xl font-bold text-[#1C1917]">
            Manajemen Meja & QR Code
          </h1>
          <p className="text-xs text-[#786C62]">
            Kelola meja cafe, unduh kartu akrilik QR stand meja, dan uji alur pemesanan tamu langsung.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterSection('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filterSection === 'All' ? 'bg-[#2D241E] text-white' : 'bg-white text-[#574C43]'
            }`}
          >
            Semua ({tables.length})
          </button>
          <button
            onClick={() => setFilterSection('Indoor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filterSection === 'Indoor' ? 'bg-[#2D241E] text-white' : 'bg-white text-[#574C43]'
            }`}
          >
            Indoor
          </button>
          <button
            onClick={() => setFilterSection('Outdoor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filterSection === 'Outdoor' ? 'bg-[#2D241E] text-white' : 'bg-white text-[#574C43]'
            }`}
          >
            Outdoor
          </button>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((table) => {
          const isOccupied = table.status === 'Occupied';
          const isReserved = table.status === 'Reserved';

          return (
            <div
              key={table.id}
              className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-serif-cafe text-lg font-bold text-[#1C1917]">
                      {table.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#786C62] mt-0.5">
                      <span>{table.section}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#8C6A4B]" /> {table.capacity} Kursi
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      isOccupied
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : isReserved
                        ? 'bg-purple-100 text-purple-900 border-purple-300'
                        : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    }`}
                  >
                    {table.status === 'Available'
                      ? 'Tersedia'
                      : table.status === 'Occupied'
                      ? 'Terisi'
                      : 'Reservasi'}
                  </span>
                </div>

                {/* QR Miniature Preview Box */}
                <div
                  onClick={() => setSelectedTable(table)}
                  className="bg-[#FAF7F2] border border-[#E8DDD0] rounded-xl p-3 text-center cursor-pointer hover:bg-[#F5EBE1] transition-colors group mb-3"
                >
                  <div className="w-20 h-20 mx-auto bg-white rounded-lg p-1.5 border border-[#E8DDD0] shadow-2xs group-hover:scale-105 transition-transform flex items-center justify-center">
                    <QrCode className="w-14 h-14 text-[#2D241E]" />
                  </div>
                  <p className="text-[11px] font-bold text-[#8C6A4B] mt-2 group-hover:underline flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>Lihat Stand QR Meja</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#F5EBE1] space-y-2">
                <button
                  onClick={() => handleOpenAsGuest(table)}
                  className="w-full py-2 px-3 rounded-xl bg-[#2D241E] hover:bg-[#8C6A4B] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Menu Meja Ini</span>
                </button>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <button
                    onClick={() => setSelectedTable(table)}
                    className="py-1.5 px-2 rounded-lg bg-[#FAF7F2] border border-[#E8DDD0] hover:bg-neutral-100 text-[#574C43] font-medium flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleRegenerateQR(table.name)}
                    className="py-1.5 px-2 rounded-lg bg-[#FAF7F2] border border-[#E8DDD0] hover:bg-neutral-100 text-[#574C43] font-medium flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Regen</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* QR Code Stand Preview Modal */}
      {selectedTable && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8DDD0] relative animate-scale-in">
            <button
              onClick={() => setSelectedTable(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#E8DDD0] text-[#574C43] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Printable Acrylic Stand Card */}
            <div className="print-area border-2 border-[#8C6A4B] rounded-2xl p-6 bg-[#FAF7F2] text-center shadow-inner relative overflow-hidden">
              {/* Corner Accents */}
              <div className="w-3 h-3 border-t-2 border-l-2 border-[#8C6A4B] absolute top-2 left-2" />
              <div className="w-3 h-3 border-t-2 border-r-2 border-[#8C6A4B] absolute top-2 right-2" />
              <div className="w-3 h-3 border-b-2 border-l-2 border-[#8C6A4B] absolute bottom-2 left-2" />
              <div className="w-3 h-3 border-b-2 border-r-2 border-[#8C6A4B] absolute bottom-2 right-2" />

              {/* Logo */}
              <ArundaryLogo size={64} variant="circular" className="mx-auto mb-2" />

              <h2 className="font-serif-cafe font-bold text-lg text-[#1C1917] tracking-wider">
                ARUNDARY
              </h2>
              <p className="text-[10px] tracking-[0.25em] font-semibold text-[#8C6A4B] uppercase mb-4">
                CAFE AND SPACE
              </p>

              {/* Table Number Pill */}
              <div className="inline-block px-4 py-1 rounded-full bg-[#2D241E] text-white font-serif-cafe text-sm font-bold tracking-wider mb-4 shadow-sm">
                {selectedTable.name.toUpperCase()}
              </div>

              {/* Graphic QR Code */}
              <div className="bg-white p-3 rounded-2xl border border-[#E8DDD0] shadow-md inline-block mb-3">
                {renderQRCodeGraphic(selectedTable.name)}
              </div>

              <p className="text-xs font-bold text-[#1C1917] tracking-wide">
                Scan untuk membuka menu
              </p>
              <p className="text-[10px] text-[#786C62] mt-1">
                Pesan & pantau pesanan langsung dari meja
              </p>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 space-y-2">
              <button
                onClick={() => handleOpenAsGuest(selectedTable)}
                className="w-full py-3 px-4 rounded-xl bg-[#2D241E] hover:bg-[#1C1917] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#D9C3B0]" />
                <span>Simulasikan Scan Meja Ini ({selectedTable.name})</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCopyTableUrl(selectedTable.name)}
                  className="py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-[#E8DDD0] hover:bg-[#F5EBE1] text-[#2D241E] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedTable === selectedTable.name ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#8C6A4B]" />
                  )}
                  <span>{copiedTable === selectedTable.name ? 'Tersalin' : 'Salin Link'}</span>
                </button>

                <a
                  href={getTableUrl(selectedTable.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-[#E8DDD0] hover:bg-[#F5EBE1] text-[#2D241E] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C6A4B]" />
                  <span>Buka Tab Baru</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleDownloadQR(selectedTable.name)}
                  className="py-2 px-3 rounded-xl bg-white border border-[#E8DDD0] hover:bg-neutral-50 text-[#574536] text-[11px] font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3 h-3 text-[#8C6A4B]" />
                  <span>Download Stand</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="py-2 px-3 rounded-xl bg-white border border-[#E8DDD0] hover:bg-neutral-50 text-[#574536] text-[11px] font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3 h-3 text-[#8C6A4B]" />
                  <span>Cetak Akrilik</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
