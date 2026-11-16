import React from 'react';
import { useCafe } from '../../context/CafeContext';
import { formatRupiah } from '../../utils/formatters';
import { MenuItem } from '../../types';
import {
  Coffee,
  Wifi,
  Zap,
  Leaf,
  QrCode,
  ArrowRight,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Monitor,
} from 'lucide-react';
import { motion } from 'motion/react';

export const WebsiteHome: React.FC = () => {
  const {
    setCustomerScreen,
    currentTable,
    menuItems,
    addToCart,
    setSelectedMenuItem,
    showNotification,
  } = useCafe();

  // Top best seller items
  const bestSellers = menuItems.filter((i) => i.popular).slice(0, 6);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    if (!item.isAvailable || item.stock <= 0) return;
    addToCart(item, 1);
    showNotification(`1x ${item.name} berhasil ditambahkan ke keranjang`, 'success');
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setCustomerScreen('detail');
  };

  return (
    <div className="flex-1 bg-[#FAF7F2] text-[#1C1917]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#1C1917] text-[#FAF7F2] py-20 lg:py-28">
        {/* Background Image with Warm Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1920&auto=format&fit=crop"
            alt="Arundary Cafe Ambiance"
            className="w-full h-full object-cover object-center opacity-30 scale-105 filter blur-[1px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1917] via-[#1C1917]/90 to-[#1C1917]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pill Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E251F] border border-[#4A3B31] text-xs font-semibold text-[#D9C3B0]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Specialty Coffee & Creative Co-Working Space</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif-cafe text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
              >
                Ruang Hangat untuk Secangkir Kopi, Ide Baru, & Pertemuan Berarti.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-[#C7B5A3] max-w-2xl leading-relaxed"
              >
                Selamat datang di <strong className="text-white">Arundary Cafe and Space</strong>.
                Tempat ternyaman untuk menikmati seduhan kopi berkualitas tinggi, makanan lezat,
                serta ruang kerja yang tenang dengan Wi-Fi kencang dan colokan di setiap meja.
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <button
                  onClick={() => setCustomerScreen('menu')}
                  className="px-6 py-3.5 rounded-xl bg-[#8C6A4B] hover:bg-[#77583D] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Buka Menu & Pesan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setCustomerScreen('table_qr')}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-amber-300" />
                  <span>Pesan dari Meja ({currentTable})</span>
                </button>

                <button
                  onClick={() => setCustomerScreen('space')}
                  className="px-4 py-3.5 text-xs text-[#D9C3B0] hover:text-white font-bold transition-colors cursor-pointer"
                >
                  Lihat Fasilitas Space →
                </button>
              </motion.div>

              {/* Quick Table Notice */}
              <div className="pt-2 flex items-center gap-2 text-xs text-[#A89A8E]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  Kamu sedang terhubung sebagai tamu di{' '}
                  <strong className="text-white underline cursor-pointer" onClick={() => setCustomerScreen('table_qr')}>
                    {currentTable}
                  </strong>
                  . Pesanan akan langsung diantar ke meja ini.
                </span>
              </div>
            </div>

            {/* Right Card: Quick Order Feature Highlight & Image Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-[#251E19]/80 border border-[#3E342D] rounded-3xl p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#3E342D] pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#8C6A4B] flex items-center justify-center text-white">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">QR Code Table Ordering</h3>
                      <p className="text-[11px] text-[#A89A8E]">Pesan instan tanpa antre</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Live System
                  </span>
                </div>

                {/* Showcase 2 featured items */}
                <div className="space-y-3 mb-4">
                  {bestSellers.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-[#1C1917]/70 border border-[#3A2F27] hover:border-[#8C6A4B] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-[#D9C3B0] transition-colors">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[#8C6A4B] font-semibold">
                            {formatRupiah(item.price)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleQuickAdd(e, item)}
                        className="p-2 rounded-xl bg-[#8C6A4B] text-white hover:bg-[#A67F5B] transition-colors cursor-pointer"
                        title="Tambah ke keranjang"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setCustomerScreen('menu')}
                  className="w-full py-2.5 rounded-xl bg-white text-[#1C1917] hover:bg-[#FAF7F2] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Eksplor 20+ Menu Lengkap</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Feature Strip */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 pt-8 border-t border-[#332A24]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#241E1A]/60 border border-[#382D25]">
              <div className="w-10 h-10 rounded-xl bg-[#8C6A4B]/20 text-[#D9C3B0] flex items-center justify-center shrink-0">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Specialty Coffee</p>
                <p className="text-[10px] text-[#A89A8E]">100% Arabica & House Blend</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#241E1A]/60 border border-[#382D25]">
              <div className="w-10 h-10 rounded-xl bg-[#8C6A4B]/20 text-[#D9C3B0] flex items-center justify-center shrink-0">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Super Fast Wi-Fi</p>
                <p className="text-[10px] text-[#A89A8E]">Up to 100 Mbps Unlimited</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#241E1A]/60 border border-[#382D25]">
              <div className="w-10 h-10 rounded-xl bg-[#8C6A4B]/20 text-[#D9C3B0] flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Power Outlets</p>
                <p className="text-[10px] text-[#A89A8E]">Stopkontak di setiap meja</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#241E1A]/60 border border-[#382D25]">
              <div className="w-10 h-10 rounded-xl bg-[#8C6A4B]/20 text-[#D9C3B0] flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Indoor & Outdoor</p>
                <p className="text-[10px] text-[#A89A8E]">AC dingin & Garden asri</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TENTANG ARUNDARY CAFE & SPACE */}
      <section className="py-18 bg-[#FAF7F2] border-b border-[#E8DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Images Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-md h-56 group">
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
                    alt="Arundary Cafe Table"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md h-40 group">
                  <img
                    src="https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=800&auto=format&fit=crop"
                    alt="Latte Art"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-3xl overflow-hidden shadow-md h-40 group">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                    alt="Co-working Space"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md h-56 group">
                  <img
                    src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop"
                    alt="Cafe Interior"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE3D5] text-[#8C6A4B] text-xs font-bold uppercase tracking-wider">
                <span>Tentang Kami</span>
              </div>
              <h2 className="font-serif-cafe text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1917] leading-snug">
                Lebih dari Sekadar Cafe — Ruang Bertumbuh, Berkarya, dan Berbagi Cerita.
              </h2>
              <p className="text-sm sm:text-base text-[#574536] leading-relaxed">
                <strong>Arundary Cafe and Space</strong> lahir dari kerinduan akan tempat yang seimbang:
                bukan hanya tempat minum kopi yang nikmat, tetapi juga sanctuary bagi para remote worker,
                kreator, mahasiswa, dan komunitas yang membutuhkan suasana kondusif untuk berkreasi.
              </p>
              <p className="text-sm sm:text-base text-[#574536] leading-relaxed">
                Kami menyajikan biji kopi Nusantara pilihan yang dipanggang dengan cermat, diracik
                oleh barista berdedikasi, serta hidangan hangat bercita rasa kaya. Setiap sudut ruang kami
                desain dengan pencahayaan alami, kursi ergonomis, dan sirkulasi udara yang menyegarkan.
              </p>

              {/* Bullet Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#8C6A4B] shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-[#3D2F24]">
                    Specialty Coffee Roastery & Artisan Tea
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#8C6A4B] shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-[#3D2F24]">
                    Pemesanan QR Code Meja Mandiri
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#8C6A4B] shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-[#3D2F24]">
                    Ruang Meeting Privat Berkapasitas 15 Orang
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#8C6A4B] shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-[#3D2F24]">
                    Buka Setiap Hari: 08:00 - 23:00 WIB
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCustomerScreen('space')}
                  className="px-6 py-3 rounded-xl bg-[#2D241E] hover:bg-[#43362B] text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Jelajahi Fasilitas Space Kami</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MENU PILIHAN / BEST SELLERS */}
      <section className="py-18 bg-[#F5EBE1]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8DDD0] text-[#8C6A4B] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Paling Disukai</span>
              </div>
              <h2 className="font-serif-cafe text-2xl sm:text-3xl font-bold text-[#1C1917]">
                Menu Pilihan & Best Seller
              </h2>
              <p className="text-sm text-[#705844] mt-1">
                Diracik dari bahan premium pilihan oleh Barista dan Chef Arundary
              </p>
            </div>

            <button
              onClick={() => setCustomerScreen('menu')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8C6A4B] hover:bg-[#77583D] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>Lihat Seluruh Menu (Katalog Lengkap)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Menu Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8DDD0] hover:border-[#8C6A4B] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-[#EFE3D5]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#1C1917]/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
                    {item.category}
                  </div>
                  {/* Preparation Time */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#2D241E] px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8C6A4B]" />
                    <span>~{item.preparationTimeMinutes} mnt</span>
                  </div>
                  {/* Stock status if low or empty */}
                  {item.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider">
                        Stok Habis
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-base text-[#1C1917] group-hover:text-[#8C6A4B] transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-bold text-sm text-[#8C6A4B] whitespace-nowrap">
                        {formatRupiah(item.price)}
                      </span>
                    </div>
                    <p className="text-xs text-[#705844] mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#F5EBE1]">
                    <span className="text-[11px] text-[#A89A8E] font-medium">
                      Tersedia {item.stock} porsi
                    </span>
                    <button
                      onClick={(e) => handleQuickAdd(e, item)}
                      disabled={!item.isAvailable || item.stock <= 0}
                      className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#8C6A4B] text-[#2D241E] hover:text-white border border-[#E8DDD0] hover:border-[#8C6A4B] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>+ Pesan</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CARA KERJA QR ORDER MEJA */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE3D5] text-[#8C6A4B] text-xs font-bold uppercase tracking-wider mb-2">
              <QrCode className="w-3.5 h-3.5" />
              <span>Kemudahan Pemesanan</span>
            </div>
            <h2 className="font-serif-cafe text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Pesan Langsung dari Mejamu Tanpa Antre
            </h2>
            <p className="text-sm text-[#705844] mt-2 leading-relaxed">
              Nikmati kenyamanan memesan makanan dan minuman favorit langsung dari meja Anda
              menggunakan sistem QR Code canggih Arundary.
            </p>
          </div>

          {/* 4 Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[#E8DDD0] shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] text-[#8C6A4B] font-serif-cafe font-bold text-lg flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="font-bold text-base text-[#1C1917] mb-2">Duduk di Meja Favorit</h3>
              <p className="text-xs text-[#705844] leading-relaxed">
                Pilih tempat duduk ternyaman di area Indoor ber-AC yang tenang atau Outdoor Garden yang sejuk.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8DDD0] shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] text-[#8C6A4B] font-serif-cafe font-bold text-lg flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="font-bold text-base text-[#1C1917] mb-2">Scan Stand QR Meja</h3>
              <p className="text-xs text-[#705844] leading-relaxed">
                Arahkan kamera smartphone ke stand akrilik di meja, atau gunakan tombol pesan meja di web ini.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8DDD0] shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] text-[#8C6A4B] font-serif-cafe font-bold text-lg flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="font-bold text-base text-[#1C1917] mb-2">Pilih & Kustomisasi</h3>
              <p className="text-xs text-[#705844] leading-relaxed">
                Sesuaikan level manis, es, susu oat/dairy, atau catatan khusus untuk barista & chef kami.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8DDD0] shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] text-[#8C6A4B] font-serif-cafe font-bold text-lg flex items-center justify-center mb-4">
                04
              </div>
              <h3 className="font-bold text-base text-[#1C1917] mb-2">Bayar & Pantau Live</h3>
              <p className="text-xs text-[#705844] leading-relaxed">
                Bayar aman lewat QRIS instan atau di kasir, lalu pantau status pesanan hingga diantar ke mejamu.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setCustomerScreen('table_qr')}
              className="px-6 py-3.5 rounded-xl bg-[#2D241E] hover:bg-black text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-amber-300" />
              <span>Buka Simulasi QR Meja ({currentTable})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FASILITAS & SUASANA SPACE PREVIEW */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE3D5] text-[#8C6A4B] text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Space & Community</span>
              </div>
              <h2 className="font-serif-cafe text-2xl sm:text-3xl font-bold text-[#1C1917] leading-snug">
                Dirancang untuk Produktivitas, Kolaborasi, dan Inspirasi.
              </h2>
              <p className="text-sm text-[#574536] leading-relaxed">
                Kami memahami kebutuhan para pekerja remote, mahasiswa, dan tim startup yang membutuhkan
                tempat kerja yang nyaman tanpa harus membayar sewa kantor mahal. Nikmati fasilitas
                co-working lengkap kami hanya dengan memesan kopi favorit Anda.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-[#E8DDD0] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#8C6A4B] flex items-center justify-center shrink-0">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917]">Wi-Fi Bisnis 100 Mbps</h4>
                    <p className="text-[11px] text-[#705844]">Koneksi stabil untuk video call Zoom & upload file besar</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E8DDD0] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#8C6A4B] flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917]">Colokan Listrik Tiap Meja</h4>
                    <p className="text-[11px] text-[#705844]">Tak perlu berebut colokan, daya selalu siap untuk laptop & HP</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E8DDD0] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#8C6A4B] flex items-center justify-center shrink-0">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917]">Private Meeting Room</h4>
                    <p className="text-[11px] text-[#705844]">Kapasitas 8-15 orang lengkap dengan Smart TV & Whiteboard</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCustomerScreen('space')}
                  className="px-5 py-2.5 rounded-xl bg-[#8C6A4B] hover:bg-[#77583D] text-white text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Lihat Galeri Fasilitas Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Photo Mosaic */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-md h-64 group relative">
                    <img
                      src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=800&auto=format&fit=crop"
                      alt="Co-working Tables"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                      <p className="text-white text-xs font-bold">Focus Work Space (Indoor AC)</p>
                    </div>
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-md h-44 group relative">
                    <img
                      src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop"
                      alt="Barista brewing"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                      <p className="text-white text-xs font-bold">Specialty Pour Over Bar</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="rounded-3xl overflow-hidden shadow-md h-44 group relative">
                    <img
                      src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=800&auto=format&fit=crop"
                      alt="Meeting Space"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                      <p className="text-white text-xs font-bold">Private Meeting Room</p>
                    </div>
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-md h-64 group relative">
                    <img
                      src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800&auto=format&fit=crop"
                      alt="Outdoor Garden"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                      <p className="text-white text-xs font-bold">Tropical Outdoor Garden</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONI PELANGGAN */}
      <section className="py-20 bg-[#F5EBE1]/40 border-y border-[#E8DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="font-serif-cafe text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Kata Mereka Tentang Arundary
            </h2>
            <p className="text-xs text-[#705844] mt-1">
              Dipercaya ratusan digital nomads, kreator, dan penikmat kopi di Jakarta Selatan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[#E8DDD0] shadow-sm flex flex-col justify-between space-y-4">
              <p className="text-xs text-[#574536] italic leading-relaxed">
                "Tempat WFC paling nyaman di Jakarta Selatan! Kopinya enak banget, terutama Kopi Susu
                Gula Aren-nya. Wi-Fi-nya kenceng dan stabil buat meeting online 2 jam tanpa putus.
                QR order di meja sangat praktis!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#F5EBE1]">
                <div className="w-9 h-9 rounded-full bg-[#8C6A4B] text-white font-bold text-xs flex items-center justify-center">
                  RA
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917]">Rian Ardiansyah</h4>
                  <p className="text-[10px] text-[#A89A8E]">Product Designer / Freelancer</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8DDD0] shadow-sm flex flex-col justify-between space-y-4">
              <p className="text-xs text-[#574536] italic leading-relaxed">
                "Ruang meeting-nya bersih dan kedap. Sangat recommended buat workshop atau brain-storming
                tim. Makanannya juga bukan sekadar camilan biasa, Chicken Katsu dan Nasi Bulgogi-nya
                sangat lezat dan porsinya mengenyangkan."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#F5EBE1]">
                <div className="w-9 h-9 rounded-full bg-[#2D241E] text-white font-bold text-xs flex items-center justify-center">
                  SP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917]">Siti Pratiwi</h4>
                  <p className="text-[10px] text-[#A89A8E]">Startup Founder</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8DDD0] shadow-sm flex flex-col justify-between space-y-4">
              <p className="text-xs text-[#574536] italic leading-relaxed">
                "Outdoor garden-nya asik banget buat sore-sore nongkrong. Suasananya teduh dan adem.
                Suka banget sama sistem pantau pesanannya, kita bisa liat langsung kapan kopi kita
                selesai diseduh sama baristanya."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#F5EBE1]">
                <div className="w-9 h-9 rounded-full bg-[#705844] text-white font-bold text-xs flex items-center justify-center">
                  DB
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917]">Dimas Baskoro</h4>
                  <p className="text-[10px] text-[#A89A8E]">Coffee Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOKASI, JAM BUKA & INTERACTIVE CALLOUT */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#2D241E] text-white rounded-3xl overflow-hidden shadow-2xl p-8 lg:p-12 border border-[#43362B]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3E3228] text-[#D9C3B0] text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kunjungi Kami Hari Ini</span>
                </div>
                <h2 className="font-serif-cafe text-2xl sm:text-3xl font-bold leading-tight">
                  Singgah, Bersantai, dan Nikmati Waktumu di Arundary.
                </h2>
                <p className="text-xs sm:text-sm text-[#C7B5A3] leading-relaxed max-w-xl">
                  Kami berlokasi di area strategis Jakarta Selatan dengan akses parkir yang luas,
                  dekat dengan stasiun MRT dan jalur Transjakarta.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#E8DDD0]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#8C6A4B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Alamat</p>
                      <p className="text-[#A89A8E]">Jl. Cempaka Raya No. 18, Jakarta Selatan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#8C6A4B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Jam Operasional</p>
                      <p className="text-[#A89A8E]">Setiap Hari: 08:00 - 23:00 WIB</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    onClick={() => setCustomerScreen('location')}
                    className="px-5 py-3 rounded-xl bg-[#8C6A4B] hover:bg-[#A67F5B] text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Lihat Peta & Petunjuk Arah</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>Hubungi via WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Mini Map Placeholder Preview */}
              <div className="lg:col-span-5">
                <div
                  onClick={() => setCustomerScreen('location')}
                  className="rounded-2xl overflow-hidden border border-[#43362B] bg-[#1C1917] h-64 relative group cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop"
                    alt="Map Location Arundary"
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#8C6A4B] text-white flex items-center justify-center shadow-lg mb-2 group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 animate-bounce" />
                    </div>
                    <p className="font-bold text-sm text-white">Arundary Cafe and Space</p>
                    <p className="text-[11px] text-[#D9C3B0] mt-0.5">Klik untuk membuka rute dan peta interaktif</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
