import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "./SocialIcons";
import { logoImage } from "../assets/images";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "Bestsellers", to: "/shop?filter=bestsellers" },
      { label: "Combos", to: "/shop?category=Combos" },
      { label: "New Launches", to: "/shop?filter=new" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/about" },
      { label: "Why Makzen", to: "/about#why-makhana" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", to: "/about#why-makhana" },
      { label: "Shipping", to: "/contact" },
      { label: "Returns", to: "/contact" },
      { label: "Track Order", to: "/account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/contact" },
      { label: "Terms & Conditions", to: "/contact" },
      { label: "Refund Policy", to: "/contact" },
    ],
  },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-charcoal text-cream/80 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-[1.4fr_repeat(4,1fr)] gap-10 pb-12 border-b border-cream/10">
          <div>
            <img src={logoImage} alt="Makzen" className="h-11 w-auto bg-cream rounded-lg px-2 py-1" />
            <p className="mt-3 text-sm text-cream/60 max-w-xs">Crunch better. Snack happier.</p>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: YoutubeIcon, label: "YouTube" },
                { Icon: FacebookIcon, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-saffron hover:text-charcoal transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-cream text-sm mb-4 tracking-wide">{col.title.toUpperCase()}</h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="hover:text-saffron transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-cream/50">
          <p>© 2026 Makzen. All rights reserved.</p>
          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-saffron hover:text-charcoal transition-colors"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
