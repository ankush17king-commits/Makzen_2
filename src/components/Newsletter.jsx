import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-forest text-cream py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
        <h2 className="font-display font-extrabold text-3xl md:text-4xl mb-4">Get the Good Stuff.</h2>
        <p className="text-cream/70 mb-8">
          New flavours, exclusive offers and occasional snack-related mischief. Straight to your inbox.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 bg-cream/10 rounded-full py-4 px-6 max-w-md mx-auto font-semibold">
            <Check size={18} className="text-saffron" /> You're on the list — welcome to Makzen!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-full px-5 py-3.5 text-charcoal bg-cream outline-none placeholder:text-charcoal/40"
            />
            <button type="submit" className="btn-primary rounded-full px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2">
              Join Makzen <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
