import React, { useState } from 'react';
import { useCafe } from '../../context/CafeContext';
import { StaffMember } from '../../types';
import {
  Users,
  UserPlus,
  Shield,
  Clock,
  Phone,
  CheckCircle2,
  Trash2,
  X,
} from 'lucide-react';

export const AdminStaffManagement: React.FC = () => {
  const { staffList, showNotification } = useCafe();
  const [list, setList] = useState<StaffMember[]>(staffList);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState<'Head Barista' | 'Barista' | 'Kitchen Cook' | 'Floor Staff / Waiter' | 'Cashier'>('Barista');
  const [formShift, setFormShift] = useState('Pagi (08:00 - 16:00)');
  const [formPhone, setFormPhone] = useState('0812-3456-7890');

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newStaff: StaffMember = {
      id: `stf-${Date.now()}`,
      name: formName.trim(),
      role: formRole,
      shift: formShift,
      phone: formPhone.trim(),
      status: 'Active',
    };

    setList((prev) => [...prev, newStaff]);
    setIsModalOpen(false);
    showNotification(`Karyawan baru ${formName} berhasil didaftarkan`, 'success');
  };

  const handleDelete = (id: string, name: string) => {
    setList((prev) => prev.filter((s) => s.id !== id));
    showNotification(`Karyawan ${name} dinonaktifkan dari sistem`, 'info');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A4B]">
            Sumber Daya Manusia
          </span>
          <h1 className="font-serif-cafe text-2xl md:text-3xl font-bold text-[#1C1917]">
            Manajemen Karyawan & Kru
          </h1>
          <p className="text-xs text-[#786C62]">
            Atur shift kerja tim barista, kru dapur kitchen, dan staf lantai Arundary Cafe and Space.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#2D241E] hover:bg-[#1C1917] text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-[#D9C3B0]" />
          <span>Tambah Karyawan</span>
        </button>
      </div>

      {/* Staff Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((staff) => (
          <div
            key={staff.id}
            className="bg-white rounded-2xl border border-[#E8DDD0] p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#F5EBE1] border border-[#EAD9C8] flex items-center justify-center text-[#8C6A4B] font-serif-cafe font-bold text-base">
                    {staff.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-serif-cafe font-bold text-base text-[#1C1917]">
                      {staff.name}
                    </h3>
                    <span className="inline-block text-[11px] font-semibold text-[#8C6A4B]">
                      {staff.role}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Aktif
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#574C43] bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DDD0]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#8C6A4B]" />
                  <span>Shift: {staff.shift}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8C6A4B]" />
                  <span>Telp: {staff.phone}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F5EBE1] flex items-center justify-between">
              <span className="text-[10px] text-[#A89A8E]">ID: {staff.id}</span>
              <button
                onClick={() => handleDelete(staff.id, staff.name)}
                className="p-1.5 rounded-lg text-[#A89A8E] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Hapus / Nonaktifkan"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E8DDD0] relative animate-scale-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#E8DDD0] text-[#574C43] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="font-serif-cafe font-bold text-xl text-[#1C1917] mb-1">
              Daftarkan Kru / Karyawan
            </h2>
            <p className="text-xs text-[#786C62] mb-4">
              Lengkapi data anggota tim baru untuk akses sistem Arundary.
            </p>

            <form onSubmit={handleAddStaff} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#2D241E] mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Hidayat"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2D241E] mb-1">Jabatan / Role</label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as any)}
                  className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                >
                  <option value="Head Barista">Head Barista</option>
                  <option value="Barista">Barista</option>
                  <option value="Kitchen Cook">Kitchen Cook</option>
                  <option value="Floor Staff / Waiter">Floor Staff / Waiter</option>
                  <option value="Cashier">Cashier</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#2D241E] mb-1">Jadwal Shift</label>
                <select
                  value={formShift}
                  onChange={(e) => setFormShift(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                >
                  <option value="Pagi (08:00 - 16:00)">Pagi (08:00 - 16:00)</option>
                  <option value="Sore/Malam (15:00 - 23:00)">Sore/Malam (15:00 - 23:00)</option>
                  <option value="Full Day Weekend">Full Day Weekend</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#2D241E] mb-1">Nomor WhatsApp / Telp</label>
                <input
                  type="text"
                  required
                  placeholder="0812-xxxx-xxxx"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[#1C1917] focus:outline-none focus:border-[#8C6A4B]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8DDD0] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DDD0] text-[#574C43] font-semibold text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2D241E] hover:bg-[#1C1917] text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Daftarkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
