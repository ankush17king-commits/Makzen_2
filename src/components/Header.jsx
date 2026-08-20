import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { logoImage } from "../assets/images";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Our Story", to: "/about" },
  { label: "Why Makzen", to: "/about#why-makhana" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount, setCartOpen } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-charcoal/5 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 -ml-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link
          to="/"
          className={`flex items-center gap-2 transition-all duration-300 md:static absolute left-1/2 -translate-x-1/2 md:translate-x-0`}
        >
          <img
            src={logoImage}
            alt="Makzen"
            className={`w-auto rounded-lg transition-all duration-300 ${scrolled ? "h-9" : "h-11"}`}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-charcoal">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} className="hover:text-saffron transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button aria-label="Search" onClick={() => setSearchOpen(true)} className="hover:text-saffron transition-colors">
            <Search size={20} />
          </button>
          <Link to="/account" aria-label="Account" className="hidden sm:block hover:text-saffron transition-colors">
            <User size={20} />
          </Link>
          <button
            aria-label={`Cart, ${itemCount} items`}
            onClick={() => setCartOpen(true)}
            className="relative hover:text-saffron transition-colors"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-saffron text-cream text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-cream z-30 px-6 pt-[100px] pb-8 animate-fadeUp">
          <nav className="flex flex-col gap-6 text-lg font-semibold">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)} className="hover:text-saffron">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/40 flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submitSearch}
            className="bg-cream w-full max-w-xl rounded-xl2 shadow-pouch p-2 flex items-center gap-2 animate-popIn"
          >
            <Search size={20} className="ml-3 text-charcoal/50" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search flavours, e.g. Peri Peri"
              className="flex-1 bg-transparent outline-none py-3 text-charcoal placeholder:text-charcoal/40"
            />
            <button type="submit" className="btn-primary rounded-xl px-4 py-2.5 text-sm">
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
