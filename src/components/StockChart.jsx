import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
} from "lightweight-charts";
import { getStockChart } from "../services/stockService";

export default function StockChart({ symbol, onDataLoaded}) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const candleRef = useRef(null);
  const volumeRef = useRef(null);
  const dataRef = useRef([]);

  const [timeframe, setTimeframe] = useState("6M");

  useEffect(() => {
    if (!containerRef.current) return;

    // =========================
    // CREATE CHART (NO BLUR FIX)
    // =========================
    const chart = createChart(containerRef.current, {
      autoSize: true, // 🔥 prevents hazy grid
      height: 550,
      layout: {
        background: { color: "#0f172a" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },
      crosshair: { mode: 0 },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
      },
    });

    chartRef.current = chart;

    // =========================
    // CANDLE SERIES
    // =========================
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candleRef.current = candleSeries;

    // =========================
    // VOLUME
    // =========================
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    });

    volumeRef.current = volumeSeries;

    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.75, bottom: 0.05 },
    });

    chart.priceScale("right").applyOptions({
      scaleMargins: { top: 0.05, bottom: 0.30 },
    });

    // =========================
    // TOOLTIP (Professional)
    // =========================
    const tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.display = "none";
    tooltip.style.padding = "8px";
    tooltip.style.borderRadius = "6px";
    tooltip.style.fontSize = "12px";
    tooltip.style.pointerEvents = "none";
    tooltip.style.zIndex = "1000";
    containerRef.current.appendChild(tooltip);

    chart.subscribeCrosshairMove((param) => {
      if (!param.time || !param.seriesPrices.size) {
        tooltip.style.display = "none";
        return;
      }

      const candle = param.seriesPrices.get(candleSeries);
      const volume = param.seriesPrices.get(volumeSeries);
      if (!candle) return;

      const isGreen = candle.close >= candle.open;

      tooltip.style.display = "block";
      tooltip.style.background = isGreen ? "#064e3b" : "#7f1d1d";
      tooltip.style.color = "#fff";
      tooltip.style.border = `1px solid ${
        isGreen ? "#10b981" : "#ef4444"
      }`;

      tooltip.innerHTML = `
        <strong>${param.time}</strong><br/>
        O: ${candle.open}<br/>
        H: ${candle.high}<br/>
        L: ${candle.low}<br/>
        C: ${candle.close}<br/>
        V: ${volume || "-"}
      `;

      tooltip.style.left = param.point.x + 15 + "px";
      tooltip.style.top = param.point.y + 15 + "px";
    });

    // =========================
    // LOAD DATA
    // =========================
    const loadData = async () => {
      const res = await getStockChart(symbol);
      const raw = res.data || res;

      const candles = raw.map((d) => ({
        time: d.time.split("T")[0],
        open: +d.open,
        high: +d.high,
        low: +d.low,
        close: +d.close,
      }));

      const volume = raw.map((d) => ({
        time: d.time.split("T")[0],
        value: +d.volume,
        color: d.close >= d.open ? "#26a69a" : "#ef5350",
      }));

      dataRef.current = candles;

      candleSeries.setData(candles);
      volumeSeries.setData(volume);
      // send raw data to parent
      onDataLoaded(raw);
      applyTimeframe(candles);
    };

    loadData();

    return () => {
      chart.remove();
    };
  }, [symbol]);

  // =========================
  // TIMEFRAME (WORKING PROPERLY)
  // =========================
  useEffect(() => {
    if (!dataRef.current.length || !chartRef.current) return;
    applyTimeframe(dataRef.current);
  }, [timeframe]);

  const applyTimeframe = (candles) => {
    const last = new Date(candles[candles.length - 1].time);
    const from = new Date(last);

    if (timeframe === "1M") from.setMonth(last.getMonth() - 1);
    if (timeframe === "6M") from.setMonth(last.getMonth() - 6);
    if (timeframe === "1Y") from.setFullYear(last.getFullYear() - 1);
    if (timeframe === "3Y") from.setFullYear(last.getFullYear() - 3);

    chartRef.current.timeScale().setVisibleRange({
      from: from.toISOString().split("T")[0],
      to: last.toISOString().split("T")[0],
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: 10 }}>
        {["1M", "6M", "1Y", "3Y"].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            style={{
              marginRight: 5,
              padding: "6px 10px",
              background: timeframe === tf ? "#10b981" : "#374151",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {tf}
          </button>
        ))}
      </div>

      <div ref={containerRef} />
    </div>
  );
}