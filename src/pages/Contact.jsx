import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Contact() {
  const { showToast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    document.title = "Contact Us — Makzen";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Message sent — we'll get back to you within 24 hours!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
      <div className="text-center mb-14 max-w-xl mx-auto">
        <p className="eyebrow text-deep-orange mb-3">Get in Touch</p>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-charcoal mb-4">We'd Love to Hear From You</h1>
        <p className="text-charcoal/60">
          Questions about an order, a flavour idea, or just want to say hi? Drop us a line.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.3fr] gap-10 md:gap-16">
        <div className="space-y-6">
          {[
            { icon: Mail, title: "Email", value: "hello@makzen.in", href: "mailto:hello@makzen.in" },
            { icon: Phone, title: "Phone", value: "+91 7000909219", href: "tel:+917000909219" },
            { icon: MapPin, title: "Shop", value: "Jaipur, Rajasthan, India" },
          ].map(({ icon: Icon, title, value, href }) => (
            <div key={title} className="flex items-start gap-4 bg-beige/50 rounded-xl2 p-5">
              <div className="w-11 h-11 rounded-full bg-cream flex items-center justify-center text-forest shrink-0">
                <Icon size={18} />
              </div>
              <div>
                <p className="font-bold text-sm">{title}</p>
                {href ? (
                  <a href={href} className="text-sm text-charcoal/80 hover:text-saffron transition-colors font-medium">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-charcoal/60">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-xs font-bold text-charcoal/70 mb-1.5 block">Name</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-charcoal/15 px-4 py-3.5 bg-beige/30 outline-none focus:border-saffron"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs font-bold text-charcoal/70 mb-1.5 block">Email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-charcoal/15 px-4 py-3.5 bg-beige/30 outline-none focus:border-saffron"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-xs font-bold text-charcoal/70 mb-1.5 block">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-charcoal/15 px-4 py-3.5 bg-beige/30 outline-none focus:border-saffron resize-none"
              placeholder="How can we help?"
            />
          </div>
          <button type="submit" className="btn-primary rounded-full px-8 py-4 text-sm inline-flex items-center gap-2">
            Send Message <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
