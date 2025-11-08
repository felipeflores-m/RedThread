import { create } from "zustand";
import { AuthApi } from "@/api/auth.api";
import { http } from "@/api/http";

type User = { id: number; fullName: string; email: string; roles: string[] };

type AuthState = {
  user?: User;
  token?: string;
  refresh?: string;
  setTokens: (access: string, refresh?: string) => void;
  loadMe: () => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: undefined,
  token: localStorage.getItem("rt.access") || undefined,
  refresh: localStorage.getItem("rt.refresh") || undefined,

  setTokens: (access, refresh) => {
    localStorage.setItem("rt.access", access);
    if (refresh) localStorage.setItem("rt.refresh", refresh);

    // 🔥 Configurar el header global para axios
    http.auth.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    set({ token: access, refresh });
  },

  loadMe: async () => {
    const token = localStorage.getItem("rt.access");
    if (!token) return;

    // 🔥 Asegurar que el token esté en los headers antes de pedir /me
    http.auth.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const { data } = await AuthApi.me();
      set({ user: data as User });
    } catch {
      localStorage.removeItem("rt.access");
      localStorage.removeItem("rt.refresh");
      set({ user: undefined, token: undefined });
    }
  },

  logout: () => {
    localStorage.removeItem("rt.access");
    localStorage.removeItem("rt.refresh");
    set({ user: undefined, token: undefined });
  },
}));
