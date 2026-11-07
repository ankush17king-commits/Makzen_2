import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { StoreProvider } from "./context/StoreContext";
import { DiwaliProvider, useDiwali } from "./context/DiwaliContext";
import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import DiwaliToran from "./components/DiwaliToran";
import DiwaliWishesModal from "./components/DiwaliWishesModal";
import Deepak from "./components/Deepak";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

function Layout() {
  const [wishesOpen, setWishesOpen] = useState(false);
  const { isDiwaliActive } = useDiwali();

  return (
    <div className="min-h-screen flex flex-col bg-cream font-body relative">
      <AnnouncementBar onOpenWishes={() => setWishesOpen(true)} />
      {isDiwaliActive && <DiwaliToran />}
      <Header onOpenWishes={() => setWishesOpen(true)} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer />
      <Toast />

      {/* Diwali Floating Wishes & Offers Modal */}
      <DiwaliWishesModal isOpen={wishesOpen} onClose={() => setWishesOpen(false)} />

      {/* Floating Diwali Pill in Bottom Corner */}
      {isDiwaliActive && (
        <button
          onClick={() => setWishesOpen(true)}
          className="fixed bottom-6 left-5 z-40 bg-gradient-to-r from-[#2F0B13] via-[#4D101C] to-[#2F0B13] text-cream px-3.5 py-2.5 rounded-full shadow-diya border border-diwali-gold/50 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-xs font-bold group"
          aria-label="Open Diwali Greetings and 20% OFF Offer"
          title="Shubh Deepavali! Click to light a Diya & get 20% OFF"
        >
          <Deepak size={22} glow={false} flameSpeed="fast" />
          <span className="hidden sm:inline font-display">शुभ दीपावली Wishes</span>
          <span className="sm:hidden font-display">Wishes</span>
          <span className="bg-diwali-gold text-charcoal text-[10px] px-1.5 py-0.5 rounded-full font-black group-hover:scale-110 transition-transform">
            20% OFF
          </span>
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <DiwaliProvider>
          <ScrollToTop />
          <Layout />
        </DiwaliProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}
