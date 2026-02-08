import { useEffect, useState } from "react";
import axios from "axios";

export default function MarketTimeStatus() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 1000); // live clock
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_PYTHON_BACKEND_URL}/trading_holiday`);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching market status:", err);
    }
  };

  if (!data) return null;

  // Status color
  const statusBg =
    data.status === "OPEN"
      ? "bg-green-600"
      : data.status === "HOLIDAY"
      ? "bg-orange-600"
      : "bg-red-500";

  return (
    <span
        className={`inline-flex items-center rounded-lg text-white text-sm font-medium ${statusBg} shadow-md`}
        style={{ padding: "2px 6px" }}
    >
        {/* Current Time */}
        <span className="font-mono">{data.time}</span>

        {/* Status */}
        <span className="mx-2 uppercase tracking-wide">{data.status}</span>

        {/* Reason / Holiday Name */}
        <span className="text-xs text-gray-200 truncate max-w-[100px]">
        {data.reason}
        </span>
    </span>
  );
}
