import { useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Package, Heart, LogIn } from "lucide-react";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { getProductById } from "../data/products";

export default function Account() {
  const { wishlist } = useStore();

  useEffect(() => {
    document.title = "Account — Makzen";
  }, []);

  const wishlistProducts = wishlist.map(getProductById).filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-14 md:py-20">
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center mx-auto mb-4">
          <User size={26} className="text-forest" />
        </div>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl mb-2">Your Account</h1>
        <p className="text-charcoal/60 text-sm">Sign in to track orders, save addresses and view your wishlist.</p>
        <button className="btn-primary rounded-full px-8 py-3.5 text-sm inline-flex items-center gap-2 mt-6">
          <LogIn size={15} /> Sign In
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-14">
        <div className="bg-beige/50 rounded-xl2 p-6 flex items-center gap-4">
          <Package size={22} className="text-forest shrink-0" />
          <div>
            <p className="font-bold text-sm">Order History</p>
            <p className="text-xs text-charcoal/50">Sign in to view and track your orders.</p>
          </div>
        </div>
        <div className="bg-beige/50 rounded-xl2 p-6 flex items-center gap-4">
          <Heart size={22} className="text-forest shrink-0" />
          <div>
            <p className="font-bold text-sm">{wishlistProducts.length} Wishlisted Items</p>
            <p className="text-xs text-charcoal/50">Saved on this device.</p>
          </div>
        </div>
      </div>

      {wishlistProducts.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-6">Your Wishlist</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {wishlistProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-10">
        <Link to="/shop" className="text-saffron font-semibold text-sm hover:underline">
          Continue shopping →
        </Link>
      </div>
    </div>
  );
}
