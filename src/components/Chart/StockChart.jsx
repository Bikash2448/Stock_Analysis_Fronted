import { useEffect, useRef } from "react";

const SYMBOL_MAP = {
  // Tesla: "NASDAQ:TSLA",
  // Apple: "NASDAQ:AAPL",
  // TCS: "NSE:TCS",
};

export default function StockChart({ stock }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 🧹 Remove old widget
    chartRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (!window.TradingView) return;

      new window.TradingView.widget({
        autosize: true,
        symbol: SYMBOL_MAP[stock],
        interval: "15",
        timezone: "Asia/Kolkata",
        theme: "dark",
        style: "1",
        locale: "en",
        container_id: "tv-chart",
        hide_top_toolbar: false,
        hide_side_toolbar: false,
        allow_symbol_change: false,
        save_image: false,
        studies: ["RSI@tv-basicstudies"],
      });
    };

    chartRef.current.appendChild(script);
  }, [stock]);

  return (
    <div
      id="tv-chart"
      ref={chartRef}
      className="w-full h-[520px] rounded-xl overflow-hidden bg-black"
    />
  );
}
