import React from 'react';
import { useCafe } from '../../context/CafeContext';
import {
  Wifi,
  Zap,
  Monitor,
  Users,
  Coffee,
  Leaf,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
} from 'lucide-react';

export const WebsiteSpace: React.FC = () => {
  const { setCustomerScreen } = useCafe();

  return (
    <div className="flex-1 bg-[#FAF7F2] text-[#1C1917] pb-24">
      {/* Header Banner */}
      <div className="bg-[#1C1917] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop"
            alt="Arundary Creative Space"
            className="w-full h-full object-cover opacity-25 filter blur-[1px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E251F] border border-[#4A3B31] text-xs font-semibold text-[#D9C3B0] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Fasilitas & Suasana</span>
          </div>
          <h1 className="font-serif-cafe text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Ruang Kreatif & Kolaboratif Arundary Space
          </h1>
          <p className="text-sm sm:text-base text-[#C7B5A3] leading-relaxed">
            Perpaduan sempurna antara ketenangan coffee shop premium dan fungsionalitas workspace modern.
            Bebas bekerja, berdiskusi, atau sekadar bersantai sepanjang hari.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Quick Highlights Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#E8DDD0] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] text-[#8C6A4B] flex items-center justify-center shrink-0">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#1C1917]">Wi-Fi 100 Mbps</p>
              <p className="text-xs text-[#705844]">Dedicated Fiber Optic</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] text-[#8C6A4B] flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#1C1917]">Power Outlets</p>
              <p className="text-xs text-[#705844]">Stopkontak di Tiap Meja</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] text-[#8C6A4B] flex items-center justify-center shrink-0">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#1C1917]">Meeting Room</p>
              <p className="text-xs text-[#705844]">Kapasitas s/d 15 Orang</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] text-[#8C6A4B] flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#1C1917]">Outdoor Garden</p>
              <p className="text-xs text-[#705844]">Area Hijau & Asri</p>
            </div>
          </div>
        </div>

        {/* 1. FOCUS & CO-WORKING AREA */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE3D5] text-[#8C6A4B] text-xs font-bold uppercase tracking-wider">
              <span>Area Utama</span>
            </div>
            <h2 className="font-serif-cafe text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Indoor Focus Work & Study Area
            </h2>
            <p className="text-sm text-[#574536] leading-relaxed">
              Didesain khusus untuk Anda yang membutuhkan konsentrasi maksimal. Ruangan berpendingin udara (AC)
              yang sejuk, musik akustik latar yang lembut pada volume rendah, serta meja kayu ergonomis
              yang luas untuk meletakkan laptop, buku, dan secangkir kopi.
            </p>
            <div className="space-y-2 pt-2 text-xs text-[#3D2F24]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6A4B]" />
                <span>Pencahayaan natural warm light yang tidak membuat mata lelah</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6A4B]" />
                <span>Setiap meja dilengkapi 2 hingga 4 port stopkontak</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6A4B]" />
                <span>Bebas biaya sewa meja — cukup pesan menu makanan atau minuman</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-[#E8DDD0] h-80 group">
              <img
                src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1000&auto=format&fit=crop"
                alt="Indoor Focus Area"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* 2. PRIVATE MEETING & EVENT ROOM */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-[#E8DDD0] h-80 group">
              <img
                src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1000&auto=format&fit=crop"
                alt="Private Meeting Room"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE3D5] text-[#8C6A4B] text-xs font-bold uppercase tracking-wider">
              <span>Ruang Khusus</span>
            </div>
            <h2 className="font-serif-cafe text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Private Meeting & Workshop Room
            </h2>
            <p className="text-sm text-[#574536] leading-relaxed">
              Membutuhkan ruang privat untuk meeting bersama klien, pitching investor, atau workshop kreatif?
              Ruang meeting Arundary berkapasitas 8 hingga 15 orang, kedap suara, dan dilengkapi fasilitas
              presentasi lengkap.
            </p>
            <div className="space-y-2 pt-2 text-xs text-[#3D2F24]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6A4B]" />
                <span>Smart TV 55 Inch dengan koneksi HDMI & Wireless Screen Mirroring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6A4B]" />
                <span>Magnetic Glass Whiteboard dengan spidol & penghapus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6A4B]" />
                <span>Paket Coffee Break & Snack khusus untuk meeting</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Arundary,%20saya%20ingin%20tanya%20reservasi%20Private%20Meeting%20Room"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2D241E] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
              >
                <Phone className="w-4 h-4 text-[#C9A98A]" />
                <span>Reservasi Ruang Meeting via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. OUTDOOR GARDEN & SMOKING SPACE */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE3D5] text-[#8C6A4B] text-xs font-bold uppercase tracking-wider">
              <span>Semi-Terbuka</span>
            </div>
            <h2 className="font-serif-cafe text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Lush Outdoor Garden & Smoking Area
            </h2>
            <p className="text-sm text-[#574536] leading-relaxed">
              Bagi Anda yang lebih menyukai udara alami dan pemandangan hijau asri, area Outdoor Garden kami
              menghadirkan suasana santai dengan tanaman tropis yang terawat, payung peneduh, dan semilir angin.
            </p>
            <div className="space-y-2 pt-2 text-xs text-[#3D2F24]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6A4B]" />
                <span>Smoking-friendly dengan ventilasi terbuka yang sejuk</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6A4B]" />
                <span>Cocok untuk obrolan santai di sore hari bersama teman atau rekan kerja</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6A4B]" />
                <span>Tetap terjangkau sinyal Wi-Fi kencang dan stopkontak outdoor</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-[#E8DDD0] h-80 group">
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1000&auto=format&fit=crop"
                alt="Outdoor Garden Area"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* CTA Strip to Order */}
        <div className="mt-20 p-8 rounded-3xl bg-[#8C6A4B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-serif-cafe text-xl sm:text-2xl font-bold">
              Sudah di Arundary Cafe and Space?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mt-1">
              Buka menu sekarang dan pesan langsung dari meja Anda tanpa perlu beranjak.
            </p>
          </div>
          <button
            onClick={() => setCustomerScreen('menu')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1C1917] font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Coffee className="w-4 h-4 text-[#8C6A4B]" />
            <span>Pesan Menu Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
