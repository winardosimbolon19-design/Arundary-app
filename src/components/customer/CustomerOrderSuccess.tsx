import React, { useEffect } from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import { CheckCircle2, ArrowRight, BookOpen, Clock, UtensilsCrossed, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

export const CustomerOrderSuccess: React.FC = () => {
  const { currentTable, activeOrder, setCustomerScreen } = useCafe();

  useEffect(() => {
    // Fire celebratory cafe confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#8C6A4B', '#2D241E', '#D9C3B0', '#10B981'],
    });
  }, []);

  const orderId = activeOrder?.id || '#ARD-1025';

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-4 sm:p-8 flex flex-col justify-between max-w-lg mx-auto relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-20 -right-20 w-52 h-52 bg-[#EFE3D5] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-[#F2E8DC] rounded-full blur-3xl opacity-70 pointer-events-none" />

      {/* Top Brand Marker */}
      <div className="text-center pt-3 relative z-10">
        <ArundaryLogo size={60} variant="circular" className="mx-auto" />
      </div>

      {/* Center Success Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="my-auto py-6 text-center relative z-10 space-y-4"
      >
        {/* Animated Check Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <h1 className="font-serif-cafe text-2xl font-bold text-[#1C1917]">
            Pesanan Berhasil!
          </h1>
          <p className="text-xs text-[#574C43] max-w-xs mx-auto leading-relaxed">
            Pesanan kamu telah diterima oleh Arundary.
          </p>
        </div>

        {/* Order Details Badge Card */}
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm space-y-3 text-left">
          <div className="flex items-center justify-between border-b border-[#F5EBE1] pb-2.5">
            <span className="text-xs text-[#786C62]">Nomor Pesanan</span>
            <span className="font-serif-cafe font-bold text-base text-[#2D241E] tracking-wider">
              {orderId}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-[#F5EBE1] pb-2.5">
            <span className="text-xs text-[#786C62]">Meja</span>
            <span className="text-xs font-bold text-[#1C1917] bg-[#F5EBE1] px-2.5 py-0.5 rounded-full border border-[#EAD9C8] flex items-center gap-1">
              <UtensilsCrossed className="w-3 h-3 text-[#8C6A4B]" />
              {currentTable}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-[#786C62]">Perkiraan Waktu</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              10–15 menit
            </span>
          </div>

          {activeOrder?.customerNotes && (
            <div className="pt-2 border-t border-[#F5EBE1] space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#8C6A4B]">
                <MessageSquare className="w-3 h-3 text-[#8C6A4B]" />
                <span>Catatan Khusus untuk Dapur:</span>
              </div>
              <p className="text-xs bg-[#FAF7F2] p-2 rounded-lg border border-[#E8DDD0] text-[#2D241E] italic">
                &ldquo;{activeOrder.customerNotes}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Informational reassurance */}
        <p className="text-[11px] text-[#A89A8E] leading-relaxed max-w-xs mx-auto">
          Kamu dapat memantau proses memasak dan persiapan hidangan secara langsung melalui layar pantau pesanan.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <div className="relative z-10 space-y-2.5 pb-2">
        <button
          onClick={() => setCustomerScreen('monitoring')}
          className="w-full py-4 px-6 rounded-2xl bg-[#2D241E] hover:bg-[#1C1917] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
        >
          <span>Pantau Pesanan</span>
          <ArrowRight className="w-4 h-4 text-[#D9C3B0]" />
        </button>

        <button
          onClick={() => setCustomerScreen('menu')}
          className="w-full py-3 px-6 rounded-2xl bg-white border border-[#E8DDD0] hover:bg-[#F5EBE1] text-[#2D241E] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#8C6A4B]" />
          <span>Kembali ke Menu</span>
        </button>
      </div>
    </div>
  );
};
