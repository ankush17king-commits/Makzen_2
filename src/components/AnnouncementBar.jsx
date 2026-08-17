const items = [
  "FREE SHIPPING ON ORDERS ABOVE ₹599",
  "ROASTED, NEVER FRIED",
  "MADE FOR BETTER SNACKING",
];

export default function AnnouncementBar() {
  return (
    <div className="bg-forest text-cream text-xs md:text-[13px] font-semibold tracking-wide">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2 text-center overflow-x-auto whitespace-nowrap">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-2">
            {i > 0 && <span className="text-saffron">•</span>}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
