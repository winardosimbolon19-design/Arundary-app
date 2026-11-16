import React, { useState, useMemo } from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import { formatRupiah, getStockStatus } from '../../utils/formatters';
import { MenuCategory, MenuItem } from '../../types';
import {
  Search,
  ShoppingBag,
  Plus,
  Clock,
  Sparkles,
  ArrowRight,
  Coffee,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES: MenuCategory[] = [
  'Semua',
  'Coffee',
  'Non Coffee',
  'Main Course',
  'Snack',
  'Dessert',
];

export const CustomerMenu: React.FC = () => {
  const {
    currentTable,
    menuItems,
    cartItemCount,
    cartTotal,
    setCustomerScreen,
    setSelectedMenuItem,
    addToCart,
    activeOrder,
  } = useCafe();

  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'Semua' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  const handleItemClick = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setCustomerScreen('detail');
  };

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    if (!item.isAvailable || item.stock <= 0) return;
    addToCart(item, 1);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-32 relative flex flex-col">
      {/* Top Banner / Filter Bar for Website */}
      <div className="bg-[#FAF7F2] border-b border-[#E8DDD0] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Header Row: Title & Table Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-cafe text-2xl sm:text-3xl font-bold text-[#1C1917]">
                  Daftar Menu & Pemesanan
                </h1>
                <span className="text-xs font-bold text-[#8C6A4B] bg-[#F5EBE1] px-2.5 py-1 rounded-full border border-[#E3D3C2]">
                  Meja {currentTable}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#705844] mt-1">
                Pilih menu favoritmu, atur kustomisasi rasa, dan pesanan akan diantar ke {currentTable}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCustomerScreen('table_qr')}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DDD0] hover:border-[#8C6A4B] text-xs font-bold text-[#2D241E] flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Coffee className="w-3.5 h-3.5 text-[#8C6A4B]" />
                <span>Ganti Meja QR</span>
              </button>

              <button
                onClick={() => setCustomerScreen('cart')}
                className="relative px-4 py-2 rounded-xl bg-[#8C6A4B] hover:bg-[#77583D] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Keranjang ({cartItemCount})</span>
                {cartItemCount > 0 && (
                  <span className="hidden sm:inline text-xs font-semibold text-[#F5EBE1]">
                    • {formatRupiah(cartTotal)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar & Categories Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#A89A8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari menu kopi, makanan, snack, dessert..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white rounded-xl border border-[#E8DDD0] text-xs sm:text-sm text-[#1C1917] placeholder-[#A89A8E] focus:outline-none focus:border-[#8C6A4B] focus:ring-1 focus:ring-[#8C6A4B] transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89A8E] hover:text-[#1C1917]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Navigation Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#2D241E] text-white shadow-sm'
                        : 'bg-white text-[#574C43] border border-[#E8DDD0] hover:bg-[#F5EBE1]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        {/* Active Order Banner if Available */}
        {activeOrder && activeOrder.status !== 'SELESAI' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCustomerScreen('monitoring')}
            className="p-4 rounded-2xl bg-gradient-to-r from-[#2D241E] to-[#4A3B31] text-white flex items-center justify-between shadow-md cursor-pointer hover:opacity-95 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#E8DDD0]">
                <Coffee className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-wider uppercase font-bold text-[#D9C3B0]">
                    {activeOrder.id}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-white">
                  Status: {activeOrder.status}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#D9C3B0] flex items-center gap-1">
              Pantau Pesanan Live <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>
        )}

        {/* Category Title & Count */}
        <div className="flex items-center justify-between">
          <h2 className="font-serif-cafe text-xl font-bold text-[#1C1917]">
            {activeCategory === 'Semua' ? 'Seluruh Menu Arundary' : `Kategori: ${activeCategory}`}
          </h2>
          <span className="text-xs text-[#8C6A4B] font-semibold bg-[#F5EBE1] px-3 py-1 rounded-full border border-[#E8DDD0]">
            {filteredItems.length} Menu
          </span>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center text-[#786C62] bg-white rounded-3xl border border-[#E8DDD0] p-8">
            <p className="font-serif-cafe text-xl font-bold text-[#2D241E] mb-1">
              Menu Tidak Ditemukan
            </p>
            <p className="text-xs text-[#705844]">
              Tidak ada menu yang sesuai dengan kata kunci &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('Semua');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#2D241E] text-white text-xs font-bold cursor-pointer"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredItems.map((item) => {
              const stockStatus = getStockStatus(item);
              const isOut = stockStatus === 'OUT OF STOCK';
              const isLow = stockStatus === 'LOW STOCK';

              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`group relative bg-white rounded-2xl border border-[#E8DDD0] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between ${
                    isOut ? 'opacity-75' : ''
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full bg-[#EFECE6] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                        isOut ? 'grayscale contrast-75' : ''
                      }`}
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Stock & Popular Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                      {item.popular && !isOut && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2D241E] bg-[#F5EBE1]/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-[#EAD9C8]">
                          <Sparkles className="w-3 h-3 text-[#8C6A4B]" />
                          Favorit
                        </span>
                      )}

                      {isLow && (
                        <span className="inline-flex text-[10px] font-bold text-amber-800 bg-amber-100/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-amber-300">
                          Sisa {item.stock} porsi
                        </span>
                      )}
                    </div>

                    {/* STOK HABIS Banner */}
                    {isOut && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                        <span className="px-3.5 py-1.5 rounded-xl bg-rose-600/90 text-white font-bold text-xs uppercase tracking-widest shadow-md">
                          STOK HABIS
                        </span>
                      </div>
                    )}

                    {/* Prep Time pill */}
                    <div className="absolute bottom-2 left-2.5 z-10 flex items-center gap-1 text-[11px] font-medium text-white/90">
                      <Clock className="w-3 h-3" />
                      <span>~{item.preparationTimeMinutes} mnt</span>
                    </div>

                    <div className="absolute bottom-2 right-2.5 z-10 text-[10px] font-bold text-white/90 bg-black/40 px-2 py-0.5 rounded-md">
                      {item.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-serif-cafe text-base font-bold text-[#1C1917] group-hover:text-[#8C6A4B] transition-colors leading-snug">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xs text-[#786C62] line-clamp-2 leading-relaxed mb-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Price and Add Button */}
                    <div className="pt-2 border-t border-[#F5EBE1] flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-[#A89A8E] font-medium uppercase tracking-wider">
                          Harga
                        </p>
                        <p className="text-sm font-bold text-[#2D241E]">
                          {formatRupiah(item.price)}
                        </p>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(e, item)}
                        disabled={isOut}
                        className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all ${
                          isOut
                            ? 'bg-[#E8DDD0] text-[#A89A8E] cursor-not-allowed'
                            : 'bg-[#2D241E] text-white hover:bg-[#8C6A4B] active:scale-95 shadow-sm cursor-pointer'
                        }`}
                        title={isOut ? 'Stok Habis' : 'Tambah ke Keranjang'}
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Pesan</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Bottom Cart Bar (Responsive Width) */}
      <AnimatePresence>
        {cartItemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-40"
          >
            <div
              onClick={() => setCustomerScreen('cart')}
              className="w-full bg-[#2D241E] text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl flex items-center justify-between border border-[#4A3B31] cursor-pointer hover:bg-[#251D18] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#8C6A4B] flex items-center justify-center text-white relative">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-[#2D241E] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                </div>
                <div>
                  <p className="text-[11px] text-[#D9C3B0] font-medium">
                    {cartItemCount} Menu di Keranjang ({currentTable})
                  </p>
                  <p className="text-base sm:text-lg font-bold text-white">
                    {formatRupiah(cartTotal)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#8C6A4B] text-white text-xs font-bold shadow-md">
                <span>Lihat Keranjang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
