import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { products as allProducts } from "../data/products";

const StoreContext = createContext(null);

const CART_KEY = "makzen_cart_v1";
const WISHLIST_KEY = "makzen_wishlist_v1";

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []));
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY, []));
  const [isCartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

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

  const addToCart = useCallback(
    (productId, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === productId);
        if (existing) {
          return prev.map((i) => (i.id === productId ? { ...i, qty: i.qty + qty } : i));
        }
        return [...prev, { id: productId, qty }];
      });
      const product = allProducts.find((p) => p.id === productId);
      showToast(`${product ? product.name : "Item"} added to cart`);
      setCartOpen(true);
    },
    [showToast]
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

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => {
        const has = prev.includes(productId);
        const product = allProducts.find((p) => p.id === productId);
        showToast(has ? `${product?.name || "Item"} removed from wishlist` : `${product?.name || "Item"} added to wishlist`);
        return has ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
    [showToast]
  );

  const cartWithDetails = useMemo(
    () =>
      cart
        .map((item) => ({ ...item, product: allProducts.find((p) => p.id === item.id) }))
        .filter((i) => i.product),
    [cart]
  );

  const subtotal = useMemo(
    () => cartWithDetails.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [cartWithDetails]
  );

  const itemCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  const value = {
    cart: cartWithDetails,
    addToCart,
    removeFromCart,
    updateQty,
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
