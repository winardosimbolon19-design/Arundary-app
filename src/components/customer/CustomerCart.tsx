import React from 'react';
import { useCafe } from '../../context/CafeContext';
import { formatRupiah } from '../../utils/formatters';
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  UtensilsCrossed,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

export const CustomerCart: React.FC = () => {
  const {
    currentTable,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartTax,
    cartServiceFee,
    cartTotal,
    setCustomerScreen,
  } = useCafe();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] p-6 flex flex-col justify-between max-w-2xl mx-auto">
        <div className="flex items-center justify-between py-2">
          <button
            onClick={() => setCustomerScreen('menu')}
            className="px-4 py-2 rounded-xl bg-white border border-[#E8DDD0] flex items-center gap-2 text-xs font-bold text-[#2D241E] hover:bg-[#F5EBE1] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Menu</span>
          </button>
          <span className="font-serif-cafe font-bold text-lg text-[#1C1917]">
            Keranjang Pesanan
          </span>
          <div className="w-24" />
        </div>

        <div className="my-auto text-center py-16 px-4 bg-white rounded-3xl border border-[#E8DDD0] shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#EFECE6] border border-[#E8DDD0] flex items-center justify-center mx-auto mb-4 text-[#8C6A4B]">
            <ShoppingBag className="w-10 h-10 opacity-70" />
          </div>
          <h2 className="font-serif-cafe text-2xl font-bold text-[#1C1917] mb-2">
            Keranjang Masih Kosong
          </h2>
          <p className="text-xs text-[#786C62] leading-relaxed max-w-sm mx-auto mb-6">
            Jelajahi menu Arundary Cafe and Space dan pilih sajian kopi, makanan utama, atau kudapan favoritmu.
          </p>
          <button
            onClick={() => setCustomerScreen('menu')}
            className="py-3 px-8 rounded-xl bg-[#2D241E] text-white text-xs font-bold hover:bg-[#1C1917] transition-all shadow-md cursor-pointer"
          >
            Buka Buku Menu
          </button>
        </div>

        <div className="text-center text-xs text-[#A89A8E] pb-4">
          Arundary Cafe & Space • {currentTable}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative flex flex-col">
      {/* Top Header */}
      <header className="bg-white rounded-2xl border border-[#E8DDD0] p-4 mb-6 shadow-xs flex items-center justify-between">
        <button
          onClick={() => setCustomerScreen('menu')}
          className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DDD0] flex items-center gap-2 text-xs font-bold text-[#2D241E] hover:bg-[#F5EBE1] cursor-pointer"
          aria-label="Kembali ke menu"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Kembali ke Menu</span>
        </button>

        <div className="text-center">
          <h1 className="font-serif-cafe font-bold text-lg sm:text-xl text-[#1C1917]">
            Keranjang Pesanan
          </h1>
          <p className="text-xs font-semibold text-[#8C6A4B]">
            Terhubung ke {currentTable}
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#8C6A4B] font-semibold hover:text-rose-600 transition-colors cursor-pointer px-3 py-2 rounded-xl hover:bg-rose-50"
          title="Kosongkan keranjang"
        >
          Kosongkan
        </button>
      </header>

      {/* Main Content Area: 2 Columns on desktop */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          {/* Table Confirmation Badge */}
          <div className="bg-[#F5EBE1] border border-[#EAD9C8] rounded-2xl p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-[#8C6A4B]" />
              <span className="text-[#574C43]">Pesanan untuk meja:</span>
            </div>
            <span className="font-bold text-[#1C1917] bg-white px-3 py-1 rounded-xl border border-[#E8DDD0]">
              {currentTable}
            </span>
          </div>

          {/* Item Rows */}
          <div className="space-y-3">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-xs flex gap-4 relative"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#EFECE6] shrink-0">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between pr-6">
                      <h3 className="font-serif-cafe text-base font-bold text-[#1C1917] leading-tight">
                        {item.menuItem.name}
                      </h3>
                    </div>

                    <p className="text-xs font-semibold text-[#8C6A4B] mt-0.5">
                      {formatRupiah(item.unitPrice)}
                    </p>

                    {/* Customization Details */}
                    {item.customization && (
                      <div className="text-[11px] text-[#786C62] mt-1.5 space-y-0.5">
                        {item.customization.iceLevel && (
                          <span className="inline-block bg-[#FAF7F2] px-2 py-0.5 rounded-lg border border-[#E8DDD0] mr-1">
                            {item.customization.iceLevel}
                          </span>
                        )}
                        {item.customization.sugarLevel && (
                          <span className="inline-block bg-[#FAF7F2] px-2 py-0.5 rounded-lg border border-[#E8DDD0] mr-1">
                            {item.customization.sugarLevel}
                          </span>
                        )}
                        {item.customization.extras?.map((ex, i) => (
                          <span
                            key={i}
                            className="inline-block bg-[#FAF7F2] px-2 py-0.5 rounded-lg border border-[#E8DDD0] mr-1"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Notes */}
                    {item.notes && (
                      <p className="text-[11px] text-[#A89A8E] italic mt-1 line-clamp-1">
                        &ldquo;{item.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Subtotal & Quantity Control */}
                  <div className="flex items-center justify-between pt-2 mt-3 border-t border-[#F5EBE1]">
                    <p className="text-xs font-bold text-[#2D241E]">
                      Subtotal: {formatRupiah(item.totalPrice)}
                    </p>

                    <div className="flex items-center border border-[#E8DDD0] rounded-xl bg-[#FAF7F2] p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-[#574C43] hover:text-[#1C1917] hover:bg-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#1C1917]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#574C43] hover:text-[#1C1917] hover:bg-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-3 right-3 p-1.5 text-[#A89A8E] hover:text-rose-600 transition-colors cursor-pointer rounded-lg hover:bg-rose-50"
                  title="Hapus menu ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-[#E8DDD0] p-6 shadow-sm space-y-4">
            <h2 className="font-serif-cafe text-base font-bold text-[#1C1917] border-b border-[#F5EBE1] pb-3">
              Ringkasan Pembayaran
            </h2>

            <div className="space-y-2 text-xs text-[#574C43]">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} item)</span>
                <span className="font-medium text-[#1C1917]">{formatRupiah(cartSubtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Pajak Restoran (PB1 10%)</span>
                <span className="font-medium text-[#1C1917]">{formatRupiah(cartTax)}</span>
              </div>

              <div className="flex justify-between">
                <span>Biaya Layanan & Meja</span>
                <span className="font-medium text-[#1C1917]">{formatRupiah(cartServiceFee)}</span>
              </div>
            </div>

            <div className="border-t border-[#E8DDD0] pt-4 flex justify-between items-baseline">
              <div>
                <span className="font-bold text-sm text-[#1C1917]">Total Pembayaran</span>
                <p className="text-[10px] text-[#A89A8E]">Sudah termasuk pajak & layanan</p>
              </div>
              <span className="font-serif-cafe font-bold text-xl text-[#2D241E]">
                {formatRupiah(cartTotal)}
              </span>
            </div>

            <button
              onClick={() => setCustomerScreen('confirmation')}
              className="w-full py-4 px-6 rounded-2xl bg-[#2D241E] hover:bg-[#1C1917] text-white font-bold text-sm shadow-md flex items-center justify-between transition-all active:scale-[0.99] cursor-pointer mt-4"
            >
              <div className="text-left">
                <p className="text-[10px] text-[#D9C3B0] font-normal leading-none uppercase tracking-wider">
                  Meja {currentTable}
                </p>
                <p className="font-bold text-sm leading-tight mt-0.5">
                  Lanjutkan Konfirmasi
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8C6A4B] text-white text-xs font-bold">
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>

          {/* Guarantee Badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#786C62] p-3 rounded-2xl bg-white border border-[#E8DDD0]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Pesanan langsung terhubung ke Barista & Kitchen Arundary</span>
          </div>
        </div>
      </main>
    </div>
  );
};
