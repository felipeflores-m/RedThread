import { http } from "@/api/http";

export const loginService = (email: string, password: string) => {
  return http.auth.post("/api/auth/login", { email, password });
};
