import { useEffect, useState } from "react";
import IndicesTable from "./IndicesTable";

const API_BASE = import.meta.env.VITE_PYTHON_BACKEND_URL;

export default function Dashboard() {
  // 🔹 STATES
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 API CALL FUNCTION
  const fetchIndices = async () => {
    try {
      setError(null);

      const res = await fetch(`${API_BASE}/market/indices`);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const json = await res.json();

      // ✅ backend: { status, count, data }
      setIndices(json.data || []);
    } catch (err) {
      console.error("Error fetching indices:", err);
      setError("Failed to load market indices");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 EFFECT (initial load + auto refresh)
  useEffect(() => {
    fetchIndices(); // first load

    // ⏱ refresh every 5 minutes
    const interval = setInterval(fetchIndices, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔹 UI STATES
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading market indices...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-400">
        {error}
      </div>
    );
  }

  // 🔹 MAIN RENDER
  return (
    <div className="px-6 py-8">
      <IndicesTable indices={indices} />
    </div>
  );
}
