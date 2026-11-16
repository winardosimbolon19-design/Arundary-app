import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { formatRupiah, getStockStatus } from '../../utils/formatters';
import { CustomizationSelection } from '../../types';
import {
  ArrowLeft,
  Minus,
  Plus,
  Clock,
  Sparkles,
  ShoppingBag,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';

export const CustomerMenuDetail: React.FC = () => {
  const { selectedMenuItem, setCustomerScreen, addToCart } = useCafe();

  const [quantity, setQuantity] = useState(1);
  const [iceLevel, setIceLevel] = useState<'Normal Ice' | 'Less Ice' | 'No Ice'>('Normal Ice');
  const [sugarLevel, setSugarLevel] = useState<'Normal Sugar' | 'Less Sugar' | 'No Sugar'>('Normal Sugar');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  if (!selectedMenuItem) {
    setCustomerScreen('menu');
    return null;
  }

  const isBeverage =
    selectedMenuItem.category === 'Coffee' || selectedMenuItem.category === 'Non Coffee';
  const isFood =
    selectedMenuItem.category === 'Main Course' || selectedMenuItem.category === 'Snack';

  const stockStatus = getStockStatus(selectedMenuItem);
  const isOut = stockStatus === 'OUT OF STOCK';

  const toggleExtra = (extra: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    if (isOut) return;

    const customization: CustomizationSelection = {
      ...(isBeverage ? { iceLevel, sugarLevel } : {}),
      extras: selectedExtras.length > 0 ? selectedExtras : undefined,
    };

    addToCart(selectedMenuItem, quantity, customization, notes.trim() || undefined);
    setCustomerScreen('menu');
  };

  const itemTotal = selectedMenuItem.price * quantity;

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-32 max-w-md mx-auto relative flex flex-col">
      {/* Top Floating Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => setCustomerScreen('menu')}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-[#E8DDD0] flex items-center justify-center text-[#2D241E] hover:bg-white transition-all cursor-pointer"
          aria-label="Kembali ke Menu"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Large Menu Image */}
      <div className="relative w-full h-72 bg-[#E8DDD0] overflow-hidden">
        <img
          src={selectedMenuItem.image}
          alt={selectedMenuItem.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover ${isOut ? 'grayscale contrast-75' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Badges on Image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Estimasi {selectedMenuItem.preparationTimeMinutes} Menit
          </span>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border ${
              isOut
                ? 'bg-rose-600/90 text-white border-rose-400'
                : stockStatus === 'LOW STOCK'
                ? 'bg-amber-500/90 text-white border-amber-300'
                : 'bg-emerald-600/80 text-white border-emerald-400'
            }`}
          >
            {isOut
              ? 'STOK HABIS'
              : stockStatus === 'LOW STOCK'
              ? `Tersisa ${selectedMenuItem.stock}`
              : 'Tersedia'}
          </span>
        </div>
      </div>

      {/* Content Sheet */}
      <div className="p-4 sm:p-5 space-y-6">
        {/* Title, Category & Price */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B] bg-[#F5EBE1] px-2.5 py-0.5 rounded-full border border-[#EAD9C8]">
              {selectedMenuItem.category}
            </span>
            {selectedMenuItem.popular && (
              <span className="text-[11px] font-bold text-[#8C6A4B] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Rekomendasi Barista
              </span>
            )}
          </div>

          <h1 className="font-serif-cafe text-2xl font-bold text-[#1C1917] leading-tight">
            {selectedMenuItem.name}
          </h1>

          <p className="font-bold text-xl text-[#2D241E] mt-2">
            {formatRupiah(selectedMenuItem.price)}
          </p>

          <p className="text-sm text-[#786C62] leading-relaxed mt-2">
            {selectedMenuItem.description}
          </p>
        </div>

        {/* Optional Customizations for Beverages */}
        {isBeverage && !isOut && (
          <div className="space-y-4 pt-2 border-t border-[#E8DDD0]">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D241E] mb-2">
                Level Es (Ice Level)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Normal Ice', 'Less Ice', 'No Ice'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setIceLevel(lvl)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      iceLevel === lvl
                        ? 'bg-[#2D241E] text-white border-[#2D241E] shadow-sm'
                        : 'bg-white text-[#574C43] border-[#E8DDD0] hover:bg-[#F5EBE1]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D241E] mb-2">
                Level Gula (Sugar Level)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Normal Sugar', 'Less Sugar', 'No Sugar'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSugarLevel(lvl)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      sugarLevel === lvl
                        ? 'bg-[#2D241E] text-white border-[#2D241E] shadow-sm'
                        : 'bg-white text-[#574C43] border-[#E8DDD0] hover:bg-[#F5EBE1]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Extra Options */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D241E] mb-2">
                Opsi Tambahan (Opsional)
              </label>
              <div className="space-y-2">
                {['Extra Espresso Shot (+Rp5.000)', 'Oat Milk Sub (+Rp8.000)'].map((extra) => {
                  const isChecked = selectedExtras.includes(extra);
                  return (
                    <button
                      key={extra}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
                        isChecked
                          ? 'bg-[#F5EBE1] border-[#8C6A4B] text-[#2D241E]'
                          : 'bg-white border-[#E8DDD0] text-[#574C43]'
                      }`}
                    >
                      <span>{extra}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isChecked
                            ? 'bg-[#8C6A4B] border-[#8C6A4B] text-white'
                            : 'border-[#D6CBBF] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Optional Customizations for Food/Snacks */}
        {isFood && !isOut && (
          <div className="space-y-4 pt-2 border-t border-[#E8DDD0]">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D241E] mb-2">
                Tambahan & Saus (Opsional)
              </label>
              <div className="space-y-2">
                {['Extra Sauce', 'Extra Cheese (+Rp4.000)', 'Sambal Dipisah'].map((extra) => {
                  const isChecked = selectedExtras.includes(extra);
                  return (
                    <button
                      key={extra}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
                        isChecked
                          ? 'bg-[#F5EBE1] border-[#8C6A4B] text-[#2D241E]'
                          : 'bg-white border-[#E8DDD0] text-[#574C43]'
                      }`}
                    >
                      <span>{extra}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isChecked
                            ? 'bg-[#8C6A4B] border-[#8C6A4B] text-white'
                            : 'border-[#D6CBBF] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Customer Notes Field */}
        <div className="pt-2 border-t border-[#E8DDD0]">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#2D241E] mb-2">
            Catatan Khusus
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Catatan untuk pesanan... (contoh: jangan terlalu pedas, tolong dihangatkan)"
            className="w-full p-3 bg-white rounded-xl border border-[#E8DDD0] text-xs text-[#1C1917] placeholder-[#A89A8E] focus:outline-none focus:border-[#8C6A4B] focus:ring-1 focus:ring-[#8C6A4B]"
          />
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E8DDD0] p-4 max-w-md mx-auto z-30 shadow-lg">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-[#E8DDD0] rounded-xl bg-[#FAF7F2] p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1 || isOut}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2D241E] hover:bg-white disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-9 text-center font-bold text-sm text-[#1C1917]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(selectedMenuItem.stock, q + 1))}
              disabled={isOut || quantity >= selectedMenuItem.stock}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2D241E] hover:bg-white disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            disabled={isOut}
            className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-between transition-all ${
              isOut
                ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                : 'bg-[#2D241E] hover:bg-[#1C1917] text-white shadow-md active:scale-[0.99] cursor-pointer'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#D9C3B0]" />
              <span>{isOut ? 'STOK HABIS' : 'Tambah ke Keranjang'}</span>
            </div>
            {!isOut && <span>{formatRupiah(itemTotal)}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
