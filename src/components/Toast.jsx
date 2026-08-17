import { CheckCircle2 } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;

  return (
    <div
      key={toast.id}
      role="status"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-charcoal text-cream px-5 py-3.5 rounded-full shadow-pouch flex items-center gap-2.5 text-sm font-semibold animate-popIn"
    >
      <CheckCircle2 size={17} className="text-saffron shrink-0" />
      {toast.message}
    </div>
  );
}
