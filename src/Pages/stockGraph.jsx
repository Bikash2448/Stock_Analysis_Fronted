import { useEffect, useState } from "react";
import StockSearch from "../components/StockSearch";
import StockList from "../components/StockList";
import { getAllStocks } from "../services/stockService";
import StockChart from "../components/StockChart";
import VolumeStats from "../components/VolumeStats";

export default function StockGraph() {
  const [stocks, setStocks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    const data = await getAllStocks();
    setStocks(data);
    if (data.length > 0) setSelected(data[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex">

      {/* LEFT PANEL */}
      <div className="w-80 border-r border-white/10 p-4 space-y-4 bg-black/40 backdrop-blur-xl">

        <StockSearch refreshStocks={loadStocks} />

        <StockList
          stocks={stocks}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 p-6">
        {selected && <StockChart symbol={selected.symbol} onDataLoaded={setChartData}/>}
        <VolumeStats data={chartData} />
      </div>

    </div>
  );
}
