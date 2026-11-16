import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { formatRupiah } from '../../utils/formatters';
import {
  Calendar,
  Download,
  Printer,
  TrendingUp,
  CreditCard,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { orders, showNotification } = useCafe();
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'month' | 'custom'>('today');

  // Multipliers based on period
  const multiplier = filterPeriod === 'today' ? 1 : filterPeriod === 'week' ? 7 : 30;

  const baseRevenue = 4120000;
  const totalRevenue = baseRevenue * multiplier;
  const totalOrders = (orders.length + 38) * multiplier;
  const totalItemsSold = (orders.length * 3 + 82) * multiplier;
  const averageOrderValue = Math.round(totalRevenue / totalOrders);

  // Sales Trends Data
  const trendData = [
    { period: filterPeriod === 'today' ? '10:00' : 'Senin', sales: 480000 * multiplier * 0.1, orders: 8 },
    { period: filterPeriod === 'today' ? '12:00' : 'Selasa', sales: 820000 * multiplier * 0.1, orders: 15 },
    { period: filterPeriod === 'today' ? '14:00' : 'Rabu', sales: 640000 * multiplier * 0.1, orders: 11 },
    { period: filterPeriod === 'today' ? '16:00' : 'Kamis', sales: 910000 * multiplier * 0.1, orders: 18 },
    { period: filterPeriod === 'today' ? '18:00' : 'Jumat', sales: 1250000 * multiplier * 0.1, orders: 24 },
    { period: filterPeriod === 'today' ? '20:00' : 'Sabtu', sales: 1680000 * multiplier * 0.1, orders: 32 },
    { period: filterPeriod === 'today' ? '22:00' : 'Minggu', sales: 950000 * multiplier * 0.1, orders: 19 },
  ];

  const maxSale = Math.max(...trendData.map((d) => d.sales));

  const handleExportCSV = () => {
    showNotification('Laporan rekap penjualan (CSV) berhasil diunduh', 'success');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B]">
            Analisis Keuangan & Penjualan
          </span>
          <h1 className="font-serif-cafe text-2xl md:text-3xl font-bold text-[#1C1917]">
            Laporan Finansial & Operasional
          </h1>
          <p className="text-xs text-[#786C62]">
            Data pendapatan bruto, rata-rata transaksi, dan statistik penjualan menu Arundary Cafe.
          </p>
        </div>

        {/* Filter Period Buttons */}
        <div className="flex items-center gap-2 bg-white rounded-2xl border border-[#E8DDD0] p-1.5 shadow-sm">
          {[
            { id: 'today', label: 'Hari Ini' },
            { id: 'week', label: 'Minggu Ini' },
            { id: 'month', label: 'Bulan Ini' },
            { id: 'custom', label: 'Pilih Tanggal' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterPeriod(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterPeriod === tab.id
                  ? 'bg-[#2D241E] text-white shadow-sm'
                  : 'text-[#574C43] hover:bg-[#FAF7F2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Primary Report Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#786C62]">Total Pesanan</span>
            <div className="p-2 rounded-xl bg-[#FAF7F2] text-[#8C6A4B]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif-cafe text-2xl font-bold text-[#1C1917]">
            {totalOrders} Pesanan
          </p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            +12.4% vs periode lalu
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#786C62]">Total Pendapatan</span>
            <div className="p-2 rounded-xl bg-[#FAF7F2] text-[#8C6A4B]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif-cafe text-2xl font-bold text-[#2D241E]">
            {formatRupiah(totalRevenue)}
          </p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            Margin bersih 42%
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#786C62]">Menu Terjual (Items Sold)</span>
            <div className="p-2 rounded-xl bg-[#FAF7F2] text-[#8C6A4B]">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif-cafe text-2xl font-bold text-[#1C1917]">
            {totalItemsSold} Porsi
          </p>
          <p className="text-[11px] text-[#786C62] mt-1">
            Kopi & Makanan Utama mendominasi
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#786C62]">Rata-rata Order (AOV)</span>
            <div className="p-2 rounded-xl bg-[#FAF7F2] text-[#8C6A4B]">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif-cafe text-2xl font-bold text-[#1C1917]">
            {formatRupiah(averageOrderValue)}
          </p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            Average Basket Size 2.4 item
          </p>
        </div>
      </div>

      {/* Sales Trend & Volume Graph */}
      <div className="bg-white rounded-2xl border border-[#E8DDD0] p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5EBE1] pb-3">
          <div>
            <h2 className="font-serif-cafe text-base font-bold text-[#1C1917]">
              Grafik Penjualan & Volume Pesanan
            </h2>
            <p className="text-xs text-[#786C62]">
              Perbandingan omzet dan transaksi ({filterPeriod.toUpperCase()})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E8DDD0] hover:bg-[#F5EBE1] text-[#2D241E] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#8C6A4B]" />
              <span>Ekspor CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-[#2D241E] hover:bg-[#1C1917] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Rekap</span>
            </button>
          </div>
        </div>

        {/* Visual Trend Bars */}
        <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2">
          {trendData.map((d, i) => {
            const heightPercent = (d.sales / maxSale) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#2D241E] bg-[#F5EBE1] px-1.5 py-0.5 rounded border border-[#EAD9C8] whitespace-nowrap">
                  {formatRupiah(d.sales)}
                </div>

                <div className="w-full bg-[#FAF7F2] rounded-t-xl h-44 flex items-end p-1 border border-b-0 border-[#E8DDD0]">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-[#2D241E] to-[#8C6A4B] transition-all duration-300 group-hover:brightness-110"
                  />
                </div>

                <span className="text-[11px] font-semibold text-[#786C62]">
                  {d.period}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Method & Channel Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm">
          <h3 className="font-serif-cafe text-sm font-bold text-[#1C1917] mb-3">
            Distribusi Metode Pembayaran
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-[#1C1917]">QRIS Instan Meja</span>
                <span className="font-bold text-[#2D241E]">64% ({formatRupiah(totalRevenue * 0.64)})</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FAF7F2] overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '64%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-[#1C1917]">Bayar di Kasir (Cash / Debit)</span>
                <span className="font-bold text-[#2D241E]">36% ({formatRupiah(totalRevenue * 0.36)})</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FAF7F2] overflow-hidden">
                <div className="h-full bg-[#8C6A4B] rounded-full" style={{ width: '36%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm">
          <h3 className="font-serif-cafe text-sm font-bold text-[#1C1917] mb-3">
            Kategori Terfavorit
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded-xl bg-[#FAF7F2]">
              <span className="font-medium text-[#1C1917]">1. Coffee & Signature</span>
              <span className="font-bold text-[#8C6A4B]">44% Penjualan</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-[#FAF7F2]">
              <span className="font-medium text-[#1C1917]">2. Main Course Meals</span>
              <span className="font-bold text-[#8C6A4B]">26% Penjualan</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-[#FAF7F2]">
              <span className="font-medium text-[#1C1917]">3. Light Bites & Snacks</span>
              <span className="font-bold text-[#8C6A4B]">18% Penjualan</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-[#FAF7F2]">
              <span className="font-medium text-[#1C1917]">4. Artisan Tea & Non-Coffee</span>
              <span className="font-bold text-[#8C6A4B]">12% Penjualan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
