import { useState, useEffect } from "react";
import MarketStats from "../components/MarketStats";
import MarketNews from "../components/MarketNews";
import StockSelector from "../components/StockSelector";
import StockChart from "../components/Chart/StockChart";

export default function StockChartPage() {
  const menu = ["Dashboard", "Markets", "Watchlist", "Portfolio", "Orders"];
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // ===== DASHBOARD STATES =====
  const [symbol, setSymbol] = useState("NIFTY");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (activeMenu === "Dashboard") {
      fetchStockData();
    }
  }, [symbol, activeMenu]);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      // API call here
      // const res = await getStockData(symbol);
      // setData(res.data);
      setTimeout(() => {
        setData({ dummy: true });
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex">

      {/* ===== INLINE SIDEBAR ===== */}
      <aside className="w-64 hidden md:flex flex-col bg-black/40 backdrop-blur-xl border-r border-white/10">
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menu.map(item => (
            <div
              key={item}
              onClick={() => setActiveMenu(item)}
              className={`px-4 py-3 rounded-lg cursor-pointer transition
                ${
                  activeMenu === item
                    ? "bg-indigo-600/30 text-white"
                    : "text-gray-300 hover:bg-indigo-600/20 hover:text-white"
                }
              `}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">

        {/* ================= DASHBOARD ================= */}
        {activeMenu === "Dashboard" && (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Market Overview</h1>
              <StockSelector symbol={symbol} setSymbol={setSymbol} />
            </div>

            {loading ? (
              <div className="text-gray-400">Loading chart...</div>
            ) : (
              <StockChart data={data} />
            )}

            <MarketStats />
            <MarketNews />
          </>
        )}

        {/* ================= MARKETS ================= */}
        {activeMenu === "Markets" && (
          <div className="text-xl font-bold">Markets Section</div>
        )}

        {/* ================= WATCHLIST ================= */}
        {activeMenu === "Watchlist" && (
          <div className="text-xl font-bold">📌 Watchlist</div>
        )}

        {/* ================= PORTFOLIO ================= */}
        {activeMenu === "Portfolio" && (
          <div className="text-xl font-bold">💼 Portfolio</div>
        )}

        {/* ================= ORDERS ================= */}
        {activeMenu === "Orders" && (
          <div className="text-xl font-bold">🧾 Orders</div>
        )}

      </main>
    </div>
  );
}
