# Makzen — Premium Roasted Makhana E-Commerce Site

A complete, responsive React + Vite + Tailwind storefront for the Makzen roasted makhana brand.

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- React Router
- Lucide React (icons)
- Cart/wishlist state via React Context + localStorage (no backend required)

## Getting Started

```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
  assets/images/   # real Makzen packaging photos + logo
  components/      # Header, Hero, ProductCard, CartDrawer, etc.
  context/         # StoreContext (cart, wishlist, toasts)
  data/            # products.js — edit this to add/remove flavours
  pages/           # Home, Shop, Product, Cart, About, Contact, Account
```

## Adding a new flavour
Edit `src/data/products.js` and add a new object to the `products` array.
If you have a real packaging photo, drop it in `src/assets/images/` and
register it in `src/assets/images/index.js` under `productImages`, keyed by
the product's `id`. Products without a registered photo automatically fall
back to an illustrated placeholder pouch.

## Connecting a real backend / payment gateway later
- Cart/checkout logic lives in `src/context/StoreContext.jsx` and
  `src/pages/Cart.jsx` — swap the local state for API calls when ready.
- The "PROCEED TO CHECKOUT" button in `src/pages/Cart.jsx` currently shows
  a demo toast; replace `handleCheckout` with a real payment gateway call
  (Razorpay, Stripe, etc.).

## Deployment
See hosting instructions provided separately (Netlify / Vercel, both free).
