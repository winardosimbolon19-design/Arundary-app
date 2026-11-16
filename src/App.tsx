import React, { useState } from 'react';
import { CafeProvider, useCafe } from './context/CafeContext';
import { UserRole } from './types';
import { ArundaryLogo } from './components/ArundaryLogo';

// Website components
import { WebsiteNavbar } from './components/website/WebsiteNavbar';
import { WebsiteFooter } from './components/website/WebsiteFooter';
import { WebsiteHome } from './components/website/WebsiteHome';
import { WebsiteSpace } from './components/website/WebsiteSpace';
import { WebsiteTableQR } from './components/website/WebsiteTableQR';
import { WebsiteLocation } from './components/website/WebsiteLocation';

// Customer screens
import { CustomerWelcome } from './components/customer/CustomerWelcome';
import { CustomerMenu } from './components/customer/CustomerMenu';
import { CustomerMenuDetail } from './components/customer/CustomerMenuDetail';
import { CustomerCart } from './components/customer/CustomerCart';
import { CustomerOrderConfirmation } from './components/customer/CustomerOrderConfirmation';
import { CustomerOrderSuccess } from './components/customer/CustomerOrderSuccess';
import { CustomerOrderMonitoring } from './components/customer/CustomerOrderMonitoring';

// Staff components
import { StaffSidebar } from './components/staff/StaffSidebar';
import { StaffDashboard } from './components/staff/StaffDashboard';
import { StaffKanban } from './components/staff/StaffKanban';
import { StaffMenuStock } from './components/staff/StaffMenuStock';

// Admin components
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminReports } from './components/admin/AdminReports';
import { AdminTableQR } from './components/admin/AdminTableQR';
import { AdminMenuManagement } from './components/admin/AdminMenuManagement';
import { AdminStaffManagement } from './components/admin/AdminStaffManagement';
import { AdminSettings } from './components/admin/AdminSettings';

// Auth
import { StaffAdminLogin } from './components/auth/StaffAdminLogin';

// Icons
import {
  Smartphone,
  ChefHat,
  ShieldCheck,
  KeyRound,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronDown,
} from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    role,
    setRole,
    customerScreen,
    staffTab,
    setStaffTab,
    adminTab,
    setAdminTab,
    currentTable,
    setCurrentTable,
    notification,
  } = useCafe();

  const [tableDropdownOpen, setTableDropdownOpen] = useState(false);

  const availableTables = ['Table A01', 'Table A02', 'Table A03', 'Table A04', 'Table A05', 'Table A06', 'Table B01', 'Table B02', 'Table B03'];

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans-cafe text-[#1C1917] flex flex-col">
      {/* Global Notification Toast */}
      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div
            className={`px-4 py-2.5 rounded-2xl shadow-xl border flex items-center gap-2 text-xs font-bold ${
              notification.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : notification.type === 'error'
                ? 'bg-rose-900 text-white border-rose-700'
                : 'bg-[#2D241E] text-white border-[#8C6A4B]'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            ) : (
              <Info className="w-4 h-4 text-[#D9C3B0]" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Top Demo Role Switcher Bar */}
      <header className="sticky top-0 z-40 bg-[#1C1917] text-white border-b border-[#332A24] px-4 py-2 flex flex-wrap items-center justify-between gap-2 shadow-md">
        <div className="flex items-center gap-2.5">
          <ArundaryLogo size={28} variant="circular" color="white" />
          <div className="hidden sm:block">
            <span className="font-serif-cafe font-bold text-xs tracking-wider text-white">
              ARUNDARY CAFE AND SPACE
            </span>
            <span className="text-[10px] text-[#A89A8E] ml-2 hidden md:inline">
              QR Ordering & Kitchen Monitoring
            </span>
          </div>
        </div>

        {/* Role Toggle Switchers */}
        <div className="flex items-center gap-1.5 bg-[#2A2420] p-1 rounded-xl border border-[#3E342D] text-xs">
          {/* Customer Button */}
          <button
            onClick={() => setRole('customer')}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              role === 'customer'
                ? 'bg-[#8C6A4B] text-white shadow-sm'
                : 'text-[#D6CBBF] hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px]">Tamu ({currentTable})</span>
          </button>

          {/* Quick Table Switcher dropdown in Customer Mode */}
          {role === 'customer' && (
            <div className="relative">
              <button
                onClick={() => setTableDropdownOpen(!tableDropdownOpen)}
                className="px-1.5 py-1 rounded bg-black/20 hover:bg-black/40 text-[10px] text-[#D9C3B0] flex items-center gap-0.5 cursor-pointer"
                title="Ganti nomor meja simulasi"
              >
                <span>Ganti Meja</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {tableDropdownOpen && (
                <div className="absolute top-full mt-1.5 right-0 bg-[#2D241E] border border-[#4A3B31] rounded-xl shadow-2xl p-1.5 w-36 z-50 text-[11px] space-y-0.5">
                  <div className="px-2 py-1 text-[9px] font-bold text-[#A89A8E] uppercase tracking-wider">
                    Pilih Meja QR
                  </div>
                  {availableTables.map((tbl) => (
                    <button
                      key={tbl}
                      onClick={() => {
                        setCurrentTable(tbl);
                        setTableDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded-lg cursor-pointer ${
                        currentTable === tbl
                          ? 'bg-[#8C6A4B] text-white font-bold'
                          : 'text-[#E8DDD0] hover:bg-[#3D3129]'
                      }`}
                    >
                      {tbl}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Staff Kitchen Button */}
          <button
            onClick={() => setRole('staff')}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              role === 'staff'
                ? 'bg-[#8C6A4B] text-white shadow-sm'
                : 'text-[#D6CBBF] hover:text-white'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span className="text-[11px]">Staff Kitchen</span>
          </button>

          {/* Admin Button */}
          <button
            onClick={() => setRole('admin')}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              role === 'admin'
                ? 'bg-[#8C6A4B] text-white shadow-sm'
                : 'text-[#D6CBBF] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[11px]">Admin</span>
          </button>

          {/* Login Page View */}
          <button
            onClick={() => setRole('login')}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              role === 'login'
                ? 'bg-[#8C6A4B] text-white shadow-sm'
                : 'text-[#D6CBBF] hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="text-[11px]">Login</span>
          </button>
        </div>
      </header>

      {/* Main View Area Based on Active Role */}
      <div className="flex-1 flex flex-col">
        {/* ROLE 1: CUSTOMER (Full Website Experience) */}
        {role === 'customer' && (
          <div className="flex-1 flex flex-col justify-between">
            <WebsiteNavbar />
            <div className="flex-1 flex flex-col">
              {customerScreen === 'home' && <WebsiteHome />}
              {customerScreen === 'menu' && <CustomerMenu />}
              {customerScreen === 'space' && <WebsiteSpace />}
              {customerScreen === 'table_qr' && <WebsiteTableQR />}
              {customerScreen === 'location' && <WebsiteLocation />}
              {customerScreen === 'welcome' && <CustomerWelcome />}
              {customerScreen === 'detail' && <CustomerMenuDetail />}
              {customerScreen === 'cart' && <CustomerCart />}
              {customerScreen === 'confirmation' && <CustomerOrderConfirmation />}
              {customerScreen === 'success' && <CustomerOrderSuccess />}
              {customerScreen === 'monitoring' && <CustomerOrderMonitoring />}
            </div>
            <WebsiteFooter />
          </div>
        )}

        {/* ROLE 2: STAFF / KITCHEN */}
        {role === 'staff' && (
          <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-49px)]">
            <StaffSidebar currentTab={staffTab} onSelectTab={setStaffTab} />
            <main className="flex-1 bg-[#FAF7F2] overflow-y-auto">
              {staffTab === 'dashboard' && (
                <StaffDashboard onOpenKanban={() => setStaffTab('kanban')} />
              )}
              {staffTab === 'orders' && <StaffDashboard onOpenKanban={() => setStaffTab('kanban')} />}
              {staffTab === 'kanban' && <StaffKanban />}
              {staffTab === 'menu_stock' && <StaffMenuStock />}
              {staffTab === 'tables' && <AdminTableQR />}
            </main>
          </div>
        )}

        {/* ROLE 3: ADMIN */}
        {role === 'admin' && (
          <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-49px)]">
            <AdminSidebar currentTab={adminTab} onSelectTab={setAdminTab} />
            <main className="flex-1 bg-[#FAF7F2] overflow-y-auto">
              {adminTab === 'dashboard' && <AdminDashboard />}
              {adminTab === 'orders' && <StaffKanban />}
              {adminTab === 'menu' && <AdminMenuManagement />}
              {adminTab === 'categories' && <AdminMenuManagement />}
              {adminTab === 'stock' && <StaffMenuStock />}
              {adminTab === 'tables' && <AdminTableQR />}
              {adminTab === 'reports' && <AdminReports />}
              {adminTab === 'staff' && <AdminStaffManagement />}
              {adminTab === 'settings' && <AdminSettings />}
            </main>
          </div>
        )}

        {/* ROLE 4: LOGIN PORTAL */}
        {role === 'login' && <StaffAdminLogin />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CafeProvider>
      <MainApp />
    </CafeProvider>
  );
}
