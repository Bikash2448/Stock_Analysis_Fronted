export default function MarketNews() {
  const news = [
    "Tech stocks rally after strong earnings",
    "Banking sector shows renewed momentum",
    "Global markets steady ahead of Fed meeting",
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Market News</h2>
      {news.map((n, i) => (
        <div
          key={i}
          className="p-4 mb-3 rounded-lg bg-black/30 hover:bg-black/50 transition cursor-pointer"
        >
          {n}
        </div>
      ))}
    </div>
  );
}
