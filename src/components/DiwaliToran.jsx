import Deepak from "./Deepak";

export default function DiwaliToran({ className = "" }) {
  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none relative z-30 ${className}`}
      aria-hidden="true"
    >
      {/* Decorative top garland rope */}
      <div className="h-1.5 w-full bg-gradient-to-r from-diwali-maroon via-diwali-marigold to-diwali-gold opacity-90 shadow-sm" />

      {/* Marigold and golden hanging elements */}
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-start -mt-0.5">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
          // Hide some on mobile to avoid overcrowding
          const hideOnMobile = idx % 2 !== 0 ? "hidden sm:flex" : "flex";
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`flex-col items-center animate-toranSway ${hideOnMobile}`}
              style={{
                animationDuration: `${3.5 + (idx % 3) * 0.8}s`,
                animationDelay: `${idx * 0.25}s`,
                transformOrigin: "top center",
              }}
            >
              {/* String */}
              <div className="w-[1.5px] h-3 sm:h-4 bg-amber-400/80" />

              {/* Marigold Flower Top */}
              <div
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shadow-sm flex items-center justify-center ${
                  isEven
                    ? "bg-gradient-to-br from-amber-300 via-orange-500 to-amber-600"
                    : "bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-100/80" />
              </div>

              {/* Middle string */}
              <div className="w-[1px] h-2 sm:h-3 bg-amber-400/70" />

              {/* Mango leaf or small hanging Diya */}
              {isEven ? (
                <div className="mt-0.5 transform -translate-y-0.5">
                  <Deepak size={20} glow={false} flameSpeed="fast" />
                </div>
              ) : (
                <div
                  className="w-2.5 h-4 sm:w-3 sm:h-5 rounded-b-full bg-gradient-to-b from-forest-light to-forest shadow-xs transform rotate-1"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
