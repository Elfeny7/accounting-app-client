import * as authApi from "../api/authApi";
import ApiError from "../helper/ApiError";

export const fetchUser = async () => {
  try {
    return await authApi.me();
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to fetch user";
    throw new ApiError(message, code);
  }
};

export const loginAndStore = async (email, password) => {
  try {
    const { token, user } = await authApi.login(email, password);
    localStorage.setItem("token", token);
    return user;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to login";
    const reason = err.response?.data?.reason || null;
    throw new ApiError(message, code, reason);
  }
};

export const registerAndStore = async (name, email, password, passwordConfirmation) => {
  try {
    const { token, user } = await authApi.register(name, email, password, passwordConfirmation);
    localStorage.setItem("token", token);
    return user;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to register";
    const reason = err.response?.data?.reason || null;
    throw new ApiError(message, code, reason);
  }
};

export const clearAuth = () => {
  localStorage.removeItem("token");
};