import { InstagramIcon } from "./SocialIcons";
import ProductImage from "./ProductImage";
import useReveal from "../hooks/useReveal";
import { products } from "../data/products";

const bgs = ["bg-beige", "bg-forest/10", "bg-saffron/10", "bg-beige", "bg-forest/10", "bg-saffron/10"];
// Cycle through real products so the grid shows actual packaging photography.
const tiles = Array.from({ length: 6 }).map((_, i) => ({
  product: products[i % products.length],
  bg: bgs[i],
}));

export default function InstagramGrid() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="text-center mb-10">
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-charcoal">Follow the Crunch</h2>
        <p className="text-saffron font-semibold mt-2">@makzen</p>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {tiles.map((t, i) => (
          <div key={i} className={`${t.bg} aspect-square rounded-lg md:rounded-xl2 flex items-center justify-center overflow-hidden group`}>
            <div className="transition-transform duration-500 group-hover:scale-110">
              <ProductImage product={t.product} size={90} />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm"
        >
          <InstagramIcon size={16} /> FOLLOW US
        </a>
      </div>
    </section>
  );
}
