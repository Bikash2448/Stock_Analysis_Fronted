import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;


export const googleLoginApi = (token) => {
  return axios.post(`${VITE_API_URL}/api/auth/google`, { token });
};