export default function Sidebar() {
  const menu = ["Dashboard", "Markets", "Watchlist", "Portfolio", "Orders", "News"];

  return (
    <aside className="w-64 hidden md:flex flex-col bg-black/40 backdrop-blur-xl border-r border-white/10 text-white">
      <nav className="flex-1 px-4 space-y-2">
        {menu.map(item => (
          <div
            key={item}
            className="px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-indigo-600/20 hover:text-white cursor-pointer transition"
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
}
