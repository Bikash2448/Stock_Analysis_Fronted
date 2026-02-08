import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp, CandlestickChart, BarChart3, Users } from "lucide-react";

export default function UserHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">

      {/* ================= HERO SECTION ================= */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-cyan-600/20 blur-3xl" />

        {/* LOGO TOP LEFT */}
        <div className="absolute top-4 left-4 flex items-center gap-3 z-10">
          <div className="w-11 h-11 rounded-full bg-black/70 border border-white/20 flex items-center justify-center shadow-lg">
            <img
              src="https://www.wallsnapy.com/img_gallery/mahadev-ai-black-white-line-drawing-png-4k-wallpaper-263933.png"
              alt="Nandi Logo"
              className="w-7 h-7 object-contain"
            />
          </div>
          <span className="text-2xl font-bold tracking-wide">Nandi</span>
        </div>

        {/* HERO CONTENT */}
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT TEXT (REPLACED WITH SIMPLE VERSION) */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Learn. Track. Trade.
            </h1>

            <p className="text-gray-300 max-w-xl text-lg">
              Nandi is a modern stock market learning and tracking platform.
              From absolute basics to real market understanding — built for discipline,
              clarity, and long-term growth.
            </p>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate("/login")}
                className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition shadow-lg"
              >
                Login
              </button>

              <button className="px-7 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
                Start Learning
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center items-center">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl" />
            <img
              src="https://brogen.in/cdn/shop/files/88inchsizeFrame_7.png?v=1727872708"
              alt="Nandi – Market Discipline & Strength"
              className="relative w-[320px] h-[320px] rounded-full object-cover border border-white/10 animate-float"
            />
          </div>
        </div>
      </header>

      {/* ================= WHY NANDI ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Why <span className="text-blue-400">Nandi</span>?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<TrendingUp />}
            title="Real Market Context"
            desc="Learn concepts with live examples from NIFTY, SENSEX, VIX and popular stocks."
          />
          <FeatureCard
            icon={<CandlestickChart />}
            title="Visual Learning"
            desc="Charts and candles explained visually — no boring textbook theory."
          />
          <FeatureCard
            icon={<BarChart3 />}
            title="Beginner → Intermediate"
            desc="Start from zero and grow step by step into serious market understanding."
          />
        </div>
      </section>

      {/* ================= WHAT YOU WILL LEARN ================= */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">What You’ll Learn</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LearnCard title="Stock Market Basics" items={["What is Stock Market", "Market Cap", "Sensex & Nifty", "Why market moves"]} />
            <LearnCard title="Types of Investors" items={["Retail", "FII & DII", "Institutions", "Smart Money"]} />
            <LearnCard title="Trading Styles" items={["Investing", "Intraday", "Swing", "Positional"]} />
            <LearnCard title="Derivatives" items={["Options", "Futures", "Call & Put", "Risk"]} />
            <LearnCard title="Technical Analysis" items={["Support/Resistance", "Trend", "Volume", "Structure"]} />
            <LearnCard title="Candlesticks" items={["Doji", "Hammer", "Engulfing", "Psychology"]} />
          </div>
        </div>
      </section>

      {/* ================= WHO IS THIS FOR ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Who Is Nandi For?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <AudienceCard title="Beginners" desc="Starting from zero? This is built for you." />
          <AudienceCard title="Intermediate Traders" desc="Strengthen logic, structure and discipline." />
          <AudienceCard title="Serious Learners" desc="Understand market behavior — not tips." />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to understand the market?</h2>
          <p className="text-white/90 mb-8">Learn logic, discipline and real structure.</p>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-black/80 rounded-xl hover:bg-black transition"
          >
            Login to Nandi <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-400/40 transition">
      <div className="text-blue-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function LearnCard({ title, items }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 rounded-2xl">
      <h3 className="text-lg font-semibold mb-4 text-blue-400">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-300">
        {items.map((i, idx) => (
          <li key={idx}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}

function AudienceCard({ title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
      <Users className="mx-auto text-blue-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
