import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { products as defaultProducts } from "../data/products";

const StoreContext = createContext(null);

const CART_KEY = "makzen_cart_v1";
const WISHLIST_KEY = "makzen_wishlist_v1";
const PRODUCTS_OVERRIDE_KEY = "makzen_products_override_v1";
const ORDERS_LOG_KEY = "makzen_orders_log_v1";
const SETTINGS_KEY = "makzen_settings_v1";
const COUPON_KEY = "makzen_coupon_v1";

const DEFAULT_SETTINGS = {
  adminPin: "1702",
  phone: "+91 70009 09219",
  waNumber: "917000909219",
  freeShippingThreshold: 500,
  shippingFee: 49,
};

const VALID_COUPONS = {
  DIWALI20: {
    code: "DIWALI20",
    type: "percent",
    value: 20,
    title: "Diwali Dhamaka Offer",
    description: "Flat 20% OFF for the 3-day Diwali celebration",
    minOrder: 0,
  },
  SHUBH20: {
    code: "SHUBH20",
    type: "percent",
    value: 20,
    title: "Shubh Deepavali Offer",
    description: "Flat 20% OFF festive celebration discount",
    minOrder: 0,
  },
  MAKZEN50: {
    code: "MAKZEN50",
    type: "flat",
    value: 50,
    title: "Diwali ₹50 Instant Voucher",
    description: "Flat ₹50 OFF on orders above ₹500",
    minOrder: 500,
  },
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function readSettingsStorage() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    // If threshold was the legacy default of 599, migrate to 500 for Diwali
    if (parsed.freeShippingThreshold === 599 || !parsed.freeShippingThreshold) {
      parsed.freeShippingThreshold = 500;
    }
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function StoreProvider({ children }) {
  const [productOverrides, setProductOverrides] = useState(() => readStorage(PRODUCTS_OVERRIDE_KEY, {}));
  const [orders, setOrders] = useState(() => readStorage(ORDERS_LOG_KEY, []));
  const [settings, setSettings] = useState(() => readSettingsStorage());
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []));
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY, []));
  const [coupon, setCoupon] = useState(() => readStorage(COUPON_KEY, null));
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
    if (coupon) {
      localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
    } else {
      localStorage.removeItem(COUPON_KEY);
    }
  }, [coupon]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((message) => setToast({ message, id: Date.now() }), []);

  // Compute merged products with overrides (inStock, price, mrp, etc.)
  const products = useMemo(() => {
    return defaultProducts
      .filter((p) => !(productOverrides[p.id]?.deleted))
      .map((p) => {
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

  const deleteProduct = useCallback((id) => {
    setProductOverrides((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), deleted: true },
    }));
    showToast("Product deleted successfully!");
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

  const applyCoupon = useCallback(
    (inputCode) => {
      const code = (inputCode || "").trim().toUpperCase();
      const found = VALID_COUPONS[code];
      if (!found) {
        showToast("Invalid coupon code. Try DIWALI20 for 20% OFF!");
        return { success: false, message: "Invalid coupon code" };
      }
      if (found.minOrder && subtotal < found.minOrder) {
        showToast(`Order value must be at least ₹${found.minOrder} to use ${code}`);
        return { success: false, message: `Min order ₹${found.minOrder}` };
      }
      setCoupon(found);
      const discountLabel = found.type === "percent" ? `${found.value}%` : `₹${found.value}`;
      showToast(`🎉 Coupon "${code}" applied! You save ${discountLabel}!`);
      return { success: true, message: "Coupon applied" };
    },
    [subtotal, showToast]
  );

  const removeCoupon = useCallback(() => {
    setCoupon(null);
    showToast("Coupon removed");
  }, [showToast]);

  const discountAmount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.type === "percent") {
      return Math.round((subtotal * coupon.value) / 100);
    }
    if (coupon.type === "flat") {
      return Math.min(subtotal, coupon.value);
    }
    return 0;
  }, [coupon, subtotal]);

  const freeShippingThreshold = settings?.freeShippingThreshold || 500;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : (settings?.shippingFee || 49);
  const finalTotal = Math.max(0, subtotal - discountAmount) + shippingFee;

  const value = {
    products,
    getProduct,
    updateProduct,
    deleteProduct,
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
    coupon,
    appliedCoupon: coupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    freeShippingThreshold,
    shippingFee,
    finalTotal,
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

