export default function VolumeStats({ data }) {
  if (!data || data.length === 0) return null;

  const formatVolume = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  const avg = (arr) =>
    Math.round(arr.reduce((sum, d) => sum + d.volume, 0) / arr.length);

  const lastNDays = (days) => data.slice(-days);

  // 🔥 Latest first
  const last5 = lastNDays(5).reverse();

  const stats = [
    { title: "15D AVG", value: avg(lastNDays(15)) },
    { title: "1M AVG", value: avg(lastNDays(22)) },
    { title: "3M AVG", value: avg(lastNDays(66)) },
    { title: "6M AVG", value: avg(lastNDays(132)) },
    { title: "1Y AVG", value: avg(lastNDays(252)) },
  ];

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="mt-6">

      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-3">

        {/* LAST 5 DAY VOLUME */}
        {last5.map((d, i) => (
          <StatCard
            key={i}
            title={formatDate(d.time)}
            value={formatVolume(d.volume)}
          />
        ))}

        {/* AVERAGE VOLUME */}
        {stats.map((s, i) => (
          <StatCard
            key={i}
            title={s.title}
            value={formatVolume(s.value)}
          />
        ))}

      </div>

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="flex-1 min-w-[90px] bg-slate-900 border border-slate-700 rounded-xl p-3 text-center hover:border-sky-400 transition hover:scale-105 hover:shadow-lg">

      <div className="text-sm font-bold text-sky-400">
        {title}
      </div>

      <div className="text-lg font-semibold text-white mt-1">
        {value}
      </div>

    </div>
  );
}