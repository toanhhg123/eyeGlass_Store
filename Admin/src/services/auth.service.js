import api from "src/config/axios";

export const login = ({ user_name, password }) => {
  return api.post("/auth/login", { user_name, password });
};
