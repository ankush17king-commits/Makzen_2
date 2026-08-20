import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Package,
  ShoppingBag,
  AlertCircle,
  Trash2,
  Edit2,
  Plus,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Search,
  LogOut,
  X
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import ProductImage from "../components/ProductImage";

const AUTH_STORAGE_KEY = "makzen_admin_authenticated_v1";

export default function Admin() {
  const {
    products,
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
    showToast
  } = useStore();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Product edit modal state
  const [editingProduct, setEditingProduct] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [editMrp, setEditMrp] = useState("");

  // Manual order modal state
  const [showManualOrderModal, setShowManualOrderModal] = useState(false);
  const [manualOrder, setManualOrder] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
    productId: products[0]?.id || "",
    qty: 1,
    paymentMethod: "Cash on Delivery (COD)"
  });

  // Orders filter & search
  const [orderFilter, setOrderFilter] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");

  // Settings PIN change state
  const [newPin, setNewPin] = useState("");
  const [newPhone, setNewPhone] = useState(settings?.phone || "+91 94149 31938");

  useEffect(() => {
    document.title = "Makzen Admin — Store Dashboard";
  }, []);

  const handlePinSubmit = (e) => {
    e?.preventDefault();
    const correctPin = settings?.adminPin || "1702";
    if (pinInput === correctPin) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      setPinError(false);
      setPinInput("");
      showToast("Welcome to Makzen Admin!");
    } else {
      setPinError(true);
      setPinInput("");
      showToast("Incorrect PIN. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    showToast("Logged out of Admin Portal.");
  };

  const handleSaveProductEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    const priceNum = Number(editPrice);
    const mrpNum = Number(editMrp);
    if (isNaN(priceNum) || priceNum <= 0) {
      showToast("Please enter a valid selling price");
      return;
    }
    updateProduct(editingProduct.id, {
      price: priceNum,
      mrp: isNaN(mrpNum) || mrpNum <= 0 ? priceNum : mrpNum
    });
    setEditingProduct(null);
  };

  const handleCreateManualOrder = (e) => {
    e.preventDefault();
    if (!manualOrder.name || !manualOrder.phone) {
      showToast("Please provide customer name and phone");
      return;
    }
    const selectedProd = products.find((p) => p.id === manualOrder.productId) || products[0];
    const itemSubtotal = (selectedProd?.price || 190) * manualOrder.qty;
    const itemShipping = itemSubtotal >= 599 ? 0 : 49;
    const totalAmount = itemSubtotal + itemShipping;

    const orderId = `MKZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDate = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });

    addOrder({
      orderId,
      date: orderDate,
      items: [{ product: selectedProd, qty: Number(manualOrder.qty) }],
      subtotal: itemSubtotal,
      shipping: itemShipping,
      total: totalAmount,
      customer: {
        name: manualOrder.name,
        phone: manualOrder.phone,
        address: manualOrder.address,
        city: manualOrder.city,
        state: manualOrder.state,
        pincode: manualOrder.pincode
      },
      paymentMethod: manualOrder.paymentMethod
    });

    setShowManualOrderModal(false);
    setManualOrder({
      name: "",
      phone: "",
      address: "",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      productId: products[0]?.id || "",
      qty: 1,
      paymentMethod: "Cash on Delivery (COD)"
    });
    showToast("Manual order created successfully!");
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending Payment" || o.status === "Confirmed").length;
  const outOfStockCount = products.filter((p) => p.inStock === false).length;

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === "all" ? true : o.status === orderFilter;
    const matchesSearch =
      orderSearch === "" ||
      o.orderId?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer?.name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer?.phone?.includes(orderSearch);
    return matchesFilter && matchesSearch;
  });

  // LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="bg-cream border border-charcoal/15 rounded-3xl p-8 max-w-sm w-full shadow-lg text-center">
          <div className="w-16 h-16 bg-saffron/15 text-deep-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>

          <h1 className="font-display font-extrabold text-2xl text-charcoal mb-1">Admin Portal</h1>
          <p className="text-xs text-charcoal/60 mb-6">Enter your Master PIN (1702) to continue</p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={8}
                autoFocus
                placeholder="Enter PIN"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className={`w-full text-center tracking-[8px] font-bold text-2xl py-3.5 px-4 rounded-xl border bg-white outline-none ${
                  pinError ? "border-red-500 ring-2 ring-red-200" : "border-charcoal/20 focus:border-forest"
                }`}
              />
              {pinError && (
                <p className="text-xs font-semibold text-red-600 mt-2">Incorrect PIN. Try again.</p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary w-full rounded-full py-3.5 text-sm font-bold shadow-sm"
            >
              UNLOCK DASHBOARD
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-charcoal/10">
            <Link to="/" className="text-xs text-charcoal/50 hover:text-charcoal flex items-center justify-center gap-1">
              ← Return to Makzen Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Header */}
      <div className="bg-charcoal text-cream rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-saffron text-charcoal text-xs font-black px-2.5 py-0.5 rounded-md uppercase">
              Admin
            </span>
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-cream">
              Makzen Store Dashboard
            </h1>
          </div>
          <p className="text-xs text-cream/70 mt-1">
            Store Contact: <span className="font-semibold text-saffron">{settings?.phone || "+91 94149 31938"}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-cream/10 hover:bg-cream/20 text-cream text-xs font-semibold px-4 py-2.5 rounded-full transition-colors"
          >
            View Live Store <ExternalLink size={13} />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold px-4 py-2.5 rounded-full transition-colors"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-beige/50 p-1.5 rounded-2xl border border-charcoal/10">
        {[
          { id: "dashboard", label: "📊 Overview", count: null },
          { id: "products", label: "📦 Products & Stock", count: outOfStockCount ? `${outOfStockCount} Out` : null, alert: outOfStockCount > 0 },
          { id: "orders", label: "📑 Orders & Customers", count: orders.length },
          { id: "settings", label: "⚙️ Store Settings", count: null },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === tab.id
                ? "bg-forest text-cream shadow-sm"
                : "text-charcoal/70 hover:text-charcoal hover:bg-cream/60"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                  tab.alert
                    ? "bg-red-500 text-white"
                    : activeTab === tab.id
                    ? "bg-cream/20 text-cream"
                    : "bg-charcoal/10 text-charcoal"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "dashboard" && (
        <div className="space-y-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-charcoal/60 uppercase">Total Revenue</span>
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center font-bold text-lg">
                  ₹
                </div>
              </div>
              <p className="font-display font-extrabold text-3xl text-charcoal">₹{totalRevenue}</p>
              <p className="text-xs text-charcoal/50 mt-1">From {totalOrders} total orders</p>
            </div>

            <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-charcoal/60 uppercase">Total Orders</span>
                <div className="w-10 h-10 rounded-xl bg-saffron/20 text-deep-orange flex items-center justify-center">
                  <ShoppingBag size={20} />
                </div>
              </div>
              <p className="font-display font-extrabold text-3xl text-charcoal">{totalOrders}</p>
              <p className="text-xs text-charcoal/50 mt-1">{pendingOrders} pending processing</p>
            </div>

            <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-charcoal/60 uppercase">Products</span>
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
                  <Package size={20} />
                </div>
              </div>
              <p className="font-display font-extrabold text-3xl text-charcoal">{products.length}</p>
              <p className="text-xs text-charcoal/50 mt-1">{products.length - outOfStockCount} active in stock</p>
            </div>

            <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-charcoal/60 uppercase">Out of Stock</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${outOfStockCount > 0 ? "bg-red-100 text-red-600" : "bg-forest/10 text-forest"}`}>
                  <AlertCircle size={20} />
                </div>
              </div>
              <p className={`font-display font-extrabold text-3xl ${outOfStockCount > 0 ? "text-red-600" : "text-charcoal"}`}>
                {outOfStockCount}
              </p>
              <p className="text-xs text-charcoal/50 mt-1">{outOfStockCount === 0 ? "All items available" : "Requires restocking"}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-charcoal/10">
                <h2 className="font-display font-bold text-lg text-charcoal">Recent Orders</h2>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs font-bold text-deep-orange hover:underline"
                >
                  View All ({orders.length}) →
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-charcoal/50">
                  <p className="text-sm">No orders received yet.</p>
                  <p className="text-xs mt-1">Orders placed on the website or added manually will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.orderId || order.id} className="p-3.5 bg-beige/40 rounded-xl flex items-center justify-between gap-3 text-sm">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-charcoal">#{order.orderId || order.id}</span>
                          <span className="text-xs px-2 py-0.5 bg-saffron/20 text-deep-orange font-bold rounded-md">
                            {order.status || "Pending Payment"}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal/60 mt-0.5">
                          {order.customer?.name} • ₹{order.total}
                        </p>
                      </div>
                      <span className="text-xs text-charcoal/50">{order.date?.split(",")[0] || "Today"}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-charcoal/10">
                <h2 className="font-display font-bold text-lg text-charcoal">Quick Stock Toggles</h2>
                <button
                  onClick={() => setActiveTab("products")}
                  className="text-xs font-bold text-deep-orange hover:underline"
                >
                  Manage All Products →
                </button>
              </div>

              <div className="space-y-3">
                {products.map((prod) => (
                  <div key={prod.id} className="flex items-center justify-between p-3 bg-beige/40 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cream rounded-lg flex items-center justify-center shrink-0">
                        <ProductImage product={prod} size={36} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-charcoal">{prod.name}</p>
                        <p className="text-xs text-charcoal/60">₹{prod.price}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleProductStock(prod.id)}
                      className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                        prod.inStock !== false
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {prod.inStock !== false ? "🟢 IN STOCK" : "🔴 OUT OF STOCK"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-charcoal/10">
            <div>
              <h2 className="font-display font-bold text-xl text-charcoal">Product Catalogue & Pricing</h2>
              <p className="text-xs text-charcoal/60 mt-0.5">Toggle out of stock or update selling prices on the live store</p>
            </div>

            <button
              onClick={resetProductOverrides}
              className="text-xs font-semibold text-charcoal/60 hover:text-charcoal inline-flex items-center gap-1.5 bg-beige px-3.5 py-2 rounded-xl"
            >
              <RefreshCw size={13} /> Reset to Defaults
            </button>
          </div>

          <div className="grid gap-4">
            {products.map((prod) => (
              <div key={prod.id} className="p-4 bg-beige/40 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-cream rounded-xl flex items-center justify-center shrink-0 border border-charcoal/10">
                    <ProductImage product={prod} size={54} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-charcoal">{prod.name}</h3>
                      <span className="text-[11px] px-2 py-0.5 bg-beige rounded-md font-semibold text-charcoal/60">
                        {prod.category}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal/60 mt-0.5">{prod.weight} pouch • {prod.tagline}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="font-extrabold text-forest text-sm">Selling Price: ₹{prod.price}</span>
                      <span className="text-xs text-charcoal/40 line-through">MRP: ₹{prod.mrp}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <button
                    onClick={() => {
                      setEditingProduct(prod);
                      setEditPrice(String(prod.price));
                      setEditMrp(String(prod.mrp));
                    }}
                    className="inline-flex items-center gap-1.5 bg-cream border border-charcoal/20 hover:border-charcoal text-charcoal font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <Edit2 size={13} /> Edit Price
                  </button>

                  <button
                    onClick={() => toggleProductStock(prod.id)}
                    className={`font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm ${
                      prod.inStock !== false
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                  >
                    {prod.inStock !== false ? "IN STOCK ✓" : "OUT OF STOCK ✕"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display font-bold text-xl text-charcoal">Customer Orders ({filteredOrders.length})</h2>
                <p className="text-xs text-charcoal/60 mt-0.5">Manage customer orders and dispatch updates</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowManualOrderModal(true)}
                  className="btn-primary rounded-full px-5 py-2.5 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Plus size={14} /> Add Manual Order
                </button>

                {orders.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to clear order history?")) {
                        clearAllOrders();
                      }
                    }}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold px-3 py-2 bg-red-50 rounded-xl"
                  >
                    Clear History
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
              <div className="relative flex-1 w-full">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Name, or Phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-beige/40 rounded-xl border border-charcoal/15 text-xs outline-none focus:border-forest"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {["all", "Pending Payment", "Confirmed", "Dispatched", "Completed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setOrderFilter(status)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                      orderFilter === status
                        ? "bg-charcoal text-cream"
                        : "bg-beige text-charcoal/70 hover:bg-beige/80"
                    }`}
                  >
                    {status === "all" ? "All Orders" : status}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="py-16 text-center text-charcoal/50">
                <ShoppingBag size={36} className="mx-auto mb-3 text-charcoal/30" />
                <p className="text-sm font-semibold">No orders found.</p>
                <p className="text-xs mt-1">Orders placed on website or entered manually will show up here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const orderId = order.orderId || order.id;
                  const customerPhone = order.customer?.phone || "";
                  const cleanPhone = customerPhone.replace(/[^0-9]/g, "");
                  const customerWaLink = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`}?text=${encodeURIComponent(
                    `Hello ${order.customer?.name || "Customer"}! Your Makzen order #${orderId} (${order.status || "Confirmed"}) is being processed. Total: Rs.${order.total}.`
                  )}`;

                  return (
                    <div key={orderId} className="border border-charcoal/15 rounded-2xl p-5 bg-beige/30 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-charcoal/10">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="font-display font-extrabold text-base text-charcoal">#{orderId}</span>
                            <span className="text-xs text-charcoal/50">• {order.date || "Recent"}</span>
                          </div>
                          <p className="text-xs font-semibold text-charcoal/70 mt-0.5">
                            Payment: <span className="text-charcoal font-bold">{order.paymentMethod || "WhatsApp UPI / COD"}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <select
                            value={order.status || "Pending Payment"}
                            onChange={(e) => updateOrderStatus(orderId, e.target.value)}
                            className="bg-cream border border-charcoal/20 text-xs font-bold px-3 py-2 rounded-xl outline-none focus:border-forest"
                          >
                            <option value="Pending Payment">⏳ Pending Payment</option>
                            <option value="Confirmed">✅ Confirmed</option>
                            <option value="Dispatched">🚚 Dispatched</option>
                            <option value="Completed">🎉 Completed</option>
                            <option value="Cancelled">❌ Cancelled</option>
                          </select>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete order #${orderId}?`)) {
                                deleteOrder(orderId);
                              }
                            }}
                            className="p-2 text-charcoal/30 hover:text-red-600 transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-cream p-3.5 rounded-xl border border-charcoal/10 space-y-2">
                          <p className="font-bold text-charcoal uppercase tracking-wider text-[11px]">Items Ordered</p>
                          <div className="space-y-1.5">
                            {order.items?.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-charcoal/80">
                                <span>{item.qty}x {item.product?.name || "Makhana Pouch"}</span>
                                <span className="font-bold text-charcoal">₹{(item.product?.price || 190) * item.qty}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-charcoal/10 flex justify-between font-extrabold text-sm text-charcoal">
                            <span>Total Amount</span>
                            <span>₹{order.total}</span>
                          </div>
                        </div>

                        <div className="bg-cream p-3.5 rounded-xl border border-charcoal/10 space-y-1.5">
                          <p className="font-bold text-charcoal uppercase tracking-wider text-[11px]">Customer & Delivery Details</p>
                          <p className="text-charcoal font-semibold">{order.customer?.name}</p>
                          <p className="text-charcoal/70">Phone: {order.customer?.phone}</p>
                          <p className="text-charcoal/70">{order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}</p>

                          {order.customer?.phone && (
                            <div className="pt-2">
                              <a
                                href={customerWaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#1EBE5D] transition-colors"
                              >
                                <MessageSquare size={13} /> WhatsApp Customer
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === "settings" && (
        <div className="max-w-2xl bg-cream border border-charcoal/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
          <div>
            <h2 className="font-display font-bold text-xl text-charcoal">Admin & Store Settings</h2>
            <p className="text-xs text-charcoal/60 mt-0.5">Manage your Master PIN and store details</p>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-sm text-charcoal">Change Admin Master PIN</h3>
            <div className="flex gap-3">
              <input
                type="password"
                maxLength={8}
                placeholder="New 4-digit PIN (e.g. 1702)"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full bg-beige/40 px-4 py-3 rounded-xl border border-charcoal/15 text-sm outline-none focus:border-forest"
              />
              <button
                onClick={() => {
                  if (!newPin || newPin.length < 4) {
                    showToast("PIN must be at least 4 digits");
                    return;
                  }
                  updateSettings({ adminPin: newPin });
                  setNewPin("");
                  showToast("Admin PIN updated successfully!");
                }}
                className="btn-primary rounded-xl px-6 text-xs font-bold shrink-0"
              >
                Save PIN
              </button>
            </div>
            <p className="text-[11px] text-charcoal/50">Current Master PIN is 1702.</p>
          </div>

          <div className="space-y-4 pt-6 border-t border-charcoal/10">
            <h3 className="font-bold text-sm text-charcoal">WhatsApp Order Phone Number</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="+91 94149 31938"
                className="w-full bg-beige/40 px-4 py-3 rounded-xl border border-charcoal/15 text-sm outline-none focus:border-forest"
              />
              <button
                onClick={() => {
                  const clean = newPhone.replace(/[^0-9]/g, "");
                  updateSettings({ phone: newPhone, waNumber: clean });
                  showToast("Store contact number updated!");
                }}
                className="btn-primary rounded-xl px-6 text-xs font-bold shrink-0"
              >
                Save Phone
              </button>
            </div>
            <p className="text-[11px] text-charcoal/50">Orders submitted by customers are directed to this WhatsApp number.</p>
          </div>
        </div>
      )}

      {/* EDIT PRICE MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-charcoal/60 z-50 flex items-center justify-center p-4">
          <div className="bg-cream rounded-3xl p-6 max-w-md w-full shadow-2xl border border-charcoal/15">
            <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-beige rounded-xl flex items-center justify-center">
                  <ProductImage product={editingProduct} size={32} />
                </div>
                <h3 className="font-bold text-base text-charcoal">Edit {editingProduct.name}</h3>
              </div>
              <button onClick={() => setEditingProduct(null)} className="p-1 hover:text-saffron">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProductEdit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-charcoal/70 mb-1 block">Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full bg-beige/40 px-4 py-3 rounded-xl border border-charcoal/15 text-sm font-bold outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal/70 mb-1 block">MRP (Crossed-out Price ₹)</label>
                <input
                  type="number"
                  value={editMrp}
                  onChange={(e) => setEditMrp(e.target.value)}
                  className="w-full bg-beige/40 px-4 py-3 rounded-xl border border-charcoal/15 text-sm outline-none focus:border-forest"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-3 text-xs font-bold rounded-full bg-beige text-charcoal/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 text-xs font-bold rounded-full shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANUAL ORDER MODAL */}
      {showManualOrderModal && (
        <div className="fixed inset-0 bg-charcoal/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-cream rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-charcoal/15 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-4">
              <h3 className="font-display font-bold text-lg text-charcoal">Add Manual / In-Person Order</h3>
              <button onClick={() => setShowManualOrderModal(false)} className="p-1 hover:text-saffron">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-charcoal/70 mb-1 block">Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={manualOrder.name}
                    onChange={(e) => setManualOrder({ ...manualOrder, name: e.target.value })}
                    className="w-full bg-beige/40 px-3.5 py-2.5 rounded-xl border border-charcoal/15 text-xs outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-charcoal/70 mb-1 block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={manualOrder.phone}
                    onChange={(e) => setManualOrder({ ...manualOrder, phone: e.target.value })}
                    className="w-full bg-beige/40 px-3.5 py-2.5 rounded-xl border border-charcoal/15 text-xs outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal/70 mb-1 block">Select Product</label>
                <select
                  value={manualOrder.productId}
                  onChange={(e) => setManualOrder({ ...manualOrder, productId: e.target.value })}
                  className="w-full bg-beige/40 px-3.5 py-2.5 rounded-xl border border-charcoal/15 text-xs font-semibold outline-none focus:border-forest"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ₹{p.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-charcoal/70 mb-1 block">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={manualOrder.qty}
                    onChange={(e) => setManualOrder({ ...manualOrder, qty: Math.max(1, Number(e.target.value)) })}
                    className="w-full bg-beige/40 px-3.5 py-2.5 rounded-xl border border-charcoal/15 text-xs outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-charcoal/70 mb-1 block">Payment Method</label>
                  <select
                    value={manualOrder.paymentMethod}
                    onChange={(e) => setManualOrder({ ...manualOrder, paymentMethod: e.target.value })}
                    className="w-full bg-beige/40 px-3.5 py-2.5 rounded-xl border border-charcoal/15 text-xs outline-none focus:border-forest"
                  >
                    <option value="Cash on Delivery (COD)">Cash on Delivery</option>
                    <option value="UPI / Online Paid">UPI / Online Paid</option>
                    <option value="In-Store Cash">In-Store Cash</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal/70 mb-1 block">Delivery Street Address</label>
                <textarea
                  rows={2}
                  placeholder="Address or Shop Pickup"
                  value={manualOrder.address}
                  onChange={(e) => setManualOrder({ ...manualOrder, address: e.target.value })}
                  className="w-full bg-beige/40 px-3.5 py-2.5 rounded-xl border border-charcoal/15 text-xs outline-none focus:border-forest resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowManualOrderModal(false)}
                  className="flex-1 py-3 text-xs font-bold rounded-full bg-beige text-charcoal/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 text-xs font-bold rounded-full shadow-sm"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}