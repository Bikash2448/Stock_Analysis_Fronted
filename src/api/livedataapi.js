// import axios from "axios";
// const API_URL = import.meta.env.VITE_PYTHON_BACKEND_URL;

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // export const getNifty50 = () => api.get("/api/nifty50");
// // export const getSensex = () => api.get("/api/sensex");
// // export const getGold = () => api.get("/api/gold");
// // export const getSilver = () => api.get("/api/sliver");
// // export const getVix = () => api.get("/api/vix");
// // export const getUsdInr = () => api.get("/api/usd_inr");

// export const getNifty50 = () => api.get("/nifty50");
// export const getSensex = () => api.get("/sensex");
// export const getGold = () => api.get("/gold");
// export const getSilver = () => api.get("/sliver");
// export const getVix = () => api.get("/vix");
// export const getUsdInr = () => api.get("/usd_inr");


import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // important if using JWT cookie
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDashboard = () => api.get("/api/market/dashboard");