import React from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import { formatRupiah } from '../../utils/formatters';
import { OrderStatus } from '../../types';
import {
  ArrowLeft,
  Check,
  Clock,
  Coffee,
  ChefHat,
  BellRing,
  CheckCircle,
  UtensilsCrossed,
  RefreshCw,
  ShoppingBag,
  MessageSquare,
} from 'lucide-react';
import { motion } from 'motion/react';

interface StageConfig {
  status: OrderStatus;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const STAGES: StageConfig[] = [
  {
    status: 'PESANAN DITERIMA',
    label: 'Pesanan Diterima',
    sublabel: 'Pesanan telah masuk ke antrean sistem dapur',
    icon: BellRing,
  },
  {
    status: 'SEDANG DISIAPKAN',
    label: 'Sedang Disiapkan',
    sublabel: 'Bahan dan peralatan sedang disiapkan oleh barista & kru',
    icon: Coffee,
  },
  {
    status: 'SEDANG DIMASAK',
    label: 'Sedang Dimasak',
    sublabel: 'Pesanan kamu sedang diproses oleh tim Arundary.',
    icon: ChefHat,
  },
  {
    status: 'SIAP DIAMBIL',
    label: 'Siap Diambil',
    sublabel: 'Silakan ambil di counter bar atau tunggu staf mengantarkan',
    icon: BellRing,
  },
  {
    status: 'SELESAI',
    label: 'Selesai',
    sublabel: 'Selamat menikmati sajian di Arundary Cafe and Space',
    icon: CheckCircle,
  },
];

export const CustomerOrderMonitoring: React.FC = () => {
  const {
    currentTable,
    activeOrder,
    orders,
    setCustomerScreen,
    updateOrderStatus,
  } = useCafe();

  // If no active order in state, grab the most recent one for current table or first order
  const order =
    activeOrder ||
    orders.find((o) => o.tableNumber === currentTable) ||
    orders[0];

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] p-4 flex flex-col justify-between max-w-md mx-auto">
        <header className="flex items-center justify-between py-2">
          <button
            onClick={() => setCustomerScreen('menu')}
            className="w-9 h-9 rounded-full bg-white border border-[#E8DDD0] flex items-center justify-center text-[#2D241E]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-serif-cafe font-bold text-base text-[#1C1917]">
            Pantau Pesanan
          </span>
          <div className="w-9" />
        </header>

        <div className="text-center py-16">
          <p className="font-serif-cafe text-lg font-bold text-[#1C1917]">
            Belum Ada Pesanan Aktif
          </p>
          <p className="text-xs text-[#786C62] mt-1 mb-4">
            Silakan pilih menu terlebih dahulu untuk membuat pesanan.
          </p>
          <button
            onClick={() => setCustomerScreen('menu')}
            className="py-2.5 px-5 bg-[#2D241E] text-white text-xs font-bold rounded-xl"
          >
            Lihat Menu
          </button>
        </div>
      </div>
    );
  }

  // Determine index of current status
  const currentStageIndex = STAGES.findIndex((s) => s.status === order.status);
  const activeStage = STAGES[currentStageIndex] || STAGES[0];

  const getStageState = (index: number): 'completed' | 'current' | 'upcoming' => {
    if (index < currentStageIndex) return 'completed';
    if (index === currentStageIndex) return 'current';
    return 'upcoming';
  };

  // Helper for quick demonstration
  const handleQuickAdvance = () => {
    if (currentStageIndex < STAGES.length - 1) {
      const nextStatus = STAGES[currentStageIndex + 1].status;
      updateOrderStatus(order.id, nextStatus);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-32 max-w-2xl mx-auto px-4 py-4 relative flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DDD0] px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setCustomerScreen('menu')}
          className="w-9 h-9 rounded-full bg-white border border-[#E8DDD0] flex items-center justify-center text-[#2D241E] hover:bg-[#F5EBE1] cursor-pointer"
          title="Kembali ke menu"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <h1 className="font-serif-cafe font-bold text-base text-[#1C1917]">
            Status Pesanan Real-Time
          </h1>
          <p className="text-[11px] font-semibold text-[#8C6A4B]">
            {order.tableNumber}
          </p>
        </div>

        {/* Quick Return to Menu icon */}
        <button
          onClick={() => setCustomerScreen('menu')}
          className="p-2 rounded-full bg-white border border-[#E8DDD0] text-[#2D241E] hover:bg-[#F5EBE1] cursor-pointer"
          title="Buka menu lagi"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </header>

      {/* Main Monitoring Content */}
      <main className="p-4 space-y-4">
        {/* Order Identifier Header Card */}
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-[#8C6A4B] uppercase">
                ORDER {order.id}
              </p>
              <h2 className="font-serif-cafe text-xl font-bold text-[#1C1917] mt-0.5">
                {order.tableNumber.toUpperCase()}
              </h2>
            </div>
            <ArundaryLogo size={48} variant="circular" />
          </div>

          {/* Current Status Highlight Banner */}
          <div className="mt-3 p-3 rounded-xl bg-[#F5EBE1] border border-[#EAD9C8] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#8C6A4B]">
                  Status Terkini
                </p>
                <p className="text-xs font-bold text-[#1C1917]">
                  {activeStage.label}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-[#786C62]">Estimasi Waktu</p>
              <p className="text-xs font-bold text-emerald-800 flex items-center gap-1 justify-end">
                <Clock className="w-3 h-3" />
                {order.status === 'SELESAI' ? 'Selesai' : '10–15 menit'}
              </p>
            </div>
          </div>

          <p className="text-xs text-[#574C43] mt-2.5 leading-relaxed font-medium">
            {activeStage.sublabel}
          </p>

          {/* Demo test helper button to advance status */}
          <div className="mt-3 pt-2.5 border-t border-[#F5EBE1] flex items-center justify-between text-[11px]">
            <span className="text-[#A89A8E]">Simulasi Live Dapur:</span>
            <button
              onClick={handleQuickAdvance}
              disabled={currentStageIndex >= STAGES.length - 1}
              className="inline-flex items-center gap-1 text-[#8C6A4B] font-bold hover:text-[#2D241E] disabled:opacity-30 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              {currentStageIndex >= STAGES.length - 1 ? 'Pesanan Selesai' : 'Percepat Status'}
            </button>
          </div>
        </div>

        {/* Vertical Timeline Tracker */}
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm space-y-4">
          <h3 className="font-serif-cafe text-sm font-bold text-[#1C1917] border-b border-[#F5EBE1] pb-2">
            Progres Pesanan
          </h3>

          <div className="relative pl-6 space-y-6">
            {/* Connecting Vertical Line */}
            <div className="absolute left-[17px] top-3 bottom-3 w-0.5 bg-[#E8DDD0]" />

            {STAGES.map((stage, idx) => {
              const state = getStageState(idx);
              const isCompleted = state === 'completed';
              const isCurrent = state === 'current';
              const isUpcoming = state === 'upcoming';
              const Icon = stage.icon;
              const timestamp = order.statusTimestamps?.[stage.status];

              return (
                <div key={stage.status} className="relative flex items-start gap-3.5">
                  {/* Circle Indicator */}
                  <div
                    className={`absolute -left-6 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all z-10 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-50'
                        : isCurrent
                        ? 'bg-[#2D241E] text-white shadow-md ring-4 ring-[#F5EBE1] animate-pulse'
                        : 'bg-white border-2 border-[#D6CBBF] text-[#A89A8E]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D9C3B0]" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#D6CBBF]" />
                    )}
                  </div>

                  {/* Stage Label & Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-xs font-bold leading-tight ${
                          isCurrent
                            ? 'text-[#1C1917] font-serif-cafe text-sm'
                            : isCompleted
                            ? 'text-emerald-800'
                            : 'text-[#A89A8E]'
                        }`}
                      >
                        {isCompleted && '✓ '}
                        {isCurrent && '● '}
                        {isUpcoming && '○ '}
                        {stage.label}
                      </p>

                      {timestamp && (
                        <span className="text-[10px] font-medium text-[#8C6A4B] bg-[#F5EBE1] px-1.5 py-0.5 rounded">
                          {timestamp}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-[11px] mt-0.5 leading-normal ${
                        isCurrent
                          ? 'text-[#574C43] font-medium'
                          : isCompleted
                          ? 'text-[#786C62]'
                          : 'text-[#C4B7AA]'
                      }`}
                    >
                      {stage.sublabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ordered Items & Bill Summary */}
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#F5EBE1] pb-2">
            <h3 className="font-serif-cafe text-sm font-bold text-[#1C1917]">
              Rincian Menu Dipesan
            </h3>
            <span className="text-[11px] font-medium text-[#786C62]">
              Jam: {order.displayTime}
            </span>
          </div>

          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between items-start text-xs">
                <div>
                  <p className="font-bold text-[#1C1917]">
                    {item.quantity}x {item.name}
                  </p>
                  {item.customizationSummary && (
                    <p className="text-[10px] text-[#786C62]">
                      {item.customizationSummary}
                    </p>
                  )}
                  {item.notes && (
                    <p className="text-[10px] text-[#A89A8E] italic">
                      Catatan: {item.notes}
                    </p>
                  )}
                </div>
                <span className="font-semibold text-[#2D241E]">
                  {formatRupiah(item.subtotal)}
                </span>
              </div>
            ))}
          </div>

          {order.customerNotes && (
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DDD0] space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8C6A4B]">
                <MessageSquare className="w-3.5 h-3.5 text-[#8C6A4B]" />
                <span>Catatan Khusus Kamu untuk Dapur:</span>
              </div>
              <p className="text-xs text-[#2D241E] italic bg-white p-2.5 rounded-lg border border-[#EAD9C8]">
                &ldquo;{order.customerNotes}&rdquo;
              </p>
            </div>
          )}

          <div className="border-t border-[#E8DDD0] pt-2 flex justify-between items-center text-xs font-bold text-[#1C1917]">
            <span>Total Pembayaran</span>
            <span className="font-serif-cafe text-base text-[#2D241E]">
              {formatRupiah(order.total)}
            </span>
          </div>
        </div>
      </main>

      {/* Floating Bottom Menu Access */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E8DDD0] p-4 max-w-md mx-auto z-30 shadow-lg">
        <button
          onClick={() => setCustomerScreen('menu')}
          className="w-full py-3.5 px-4 rounded-xl bg-white border border-[#2D241E] hover:bg-[#FAF7F2] text-[#2D241E] font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <UtensilsCrossed className="w-4 h-4 text-[#8C6A4B]" />
          <span>Kembali ke Buku Menu (Status Tetap Aktif)</span>
        </button>
      </div>
    </div>
  );
};
