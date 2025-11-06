import { create } from "zustand";
import { AuthApi } from "@/api/auth.api";

type User = { id: number; name: string; email: string; roles: string[] };

type AuthState = {
  user?: User;
  setTokens: (access: string, refresh?: string) => void;
  loadMe: () => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: undefined,
  setTokens: (access, refresh) => {
    localStorage.setItem("rt.access", access);
    if (refresh) localStorage.setItem("rt.refresh", refresh);
  },
  loadMe: async () => {
    const { data } = await AuthApi.me();
    set({ user: data as User });
  },
  logout: () => {
    localStorage.removeItem("rt.access");
    localStorage.removeItem("rt.refresh");
    set({ user: undefined });
  },
}));
