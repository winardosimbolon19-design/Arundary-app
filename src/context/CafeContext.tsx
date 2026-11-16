import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import {
  UserRole,
  CustomerScreen,
  StaffTab,
  AdminTab,
  MenuItem,
  CartItem,
  Order,
  OrderStatus,
  CafeTable,
  StaffMember,
  CustomizationSelection,
} from '../types';
import { INITIAL_MENU_ITEMS, INITIAL_TABLES, INITIAL_ORDERS, INITIAL_STAFF } from '../data/mockData';

interface CafeContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentTable: string;
  setCurrentTable: (table: string) => void;
  customerScreen: CustomerScreen;
  setCustomerScreen: (screen: CustomerScreen) => void;
  selectedMenuItem: MenuItem | null;
  setSelectedMenuItem: (item: MenuItem | null) => void;
  menuItems: MenuItem[];
  updateMenuItemStock: (id: string, newStock: number) => void;
  toggleMenuItemAvailability: (id: string) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  editMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    quantity: number,
    customization?: CustomizationSelection,
    notes?: string
  ) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTax: number;
  cartServiceFee: number;
  cartTotal: number;
  cartItemCount: number;
  orders: Order[];
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
  activeOrder: Order | null;
  placeOrder: (
    paymentMethod: 'KASIR_TUNAI_QRIS' | 'QRIS_INSTAN',
    customerName?: string,
    customerNotes?: string
  ) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  tables: CafeTable[];
  updateTableStatus: (tableId: string, status: 'Available' | 'Occupied' | 'Reserved') => void;
  staffList: StaffMember[];
  staffTab: StaffTab;
  setStaffTab: (tab: StaffTab) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  resetDemoData: () => void;
  notification: { message: string; type: 'success' | 'info' | 'warning' | 'error' } | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  isStaffLoggedIn: boolean;
  setIsStaffLoggedIn: (logged: boolean) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (logged: boolean) => void;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MENU: 'arundary_menu_v2',
  ORDERS: 'arundary_orders_v2',
  TABLES: 'arundary_tables_v2',
  CURRENT_TABLE: 'arundary_table_num',
  ACTIVE_ORDER_ID: 'arundary_active_order',
};

export const CafeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [currentTable, setCurrentTableState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_TABLE) || 'Table A05';
  });
  const [customerScreen, setCustomerScreen] = useState<CustomerScreen>('home');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  const [staffTab, setStaffTab] = useState<StaffTab>('dashboard');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState<boolean>(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(true);

  // Notifications
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
  } | null>(null);

  const showNotification = (
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'info'
  ) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  // State with LocalStorage
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MENU);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing menu items', e);
      }
    }
    return INITIAL_MENU_ITEMS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing orders', e);
      }
    }
    return INITIAL_ORDERS;
  });

  const [tables, setTables] = useState<CafeTable[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TABLES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing tables', e);
      }
    }
    return INITIAL_TABLES;
  });

  const [activeOrderId, setActiveOrderIdState] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_ORDER_ID) || '#ARD-1025';
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const staffList = INITIAL_STAFF;

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(tables));
  }, [tables]);

  // Deep linking: parse URL params (e.g. ?table=A05, ?role=staff, /kitchen, /admin) on load
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const url = new URL(window.location.href);
      const params = url.searchParams;
      const pathname = url.pathname.toLowerCase();
      const hash = url.hash.toLowerCase();

      // Check for table param or path (e.g. ?table=A05, ?meja=A05, /table/A05, #/table/A05)
      let tableArg = params.get('table') || params.get('meja') || params.get('t');
      if (!tableArg) {
        const pathMatch = pathname.match(/\/table\/([a-zA-Z0-9_-]+)/i) || hash.match(/table\/([a-zA-Z0-9_-]+)/i);
        if (pathMatch) {
          tableArg = decodeURIComponent(pathMatch[1]);
        }
      }

      if (tableArg) {
        const cleanTable = tableArg.trim();
        const formattedTable = cleanTable.toLowerCase().startsWith('table')
          ? cleanTable
          : `Table ${cleanTable.toUpperCase()}`;

        setCurrentTableState(formattedTable);
        localStorage.setItem(STORAGE_KEYS.CURRENT_TABLE, formattedTable);
        setRole('customer');
        setCustomerScreen('welcome');
        showNotification(`Terhubung ke ${formattedTable}! Menu siap dipesan.`, 'success');
        return;
      }

      // Check for role param or path (e.g. ?role=staff, ?role=kitchen, /kitchen, /admin, /login)
      const roleArg = params.get('role');
      if (roleArg === 'staff' || roleArg === 'kitchen' || pathname.includes('/kitchen') || pathname.includes('/staff') || hash.includes('kitchen') || hash.includes('staff')) {
        setRole('staff');
        setStaffTab('kanban');
      } else if (roleArg === 'admin' || pathname.includes('/admin') || hash.includes('admin')) {
        setRole('admin');
        setAdminTab('dashboard');
      } else if (roleArg === 'login' || pathname.includes('/login') || hash.includes('login')) {
        setRole('login');
      }
    } catch (e) {
      console.error('Error parsing route params:', e);
    }
  }, []);

  const setCurrentTable = (tbl: string) => {
    setCurrentTableState(tbl);
    localStorage.setItem(STORAGE_KEYS.CURRENT_TABLE, tbl);
  };

  const setActiveOrderId = (id: string | null) => {
    setActiveOrderIdState(id);
    if (id) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ORDER_ID, id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_ORDER_ID);
    }
  };

  const activeOrder = useMemo(() => {
    if (!activeOrderId) return null;
    return orders.find((o) => o.id === activeOrderId) || null;
  }, [activeOrderId, orders]);

  // Menu Management
  const updateMenuItemStock = (id: string, newStock: number) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const clamped = Math.max(0, newStock);
          return {
            ...item,
            stock: clamped,
            isAvailable: clamped > 0,
          };
        }
        return item;
      })
    );
  };

  const toggleMenuItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newAvail = !item.isAvailable;
          return {
            ...item,
            isAvailable: newAvail,
            stock: newAvail && item.stock === 0 ? 10 : item.stock,
          };
        }
        return item;
      })
    );
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `menu-${Date.now()}`,
    };
    setMenuItems((prev) => [newItem, ...prev]);
    showNotification(`Menu "${item.name}" berhasil ditambahkan`, 'success');
  };

  const editMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    showNotification(`Menu "${updatedItem.name}" berhasil diperbarui`, 'success');
  };

  const deleteMenuItem = (id: string) => {
    const item = menuItems.find((m) => m.id === id);
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
    showNotification(`Menu "${item?.name || ''}" berhasil dihapus`, 'info');
  };

  // Cart Management
  const addToCart = (
    item: MenuItem,
    quantity: number,
    customization?: CustomizationSelection,
    notes?: string
  ) => {
    if (!item.isAvailable || item.stock <= 0) {
      showNotification('Menu ini sedang tidak tersedia / stok habis', 'warning');
      return;
    }

    setCart((prev) => {
      // Find matching item with same customization & notes
      const customKey = JSON.stringify({ customization, notes: notes || '' });
      const existingIndex = prev.findIndex(
        (c) =>
          c.menuItem.id === item.id &&
          JSON.stringify({ customization: c.customization, notes: c.notes || '' }) === customKey
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const existing = next[existingIndex];
        const newQty = existing.quantity + quantity;
        next[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: newQty * existing.unitPrice,
        };
        return next;
      }

      const unitPrice = item.price;
      const newCartItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        menuItem: item,
        quantity,
        customization,
        notes,
        unitPrice,
        totalPrice: unitPrice * quantity,
      };
      return [...prev, newCartItem];
    });

    showNotification(`${quantity}x ${item.name} ditambahkan ke keranjang`, 'success');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cart]);

  const cartTax = useMemo(() => {
    return Math.round(cartSubtotal * 0.1); // PB1 10%
  }, [cartSubtotal]);

  const cartServiceFee = useMemo(() => {
    return cartSubtotal > 0 ? 3000 : 0;
  }, [cartSubtotal]);

  const cartTotal = useMemo(() => {
    return cartSubtotal + cartTax + cartServiceFee;
  }, [cartSubtotal, cartTax, cartServiceFee]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Order Placement
  const placeOrder = (
    paymentMethod: 'KASIR_TUNAI_QRIS' | 'QRIS_INSTAN',
    customerName?: string,
    customerNotes?: string
  ): Order => {
    const orderNum = `#ARD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const displayTime = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: orderNum,
      tableNumber: currentTable,
      createdAt: now.toISOString(),
      displayTime,
      items: cart.map((c) => {
        let customizationSummary = '';
        if (c.customization) {
          const parts: string[] = [];
          if (c.customization.iceLevel) parts.push(c.customization.iceLevel);
          if (c.customization.sugarLevel) parts.push(c.customization.sugarLevel);
          if (c.customization.extras && c.customization.extras.length > 0) {
            parts.push(...c.customization.extras);
          }
          customizationSummary = parts.join(', ');
        }

        return {
          menuItemId: c.menuItem.id,
          name: c.menuItem.name,
          price: c.unitPrice,
          quantity: c.quantity,
          notes: c.notes,
          customizationSummary: customizationSummary || undefined,
          subtotal: c.totalPrice,
          image: c.menuItem.image,
        };
      }),
      subtotal: cartSubtotal,
      tax: cartTax,
      serviceFee: cartServiceFee,
      total: cartTotal,
      status: 'PESANAN DITERIMA',
      customerName: customerName || currentTable,
      customerNotes: customerNotes ? customerNotes.trim() : undefined,
      paymentMethod,
      paymentStatus: paymentMethod === 'QRIS_INSTAN' ? 'PAID' : 'PENDING_KASIR',
      statusTimestamps: {
        'PESANAN DITERIMA': displayTime,
      },
    };

    // Decrement stock for ordered items
    setMenuItems((prev) =>
      prev.map((m) => {
        const ordered = cart.find((c) => c.menuItem.id === m.id);
        if (ordered) {
          const nextStock = Math.max(0, m.stock - ordered.quantity);
          return {
            ...m,
            stock: nextStock,
            isAvailable: nextStock > 0,
          };
        }
        return m;
      })
    );

    // Update tables status to Occupied
    const tableId = currentTable.replace(/\D/g, '');
    setTables((prev) =>
      prev.map((t) =>
        t.name.toLowerCase() === currentTable.toLowerCase() || t.id === tableId
          ? { ...t, status: 'Occupied', currentOrderId: orderNum }
          : t
      )
    );

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    clearCart();
    showNotification(`Pesanan ${newOrder.id} berhasil dikirim ke dapur!`, 'success');

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const timeNow = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedTimestamps = {
            ...o.statusTimestamps,
            [newStatus]: timeNow,
          };
          return {
            ...o,
            status: newStatus,
            statusTimestamps: updatedTimestamps,
          };
        }
        return o;
      })
    );

    showNotification(`Status ${orderId} diubah menjadi: ${newStatus}`, 'info');
  };

  const updateTableStatus = (
    tableId: string,
    status: 'Available' | 'Occupied' | 'Reserved'
  ) => {
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, status } : t))
    );
  };

  const resetDemoData = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    setOrders(INITIAL_ORDERS);
    setTables(INITIAL_TABLES);
    setCurrentTable('Table A05');
    setActiveOrderId('#ARD-1025');
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.MENU);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.TABLES);
    showNotification('Data demo berhasil direset ke kondisi awal', 'info');
  };

  return (
    <CafeContext.Provider
      value={{
        role,
        setRole,
        currentTable,
        setCurrentTable,
        customerScreen,
        setCustomerScreen,
        selectedMenuItem,
        setSelectedMenuItem,
        menuItems,
        updateMenuItemStock,
        toggleMenuItemAvailability,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTax,
        cartServiceFee,
        cartTotal,
        cartItemCount,
        orders,
        activeOrderId,
        setActiveOrderId,
        activeOrder,
        placeOrder,
        updateOrderStatus,
        tables,
        updateTableStatus,
        staffList,
        staffTab,
        setStaffTab,
        adminTab,
        setAdminTab,
        resetDemoData,
        notification,
        showNotification,
        isStaffLoggedIn,
        setIsStaffLoggedIn,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
