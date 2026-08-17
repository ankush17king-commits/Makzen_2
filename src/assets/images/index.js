import pouchCheesePeriPeri from "./pouch-cheese-peri-peri.png";
import pouchPeriPeri from "./pouch-peri-peri.png";
import pouchRockSalted from "./pouch-rock-salted.png";
import pouchCreamOnion from "./pouch-cream-onion.png";
import logo from "./logo.jpg";

// Maps product id -> real packaging photo. Products without an entry here
// fall back to the illustrated Pouch placeholder (see components/Pouch.jsx).
export const productImages = {
  "cheese-peri-peri": pouchCheesePeriPeri,
  "peri-peri-punch": pouchPeriPeri,
  "classic-salted": pouchRockSalted,
  "cream-onion": pouchCreamOnion,
};

export const logoImage = logo;
