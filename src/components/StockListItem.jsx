export default function StockListItem({ stock, selected, onClick }) {
  const isActive = selected?.symbol === stock.symbol;

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg cursor-pointer transition
        ${isActive
          ? "bg-indigo-600/30"
          : "hover:bg-indigo-600/20"
        }`}
    >
      <div className="flex justify-between">
        <div className="font-semibold">{stock.symbol}</div>
        <div
          className={`text-sm ${
            stock.changePercent >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {stock.changePercent}%
        </div>
      </div>

      <div className="text-gray-400 text-sm">
        ₹ {stock.latestPrice?.toFixed(2)}
      </div>
    </div>
  );
}