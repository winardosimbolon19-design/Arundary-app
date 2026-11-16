import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import { formatRupiah } from '../../utils/formatters';
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  QrCode,
  ShieldCheck,
  User,
  UtensilsCrossed,
  MessageSquareText,
  Sparkles,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';

const QUICK_SUGGESTIONS = [
  'No ice',
  'Extra topping',
  'Less sugar',
  'Gula dipisah',
  'Sajikan barengan',
  'Sendok & tissue ekstra',
];

export const CustomerOrderConfirmation: React.FC = () => {
  const {
    currentTable,
    cart,
    cartSubtotal,
    cartTax,
    cartServiceFee,
    cartTotal,
    setCustomerScreen,
    placeOrder,
  } = useCafe();

  const [customerName, setCustomerName] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'KASIR_TUNAI_QRIS' | 'QRIS_INSTAN'>('KASIR_TUNAI_QRIS');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSuggestion = (suggestion: string) => {
    if (!customerNotes.trim()) {
      setCustomerNotes(suggestion);
    } else {
      if (!customerNotes.toLowerCase().includes(suggestion.toLowerCase())) {
        setCustomerNotes((prev) => `${prev.trim()}, ${suggestion}`);
      } else {
        // Toggle off if already present
        const regex = new RegExp(`(^|,\\s*)${suggestion}`, 'i');
        const updated = customerNotes.replace(regex, '').replace(/^,\s*/, '').trim();
        setCustomerNotes(updated);
      }
    }
  };

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    // Simulate swift server processing
    setTimeout(() => {
      placeOrder(
        paymentMethod,
        customerName.trim() || undefined,
        customerNotes.trim() || undefined
      );
      setIsSubmitting(false);
      setCustomerScreen('success');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-32 max-w-xl mx-auto px-4 py-4 relative flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DDD0] px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setCustomerScreen('cart')}
          className="w-9 h-9 rounded-full bg-white border border-[#E8DDD0] flex items-center justify-center text-[#2D241E] hover:bg-[#F5EBE1] cursor-pointer"
          aria-label="Kembali ke keranjang"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <h1 className="font-serif-cafe font-bold text-base text-[#1C1917]">
            Konfirmasi Pesanan
          </h1>
          <p className="text-[11px] font-semibold text-[#8C6A4B]">
            {currentTable}
          </p>
        </div>

        <div className="w-9" />
      </header>

      {/* Main Confirmation Content */}
      <main className="p-4 space-y-4">
        {/* Brand Banner */}
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 text-center shadow-sm">
          <div className="flex justify-center mb-2">
            <ArundaryLogo size={60} variant="circular" />
          </div>
          <h2 className="font-serif-cafe font-bold text-lg text-[#1C1917] tracking-wider">
            ARUNDARY CAFE AND SPACE
          </h2>
          <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-[#F5EBE1] border border-[#EAD9C8] text-xs font-bold text-[#8C6A4B]">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Table: {currentTable.replace('Table ', '')}</span>
          </div>
        </div>

        {/* Customer Name Input (Optional) */}
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#2D241E] mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#8C6A4B]" />
            <span>Nama Pemesan (Opsional)</span>
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Masukkan namamu (contoh: Alex)"
            className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-sm text-[#1C1917] placeholder-[#A89A8E] focus:outline-none focus:border-[#8C6A4B]"
          />
          <p className="text-[11px] text-[#A89A8E] mt-1">
            Nama akan dipanggil staf saat pesanan siap diantar atau diambil.
          </p>
        </div>

        {/* Items Review Card */}
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#F5EBE1] pb-2">
            <h3 className="font-serif-cafe text-sm font-bold text-[#1C1917]">
              Daftar Pesanan ({cart.length} Jenis Menu)
            </h3>
            <span className="text-[11px] font-semibold text-[#8C6A4B]">{currentTable}</span>
          </div>

          <div className="divide-y divide-[#F5EBE1] space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="pt-2 first:pt-0 flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1C1917]">
                    {item.quantity}x {item.menuItem.name}
                  </p>
                  {item.customization && (
                    <p className="text-[11px] text-[#786C62]">
                      {[
                        item.customization.iceLevel,
                        item.customization.sugarLevel,
                        ...(item.customization.extras || []),
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  )}
                  {item.notes && (
                    <p className="text-[10px] text-[#A89A8E] italic">
                      Catatan: {item.notes}
                    </p>
                  )}
                </div>
                <span className="text-xs font-bold text-[#2D241E]">
                  {formatRupiah(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals Breakdown */}
          <div className="pt-3 border-t border-[#E8DDD0] space-y-1.5 text-xs text-[#574C43]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[#1C1917]">{formatRupiah(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Pajak (PB1 10%)</span>
              <span className="font-medium text-[#1C1917]">{formatRupiah(cartTax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Layanan</span>
              <span className="font-medium text-[#1C1917]">{formatRupiah(cartServiceFee)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#E8DDD0] font-bold text-sm text-[#1C1917]">
              <span>Total Pesanan</span>
              <span className="font-serif-cafe text-base text-[#2D241E]">
                {formatRupiah(cartTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Note / Special Request Input Card */}
        <div id="customer-order-notes-card" className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="customer-order-notes-input"
              className="text-xs font-bold uppercase tracking-wider text-[#2D241E] flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquareText className="w-3.5 h-3.5 text-[#8C6A4B]" />
              <span>Catatan Khusus Pesanan (Opsional)</span>
            </label>
            {customerNotes && (
              <button
                type="button"
                id="btn-clear-customer-notes"
                onClick={() => setCustomerNotes('')}
                className="text-[11px] font-semibold text-[#8C6A4B] hover:text-[#2D241E] flex items-center gap-0.5 cursor-pointer"
                title="Hapus catatan"
              >
                <X className="w-3 h-3" />
                <span>Hapus</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-[#786C62] leading-relaxed">
            Punya permintaan khusus untuk seluruh pesanan? Contoh: <span className="font-semibold text-[#2D241E]">'no ice'</span>, <span className="font-semibold text-[#2D241E]">'extra topping'</span>, atau instruksi penyajian lainnya langsung ke barista & dapur.
          </p>

          {/* Quick Request Suggestion Chips */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A89A8E]">
              Pilihan Cepat:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_SUGGESTIONS.map((suggestion) => {
                const isSelected = customerNotes
                  .toLowerCase()
                  .includes(suggestion.toLowerCase());
                return (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleAddSuggestion(suggestion)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-1 active:scale-95 ${
                      isSelected
                        ? 'bg-[#2D241E] text-white border-[#2D241E] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#574C43] border-[#E8DDD0] hover:bg-[#F5EBE1] hover:text-[#1C1917]'
                    }`}
                  >
                    <Sparkles
                      className={`w-2.5 h-2.5 ${
                        isSelected ? 'text-[#D9C3B0]' : 'text-[#8C6A4B]'
                      }`}
                    />
                    <span>{suggestion}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Note Textarea */}
          <div className="relative">
            <textarea
              id="customer-order-notes-input"
              rows={3}
              maxLength={250}
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="Contoh: Tolong no ice untuk semua minuman, extra topping boba, atau tolong hangatkan croissant..."
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-sm text-[#1C1917] placeholder-[#A89A8E] focus:outline-none focus:border-[#8C6A4B] focus:bg-white transition-all resize-none"
            />
            <div className="flex justify-between items-center text-[10px] text-[#A89A8E] px-1 mt-1">
              <span>Catatan ini akan dicetak di struk & monitor dapur</span>
              <span className={customerNotes.length > 200 ? 'text-amber-700 font-bold' : ''}>
                {customerNotes.length}/250
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#2D241E]">
            Metode Pembayaran
          </label>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('KASIR_TUNAI_QRIS')}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                paymentMethod === 'KASIR_TUNAI_QRIS'
                  ? 'bg-[#F5EBE1] border-[#8C6A4B] text-[#2D241E]'
                  : 'bg-white border-[#E8DDD0] text-[#574C43] hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DDD0] flex items-center justify-center text-[#8C6A4B]">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">Bayar di Kasir (Cash / Debit / QRIS)</p>
                  <p className="text-[11px] text-[#786C62]">
                    Bayar langsung ke kasir setelah pesanan selesai
                  </p>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  paymentMethod === 'KASIR_TUNAI_QRIS'
                    ? 'border-[#8C6A4B] bg-[#8C6A4B]'
                    : 'border-[#D6CBBF]'
                }`}
              >
                {paymentMethod === 'KASIR_TUNAI_QRIS' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('QRIS_INSTAN')}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                paymentMethod === 'QRIS_INSTAN'
                  ? 'bg-[#F5EBE1] border-[#8C6A4B] text-[#2D241E]'
                  : 'bg-white border-[#E8DDD0] text-[#574C43] hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DDD0] flex items-center justify-center text-[#8C6A4B]">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">QRIS Instan Langsung</p>
                  <p className="text-[11px] text-[#786C62]">
                    Scan QRIS via BCA, GoPay, OVO, ShopeePay
                  </p>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  paymentMethod === 'QRIS_INSTAN'
                    ? 'border-[#8C6A4B] bg-[#8C6A4B]'
                    : 'border-[#D6CBBF]'
                }`}
              >
                {paymentMethod === 'QRIS_INSTAN' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#786C62] text-center px-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Setelah konfirmasi, pesanan langsung dimasak oleh barista & koki Arundary</span>
        </div>
      </main>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E8DDD0] p-4 max-w-xl mx-auto z-30 shadow-lg">
        <button
          onClick={handleConfirmOrder}
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-2xl bg-[#2D241E] hover:bg-[#1C1917] disabled:opacity-50 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Memproses Pesanan...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Konfirmasi Pesanan ({formatRupiah(cartTotal)})</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
