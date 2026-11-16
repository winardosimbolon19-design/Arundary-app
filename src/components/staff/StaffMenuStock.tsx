import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { formatRupiah, getStockStatus } from '../../utils/formatters';
import { MenuCategory, MenuItem } from '../../types';
import {
  Plus,
  Minus,
  Search,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Coffee,
  Edit2,
  Check,
} from 'lucide-react';

export const StaffMenuStock: React.FC = () => {
  const { menuItems, updateMenuItemStock, toggleMenuItemAvailability } = useCafe();
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);

  const filtered = menuItems.filter((item) => {
    const matchesCat = filterCategory === 'All' || item.category === filterCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const startEditStock = (item: MenuItem) => {
    setEditingStockId(item.id);
    setTempStockValue(item.stock);
  };

  const saveStock = (id: string) => {
    updateMenuItemStock(id, tempStockValue);
    setEditingStockId(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B]">
            Inventaris & Ketersediaan
          </span>
          <h1 className="font-serif-cafe text-2xl md:text-3xl font-bold text-[#1C1917]">
            Manajemen Menu & Stok
          </h1>
          <p className="text-xs text-[#786C62]">
            Kelola jumlah porsi menu. Bila stok diubah menjadi 0 atau dimatikan, status pada menu pelanggan otomatis menjadi &ldquo;STOK HABIS&rdquo;.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A89A8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari menu nama atau kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-xs text-[#1C1917] placeholder-[#A89A8E] focus:outline-none focus:border-[#8C6A4B]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Coffee', 'Non Coffee', 'Main Course', 'Snack', 'Dessert'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#2D241E] text-white'
                  : 'bg-[#FAF7F2] text-[#574C43] hover:bg-[#F5EBE1]'
              }`}
            >
              {cat === 'All' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu & Stock Table */}
      <div className="bg-white rounded-2xl border border-[#E8DDD0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E8DDD0] text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B]">
                <th className="py-3 px-4">Foto</th>
                <th className="py-3 px-4">Nama Menu</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Harga (IDR)</th>
                <th className="py-3 px-4 text-center">Stok</th>
                <th className="py-3 px-4 text-center">Status Ketersediaan</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EBE1] text-xs">
              {filtered.map((item) => {
                const stockStatus = getStockStatus(item);
                const isOut = stockStatus === 'OUT OF STOCK';
                const isLow = stockStatus === 'LOW STOCK';
                const isEditing = editingStockId === item.id;

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-[#FAF7F2]/50 transition-colors ${
                      isOut ? 'bg-neutral-50/70' : ''
                    }`}
                  >
                    {/* Image */}
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#EFECE6] border border-[#E8DDD0]">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Menu Name & Desc */}
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-serif-cafe font-bold text-sm text-[#1C1917]">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-[#786C62] line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F5EBE1] text-[#8C6A4B] font-semibold text-[11px] border border-[#EAD9C8]">
                        {item.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-[#2D241E]">
                      {formatRupiah(item.price)}
                    </td>

                    {/* Stock Counter */}
                    <td className="py-3 px-4 text-center">
                      {isEditing ? (
                        <div className="inline-flex items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-xl border border-[#8C6A4B]">
                          <input
                            type="number"
                            min="0"
                            value={tempStockValue}
                            onChange={(e) => setTempStockValue(parseInt(e.target.value, 10) || 0)}
                            className="w-14 text-center font-bold text-xs bg-white rounded border border-[#E8DDD0] py-1"
                          />
                          <button
                            onClick={() => saveStock(item.id)}
                            className="p-1 rounded bg-[#2D241E] text-white hover:bg-[#8C6A4B]"
                            title="Simpan"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => updateMenuItemStock(item.id, Math.max(0, item.stock - 1))}
                            className="w-6 h-6 rounded bg-[#FAF7F2] border border-[#E8DDD0] flex items-center justify-center text-[#574C43] hover:bg-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span
                            onClick={() => startEditStock(item)}
                            className={`min-w-8 text-center font-bold cursor-pointer hover:underline ${
                              isOut
                                ? 'text-rose-600 font-extrabold'
                                : isLow
                                ? 'text-amber-600'
                                : 'text-[#1C1917]'
                            }`}
                            title="Klik untuk ubah angka stok"
                          >
                            {item.stock}
                          </span>
                          <button
                            onClick={() => updateMenuItemStock(item.id, item.stock + 1)}
                            className="w-6 h-6 rounded bg-[#FAF7F2] border border-[#E8DDD0] flex items-center justify-center text-[#574C43] hover:bg-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Availability Status Badge */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                          isOut
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : isLow
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {isOut ? (
                          <>
                            <XCircle className="w-3 h-3 text-rose-500" />
                            <span>Out of Stock (STOK HABIS)</span>
                          </>
                        ) : isLow ? (
                          <>
                            <AlertTriangle className="w-3 h-3 text-amber-500" />
                            <span>Low Stock ({item.stock} left)</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-500" />
                            <span>Available</span>
                          </>
                        )}
                      </span>
                    </td>

                    {/* Toggle Switch Action */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <span className="text-[11px] font-medium text-[#786C62]">
                          {item.isAvailable && item.stock > 0 ? 'Tersedia' : 'Nonaktif'}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleMenuItemAvailability(item.id)}
                          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                            item.isAvailable && item.stock > 0
                              ? 'bg-emerald-600'
                              : 'bg-stone-300'
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                              item.isAvailable && item.stock > 0 ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
