import React from 'react';
import { useCafe } from '../../context/CafeContext';
import { formatRupiah } from '../../utils/formatters';
import { Order, OrderStatus } from '../../types';
import {
  BellRing,
  Coffee,
  ChefHat,
  Flame,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  UtensilsCrossed,
} from 'lucide-react';

interface ColumnDef {
  status: OrderStatus;
  title: string;
  icon: React.ElementType;
  color: string;
  badgeBg: string;
}

const KANBAN_COLUMNS: ColumnDef[] = [
  {
    status: 'PESANAN DITERIMA',
    title: 'PESANAN BARU',
    icon: BellRing,
    color: 'border-t-4 border-amber-500 bg-amber-50/30',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    status: 'SEDANG DISIAPKAN',
    title: 'SEDANG DISIAPKAN',
    icon: Coffee,
    color: 'border-t-4 border-blue-500 bg-blue-50/30',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  {
    status: 'SEDANG DIMASAK',
    title: 'SEDANG DIMASAK',
    icon: ChefHat,
    color: 'border-t-4 border-orange-500 bg-orange-50/30',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
  },
  {
    status: 'SIAP DIAMBIL',
    title: 'SIAP DIAMBIL',
    icon: Flame,
    color: 'border-t-4 border-emerald-500 bg-emerald-50/30',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  {
    status: 'SELESAI',
    title: 'SELESAI',
    icon: CheckCircle,
    color: 'border-t-4 border-stone-500 bg-stone-50/30',
    badgeBg: 'bg-stone-100 text-stone-900 border-stone-300',
  },
];

export const StaffKanban: React.FC = () => {
  const { orders, updateOrderStatus } = useCafe();

  const handleAdvance = (orderId: string, current: OrderStatus) => {
    const sequence: OrderStatus[] = [
      'PESANAN DITERIMA',
      'SEDANG DISIAPKAN',
      'SEDANG DIMASAK',
      'SIAP DIAMBIL',
      'SELESAI',
    ];
    const currentIndex = sequence.indexOf(current);
    if (currentIndex < sequence.length - 1) {
      updateOrderStatus(orderId, sequence[currentIndex + 1]);
    }
  };

  const handleStepBack = (orderId: string, current: OrderStatus) => {
    const sequence: OrderStatus[] = [
      'PESANAN DITERIMA',
      'SEDANG DISIAPKAN',
      'SEDANG DIMASAK',
      'SIAP DIAMBIL',
      'SELESAI',
    ];
    const currentIndex = sequence.indexOf(current);
    if (currentIndex > 0) {
      updateOrderStatus(orderId, sequence[currentIndex - 1]);
    }
  };

  const getButtonText = (status: OrderStatus) => {
    switch (status) {
      case 'PESANAN DITERIMA':
        return 'Mulai Siapkan';
      case 'SEDANG DISIAPKAN':
        return 'Masak Kitchen';
      case 'SEDANG DIMASAK':
        return 'Pesanan Siap';
      case 'SIAP DIAMBIL':
        return 'Tandai Selesai';
      default:
        return 'Tuntas';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B]">
            Alur Dapur & Counter
          </span>
          <h1 className="font-serif-cafe text-2xl md:text-3xl font-bold text-[#1C1917]">
            Kanban Status Pesanan
          </h1>
          <p className="text-xs text-[#786C62]">
            Geser atau klik tombol aksi pada kartu pesanan untuk mengupdate tahapan live ke pelanggan.
          </p>
        </div>
      </div>

      {/* Kanban Board 5 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start min-h-[600px] overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((col) => {
          const colOrders = orders.filter((o) => o.status === col.status);
          const ColIcon = col.icon;

          return (
            <div
              key={col.status}
              className={`rounded-2xl border border-[#E8DDD0] bg-white p-3 shadow-xs flex flex-col min-h-[500px] ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F5EBE1] mb-3">
                <div className="flex items-center gap-2">
                  <ColIcon className="w-4 h-4 text-[#8C6A4B]" />
                  <h3 className="font-serif-cafe font-bold text-xs tracking-wider text-[#1C1917]">
                    {col.title}
                  </h3>
                </div>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${col.badgeBg}`}
                >
                  {colOrders.length}
                </span>
              </div>

              {/* Order Cards Stack */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[750px] pr-1">
                {colOrders.length === 0 ? (
                  <div className="text-center py-12 px-2 text-[#A89A8E]">
                    <p className="text-xs italic">Tidak ada pesanan di tahap ini</p>
                  </div>
                ) : (
                  colOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] p-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      {/* Top Header Card */}
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-serif-cafe font-bold text-sm text-[#1C1917]">
                              {order.id}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-xs font-bold text-[#8C6A4B]">
                                {order.tableNumber}
                              </span>
                              <span className="text-[10px] text-[#A89A8E] flex items-center gap-0.5">
                                <Clock className="w-3 h-3" />
                                {order.displayTime}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-medium text-[#786C62] bg-white px-2 py-0.5 rounded border border-[#E8DDD0]">
                            {order.paymentMethod === 'QRIS_INSTAN' ? 'QRIS' : 'Kasir'}
                          </span>
                        </div>

                        {/* Items */}
                        <div className="my-2.5 space-y-1.5 bg-white rounded-lg p-2.5 border border-[#E8DDD0]/80">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-xs">
                              <div className="flex justify-between font-bold text-[#1C1917]">
                                <span>
                                  {item.quantity}x {item.name}
                                </span>
                              </div>
                              {item.customizationSummary && (
                                <p className="text-[10px] text-[#8C6A4B] pl-2">
                                  • {item.customizationSummary}
                                </p>
                              )}
                              {item.notes && (
                                <p className="text-[10px] text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 mt-0.5 flex items-center gap-1">
                                  <MessageSquare className="w-3 h-3 text-amber-700 shrink-0" />
                                  <span>&ldquo;{item.notes}&rdquo;</span>
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        {order.customerNotes && (
                          <div className="mb-2 p-2 rounded-lg bg-amber-100/80 border border-amber-300 text-xs">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-900 mb-0.5">
                              <MessageSquare className="w-3 h-3 text-amber-800" />
                              <span>Catatan Pelanggan:</span>
                            </div>
                            <p className="text-[11px] font-semibold text-amber-950 italic">
                              &ldquo;{order.customerNotes}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Total and Advance Action */}
                      <div className="pt-2 border-t border-[#E8DDD0] space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[10px] text-[#A89A8E]">Total:</span>
                          <span className="font-bold text-[#2D241E]">
                            {formatRupiah(order.total)}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1.5">
                          {col.status !== 'PESANAN DITERIMA' && (
                            <button
                              onClick={() => handleStepBack(order.id, order.status)}
                              className="p-1.5 rounded-lg bg-white border border-[#E8DDD0] hover:bg-neutral-100 text-[#574C43] transition-colors cursor-pointer"
                              title="Kembalikan ke status sebelumnya"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {col.status !== 'SELESAI' ? (
                            <button
                              onClick={() => handleAdvance(order.id, order.status)}
                              className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#2D241E] hover:bg-[#8C6A4B] active:scale-95 text-white font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>{getButtonText(order.status)}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <div className="flex-1 py-1 text-center text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200">
                              ✓ Pesanan Tuntas
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
