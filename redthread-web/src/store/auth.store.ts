import { create } from "zustand";
import { AuthApi } from "@/api/auth.api";
import { http } from "@/api/http";

type User = {
  id: number;
  fullName: string;
  email: string;
  roles: string[];
};

type AuthState = {
  user?: User;
  token?: string;
  refresh?: string;

  isAuthenticated: boolean;

  setTokens: (access: string, refresh?: string) => void;
  loadMe: () => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthState>((set, get) => ({
  user: undefined,
  token: localStorage.getItem("rt.access") || undefined,
  refresh: localStorage.getItem("rt.refresh") || undefined,

  get isAuthenticated() {
    return !!get().token && !!get().user;
  },

  setTokens: (access, refresh) => {
    localStorage.setItem("rt.access", access);
    if (refresh) localStorage.setItem("rt.refresh", refresh);

    http.auth.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    set({ token: access, refresh });
  },

  loadMe: async () => {
    const token = localStorage.getItem("rt.access");
    if (!token) return;

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
