// src/components/SMC_1.jsx
export default function SMC_1() {
  return (
    <section className="px-6 md:px-20 py-10 space-y-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">

      <h1 className="text-4xl font-bold text-center text-indigo-400 mb-8">
        Smart Money Concepts — Professional Learning Module
      </h1>

      {/* ===== Fractals ===== */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-indigo-300">Fractals — Pattern Recognition in Markets</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="https://cdn.buttercms.com/FractalPatternExample.png"
            alt="Fractal Pattern"
            className="md:w-1/3 rounded-lg border border-indigo-400 object-contain"
          />
          <div className="md:w-2/3 text-lg leading-relaxed">
            <p>
              Fractals are recurring price patterns that appear in financial markets and help traders identify potential turning points. Unlike simple indicators like moving averages, fractals highlight local highs and lows formed by a specific pattern of candles. A typical fractal consists of five consecutive bars where the middle bar has a higher high (for bearish fractals) or a lower low (for bullish fractals) compared to the two bars on each side. These patterns reflect moments when market momentum pauses or reverses.
            </p>
            <p>
              For example, in a downtrend, if price forms a series of candlesticks that create a lowest middle bar flanked by two bars on each side with higher lows, that’s a bullish fractal — signaling the market could shift upward soon. Fractals are drawn automatically by many charting tools and are often marked with arrows or symbols once completed.
            </p>
            <p>
              However, fractals don’t predict price movement on their own; they indicate pause points where traders should pay attention. Traders often combine them with other tools (like Fibonacci retracements or momentum indicators) to filter out noise and confirm meaningful reversals.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Break of Structure ===== */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-indigo-300">Break of Structure (BoS) — Trend Continuation</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="https://cdn.buttercms.com/BOS_CHoCH_Example.png"
            alt="Break of Structure and CHoCH"
            className="md:w-1/3 rounded-lg border border-indigo-400 object-contain"
          />
          <div className="md:w-2/3 text-lg leading-relaxed">
            <p>
              Break of Structure (BoS) occurs when price decisively breaks a previous key swing level — such as a swing high in an uptrend or a swing low in a downtrend — showing that the existing trend is continuing. BoS is based on observing how price shifts the core structure of highs and lows.
            </p>
            <p>
              For example, in an uptrend where price makes higher highs (HH) and higher lows (HL), a BoS happens when price breaks above the last HH with conviction. This tells traders that buyers remain in control and that the trend is still strong. In a downtrend, BoS occurs when price breaks below the last LL (lower low).
            </p>
            <p>
              To validate a BoS, traders often look for strong closes beyond the structure point, ideally on higher volume. This reduces false breakouts and helps align entries with the dominant market direction. BoS doesn’t just mark a pattern — it confirms trend continuation.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Change of Character ===== */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-indigo-300">Change of Character (CHoCH) — Trend Shift Signal</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="https://cdn.buttercms.com/BOS_CHoCH_Example.png"
            alt="Change of Character example"
            className="md:w-1/3 rounded-lg border border-indigo-400 object-contain"
          />
          <div className="md:w-2/3 text-lg leading-relaxed">
            <p>
              Change of Character (CHoCH) represents a shift in market momentum and signals that the existing trend is losing strength or preparing to reverse. While BoS confirms continuation, CHoCH marks internal structure failure of the current trend.
            </p>
            <p>
              In an uptrend, price normally creates a series of higher highs and higher lows. A CHoCH happens when price breaks below the most recent higher low, showing that buyers are weakening. Similarly, in a downtrend, a break above the recent lower high signals a potential bullish shift.
            </p>
            <p>
              Unlike pullbacks or normal retracements that respect existing levels, CHoCH violates a structural level — making it a more reliable early signal of possible trend shifts than simple oscillator divergences or trendlines.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Inducement ===== */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-indigo-300">Inducement — Liquidity Trap and Smart Money Behavior</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="https://cdn.buttercms.com/Inducement_Smart_Money.png"
            alt="Inducement example"
            className="md:w-1/3 rounded-lg border border-indigo-400 object-contain"
          />
          <div className="md:w-2/3 text-lg leading-relaxed">
            <p>
              Inducement refers to price moves that are designed to attract retail traders into the wrong side of the market — before the real directional move unfolds. This is often done by sweeping obvious levels to collect liquidity (stop orders) and then reversing sharply.
            </p>
            <p>
              For example, imagine price is rising and approaching a prior resistance. Retail traders may see this as a breakout opportunity and enter long. However, smart money may push price slightly above this level just to trigger stops, then reverse aggressively lower once liquidity is captured. This movement acts like a trap — inducing traders before the actual trend continues.
            </p>
            <p>https://ik.imagekit.io/teofx8bxs/tr:f-webp
              Identifying inducement is crucial because it helps traders avoid false breakouts and plan entries that align with the market’s underlying structure. Inducement often occurs after a BoS or CHoCH, and recognizing these followed by inducement can improve risk management and trade precision.
            </p>
          </div>
        </div>
      </div>

      {/* ===== PROFESSIONAL SUMMARY ===== */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-indigo-300">Professional Summary — Market Structure Mapping</h2>
        <p className="text-lg leading-relaxed">
          Smart Money Concepts teach traders to see beyond random price movements by understanding how price structure evolves. Fractals highlight recurring patterns and potential reversal points. Break of Structure confirms when a trend continues after surpassing a key level. Change of Character marks a weakening or shift in trend momentum. Inducement reveals traps that lure retail participants before major moves. Combining these concepts allows traders to analyze price action systematically and make informed decisions with higher confidence.
        </p>
      </div>

    </section>
  );
}