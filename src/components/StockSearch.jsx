import { useState } from "react";
import { downloadStock } from "../services/stockService";

export default function StockSearch({ refreshStocks }) {
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDownload = async () => {
    if (!symbol.trim()) {
      setMessage({ type: "error", text: "Please enter a stock symbol." });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const response = await downloadStock(symbol.trim().toUpperCase(), "5y");

      // 👇 Check backend response properly
      if (response.records_inserted?.status === "error") {
        setMessage({
          type: "error",
          text: response.records_inserted.message || "Stock download failed.",
        });
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage({
          type: "success",
          text: `Stock ${symbol.toUpperCase()} downloaded successfully.`,
        });
        setTimeout(() => setMessage(null), 4000);
        setSymbol("");
        refreshStocks();
      }
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Server error. Please try again.",
      });
      setTimeout(() => setMessage(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock (NSE Code Only)"
        className="w-full px-3 py-2 bg-slate-800 rounded-lg border border-white/10 focus:outline-none"
      />

      <button
        onClick={handleDownload}
        disabled={loading}
        className={`w-full py-2 rounded-lg transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Wait..." : "Add"}
      </button>

      {/*MESSAGE AREA */}
      {message && (
        <div
          className={`px-3 py-2 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-600/20 text-green-400 border border-green-500"
              : "bg-red-600/20 text-red-400 border border-red-500"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}