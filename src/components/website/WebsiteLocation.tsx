import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Mail,
  Car,
  Compass,
  CheckCircle2,
  ExternalLink,
  Send,
  HelpCircle,
  Coffee,
} from 'lucide-react';

export const WebsiteLocation: React.FC = () => {
  const { showNotification } = useCafe();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMessage) return;
    setSubmitted(true);
    showNotification('Terima kasih! Pesanmu telah berhasil dikirim ke tim Arundary.', 'success');
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setSubmitted(false);
    }, 4000);
  };

  const faqs = [
    {
      q: 'Apakah diperbolehkan membawa laptop untuk kerja/nugas (WFC)?',
      a: 'Tentu saja! Arundary didesain khusus sebagai co-working cafe friendly. Tidak ada biaya sewa meja harian, Anda cukup memesan makanan atau minuman favorit Anda.',
    },
    {
      q: 'Apakah setiap meja dilengkapi dengan colokan listrik?',
      a: 'Ya, hampir seluruh meja di area Indoor maupun Outdoor semi-terbuka dilengkapi dengan stopkontak listrik pribadi agar Anda bisa bekerja tanpa khawatir kehabisan baterai.',
    },
    {
      q: 'Bagaimana kecepatan Wi-Fi di Arundary?',
      a: 'Kami menggunakan dedicated fiber optic berkecepatan hingga 100 Mbps dengan latency rendah, sangat stabil untuk kebutuhan meeting Zoom, Google Meet, maupun upload video.',
    },
    {
      q: 'Apakah bisa reservasi untuk acara ulang tahun, gathering, atau meeting?',
      a: 'Bisa! Kami memiliki Private Meeting Room (kapasitas 8-15 orang) dan opsi sewa area/semi-private. Silakan hubungi kami langsung via WhatsApp untuk ketersediaan tanggal dan paket.',
    },
    {
      q: 'Bagaimana cara memesan makanan & minuman dari meja?',
      a: 'Cukup scan QR code pada stand akrilik di meja Anda atau gunakan tombol "Pesan dari Meja" di website ini. Anda dapat memilih menu, kustomisasi rasa, dan membayar via QRIS atau di kasir.',
    },
  ];

  return (
    <div className="flex-1 bg-[#FAF7F2] text-[#1C1917] pb-24">
      {/* Top Banner */}
      <div className="bg-[#1C1917] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E251F] border border-[#4A3B31] text-xs font-semibold text-[#D9C3B0] mb-4">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Lokasi & Kontak</span>
          </div>
          <h1 className="font-serif-cafe text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Kunjungi Arundary Cafe and Space
          </h1>
          <p className="text-sm sm:text-base text-[#C7B5A3] leading-relaxed">
            Berlokasi di kawasan tenang dan asri di Jakarta Selatan. Mudah dijangkau dengan kendaraan
            pribadi maupun transportasi publik.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Address */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DDD0] shadow-lg flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] text-[#8C6A4B] flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1C1917]">Alamat Lengkap</h3>
              <p className="text-xs text-[#705844] mt-1 leading-relaxed">
                Jl. Cempaka Raya No. 18, Cilandak, Jakarta Selatan, DKI Jakarta 12430
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-xs text-[#8C6A4B] hover:text-[#5F4630] font-bold inline-flex items-center gap-1"
              >
                <span>Petunjuk Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2: Hours */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DDD0] shadow-lg flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] text-[#8C6A4B] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1C1917]">Jam Operasional</h3>
              <p className="text-xs text-[#705844] mt-1 leading-relaxed">
                Senin - Minggu: <strong>08:00 - 23:00 WIB</strong>
              </p>
              <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
                Buka Setiap Hari (Tanpa Libur)
              </span>
            </div>
          </div>

          {/* Card 3: Contact */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DDD0] shadow-lg flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] text-[#8C6A4B] flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1C1917]">Kontak & Reservasi</h3>
              <p className="text-xs text-[#705844] mt-1 leading-relaxed">
                WhatsApp: +62 812-3456-7890
                <br />
                Instagram: @arundary.space
              </p>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-xs text-[#8C6A4B] hover:text-[#5F4630] font-bold inline-flex items-center gap-1"
              >
                <span>Chat via WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Map & Directions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Map Preview Container */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-[#E8DDD0] shadow-sm">
            <div className="p-4 border-b border-[#E8DDD0] bg-[#FAF7F2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#8C6A4B]" />
                <span className="text-xs font-bold text-[#1C1917]">Peta Lokasi & Sekitar</span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8C6A4B] hover:underline font-bold flex items-center gap-1"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="h-96 relative bg-[#EFE3D5]">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                alt="Map Visual Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6">
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl text-center max-w-xs border border-[#E8DDD0]">
                  <div className="w-12 h-12 rounded-full bg-[#8C6A4B] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-[#1C1917]">Arundary Cafe & Space</h4>
                  <p className="text-[11px] text-[#705844] mt-1">
                    Jl. Cempaka Raya No. 18, Jakarta Selatan
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2D241E] text-white text-xs font-bold hover:bg-black transition-colors"
                  >
                    <span>Navigasi Sekarang</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
            {/* Transport accessibility notes */}
            <div className="p-6 bg-white space-y-3 text-xs text-[#574536]">
              <h4 className="font-bold text-sm text-[#1C1917]">Panduan Transportasi:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD0]">
                  <p className="font-bold text-[#1C1917]">Kendaraan Pribadi</p>
                  <p className="text-[11px] text-[#705844] mt-0.5">
                    Tersedia area parkir mobil (8 slot) dan parkir motor yang luas dan aman dengan petugas jaga.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD0]">
                  <p className="font-bold text-[#1C1917]">Transportasi Publik</p>
                  <p className="text-[11px] text-[#705844] mt-0.5">
                    Hanya 5 menit berkendara dari Stasiun MRT terdekat atau 300 meter dari halte Transjakarta.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD0] shadow-sm">
            <h3 className="font-serif-cafe text-xl font-bold text-[#1C1917]">
              Kirim Pesan / Pertanyaan
            </h3>
            <p className="text-xs text-[#705844] mt-1 mb-6">
              Punya pertanyaan seputar ketersediaan space, kolaborasi, atau katering event? Kirimkan pesan Anda:
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 text-emerald-900">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-sm">Pesan Berhasil Terkirim!</p>
                <p className="text-xs text-emerald-700">
                  Tim kami akan segera menghubungi Anda melalui email atau WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D241E] mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD0] bg-[#FAF7F2] text-xs text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D241E] mb-1.5">
                    Email / Nomor WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: budi@gmail.com / 08123456789"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD0] bg-[#FAF7F2] text-xs text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D241E] mb-1.5">
                    Pesan / Pertanyaan
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD0] bg-[#FAF7F2] text-xs text-[#1C1917] focus:outline-none focus:border-[#8C6A4B] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#8C6A4B] hover:bg-[#77583D] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8DDD0] shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-[#8C6A4B]" />
            <h3 className="font-serif-cafe text-xl font-bold text-[#1C1917]">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD0] space-y-2">
                <p className="font-bold text-xs text-[#1C1917]">{faq.q}</p>
                <p className="text-xs text-[#574536] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
