import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

export type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastState = {
  toasts: ToastItem[];
  show: (message: string, type?: ToastType) => void;
  dismiss: (id: number) => void;
};

let counter = 1;

export const useToast = create<ToastState>((set, get) => ({
  toasts: [],
  show: (message: string, type: ToastType = "info") => {
    const id = counter++;
    const toast: ToastItem = { id, message, type };
    set({ toasts: [...get().toasts, toast] });
    // auto-dismiss después de 3s
    setTimeout(() => {
      get().dismiss(id);
    }, 3000);
  },
  dismiss: (id: number) =>
    set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));
