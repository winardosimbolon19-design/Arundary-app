import React from 'react';
import { ArundaryLogo } from '../ArundaryLogo';
import { useCafe } from '../../context/CafeContext';
import { CustomerScreen } from '../../types';
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Mail,
  Wifi,
  Coffee,
  Sparkles,
  ShieldCheck,
  ChefHat,
  ArrowUpRight,
  Heart,
} from 'lucide-react';

export const WebsiteFooter: React.FC = () => {
  const { setCustomerScreen, setRole } = useCafe();

  const handleNav = (screen: CustomerScreen) => {
    setCustomerScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF7F2] border-t border-[#332A24] pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#332A24]">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ArundaryLogo size={44} variant="circular" color="white" />
              <div>
                <span className="font-serif-cafe font-bold text-lg tracking-wider text-white">
                  ARUNDARY
                </span>
                <p className="text-[11px] text-[#A89A8E] tracking-widest uppercase">
                  Cafe and Space
                </p>
              </div>
            </div>
            <p className="text-xs text-[#C7B5A3] leading-relaxed">
              Ruang hangat untuk menikmati secangkir kopi pilihan, hidangan lezat, dan berkolaborasi
              kreatif. Dilengkapi koneksi Wi-Fi kencang, stopkontak di setiap meja, dan area asri.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#2A2420] border border-[#3E342D] flex items-center justify-center text-[#D6CBBF] hover:text-white hover:bg-[#8C6A4B] transition-colors"
                aria-label="Instagram Arundary"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#2A2420] border border-[#3E342D] flex items-center justify-center text-[#D6CBBF] hover:text-white hover:bg-[#8C6A4B] transition-colors"
                aria-label="WhatsApp Arundary"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:halo@arundary.id"
                className="w-8 h-8 rounded-full bg-[#2A2420] border border-[#3E342D] flex items-center justify-center text-[#D6CBBF] hover:text-white hover:bg-[#8C6A4B] transition-colors"
                aria-label="Email Arundary"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-serif-cafe text-sm font-bold text-[#E8DDD0] tracking-wider uppercase mb-4">
              Jelajahi
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C7B5A3]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Menu & Pesan Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('table_qr')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Pesan dari Meja (QR Meja)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('space')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Suasana & Fasilitas Space
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('location')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Lokasi & Petunjuk Arah
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('monitoring')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Pantau Status Pesanan Real-Time
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Jam Operasional & Fasilitas */}
          <div>
            <h4 className="font-serif-cafe text-sm font-bold text-[#E8DDD0] tracking-wider uppercase mb-4">
              Jam Operasional
            </h4>
            <div className="space-y-3 text-xs text-[#C7B5A3]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#8C6A4B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Senin - Minggu</p>
                  <p className="text-[#A89A8E]">08:00 - 23:00 WIB</p>
                  <span className="inline-block mt-1 text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    Buka Setiap Hari
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#2D241E] space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] text-[#A89A8E]">
                  <Wifi className="w-3.5 h-3.5 text-[#8C6A4B]" />
                  <span>Wi-Fi 100 Mbps Free Unlimited</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#A89A8E]">
                  <Coffee className="w-3.5 h-3.5 text-[#8C6A4B]" />
                  <span>Colokan di Setiap Meja</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Lokasi & Portal Internal */}
          <div>
            <h4 className="font-serif-cafe text-sm font-bold text-[#E8DDD0] tracking-wider uppercase mb-4">
              Lokasi & Akses
            </h4>
            <div className="space-y-3 text-xs text-[#C7B5A3]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8C6A4B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Arundary Cafe and Space</p>
                  <p className="text-[#A89A8E] leading-relaxed">
                    Jl. Cempaka Raya No. 18, Cilandak, Jakarta Selatan 12430
                  </p>
                  <button
                    onClick={() => handleNav('location')}
                    className="mt-1.5 text-xs text-[#D9C3B0] hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lihat Peta Lengkap</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Portal Staff & Admin Card */}
              <div className="mt-4 p-3 rounded-xl bg-[#2A2420] border border-[#3E342D] space-y-2">
                <p className="text-[10px] font-bold text-[#A89A8E] uppercase tracking-wider">
                  Internal Management
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setRole('staff')}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#3E342D] hover:bg-[#4E4138] text-[11px] text-white font-bold transition-colors cursor-pointer"
                  >
                    <ChefHat className="w-3.5 h-3.5 text-[#C9A98A]" />
                    <span>Kitchen Bar</span>
                  </button>
                  <button
                    onClick={() => setRole('admin')}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#8C6A4B] hover:bg-[#77583D] text-[11px] text-white font-bold transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin POS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7B70] gap-4">
          <p>© {new Date().getFullYear()} Arundary Cafe and Space. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for Coffee Lovers & Creative Thinkers
          </p>
        </div>
      </div>
    </footer>
  );
};
