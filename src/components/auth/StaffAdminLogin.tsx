import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { ArundaryLogo } from '../ArundaryLogo';
import { Lock, Mail, ArrowRight, ShieldCheck, ChefHat, ArrowLeft, KeyRound } from 'lucide-react';

export const StaffAdminLogin: React.FC = () => {
  const { setRole, showNotification } = useCafe();
  const [selectedRoleTarget, setSelectedRoleTarget] = useState<'staff' | 'admin'>('staff');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRoleTarget);
    showNotification(
      `Selamat datang di Portal ${selectedRoleTarget === 'admin' ? 'Admin' : 'Staff Kitchen'}`,
      'success'
    );
  };

  const handleQuickDemo = (role: 'staff' | 'admin') => {
    setRole(role);
    showNotification(
      `Masuk otomatis demo sebagai ${role === 'admin' ? 'Admin Manajemen' : 'Staff Barista'}`,
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative Warm Ambient Blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#EFE3D5] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#F2E8DC] rounded-full blur-3xl opacity-80 pointer-events-none" />

      {/* Top back button */}
      <div className="flex items-center justify-between relative z-10 max-w-md w-full mx-auto">
        <button
          onClick={() => setRole('customer')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8DDD0] text-xs font-semibold text-[#574C43] hover:bg-[#F5EBE1] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Menu Tamu</span>
        </button>
        <span className="text-[11px] font-semibold text-[#8C6A4B]">Akses Internal Cafe</span>
      </div>

      {/* Center Login Box */}
      <div className="max-w-md w-full mx-auto my-auto relative z-10 py-6">
        <div className="bg-white rounded-3xl border border-[#E8DDD0] p-6 sm:p-8 shadow-xl space-y-6">
          {/* Logo and Brand Title */}
          <div className="text-center space-y-2">
            <ArundaryLogo size={64} variant="circular" className="mx-auto" />
            <h1 className="font-serif-cafe text-2xl font-bold text-[#1C1917]">
              Portal Masuk Staf & Admin
            </h1>
            <p className="text-xs text-[#786C62]">
              Sistem Operasional Meja & Dapur Arundary Cafe and Space
            </p>
          </div>

          {/* Role Target Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#FAF7F2] rounded-2xl border border-[#E8DDD0]">
            <button
              type="button"
              onClick={() => setSelectedRoleTarget('staff')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedRoleTarget === 'staff'
                  ? 'bg-[#2D241E] text-white shadow-sm'
                  : 'text-[#786C62] hover:text-[#1C1917]'
              }`}
            >
              <ChefHat className="w-4 h-4 text-[#D9C3B0]" />
              <span>Staff Kitchen</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRoleTarget('admin')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedRoleTarget === 'admin'
                  ? 'bg-[#2D241E] text-white shadow-sm'
                  : 'text-[#786C62] hover:text-[#1C1917]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#D9C3B0]" />
              <span>Admin Cafe</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#2D241E] mb-1.5">
                ID Karyawan / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A89A8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={
                    selectedRoleTarget === 'staff'
                      ? 'barista@arundary.id'
                      : 'admin@arundary.id'
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-xs text-[#1C1917] placeholder-[#A89A8E] focus:outline-none focus:border-[#8C6A4B]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#2D241E] mb-1.5">
                Kata Sandi (PIN)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A89A8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-xs text-[#1C1917] placeholder-[#A89A8E] focus:outline-none focus:border-[#8C6A4B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#2D241E] hover:bg-[#1C1917] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Masuk Sebagai {selectedRoleTarget === 'staff' ? 'Staff' : 'Admin'}</span>
              <ArrowRight className="w-4 h-4 text-[#D9C3B0]" />
            </button>
          </form>

          {/* Quick Access Demo Buttons for Immediate Testing */}
          <div className="pt-2 border-t border-[#F5EBE1] space-y-2">
            <p className="text-[11px] text-center text-[#A89A8E]">
              Akses Cepat Pengujian Langsung:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('staff')}
                className="py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-[#E8DDD0] hover:bg-[#F5EBE1] text-[#2D241E] font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ChefHat className="w-3.5 h-3.5 text-[#8C6A4B]" />
                <span>Demo Staff</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-[#E8DDD0] hover:bg-[#F5EBE1] text-[#2D241E] font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C6A4B]" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-[11px] text-[#A89A8E] relative z-10 py-2">
        ARUNDARY CAFE AND SPACE • Hak Cipta Dilindungi
      </footer>
    </div>
  );
};
