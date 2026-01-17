export default function MarketStats() {
  const stats = [
    { label: "Trend", value: "Bullish", color: "text-green-400" },
    { label: "Volatility", value: "Low", color: "text-blue-400" },
    { label: "Volume", value: "High", color: "text-indigo-400" },
    { label: "Sentiment", value: "Positive", color: "text-green-400" },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {stats.map(s => (
        <div
          key={s.label}
          className="bg-white/5 border border-white/10 rounded-xl p-4 hover:scale-105 transition"
        >
          <p className="text-gray-400 text-sm">{s.label}</p>
          <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}
