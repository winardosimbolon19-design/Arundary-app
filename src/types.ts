export type UserRole = 'customer' | 'staff' | 'admin' | 'login';

export type CustomerScreen =
  | 'home'
  | 'menu'
  | 'space'
  | 'table_qr'
  | 'location'
  | 'welcome'
  | 'detail'
  | 'cart'
  | 'confirmation'
  | 'success'
  | 'monitoring';

export type StaffTab =
  | 'dashboard'
  | 'orders'
  | 'kanban'
  | 'menu_stock'
  | 'tables';

export type AdminTab =
  | 'dashboard'
  | 'orders'
  | 'menu'
  | 'categories'
  | 'stock'
  | 'tables'
  | 'reports'
  | 'staff'
  | 'settings';

export type OrderStatus =
  | 'PESANAN DITERIMA'
  | 'SEDANG DISIAPKAN'
  | 'SEDANG DIMASAK'
  | 'SIAP DIAMBIL'
  | 'SELESAI';

export type StockStatus = 'AVAILABLE' | 'LOW STOCK' | 'OUT OF STOCK';

export type MenuCategory =
  | 'Semua'
  | 'Coffee'
  | 'Non Coffee'
  | 'Main Course'
  | 'Snack'
  | 'Dessert';

export interface CustomizationSelection {
  iceLevel?: 'Normal Ice' | 'Less Ice' | 'No Ice';
  sugarLevel?: 'Normal Sugar' | 'Less Sugar' | 'No Sugar';
  extras?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  stock: number;
  isAvailable: boolean;
  preparationTimeMinutes: number;
  popular?: boolean;
}

export interface CartItem {
  id: string; // unique cart line id
  menuItem: MenuItem;
  quantity: number;
  customization?: CustomizationSelection;
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderItemRecord {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  customizationSummary?: string;
  subtotal: number;
  image?: string;
}

export interface Order {
  id: string; // e.g. "#ARD-1025"
  tableNumber: string; // e.g. "Table A05"
  createdAt: string; // ISO string
  displayTime: string; // "16:32"
  items: OrderItemRecord[];
  subtotal: number;
  tax: number; // PB1 10%
  serviceFee: number;
  total: number;
  status: OrderStatus;
  customerName?: string;
  customerNotes?: string;
  paymentMethod: 'KASIR_TUNAI_QRIS' | 'QRIS_INSTAN';
  paymentStatus: 'PAID' | 'PENDING_KASIR';
  statusTimestamps: Partial<Record<OrderStatus, string>>;
}

export interface CafeTable {
  id: string; // e.g. "A05"
  name: string; // "Table A05"
  section: 'Indoor' | 'Outdoor' | 'VIP Space';
  capacity: number;
  status: 'Available' | 'Occupied' | 'Reserved';
  currentOrderId?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  avatar?: string;
  phone?: string;
  status: 'Active' | 'On Break' | 'Inactive';
}
