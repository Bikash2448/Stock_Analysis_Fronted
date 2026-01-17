export async function fetchCandles(symbol, interval = "1D") {
  // Replace with YOUR backend endpoint
  const res = await fetch(
    `/api/market/candles?symbol=${symbol}&interval=${interval}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch market data");
  }

  return res.json();
}


