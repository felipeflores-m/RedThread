import { useToast } from "@/store/toast.store";

export default function ToastContainer() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex justify-center px-4">
      <div className="flex w-full max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between rounded-lg border px-4 py-2 text-sm shadow-lg ${
              t.type === "success"
                ? "border-emerald-500/70 bg-emerald-900/90 text-emerald-50"
                : t.type === "error"
                ? "border-red-500/70 bg-red-900/90 text-red-50"
                : "border-neutral-500/70 bg-neutral-900/90 text-neutral-50"
            }`}
          >
            <span>{t.message}</span>
            <button
              type="button"
              className="ml-3 text-xs text-white/70 hover:text-white"
              onClick={() => dismiss(t.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
