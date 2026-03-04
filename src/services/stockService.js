import axios from "axios";

// const API = "http://localhost:4001/api/stock";
const API = import.meta.env.VITE_API_URL;

export const downloadStock = async (symbol, range) => {
  const res = await axios.post(
    `${API}/api/stock/st_download/${symbol}?range=${range}`
  );
  return res.data;
};

export const getAllStocks = async () => {
  const res = await axios.get(`${API}/api/stock/all`);
  return res.data.data;
};

export const getStockChart = async (symbol) => {
  const res = await axios.get(`${API}/api/stock/chart/${symbol}`);
  return res.data.data;
};