import Pouch from "./Pouch";
import { productImages } from "../assets/images";

// Renders the real Makzen packaging photo when available for a product,
// otherwise falls back to the illustrated placeholder pouch.
export default function ProductImage({ product, size = 200, className = "" }) {
  const photo = productImages[product.id];

  if (photo) {
    return (
      <img
        src={photo}
        alt={`Makzen ${product.name} ${product.weight} pouch`}
        loading="lazy"
        className={className}
        style={{ width: size, height: "auto", objectFit: "contain" }}
      />
    );
  }

  return <Pouch accent={product.accent} name={product.name} weight={product.weight} size={size} className={className} />;
}
