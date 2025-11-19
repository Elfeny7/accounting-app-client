import api from "./api";

export const meApi = () => api.get("/me").then(res => res.data.data);

export const loginApi = (email, password) =>
  api.post("/login", { email, password }).then(res => res.data.data);

export const registerApi = (name, email, password, password_confirmation) =>
  api.post("/register", { name, email, password, password_confirmation }).then(res => res.data.data);