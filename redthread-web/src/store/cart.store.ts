import { create } from "zustand";

export type CartLine = { variantId: number; nombre: string; talla: string; color: string; precio: number; qty: number; image?: string };

type CartState = {
  lines: CartLine[];
  add: (line: CartLine) => void;
  remove: (variantId: number) => void;
  setQty: (variantId: number, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>((set, get) => ({
  lines: [],
  add: (line) => {
    const ex = get().lines.find(l => l.variantId === line.variantId);
    if (ex) get().setQty(line.variantId, ex.qty + line.qty);
    else set({ lines: [...get().lines, line] });
  },
  remove: (variantId) => set({ lines: get().lines.filter(l => l.variantId !== variantId) }),
  setQty: (variantId, qty) =>
    set({ lines: get().lines.map(l => l.variantId === variantId ? { ...l, qty } : l) }),
  clear: () => set({ lines: [] }),
}));
