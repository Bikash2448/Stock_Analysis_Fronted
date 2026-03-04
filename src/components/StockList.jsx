import StockListItem from "./StockListItem";

export default function StockList({ stocks, selected, setSelected }) {
  return (
    <div className="space-y-2 overflow-y-auto max-h-[80vh]">
      {stocks.map(stock => (
        <StockListItem
          key={stock.symbol}
          stock={stock}
          selected={selected}
          onClick={() => setSelected(stock)}
        />
      ))}
    </div>
  );
}