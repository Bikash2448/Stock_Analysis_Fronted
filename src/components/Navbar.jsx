import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutApi } from "../api/userapi";
import toast from "react-hot-toast";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await logoutApi();
      toast.success("Log out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout Error");
    }
  };

  const linkClass = ({ isActive }) =>
    `hover:text-gray-200 ${isActive ? "border-b-2 border-white" : ""}`;

  return (
    <nav className="bg-[#5fa7ad] text-white">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div
            className="text-2xl font-bold tracking-wide cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Nandi
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-sm font-medium uppercase">
            <NavLink to="/home" className={linkClass}>Home</NavLink>
            <NavLink to="/dashboard" className={linkClass}>Fundamental</NavLink>
            <NavLink to="/stockchart" className={linkClass}>Chart</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/service" className={linkClass}>Services</NavLink>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
              >
                <span className="text-sm font-semibold">N</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => navigate("/settings")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  <button
                    onClick={logoutUser}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm uppercase">
          <NavLink to="/dashboard" className="block" onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/about" className="block" onClick={() => setMobileOpen(false)}>About</NavLink>
          <NavLink to="/services" className="block" onClick={() => setMobileOpen(false)}>Services</NavLink>
        </div>
      )}
    </nav>
  );
}
