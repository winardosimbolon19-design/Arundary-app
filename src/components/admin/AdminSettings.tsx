import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import { Settings, Save, Coffee, Clock, MapPin, Phone, Wifi, Shield } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { showNotification } = useCafe();
  const [cafeName, setCafeName] = useState('ARUNDARY CAFE AND SPACE');
  const [openHours, setOpenHours] = useState('08:00 - 23:00 WIB');
  const [wifiSsid, setWifiSsid] = useState('Arundary_Space_5G');
  const [wifiPass, setWifiPass] = useState('ngopidiarundary');
  const [address, setAddress] = useState('Jl. Cempaka Raya No. 18, Jakarta Selatan');
  const [taxRate, setTaxRate] = useState(10);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Konfigurasi cafe dan parameter sistem berhasil disimpan', 'success');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B]">
          Preferensi Sistem
        </span>
        <h1 className="font-serif-cafe text-2xl md:text-3xl font-bold text-[#1C1917]">
          Pengaturan Arundary Cafe
        </h1>
        <p className="text-xs text-[#786C62]">
          Konfigurasi informasi operasional, pajak (PB1), jam buka, dan jaringan WiFi tamu.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#E8DDD0] p-6 shadow-sm space-y-5 text-xs">
        <div className="flex items-center gap-4 border-b border-[#F5EBE1] pb-4">
          <ArundaryLogo size={56} variant="circular" />
          <div>
            <h3 className="font-serif-cafe font-bold text-base text-[#1C1917]">
              Identitas Brand Cafe
            </h3>
            <p className="text-xs text-[#786C62]">
              Logo resmi dan tipografi terpadu telah diterapkan di semua tampilan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-[#2D241E] mb-1">Nama Tempat</label>
            <input
              type="text"
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2D241E] mb-1">Jam Operasional</label>
            <input
              type="text"
              value={openHours}
              onChange={(e) => setOpenHours(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-[#2D241E] mb-1">Nama WiFi Meja Tamu (SSID)</label>
            <input
              type="text"
              value={wifiSsid}
              onChange={(e) => setWifiSsid(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2D241E] mb-1">Password WiFi</label>
            <input
              type="text"
              value={wifiPass}
              onChange={(e) => setWifiPass(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-[#2D241E] mb-1">Alamat Cafe</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2D241E] mb-1">Pajak Restoran PB1 (%)</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#F5EBE1] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#2D241E] hover:bg-[#1C1917] text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#D9C3B0]" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
