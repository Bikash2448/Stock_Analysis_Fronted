import { useEffect, useState } from "react";
import { fetchCandles } from "../services/marketApi";

export default function useMarketData(symbol) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        const response = await fetchCandles(symbol);
        console.log("res",response)

        if (isMounted) {
          setData(
            response.map(c => ({
              time: c.time,
              open: c.open,
              high: c.high,
              low: c.low,
              close: c.close,
            }))
          );
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => (isMounted = false);
  }, [symbol]);

  return { data, loading, error };
}
