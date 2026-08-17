import ProductCard from "./ProductCard";
import useReveal from "../hooks/useReveal";

export default function ProductGrid({ eyebrow, title, subtitle, products, id }) {
  const ref = useReveal();
  return (
    <section id={id} ref={ref} className="reveal max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="text-center mb-10 md:mb-12">
        {eyebrow && <p className="eyebrow text-deep-orange mb-2">{eyebrow}</p>}
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-charcoal">{title}</h2>
        {subtitle && <p className="text-charcoal/60 mt-3">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
