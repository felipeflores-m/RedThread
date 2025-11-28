import { http } from "./http";

export type UserDto = {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
  roles: string[];
};

export const UsersApi = {
  listUsers: () => http.auth.get<UserDto[]>("/admin/users"),
  getProfile: () => http.auth.get<UserDto>("/me"),
};
