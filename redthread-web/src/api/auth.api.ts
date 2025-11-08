import { http } from "./http";

export type LoginReq = { email: string; password: string };
export type RegisterReq = { fullName: string; email: string; password: string; phone?: string };
export type AuthResp = { accessToken: string; refreshToken?: string };

export const AuthApi = {
  login: (data: LoginReq) => http.auth.post<AuthResp>("/auth/login", data),
  register: (data: RegisterReq) => http.auth.post<AuthResp>("/auth/register", data),
  me: () => http.auth.get("/me"),
  refresh: (refreshToken: string) => http.auth.post<AuthResp>("/auth/refresh", { refreshToken }),
};
