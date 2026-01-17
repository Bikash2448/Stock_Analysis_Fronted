import { useState } from "react";
import StockSelector from "../components/StockSelector";
import MarketStats from "../components/MarketStats";
import MarketNews from "../components/MarketNews";
import Sidebar from "../components/Sidebar";
import StockChart from "../components/Chart/StockChart";
import useMarketData from "../hooks/useMarketData";
import Navbar from "../components/Navbar";

export default function Home() {
  const [symbol, setSymbol] = useState("AAPL");
  const { data, loading } = useMarketData(symbol);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex">
      {/* <Navbar/> */}
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
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
      </main>
    </div>
    </>
  );
}
