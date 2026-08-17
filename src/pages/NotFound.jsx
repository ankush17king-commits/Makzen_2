import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-28 text-center">
      <p className="font-display font-black text-8xl text-saffron/30 mb-4">404</p>
      <h1 className="font-display font-bold text-2xl mb-3">This page went missing mid-crunch.</h1>
      <p className="text-charcoal/60 mb-8">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary rounded-full px-8 py-4 text-sm">
        Back to Home
      </Link>
    </div>
  );
}
