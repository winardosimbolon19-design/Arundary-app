import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { formatRupiah, getStockStatus } from '../../utils/formatters';
import { MenuCategory, MenuItem } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  AlertTriangle,
  XCircle,
  X,
  Sparkles,
} from 'lucide-react';

export const AdminMenuManagement: React.FC = () => {
  const { menuItems, addMenuItem, editMenuItem, deleteMenuItem } = useCafe();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<MenuCategory>('Coffee');
  const [formPrice, setFormPrice] = useState(25000);
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formStock, setFormStock] = useState(15);
  const [formPrepTime, setFormPrepTime] = useState(5);
  const [formPopular, setFormPopular] = useState(false);

  const openAddModal = () => {
    setEditingItem(null);
    setFormName('');
    setFormCategory('Coffee');
    setFormPrice(28000);
    setFormDescription('');
    setFormImage('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop');
    setFormStock(20);
    setFormPrepTime(5);
    setFormPopular(false);
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormPrice(item.price);
    setFormDescription(item.description);
    setFormImage(item.image);
    setFormStock(item.stock);
    setFormPrepTime(item.preparationTimeMinutes);
    setFormPopular(!!item.popular);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingItem) {
      editMenuItem({
        ...editingItem,
        name: formName.trim(),
        category: formCategory,
        price: Number(formPrice),
        description: formDescription.trim(),
        image: formImage.trim() || editingItem.image,
        stock: Number(formStock),
        isAvailable: Number(formStock) > 0,
        preparationTimeMinutes: Number(formPrepTime),
        popular: formPopular,
      });
    } else {
      addMenuItem({
        name: formName.trim(),
        category: formCategory,
        price: Number(formPrice),
        description: formDescription.trim(),
        image:
          formImage.trim() ||
          'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=600&auto=format&fit=crop',
        stock: Number(formStock),
        isAvailable: Number(formStock) > 0,
        preparationTimeMinutes: Number(formPrepTime),
        popular: formPopular,
      });
    }

    setIsModalOpen(false);
  };

  const filtered = menuItems.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B]">
            Katalog & Menu Cafe
          </span>
          <h1 className="font-serif-cafe text-2xl md:text-3xl font-bold text-[#1C1917]">
            Kelola Master Menu
          </h1>
          <p className="text-xs text-[#786C62]">
            Tambah sajian baru, perbarui deskripsi resep, harga, dan foto produk menu digital Arundary.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#2D241E] hover:bg-[#1C1917] text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#D9C3B0]" />
          <span>Tambah Menu Baru</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A89A8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-xs text-[#1C1917] placeholder-[#A89A8E] focus:outline-none focus:border-[#8C6A4B]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Coffee', 'Non Coffee', 'Main Course', 'Snack', 'Dessert'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCat === c
                  ? 'bg-[#2D241E] text-white'
                  : 'bg-[#FAF7F2] text-[#574C43] hover:bg-[#F5EBE1]'
              }`}
            >
              {c === 'All' ? 'Semua' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const stockStatus = getStockStatus(item);
          const isOut = stockStatus === 'OUT OF STOCK';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                isOut ? 'opacity-80' : ''
              }`}
            >
              <div>
                <div className="flex gap-3 mb-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#EFECE6] shrink-0 border border-[#E8DDD0]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold text-[#8C6A4B] bg-[#F5EBE1] px-2 py-0.5 rounded border border-[#EAD9C8]">
                        {item.category}
                      </span>
                      {item.popular && (
                        <span className="text-[10px] text-amber-700 flex items-center gap-0.5">
                          <Sparkles className="w-3 h-3" /> Favorit
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif-cafe font-bold text-base text-[#1C1917] truncate">
                      {item.name}
                    </h3>
                    <p className="font-bold text-sm text-[#2D241E] mt-0.5">
                      {formatRupiah(item.price)}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#786C62] line-clamp-2 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              {/* Footer info & actions */}
              <div className="pt-3 border-t border-[#F5EBE1] flex items-center justify-between text-xs">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                    isOut
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : item.stock <= 5
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {isOut ? 'Stok Habis' : `Stok: ${item.stock}`}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8DDD0] hover:bg-neutral-100 text-[#574C43] transition-colors cursor-pointer"
                    title="Edit Menu"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteMenuItem(item.id)}
                    className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8DDD0] hover:bg-rose-50 hover:text-rose-600 text-[#574C43] transition-colors cursor-pointer"
                    title="Hapus Menu"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E8DDD0] relative animate-scale-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#E8DDD0] text-[#574C43] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="font-serif-cafe font-bold text-xl text-[#1C1917] mb-1">
              {editingItem ? 'Edit Sajian Menu' : 'Tambah Menu Baru'}
            </h2>
            <p className="text-xs text-[#786C62] mb-5">
              Isi data detail sajian menu untuk ditampilkan pada katalog digital pelanggan.
            </p>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#2D241E] mb-1">Nama Menu</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Caramel Macchiato"
                  className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D241E] mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as MenuCategory)}
                    className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                  >
                    <option value="Coffee">Coffee</option>
                    <option value="Non Coffee">Non Coffee</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Snack">Snack</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#2D241E] mb-1">Harga (Rupiah)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2D241E] mb-1">Deskripsi Sajian</label>
                <textarea
                  rows={2}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Ceritakan komposisi rasa, biji kopi, atau pelengkap..."
                  className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2D241E] mb-1">URL Foto Makanan</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D241E] mb-1">Jumlah Stok Awal</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2D241E] mb-1">Estimasi Masak (Menit)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formPrepTime}
                    onChange={(e) => setFormPrepTime(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={formPopular}
                  onChange={(e) => setFormPopular(e.target.checked)}
                  className="rounded text-[#8C6A4B] focus:ring-[#8C6A4B] w-4 h-4"
                />
                <label htmlFor="popularCheck" className="text-xs font-semibold text-[#1C1917]">
                  Tandai sebagai Rekomendasi Favorit Pelanggan
                </label>
              </div>

              <div className="pt-3 border-t border-[#E8DDD0] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DDD0] hover:bg-[#F5EBE1] text-[#574C43] font-semibold text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2D241E] hover:bg-[#1C1917] text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Simpan Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
