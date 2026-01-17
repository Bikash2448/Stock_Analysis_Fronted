import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const signUpApi = (payload) => api.post("/user/signup", payload);
export const loginApi = (payload) => api.post("/user/login", payload);
export const logoutApi = () =>api.get('/user/logout')


