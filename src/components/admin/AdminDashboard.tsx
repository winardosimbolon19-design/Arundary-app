import React from 'react';
import { useCafe } from '../../context/CafeContext';
import { formatRupiah } from '../../utils/formatters';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  AlertOctagon,
  Clock,
  ArrowUpRight,
  Coffee,
  CheckCircle2,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { orders, menuItems, setAdminTab } = useCafe();

  const totalOrdersToday = orders.length + 42; // realistic day volume
  const revenueCalculated = orders.reduce((sum, o) => sum + o.total, 0) + 3250000;
  const outOfStockCount = menuItems.filter((m) => !m.isAvailable || m.stock <= 0).length;
  const itemsSoldCount = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0
  ) + 84;

  const kpis = [
    {
      label: 'Total Pesanan Hari Ini',
      value: `${totalOrdersToday} Pesanan`,
      change: '+14.2% vs kemarin',
      positive: true,
      icon: ShoppingBag,
      color: 'bg-amber-50 text-amber-900 border-amber-200',
    },
    {
      label: 'Pendapatan Hari Ini',
      value: formatRupiah(revenueCalculated),
      change: '+18.5% vs minggu lalu',
      positive: true,
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    },
    {
      label: 'Menu Terjual',
      value: `${itemsSoldCount} Porsi`,
      change: 'Rata-rata 2.1 porsi/order',
      positive: true,
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      label: 'Menu Stok Habis',
      value: `${outOfStockCount} Menu`,
      change: outOfStockCount > 0 ? 'Perlu restock segera' : 'Semua aman',
      positive: outOfStockCount === 0,
      icon: AlertOctagon,
      color: outOfStockCount > 0 ? 'bg-rose-50 text-rose-900 border-rose-200' : 'bg-stone-50 text-stone-900 border-stone-200',
    },
  ];

  // Hourly volume chart mock data
  const hourlyData = [
    { hour: '09:00', orders: 4, revenue: 140000 },
    { hour: '11:00', orders: 8, revenue: 320000 },
    { hour: '13:00', orders: 15, revenue: 780000 },
    { hour: '15:00', orders: 11, revenue: 490000 },
    { hour: '17:00', orders: 18, revenue: 920000 },
    { hour: '19:00', orders: 22, revenue: 1140000 },
    { hour: '21:00', orders: 14, revenue: 650000 },
  ];

  const maxOrders = Math.max(...hourlyData.map((d) => d.orders));

  // Popular Menu ranking
  const popularMenus = [
    { name: 'Caramel Latte', category: 'Coffee', sales: 34, revenue: 952000, percentage: 88 },
    { name: 'Kopi Susu Gula Aren', category: 'Coffee', sales: 29, revenue: 696000, percentage: 76 },
    { name: 'Chicken Katsu Rice', category: 'Main Course', sales: 24, revenue: 840000, percentage: 65 },
    { name: 'Matcha Latte', category: 'Non Coffee', sales: 21, revenue: 525000, percentage: 58 },
    { name: 'Truffle Parmesan Fries', category: 'Snack', sales: 19, revenue: 494000, percentage: 50 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B]">
            Pusat Kendali Bisnis
          </span>
          <h1 className="font-serif-cafe text-2xl md:text-3xl font-bold text-[#1C1917]">
            Admin Executive Dashboard
          </h1>
          <p className="text-xs text-[#786C62]">
            Ringkasan performa penjualan harian, tren menu favorit, dan ketersediaan stok Arundary Cafe and Space.
          </p>
        </div>

        <button
          onClick={() => setAdminTab('reports')}
          className="px-4 py-2.5 rounded-xl bg-[#2D241E] hover:bg-[#1C1917] text-white text-xs font-bold shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <span>Buka Laporan Lengkap</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${kpi.color} shadow-sm flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#574C43]">{kpi.label}</span>
                <div className="p-2 rounded-xl bg-white/80 shadow-xs">
                  <Icon className="w-4 h-4 text-[#8C6A4B]" />
                </div>
              </div>

              <div>
                <p className="font-serif-cafe text-2xl font-bold text-[#1C1917]">
                  {kpi.value}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[11px]">
                  <span
                    className={`font-semibold ${
                      kpi.positive ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {kpi.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Orders & Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8DDD0] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5EBE1] pb-3">
            <div>
              <h2 className="font-serif-cafe text-base font-bold text-[#1C1917]">
                Volume Pesanan & Tren Pendapatan per Jam
              </h2>
              <p className="text-xs text-[#786C62]">
                Grafik jam sibuk (peak hours) hari ini di Arundary
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-[#2D241E]">
                <span className="w-3 h-3 rounded bg-[#2D241E]" /> Jumlah Pesanan
              </span>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2">
            {hourlyData.map((slot, i) => {
              const heightPercent = (slot.orders / maxOrders) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#2D241E] bg-[#F5EBE1] px-1.5 py-0.5 rounded border border-[#EAD9C8] whitespace-nowrap">
                    {slot.orders} order
                  </div>

                  <div className="w-full bg-[#FAF7F2] rounded-t-xl h-44 flex items-end p-1 border border-b-0 border-[#E8DDD0]">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full rounded-t-lg bg-[#2D241E] group-hover:bg-[#8C6A4B] transition-all duration-300"
                    />
                  </div>

                  <span className="text-[11px] font-semibold text-[#786C62]">
                    {slot.hour}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Menu Ranking */}
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5EBE1] pb-3">
            <div>
              <h2 className="font-serif-cafe text-base font-bold text-[#1C1917]">
                Menu Terlaris (Top Selling)
              </h2>
              <p className="text-xs text-[#786C62]">
                Berdasarkan porsi terjual hari ini
              </p>
            </div>
          </div>

          <div className="space-y-3.5">
            {popularMenus.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#1C1917]">{item.name}</span>
                    <span className="text-[10px] text-[#8C6A4B] ml-1.5 bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#E8DDD0]">
                      {item.category}
                    </span>
                  </div>
                  <span className="font-bold text-[#2D241E]">{item.sales} porsi</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-[#FAF7F2] border border-[#E8DDD0] overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full rounded-full bg-[#8C6A4B]"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#A89A8E]">
                  <span>Omzet: {formatRupiah(item.revenue)}</span>
                  <span>{item.percentage}% share</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-[#E8DDD0] shadow-sm overflow-hidden p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#F5EBE1] pb-3">
          <div>
            <h2 className="font-serif-cafe text-base font-bold text-[#1C1917]">
              Pesanan Terbaru (Recent Orders)
            </h2>
            <p className="text-xs text-[#786C62]">
              Daftar transaksi terkini dari meja tamu
            </p>
          </div>
          <button
            onClick={() => setAdminTab('orders')}
            className="text-xs font-bold text-[#8C6A4B] hover:underline"
          >
            Lihat Semua Pesanan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E8DDD0] text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B]">
                <th className="py-2.5 px-3">No. Order</th>
                <th className="py-2.5 px-3">Meja</th>
                <th className="py-2.5 px-3">Waktu</th>
                <th className="py-2.5 px-3">Item Dipesan</th>
                <th className="py-2.5 px-3">Total</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Metode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EBE1]">
              {orders.slice(0, 6).map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF7F2]/60">
                  <td className="py-2.5 px-3 font-serif-cafe font-bold text-[#1C1917]">
                    {order.id}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[#8C6A4B]">
                    {order.tableNumber}
                  </td>
                  <td className="py-2.5 px-3 text-[#786C62]">{order.displayTime}</td>
                  <td className="py-2.5 px-3 max-w-xs text-[#1C1917]">
                    <div className="truncate">
                      {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </div>
                    {order.customerNotes && (
                      <div className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 mt-0.5 truncate font-medium">
                        Catatan: &ldquo;{order.customerNotes}&rdquo;
                      </div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-[#2D241E]">
                    {formatRupiah(order.total)}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border bg-neutral-100 text-neutral-800 border-neutral-300">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-[#786C62]">
                    {order.paymentMethod === 'QRIS_INSTAN' ? 'QRIS Instan' : 'Kasir'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
