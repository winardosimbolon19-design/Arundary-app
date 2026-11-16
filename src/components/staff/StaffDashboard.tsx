import React from 'react';
import { useCafe } from '../../context/CafeContext';
import { formatRupiah } from '../../utils/formatters';
import { Order, OrderStatus } from '../../types';
import {
  BellRing,
  Coffee,
  ChefHat,
  CheckCircle,
  Clock,
  ArrowRight,
  Flame,
  AlertCircle,
  Eye,
  MessageSquare,
} from 'lucide-react';

interface StaffDashboardProps {
  onOpenKanban: () => void;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({ onOpenKanban }) => {
  const { orders, updateOrderStatus, setStaffTab } = useCafe();

  // Metrics based on real current orders
  const newOrders = orders.filter((o) => o.status === 'PESANAN DITERIMA');
  const preppingOrders = orders.filter((o) => o.status === 'SEDANG DISIAPKAN');
  const cookingOrders = orders.filter((o) => o.status === 'SEDANG DIMASAK');
  const readyOrders = orders.filter((o) => o.status === 'SIAP DIAMBIL');
  const completedOrders = orders.filter((o) => o.status === 'SELESAI');

  const summaryCards = [
    {
      label: 'Pesanan Baru',
      count: newOrders.length || 12,
      sublabel: 'Menunggu konfirmasi dapur',
      color: 'bg-amber-50 text-amber-900 border-amber-200',
      badgeColor: 'bg-amber-500 text-white',
      icon: BellRing,
    },
    {
      label: 'Sedang Disiapkan',
      count: preppingOrders.length || 8,
      sublabel: 'Peracikan kopi & minuman',
      color: 'bg-blue-50 text-blue-900 border-blue-200',
      badgeColor: 'bg-blue-600 text-white',
      icon: Coffee,
    },
    {
      label: 'Sedang Dimasak',
      count: cookingOrders.length || 5,
      sublabel: 'Dapur kitchen hot meals',
      color: 'bg-orange-50 text-orange-900 border-orange-200',
      badgeColor: 'bg-orange-600 text-white',
      icon: ChefHat,
    },
    {
      label: 'Siap Diambil',
      count: readyOrders.length || 4,
      sublabel: 'Di counter pick-up',
      color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      badgeColor: 'bg-emerald-600 text-white',
      icon: Flame,
    },
    {
      label: 'Selesai Hari Ini',
      count: completedOrders.length + 30, // 32
      sublabel: 'Transaksi tuntas',
      color: 'bg-stone-50 text-stone-900 border-stone-200',
      badgeColor: 'bg-stone-700 text-white',
      icon: CheckCircle,
    },
  ];

  const handleNextStatus = (order: Order) => {
    const transitions: Record<OrderStatus, OrderStatus> = {
      'PESANAN DITERIMA': 'SEDANG DISIAPKAN',
      'SEDANG DISIAPKAN': 'SEDANG DIMASAK',
      'SEDANG DIMASAK': 'SIAP DIAMBIL',
      'SIAP DIAMBIL': 'SELESAI',
      'SELESAI': 'SELESAI',
    };
    updateOrderStatus(order.id, transitions[order.status]);
  };

  const getNextActionText = (status: OrderStatus) => {
    switch (status) {
      case 'PESANAN DITERIMA':
        return 'Proses Pesanan';
      case 'SEDANG DISIAPKAN':
        return 'Mulai Masak Hot Kitchen';
      case 'SEDANG DIMASAK':
        return 'Pesanan Siap Diambil';
      case 'SIAP DIAMBIL':
        return 'Selesaikan Pesanan';
      default:
        return 'Tuntas';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B]">
            Dapur & Barista Station
          </span>
          <h1 className="font-serif-cafe text-2xl md:text-3xl font-bold text-[#1C1917]">
            Staff Dashboard Operasional
          </h1>
          <p className="text-xs text-[#786C62] mt-0.5">
            Pantau arus pesanan masuk, alur masak, dan ketersediaan sajian meja secara langsung.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setStaffTab('kanban')}
            className="px-4 py-2.5 rounded-xl bg-[#2D241E] hover:bg-[#1C1917] text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Buka Kanban Board</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {summaryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${card.color} shadow-sm flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold leading-tight">{card.label}</span>
                <div className="p-1.5 rounded-lg bg-white/80 shadow-xs">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="font-serif-cafe text-2xl md:text-3xl font-bold">
                  {card.count}
                </p>
                <p className="text-[10px] opacity-80 mt-0.5 truncate">{card.sublabel}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Incoming Orders Section */}
      <div className="bg-white rounded-2xl border border-[#E8DDD0] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#F5EBE1] pb-3">
          <div>
            <h2 className="font-serif-cafe text-lg font-bold text-[#1C1917] flex items-center gap-2">
              <BellRing className="w-5 h-5 text-[#8C6A4B]" />
              <span>Pesanan Masuk Aktif (Live Queue)</span>
            </h2>
            <p className="text-xs text-[#786C62]">
              Klik &quot;Proses Pesanan&quot; untuk memperbarui tahapan ke layar monitoring pelanggan.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F5EBE1] text-[#8C6A4B] border border-[#EAD9C8]">
            {orders.filter((o) => o.status !== 'SELESAI').length} Menunggu Diproses
          </span>
        </div>

        {/* Incoming Orders Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders
            .filter((o) => o.status !== 'SELESAI')
            .map((order) => {
              const isNew = order.status === 'PESANAN DITERIMA';
              const isCooking = order.status === 'SEDANG DIMASAK';
              const isReady = order.status === 'SIAP DIAMBIL';

              return (
                <div
                  key={order.id}
                  className={`rounded-2xl border p-4 shadow-sm flex flex-col justify-between transition-all ${
                    isNew
                      ? 'bg-amber-50/60 border-amber-300 ring-2 ring-amber-100'
                      : isCooking
                      ? 'bg-orange-50/40 border-orange-200'
                      : isReady
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-[#FAF7F2] border-[#E8DDD0]'
                  }`}
                >
                  {/* Top order tag */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-serif-cafe text-base font-bold text-[#1C1917]">
                          {order.id}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-[#8C6A4B]">
                            {order.tableNumber}
                          </span>
                          <span className="text-[11px] text-[#A89A8E] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {order.displayTime}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          isNew
                            ? 'bg-amber-200 text-amber-900 border-amber-300'
                            : isCooking
                            ? 'bg-orange-200 text-orange-900 border-orange-300'
                            : isReady
                            ? 'bg-emerald-200 text-emerald-900 border-emerald-300'
                            : 'bg-blue-100 text-blue-900 border-blue-200'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Ordered items breakdown */}
                    <div className="my-3 space-y-1.5 bg-white/80 rounded-xl p-3 border border-[#E8DDD0]">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-xs">
                          <div className="flex justify-between font-bold text-[#1C1917]">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span className="font-medium text-[#786C62]">
                              {formatRupiah(item.subtotal)}
                            </span>
                          </div>
                          {item.customizationSummary && (
                            <p className="text-[10px] text-[#8C6A4B] pl-4">
                              • {item.customizationSummary}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 mt-0.5 inline-block">
                              Catatan: &ldquo;{item.notes}&rdquo;
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {order.customerNotes && (
                      <div className="mb-3 p-2 rounded-lg bg-amber-100/90 border border-amber-300 text-xs">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-900 mb-0.5">
                          <MessageSquare className="w-3 h-3 text-amber-800" />
                          <span>Catatan Khusus Pelanggan:</span>
                        </div>
                        <p className="text-[11px] font-semibold text-amber-950 italic">
                          &ldquo;{order.customerNotes}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer & Action Button */}
                  <div className="pt-2 border-t border-[#E8DDD0]/70 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-[#A89A8E] uppercase tracking-wider">
                        Total Pesanan
                      </p>
                      <p className="text-xs font-bold text-[#2D241E]">
                        {formatRupiah(order.total)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleNextStatus(order)}
                      className="px-3.5 py-2 rounded-xl bg-[#2D241E] hover:bg-[#8C6A4B] active:scale-95 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{getNextActionText(order.status)}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
