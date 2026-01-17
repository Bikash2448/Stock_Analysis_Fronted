export default function StockSelector({ symbol, setSymbol }) {
  return (
    <select
      value={symbol}
      onChange={(e) => setSymbol(e.target.value)}
      className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
    >
      <option value="AAPL">Apple</option>
      <option value="TSLA">Tesla</option>
      <option value="TCS">TCS</option>
      <option value="RELIANCE">Reliance</option>
    </select>
  );
}
