import axios from "axios";
const API_URL = import.meta.env.VITE_PYTHON_BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getNifty50 = () => api.get("/nifty50");
export const getSensex = () => api.get("/sensex");
export const getGold = () => api.get("/gold");
export const getSilver = () => api.get("/sliver");
export const getVix = () => api.get("/vix");
export const getUsdInr = () => api.get("/usd_inr");


