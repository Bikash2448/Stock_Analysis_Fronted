import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const signUpApi = (payload) => api.post("/user/signup", payload);
// export const loginApi = (payload) => api.post("/user/login", payload);
// export const logoutApi = () =>api.post('/user/logout')


export const sendOtpApi = (payload) => api.post("/auth/send-otp", payload);
export const verifyOtpApi = (payload) => api.post("/auth/verify-otp", payload);
export const requestOtpApi = (payload) =>api.post("/auth/request_otp", payload);
export const verifyOtp_ResetPassword = (payload) =>api.post("auth/verifyOtp_ResetPassword", payload);
export const resetPasswordApi = (payload) =>api.post("auth/reset_password", payload);