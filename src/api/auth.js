import api from "./api";

export const meApi = () => api.get("/me").then(res => res.data.data);

export const loginApi = (email, password) =>
  api.post("/login", { email, password }).then(res => res.data.data);