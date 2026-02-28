import React, { useEffect, useState } from "react";
import MarketTimeStatus from "../components/MarketTimeStatus";
import { getDashboard } from "../api/livedataapi.js";

const Dashboard = () => {
  const [marketData, setMarketData] = useState(null);
  const [sensexData, setSensexData] = useState(null);
  const [goldData, setGoldData] = useState(null);
  const [silverData, setSilverData] = useState(null);
  const [vixData, setVixData] = useState(null);
  const [usdInrData, setUsdInrData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [indices, setIndices] = useState([]);
  const [blockDeals, setBlockDeals] = useState([]);

  const fetchMarketData = async () => {
    try {
      setLoading(true);

      const res = await getDashboard();
      console.log("res dash",res)
      const data = res.data.data;

      setMarketData(data.nifty);
      setSensexData(data.sensex);
      setGoldData(data.gold);
      setSilverData(data.silver);
      setVixData(data.vix);
      setUsdInrData(data.usd?.usd_inr);

    } catch (error) {
      console.error("Market API Error:", error.response?.data || error.message);
      setError("Failed to load market data");
    } finally {
      setLoading(false);
    }
  };
  const fetchIndices = async () => {
    try {
      setError(null);

      const res = await fetch(`${import.meta.env.VITE_PYTHON_BACKEND_URL}/all_indicies`);

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

  useEffect(() => {
    // initial fetch
    fetchMarketData();
    fetchIndices();

    // refresh every minutes
    const interval = setInterval(fetchMarketData, 1 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch( `${import.meta.env.VITE_PYTHON_BACKEND_URL}/block_deals?period=1M`)
      .then(res => res.json())
      .then(data => setBlockDeals(data.data));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading market data...
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

  // console.log("sensexData",sensexData)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="flex justify-center md:justify-start items-center w-full md:ml-4"><MarketTimeStatus /></div>
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center text-center md:text-left md:items-start">
            <h2 className="text-4xl font-bold leading-tight">
              Track Markets.<br />
              <span className="text-blue-400">Trade Smarter.</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-lg">
              Real-time stock tracking, market insights, and portfolio analytics
              designed for modern traders.
            </p>
          </div>

          <img
            src="https://4kwallpapers.com/images/walls/thumbs_3t/13813.png"
            alt="Stock chart"
            className="rounded-xl shadow-2xl opacity-90 hover:scale-105 transition duration-500"
          />
        </section>

        {/* Market Cards */}
        <section className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* NIFTY 50 */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10">
            <h3 className="text-lg font-semibold">
              {marketData?.nifty?.name}
            </h3>

            <p className="mt-2 text-2xl font-bold">
              {marketData?.nifty?.last.toLocaleString()}
            </p>

            <span
              className={`text-sm ${
                marketData?.nifty?.percentChange < 0
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {marketData?.nifty.last - marketData?.nifty?.previousClose >= 0 ? "+" : ""}
              {(marketData?.nifty.last - marketData?.nifty?.previousClose).toFixed(2)}{" "}
              ({marketData?.nifty?.percentChange}%)
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10">
            <h3 className="text-lg font-semibold text-gray-300">
              {sensexData?.index ?? "SENSEX"}
            </h3>

            <p className="mt-2 text-2xl font-bold text-white">
              {sensexData?.last?.toLocaleString() ?? "—"}
            </p>

            {sensexData && sensexData.last && sensexData.previousClose && (
              <span
                className={`text-sm font-semibold ${
                  sensexData?.last - sensexData?.previousClose < 0
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {sensexData?.last - sensexData?.previousClose >= 0 ? "+" : ""}
                {(sensexData?.last - sensexData?.previousClose).toFixed(2)} (
                {sensexData?.percentChange?.toFixed(2) ?? "—"}%)
              </span>
            )}
          </div>

          <div className="bg-gray-700/20 backdrop-blur-lg rounded-xl p-5 border border-gray-500/20">
            <h3 className="text-lg font-semibold">
              {vixData?.symbol ?? "INDIA VIX"}
            </h3>

            <p className="mt-2 text-2xl font-bold">
              {vixData?.value !== undefined
                ? vixData?.value.toFixed(2)
                : "—"}
            </p>

            <span
              className={`text-sm font-semibold ${
                vixData?.change < 0 ? "text-red-400" : "text-green-400"
              }`}
            >
              {vixData?.change > 0 ? "+" : ""}
              {vixData?.change !== undefined
                ? vixData?.change.toFixed(2)
                : "—"}{" "}
              (
              {vixData?.percent_change !== undefined
                ? vixData?.percent_change.toFixed(2)
                : "—"}
              %)
            </span>
          </div>
          {/* Use-INR */}
          <div className="bg-gray-700/20 backdrop-blur-lg rounded-xl p-5 border border-gray-500/20">
            <h3 className="text-lg font-semibold">{usdInrData?.name ?? "USD/INR"}</h3>

            <p className="mt-2 text-2xl font-bold">
              ₹{usdInrData?.last?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) ?? "—"}
            </p>

            <span
              className={`text-sm font-semibold ${
                usdInrData?.pointsChange < 0 ? "text-red-400" : "text-green-400"
              }`}
            >
              {usdInrData?.pointsChange > 0 ? "+" : ""}
              {usdInrData?.pointsChange?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) ?? "—"} (
              {usdInrData?.percentChange?.toFixed(2) ?? "—"}%)
            </span>
          </div>
        </section>

        {/* Charts + Top Gainers */}
        <section className="mt-14 grid md:grid-cols-2 gap-8">

          <div className="bg-white/5 rounded-xl p-6 border border-white/10 overflow-hidden">
            <h3 className="text-xl font-semibold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-[length:200%_200%] animate-gradient-x text-transparent bg-clip-text">
                NIFTY 50 – Live Stocks
              </span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
  
             
              <div className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-blue-400/40 transition animate-fade-up">
                <p className="text-gray-400">Open</p>
                <p className="text-lg font-semibold text-blue-400">{marketData?.nifty?.open?.toLocaleString()}</p>
              </div>

              
              <div className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-green-400/40 transition animate-fade-up delay-100">
                <p className="text-gray-400">High</p>
                <p className="text-lg font-semibold text-green-400"> {marketData?.nifty?.high?.toLocaleString()} </p>
              </div>

              
              <div className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-red-400/40 transition animate-fade-up delay-200">
                <p className="text-gray-400">Low</p>
                <p className="text-lg font-semibold text-red-400">{marketData?.nifty?.low?.toLocaleString()} </p>
              </div>

              
              <div className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-purple-400/40 transition animate-fade-up delay-300">
                <p className="text-gray-400">Prev Close</p>
                <p className="text-lg font-semibold text-purple-400"> {marketData?.nifty?.previousClose?.toLocaleString()} </p>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[420px]">
              <table className="min-w-full text-sm text-left">
                <thead className="sticky top-0 bg-black/60 backdrop-blur-md">
                  <tr className="text-gray-300">
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">Open</th>
                    <th className="px-4 py-2">High</th>
                    <th className="px-4 py-2">Low</th>
                    <th className="px-4 py-2">LTP</th>
                    <th className="px-4 py-2">% Change</th>
                    <th className="px-4 py-2">Volume</th>
                  </tr>
                </thead>

                <tbody>
                  {marketData?.stocks?.map((stock, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="px-4 py-2 font-semibold">
                        {stock.stock}
                      </td>

                      <td className="px-4 py-2">
                        {stock.open?.toLocaleString()}
                      </td>

                      <td className="px-4 py-2">
                        {stock.high?.toLocaleString()}
                      </td>

                      <td className="px-4 py-2">
                        {stock.low?.toLocaleString()}
                      </td>

                      <td className="px-4 py-2 font-medium">
                        {stock.ltp?.toLocaleString()}
                      </td>

                      <td
                        className={`px-4 py-2 font-semibold ${
                          stock.percentChange < 0
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {stock.percentChange}%
                      </td>

                      <td className="px-4 py-2">
                        {stock.volume?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


    

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-4 tracking-wide bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-[length:200%_200%] animate-gradient-x text-transparent bg-clip-text">
              Market Indices Overview
            </h3>

            <div className="overflow-x-auto max-h-[480px] relative">
              <table className="min-w-full table-fixed border-collapse text-[13px]">
                
                <thead className="sticky top-0 z-10 bg-black/80 backdrop-blur">
                  <tr className="text-gray-300 text-sm">
                    <th className="px-4 py-3 text-left w-[220px]">Index</th>
                    <th className="px-4 py-3 text-right">Last</th>
                    <th className="px-4 py-3 text-right">% Change</th>
                    <th className="px-4 py-3 text-right">Open</th>
                    <th className="px-4 py-3 text-right">High</th>
                    <th className="px-4 py-3 text-right">Low</th>
                    <th className="px-4 py-3 text-right">1Y %</th>
                    <th className="px-4 py-3 text-right">30D %</th>
                  </tr>
                </thead>

               
                <tbody>
                  {indices.map((row, i) => {
                    const isPositive = row.percentChange >= 0;

                    return (
                      <tr
                        key={i}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        
                        <td className="px-4 py-2 font-semibold text-white">
                          {row.index}
                        </td>

                        
                        <td className="px-4 py-2 text-right font-medium">
                          {row.last?.toLocaleString()}
                        </td>

                        
                        <td
                          className={`px-4 py-2 text-right font-semibold ${
                            isPositive ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {isPositive ? "▲" : "▼"} {row.percentChange}%
                        </td>

                        
                        <td className="px-4 py-2 text-right">
                          {row.open?.toLocaleString()}
                        </td>

                        
                        <td className="px-4 py-2 text-right text-green-300">
                          {row.high?.toLocaleString()}
                        </td>

                        
                        <td className="px-4 py-2 text-right text-red-300">
                          {row.low?.toLocaleString()}
                        </td>

                        
                        <td
                          className={`px-4 py-2 text-right ${
                            row.perChange365d >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {row.perChange365d}%
                        </td>

                        
                        <td
                          className={`px-4 py-2 text-right ${
                            row.perChange30d >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {row.perChange30d}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            
            <div className="mt-4 flex justify-between text-sm text-gray-400">
              <span>
                Showing <b className="text-white">{indices.length}</b> indices
              </span>
              <span className="italic">Live NSE market data</span>
            </div>
          </div>


        </section>
  

        <div className="bg-white/5 rounded-2xl p-6 mt-4 border border-white/10 backdrop-blur">
          <div className="flex items-center justify-between text-xl font-semibold mb-4 text-gray-400">
            <h3 className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-[length:200%_200%] animate-gradient-x text-transparent bg-clip-text">
              BULK DEALS <span className="text-sm italic text-white">(Large quantity(0.5% of company equity) of shares is traded during normal market hours)</span>
            </h3>
            <span className="italic text-white text-xs">
              Last 1 Month
            </span>
          </div>

          <div className="relative overflow-x-auto max-h-[450px] rounded-xl">
            <table className="min-w-full text-sm table-fixed border-collapse">
              
              <thead className="sticky top-0 z-10 bg-black">
                <tr className="text-gray-300">
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Symbol</th>
                  <th className="px-4 py-3 text-left font-semibold">Security</th>
                  <th className="px-4 py-3 text-left font-semibold">Client</th>
                  <th className="px-4 py-3 text-center font-semibold">Side</th>
                  <th className="px-4 py-3 text-right font-semibold">Quantity</th>
                  <th className="px-4 py-3 text-right font-semibold">Price</th>
                </tr>
              </thead>

              <tbody>
                {blockDeals.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/5 hover:bg-white/5 ${
                      i % 2 === 0 ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <td className="px-4 py-2 text-left">{row.Date}</td>
                    <td className="px-4 py-2 text-left font-semibold text-blue-300">
                      {row.Symbol}
                    </td>
                    <td className="px-4 py-2 text-left text-gray-300">
                      {row.SecurityName}
                    </td>
                    <td className="px-4 py-2 text-left text-gray-400">
                      {row.ClientName}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          row.Buy_Sell === "BUY"
                            ? "bg-green-500/15 text-green-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {row.Buy_Sell}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      {row.QuantityTraded}
                    </td>
                    <td className="px-4 py-2 text-right">
                      ₹{Number(row.TradePrice_WghtAvgPrice).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>
              Showing <b className="text-white">{blockDeals.length}</b> records
            </span>
            <span className="italic">
              Data updates post market hours
            </span>
          </div>
        </div>

       



      </main>
    </div>
  );
};

export default Dashboard;