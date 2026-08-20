import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { products as defaultProducts } from "../data/products";

const StoreContext = createContext(null);

const CART_KEY = "makzen_cart_v1";
const WISHLIST_KEY = "makzen_wishlist_v1";
const PRODUCTS_OVERRIDE_KEY = "makzen_products_override_v1";
const ORDERS_LOG_KEY = "makzen_orders_log_v1";
const SETTINGS_KEY = "makzen_settings_v1";

const DEFAULT_SETTINGS = {
  adminPin: "1702",
  phone: "+91 94149 31938",
  waNumber: "919414931938",
  freeShippingThreshold: 599,
  shippingFee: 49,
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [productOverrides, setProductOverrides] = useState(() => readStorage(PRODUCTS_OVERRIDE_KEY, {}));
  const [orders, setOrders] = useState(() => readStorage(ORDERS_LOG_KEY, []));
  const [settings, setSettings] = useState(() => readStorage(SETTINGS_KEY, DEFAULT_SETTINGS));
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []));
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY, []));
  const [isCartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(PRODUCTS_OVERRIDE_KEY, JSON.stringify(productOverrides));
  }, [productOverrides]);

  useEffect(() => {
    localStorage.setItem(ORDERS_LOG_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((message) => setToast({ message, id: Date.now() }), []);

  // Compute merged products with overrides (inStock, price, mrp, etc.)
  const products = useMemo(() => {
    return defaultProducts.map((p) => {
      const override = productOverrides[p.id] || {};
      return {
        ...p,
        ...override,
        inStock: override.inStock !== undefined ? override.inStock : true,
      };
    });
  }, [productOverrides]);

  const getProduct = useCallback((id) => products.find((p) => p.id === id), [products]);

  const updateProduct = useCallback((id, changes) => {
    setProductOverrides((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), ...changes },
    }));
    showToast("Product updated successfully!");
  }, [showToast]);

  const toggleProductStock = useCallback((id) => {
    setProductOverrides((prev) => {
      const current = prev[id]?.inStock !== undefined ? prev[id].inStock : true;
      return {
        ...prev,
        [id]: { ...(prev[id] || {}), inStock: !current },
      };
    });
  }, []);

  const resetProductOverrides = useCallback(() => {
    setProductOverrides({});
    showToast("Product catalogue reset to defaults");
  }, [showToast]);

  // Orders Management
  const addOrder = useCallback((orderData) => {
    setOrders((prev) => [
      {
        id: orderData.orderId || `MKZ-${Math.floor(100000 + Math.random() * 900000)}`,
        status: "Pending Payment",
        createdAt: new Date().toISOString(),
        ...orderData,
      },
      ...prev,
    ]);
  }, []);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId || o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order status updated to: ${status}`);
  }, [showToast]);

  const deleteOrder = useCallback((orderId) => {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId && o.id !== orderId));
    showToast("Order removed from list");
  }, [showToast]);

  const clearAllOrders = useCallback(() => {
    setOrders([]);
    showToast("Order history cleared");
  }, [showToast]);

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast("Settings saved!");
  }, [showToast]);

  // Cart & Wishlist actions
  const addToCart = useCallback(
    (productId, qty = 1) => {
      const product = products.find((p) => p.id === productId);
      if (product && product.inStock === false) {
        showToast("Sorry, this item is currently out of stock!");
        return;
      }
      setCart((prev) => {
        const existing = prev.find((i) => i.id === productId);
        if (existing) {
          return prev.map((i) => (i.id === productId ? { ...i, qty: i.qty + qty } : i));
        }
        return [...prev, { id: productId, qty }];
      });
      showToast(`${product ? product.name : "Item"} added to cart`);
      setCartOpen(true);
    },
    [products, showToast]
  );

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const updateQty = useCallback((productId, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== productId)
        : prev.map((i) => (i.id === productId ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => {
        const has = prev.includes(productId);
        const product = products.find((p) => p.id === productId);
        showToast(has ? `${product?.name || "Item"} removed from wishlist` : `${product?.name || "Item"} added to wishlist`);
        return has ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
    [products, showToast]
  );

  const cartWithDetails = useMemo(
    () =>
      cart
        .map((item) => ({ ...item, product: products.find((p) => p.id === item.id) }))
        .filter((i) => i.product),
    [cart, products]
  );

  const subtotal = useMemo(
    () => cartWithDetails.reduce((sum, i) => sum + (i.product.price || 0) * i.qty, 0),
    [cartWithDetails]
  );

  const itemCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  const value = {
    products,
    getProduct,
    updateProduct,
    toggleProductStock,
    resetProductOverrides,
    orders,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    clearAllOrders,
    settings,
    updateSettings,
    cart: cartWithDetails,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    subtotal,
    itemCount,
    isCartOpen,
    setCartOpen,
    wishlist,
    toggleWishlist,
    toast,
    showToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

